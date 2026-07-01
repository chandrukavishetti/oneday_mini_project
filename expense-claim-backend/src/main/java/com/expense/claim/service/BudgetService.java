package com.expense.claim.service;

import com.expense.claim.dto.request.BudgetRequestDTO;
import com.expense.claim.dto.response.BudgetResponseDTO;

import java.util.List;

public interface BudgetService {
    
    BudgetResponseDTO createBudget(BudgetRequestDTO request);
    
    BudgetResponseDTO updateBudget(Long id, BudgetRequestDTO request);
    
    BudgetResponseDTO getBudgetById(Long id);
    
    List<BudgetResponseDTO> getAllBudgets();
    
    BudgetResponseDTO getBudgetByDepartmentAndMonthAndYear(String department, Integer month, Integer year);
    
    void deleteBudget(Long id);
    
    boolean budgetExistsForDepartmentAndMonthAndYear(String department, Integer month, Integer year);
}