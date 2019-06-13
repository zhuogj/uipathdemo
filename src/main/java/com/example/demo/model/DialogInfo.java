package com.example.demo.model;

import lombok.*;

import java.io.Serializable;
import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class DialogInfo implements Serializable {
    private Integer id;

    private String dialogName;

    private String dialogContent;

    private String dialogPath;

    private String selectedOperation;

    private Date createTime;

    private String createBy;

    private String updateBy;

    private Date updateTime;

    private Byte status;

    private String remarks;

    private static final long serialVersionUID = 1L;

}