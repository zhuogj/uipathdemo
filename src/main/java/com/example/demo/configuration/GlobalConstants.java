package com.example.demo.configuration;

import org.springframework.context.annotation.Configuration;

/**
 * @Description :
 * @Author : zhuoguangjing
 * @Date : 2019/6/3 9:35
 * @Version : 1.0
 */
@Configuration
public class GlobalConstants {
    /**
     * 图片存至redis的地址
     */
    public static final String RAW_IMAGE = "RAW_IMAGE";
    /**
     * 生成的图片保存至阿里云的地址
     */
    public static final String OUTPUT_IMAGE_PATH = "//";
    /**
     * 文件上传时的日期格式
     */
    public static final String DATE_FORMAT = "yyyy-MM-dd_HH:mm:ss";
    /**
     * 上传文件的后缀名（图片）
     */
    public static final String IMAGE_SUFFIX = ".jpg";
    /**
     * 百度OCR接口APPID
     */
    public static final String BAIDU_OCR_APP_ID="16442496";
    /**
     * 百度OCR接口APPKEY
     */
    public static final String BAIDU_OCR_APP_KEY="Ps6a3d73wGGFk0FuuqMmqMpG";
    /**
     * 百度OCR接口SECRETKEY
     */
    public static final String BAIDU_OCR_SECRET_KEY="de8GWkOmxefXivuqOnORRtmc9RDH6DuO";
    /**
     * 百度OCR接口图片文字识别地址
     */
    public static final String BAIDU_OCR_BASE_URL="https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic";

    /**
     * 百度OCR接口access_token
     */
    public static final String BAIDU_OCR_ACCRSS_TOKEN = "24.7f5faa345bb0bd6bebf6e3915fb15e63.2592000.1562381062.282335-16442496";
    /**
     * 百度OCR接口错误码error_msg
     */
    public static final String ERROR_MSG = "error_msg";
    /**
     * 百度OCR接口文字结果words_result
     */
    public static final String WORDS_RESULT = "words_result";

}
