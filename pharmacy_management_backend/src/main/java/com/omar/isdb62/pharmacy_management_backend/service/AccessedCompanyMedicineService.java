package com.omar.isdb62.pharmacy_management_backend.service;

import com.omar.isdb62.pharmacy_management_backend.model.AccessedCompanyMedicine;
import com.omar.isdb62.pharmacy_management_backend.repository.AccessedCompanyMedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccessedCompanyMedicineService {

    @Autowired
    private AccessedCompanyMedicineRepository accessedCompanyMedicineRepository;


    public AccessedCompanyMedicine save(AccessedCompanyMedicine date) {
        return accessedCompanyMedicineRepository.save(date);
    }

    public List<AccessedCompanyMedicine> getAll() {
        return accessedCompanyMedicineRepository.findAll();
    }
}
