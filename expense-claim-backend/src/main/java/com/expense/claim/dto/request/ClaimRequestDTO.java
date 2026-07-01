package com.expense.claim.dto.request;

import com.expense.claim.enums.Department;
import com.expense.claim.enums.ExpenseCategory;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ClaimRequestDTO {

	@NotBlank(message = "Employee name is required")
	private String employeeName;

	@NotNull(message = "Department is required")
	private Department department;

	@NotNull(message = "Expense category is required")
	private ExpenseCategory category;

	@NotNull(message = "Amount is required")
	@DecimalMin(value = "0.01", message = "Amount must be greater than zero")
	private BigDecimal amount;

	@NotNull(message = "Expense date is required")
	@PastOrPresent(message = "Expense date cannot be in the future")
	private LocalDate expenseDate;

	@NotBlank(message = "Description is required")
	@Size(max = 500, message = "Description must not exceed 500 characters")
	private String description;
}