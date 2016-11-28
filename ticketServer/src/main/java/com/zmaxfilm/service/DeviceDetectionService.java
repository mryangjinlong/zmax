package com.zmaxfilm.service;

/**
 * Created by jimmy on 2016/11/15.
 * 检测服务 启动时检查广告文件 html,js文件是否存在，如果不存在则下载
 */
public interface DeviceDetectionService extends Runnable{

    //删除html,js文件
    void deleteHtml();
    //下载html,js文件并解压
    void downloadHtml();
    //删除广告文件
    void deleteAd();
    //下载并解压广告文件
    void downloadAd();
    //更新html,js
    void updateHtml();
    //更新广告
    void updateAd();
    //更新所有文件
    void updateAll();

}
