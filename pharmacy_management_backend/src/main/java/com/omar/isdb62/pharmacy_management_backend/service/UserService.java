package com.omar.isdb62.pharmacy_management_backend.service;

import com.omar.isdb62.pharmacy_management_backend.constants.Role;
import com.omar.isdb62.pharmacy_management_backend.model.User;
import com.omar.isdb62.pharmacy_management_backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id){
        return userRepository.findById(id);
    }

    public List <User> getUsersByRole(Role role) {
        return userRepository.findByRole(role);
    }

    @Transactional
    public User updateUser(Long id, User userDetails){
        User user= userRepository.findById(id).orElseThrow(()
                -> new RuntimeException("User not found with id: " + id));

        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setPhoneNumber(userDetails.getPhoneNumber());

        if(!user.getEmail().equals(userDetails.getEmail())){
            if (userRepository.existByEmail(userDetails.getEmail())){
                throw  new RuntimeException("Email is already in use");
            }
            user.setEmail(userDetails.getEmail());
        }

        if (userDetails.getPassword()
                != null && !userDetails.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        }

        if (userDetails.getRole() != null){
            user.setRole(userDetails.getRole());
        }
        return userRepository.save(user);
    }

}
