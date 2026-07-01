package com.expense.claim.dto.response;

import com.expense.claim.enums.ClaimStatus;
import com.expense.claim.enums.Department;
import com.expense.claim.enums.ExpenseCategory;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class ClaimResponseDTO {
	private Long id;
	private String employeeName;
	private Department department;
	private ExpenseCategory category;
	private BigDecimal amount;
	private LocalDate expenseDate;
	private String description;
	private ClaimStatus status;
	private String reviewRemark;
	private String monthYear;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}