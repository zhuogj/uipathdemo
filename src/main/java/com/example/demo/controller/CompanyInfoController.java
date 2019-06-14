package com.example.demo.controller;

import com.example.demo.model.CompanyInfo;
import com.example.demo.service.CompanyInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

/**
 * @Description : 用于维护税务账户登录信息
 * @Author : zhuoguangjing
 * @Date : 2019/6/14 16:11
 * @Version : 1.0
 */
@Controller
@RequestMapping("/company")
public class CompanyInfoController {
    @Autowired
    private CompanyInfoService companyInfoService;
    @RequestMapping("/getList")
    public String getList(Model model){

        List<CompanyInfo> companyInfoList = companyInfoService.getCompanyInfoList();
        model.addAttribute("list",companyInfoList);
        return "";
    }

}
