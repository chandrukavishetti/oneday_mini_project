package com.expense.claim.dto.response;

import com.expense.claim.enums.Department;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class BudgetResponseDTO {
    private Long id;
    private Department department;
    private Integer month;
    private Integer year;
    private BigDecimal budgetAmount;
}