package com.zmaxfilm.util;

import com.zmaxfilm.service.impl.MsgHanderServiceImpl;
import org.apache.log4j.Logger;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.UnknownHostException;

/**
 * Created by jimmy on 2016/12/1.
 * 与设备相关的工具
 */
public class DeviceUtil {
    private static Logger logger = Logger.getLogger(DeviceUtil.class);
    //获取MAC地址
    public static String getLocalMac(){
        InetAddress ia ;
        try {
            ia = InetAddress.getLocalHost();
        } catch (UnknownHostException e) {
            logger.debug("获取MAC地址失败  UnknownHostException");
            return "";
        }
        //获取网卡，获取地址
        byte[] mac;
        try {
            mac = NetworkInterface.getByInetAddress(ia).getHardwareAddress();
        } catch (SocketException e) {
            logger.debug("获取MAC地址失败  SocketException");
            return "";
        }
        StringBuilder sb = new StringBuilder("");
        for(int i=0; i<mac.length; i++) {
            if(i!=0) {
                sb.append("-");
            }
            //字节转换为整数
            int temp = mac[i]&0xff;
            String str = Integer.toHexString(temp);
            if(str.length()==1) {
                sb.append("0"+str);
            }else {
                sb.append(str);
            }
        }
        return sb.toString().toUpperCase();
    }
}
