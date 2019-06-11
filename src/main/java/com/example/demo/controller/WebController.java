package com.example.demo.controller;

import com.example.demo.model.UipathTest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;

/**
 * @Description :
 * @Author : zhuoguangjing
 * @Date : 2019/6/11 10:36
 * @Version : 1.0
 */
@Controller
@RequestMapping("/index")
public class WebController {
    @RequestMapping("/showEmp")
    public String showEmp(Model model){
        ArrayList<UipathTest> uipathTests = new ArrayList<>();
        UipathTest aa = UipathTest.builder().name("aa").age(13).salary("111").build();
        uipathTests.add(aa);
        model.addAttribute("list",uipathTests);
        return "test";

    }
    @RequestMapping("/index1")
    public String index(Model model){
        System.out.println("index");
        return "index";
    }
    @RequestMapping("/hello")
    public String hello(Model model){
        model.addAttribute("hello","你好");
        return "dialog_detail";
    }

}
