package com.expense.claim.exception;


public class InvalidClaimStatusException extends RuntimeException {
    public InvalidClaimStatusException(String message) {
        super(message);
    }
}