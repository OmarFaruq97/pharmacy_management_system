package com.omar.isdb62.pharmacy_management_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemoDTO {

    private String customerName;
    private String contactNumber;
    private String itemName;
    private String category;
    private double price;
    private int quantity;
    private double subTotal;

    private double amount;
    private double discount;        // percentage, e.g. 5 for 5%
    private double discountAmount;
    private double netPayable;
}

