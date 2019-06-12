package com.example.demo.service;

import com.example.demo.model.DialogInfo;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * @Description :
 * @Author : zhuoguangjing
 * @Date : 2019/6/11 15:47
 * @Version : 1.0
 */
public interface DialogService {
    /**
     * 获取对话框集合
     * @return
     */
    List<DialogInfo> getDialogList();

    /**
     * 增加对话框配置
     */
    void addDialogList(DialogInfo dialogInfo, MultipartFile multipartFile);

    /**
     * 修改对话框
     */
    DialogInfo editDialog(Integer id);

    /**
     * 逻辑删除，状态改为无效
     */
    void deleteDialog(Integer id);

    /**
     * 更新信息
     * @param dialogInfo
     */
    void update(DialogInfo dialogInfo);
}
