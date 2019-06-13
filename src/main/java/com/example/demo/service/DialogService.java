package com.example.demo.service;

import com.example.demo.model.DialogInfo;

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
     * 修改对话框
     */
    DialogInfo editDialog(Integer id);

    /**
     * 逻辑删除，状态改为无效
     */
    void deleteDialog(Integer id);

    /**
     * 更新被修改的部分,其余部分不动
     * @param dialogInfo
     */
    void updateWithModified(DialogInfo dialogInfo);

    /**
     * 插入数据
     * @param dialogInfo
     * @return
     */
    int insert(DialogInfo dialogInfo);
}
