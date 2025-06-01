package com.omar.isdb62.pharmacy_management_backend.controller;

import com.omar.isdb62.pharmacy_management_backend.model.AccessedCompanyMedicine;
import com.omar.isdb62.pharmacy_management_backend.service.AccessedCompanyMedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/access-company-medicine")
public class AccessedCompanyMedicineController {

    @Autowired
    private AccessedCompanyMedicineService accessedCompanyMedicineService;

    @PostMapping("/add")
    public AccessedCompanyMedicine addCompanyMedicine(@RequestBody AccessedCompanyMedicine date) {
        return accessedCompanyMedicineService.save(date);
    }

    @GetMapping("/all")
    public List<AccessedCompanyMedicine> getAllCompanyMedicines() {
        return accessedCompanyMedicineService.getAll();
    }
}