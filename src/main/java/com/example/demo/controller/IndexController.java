package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/index")
public class IndexController {
    @RequestMapping("/test")
    public String index(String content){
        System.out.println(content);
        return content;
    }
    @RequestMapping("/index")
    public String index(Model model){
        model.addAttribute("name","nick");
        return "index";
    }
    @RequestMapping("forward")
    public String forward(Model model){
        model.addAttribute("result","测试成功");
        return "dialog_detail";
    }
}
