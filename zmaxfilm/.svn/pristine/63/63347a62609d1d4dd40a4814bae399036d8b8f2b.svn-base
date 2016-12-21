package com.zmaxfilm.service;


import com.zmaxfilm.model.MovieTicket;
import com.zmaxfilm.model.Print;

import javax.print.PrintException;
import java.util.List;
import java.util.Map;

/**
 *
 * Created by drj on 2016/11/14.
 */
public interface PrintService   {



    void print(java.util.List<Print> prints, javax.print.PrintService printDevice) throws PrintException;


    //根据名称获取打印设备
    javax.print.PrintService getPrintDevice(String deviceName);


    //获取设备列表
    Map<String,Map> getPrintDeviceList();

    //获取可用的设备列表
    List<javax.print.PrintService>getAvailableDevicelist();



    //获取指定打印机设备队列数量

    int getPrintDeviceQueueCount(javax.print.PrintService printService);
}
