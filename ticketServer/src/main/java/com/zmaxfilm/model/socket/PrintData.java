package com.zmaxfilm.model.socket;

/**
 * Created by jimmy on 2016/12/5.
 * 打印机数据
 */
public class PrintData {

    private String printName;
    private int printStatus;

    public PrintData(String printName, int printStatus) {
        this.printName = printName;
        this.printStatus = printStatus;
    }

    public String getPrintName() {
        return printName;
    }

    public void setPrintName(String printName) {
        this.printName = printName;
    }

    public int getPrintStatus() {
        return printStatus;
    }

    public void setPrintStatus(int printStatus) {
        this.printStatus = printStatus;
    }


}
