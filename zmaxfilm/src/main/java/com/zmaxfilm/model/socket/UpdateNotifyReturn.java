package com.zmaxfilm.model.socket;

import com.zmaxfilm.Constant;
import com.zmaxfilm.util.DateUtils;
import com.zmaxfilm.util.DeviceUtil;
import com.zmaxfilm.util.EncryptUtil;

/**
 * Created by jimmy on 2016/12/9.
 * 更新返回数据
 */
public class UpdateNotifyReturn {

    public static final int RECEIVE_STATUS_SUCCESS = 1;
    public static final int RECEIVE_STATUS_FAIL = 0;

    private String action = "updateNotifyReturn";
    private String account;
    private String macAddress;
    private int receiveStatus;
    private String machineVersion;
    private String url;
    private String requestTime;
    private String verifyInfo;

    public UpdateNotifyReturn(int receiveStatus, String machineVersion, String url) {
        this.account = Constant.APP_ACCOUNT;
        this.macAddress = DeviceUtil.getLocalMac();
        this.receiveStatus = receiveStatus;
        this.machineVersion = machineVersion;
        this.url = url;
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
                "machineVersion" +
                this.machineVersion +
                "url" +
                this.url +
                "requestTime" +
                this.requestTime;
        System.out.println(sb);
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

    public String getMachineVersion() {
        return machineVersion;
    }

    public void setMachineVersion(String machineVersion) {
        this.machineVersion = machineVersion;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
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
