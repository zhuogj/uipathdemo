package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.model.DialogInfo;
import com.example.demo.service.DialogService;
import com.example.demo.service.UploadService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    @Autowired
    private UploadService uploadService;
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
    @ResponseBody
    @RequestMapping("/edit")
    public String edit(Integer id){
        DialogInfo dialogInfo = dialogService.editDialog(id);
        Map<String,Object> map = new HashMap<>();
        map.put("code",1);
        map.put("msg","success");
        map.put("data",dialogInfo);
        String s =  JSONObject.toJSON(map).toString();
        System.out.println(s);
        return s;
    }
    @ResponseBody
    @RequestMapping("/save")
    public String save(DialogInfo dialogInfo,MultipartFile uploadFile){
        System.out.println(uploadFile.getOriginalFilename());
        try {
            InputStream inputStream = uploadFile.getInputStream();
            uploadService.uploadImage(inputStream, "test");
            dialogInfo.setDialogPath("C:\\Users\\zhuoguangjing\\Desktop\\image\\dd.jpg");
            dialogService.insert(dialogInfo);

        }catch (Exception e){
            e.printStackTrace();
        }
        return "false";
    }
}
