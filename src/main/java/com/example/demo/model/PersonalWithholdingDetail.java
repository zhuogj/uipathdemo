package com.example.demo.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

public class PersonalWithholdingDetail implements Serializable {
    private Integer id;

    private String licenceNum;

    private String companyName;

    private String staffNum;

    private String name;

    private String certificateType;

    private String certificateNum;

    private Date dateBegin;

    private Date dateEnd;

    private BigDecimal currentIncome;

    private BigDecimal currentFreeIncome;

    private BigDecimal endowmentInsurance;

    private BigDecimal medicalInsurance;

    private BigDecimal unemploymentInsurance;

    private BigDecimal housingProvidentFund;

    private BigDecimal cumulativeChildEducation;

    private Long cumulativeHomeLoanInterest;

    private BigDecimal cumulativeHousingRent;

    private Long cumulativeSupportElderly;

    private BigDecimal cumulativeContinuingCducation;

    private BigDecimal enterpriseOccupationalAnnuity;

    private BigDecimal commercialHealthInsurance;

    private BigDecimal deferredEndowmentInsurance;

    private BigDecimal other;

    private BigDecimal allowedDeductionDonations;

    private BigDecimal preTaxDeductionItems;

    private BigDecimal taxSavings;

    private BigDecimal deductionCriteria;

    private BigDecimal withholdingTax;

    private String declarationNote;

    private String srcLink;

    private Date createTime;

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

    public String getLicenceNum() {
        return licenceNum;
    }

    public void setLicenceNum(String licenceNum) {
        this.licenceNum = licenceNum == null ? null : licenceNum.trim();
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName == null ? null : companyName.trim();
    }

    public String getStaffNum() {
        return staffNum;
    }

