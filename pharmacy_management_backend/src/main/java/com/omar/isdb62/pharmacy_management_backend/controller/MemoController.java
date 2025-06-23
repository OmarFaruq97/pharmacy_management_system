package com.omar.isdb62.pharmacy_management_backend.controller;

import com.omar.isdb62.pharmacy_management_backend.service.MemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/memo")
public class MemoController {
    @Autowired
    private MemoService memoService;

    @GetMapping("/{id}/download")
    public ResponseEntity<ByteArrayResource> downloadMemo(@PathVariable Long id) throws IOException {
        byte[] reportBytes = memoService.generateMemoReport(id);

        ByteArrayResource resource = new ByteArrayResource(reportBytes);

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=CashMemo_" + id + ".pdf");
        headers.add(HttpHeaders.CACHE_CONTROL, "no-cache, no-store, must-revalidate");
        headers.add(HttpHeaders.PRAGMA, "no-cache");
        headers.add(HttpHeaders.EXPIRES, "0");

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(reportBytes.length)
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }
}
