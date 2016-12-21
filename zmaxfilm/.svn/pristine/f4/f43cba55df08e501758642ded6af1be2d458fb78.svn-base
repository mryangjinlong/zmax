package com.zmaxfilm.model.socket;

import com.zmaxfilm.Constant;
import com.zmaxfilm.util.DateUtils;
import com.zmaxfilm.util.DeviceUtil;
import com.zmaxfilm.util.EncryptUtil;

/**
 * SOCKET接收广告后的返回数据
 * Created by jimmy on 2016/12/9.
 */
public class AdvertiseReturn {

    //数据接收状态  1成功 0失败
    public static final int RECEIVE_STATUS_SUCCESS = 1;
    public static final int RECEIVE_STATUS_FAIL = 0;

    private String action = "advertisementNotification";
    private String account;
    private String macAddress;
    private int receiveStatus;
    private String id;
    private String requestTime;
    private String verifyInfo;

    public AdvertiseReturn(int receiveStatus, String id) {
        this.account = Constant.APP_ACCOUNT;
        this.macAddress = DeviceUtil.getLocalMac();
        this.receiveStatus = receiveStatus;
        this.id = id;
        this.requestTime = DateUtils.formatCurrentDate();
        this.verifyInfo = generateVerifyInfo();
    }

    private String generateVerifyInfo(){
        String sb = "action" +
                this.action +
                "account" +
                this.account +
                "macAddress" +
                this.macAddress +
                "receiveStatus" +
                this.receiveStatus +
                "id" +
                this.id +
                "requestTime" +
                this.requestTime;
        return EncryptUtil.encrypt4Socket(sb);
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getMacAddress() {
        return macAddress;
    }

    public void setMacAddress(String macAddress) {
        this.macAddress = macAddress;
    }

    public int getReceiveStatus() {
        return receiveStatus;
    }

    public void setReceiveStatus(int receiveStatus) {
        this.receiveStatus = receiveStatus;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRequestTime() {
        return requestTime;
    }

    public void setRequestTime(String requestTime) {
        this.requestTime = requestTime;
    }

    public String getVerifyInfo() {
        return verifyInfo;
    }

    public void setVerifyInfo(String verifyInfo) {
        this.verifyInfo = verifyInfo;
    }
}
