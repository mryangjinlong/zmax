package com.zmaxfilm.service.impl;

import com.zmaxfilm.Constant;
import com.zmaxfilm.Factory;
import com.zmaxfilm.model.socket.ImgData;
import com.zmaxfilm.model.socket.VideoData;
import com.zmaxfilm.service.DeviceDetectionService;
import com.zmaxfilm.service.MsgHanderService;
import com.zmaxfilm.service.SocketClientService;
import com.zmaxfilm.util.FileUtils;
import com.zmaxfilm.util.HttpUtil;

import java.io.File;
import java.util.*;

/** html 广告升级操作
 * Created by jimmy on 2016/11/15.
 */
public class DeviceDetectionServiceImpl implements DeviceDetectionService {

    private static final long CHECK_PERIOD = 1000*60*2;
    private static final String HTML_FILE_PATH = Constant.WEB_PATH + "html.rar";
    private MsgHanderService msgHanderService = Factory.getMsgHanderService();
    private SocketClientService socketClientService = Factory.getSocketClientService(Constant.DEFAULT_IMPL);

    private String heatBeatMsg;

    @Override
    public void run() {

        Timer timer = new Timer(true);
        timer.schedule(new TimerTask() {
            @Override
            public void run() {

                String msg = msgHanderService.processDeviceMsg();
                if(heatBeatMsg == null || !heatBeatMsg.equals(msg)&&!"".equals(msg.trim())){
                    heatBeatMsg = msg;
                    socketClientService.sendMsg(msg); //发送心跳包
                }
            }
        },new Date(),CHECK_PERIOD);
    }

    @Override
    public void updateHtml(String url) {
        boolean flag = downloadHtml(url);
        if(flag){
            deleteHtml();
            unRarHtml();
        }
    }

    @Override
    public boolean downloadHtml(String url) {
        //下载html.rar文件
        HttpUtil.downloadFile(url , HTML_FILE_PATH);
        return new File(HTML_FILE_PATH).exists();
    }

    @Override
    public void deleteHtml() {
        FileUtils.deleteFolder(Constant.HTML_PATH);
    }

    private void unRarHtml(){
        //解压文件到当前目录
        FileUtils.unRarFile(HTML_FILE_PATH , Constant.WEB_PATH);
        //删除下载下来的rar文件
        FileUtils.deleteFile(HTML_FILE_PATH);
    }


    @Override
    public void updateAd(List<VideoData> videos , List<ImgData> imgDatas) {
       deleteAd();
       downloadAd(videos , imgDatas);
    }

    @Override
    public void updateAll() {
        /*updateHtml();
        updateAd();*/
    }


    @Override
    public void deleteAd() {
        FileUtils.deleteFolder(Constant.AD_PATH);
    }

    @Override
    public boolean downloadAd(List<VideoData> videos , List<ImgData> imgDatas) {
        String a = Constant.WEB_PATH;
        if(videos != null){
            for (VideoData video : videos) {
                String fileName = "aaaaa.avi";
                String url = video.getUrl();
                HttpUtil.downloadFile(url , Constant.WEB_PATH + fileName);
            }
        }
        if(imgDatas != null){
            int i = 1;
            for (ImgData imgData : imgDatas) {
                String fileName = "aaaaa.jpg";
                String url = imgData.getUrl();
                HttpUtil.downloadFile(url , Constant.WEB_PATH + fileName);
            }
        }

        return true;
    }

}
