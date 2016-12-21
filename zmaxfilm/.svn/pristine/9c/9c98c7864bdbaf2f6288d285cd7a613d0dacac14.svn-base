package com.zmaxfilm.service;

import com.zmaxfilm.model.socket.ImgData;
import com.zmaxfilm.model.socket.VideoData;

import java.util.List;
import java.util.Map;

/**
 * Created by jimmy on 2016/11/15.
 * 检测服务 启动时检查广告文件 html,js文件是否存在，如果不存在则下载
 */
public interface DeviceDetectionService extends Runnable{

    //删除html,js文件
    void deleteHtml();
    //下载html,js文件并解压
    boolean downloadHtml(String url);
    //删除广告文件
    void deleteAd();
    //下载并解压广告文件
    boolean downloadAd(List<VideoData> videos , List<ImgData> imgDatas);
    //更新html,js
    void updateHtml(String url);
    //更新广告
    void updateAd(List<VideoData> videos , List<ImgData> imgDatas);
    //更新所有文件
    void updateAll();

}
