package com.omar.isdb62.pharmacy_management_backend.repository;

import com.omar.isdb62.pharmacy_management_backend.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface InventoryRepository extends JpaRepository <Inventory, Long> {

    Optional<Inventory> findByItemNameAndStrength(String itemName, String strength);

    List<Inventory> findAllByItemNameContainingIgnoreCase(String name);

    void deleteByItemNameAndStrength(String itemName, String strength);

    boolean existsByItemNameAndStrength(String itemName, String strength);


}
