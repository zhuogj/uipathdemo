package com.example.demo.mapper;

import com.example.demo.model.UipathTest;
import org.apache.ibatis.annotations.Options;

public interface UipathTestMapper {
    int insert(UipathTest uipathTest);
    int update(UipathTest uipathTest);
    UipathTest selectById(long id);
}
