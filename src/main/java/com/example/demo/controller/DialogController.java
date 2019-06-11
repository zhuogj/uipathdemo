package com.example.demo.controller;

import com.example.demo.model.DialogInfo;
import com.example.demo.service.DialogService;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * @Description :
 * @Author : zhuoguangjing
 * @Date : 2019/6/11 15:29
 * @Version : 1.0
 */

@Controller
@RequestMapping("/dialog")
public class DialogController {
    private static Logger logger = LoggerFactory.getLogger(DialogController.class);
    @Autowired
    private DialogService dialogService;
    @RequestMapping("/add")
    public String deploy(Model model, DialogInfo dialogInfo, MultipartFile file){

        return null;
    }
    @RequestMapping("/show")
    public String show(Model model){
        List<DialogInfo> dialogList = dialogService.getDialogList();
        model.addAttribute("list",dialogList);
        return "dialog_detail";
    }

    @RequestMapping("/edit/{id}")
    public String edit( @PathVariable("id")int id){
        DialogInfo dialogInfo = dialogService.editDialog(id);
//        model.addAttribute("p",dialogInfo);
        JSONObject object = new JSONObject();
        object.put("p",dialogInfo);
        return object.toString();

    }
}
