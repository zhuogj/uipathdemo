package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.model.CompanyInfo;
import com.example.demo.model.ResponseResult;
import com.example.demo.service.CompanyInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Description : 用于维护税务账户登录信息
 * @Author : zhuoguangjing
 * @Date : 2019/6/14 16:11
 * @Version : 1.0
 */
@Controller
@RequestMapping("/companyInfo")
public class CompanyInfoController {
    private static Logger logger = LoggerFactory.getLogger(CompanyInfoController.class);
    @Autowired
    private CompanyInfoService companyInfoService;

    @RequestMapping("/getList")
    public String getList(Model model) {

        List<CompanyInfo> companyInfoList = companyInfoService.getCompanyInfoList();
        model.addAttribute("list", companyInfoList);
        return "companyInfo_detail";
    }

    /**
     * 跳转至对话框信息编辑页面
     *
     * @param id
     * @return
     */
    @ResponseBody
    @RequestMapping("/edit")
    public String edit(Integer id) {
        CompanyInfo companyInfo = companyInfoService.editCompanyInfo(id);
        Map<String, Object> map = new HashMap<>();
        map.put("code", 1);
        map.put("msg", "success");
        map.put("data", companyInfo);
        return JSONObject.toJSON(map).toString();
    }

    /**
     * 保存对话框信息
     * todo:获取机器码信息作为创建人和修改人信息
     *
     * @param companyInfo
     * @return
     */
    @ResponseBody
    @RequestMapping("/save")
    public String save(CompanyInfo companyInfo) {
//        Map res = Maps.newHashMap();
        Date date = new Date();
        try {
            //传入的上传文件以及对话框的id不为空时，说明此时是要保存编辑的文件
            if (companyInfo.getId() != null) {
                companyInfoService.updateWithModified(companyInfo);
                logger.info("保存被修改的对话框信息:[{}]", JSONObject.toJSONString(companyInfo));
//            res.put("res","success");
                return JSONObject.toJSONString(ResponseResult.OK());
            } else {
                companyInfo.setCreateTime(date);
                companyInfoService.insert(companyInfo);
                logger.info("插入新创建的对话框信息:[{}]", JSONObject.toJSONString(companyInfo));
                return JSONObject.toJSONString(ResponseResult.OK());
            }
        } catch (Exception e) {
            e.printStackTrace();
            return JSONObject.toJSONString(ResponseResult.ERROR());
        }
    }

    @ResponseBody
    @RequestMapping("/delete")
    public String delete(Integer id) {
        if (id != null) {
            companyInfoService.deleteCompanyInfo(id);
            return JSONObject.toJSONString(ResponseResult.OK());
        }
        return JSONObject.toJSONString(ResponseResult.ERROR());
    }

}
