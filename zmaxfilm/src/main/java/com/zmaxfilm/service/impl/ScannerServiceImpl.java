package com.zmaxfilm.service.impl;

import com.sun.jna.ptr.IntByReference;
import com.zmaxfilm.service.ScanRun;
import com.zmaxfilm.service.ScanService;
import com.zmaxfilm.util.InspiryDeviceAPIFor532;
import org.apache.log4j.Logger;

/**
 * Created by Administrator on 2016/11/14.
 */
public class ScannerServiceImpl implements ScanService {

    private static Logger logger = Logger.getLogger(ScannerServiceImpl.class);

    private Thread thread;

    public static boolean start=false;


    //单例模式
    private static ScannerServiceImpl scannerService=new ScannerServiceImpl();
    private ScannerServiceImpl(){};
    public static ScannerServiceImpl getInstance(){
        return scannerService;
    }



    static  {
        if(InspiryDeviceAPIFor532.INSTANCE.GetDevice() == 1){
            System.out.print("ddd");
            logger.debug("成功获取设备");
            int startDeviceState =  InspiryDeviceAPIFor532.INSTANCE.StartDevice();
            if(startDeviceState == 1){
                logger.debug("设备启动成功");
                InspiryDeviceAPIFor532.INSTANCE.setBarcode(true);
                InspiryDeviceAPIFor532.INSTANCE.SetBeepTime(300);
                logger.debug("设备初始化完成");
            }
        }else {
            logger.debug("设备获取失败");
        }
    }

     private void    openDevice() {
        InspiryDeviceAPIFor532.INSTANCE.SetLed(true);
        InspiryDeviceAPIFor532.INSTANCE.setQRable(true);
        InspiryDeviceAPIFor532.INSTANCE.setDMable(true);
         start=true;
        logger.debug("打开设备");
    }

    public void stop() {
        InspiryDeviceAPIFor532.INSTANCE.SetLed(false);
        InspiryDeviceAPIFor532.INSTANCE.setQRable(false);
        InspiryDeviceAPIFor532.INSTANCE.setDMable(false);
        logger.debug("关闭设备");
        if(thread!=null){
            thread.interrupt();
        }
    }

    @Override
    public void start(ScanRun scanRun) {
        if(thread!=null){
            thread.interrupt();
        }
        this.openDevice();
        thread=new Thread(()->{
            while (!thread.isInterrupted()){
                byte Decodes[] = new byte[128];
                IntByReference lengthRe = new IntByReference();
                InspiryDeviceAPIFor532.INSTANCE.GetDecodeString(Decodes,lengthRe);
                logger.debug("二维码数据长度：" + lengthRe.getValue());
                String decodeString = new String(Decodes,0,lengthRe.getValue()) ;
                if(lengthRe.getValue()>0){
                    scanRun.run(decodeString);
                    logger.debug("获取完二维码并执行完对应的任务");
                    this.stop();
                }
            }
        });
        thread.start();
    }

    @Override
    public int getStatus() {
        return 0;
    }
}
