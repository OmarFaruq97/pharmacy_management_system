package com.omar.isdb62.pharmacy_management_backend.service;

import com.omar.isdb62.pharmacy_management_backend.model.Inventory;
import com.omar.isdb62.pharmacy_management_backend.repository.InventoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public  Inventory saveMedicine(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    public List<Inventory> getAllMedicine() {
        return inventoryRepository.findAll();
    }

    public List<Inventory> getMedByName(String name) {
        return inventoryRepository.findAllByItemNameContainingIgnoreCase(name);
    }

    public void deleteMedicineByNameAndStrength(String name, String strength) {
        Inventory inventory = inventoryRepository.findByItemNameAndStrength(name, strength)
                .orElseThrow(() -> new RuntimeException("Medicine not found with name: " + name+strength));
        inventoryRepository.delete(inventory);
    }

    public Inventory updateMedicineByNameAndStrength(String name,String strength, Inventory updatedInventory) {
        Inventory inventory = inventoryRepository.findByItemNameAndStrength(name, strength)
                .orElseThrow(() -> new RuntimeException("Medicine not found with name: " + name+strength));

        inventory.setCategory(updatedInventory.getCategory());
        inventory.setUnitPrice(updatedInventory.getUnitPrice());
        inventory.setPurchaseDiscount(updatedInventory.getPurchaseDiscount());
        inventory.setSellPrice(updatedInventory.getSellPrice());

        return inventoryRepository.save(inventory);
    }
}