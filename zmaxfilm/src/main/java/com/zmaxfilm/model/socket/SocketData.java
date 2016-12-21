package com.zmaxfilm.model.socket;

import java.util.List;

/**
 * Created by jimmy on 2016/12/5.
 * 服务端发来的数据格式
 */
public class SocketData {

    public static final int RESULT_CODE_UPDATE = 100;
    public static final int RESULT_CODE_ADVERTIS = 200;

    private int resultCode;     //推送类型
    private String resultData;  //具体数据

    public int getResultCode() {
        return resultCode;
    }

    public void setResultCode(int resultCode) {
        this.resultCode = resultCode;
    }

    public String getResultData() {
        return resultData;
    }

    public void setResultData(String resultData) {
        this.resultData = resultData;
    }
}
