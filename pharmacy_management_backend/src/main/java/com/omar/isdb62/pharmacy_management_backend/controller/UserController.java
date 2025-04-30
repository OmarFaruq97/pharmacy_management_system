package com.omar.isdb62.pharmacy_management_backend.controller;

import com.omar.isdb62.pharmacy_management_backend.annotation.CurrentUser;
import com.omar.isdb62.pharmacy_management_backend.constants.Role;
import com.omar.isdb62.pharmacy_management_backend.dto.UserCreateRequest;
import com.omar.isdb62.pharmacy_management_backend.dto.UserResponse;
import com.omar.isdb62.pharmacy_management_backend.model.User;
import com.omar.isdb62.pharmacy_management_backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/user")
    public UserDetails user(@CurrentUser UserDetails currentUser) {
        return currentUser;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getAllUsers() {
        return userService.getAllUsers().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    // Allow access if the user is an ADMIN or accessing their own user ID
    @PreAuthorize("hasRole('ADMIN') or @userSecurity.hasUserId(authentication, #id)")
    public ResponseEntity<UserResponse> getUsersById (@PathVariable Long id) {
        return userService.getUserById(id)
                .map(user -> ResponseEntity.ok(convertToDTO(user)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/role/{role}")
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getUsersByRole(@PathVariable Role role){
        return userService.getUsersByRole(role).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody UserCreateRequest userCreateRequest){
        User user = new User(
                userCreateRequest.email();
        )
    }


    // Helper method to convert User entity to UserDTO (this method create as solve error)
    private UserResponse convertToDTO (User user){
        UserResponse dto = new UserResponse();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setPhoneNumber(user.getPhoneNumber());

        dto.setCreatedAt(user.getCreateAt());
        dto.setUpdatedAt(user.getUpdateAt());

        return dto;
    }
}
