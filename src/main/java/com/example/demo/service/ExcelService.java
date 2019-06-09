package com.example.demo.service;

/**
 * 操作Excel的工具类
 */
public interface ExcelService {
    void excel2Table(String filePath);
    void insert(String rowContent);
}
