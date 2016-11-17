package com.zmaxfilm.util;

import com.alibaba.fastjson.JSON;
import com.google.gson.Gson;
import com.zmaxfilm.Main;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by drj on 2016/11/15.
 */
public class HttpUtil {

    private static Logger logger = Logger.getLogger(HttpUtil.class);


    public static Map<String, Object> sendGet(String url) {

        Map<String, Object> map = null;
        try {
            HttpClient client = new DefaultHttpClient();
            HttpGet get = new HttpGet(url);
            HttpResponse response = client.execute(get);
            if (response.getStatusLine().getStatusCode() == 200) {
                HttpEntity resEntity = response.getEntity();
                String message = EntityUtils.toString(resEntity, "utf-8");
                map = JSON.parseObject(message, HashMap.class);
            } else {
                logger.error("调用接口失败 " + url);
            }
        } catch (Exception e) {
            logger.error("调用接口失败 " + url);
        }

        return map;
    }

    public static Map<String, String> sendStringPost(String url, String pars) {
        Map<String, String> map = null;
        try {
            StringEntity entity = new StringEntity(pars, "utf-8");
            HttpClient client = new DefaultHttpClient();
            HttpPost post = new HttpPost(url);
            post.setEntity(entity);
            HttpResponse response = client.execute(post);

            if (response.getStatusLine().getStatusCode() == 200) {
                HttpEntity resEntity = response.getEntity();
                String message = EntityUtils.toString(resEntity, "utf-8");
                Gson gson = new Gson();
                map = gson.fromJson(message, HashMap.class);
                String errmsg = map.get("errmsg");
                if (StringUtils.isEmpty(errmsg) || !errmsg.equals("ok")) {
                    map = null;
                    logger.error("调用接口失败 " + url);
                }
            } else {
                logger.error("调用接口失败 " + url);
            }
        } catch (Exception e) {
            logger.error("调用接口失败 " + url);
        }
        return map;
    }

    /**
     *
     * @param url
     * @param path   文件全路径，包含文件名
     */
    public static void downloadFile(String url, String path) {
        try {
            HttpClient client = new DefaultHttpClient();
            HttpGet get = new HttpGet(url);
            HttpResponse response = client.execute(get);
            if (response.getStatusLine().getStatusCode() == 200) {
                HttpEntity resEntity = response.getEntity();
                OutputStream os = new FileOutputStream(new File(path));
                resEntity.writeTo(os);
                os.flush();
                os.close();
            } else {
                logger.error("调用接口失败 " + url);
            }
        } catch (Exception e) {
            logger.error("调用接口失败 " + url);
        }
    }


}
