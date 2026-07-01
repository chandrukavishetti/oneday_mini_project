package com.expense.claim.entity;

import com.expense.claim.enums.ClaimStatus;
import com.expense.claim.enums.Department;
import com.expense.claim.enums.ExpenseCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "claims")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Claim {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String employeeName;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Department department;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private ExpenseCategory category;

	@Column(nullable = false, precision = 15, scale = 2)
	private BigDecimal amount;

	@Column(nullable = false)
	private LocalDate expenseDate;

	@Column(nullable = false, length = 500)
	private String description;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private ClaimStatus status = ClaimStatus.PENDING;

	@Column(length = 500)
	private String reviewRemark;

	@Column(nullable = false)
	private String monthYear; // Format: "MM-YYYY"

	@CreationTimestamp
	private LocalDateTime createdAt;

	@UpdateTimestamp
	private LocalDateTime updatedAt;

	@PrePersist
	@PreUpdate
	private void generateMonthYear() {
		if (this.expenseDate != null) {
			this.monthYear = String.format("%02d-%d", this.expenseDate.getMonthValue(), this.expenseDate.getYear());
		}
	}
}