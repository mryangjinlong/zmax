package com.zmaxfilm;


import com.zmaxfilm.model.Print;
import com.zmaxfilm.service.PrintService;
import com.zmaxfilm.service.ScanService;
import com.zmaxfilm.service.impl.ScannerServiceImpl;
import org.apache.log4j.Logger;

import java.util.List;

/**
 * Created by Administrator on 2016/11/14.
 */
public class InterfaceForJavascript {
    private static Logger logger = Logger.getLogger(InterfaceForJavascript.class);


    public void start(){
        ScanService scanService= ScannerServiceImpl.getInstance();
        scanService.start(s->{
            logger.debug("执行任务"+s);
        });
    }

    public void stop(){
        ScanService scanService= ScannerServiceImpl.getInstance();
        scanService.stop();
    }

}
