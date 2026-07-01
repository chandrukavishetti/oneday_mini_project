package com.expense.claim.dto.request;

import com.expense.claim.enums.ClaimStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ReviewRequestDTO {

    @NotNull(message = "Claim ID is required")
    private Long claimId;

    @NotNull(message = "Status is required")
    private ClaimStatus status;

    private String reviewRemark;
}