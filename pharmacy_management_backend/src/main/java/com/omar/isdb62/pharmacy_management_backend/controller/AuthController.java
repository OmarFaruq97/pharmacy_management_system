package com.omar.isdb62.pharmacy_management_backend.controller;


import com.omar.isdb62.pharmacy_management_backend.configaration.JwtTokenProvider;
import com.omar.isdb62.pharmacy_management_backend.dto.LoginRequest;
import com.omar.isdb62.pharmacy_management_backend.dto.RegisterRequest;
import com.omar.isdb62.pharmacy_management_backend.dto.UserResponse;
import com.omar.isdb62.pharmacy_management_backend.model.CustomUserDetails;
import com.omar.isdb62.pharmacy_management_backend.model.User;
import com.omar.isdb62.pharmacy_management_backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;

    // Constructor injection for required services
    @Autowired
    public AuthController(AuthenticationManager authenticationManager,
                          JwtTokenProvider jwtTokenProvider,
                          UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
    }

    // ========== REGISTER USER ==========
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @Valid @RequestBody RegisterRequest registerRequest) {
        try {
            // Convert RegisterRequest DTO to User entity
            User user = new User(
                    registerRequest.email(),
                    registerRequest.password(),

                    //should be "ADMIN" or "PHARMACIST"
                    registerRequest.role(),

                    registerRequest.firstName(),
                    registerRequest.lastName(),
                    registerRequest.phoneNumber()
            );

            // Save user using UserService
            User savedUser = userService.createUser(user);

            // Prepare UserResponse DTO to return (excluding password)
            UserResponse userResponse = new UserResponse();
            userResponse.setId(savedUser.getId());
            userResponse.setEmail(savedUser.getEmail());
            userResponse.setRole(savedUser.getRole());
            userResponse.setFirstName(savedUser.getFirstName());
            userResponse.setLastName(savedUser.getLastName());
            userResponse.setPhoneNumber(savedUser.getPhoneNumber());

            return ResponseEntity.status(HttpStatus.CREATED).body(userResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ========== LOGIN USER ==========
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(HttpServletRequest request,
                                              HttpServletResponse response,
                                              @Valid @RequestBody LoginRequest loginRequest){
        try {
            //Authentication using email and password
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.email(),
                            loginRequest.password()
                    )
            );

            //Store authentication in the security context
            SecurityContextHolder.getContext().setAuthentication(authentication);

            //Generate JWT token
            String jwt = jwtTokenProvider.createToken(authentication);

            //Extract user details from authentication
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            User user = userDetails.user();

            //Prepare response with token and user info
            Map <String, Object> responseData = new HashMap<>();
            responseData.put("access_token", jwt);
            responseData.put("tokenType", "Bearer");

            //Add user-specific info
            Map<String, Object> userData= new HashMap<>();
            userData.put("id", user.getId());
            userData.put("email", user.getEmail());
            userData.put("role", user.getRole());
            userData.put("firstName", user.getFirstName());
            userData.put("lastName", user.getLastName());

            responseData.put("user", userData);

            return ResponseEntity.ok(responseData);
        }catch (AuthenticationException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid username or password");
        }
    }
}