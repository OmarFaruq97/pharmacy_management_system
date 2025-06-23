package com.omar.isdb62.pharmacy_management_backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "memo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Memo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String contactNumber;
    private String itemName;
    private String category;
    private double price;
    private int quantity;
    private double subtotal;

    private double amount;
    private double discount;
    private double discountAmount;
    private double netPayable;

    private LocalDate dateIssued = LocalDate.now();
}
