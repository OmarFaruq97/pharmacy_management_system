package com.omar.isdb62.pharmacy_management_backend.service;

import com.omar.isdb62.pharmacy_management_backend.model.InvoiceHistory;
import com.omar.isdb62.pharmacy_management_backend.repository.InvoiceHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class InvoiceHistoryService {

    @Autowired
    private InvoiceHistoryRepository invoiceHistoryRepository;

    // Generate invoice number in the format: INV-yyyyMMdd-xxxx
    public String generateInvoiceNumber() {
        String datePrefix = new SimpleDateFormat("yyyyMMdd").format(new Date());
        String prefix = "INV-" + datePrefix;
        int count = invoiceHistoryRepository.countByInvoiceNumberStartingWith(prefix) + 1;
        return String.format("%s-%04d", prefix, count);
    }

    // Create new invoice with generated number
    public InvoiceHistory createInvoice(InvoiceHistory invoice) {
        invoice.setInvoiceNumber(generateInvoiceNumber());
        return invoiceHistoryRepository.save(invoice);
    }

    // Update invoice by invoice number
    public InvoiceHistory updateInvoiceByInvoiceNumber(String invoiceNumber, InvoiceHistory updatedInvoice) {
        InvoiceHistory invoice = invoiceHistoryRepository.findByInvoiceNumber(invoiceNumber)
                .orElseThrow(() -> new RuntimeException("Invoice not found with number: " + invoiceNumber));

        //some lines need to be removed from here because all field not to need edit
        invoice.setCustomerName(updatedInvoice.getCustomerName());
        invoice.setContactNumber(updatedInvoice.getContactNumber());
        invoice.setItemName(updatedInvoice.getItemName());
        invoice.setStrength(updatedInvoice.getStrength());
        invoice.setQuantity(updatedInvoice.getQuantity());
        invoice.setUnitPrice(updatedInvoice.getUnitPrice());
        invoice.setSubTotal(updatedInvoice.getSubTotal());
        invoice.setAmount(updatedInvoice.getAmount());
        invoice.setDiscount(updatedInvoice.getDiscount());
        invoice.setDiscountAmount(updatedInvoice.getDiscountAmount());
        invoice.setNetPayable(updatedInvoice.getNetPayable());

        return invoiceHistoryRepository.save(invoice);
    }

    // Delete invoice by invoice number
    public void deleteByInvoiceNumber(String invoiceNumber) {
        InvoiceHistory invoice = invoiceHistoryRepository.findByInvoiceNumber(invoiceNumber)
                .orElseThrow(() -> new RuntimeException("Invoice not found with number: " + invoiceNumber));
        invoiceHistoryRepository.delete(invoice);
    }

    public List<InvoiceHistory> getAllInvoiceHistories() {
        return invoiceHistoryRepository.findAll();
    }

    public InvoiceHistory getByInvoiceNumber(String invoiceNumber) {
        return invoiceHistoryRepository.findByInvoiceNumber(invoiceNumber)
                .orElseThrow(() -> new RuntimeException("Invoice not found with number: " + invoiceNumber));
    }
}
