package com.zmaxfilm;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.zmaxfilm.model.GoodsParam;
import com.zmaxfilm.model.Print;
import com.zmaxfilm.model.ResultInfo;
import com.zmaxfilm.model.User;
import com.zmaxfilm.service.*;
import com.zmaxfilm.service.impl.FilmServiceImpl;
import com.zmaxfilm.service.impl.ScannerServiceImpl;
import org.apache.log4j.Logger;

import java.util.List;

/**
 * Created by Administrator on 2016/11/14.
 */
public class InterfaceForJavascript {
    private static Logger logger = Logger.getLogger(InterfaceForJavascript.class);

    private FilmService filmService = Factory.getFilmService();
    private UserService userService = Factory.getUserService();

    private PrintService printService=Factory.getPrintService(Constant.DEFAULT_IMPL);

    GoodsService goodsService=Factory.getGoodsService();

    public String login(String cardCinemaNo , String userAccount , String userPassword){
        String msg = userService.login(cardCinemaNo,userAccount,userPassword);
        return msg;
    }
    //影院列表
    public String getCinemas(){
        String msg = JSON.toJSONString(filmService.getCinemas());
        return msg;
    }
    //排期列表
    public String getPlans(String cinemaNo){
        String msg =JSON.toJSONString(filmService.getPlans(cinemaNo));
        return msg;
    }
    //影厅的坐位信息
    public String getHallSites(String cinemaNo, String hallNo){
        String hallSitesMsg = JSON.toJSONString(filmService.getHallSites(cinemaNo,hallNo));
        return hallSitesMsg;
    }
    //排期的坐位信息
    public String getPlanSeats(String cinemaNo, String featureAppNo, String seatType){
        String planSeats = JSON.toJSONString(filmService.getPlanSeats(cinemaNo,featureAppNo,seatType));
        return planSeats;
    }
    //从缓存中获取用户信息
    public String getUserFromCache(){
        User user = userService.getUser();
        if(user == null) return "";
        return JSON.toJSONString(user);
    }
    //登出
    public void loginOut(){
        userService.loginOut();
    }
    public void console(String log){
        logger.debug(log);
    }

    //取影票
    public String getMovieTicketsAndGoods(String cinemaNo,String orderNumber,String validCode,String requestType){
        return filmService.getMovieTickets( cinemaNo, orderNumber, validCode,requestType);
    }
    //根据打印机名称获取队列数量
    public int getQueueCountByDeviceName(String name){
        javax.print.PrintService printDevie=printService.getPrintDevice(name);
        return printService.getPrintDeviceQueueCount(printDevie);
    }
    //获取卖品列表
    public String getGoodsList(String cinemaNo) {
        ResultInfo resultInfo= goodsService.getGoodsList(cinemaNo);
        return JSONObject.toJSONString(resultInfo);
    }
    //卖品下单
    public String lockGoods(String cinemaNo , String  goodsParam, String mobile){
        List<GoodsParam> params=JSONObject.parseArray(goodsParam,GoodsParam.class);
        ResultInfo resultInfo =goodsService.lockGoods(cinemaNo, params, mobile);
        return JSONObject.toJSONString(resultInfo);
    }
    //取卖品
    public String printGoodsTicket(String cinemaNo,String orderNo,String validCode,String requestType){
        ResultInfo resultInfo= goodsService.printTicket(cinemaNo, orderNo, validCode, requestType);
        return JSONObject.toJSONString(resultInfo);
    }

    //测试打印卖品
    public String testPrintTicket(){
        ResultInfo resultInfo=goodsService.testPrintTicket();
        return JSONObject.toJSONString(resultInfo);
    }
    //测试打印影票
    public String testPrintMovieTickets(){
        ResultInfo resultInfo=filmService.testPrintMovieTickets();
        return JSONObject.toJSONString(resultInfo);
    }
}
