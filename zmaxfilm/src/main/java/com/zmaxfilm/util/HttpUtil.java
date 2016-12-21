package com.zmaxfilm.util;

import com.alibaba.fastjson.JSON;
import com.google.gson.Gson;
import com.zmaxfilm.Constant;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;

import java.io.*;
import java.net.*;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.TreeMap;

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



    public static String sendHttpPost(String funstionName, LinkedHashMap<String, String> userParam) throws IOException {

        String url= Constant.HTTP_URL+funstionName;
        String requestTime= DateUtils.formatCurrentDate();
        Map<String,String> param=new HashMap<>();
        param.put("account",Constant.APP_ACCOUNT);
        param.put("requestTime",requestTime);
        param.put("macAddress",DeviceUtil.getLocalMac());
        String msg=Constant.APP_ACCOUNT;
        msg+=DeviceUtil.getLocalMac();
        if(userParam!=null){
            for(String key:userParam.keySet()){
                msg+=userParam.get(key);
            }
            param.putAll(userParam);
        }
        msg+=requestTime;
        String str=EncryptUtil.encrypt4Socket(msg);
        param.put("verifyInfo",str);

        String charset="utf-8";
        StringBuffer buffer = new StringBuffer();
        if (param != null && !param.isEmpty()) {
            for (Map.Entry<String, String> entry : param.entrySet()) {
                buffer.append(entry.getKey()).append("=")
                        .append(URLEncoder.encode(entry.getValue()))
                        .append("&");
            }
        }
        System.out.println("buffer in httpUtil.java           " + buffer);
        buffer.deleteCharAt(buffer.length() - 1);

        PrintWriter out = null;
        BufferedReader in = null;
        String result = "";
        try {
            URL realUrl = new URL(url);
            // 打开和URL之间的连接
            URLConnection conn = realUrl.openConnection();
            // 设置通用的请求属性
            conn.setRequestProperty("accept", "*/*");
            conn.setRequestProperty("connection", "Keep-Alive");
            conn.setRequestProperty("user-agent",
                    "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
            // 发送POST请求必须设置如下两行
            conn.setDoOutput(true);
            conn.setDoInput(true);
            // 获取URLConnection对象对应的输出流
            out = new PrintWriter(conn.getOutputStream());
            // 发送请求参数
            out.print(buffer);
            // flush输出流的缓冲
            out.flush();
            // 定义BufferedReader输入流来读取URL的响应
            in = new BufferedReader(new InputStreamReader(
                    conn.getInputStream(), charset));
            String line;
            while ((line = in.readLine()) != null) {
                result += line;
            }
        }
        // 使用finally块来关闭输出流、输入流
        finally {
            try {
                if (out != null) {
                    out.close();
                }
                if (in != null) {
                    in.close();
                }
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        return result;
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
