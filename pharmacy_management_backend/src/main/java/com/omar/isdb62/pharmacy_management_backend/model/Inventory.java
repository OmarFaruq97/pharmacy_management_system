package com.omar.isdb62.pharmacy_management_backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name= "pms_inventory")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Company")
    private String companyName;

    @Column(name = "item_name", nullable = false)
    private String itemName;

    private String strength;

    private String category;

    @Column(nullable = false)
    private int quantity;

    @Column(name = "unit_price", precision = 10, scale = 2 , nullable = false)
    private BigDecimal unitPrice;   //regular purchase price

    @Column(name = "purchase_discount", precision = 10, scale = 2)
    private BigDecimal purchaseDiscount;

    @Column(name = "net_purchase_price", precision = 10, scale = 2)
    private BigDecimal netPurchasePrice;

    @Column(name = "sell_price", precision = 10, scale = 2, nullable = false)
    private BigDecimal sellPrice;

    @Column(name = "total_inventory_value", precision = 10, scale = 2)
    private BigDecimal totalInventoryValue;
}