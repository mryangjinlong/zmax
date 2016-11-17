package com.zmaxfilm;


import com.zmaxfilm.frame.BaseFrame;
import com.zmaxfilm.service.impl.SocketClientServiceImpl;
import com.zmaxfilm.util.FileUtils;
import com.zmaxfilm.util.HttpUtil;
import com.zmaxfilm.util.Inspiry532Utils;
import org.apache.log4j.Logger;

/**
 * Created by Administrator on 2016/11/5.
 */
public class Main extends BaseFrame {



    public static void main(String[] args) {
//        Inspiry532Utils.initInspiry532();

        HttpUtil.sendGet("https://rest.shanbay.com/api/v2/quote/quotes/today/?_=147928478304");
//        Factory.getSocketClientService(0).startSocketClient();
//        System.out.println(FileUtils.getAbsolutePath("dll_camera.dll"));
////        System.out.println(InspiryDeviceAPIFor532.class.getResource("/").getPath()+"dll_camera.dll");
//        Inspiry532Utils.initInspiry532();
//        reigsterWindowsObject(new InterfaceForJavascript());
//        launch(args);
    }
}
