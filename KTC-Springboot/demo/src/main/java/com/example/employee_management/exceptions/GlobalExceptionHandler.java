// package com.example.employee_management.exceptions;

// import java.util.ArrayList;
// import java.util.HashMap;
// import java.util.List;
// import java.util.Map;

// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.MethodArgumentNotValidException;
// import org.springframework.web.bind.annotation.ControllerAdvice;
// import org.springframework.web.bind.annotation.ExceptionHandler;

// @ControllerAdvice
// public class GlobalExceptionHandler {
//     @ExceptionHandler(MethodArgumentNotValidException.class)
//     public ResponseEntity<CustomErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
//         List<String> messages = ex.getBindingResult()
//                 .getFieldErrors()
//                 .stream()
//                 .map(error -> error.getDefaultMessage())
//                 .toList();

//         CustomErrorResponse response = new CustomErrorResponse(messages, "BadRequest", 400);
//         return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
//     }

//     // Other exception handlers can be added here
//     @ExceptionHandler(Exception.class)
//     public ResponseEntity<Map<String, List<String>>> handleGeneralException(Exception ex) {
//         Map<String, List<String>> errors = new HashMap<>();
//         errors.computeIfAbsent("errors", k -> new ArrayList<>()).add(ex.getMessage());

//         return new ResponseEntity<>(errors, HttpStatus.INTERNAL_SERVER_ERROR);
//     }

//     @ExceptionHandler(IllegalArgumentException.class)
//     public ResponseEntity<?> handleIllegalArgument(IllegalArgumentException ex) {
//         List<String> messages = List.of(ex.getMessage());
//         return ResponseEntity.badRequest().body(
//                 new CustomErrorResponse(messages, "Bad Request", 400));
//     }

//     public static class CustomErrorResponse {
//         private List<String> message;
//         private String error;
//         private int statusCode;

//         public CustomErrorResponse(List<String> message, String error, int statusCode) {
//             this.message = message;
//             this.error = error;
//             this.statusCode = statusCode;
//         }

//         public List<String> getMessage() {
//             return message;
//         }

//         public String getError() {
//             return error;
//         }

//         public int getStatusCode() {
//             return statusCode;
//         }
//     }
// }

// File: src/main/java/com/example/employee_management/exceptions/GlobalExceptionHandler.java

package com.example.employee_management.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.List;
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
}
