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

    private String optionalOperation;

    private String selectedOperation;

    private Date createTime;

    private String createBy;

    private String updateBy;

    private Date updateTime;

    private Byte status;

    private String remarks;

    private static final long serialVersionUID = 1L;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDialogName() {
        return dialogName;
    }

    public void setDialogName(String dialogName) {
        this.dialogName = dialogName == null ? null : dialogName.trim();
    }

    public String getDialogContent() {
        return dialogContent;
    }

    public void setDialogContent(String dialogContent) {
        this.dialogContent = dialogContent == null ? null : dialogContent.trim();
    }

    public String getDialogPath() {
        return dialogPath;
    }

    public void setDialogPath(String dialogPath) {
        this.dialogPath = dialogPath == null ? null : dialogPath.trim();
    }

    public String getOptionalOperation() {
        return optionalOperation;
    }

    public void setOptionalOperation(String optionalOperation) {
        this.optionalOperation = optionalOperation == null ? null : optionalOperation.trim();
    }

    public String getSelectedOperation() {
        return selectedOperation;
    }

    public void setSelectedOperation(String selectedOperation) {
        this.selectedOperation = selectedOperation == null ? null : selectedOperation.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getCreateBy() {
        return createBy;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy == null ? null : createBy.trim();
    }

    public String getUpdateBy() {
        return updateBy;
    }

    public void setUpdateBy(String updateBy) {
        this.updateBy = updateBy == null ? null : updateBy.trim();
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Byte getStatus() {
        return status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks == null ? null : remarks.trim();
    }

}