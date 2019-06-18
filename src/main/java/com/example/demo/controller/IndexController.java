package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class IndexController {
    @RequestMapping("/test")
    public String index(String content){
        System.out.println(content);
        return content;
    }
    @RequestMapping("/")
    public String index(Model model){
        return "index";
    }
}
