package com.example.demo.mapper;

import com.example.demo.DemoApplicationTests;
import com.example.demo.model.DialogInfo;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @Description :
 * @Author : zhuoguangjing
 * @Date : 2019/6/11 17:21
 * @Version : 1.0
 */
public class DialogTest extends DemoApplicationTests {
    @Autowired
    private DialogInfoMapper dialogInfoMapper;
    @Test
    public void test(){
        DialogInfo dialogInfo = new DialogInfo();
        dialogInfo.setDialogName("测试2");
        dialogInfo.setDialogContent("就是想要测试用的");
        dialogInfo.setDialogPath("file:///C:/Users/zhuoguangjing/Desktop/image/bb.png");
        dialogInfo.setStatus(1);
        dialogInfoMapper.insert(dialogInfo);
    }
}
