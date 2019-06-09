package com.example.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/index")
public class IndexController {
    @RequestMapping("/test")
    public String index(String content){
        System.out.println(content);
        return content;
    }
    @RequestMapping("/index")
    public String index(){
        System.out.println("aa");
        return "Hello World";
    }
}
