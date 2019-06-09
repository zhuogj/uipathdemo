package com.example.demo.configuration;

import com.baidu.aip.ocr.AipOcr;

/**
 * @Description :
 * @Author : zhuoguangjing
 * @Date : 2019/6/6 16:08
 * @Version : 1.0
 */
public class AipOcrConfig {
    private static volatile AipOcr aipOcr;
    private AipOcrConfig(){}
    static{
        aipOcr = new AipOcr("16442496","Ps6a3d73wGGFk0FuuqMmqMpG","de8GWkOmxefXivuqOnORRtmc9RDH6DuO");
        aipOcr.setConnectionTimeoutInMillis(30000);
        aipOcr.setSocketTimeoutInMillis(60000);
    }
    public static AipOcr getInstance(){
        return aipOcr;
    }
}