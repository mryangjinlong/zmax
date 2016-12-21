package com.zmaxfilm.service;


import com.zmaxfilm.model.Print;

import java.awt.print.Printable;
import java.util.List;
import java.util.Map;

/**
 *
 * Created by drj on 2016/11/14.
 */
public interface PrintService   {



    void print(java.util.List<Print> prints, javax.print.PrintService printDevice);

    //根据名称获取打印设备
    javax.print.PrintService getPrintDevice(String deviceName);


    //获取可用的设备列表
    Map<String,Map> getPrintDeviceList();


}
