package com.expense.claim.repository;

import com.expense.claim.entity.DepartmentBudget;
import com.expense.claim.enums.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DepartmentBudgetRepository extends JpaRepository<DepartmentBudget, Long> {
    
    Optional<DepartmentBudget> findByDepartmentAndMonthAndYear(Department department, Integer month, Integer year);
    
    boolean existsByDepartmentAndMonthAndYear(Department department, Integer month, Integer year);
}