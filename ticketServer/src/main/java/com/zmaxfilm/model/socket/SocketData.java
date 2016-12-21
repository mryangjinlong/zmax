package com.zmaxfilm.model.socket;

import java.util.List;

/**
 * Created by jimmy on 2016/12/5.
 * 服务端发来的数据格式
 */
public class SocketData<T> {
    private int resultCode;
    private List<T> resultData;
    private int cacheTime;

    public int getResultCode() {
        return resultCode;
    }

    public void setResultCode(int resultCode) {
        this.resultCode = resultCode;
    }

    public List<T> getResultData() {
        return resultData;
    }

    public void setResultData(List<T> resultData) {
        this.resultData = resultData;
    }

    public int getCacheTime() {
        return cacheTime;
    }

    public void setCacheTime(int cacheTime) {
        this.cacheTime = cacheTime;
    }


}
