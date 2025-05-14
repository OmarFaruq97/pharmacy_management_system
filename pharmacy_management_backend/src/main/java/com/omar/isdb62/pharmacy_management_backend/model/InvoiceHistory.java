package com.omar.isdb62.pharmacy_management_backend.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name= "pms_invoice_history")
public class InvoiceHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //1
    private String invoiceNumber;

    //2
    private String customerName;
    //3
    private String contactNumber;

    //4
    @Column(name = "item_name", nullable = false)
    private String itemName;

    //5
    private int quantity;

    //6
    private double unitPrice;

    //7
    private double subTotal;

    //8
    private double amount;

    //10
    private double discount;

    //11
    private double discountAmount;

    //12
    private double netPayable;

}
