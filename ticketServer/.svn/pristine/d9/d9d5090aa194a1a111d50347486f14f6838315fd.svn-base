package com.zmaxfilm.util;

import com.google.gson.Gson;

import java.lang.reflect.Type;

/**
 * Created by Administrator on 2016/11/15.
 */
public class JsonUtil {
    /**
     * 将字符串转换成T类型的对象
     * @param <T>
     * @param s
     * @param c
     * @return
     */
    public static <T> T fromJson(String s, Class<T> c) {
        Gson gson = new Gson();
        try {
            return gson.fromJson(s, c);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    /**
     * 将s转换成type类型的对象，主要用于泛型对象转换，比如List<T>
     * @param <T>
     * @param s
     * @param type 例子：Type type = new TypeToken<List<Long>>(){}.getType();
     * @return
     */
    public static <T> T fromJson(String s, Type type){
        Gson gson = new Gson();
        try {
            return gson.fromJson(s, type);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
