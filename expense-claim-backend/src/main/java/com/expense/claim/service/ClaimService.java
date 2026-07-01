package com.expense.claim.service;

import com.expense.claim.dto.request.ClaimRequestDTO;
import com.expense.claim.dto.request.ReviewRequestDTO;
import com.expense.claim.dto.response.ClaimResponseDTO;
import com.expense.claim.dto.response.MonthlySummaryDTO;

import java.util.List;

public interface ClaimService {
    
    ClaimResponseDTO submitClaim(ClaimRequestDTO request);
    
    ClaimResponseDTO reviewClaim(ReviewRequestDTO request);
    
    List<ClaimResponseDTO> getAllClaims();
    
    ClaimResponseDTO getClaimById(Long id);
    
    List<ClaimResponseDTO> getClaimsByDepartment(String department);
    
    List<ClaimResponseDTO> getClaimsByStatus(String status);
    
    List<ClaimResponseDTO> getClaimsByMonthYear(String monthYear);
    
    List<ClaimResponseDTO> getClaimsByDepartmentAndMonthYear(String department, String monthYear);
    
    List<ClaimResponseDTO> getClaimsByFilters(String department, String monthYear, String status, String category);
    
    MonthlySummaryDTO getMonthlySummary(String department, Integer month, Integer year);
}