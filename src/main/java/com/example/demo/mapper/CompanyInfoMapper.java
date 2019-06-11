package com.example.demo.mapper;

import com.example.demo.model.CompanyInfo;
import java.util.List;

public interface CompanyInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(CompanyInfo record);

    CompanyInfo selectByPrimaryKey(Integer id);

    List<CompanyInfo> selectAll();

    int updateByPrimaryKey(CompanyInfo record);
}