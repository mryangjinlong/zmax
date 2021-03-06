package com.zmaxfilm.service.impl;

import com.alibaba.fastjson.JSON;
import com.google.gson.reflect.TypeToken;
import com.zmaxfilm.Constant;
import com.zmaxfilm.Factory;
import com.zmaxfilm.model.socket.*;
import com.zmaxfilm.service.*;
import com.zmaxfilm.util.DeviceUtil;
import org.apache.log4j.Logger;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Type;
import java.util.*;

/**
 * 消息处理服务
 * Created by jimmy on 2016/11/29.
 * 签名方式：传递的参数除签名字段外其他参数按照键值对拼接。拼接后的字符串再拼上私钥ZmaxFilm1101a。
 * 得到的字符串全部化为小写后再进行md5加密。加密后的数据从第8位开始截取其中的16位字符。将得到的16位字符全小写。得到签名字符串。
 */
public class MsgHanderServiceImpl implements MsgHanderService {

    private static Logger logger = Logger.getLogger(MsgHanderServiceImpl.class);

    private DeviceDetectionService deviceDetectionService = Factory.getDeviceDetectionService();
    private PrintService printService = Factory.getPrintService(Constant.DEFAULT_IMPL);
    private ScanService scanService = Factory.getScanService(Constant.DEFAULT_IMPL);
    private SocketClientService socketClientService = Factory.getSocketClientService(Constant.DEFAULT_IMPL);


    /**
     *处理socket数据
     */
    @Override
    public void processSocketMsg(String msg){
        try {
            SocketData socketData = JSON.parseObject(msg, SocketData.class);
            if(socketData.getResultCode() == SocketData.RESULT_CODE_UPDATE){
                processUpdateNotification(socketData.getResultData());
            }else if(socketData.getResultCode() == SocketData.RESULT_CODE_ADVERTIS){
                processAdvertisingPush(socketData.getResultData());
            }
        } catch (Exception e) {
            //有可能出现msg里面的json字符串有误的情况，解析错误则忽略此消息并打印错误日志
            logger.debug(Arrays.toString(e.getStackTrace()));
        }
    }


    /**
     *
     * @param msg {"resultCode":"200","resultData":[{"id":"4","titile":"\u6d4b\u8bd5","effectTime":"1481731200","expiryTime":"1481731200","screenPosition":"1","advertiseType":"0","video":null,"imgesInfo":[{"url":"\/Uploads\/zmaxyun\/advertisement\/Cache\/2016-12-08\/58492e1dbe1dc.jpg","imgOrder":"4","imgTime":"5","imgLinkType":"2","href":""}]}]}
     */
    //处理广告推送指令
    private void processAdvertisingPush(String msg) {
        Type type = new TypeToken<ArrayList<AdvertisingPush>>(){}.getType();
        List<AdvertisingPush> advertisingPushs = JSON.parseObject(msg, type);
        String id = "";
        for (AdvertisingPush advertisingPush : advertisingPushs) {
            List<ImgData> imgs = advertisingPush.getImgesInfo();
            List<VideoData> videos = advertisingPush.getVideo();
            deviceDetectionService.updateAd(videos,imgs);//TODO 升级完后页面需要重新加载
            id = advertisingPush.getId();
        }
        AdvertiseReturn advertiseReturn = new AdvertiseReturn(AdvertiseReturn.RECEIVE_STATUS_SUCCESS , id);
        socketClientService.sendMsg(JSON.toJSONString(advertiseReturn));
    }

    /**
     *
     * @param msg "{\"resultCode\":\"0\",\"resultData\":[{\"systemVersion\":\"v1.4\",\"systemVersionUrl\":\"Uploads\\/zmaxyun\\/systemversion\\/Cache\\/2016-12-03\\/58421e9ba737a.zip\",\"action\":\"updateNotification \"}],\"cacheTime\":\"86400\"}"
     */
    //处理更新推送指令
    private void processUpdateNotification(String msg) {
        Type type = new TypeToken<ArrayList<UpdateNotificationData>>(){}.getType();
        List<UpdateNotificationData> updateNotificationDatas = JSON.parseObject(msg,type);
        String url = "";
        String version = "";
        for (UpdateNotificationData updateNotificationData : updateNotificationDatas) {
            url = updateNotificationData.getSystemVersionUrl();
            version = updateNotificationData.getSystemVersion();
            deviceDetectionService.updateHtml(url);  //TODO 升级完后页面是否需要重新加载
        }
        UpdateNotifyReturn updateNotifyReturn = new UpdateNotifyReturn(UpdateNotifyReturn.RECEIVE_STATUS_SUCCESS,version,url);
        socketClientService.sendMsg(JSON.toJSONString(updateNotifyReturn));
    }

    /**
     *生成心跳包数据消息
     * @return {"account":"selfService","action":"deviceHeartbeatDetection","macAddress":"34-97-F6-91-4C-BE","printData":[{"printName":"printer1","printStatus":1}],"requestTime":"2016-12-09 03:44:03","scanData":[{"scanName":"scanner1","scanStatus":0}],"verifyInfo":"28a0775d87846794"}
     */
    @Override
    public String processDeviceMsg() {
        Map<String , Map> prints = printService.getPrintDeviceList();

//        if(prints.isEmpty()) return "";
        String macAddress = DeviceUtil.getLocalMac();
        List<PrintData> printDatas = new ArrayList<>();

//        printDatas.add(new PrintData("printer1", 1)); //测试用

        for (String s : prints.keySet()) {
            printDatas.add(new PrintData(s,(int)prints.get(s).get("status")));
        }

        int scannerStatus = scanService.getStatus();
        List<ScanData> scanDatas = new ArrayList<>(1);
        scanDatas.add(new ScanData("scanner1", scannerStatus));

        DeviceHeartbeat deviceHeartbeat = new DeviceHeartbeat(macAddress , printDatas , scanDatas);

        return JSON.toJSONString(deviceHeartbeat);
    }

}
