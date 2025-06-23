package com.omar.isdb62.pharmacy_management_backend.service;

import com.omar.isdb62.pharmacy_management_backend.model.Memo;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

public class MemoGeneratorService {
    public void generateFromJavaBean(Memo memo, String outputPath) throws Exception {
        // Load the Jasper template (from resources)
        InputStream reportStream = getClass().getResourceAsStream("/report/memo.jrxml");
        JasperReport jasperReport = JasperCompileManager.compileReport(reportStream);

        // Map for fields used directly in $F{} (not part of collection)
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("customerName", memo.getCustomerName());
        parameters.put("contactNumber", memo.getContactNumber());
        parameters.put("ItemName", memo.getItemName());
        parameters.put("quantity", memo.getQuantity());
        parameters.put("amount", memo.getAmount());
        parameters.put("discount", memo.getDiscount());
        parameters.put("discountAmount", memo.getDiscountAmount());
        parameters.put("netPayable", memo.getNetPayable());
        parameters.put("dateIssued", java.sql.Date.valueOf(memo.getDateIssued()));

        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(
                java.util.Collections.singletonList(memo)
        );

        // 4. Fill report and export
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
        JasperExportManager.exportReportToPdfFile(jasperPrint, outputPath);
    }
}
