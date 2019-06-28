package com.example.demo.mapper;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.DemoApplicationTests;
import org.junit.Test;

/**
 * @Description :
 * @Author : zhuoguangjing
 * @Date : 2019/6/25 17:54
 * @Version : 1.0
 */
public class JsonTest extends DemoApplicationTests {
    @Test
    public void test(){
        String json = "{\"data\":{\"accessToken\":\"at.8k9axeawaqfnmkfn3fmgf2roclymppnm-7zoagogjgj-00a7ywi-faqsny4wx\",\"expireTime\":1562059742851},\"code\":\"200\",\"msg\":\"aa\"}";
        JSONObject jsonObject = JSONObject.parseObject(json);
        JSONObject data = jsonObject.getJSONObject("data");
        String accessToken = data.getString("accessToken");
        System.out.println(accessToken);
    }
}
