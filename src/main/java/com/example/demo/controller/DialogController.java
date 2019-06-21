package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.model.DialogInfo;
import com.example.demo.model.ResponseResult;
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

import java.util.Date;
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


    /**
     * 获取对话框集合
     *
     * @param model
     * @return
     */
    @RequestMapping("/getList")
    public String show(Model model) {
        List<DialogInfo> dialogList = dialogService.getDialogList();
        model.addAttribute("list", dialogList);
        return "dialog_detail";
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
        DialogInfo dialogInfo = dialogService.editDialog(id);
        Map<String, Object> map = new HashMap<>();
        map.put("code", 1);
        map.put("msg", "success");
        map.put("data", dialogInfo);
        return JSONObject.toJSON(map).toString();
    }

    /**
     * 保存对话框信息
     * todo:获取机器码信息作为创建人和修改人信息
     *
     * @param dialogInfo
     * @param uploadFile
     * @return
     */
    @ResponseBody
    @RequestMapping("/save")
    public String save(DialogInfo dialogInfo, MultipartFile file) {
//        Map res = Maps.newHashMap();
        Date date = new Date();
        //传入的上传文件以及对话框的id不为空时，说明此时是要保存编辑的文件
        if (file == null && dialogInfo.getId() != null) {
            dialogInfo.setUpdateTime(date);
            System.out.println(dialogInfo);
            dialogService.updateWithModified(dialogInfo);
            logger.info("保存被修改的对话框信息:[{}]", JSONObject.toJSONString(dialogInfo));
//            res.put("res","success");
            return JSONObject.toJSONString(ResponseResult.OK());
        } else if (file != null && dialogInfo != null) {
            try {
                dialogInfo.setUpdateTime(date);
                dialogInfo.setCreateTime(date);
                //跳过测试上传步骤
                dialogInfo.setDialogPath("C:\\Users\\zhuoguangjing\\Desktop\\image\\dd.jpg");
                dialogService.insert(dialogInfo);
                logger.info("插入新创建的对话框信息:[{}]", JSONObject.toJSONString(dialogInfo));
                return JSONObject.toJSONString(ResponseResult.OK());

            } catch (Exception e) {
                logger.error("保存对话框数据出错：", e);
                e.printStackTrace();

            }
        }
        return JSONObject.toJSONString(ResponseResult.ERROR());
    }

    @ResponseBody
    @RequestMapping("/delete")
    public String delete(Integer id) {
        if (id != null) {
            dialogService.deleteDialog(id);
            return JSONObject.toJSONString(ResponseResult.OK());
        }
        return JSONObject.toJSONString(ResponseResult.ERROR());
    }
}
