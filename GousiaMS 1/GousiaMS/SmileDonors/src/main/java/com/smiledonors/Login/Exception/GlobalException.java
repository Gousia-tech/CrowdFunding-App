package com.smiledonors.Login.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

//@RestControllerAdvice
//public class GlobalException {
//
//    @ExceptionHandler(UserNotFoundException.class)
//    public ResponseEntity<String> userNotFoundException(UserNotFoundException e)
//    {
//        String message = e.getMessage();
//        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
//    }
//
//    @ExceptionHandler(UserAlreadyExistsException.class)
//    public String userAlreadyExistsException(UserAlreadyExistsException e)
//    {
//        String message = e.getMessage();
//        return message ;
//    }
//
//
//}





import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalException {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> MethodArgumentNotValidExceptionHandler(MethodArgumentNotValidException exception) {
        Map<String, String> errorMessage = new LinkedHashMap<>();
        exception.getAllErrors().forEach(error -> {
            errorMessage.put(error.getObjectName(), error.getDefaultMessage());

        });

        return errorMessage;
    }

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(UserAlreadyExistsException.class)
    public Map<String, String> UserAlreadyExistsExceptionHandler(UserAlreadyExistsException exception) {
        Map<String, String> errorMessage = new LinkedHashMap<>();

        errorMessage.put("Error message", exception.getMessage());

        return errorMessage;
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(UserNotFoundException.class)
    public Map<String, String> UserNotFoundExceptionHandler(UserNotFoundException exception) {
        Map<String, String> errorMessage = new LinkedHashMap<>();

        errorMessage.put("Error message", exception.getMessage());

        return errorMessage;
    }

}

