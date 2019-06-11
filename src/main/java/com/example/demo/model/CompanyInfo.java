package com.example.demo.model;

import java.io.Serializable;

public class CompanyInfo implements Serializable {
    private Integer id;

    private String companyName;

    private String licenceNum;

    private String computerNum;

    private String taxPassword;

    private String clientPath;

    private String remarks;

    private static final long serialVersionUID = 1L;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName == null ? null : companyName.trim();
    }

    public String getLicenceNum() {
        return licenceNum;
    }

    public void setLicenceNum(String licenceNum) {
        this.licenceNum = licenceNum == null ? null : licenceNum.trim();
    }

    public String getComputerNum() {
        return computerNum;
    }

    public void setComputerNum(String computerNum) {
        this.computerNum = computerNum == null ? null : computerNum.trim();
    }

    public String getTaxPassword() {
        return taxPassword;
    }

    public void setTaxPassword(String taxPassword) {
        this.taxPassword = taxPassword == null ? null : taxPassword.trim();
    }

    public String getClientPath() {
        return clientPath;
    }

    public void setClientPath(String clientPath) {
        this.clientPath = clientPath == null ? null : clientPath.trim();
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks == null ? null : remarks.trim();
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", companyName=").append(companyName);
        sb.append(", licenceNum=").append(licenceNum);
        sb.append(", computerNum=").append(computerNum);
        sb.append(", taxPassword=").append(taxPassword);
        sb.append(", clientPath=").append(clientPath);
        sb.append(", remarks=").append(remarks);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}