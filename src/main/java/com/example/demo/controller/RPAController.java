package com.example.demo.controller;

import com.example.demo.service.ExcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rpa")
public class RPAController {
    @Autowired
    private ExcelService excelService;
    @RequestMapping("/excel2Table")
    public String excel2Table(String filePath){
        excelService.excel2Table(filePath);
        return null;
    }
    @RequestMapping("/insertForEachRow")
    public String insert(String content){
        excelService.insert(content);
        System.out.println(content);
        return null;
    }
}
