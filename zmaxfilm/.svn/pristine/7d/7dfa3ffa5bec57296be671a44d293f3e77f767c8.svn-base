package com.zmaxfilm.util;

import com.zmaxfilm.Constant;

import java.math.BigInteger;
import java.security.MessageDigest;

/**
 * Created by jimmy on 2016/11/29.
 * 加密工具
 */
public class EncryptUtil {
    /**
     * 对字符串md5加密
     * @param s  需要加密的字符串
     * @return  加密后的字符串
     */
    public final static String MD5(String s) {
        char hexDigits[]={'0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'};
        try {
            byte[] btInput = s.getBytes();
            // 获得MD5摘要算法的 MessageDigest 对象
            MessageDigest mdInst = MessageDigest.getInstance("MD5");
            // 使用指定的字节更新摘要
            mdInst.update(btInput);
            // 获得密文
            byte[] md = mdInst.digest();
            // 把密文转换成十六进制的字符串形式
            int j = md.length;
            char str[] = new char[j * 2];
            int k = 0;
            for (int i = 0; i < j; i++) {
                byte byte0 = md[i];
                str[k++] = hexDigits[byte0 >>> 4 & 0xf];
                str[k++] = hexDigits[byte0 & 0xf];
            }
            return new String(str);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 适用于取票机的socket数据加密方式与业务耦合  在需要加密的字符串后面加上密码然后小写再MD5返回第8到24位字符的小写
     * @param msg  需要加密的字符串   msg是除password外的字符串
     * @return      加密后的字符串
     */
    public static String encrypt4Socket(String msg){
        assert msg != null;
        String temp = msg + Constant.APP_PASSWORD;
        temp = temp.toLowerCase();
        temp = MD5(temp);
        return temp.substring(8 , 24).toLowerCase();
    }

}
