package com.example.demo.service;

import com.example.demo.model.ResponseResult;

import java.io.InputStream;

/**
 * @Description :
 * @Author : zhuoguangjing
 * @Date : 2019/6/3 14:26
 * @Version : 1.0
 */
public interface UploadService {
    /**
     * 图片上传至阿里云服务器，参数为图片原地址
     * @param bytes
     * @return
     */
    ResponseResult uploadImage(byte[] bytes);

    /**
     * 测试用
     * @param bytes
     * @param test
     * @return
     */
    ResponseResult uploadImage(byte[] bytes, String test);

    /**
     * 上传图片使用
     * @param inputStream
     * @return
     */
    ResponseResult uploadImage(InputStream inputStream);
}
