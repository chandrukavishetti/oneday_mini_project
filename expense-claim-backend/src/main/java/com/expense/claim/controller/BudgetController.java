package com.expense.claim.controller;

import com.expense.claim.dto.request.BudgetRequestDTO;
import com.expense.claim.dto.response.BudgetResponseDTO;
import com.expense.claim.service.BudgetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
// REMOVE THIS: @CrossOrigin(originPatterns = "*", allowCredentials = "true")
@RequiredArgsConstructor
public class BudgetController {

    private final BudgetService budgetService;

    @PostMapping("/create")
    public ResponseEntity<BudgetResponseDTO> createBudget(@Valid @RequestBody BudgetRequestDTO request) {
        BudgetResponseDTO response = budgetService.createBudget(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BudgetResponseDTO> updateBudget(
            @PathVariable Long id, 
            @Valid @RequestBody BudgetRequestDTO request) {
        BudgetResponseDTO response = budgetService.updateBudget(id, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    public ResponseEntity<List<BudgetResponseDTO>> getAllBudgets() {
        return ResponseEntity.ok(budgetService.getAllBudgets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BudgetResponseDTO> getBudgetById(@PathVariable Long id) {
        return ResponseEntity.ok(budgetService.getBudgetById(id));
    }

    @GetMapping("/find")
    public ResponseEntity<BudgetResponseDTO> getBudgetByDepartmentAndMonthAndYear(
            @RequestParam String department,
            @RequestParam Integer month,
            @RequestParam Integer year) {
        return ResponseEntity.ok(budgetService.getBudgetByDepartmentAndMonthAndYear(department, month, year));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBudget(@PathVariable Long id) {
        budgetService.deleteBudget(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/exists")
    public ResponseEntity<Boolean> checkBudgetExists(
            @RequestParam String department,
            @RequestParam Integer month,
            @RequestParam Integer year) {
        return ResponseEntity.ok(budgetService.budgetExistsForDepartmentAndMonthAndYear(department, month, year));
    }
}