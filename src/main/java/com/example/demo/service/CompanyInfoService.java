package com.example.demo.service;

import com.example.demo.model.CompanyInfo;

import java.util.List;

/**
 * @Description :
 * @Author : zhuoguangjing
 * @Date : 2019/6/14 16:13
 * @Version : 1.0
 */
public interface CompanyInfoService {
    /**
     * 获取对话框集合
     * @return
     */
    List<CompanyInfo> getCompanyInfoList();


    /**
     * 修改对话框
     */
    CompanyInfo editCompanyInfo(Integer id);

    /**
     * 逻辑删除，状态改为无效
     */
    void deleteCompanyInfo(Integer id);

    /**
     * 更新被修改的部分,其余部分不动
     * @param companyInfo
     */
    void updateWithModified(CompanyInfo companyInfo);

    /**
     * 插入数据
     * @param companyInfo
     * @return
     */
    int insert(CompanyInfo companyInfo);
}
