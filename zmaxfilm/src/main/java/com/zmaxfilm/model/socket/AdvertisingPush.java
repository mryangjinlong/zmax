package com.zmaxfilm.model.socket;

import java.util.List;

/**
 * Created by jimmy on 2016/12/5.
 * 广告推送
 */
public class AdvertisingPush {
    private String id;
    private String titile;
    private int effectTime;    //生效时间
    private int expiryTime;    //失效时间
    private int screenPosition; //广告位置;0上屏1下屏
    private int advertiseType;  //广告类型;0图片1视频
    private List<ImgData> imgesInfo;
    private List<VideoData> video;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitile() {
        return titile;
    }

    public void setTitile(String titile) {
        this.titile = titile;
    }

    public int getEffectTime() {
        return effectTime;
    }

    public void setEffectTime(int effectTime) {
        this.effectTime = effectTime;
    }

    public int getExpiryTime() {
        return expiryTime;
    }

    public void setExpiryTime(int expiryTime) {
        this.expiryTime = expiryTime;
    }

    public int getScreenPosition() {
        return screenPosition;
    }

    public void setScreenPosition(int screenPosition) {
        this.screenPosition = screenPosition;
    }

    public int getAdvertiseType() {
        return advertiseType;
    }

    public void setAdvertiseType(int advertiseType) {
        this.advertiseType = advertiseType;
    }

    public List<ImgData> getImgesInfo() {
        return imgesInfo;
    }

    public void setImgesInfo(List<ImgData> imgesInfo) {
        this.imgesInfo = imgesInfo;
    }

    public List<VideoData> getVideo() {
        return video;
    }

    public void setVideo(List<VideoData> video) {
        this.video = video;
    }
}
