package com.zmaxfilm.model.socket;

/**
 * Created by jimmy on 2016/12/5.
 * 扫描仪状态数据
 */
public class ScanData {
    private String scanName;
    private int scanStatus;

    public ScanData(String scanName, int scanStatus) {
        this.scanName = scanName;
        this.scanStatus = scanStatus;
    }

    public String toString4VerifyInfo() {
        return "scanName" + scanName + "scanStatus" + scanStatus;
    }

    public String getScanName() {
        return scanName;
    }

    public void setScanName(String scanName) {
        this.scanName = scanName;
    }

    public int getScanStatus() {
        return scanStatus;
    }

    public void setScanStatus(int scanStatus) {
        this.scanStatus = scanStatus;
    }
}
