package com.zmaxfilm.service.impl;

import com.alibaba.fastjson.JSON;
import com.google.gson.reflect.TypeToken;
import com.zmaxfilm.Constant;
import com.zmaxfilm.Factory;
import com.zmaxfilm.model.socket.*;
import com.zmaxfilm.service.*;
import com.zmaxfilm.util.DeviceUtil;
import com.zmaxfilm.util.EhcacheUtil;
import com.zmaxfilm.util.EncryptUtil;

import java.lang.reflect.Type;
import java.util.*;

/**
 * 消息处理服务
 * Created by jimmy on 2016/11/29.
 * 签名方式：传递的参数除签名字段外其他参数按照键值对拼接。拼接后的字符串再拼上私钥ZmaxFilm1101a。
 * 得到的字符串全部化为小写后再进行md5加密。加密后的数据从第8位开始截取其中的16位字符。将得到的16位字符全小写。得到签名字符串。
 */
public class MsgHanderServiceImpl implements MsgHanderService {


    //action 可能的值
    private static final String ACTION_VAL_UPDATENOTIFICATION = "updateNotification";
    private static final String ACTION_VAL_ADVERTISINGPUSH = "advertisingPush";

    private DeviceDetectionService deviceDetectionService = Factory.getDeviceDetectionService();
    private PrintService printService = Factory.getPrintService(Constant.DEFAULT_IMPL);
    private ScanService scanService = Factory.getScanService(Constant.DEFAULT_IMPL);
    private SocketClientService socketClientService = Factory.getSocketClientService(Constant.DEFAULT_IMPL);

    //处理socket数据

    /**
     *
     * @param msg  "{\"resultCode\":\"0\",\"resultData\":[{\"systemVersion\":\"v1.4\",\"systemVersionUrl\":\"Uploads\\/zmaxyun\\/systemversion\\/Cache\\/2016-12-03\\/58421e9ba737a.zip\",\"action\":\"updateNotification \"}],\"cacheTime\":\"86400\"}"
     */
    @Override
    public void processSocketMsg(String msg) {
        if(msg.contains(ACTION_VAL_UPDATENOTIFICATION)){
            processUpdateNotification(msg);
        }else if(msg.contains(ACTION_VAL_ADVERTISINGPUSH)){
            processAdvertisingPush(msg);
        }

    }
    //处理广告推送指令
    private void processAdvertisingPush(String msg) {
        Type typeAdvertisingPush = new TypeToken<SocketData<AdvertisingPush>>(){}.getType();
        SocketData<AdvertisingPush> socketData = JSON.parseObject(msg ,typeAdvertisingPush);

        String id ="";
        for (AdvertisingPush advertisingPush : socketData.getResultData()) {
            List<ImgData> imgs = advertisingPush.getImg();
            List<VideoData> videos = advertisingPush.getVideo();
            deviceDetectionService.updateAd(videos,imgs);
            id = advertisingPush.getId();
        }
        NotifyReturn notifyReturn = new NotifyReturn(NotifyReturn.ACTION_UPDATENOTIFY_RETURN ,DeviceUtil.getLocalMac(),NotifyReturn.RECEIVE_STATUS_SUCCESS ,id);
        socketClientService.sendMsg(JSON.toJSONString(notifyReturn));
    }

    //处理更新推送指令
    private void processUpdateNotification(String msg) {
        Type typeUpdateNotification = new TypeToken<SocketData<UpdateNotificationData>>(){}.getType();
        SocketData<UpdateNotificationData> socketData = JSON.parseObject(msg ,typeUpdateNotification);
        for (UpdateNotificationData updateNotificationData : socketData.getResultData()) {
            String url = updateNotificationData.getSystemVersionUrl();
            deviceDetectionService.updateHtml(url);
        }

        NotifyReturn notifyReturn = new NotifyReturn(NotifyReturn.ACTION_ADVER_RETURN ,DeviceUtil.getLocalMac(),NotifyReturn.RECEIVE_STATUS_SUCCESS,null);
        socketClientService.sendMsg(JSON.toJSONString(notifyReturn));
    }

    //生成心跳包数据消息

    /**
     *
     * @return {"action":"deviceHeartbeatDetection","macAddress":"34-97-F6-91-4C-BE","printData":[{"printName":"printer1","printStatus":1}],"requestTime":"2016-12-06","scanData":[{"scannerName":"scanner1","scannerStatus":0}],"verifyInfo":"ea40ac31c46fec4"}
     */
    @Override
    public String processDeviceMsg() {
        Map<String , Map> prints = printService.getPrintDeviceList();
        if(prints.isEmpty()) return "";
        String macAddress = DeviceUtil.getLocalMac();
        List<PrintData> printDatas = new ArrayList<>();
        for (String s : prints.keySet()) {
            printDatas.add(new PrintData(s,(int)prints.get(s).get("status")));
        }
        int scannerStatus = scanService.getStatus();
        List<ScanData> scanDatas = new ArrayList<>();
        scanDatas.add(new ScanData("scanner1", scannerStatus));

        DeviceHeartbeat deviceHeartbeat = new DeviceHeartbeat(macAddress , printDatas , scanDatas);

        return JSON.toJSONString(deviceHeartbeat);
    }

}
