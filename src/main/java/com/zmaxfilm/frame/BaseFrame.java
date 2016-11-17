package com.zmaxfilm.frame;

import com.zmaxfilm.Constant;
import com.zmaxfilm.util.FileUtils;
import javafx.application.Application;
import javafx.concurrent.Worker;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import javafx.stage.Stage;
import netscape.javascript.JSObject;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


/**
 * Created by Administrator on 2016/11/11.
 */
public class BaseFrame extends Application{
    private WebEngine engine;
    private WebView webView;
    private static List<Object> windowsObjects = new ArrayList<Object>();

    public static void reigsterWindowsObject(Object...objects){
        windowsObjects.addAll(Arrays.asList(objects));
    }

    public void start(Stage primaryStage) throws Exception {
        init(primaryStage);
    }

    public void init(Stage primaryStage) throws Exception{

        primaryStage.setFullScreen(true);  //全屏
        primaryStage.setAlwaysOnTop(true);  //始终在其他窗口之上
        Parent parent = FXMLLoader.load(FileUtils.getAbsolutePath(Constant.FRAME_XML_PATH));
        this.webView = (WebView)parent.lookup("#webView");
        this.engine = webView.getEngine();
        initWebEngine();
        Scene scene = new Scene(parent);
        primaryStage.setScene(scene);
        primaryStage.show();
    }
    public void initWebEngine(){
        this.engine.load(FileUtils.getAbsolutePath(Constant.INDEX_URL).toString()); //加载页面
        this.engine.getLoadWorker().stateProperty().addListener((observable, oldValue, newValue) -> {
                    if (newValue == Worker.State.SUCCEEDED) {
                        JSObject win = (JSObject) engine.executeScript("window"); // 获取js对象
                        for (Object windowsObject : windowsObjects) {
                            win.setMember(windowsObject.getClass().getSimpleName() ,windowsObject); //然后把应用程序对象设置成为js对象
                        }
                    }
                }
        );
    }
}
