package com.omar.isdb62.pharmacy_management_backend.controller;

import com.omar.isdb62.pharmacy_management_backend.dto.MemoDTO;
import com.omar.isdb62.pharmacy_management_backend.service.MemoService;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/memo")
public class MemoController {

    @Autowired
    private MemoService memoService;

    @GetMapping("/invoice/{invoiceId}")
    public ResponseEntity<byte[]> generateInvoice(@PathVariable Long invoiceId) {
        try {
            // 1. Get invoice data
            List<MemoDTO> items = memoService.getInvoiceDetails(invoiceId);

            if (items.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            // 2. Prepare Jasper report
            InputStream templateStream = getClass().getResourceAsStream("/invoices/invoice_template.jrxml");
            JasperReport jasperReport = JasperCompileManager.compileReport(templateStream);

            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(items);

            // 3. Parameters for dynamic fields (like customer name)
            Map<String, Object> params = new HashMap<>();
            params.put("customerName", items.get(0).getCustomerName());
            params.put("contactNumber", items.get(0).getContactNumber());
            params.put("amount", items.get(0).getAmount());
            params.put("discount", items.get(0).getDiscount());
            params.put("discountAmount", items.get(0).getDiscountAmount());
            params.put("netPayable", items.get(0).getNetPayable());

            // 4. Fill and export PDF
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, params, dataSource);
            byte[] pdfBytes = JasperExportManager.exportReportToPdf(jasperPrint);

            // 5. Return PDF response
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "invoice.pdf");

            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace(); // helpful for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
