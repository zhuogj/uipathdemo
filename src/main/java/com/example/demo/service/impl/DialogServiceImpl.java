package com.example.demo.service.impl;

import com.example.demo.mapper.DialogInfoMapper;
import com.example.demo.model.DialogInfo;
import com.example.demo.service.DialogService;
import com.example.demo.service.UploadService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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


    @Override
    public DialogInfo editDialog(Integer id) {
        DialogInfo dialogInfo = dialogInfoMapper.selectByPrimaryKey(id);
        return dialogInfo;
    }

    @Override
    public void deleteDialog(Integer id) {
        dialogInfoMapper.updateStatusByPrimaryKey(id);
    }

    @Override
    public void updateWithModified(DialogInfo dialogInfo) {
        dialogInfoMapper.updateWithModified(dialogInfo);
    }

    @Override
    public int insert(DialogInfo dialogInfo) {
        return dialogInfoMapper.insert(dialogInfo);

    }
}
