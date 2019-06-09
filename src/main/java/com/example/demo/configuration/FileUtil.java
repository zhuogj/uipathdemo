package com.example.demo.configuration;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * @Description :
 * @Author : zhuoguangjing
 * @Date : 2019/6/3 16:42
 * @Version : 1.0
 */
public class FileUtil {
    /**
     * 把一个文件转化为byte字节数组。
     *
     * @return
     */
    public static byte[] fileConvertToByteArray(String filePath) {
        byte[] data = null;
        URL url = null;
        try {
            url = new URL(filePath);
            InputStream is = url.openStream();
            ByteArrayOutputStream bo = new ByteArrayOutputStream();
            byte bf[] = new byte[1024];
            while (is.read(bf, 0, 1024) != -1) {
                bo.write(bf);
            }
            data = bo.toByteArray();
            bo.close();
            is.close();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return data;
    }
}
