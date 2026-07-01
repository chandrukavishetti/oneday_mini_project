package com.expense.claim.controller;

import com.expense.claim.dto.request.ClaimRequestDTO;
import com.expense.claim.dto.request.ReviewRequestDTO;
import com.expense.claim.dto.response.ClaimResponseDTO;
import com.expense.claim.dto.response.MonthlySummaryDTO;
import com.expense.claim.service.ClaimService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/claims")
@RequiredArgsConstructor
public class ClaimController {

    private final ClaimService claimService;

    @PostMapping("/submit")
    public ResponseEntity<ClaimResponseDTO> submitClaim(@Valid @RequestBody ClaimRequestDTO request) {
        ClaimResponseDTO response = claimService.submitClaim(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/review")
    public ResponseEntity<ClaimResponseDTO> reviewClaim(@Valid @RequestBody ReviewRequestDTO request) {
        ClaimResponseDTO response = claimService.reviewClaim(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ClaimResponseDTO>> getAllClaims() {
        return ResponseEntity.ok(claimService.getAllClaims());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClaimResponseDTO> getClaimById(@PathVariable Long id) {
        return ResponseEntity.ok(claimService.getClaimById(id));
    }

    @GetMapping("/department/{department}")
    public ResponseEntity<List<ClaimResponseDTO>> getClaimsByDepartment(@PathVariable String department) {
        return ResponseEntity.ok(claimService.getClaimsByDepartment(department));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ClaimResponseDTO>> getClaimsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(claimService.getClaimsByStatus(status));
    }

    @GetMapping("/month/{monthYear}")
    public ResponseEntity<List<ClaimResponseDTO>> getClaimsByMonthYear(@PathVariable String monthYear) {
        return ResponseEntity.ok(claimService.getClaimsByMonthYear(monthYear));
    }

    @GetMapping("/filter")
    public ResponseEntity<List<ClaimResponseDTO>> getClaimsByFilters(
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String monthYear,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String category) {
        return ResponseEntity.ok(claimService.getClaimsByFilters(department, monthYear, status, category));
    }

    @GetMapping("/summary")
    public ResponseEntity<MonthlySummaryDTO> getMonthlySummary(
            @RequestParam String department,
            @RequestParam Integer month,
            @RequestParam Integer year) {
        return ResponseEntity.ok(claimService.getMonthlySummary(department, month, year));
    }
}