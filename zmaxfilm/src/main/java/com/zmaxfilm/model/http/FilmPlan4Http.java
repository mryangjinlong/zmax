package com.zmaxfilm.model.http;

import java.math.BigDecimal;
import java.util.List;

/**
 * http接口返回的未整理的排期数据
 * Created by jimmy on 2016/12/13.
 */
public class FilmPlan4Http {

    //排期状态
    public static final int PLAN_STATUS_NORMAL = 1;
    public static final int PLAN_STATUS_CLOSE = 2;
    //销售状态
    public static final int SALE_STATUS_NORMAL = 1;
    public static final int SALE_STATUS_CLOSE = 2;

    private String featureAppNo;   //排期编号
    private String filmNo;          //影片编号
    private String filmName;        //影厅名称
    private String hallNo;          //影厅编号
    private String hallName;          //影厅名称
    private String startTime;          //开始放映时间
    private String copyType;          //影片制式
    private String copyLanguage;          //影片语言
    private String totalTime;          //影片总时长（单位分）
    private BigDecimal lowestPrice;          //最底限价
    private BigDecimal listingPrice;          //挂牌价
    private PriceConfig priceConfig;            //价格配置
    private List<SeatPieceInfo> seatPieceInfo;          //当前排期对应座区的信息
    private String seatPieceNo;                 //座区编号
    private String seatPieceName;                 //座区名称
    private int planStatus;                 //排期状态1正常，2关闭
    private int saleStatus;                 //销售状态1正常，2关闭


    public PriceConfig getPriceConfig() {
        return priceConfig;
    }

    public void setPriceConfig(PriceConfig priceConfig) {
        this.priceConfig = priceConfig;
    }

    public String getFeatureAppNo() {
        return featureAppNo;
    }

    public void setFeatureAppNo(String featureAppNo) {
        this.featureAppNo = featureAppNo;
    }

    public String getFilmNo() {
        return filmNo;
    }

    public void setFilmNo(String filmNo) {
        this.filmNo = filmNo;
    }

    public String getFilmName() {
        return filmName;
    }

    public void setFilmName(String filmName) {
        this.filmName = filmName;
    }

    public String getHallNo() {
        return hallNo;
    }

    public void setHallNo(String hallNo) {
        this.hallNo = hallNo;
    }

    public String getHallName() {
        return hallName;
    }

    public void setHallName(String hallName) {
        this.hallName = hallName;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getCopyType() {
        return copyType;
    }

    public void setCopyType(String copyType) {
        this.copyType = copyType;
    }

    public String getCopyLanguage() {
        return copyLanguage;
    }

    public void setCopyLanguage(String copyLanguage) {
        this.copyLanguage = copyLanguage;
    }

    public String getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(String totalTime) {
        this.totalTime = totalTime;
    }

    public BigDecimal getLowestPrice() {
        return lowestPrice;
    }

    public void setLowestPrice(BigDecimal lowestPrice) {
        this.lowestPrice = lowestPrice;
    }

    public BigDecimal getListingPrice() {
        return listingPrice;
    }

    public void setListingPrice(BigDecimal listingPrice) {
        this.listingPrice = listingPrice;
    }

    public List<SeatPieceInfo> getSeatPieceInfo() {
        return seatPieceInfo;
    }

    public void setSeatPieceInfo(List<SeatPieceInfo> seatPieceInfo) {
        this.seatPieceInfo = seatPieceInfo;
    }

    public String getSeatPieceNo() {
        return seatPieceNo;
    }

    public void setSeatPieceNo(String seatPieceNo) {
        this.seatPieceNo = seatPieceNo;
    }

    public String getSeatPieceName() {
        return seatPieceName;
    }

    public void setSeatPieceName(String seatPieceName) {
        this.seatPieceName = seatPieceName;
    }


    public int getPlanStatus() {
        return planStatus;
    }

    public void setPlanStatus(int planStatus) {
        this.planStatus = planStatus;
    }

    public int getSaleStatus() {
        return saleStatus;
    }

    public void setSaleStatus(int saleStatus) {
        this.saleStatus = saleStatus;
    }
}
