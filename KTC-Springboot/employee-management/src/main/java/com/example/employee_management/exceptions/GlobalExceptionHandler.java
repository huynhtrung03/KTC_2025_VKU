package com.example.employee_management.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Xử lý các lỗi Validation
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<CustomErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        List<String> messages = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> error.getDefaultMessage())
                .collect(Collectors.toList());

        CustomErrorResponse response = new CustomErrorResponse(messages, "BadRequest", HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    // Xử lý các ngoại lệ chung
    @ExceptionHandler(Exception.class)
    public ResponseEntity<CustomErrorResponse> handleGeneralException(Exception ex) {
        CustomErrorResponse response = new CustomErrorResponse(
                List.of(ex.getMessage()),
                "Internal Server Error",
                HttpStatus.INTERNAL_SERVER_ERROR.value());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Xử lý ngoại lệ IllegalArgumentException
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<CustomErrorResponse> handleIllegalArgumentException(IllegalArgumentException ex) {
        CustomErrorResponse response = new CustomErrorResponse(
                List.of(ex.getMessage()),
                "Bad Request",
                HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    // Lớp để tạo response lỗi tùy chỉnh
    public static class CustomErrorResponse {
        private List<String> message;
        private String error;
        private int statusCode;

        public CustomErrorResponse(List<String> message, String error, int statusCode) {
            this.message = message;
            this.error = error;
            this.statusCode = statusCode;
        }

        public List<String> getMessage() {
            return message;
        }

        public String getError() {
            return error;
        }

        public int getStatusCode() {
            return statusCode;
        }
    }

    // // IllegalArgumentException
    // // 404 - Not Found, 409 - Conflict, 400 - Bad Request
    // @ExceptionHandler(IllegalArgumentException.class)
    // public ResponseEntity<Map<String, String>>
    // handleNotFound(IllegalArgumentException e) {
    // Map<String, String> error = new HashMap<>();
    // error.put("error", e.getMessage());
    // error.put("status", "404");

    // if (e.getMessage().contains("not found")) {
    // return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error); // 404
    // }

    // if (e.getMessage().contains("already exists")) {
    // return ResponseEntity.status(HttpStatus.CONFLICT).body(error); // 409
    // }

    // return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error); // 400
    // }

    // // 400 - Validation Error
    // @ExceptionHandler(MethodArgumentNotValidException.class)
    // public ResponseEntity<Map<String, Object>>
    // handleValidationError(MethodArgumentNotValidException e) {
    // Map<String, Object> errors = new HashMap<>();
    // errors.put("error", "Validation Failed");
    // errors.put("status", "400");

    // Map<String, String> fieldErrors = new HashMap<>();
    // e.getBindingResult().getFieldErrors().forEach(error -> {
    // fieldErrors.put(error.getField(), error.getDefaultMessage());
    // });
    // errors.put("details", fieldErrors);

    // return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors); // 400
    // }

    // // 500 - Internal Server Error
    // @ExceptionHandler(Exception.class)
    // public ResponseEntity<Map<String, String>> handleGeneralError(Exception e) {
    // Map<String, String> error = new HashMap<>();
    // error.put("error", "Internal Server Error");
    // error.put("message", e.getMessage());
    // error.put("status", "500");

    // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    // // 500
    // }
}
