package com.omar.isdb62.pharmacy_management_backend.repository;

import com.omar.isdb62.pharmacy_management_backend.model.AccessedCompanyMedicine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccessedCompanyMedicineRepository extends JpaRepository<AccessedCompanyMedicine, Long> {
}
