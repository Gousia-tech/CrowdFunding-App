package com.smiledonors.aspects;

import com.smiledonors.exception.DonationsEmpty;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Handle DonorEmailNotFound Exception
    @ExceptionHandler(DonationsEmpty.class)
    public ResponseEntity<Object> handleDonorEmailNotFoundException(DonationsEmpty ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }



    // Handle Generic Exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGenericException(Exception ex) {


        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
