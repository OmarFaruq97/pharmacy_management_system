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

    @DeleteMapping("/delete-by-name-and-strength")
    public ResponseEntity<String> deleteByNameAndStrength(@RequestParam String name,
                                                          @RequestParam String strength) {
        inventoryService.deleteMedicineByNameAndStrength(name, strength);
        return ResponseEntity.ok( name+ strength +"mg or ml" + ": Medicine deleted successfully" );
    }

    @PutMapping("/update-by-name-and-strength")
    public ResponseEntity<Inventory> updateMedicineByNameAndStrength(@RequestParam String name,@RequestParam String strength, @RequestBody Inventory updatedInventory) {
        Inventory updated = inventoryService.updateMedicineByNameAndStrength(name, strength,  updatedInventory);
        return ResponseEntity.ok(updated);
    }
}