    public void setStaffNum(String staffNum) {
        this.staffNum = staffNum == null ? null : staffNum.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getCertificateType() {
        return certificateType;
    }

    public void setCertificateType(String certificateType) {
        this.certificateType = certificateType == null ? null : certificateType.trim();
    }

    public String getCertificateNum() {
        return certificateNum;
    }

    public void setCertificateNum(String certificateNum) {
        this.certificateNum = certificateNum == null ? null : certificateNum.trim();
    }

    public Date getDateBegin() {
        return dateBegin;
    }

    public void setDateBegin(Date dateBegin) {
        this.dateBegin = dateBegin;
    }

    public Date getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(Date dateEnd) {
        this.dateEnd = dateEnd;
    }

    public BigDecimal getCurrentIncome() {
        return currentIncome;
    }

    public void setCurrentIncome(BigDecimal currentIncome) {
        this.currentIncome = currentIncome;
    }

    public BigDecimal getCurrentFreeIncome() {
        return currentFreeIncome;
    }

    public void setCurrentFreeIncome(BigDecimal currentFreeIncome) {
        this.currentFreeIncome = currentFreeIncome;
    }

    public BigDecimal getEndowmentInsurance() {
        return endowmentInsurance;
    }

    public void setEndowmentInsurance(BigDecimal endowmentInsurance) {
        this.endowmentInsurance = endowmentInsurance;
    }

    public BigDecimal getMedicalInsurance() {
        return medicalInsurance;
    }

    public void setMedicalInsurance(BigDecimal medicalInsurance) {
        this.medicalInsurance = medicalInsurance;
    }

    public BigDecimal getUnemploymentInsurance() {
        return unemploymentInsurance;
    }

    public void setUnemploymentInsurance(BigDecimal unemploymentInsurance) {
        this.unemploymentInsurance = unemploymentInsurance;
    }

    public BigDecimal getHousingProvidentFund() {
        return housingProvidentFund;
    }

    public void setHousingProvidentFund(BigDecimal housingProvidentFund) {
        this.housingProvidentFund = housingProvidentFund;
    }

    public BigDecimal getCumulativeChildEducation() {
        return cumulativeChildEducation;
    }

    public void setCumulativeChildEducation(BigDecimal cumulativeChildEducation) {
        this.cumulativeChildEducation = cumulativeChildEducation;
    }

    public Long getCumulativeHomeLoanInterest() {
        return cumulativeHomeLoanInterest;
    }

    public void setCumulativeHomeLoanInterest(Long cumulativeHomeLoanInterest) {
        this.cumulativeHomeLoanInterest = cumulativeHomeLoanInterest;
    }

    public BigDecimal getCumulativeHousingRent() {
        return cumulativeHousingRent;
    }

    public void setCumulativeHousingRent(BigDecimal cumulativeHousingRent) {
        this.cumulativeHousingRent = cumulativeHousingRent;
    }

    public Long getCumulativeSupportElderly() {
        return cumulativeSupportElderly;
    }

    public void setCumulativeSupportElderly(Long cumulativeSupportElderly) {
        this.cumulativeSupportElderly = cumulativeSupportElderly;
    }

    public BigDecimal getCumulativeContinuingCducation() {
        return cumulativeContinuingCducation;
    }

    public void setCumulativeContinuingCducation(BigDecimal cumulativeContinuingCducation) {
        this.cumulativeContinuingCducation = cumulativeContinuingCducation;
    }

    public BigDecimal getEnterpriseOccupationalAnnuity() {
        return enterpriseOccupationalAnnuity;
    }

    public void setEnterpriseOccupationalAnnuity(BigDecimal enterpriseOccupationalAnnuity) {
        this.enterpriseOccupationalAnnuity = enterpriseOccupationalAnnuity;
    }

    public BigDecimal getCommercialHealthInsurance() {
        return commercialHealthInsurance;
    }

    public void setCommercialHealthInsurance(BigDecimal commercialHealthInsurance) {
        this.commercialHealthInsurance = commercialHealthInsurance;
    }

    public BigDecimal getDeferredEndowmentInsurance() {
        return deferredEndowmentInsurance;
    }

    public void setDeferredEndowmentInsurance(BigDecimal deferredEndowmentInsurance) {
        this.deferredEndowmentInsurance = deferredEndowmentInsurance;
    }

    public BigDecimal getOther() {
        return other;
    }

    public void setOther(BigDecimal other) {
        this.other = other;
    }

    public BigDecimal getAllowedDeductionDonations() {
        return allowedDeductionDonations;
    }

    public void setAllowedDeductionDonations(BigDecimal allowedDeductionDonations) {
        this.allowedDeductionDonations = allowedDeductionDonations;
    }

    public BigDecimal getPreTaxDeductionItems() {
        return preTaxDeductionItems;
    }

    public void setPreTaxDeductionItems(BigDecimal preTaxDeductionItems) {
        this.preTaxDeductionItems = preTaxDeductionItems;
    }

    public BigDecimal getTaxSavings() {
        return taxSavings;
    }

    public void setTaxSavings(BigDecimal taxSavings) {
        this.taxSavings = taxSavings;
    }

    public BigDecimal getDeductionCriteria() {
        return deductionCriteria;
    }

    public void setDeductionCriteria(BigDecimal deductionCriteria) {
        this.deductionCriteria = deductionCriteria;
    }

    public BigDecimal getWithholdingTax() {
        return withholdingTax;
    }

    public void setWithholdingTax(BigDecimal withholdingTax) {
        this.withholdingTax = withholdingTax;
    }

    public String getDeclarationNote() {
        return declarationNote;
    }

    public void setDeclarationNote(String declarationNote) {
        this.declarationNote = declarationNote == null ? null : declarationNote.trim();
    }

    public String getSrcLink() {
        return srcLink;
    }

    public void setSrcLink(String srcLink) {
        this.srcLink = srcLink == null ? null : srcLink.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
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

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", licenceNum=").append(licenceNum);
        sb.append(", companyName=").append(companyName);
        sb.append(", staffNum=").append(staffNum);
        sb.append(", name=").append(name);
        sb.append(", certificateType=").append(certificateType);
        sb.append(", certificateNum=").append(certificateNum);
        sb.append(", dateBegin=").append(dateBegin);
        sb.append(", dateEnd=").append(dateEnd);
        sb.append(", currentIncome=").append(currentIncome);
        sb.append(", currentFreeIncome=").append(currentFreeIncome);
        sb.append(", endowmentInsurance=").append(endowmentInsurance);
        sb.append(", medicalInsurance=").append(medicalInsurance);
        sb.append(", unemploymentInsurance=").append(unemploymentInsurance);
        sb.append(", housingProvidentFund=").append(housingProvidentFund);
        sb.append(", cumulativeChildEducation=").append(cumulativeChildEducation);
        sb.append(", cumulativeHomeLoanInterest=").append(cumulativeHomeLoanInterest);
        sb.append(", cumulativeHousingRent=").append(cumulativeHousingRent);
        sb.append(", cumulativeSupportElderly=").append(cumulativeSupportElderly);
        sb.append(", cumulativeContinuingCducation=").append(cumulativeContinuingCducation);
        sb.append(", enterpriseOccupationalAnnuity=").append(enterpriseOccupationalAnnuity);
        sb.append(", commercialHealthInsurance=").append(commercialHealthInsurance);
        sb.append(", deferredEndowmentInsurance=").append(deferredEndowmentInsurance);
        sb.append(", other=").append(other);
        sb.append(", allowedDeductionDonations=").append(allowedDeductionDonations);
        sb.append(", preTaxDeductionItems=").append(preTaxDeductionItems);
        sb.append(", taxSavings=").append(taxSavings);
        sb.append(", deductionCriteria=").append(deductionCriteria);
        sb.append(", withholdingTax=").append(withholdingTax);
        sb.append(", declarationNote=").append(declarationNote);
        sb.append(", srcLink=").append(srcLink);
        sb.append(", createTime=").append(createTime);
        sb.append(", updateTime=").append(updateTime);
        sb.append(", status=").append(status);
        sb.append(", remarks=").append(remarks);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}