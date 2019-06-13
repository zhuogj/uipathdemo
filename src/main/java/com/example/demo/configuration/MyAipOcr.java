package com.example.demo.configuration;

import com.baidu.aip.client.BaseClient;
import com.baidu.aip.http.AipRequest;
import com.baidu.aip.util.Base64Util;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;

/**
 * @Description :
 * @Author : zhuoguangjing
 * @Date : 2019/6/10 14:38
 * @Version : 1.0
 */
public class MyAipOcr extends BaseClient {
    public MyAipOcr(String appId, String apiKey, String secretKey) {
        super(appId, apiKey, secretKey);
    }

    public JSONObject basicGeneral(String base64Content, HashMap<String, String> options) {
        AipRequest request = new AipRequest();
        this.preOperation(request);
        request.addBody("image", base64Content);
        if (options != null) {
            request.addBody(options);
        }
        request.setUri("https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic");
        this.postOperation(request);
        return this.requestServer(request);

    }

    public JSONObject basicGeneral(InputStream inputStream, HashMap<String, String> options) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        byte[] bytes = new byte[1024];
        byte[] image = null;
        int len=-1;
        try {
            while ((len = inputStream.read(bytes))!=-1){
                outputStream.write(bytes,0,len);
                image = outputStream.toByteArray();
            }
        }catch (IOException e){
            e.printStackTrace();
        }finally {
            if(inputStream != null){
                try {outputStream.close();} catch (IOException e) {}
            }
            if(inputStream != null){
                try {inputStream.close();} catch (IOException e) {}
            }
        }

        AipRequest request = new AipRequest();
        this.preOperation(request);
        String base64Content = Base64Util.encode(image);
        request.addBody("image", base64Content);
        if (options != null) {
            request.addBody(options);
        }
        request.setUri("https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic");
        this.postOperation(request);
        return this.requestServer(request);
    }
}
