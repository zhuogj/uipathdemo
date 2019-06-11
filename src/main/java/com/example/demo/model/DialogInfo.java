package com.example.demo.model;

import lombok.*;

import java.io.Serializable;
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Builder
public class DialogInfo implements Serializable {
    private Integer id;

    private String dialogName;

    private String dialogContent;

    private String dialogPath;

    private String optionalOperation;

    private String selectedOperation;

    private Integer status;

    private String remarks;

    private static final long serialVersionUID = 1L;

}