package com.zmaxfilm.service.impl;


import com.zmaxfilm.model.Print;
import lombok.Getter;
import org.apache.log4j.Logger;

import javax.print.*;
import javax.print.attribute.DocAttributeSet;
import javax.print.attribute.HashDocAttributeSet;
import javax.print.attribute.HashPrintRequestAttributeSet;
import javax.print.attribute.PrintRequestAttributeSet;
import javax.print.attribute.standard.MediaSizeName;
import javax.print.attribute.standard.QueuedJobCount;
import java.awt.*;
import java.awt.geom.AffineTransform;
import java.awt.geom.Point2D;
import java.awt.geom.Rectangle2D;
import java.awt.image.AffineTransformOp;
import java.awt.image.BufferedImage;
import java.awt.image.BufferedImageOp;
import java.awt.image.ColorModel;
import java.awt.print.PageFormat;
import java.awt.print.Printable;
import java.awt.print.PrinterException;
import java.util.*;
import java.util.List;

/**
 * Created by drj on 2016/11/14.
 */
public class PrintServiceImpl implements com.zmaxfilm.service.PrintService,Printable {
    private static Logger logger = Logger.getLogger(PrintServiceImpl.class);

    //判定打印机是否出故障的时间周期 
    public static final Integer printTime=30000;


    private   Map<String,Map> deviceMap=new HashMap<>();

    private java.util.List<Print> prints ;
    //单例模式
    private static PrintServiceImpl printService=new PrintServiceImpl();
    public static PrintServiceImpl getInstance(){
        return printService;
    }
    private PrintServiceImpl(){
        Thread thread=new Thread(()->{
            while (true){
                this.initDevice();
//                logger.debug(deviceMap);
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        thread.start();
    };


    private void initDevice() {
        PrintRequestAttributeSet pras = new HashPrintRequestAttributeSet();
        DocFlavor flavor = DocFlavor.BYTE_ARRAY.PNG;
        javax.print.PrintService printDevices[] = PrintServiceLookup.lookupPrintServices(flavor, pras);
        for (javax.print.PrintService printDevice : printDevices) {
            String name=printDevice.getName();
            if(name==null ||name.startsWith("Microsoft") ||"Fax".equals(name)||"Foxit Reader PDF Printer".equals(name)||"FX DocuPrint M268 z Printer".equals(name)){
                continue;
            }
            QueuedJobCount count=printDevice.getAttribute(QueuedJobCount.class);
            Integer queueCount=count.getValue();
            Map<String,Object> temp= deviceMap.get(name);
            if(temp==null){
                //如果temp等于空，说明此设备第一次检测到
                logger.debug("第一次检测到设备"+name);
                Map<String,Object> map=new HashMap<>();
                map.put("queueCount",queueCount);
                map.put("time",printTime);
                map.put("beginQueueCount",queueCount);
                map.put("status",1);
                deviceMap.put(name,map);
            }else{
                temp.put("queueCount",queueCount);
                Integer time= (Integer) temp.get("time");
                Integer beginQueueCount= (Integer) temp.get("beginQueueCount");
                if(time<=0){
                    temp.put("beginQueueCount",queueCount);
//                    如果time等于0 说明已经检测了1分钟
                    if(queueCount>0&&beginQueueCount>=queueCount){
//                        logger.debug(name+"：已检测1分钟并且初始队列值还大等于当前队列值，说明设备已经阻塞"+printTime/60000.0+"分钟，将设备设为不可用，并且重新开始计时");
                        temp.put("status",0);
                    }
                    temp.put("time",printTime);
                }else{

                    if(queueCount<beginQueueCount){
//                        logger.debug(name+"：设备当前队列已少于"+printTime/60000.0+"分钟起始值，说明设备正常,可以重新开始计时");
                        temp.put("time",printTime);
                        temp.put("beginQueueCount",queueCount);
                        temp.put("status",1);
                    }else{
//                        logger.debug(name+"：设备当前队列并不小于于"+printTime/60000.0+"分钟初始值，说明可能存在问题，继续观察...");
                        temp.put("time",time-1000);
                    }
                }
            }

        }
    }

    public void print(java.util.List<Print> prints, javax.print.PrintService printDevice) throws PrintException {


        //构建打印请求属性集
        this.prints=prints;

        HashPrintRequestAttributeSet pras = new HashPrintRequestAttributeSet();
        pras.add(MediaSizeName.ISO_A4);
        

        DocFlavor flavor = DocFlavor.SERVICE_FORMATTED.PRINTABLE;
        DocAttributeSet das = new HashDocAttributeSet();
        Doc doc = new SimpleDoc(this, flavor, das);
        DocPrintJob job = printDevice.createPrintJob();
        job.print(doc, pras);

    }

    public javax.print.PrintService getPrintDevice(String deviceName) {
        PrintRequestAttributeSet pras = new HashPrintRequestAttributeSet();
        DocFlavor flavor = DocFlavor.BYTE_ARRAY.PNG;
        javax.print.PrintService printDevices[] = PrintServiceLookup.lookupPrintServices(flavor, pras);
        for (javax.print.PrintService printDevice : printDevices) {
            logger.debug(printDevice.getName());
            if (deviceName.equals(printDevice.getName())) {
                return printDevice;
            }
        }
        return null;
    }

    @Override
    public  Map<String,Map> getPrintDeviceList() {
        return deviceMap;
    }

    @Override
    public List<PrintService> getAvailableDevicelist() {
        List<PrintService> printServices=new ArrayList<>();
        for(String deviceName:deviceMap.keySet()){
            Map map=deviceMap.get(deviceName);
            int status= (int) map.get("status");
            if(status==1){
                printServices.add(this.getPrintDevice(deviceName));
            }
        }
        return printServices;
    }

    @Override
    public int getPrintDeviceQueueCount(PrintService printService) {
        QueuedJobCount count=printService.getAttribute(QueuedJobCount.class);
        return count.getValue();
    }

    public int print(Graphics graphics, PageFormat pageFormat, int pageIndex) throws PrinterException {


        if (pageIndex > 0) {
            return NO_SUCH_PAGE;
        }
        Graphics2D g2d = (Graphics2D) graphics;
        for (Print print : prints) {
            g2d.setFont(new Font("Default", print.getFont(), print.getSize()));
            if(print.getType()==1){
                g2d.drawString(print.getContent(), print.getX(), print.getY());
            }else if(print.getType()==2){
                g2d.drawImage(print.getImage(),print.getX(),print.getY(),70,70,null);
            }
        }
        return PAGE_EXISTS;
    }
}
