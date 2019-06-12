package com.example.demo.mapper;

import com.example.demo.model.DialogInfo;
import java.util.List;

public interface DialogInfoMapper {
    int deleteByPrimaryKey(Integer id);
    int updateStatusByPrimaryKey(Integer id);

    int insert(DialogInfo record);

    DialogInfo selectByPrimaryKey(Integer id);

    List<DialogInfo> selectAll();

    int updateByPrimaryKey(DialogInfo record);

    /**
     * 根据修改的内容进行更新
     * @param record
     * @return
     */
    int updateWithModel(DialogInfo record);
}