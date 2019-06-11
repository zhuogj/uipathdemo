package com.example.demo.service.impl;

import com.example.demo.mapper.DialogInfoMapper;
import com.example.demo.model.DialogInfo;
import com.example.demo.model.ResponseResult;
import com.example.demo.service.DialogService;
import com.example.demo.service.UploadService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;

/**
 * @Description :
 * @Author : zhuoguangjing
 * @Date : 2019/6/11 15:48
 * @Version : 1.0
 */
@Service
public class DialogServiceImpl implements DialogService {
    private static Logger logger = LoggerFactory.getLogger(DialogServiceImpl.class);
    @Autowired
    private DialogInfoMapper dialogInfoMapper;

    @Autowired
    private UploadService uploadService;

    @Override
    public List<DialogInfo> getDialogList() {
        List<DialogInfo> dialogInfos = dialogInfoMapper.selectAll();
        return dialogInfos;
    }

    /**
     * 此方法包含插入数据库及图片上传
     * @param dialogInfo
     * @param multipartFile
     */
    @Override
    public void addDialogList(DialogInfo dialogInfo, MultipartFile multipartFile) {
        if (multipartFile.getSize()>1024*1024){
            //
        }
        InputStream inputStream = null;
        ResponseResult responseResult = null;
        try {
             inputStream = multipartFile.getInputStream();
             //此处上传图片
             responseResult = uploadService.uploadImage(inputStream);
             if (responseResult!=null && responseResult.getCode()==1){
                 String dialogPath = responseResult.getData().toString();
                 dialogInfo.setDialogPath(dialogPath);
                 dialogInfoMapper.insert(dialogInfo);
             }
        }catch (Exception e){
            e.printStackTrace();
        }

    }

    @Override
    public DialogInfo editDialog(Integer id) {
        DialogInfo dialogInfo = dialogInfoMapper.selectByPrimaryKey(id);
        return dialogInfo;
    }

    @Override
    public void deleteDialog(Integer id) {
        dialogInfoMapper.updateStatusByPrimaryKey(id);
    }
}
