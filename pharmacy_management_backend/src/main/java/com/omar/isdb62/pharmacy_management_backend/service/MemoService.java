package com.omar.isdb62.pharmacy_management_backend.service;

import com.omar.isdb62.pharmacy_management_backend.dto.MemoDTO;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MemoService {
    public byte[] exportMemoReport(List<MemoDTO> memoData) throws JRException, IOException {
        // Load template
        InputStream reportStream = this.getClass().getResourceAsStream("/reports/memo_template.jrxml");
        JasperReport jasperReport = JasperCompileManager.compileReport(reportStream);

        // Convert DTO list to JRBeanCollectionDataSource
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(memoData);

        // Optional: add parameters
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("createdBy", "Pharmacy Management System");

        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

        return JasperExportManager.exportReportToPdf(jasperPrint);
    }


}
