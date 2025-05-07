package com.omar.isdb62.pharmacy_management_backend.controller;

import com.omar.isdb62.pharmacy_management_backend.model.Inventory;
import com.omar.isdb62.pharmacy_management_backend.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @GetMapping("/all")
    public List <Inventory> getAllMedicine(){
        return inventoryService.getAllMedicine();
    }

    @GetMapping("/search")
    public List <Inventory> getMedByName(@RequestParam String name){
        return inventoryService.getMedByName(name);
    }

    @PostMapping("/receive")
    public Inventory receivedMed(@RequestBody Inventory inventory){
        return inventoryService.saveMedicine(inventory);
    }

    @DeleteMapping("/delete-by-name")
    public ResponseEntity<String> deleteMedicineByName(@RequestParam String name) {
        inventoryService.deleteMedicineByName(name);
        return ResponseEntity.ok("Medicine deleted successfully with name: " + name);
    }

    @PutMapping("/update-by-name")
    public ResponseEntity<Inventory> updateMedicine(@RequestParam String name, @RequestBody Inventory updatedInventory) {
        Inventory updated = inventoryService.updateMedicineByName(name, updatedInventory);
        return ResponseEntity.ok(updated);
    }

}
