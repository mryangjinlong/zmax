package com.zmaxfilm.service.impl;

import com.zmaxfilm.Constant;
import com.zmaxfilm.Factory;
import com.zmaxfilm.service.SocketClientService;
import com.zmaxfilm.service.MsgHanderService;
import org.apache.log4j.Logger;

import java.io.*;
import java.net.Socket;

/**
 * Created by drj on 2016/11/15.
 */
public class SocketClientServiceImpl implements Runnable, SocketClientService {


    private static Logger logger = Logger.getLogger(PrintServiceImpl.class);

    private OutputStream os;

    private Socket client;

    // 接收服务器的反馈
    private BufferedReader bufferedReader;

    //发送数据到服务端
    private PrintWriter printWriter;

    private MsgHanderService msgHanderService = Factory.getMsgHanderService();
    @Override
    public void startSocketClient() {
        Thread thread=new Thread(this);
        thread.start();
    }

    //发送socket信息
    @Override
    public void sendMsg(String msg) {
        try {
            os.write(msg.getBytes());
            os.flush();
        } catch (IOException e) {
            logger.debug("socket 输出错误");
        }
    }

    @Override
    public void run() {
        while (true) {
            try {
                if (null != client) {
                    try {//发送检测是否断开
                        client.sendUrgentData(0xFF);
                        Thread.sleep(10*1000);
                    } catch (Exception e) {//断开产生异常，关闭对象
                        os.close();
                        client.close();
                        os = null;
                        client = null;
                        e.printStackTrace();
                    }
                } else {
                    logger.debug("\n\n重新连接中...\n");
                    client = new Socket(Constant.SOCKET_IP, Constant.SOCKET_PORT);
                    logger.debug("重连成功!");
                    os = client.getOutputStream();
                    printWriter=new PrintWriter(os);
                    // 接收服务器的反馈
                    InputStream in=client.getInputStream();
                    bufferedReader = new BufferedReader(
                            new InputStreamReader(in));
                    String msg = null;
                    while (true){
                        while ((msg = bufferedReader.readLine()) != null){
                            msgHanderService.processSocketMsg(msg);
                            logger.debug(msg);
                        }
                    }
                }
            } catch (Exception e) {
                try {
                    logger.debug("\n\n连接失败，继续连接\n");
                    Thread.sleep(10*1000);
                } catch (InterruptedException e1) {
                    logger.debug("错误",e1);
                }
            }
        }

    }


}
