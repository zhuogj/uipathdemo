package com.example.demo.mapper;

import com.example.demo.DemoApplicationTests;
import com.example.demo.configuration.Constants;
import com.example.demo.configuration.FileUtil;
import com.example.demo.model.ResponseResult;
import com.example.demo.model.UipathTest;
import com.example.demo.service.ExcelService;
import com.example.demo.service.ImageService;
import com.example.demo.utils.ImageUtil;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;
import java.util.concurrent.Executors;

public class UipathTestTest extends DemoApplicationTests {
    @Autowired
    private UipathTestMapper uipathTestMapper;
    @Autowired
    private ExcelService excelService;
    @Autowired
    private ImageService imageService;


    @Test
    public void test() {
//        String date = "2019-11-11";
//
//        UipathTest aa = UipathTest.builder().name("aa").salary("0.00").age(18).birthday(date).build();
//        uipathTestMapper.insert(aa);
//        System.out.println(UUID.randomUUID().toString().replace("-",""));
        UipathTest uipathTest = uipathTestMapper.selectById(4749);

//        System.out.println(date);
//        System.out.println(uipathTest.getBirthday());
//        ResponseResult responseResult = new ResponseResult(1,"success",UUID.randomUUID().toString());
//        System.out.println(responseResult.getData().toString());
//        UipathTest uipathTest = uipathTestMapper.selectById(4749);
//        uipathTest.setSalary("5000");
//        uipathTestMapper.update(uipathTest);
        String uuid = UUID.randomUUID().toString().toUpperCase();
        String srcPath = uipathTest.getName() + uuid.replace("-","");
        String srcBasePath = "C:\\Users\\zhuoguangjing\\Desktop\\image\\";
        String src = srcBasePath+srcPath+".jpg";
        uipathTest.setSrc(src);
        String path = "http://api.51shebao.com/api/file/download?path=51shebao-service@a54a81a3-672b-41e3-a007-9cb1d8181442.jpg";
//        imageService.operateImage(uipathTest,path,src);
        byte[] bytes = FileUtil.fileConvertToByteArray(path);
        imageService.operateImage(uipathTest,bytes,src);


    }
}
