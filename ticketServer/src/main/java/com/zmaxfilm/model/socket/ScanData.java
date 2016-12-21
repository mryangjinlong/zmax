package com.zmaxfilm.model.socket;

/**
 * Created by jimmy on 2016/12/5.
 * 扫描仪状态数据
 */
public class ScanData {
    private String scannerName;
    private int scannerStatus;

    public ScanData(String scannerName, int scannerStatus) {
        this.scannerName = scannerName;
        this.scannerStatus = scannerStatus;
    }

    public String getScannerName() {
        return scannerName;
    }

    public void setScannerName(String scannerName) {
        this.scannerName = scannerName;
    }

    public int getScannerStatus() {
        return scannerStatus;
    }

    public void setScannerStatus(int scannerStatus) {
        this.scannerStatus = scannerStatus;
    }

}
