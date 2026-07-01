package com.expense.claim.repository;

import com.expense.claim.entity.Claim;
import com.expense.claim.enums.ClaimStatus;
import com.expense.claim.enums.Department;
import com.expense.claim.enums.ExpenseCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Long>, JpaSpecificationExecutor<Claim> {
    
    List<Claim> findByDepartment(Department department);
    
    List<Claim> findByStatus(ClaimStatus status);
    
    List<Claim> findByDepartmentAndStatus(Department department, ClaimStatus status);
    
    List<Claim> findByMonthYear(String monthYear);
    
    List<Claim> findByDepartmentAndMonthYear(Department department, String monthYear);
    
    List<Claim> findByDepartmentAndStatusAndMonthYear(Department department, ClaimStatus status, String monthYear);
    
    @Query("SELECT COALESCE(SUM(c.amount), 0) FROM Claim c WHERE c.department = :department AND c.monthYear = :monthYear AND c.status = 'APPROVED'")
    BigDecimal getTotalApprovedExpenseForDepartmentAndMonth(@Param("department") Department department, @Param("monthYear") String monthYear);
    
    @Query("SELECT COALESCE(SUM(c.amount), 0) FROM Claim c WHERE c.department = :department AND c.monthYear = :monthYear AND c.status = 'PENDING'")
    BigDecimal getTotalPendingExpenseForDepartmentAndMonth(@Param("department") Department department, @Param("monthYear") String monthYear);
    
    @Query("SELECT COUNT(c) FROM Claim c WHERE c.department = :department AND c.monthYear = :monthYear AND c.status = :status")
    Long countByDepartmentAndMonthYearAndStatus(@Param("department") Department department, @Param("monthYear") String monthYear, @Param("status") ClaimStatus status);
    
    @Query("SELECT c FROM Claim c WHERE c.department = :department AND c.monthYear = :monthYear AND c.status = :status AND c.category = :category")
    List<Claim> findByDepartmentAndMonthYearAndStatusAndCategory(
        @Param("department") Department department,
        @Param("monthYear") String monthYear,
        @Param("status") ClaimStatus status,
        @Param("category") ExpenseCategory category
    );
}