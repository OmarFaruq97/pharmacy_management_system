package com.omar.isdb62.pharmacy_management_backend.service;

import com.omar.isdb62.pharmacy_management_backend.model.Memo;
import com.omar.isdb62.pharmacy_management_backend.repository.MemoRepository;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
public class MemoService {

    @Autowired
    private MemoRepository memoRepository;

    public byte[] generateMemoReport(Long memoId) throws IOException {
        Memo memo = memoRepository.findById(memoId)
                .orElseThrow(() -> new IllegalArgumentException("Memo not found with ID: " + memoId));

        try {
            // Load and compile JRXML file
            File jrxmlFile = ResourceUtils.getFile("classpath:report/memo.jrxml");
            JasperReport jasperReport = JasperCompileManager.compileReport(jrxmlFile.getAbsolutePath());

            // Prepare data source
            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(Collections.singletonList(memo));

            // Set report parameters (if any)
            Map<String, Object> parameters = new HashMap<>();

            // Fill the report
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

            // Export to PDF bytes
            return JasperExportManager.exportReportToPdf(jasperPrint);
        } catch (JRException e) {
            throw new IOException("Error generating prescription report", e);
        }
    }



}
