package com.example.demo.service.impl;

import com.example.demo.configuration.GlobalConstants;
import com.example.demo.model.ResponseResult;
import com.example.demo.service.UploadService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

/**
 * @Description :
 * @Author : zhuoguangjing
 * @Date : 2019/6/3 14:29
 * @Version : 1.0
 */
@Service
public class UploadServiceImpl implements UploadService {
    private Logger logger = LoggerFactory.getLogger(UploadServiceImpl.class);
//    @Override
//    public ResponseResult uploadImage(String rawPath) {
//        File file = new File(rawPath);
//        String uuid = UUID.randomUUID().toString().replace("-","");
//        SimpleDateFormat sdf = new SimpleDateFormat(GlobalConstants.DATE_FORMAT);
//        String key = uuid + sdf.format(new Date())+GlobalConstants.IMAGE_SUFFIX;
//        BufferedInputStream bis = null;
//        FileInputStream fis = null;
//        try{
//            fis = new FileInputStream(file);
//            bis = new BufferedInputStream(fis);
//            new AliOssService().uploadFile(bis,key);
//            return new ResponseResult(1,"success",key);
//        }catch (Exception e){
//            e.printStackTrace();
//            return ResponseResult.ERROR();
//        }finally {
//            if(bis != null){
//                try {bis.close();} catch (IOException e) {}
//            }
//            if(fis != null){
//                try {fis.close();} catch (IOException e) {}
//            }
//        }
//    }


    @Override
    public ResponseResult uploadImage(byte[] bytes) {
        long startTime = System.currentTimeMillis();
        String uuid = UUID.randomUUID().toString().replace("-","");
        SimpleDateFormat sdf = new SimpleDateFormat(GlobalConstants.DATE_FORMAT);
        String key = uuid + sdf.format(new Date())+GlobalConstants.IMAGE_SUFFIX;
        ByteArrayInputStream byteArrayInputStream = null;
        BufferedInputStream bufferedInputStream = null;
        try {
            byteArrayInputStream = new ByteArrayInputStream(bytes);
            bufferedInputStream = new BufferedInputStream(byteArrayInputStream);
//            new AliOssService().uploadFile(bufferedInputStream,key);
            logger.info("调用阿里上传服务，图片key:[{}],接口耗时:[{}]",key,System.currentTimeMillis()-startTime);
            return new ResponseResult(1,"success",key);
        }catch (Exception e){
            e.printStackTrace();
            logger.error("调用图片上传功能失败：",e);
            return ResponseResult.ERROR();
        }finally {
            if(bufferedInputStream != null){
                try {bufferedInputStream.close();} catch (IOException e) {}
            }
            if(byteArrayInputStream != null){
                try {byteArrayInputStream.close();} catch (IOException e) {}
            }
        }
    }

    @Override
    public ResponseResult uploadImage(byte[] bytes, String test) {
        long startTime = System.currentTimeMillis();
        String uuid = UUID.randomUUID().toString().replace("-","");
        SimpleDateFormat sdf = new SimpleDateFormat(GlobalConstants.DATE_FORMAT);
        String key = uuid + sdf.format(new Date())+GlobalConstants.IMAGE_SUFFIX;
        ByteArrayInputStream byteArrayInputStream = null;
        BufferedInputStream bufferedInputStream = null;
        try {
            byteArrayInputStream = new ByteArrayInputStream(bytes);
            bufferedInputStream = new BufferedInputStream(byteArrayInputStream);
            //此处上传文件
//            new AliOssService().uploadFile(bufferedInputStream,key);
            BufferedImage read = ImageIO.read(byteArrayInputStream);
            ImageIO.write(read,"jpg",new File("C:\\Users\\zhuoguangjing\\Desktop\\image\\aa.jpg"));
            logger.info("调用阿里上传服务，图片key:[{}],接口耗时:[{}]",key,System.currentTimeMillis()-startTime);
            return new ResponseResult(1,"success",key);
        }catch (Exception e){
            e.printStackTrace();
            logger.error("调用图片上传功能失败：",e);
            return ResponseResult.ERROR();
        }finally {
            if(bufferedInputStream != null){
                try {bufferedInputStream.close();} catch (IOException e) {}
            }
            if(byteArrayInputStream != null){
                try {byteArrayInputStream.close();} catch (IOException e) {}
            }
        }
    }



    @Override
    public ResponseResult uploadImage(InputStream inputStream) {
        long startTime = System.currentTimeMillis();
        String uuid = UUID.randomUUID().toString().replace("-","");
        SimpleDateFormat sdf = new SimpleDateFormat(GlobalConstants.DATE_FORMAT);
        String key = uuid + sdf.format(new Date())+GlobalConstants.IMAGE_SUFFIX;
        BufferedInputStream bufferedInputStream = null;
        try {
            bufferedInputStream = new BufferedInputStream(inputStream);
//            new AliOssService().uploadFile(bufferedInputStream,key);
            BufferedImage read = ImageIO.read(bufferedInputStream);
            ImageIO.write(read,"jpg",new File("C:\\Users\\zhuoguangjing\\Desktop\\image\\dd.jpg"));

            logger.info("调用阿里上传服务，图片key:[{}],接口耗时:[{}]",key,System.currentTimeMillis()-startTime);
            return new ResponseResult(1,"success",key);
        }catch (Exception e){
            e.printStackTrace();
            logger.error("调用图片上传功能失败：",e);
            return ResponseResult.ERROR();
        }finally {
            if(bufferedInputStream != null){
                try {bufferedInputStream.close();} catch (IOException e) {}
            }
            if(inputStream != null){
                try {inputStream.close();} catch (IOException e) {}
            }
        }
    }

    @Override
    public ResponseResult uploadImage(InputStream inputStream, String test) {
        String uuid = UUID.randomUUID().toString().replace("-","");
        SimpleDateFormat sdf = new SimpleDateFormat(GlobalConstants.DATE_FORMAT);
        String key = uuid + sdf.format(new Date())+GlobalConstants.IMAGE_SUFFIX;
        BufferedInputStream bufferedInputStream = null;
        try {
            bufferedInputStream = new BufferedInputStream(inputStream);
//            new AliOssService().uploadFile(bufferedInputStream,key);
            BufferedImage read = ImageIO.read(bufferedInputStream);
            ImageIO.write(read,"jpg",new File("C:\\Users\\zhuoguangjing\\Desktop\\image\\dd.jpg"));
            return new ResponseResult(1,"success",key);
        }catch (Exception e){
            e.printStackTrace();
            logger.error("调用图片上传功能失败：",e);
            return ResponseResult.ERROR();
        }finally {
            if(bufferedInputStream != null){
                try {bufferedInputStream.close();} catch (IOException e) {}
            }
            if(inputStream != null){
                try {inputStream.close();} catch (IOException e) {}
            }
        }
    }
}
