package com.example.demo.mapper;

import com.example.demo.model.PersonalWithholdingDetail;
import java.util.List;

public interface PersonalWithholdingDetailMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(PersonalWithholdingDetail record);

    PersonalWithholdingDetail selectByPrimaryKey(Integer id);

    List<PersonalWithholdingDetail> selectAll();

    int updateByPrimaryKey(PersonalWithholdingDetail record);
}