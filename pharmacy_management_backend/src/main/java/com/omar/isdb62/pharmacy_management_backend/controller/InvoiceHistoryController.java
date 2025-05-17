package com.omar.isdb62.pharmacy_management_backend.controller;

import com.omar.isdb62.pharmacy_management_backend.model.InvoiceHistory;
import com.omar.isdb62.pharmacy_management_backend.service.InvoiceHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/invoice")
public class InvoiceHistoryController {

    @Autowired
    private InvoiceHistoryService invoiceHistoryService;

    // GET all invoice_history
    @GetMapping("/all")
    public List<InvoiceHistory> getAllInvoices() {
        return invoiceHistoryService.getAllInvoiceHistories();
    }

    // GET by invoice number
    @GetMapping("/{invoiceNumber}")
    public ResponseEntity<InvoiceHistory> getByInvoiceNumber(@PathVariable String invoiceNumber) {
            InvoiceHistory invoice = invoiceHistoryService.getByInvoiceNumber(invoiceNumber);
            return ResponseEntity.ok(invoice);
    }


    // POST create new invoice (auto-generates invoice number)
//   @PostMapping("/create")
//    public ResponseEntity<InvoiceHistory> createInvoice(@RequestBody InvoiceHistory invoice) {
//        InvoiceHistory created = invoiceHistoryService.createInvoice(invoice);
//        return ResponseEntity.ok(created);
//    }

    //ChatGPT NOSTO code if not work above code then apply this code riha
    @PostMapping("/create")
    public ResponseEntity<List<InvoiceHistory>> createInvoice(@RequestBody List<InvoiceHistory> invoices) {
        List<InvoiceHistory> savedInvoices = new ArrayList<>();
        for (InvoiceHistory invoice : invoices) {
            invoice.setInvoiceNumber(invoiceHistoryService.generateInvoiceNumber());
            savedInvoices.add(invoiceHistoryService.createInvoice(invoice));
        }
        return ResponseEntity.ok(savedInvoices);
    }


    // PUT (Update) by invoiceNumber
    @PutMapping("/update/{invoiceNumber}")
    public ResponseEntity<InvoiceHistory> updateInvoiceByInvoiceNumber(
            @PathVariable String invoiceNumber,
            @RequestBody InvoiceHistory updatedInvoice
    ) {
        InvoiceHistory updated = invoiceHistoryService.updateInvoiceByInvoiceNumber(invoiceNumber, updatedInvoice);
        return ResponseEntity.ok(updated);
    }

    //  DELETE by invoiceNumber
    @DeleteMapping("/delete/{invoiceNumber}")
    public ResponseEntity<String> deleteInvoiceByInvoiceNumber(@PathVariable String invoiceNumber) {
        invoiceHistoryService.deleteByInvoiceNumber(invoiceNumber);
        return ResponseEntity.ok("Invoice with number " + invoiceNumber + " deleted successfully.");
    }
}
