package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.configuration.AipOcrConfig;
import org.json.JSONArray;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

/**
 * @Description :
 * @Author : zhuoguangjing
 * @Date : 2019/6/18 10:50
 * @Version : 1.0
 */
@Controller
@RequestMapping("/ocr")
public class BaiDuOcrController {
    @RequestMapping("/image")
    @ResponseBody
    public String getText(MultipartFile file) {
        Map<String, Object> map = new HashMap<>();
        try {
            InputStream inputStream = file.getInputStream();
            //此处需要调用ocr接口识别图片文字
            try {
                org.json.JSONObject jsonObject = AipOcrConfig.getInstance().basicGeneral(inputStream, null);
                JSONArray array = null;
                if (jsonObject != null && (array = jsonObject.getJSONArray("words_result")).length()>0) {
                    StringBuffer buffer = new StringBuffer();
                    for (int i = 0; i < array.length(); i++) {
                        buffer.append(array.getJSONObject(i).getString("words"));
                    }
                    map.put("code", 1);
                    map.put("msg", "success");
                    map.put("data", buffer.toString());
                    return JSONObject.toJSON(map).toString();
                }else {
                    map.put("code", 0);
                    map.put("msg", "error");
                    map.put("data", "图片无法识别出文字！");
                    return JSONObject.toJSON(map).toString();

                }
            } catch (Exception e) {
                e.printStackTrace();
            }

        } catch (Exception e) {
            e.printStackTrace();

        }
        return null;
    }
}
