package com.zmaxfilm.util;

import com.zmaxfilm.service.impl.MsgHanderServiceImpl;
import org.apache.log4j.Logger;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 日期相关的一些工具
 * Created by jimmy on 2016/12/6.
 */
public class DateUtils {

    private static Logger logger = Logger.getLogger(DateUtils.class);
    /**
     *
     * @return 当前日期的yyyy-MM-dd hh:mm:ss格式的字符串
     */
    public static String formatCurrentDate(){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        return sdf.format(new Date());
    }

    /**
     *
     * @return 返回日期的yyyy-MM-dd 格式的字符串
     */
    public static String formatDate(String dateMsg){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date date ;
        try {
            date = sdf.parse(dateMsg);
        } catch (ParseException e) {
            logger.debug("日期转换异常");
            return "";
        }
        return sdf.format(date);
    }

}
