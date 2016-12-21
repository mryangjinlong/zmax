package com.zmaxfilm.service;

/**
 * Created by drj on 2016/11/14.
 */
public interface ScanService {


    void stop();

    void start(ScanRun scanRun);


    /**设备状态  0：不可用  1：可用**/
    int getStatus();

}
