package com.zmaxfilm.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 日期相关的一些工具
 * Created by jimmy on 2016/12/6.
 */
public class DateUtils {

    /**
     *
     * @return 当前日期的yyyy-MM-dd 格式的字符串
     */
    public static String formatDate(){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.format(new Date());
    }

}
