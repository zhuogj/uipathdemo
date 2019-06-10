package com.example.demo.configuration;

import com.baidu.aip.client.BaseClient;
import com.baidu.aip.http.AipRequest;
import org.json.JSONObject;

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
    public JSONObject basicGeneral(String base64Content, HashMap<String,String> options){
        AipRequest request = new AipRequest();
        this.preOperation(request);
        request.addBody("image",base64Content);
        if (options !=null){
            request.addBody(options);
        }
        request.setUri("https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic");
        this.postOperation(request);
        return this.requestServer(request);

    }
}
