package com.expense.claim.service;

import com.expense.claim.dto.request.BudgetRequestDTO;
import com.expense.claim.dto.response.BudgetResponseDTO;
import com.expense.claim.entity.DepartmentBudget;
import com.expense.claim.enums.Department;
import com.expense.claim.exception.ResourceNotFoundException;
import com.expense.claim.repository.DepartmentBudgetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BudgetServiceImpl implements BudgetService {

    private final DepartmentBudgetRepository budgetRepository;

    @Override
    public BudgetResponseDTO createBudget(BudgetRequestDTO request) {
        // Check if budget already exists for this department, month, year
        if (budgetExistsForDepartmentAndMonthAndYear(
            request.getDepartment().name(), request.getMonth(), request.getYear()
        )) {
            throw new DataIntegrityViolationException(
                "Budget already exists for " + request.getDepartment() + 
                " for " + request.getMonth() + "/" + request.getYear()
            );
        }
        
        DepartmentBudget budget = new DepartmentBudget();
        budget.setDepartment(request.getDepartment());
        budget.setMonth(request.getMonth());
        budget.setYear(request.getYear());
        budget.setBudgetAmount(request.getBudgetAmount());
        
        DepartmentBudget savedBudget = budgetRepository.save(budget);
        return convertToResponseDTO(savedBudget);
    }

    @Override
    public BudgetResponseDTO updateBudget(Long id, BudgetRequestDTO request) {
        DepartmentBudget budget = budgetRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Budget not found with ID: " + id));
        
        // Check if another budget exists for same department, month, year (excluding current)
        if (budgetRepository.existsByDepartmentAndMonthAndYear(
            request.getDepartment(), request.getMonth(), request.getYear()
        ) && !(budget.getDepartment() == request.getDepartment() && 
               budget.getMonth().equals(request.getMonth()) && 
               budget.getYear().equals(request.getYear()))) {
            throw new DataIntegrityViolationException(
                "Budget already exists for " + request.getDepartment() + 
                " for " + request.getMonth() + "/" + request.getYear()
            );
        }
        
        budget.setDepartment(request.getDepartment());
        budget.setMonth(request.getMonth());
        budget.setYear(request.getYear());
        budget.setBudgetAmount(request.getBudgetAmount());
        
        DepartmentBudget updatedBudget = budgetRepository.save(budget);
        return convertToResponseDTO(updatedBudget);
    }

    @Override
    public BudgetResponseDTO getBudgetById(Long id) {
        DepartmentBudget budget = budgetRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Budget not found with ID: " + id));
        return convertToResponseDTO(budget);
    }

    @Override
    public List<BudgetResponseDTO> getAllBudgets() {
        return budgetRepository.findAll().stream()
            .map(this::convertToResponseDTO)
            .collect(Collectors.toList());
    }

    @Override
    public BudgetResponseDTO getBudgetByDepartmentAndMonthAndYear(String department, Integer month, Integer year) {
        Department dept = Department.valueOf(department.toUpperCase());
        DepartmentBudget budget = budgetRepository.findByDepartmentAndMonthAndYear(dept, month, year)
            .orElseThrow(() -> new ResourceNotFoundException(
                "Budget not found for " + department + " for " + month + "/" + year
            ));
        return convertToResponseDTO(budget);
    }

    @Override
    public void deleteBudget(Long id) {
        if (!budgetRepository.existsById(id)) {
            throw new ResourceNotFoundException("Budget not found with ID: " + id);
        }
        budgetRepository.deleteById(id);
    }

    @Override
    public boolean budgetExistsForDepartmentAndMonthAndYear(String department, Integer month, Integer year) {
        Department dept = Department.valueOf(department.toUpperCase());
        return budgetRepository.existsByDepartmentAndMonthAndYear(dept, month, year);
    }

    private BudgetResponseDTO convertToResponseDTO(DepartmentBudget budget) {
        BudgetResponseDTO dto = new BudgetResponseDTO();
        dto.setId(budget.getId());
        dto.setDepartment(budget.getDepartment());
        dto.setMonth(budget.getMonth());
        dto.setYear(budget.getYear());
        dto.setBudgetAmount(budget.getBudgetAmount());
        return dto;
    }
}