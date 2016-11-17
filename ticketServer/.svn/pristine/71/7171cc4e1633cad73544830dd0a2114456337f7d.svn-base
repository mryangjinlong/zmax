package com.zmaxfilm;

import com.zmaxfilm.service.PrintService;
import com.zmaxfilm.service.ScanService;
import com.zmaxfilm.service.SocketClientService;
import com.zmaxfilm.service.impl.PrintServiceImpl;
import com.zmaxfilm.service.impl.ScannerServiceImpl;
import com.zmaxfilm.service.impl.SocketClientServiceImpl;

/**
 * Created by drj on 2016/11/14.
 */
public class Factory {

    private static PrintServiceImpl printService=new PrintServiceImpl();

    private static ScannerServiceImpl scannerService=new ScannerServiceImpl();

    private static SocketClientService socketClientService=new SocketClientServiceImpl();


    //获取打印服务
    public static PrintService getPrintService(int type){
        switch (type){
            case Constant.DEFAULT_IMPL:
                return printService;
        }
        return null;
    }

    //获取二维码服务
    public static ScanService getScanService(int type){
        switch (type){
            case Constant.DEFAULT_IMPL:
                return scannerService;
        }
        return null;
    }

    //获取socket服务
    public static SocketClientService getSocketClientService(int type){
        switch (type){
            case Constant.DEFAULT_IMPL:return socketClientService;
        }
        return null;
    }

}
