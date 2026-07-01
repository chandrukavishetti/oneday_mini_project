package com.expense.claim.dto.response;

import com.expense.claim.enums.Department;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonthlySummaryDTO {
	private Department department;
	private Integer month;
	private Integer year;
	private BigDecimal monthlyBudget;
	private BigDecimal totalApprovedExpense;
	private BigDecimal totalPendingExpense;
	private BigDecimal remainingBudget;
	private Long pendingCount;
	private Long approvedCount;
	private Long rejectedCount;
}