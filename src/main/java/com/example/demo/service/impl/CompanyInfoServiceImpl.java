package com.example.demo.service.impl;

import com.example.demo.mapper.CompanyInfoMapper;
import com.example.demo.model.CompanyInfo;
import com.example.demo.service.CompanyInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Description :
 * @Author : zhuoguangjing
 * @Date : 2019/6/14 16:18
 * @Version : 1.0
 */
@Service
public class CompanyInfoServiceImpl implements CompanyInfoService {
    @Autowired
    private CompanyInfoMapper companyInfoMapper;
    @Override
    public List<CompanyInfo> getCompanyInfoList() {
        return companyInfoMapper.selectAll();
    }

    @Override
    public CompanyInfo editCompanyInfo(Integer id) {
        return companyInfoMapper.selectByPrimaryKey(id);
    }

    @Override
    public void deleteCompanyInfo(Integer id) {
        companyInfoMapper.deleteByPrimaryKey(id);
    }

    @Override
    public void updateWithModified(CompanyInfo companyInfo) {
        companyInfoMapper.updateByPrimaryKey(companyInfo);
    }

    @Override
    public int insert(CompanyInfo companyInfo) {
        return companyInfoMapper.insert(companyInfo);
    }
}
