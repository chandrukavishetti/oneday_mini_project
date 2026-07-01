package com.expense.claim.service;

import com.expense.claim.dto.request.ClaimRequestDTO;
import com.expense.claim.dto.request.ReviewRequestDTO;
import com.expense.claim.dto.response.ClaimResponseDTO;
import com.expense.claim.dto.response.MonthlySummaryDTO;
import com.expense.claim.entity.Claim;
import com.expense.claim.entity.DepartmentBudget;
import com.expense.claim.enums.ClaimStatus;
import com.expense.claim.enums.Department;
import com.expense.claim.enums.ExpenseCategory;
import com.expense.claim.exception.BudgetExceededException;
import com.expense.claim.exception.InvalidClaimStatusException;
import com.expense.claim.exception.ResourceNotFoundException;
import com.expense.claim.repository.ClaimRepository;
import com.expense.claim.repository.DepartmentBudgetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ClaimServiceImpl implements ClaimService {

	private final ClaimRepository claimRepository;
	private final DepartmentBudgetRepository budgetRepository;

	@Override
	public ClaimResponseDTO submitClaim(ClaimRequestDTO request) {
		// Validate unique constraint for department budget (handled by database)
		// Additional validation can be added here

		Claim claim = new Claim();
		claim.setEmployeeName(request.getEmployeeName());
		claim.setDepartment(request.getDepartment());
		claim.setCategory(request.getCategory());
		claim.setAmount(request.getAmount());
		claim.setExpenseDate(request.getExpenseDate());
		claim.setDescription(request.getDescription());
		claim.setStatus(ClaimStatus.PENDING);

		Claim savedClaim = claimRepository.save(claim);
		return convertToResponseDTO(savedClaim);
	}

	@Override
	public ClaimResponseDTO reviewClaim(ReviewRequestDTO request) {
		Claim claim = claimRepository.findById(request.getClaimId())
				.orElseThrow(() -> new ResourceNotFoundException("Claim not found with ID: " + request.getClaimId()));

		// Only pending claims can be approved or rejected
		if (claim.getStatus() != ClaimStatus.PENDING) {
			throw new InvalidClaimStatusException(
					"Only pending claims can be reviewed. Current status: " + claim.getStatus());
		}

		// If approving, check budget
		if (request.getStatus() == ClaimStatus.APPROVED) {
			checkBudgetAvailability(claim);
		}

		claim.setStatus(request.getStatus());
		claim.setReviewRemark(request.getReviewRemark());

		Claim updatedClaim = claimRepository.save(claim);
		return convertToResponseDTO(updatedClaim);
	}

	private void checkBudgetAvailability(Claim claim) {
		Department department = claim.getDepartment();
		Integer month = claim.getExpenseDate().getMonthValue();
		Integer year = claim.getExpenseDate().getYear();
		String monthYear = claim.getMonthYear();

		// Get department budget
		DepartmentBudget budget = budgetRepository.findByDepartmentAndMonthAndYear(department, month, year)
				.orElseThrow(() -> new ResourceNotFoundException(
						"No budget found for " + department + " for " + month + "/" + year));

		// Calculate total approved expenses
		BigDecimal totalApproved = claimRepository.getTotalApprovedExpenseForDepartmentAndMonth(department, monthYear);
		BigDecimal newTotal = totalApproved.add(claim.getAmount());

		// Check if approving this claim would exceed budget
		if (newTotal.compareTo(budget.getBudgetAmount()) > 0) {
			throw new BudgetExceededException(String.format(
					"Cannot approve claim. Budget for %s for %d/%d is %.2f. Approved: %.2f, Pending Approval: %.2f",
					department, month, year, budget.getBudgetAmount(), totalApproved, claim.getAmount()));
		}
	}

	@Override
	public List<ClaimResponseDTO> getAllClaims() {
		return claimRepository.findAll().stream().map(this::convertToResponseDTO).collect(Collectors.toList());
	}

	@Override
	public ClaimResponseDTO getClaimById(Long id) {
		Claim claim = claimRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Claim not found with ID: " + id));
		return convertToResponseDTO(claim);
	}

	@Override
	public List<ClaimResponseDTO> getClaimsByDepartment(String department) {
		Department dept = Department.valueOf(department.toUpperCase());
		return claimRepository.findByDepartment(dept).stream().map(this::convertToResponseDTO)
				.collect(Collectors.toList());
	}

	@Override
	public List<ClaimResponseDTO> getClaimsByStatus(String status) {
		ClaimStatus claimStatus = ClaimStatus.valueOf(status.toUpperCase());
		return claimRepository.findByStatus(claimStatus).stream().map(this::convertToResponseDTO)
				.collect(Collectors.toList());
	}

	@Override
	public List<ClaimResponseDTO> getClaimsByMonthYear(String monthYear) {
		return claimRepository.findByMonthYear(monthYear).stream().map(this::convertToResponseDTO)
				.collect(Collectors.toList());
	}

	@Override
	public List<ClaimResponseDTO> getClaimsByDepartmentAndMonthYear(String department, String monthYear) {
		Department dept = Department.valueOf(department.toUpperCase());
		return claimRepository.findByDepartmentAndMonthYear(dept, monthYear).stream().map(this::convertToResponseDTO)
				.collect(Collectors.toList());
	}

	@Override
	public List<ClaimResponseDTO> getClaimsByFilters(String department, String monthYear, String status,
			String category) {
		Department dept = department != null ? Department.valueOf(department.toUpperCase()) : null;
		ClaimStatus claimStatus = status != null ? ClaimStatus.valueOf(status.toUpperCase()) : null;
		ExpenseCategory expCategory = category != null ? ExpenseCategory.valueOf(category.toUpperCase()) : null;

		if (dept != null && monthYear != null && claimStatus != null && expCategory != null) {
			return claimRepository
					.findByDepartmentAndMonthYearAndStatusAndCategory(dept, monthYear, claimStatus, expCategory)
					.stream().map(this::convertToResponseDTO).collect(Collectors.toList());
		} else if (dept != null && monthYear != null && claimStatus != null) {
			return claimRepository.findByDepartmentAndStatusAndMonthYear(dept, claimStatus, monthYear).stream()
					.map(this::convertToResponseDTO).collect(Collectors.toList());
		} else if (dept != null && monthYear != null) {
			return claimRepository.findByDepartmentAndMonthYear(dept, monthYear).stream()
					.map(this::convertToResponseDTO).collect(Collectors.toList());
		} else if (dept != null && claimStatus != null) {
			return claimRepository.findByDepartmentAndStatus(dept, claimStatus).stream().map(this::convertToResponseDTO)
					.collect(Collectors.toList());
		} else if (dept != null) {
			return claimRepository.findByDepartment(dept).stream().map(this::convertToResponseDTO)
					.collect(Collectors.toList());
		} else if (claimStatus != null) {
			return claimRepository.findByStatus(claimStatus).stream().map(this::convertToResponseDTO)
					.collect(Collectors.toList());
		} else if (monthYear != null) {
			return claimRepository.findByMonthYear(monthYear).stream().map(this::convertToResponseDTO)
					.collect(Collectors.toList());
		} else {
			return getAllClaims();
		}
	}

	@Override
	public MonthlySummaryDTO getMonthlySummary(String department, Integer month, Integer year) {
		Department dept = Department.valueOf(department.toUpperCase());
		String monthYear = String.format("%02d-%d", month, year);

		// Get budget
		BigDecimal budget = budgetRepository.findByDepartmentAndMonthAndYear(dept, month, year)
				.map(DepartmentBudget::getBudgetAmount).orElse(BigDecimal.ZERO);

		// Get totals
		BigDecimal approvedTotal = claimRepository.getTotalApprovedExpenseForDepartmentAndMonth(dept, monthYear);
		BigDecimal pendingTotal = claimRepository.getTotalPendingExpenseForDepartmentAndMonth(dept, monthYear);
		BigDecimal remaining = budget.subtract(approvedTotal);

		// Get counts
		Long pendingCount = claimRepository.countByDepartmentAndMonthYearAndStatus(dept, monthYear,
				ClaimStatus.PENDING);
		Long approvedCount = claimRepository.countByDepartmentAndMonthYearAndStatus(dept, monthYear,
				ClaimStatus.APPROVED);
		Long rejectedCount = claimRepository.countByDepartmentAndMonthYearAndStatus(dept, monthYear,
				ClaimStatus.REJECTED);

		return new MonthlySummaryDTO(dept, month, year, budget, approvedTotal, pendingTotal, remaining, pendingCount,
				approvedCount, rejectedCount);
	}

	private ClaimResponseDTO convertToResponseDTO(Claim claim) {
		ClaimResponseDTO dto = new ClaimResponseDTO();
		dto.setId(claim.getId());
		dto.setEmployeeName(claim.getEmployeeName());
		dto.setDepartment(claim.getDepartment());
		dto.setCategory(claim.getCategory());
		dto.setAmount(claim.getAmount());
		dto.setExpenseDate(claim.getExpenseDate());
		dto.setDescription(claim.getDescription());
		dto.setStatus(claim.getStatus());
		dto.setReviewRemark(claim.getReviewRemark());
		dto.setMonthYear(claim.getMonthYear());
		dto.setCreatedAt(claim.getCreatedAt());
		dto.setUpdatedAt(claim.getUpdatedAt());
		return dto;
	}
}