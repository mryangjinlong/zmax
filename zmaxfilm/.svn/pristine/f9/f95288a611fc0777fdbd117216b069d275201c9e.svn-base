package com.zmaxfilm.model.socket;

import com.zmaxfilm.Constant;
import com.zmaxfilm.util.DateUtils;
import com.zmaxfilm.util.EncryptUtil;

/**
 * Created by jimmy on 2016/12/5.
 * 接收到推送后的返回数据
 */
public class NotifyReturn {

    public static final String ACTION_UPDATENOTIFY_RETURN = "updateNotifyReturn";
    public static final String ACTION_ADVER_RETURN = "advertisementNotification";

    public static final int RECEIVE_STATUS_SUCCESS = 1;
    public static final int RECEIVE_STATUS_FAIL = 0;

    private String action;
    private String macAddress;
    private int receiveStatus;
    private String requestTime;
    private String verifyInfo;
    private String id;

    public NotifyReturn(String action , String macAddress, int receiveStatus, String id) {
        this.action = action;
        this.macAddress = macAddress;
        this.receiveStatus = receiveStatus;
        this.requestTime = DateUtils.formatDate();
        this.id = id;
        this.verifyInfo = this.generateVerifyInfo();
    }

    private String generateVerifyInfo(){
        String sb;
        if(this.id!=null){
            sb = "action" +
                this.action +
                "id" +
                this.id +
                "macAddress" +
                this.macAddress +
                "receiveStatus" +
                this.receiveStatus +
                "requestTime" +
                this.requestTime;
        }else{
            sb = "action" +
                    this.action +
                    "macAddress" +
                    this.macAddress +
                    "receiveStatus" +
                    this.receiveStatus +
                    "requestTime" +
                    this.requestTime;
        }

        return EncryptUtil.encrypt4Socket(sb);
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
