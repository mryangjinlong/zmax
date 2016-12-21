package com.zmaxfilm.model.socket;

/**
 * Created by jimmy on 2016/12/5.
 * 升级推送通知
 */
public class UpdateNotificationData {

    private String action;
    private String systemVersion;
    private String systemVersionUrl;


    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getSystemVersion() {
        return systemVersion;
    }

    public void setSystemVersion(String systemVersion) {
        this.systemVersion = systemVersion;
    }

    public String getSystemVersionUrl() {
        return systemVersionUrl;
    }

    public void setSystemVersionUrl(String systemVersionUrl) {
        this.systemVersionUrl = systemVersionUrl;
    }
}
