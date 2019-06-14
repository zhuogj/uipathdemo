package com.example.demo.service.impl;

import com.example.demo.model.CompanyInfo;
import com.example.demo.service.CompanyInfoService;
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
    @Override
    public List<CompanyInfo> getCompanyInfoList() {
        return null;
    }

    @Override
    public CompanyInfo editCompanyInfo(Integer id) {
        return null;
    }

    @Override
    public void deleteCompanyInfo(Integer id) {

    }

    @Override
    public void updateWithModified(CompanyInfo companyInfo) {

    }

    @Override
    public int insert(CompanyInfo companyInfo) {
        return 0;
    }
}
