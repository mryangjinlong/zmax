package com.zmaxfilm.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
 import com.google.gson.reflect.TypeToken;
import com.zmaxfilm.Constant;
import com.zmaxfilm.Factory;
import com.zmaxfilm.model.*;
import com.zmaxfilm.model.http.*;
import com.zmaxfilm.service.FilmService;
import com.zmaxfilm.util.DateUtils;
import com.zmaxfilm.util.EhcacheUtil;
import com.zmaxfilm.util.HttpUtil;
import com.zmaxfilm.util.TwoDimensionCodeUtil;
import org.apache.log4j.Logger;

import javax.print.PrintException;
import javax.print.PrintService;
import java.awt.*;
import java.io.IOException;
import java.lang.reflect.Type;
import java.text.ParseException;
import java.util.*;
import java.util.List;

/**
 * 电影相关服务
 * Created by jimmy on 2016/11/28.
 */
public class FilmServiceImpl implements FilmService{

    private EhcacheUtil ehcacheUtil = EhcacheUtil.getInstance();

    private com.zmaxfilm.service.PrintService printService= Factory.getPrintService(Constant.DEFAULT_IMPL);
    private static Logger logger = Logger.getLogger(FilmServiceImpl.class);
    /**
     * 获取所有电影院信息
     */
    @Override
    public List<Cinema> getCinemas() {
        List<Cinema> cinemas = (ArrayList<Cinema>)ehcacheUtil.get(Constant.CACHE_KEY_CINEMA);
        if(cinemas == null){
            String msg = null;
            try {
                msg = HttpUtil.sendHttpPost(Constant.FUNSTIONNAME_CINEMA , null);
            } catch (IOException e) {
                logger.debug(e.getMessage());
                return null;
            }
            Type type = new TypeToken<HttpData<ArrayList<Cinema>>>(){}.getType();
            HttpData<ArrayList<Cinema>> httpData = JSON.parseObject(msg,type);
            cinemas = httpData.getResultData();
            ehcacheUtil.put(Constant.CACHE_KEY_CINEMA, cinemas , Constant.CACHE_TIME_CINEMA);
        }
        return cinemas;
    }


    /**
     *获取影厅对应的所有座位信息
     */
    @Override
    public List<HallSite> getHallSites(String cinemaNo, String hallNo) {

        String cacheKey = Constant.CACHE_KEY_HALL_SITE + cinemaNo + hallNo;
        List<HallSite> hallSites = (ArrayList<HallSite>)ehcacheUtil.get(cacheKey);

        if(hallSites == null){
            LinkedHashMap<String, String> map = new LinkedHashMap<>();
            map.put("cinemaNo",cinemaNo);
            map.put("hallNo",hallNo);
            String hallSiteMsg = null;
            try {
                hallSiteMsg = HttpUtil.sendHttpPost(Constant.FUNSTIONNAME_HALL_SITE , map);
            } catch (IOException e) {
                logger.debug(e.getMessage());
                return null;
            }

            Type type = new TypeToken<HttpData<ArrayList<HallSite>>>(){}.getType();
            HttpData<ArrayList<HallSite>> httpData = JSON.parseObject(hallSiteMsg,type);
            hallSites = httpData.getResultData();
            ehcacheUtil.put(cacheKey , hallSites , Constant.CACHE_TIME_HALL_SITE);
        }
        return hallSites;
    }

    /**
     * 取排期的座位状态
     * @param cinemaNo
     * @param featureAppNo
     * @param seatType
     * @return
     */
    @Override
    public List<PlanSeat> getPlanSeats(String cinemaNo, String featureAppNo, String seatType) {
        System.out.println("cinemaNo：         " + cinemaNo);
        System.out.println("featureAppNo：         " + featureAppNo);
        System.out.println("seatType：         " + seatType);
        LinkedHashMap<String, String> map = new LinkedHashMap<>();
        map.put("cinemaNo",cinemaNo);
        map.put("featureAppNo",featureAppNo);
        map.put("seatType",seatType);
        String planSeatMsg ;
        try {
            planSeatMsg = HttpUtil.sendHttpPost(Constant.FUNSTIONNAME_PLAN_SEAT , map);
        } catch (IOException e) {
            logger.debug(e.getMessage());
            return null;
        }
        System.out.println("planSeatMsg：         " + planSeatMsg);
        Type type = new TypeToken<HttpData<PlanSiteStates>>(){}.getType();
        HttpData<PlanSiteStates> httpData = JSON.parseObject(planSeatMsg,type);

        return httpData.getResultData().getPlanSiteStates();
    }


    /**
     * 获取影院当前所有排期
     */
    @Override
    public List<FilmPlan4Http> getPlans(String cinemaNo) {
        String key = Constant.CACHE_KEY_PLAN + cinemaNo;
        List<FilmPlan4Http> filmPlan4Https = (List<FilmPlan4Http>)ehcacheUtil.get(key);

        if(filmPlan4Https == null){

            LinkedHashMap<String, String> map = new LinkedHashMap<>();
            map.put("cinemaNo",cinemaNo);
            String msg = null;
            try {
                msg = HttpUtil.sendHttpPost(Constant.FUNSTIONNAME_PLAN , map);
            } catch (IOException e) {
                logger.debug(e.getMessage());
                return null;
            }

            Type type = new TypeToken<HttpData<ArrayList<FilmPlan4Http>>>(){}.getType();
            HttpData<ArrayList<FilmPlan4Http>> httpData = JSON.parseObject(msg,type);
            filmPlan4Https = httpData.getResultData();
            System.out.println("plan:          " + msg);
            assert filmPlan4Https != null;

            ehcacheUtil.put(key, filmPlan4Https ,Constant.CACHE_TIME_PLAN);
     }

        return filmPlan4Https;
    }

    @Override
    public String getMovieTickets(String cinemaNo,String orderNumber,String validCode,String requestType) {
        LinkedHashMap<String,String>map=new LinkedHashMap<>();
        map.put("cinemaNo",cinemaNo);
        ResultInfo resultInfo=new ResultInfo();
            map.put("orderNo",orderNumber);
            map.put("validCode",validCode);
            map.put("requestType",requestType);
            String str= null;
            try {
                str = HttpUtil.sendHttpPost(Constant.FUNSTIONNAME_PRINTTICKET,map);
            } catch (IOException e) {
                resultInfo.setResult(false);
                resultInfo.setMessage("取票失败");
                logger.debug(e.getMessage());
            }
            MovieTicketResultInfo ticket=
                    JSON.parseObject(str,MovieTicketResultInfo.class);
            if(ticket.getResultCode().equals("100605")){
                resultInfo.setResult(false);
                resultInfo.setMessage("订单号错误！");
            }else if(!ticket.getResultCode().equals("0")){
                resultInfo.setResult(false);
                resultInfo.setMessage("取票失败！");
            }else{
                try {
                    List<PrintService> printServices=printService.getAvailableDevicelist();
                    if(printServices.size()==0){
                        resultInfo.setResult(false);
                        resultInfo.setMessage("没有可用的打印机");
                    }else{
                        PrintService printDevice=printServices.get(0);
                        this.printMovieTicket2(ticket.getResultData(),printDevice);
                        resultInfo.setResult(true);
                        Map<String,Object> value=new HashMap<>();
                        value.put("queueCount",printService.getPrintDeviceQueueCount(printDevice));
                        value.put("count",ticket.getResultData().getTicketList().size());
                        value.put("deviceName",printDevice.getName());
                        resultInfo.setValue(value);
                    }
                } catch (ParseException e) {
                    resultInfo.setMessage("打印出错");
                    resultInfo.setResult(false);
                    e.printStackTrace();
                } catch (PrintException e) {
                    resultInfo.setMessage("打印出错");
                    resultInfo.setResult(false);
                    e.printStackTrace();
                }
            }
        return JSONObject.toJSONString(resultInfo);
    }

    @Override
    public ResultInfo testPrintMovieTickets() {
        ResultInfo resultInfo=new ResultInfo();
        String str="打印测试";
        OrderInfo orderInfo=new OrderInfo();
        orderInfo.setCinemaName(str+"影院");
        orderInfo.setFilmName(str+"电影");
        orderInfo.setHallName(str+"渠道");
        orderInfo.setStartTime(DateUtils.formatCurrentDate());
        List<MovieTicket> ticketList =new ArrayList<>();
        MovieTicket movieTicket=new MovieTicket();
        movieTicket.setCpnName(str+"合作券名称");
        movieTicket.setPrintTime(DateUtils.formatCurrentDate());
        movieTicket.setSeatCol("1");
        movieTicket.setSeatRow("1");
        movieTicket.setServiceCharge("1");
        movieTicket.setTicketNo("打印测试");
        movieTicket.setTicketNo2("000000000000");
        movieTicket.setTicketPrice("1");
        ticketList.add(movieTicket);
        orderInfo.setTicketList(ticketList);
        List<PrintService> printServices=printService.getAvailableDevicelist();
        if(printServices.size()==0){
            resultInfo.setResult(false);
            resultInfo.setMessage("没有可用的打印机");
        }else{
            PrintService printDevice=printServices.get(0);
            try {
                this.printMovieTicket2(orderInfo,printDevice);
                resultInfo.setResult(true);
            } catch (ParseException e) {
                resultInfo.setMessage("打印出错");
                resultInfo.setResult(false);
                e.printStackTrace();
            } catch (PrintException e) {
                resultInfo.setMessage("打印出错");
                resultInfo.setResult(false);
                e.printStackTrace();
            }

        }
        return resultInfo;
    }

    @Override
    public void printMovieTicket(OrderInfo orderInfo, PrintService printDevice) throws ParseException, PrintException {
        int x=5;
        int y=8;
        int size=12;

        int x1=79;
        int y1=73;
        int size1=8;

        int x2=160;
        int y2=20;


        String[] startTimes=orderInfo.getStartTime().split(" ");
        String starDate=startTimes[0];
        String[] times=startTimes[1].split(":");
        String time=times[0]+":"+times[1];

        List<MovieTicket> ticketList=orderInfo.getTicketList();
        for(MovieTicket ticket:ticketList){
            List<Print> prints=new ArrayList<>();
            Print print=new Print(orderInfo.getCinemaName(),x,y,Font.TRUETYPE_FONT,size);
            prints.add(print);
            print=new Print(orderInfo.getFilmName(),x,y+11,Font.TRUETYPE_FONT,size);
            prints.add(print);
            print=new Print(orderInfo.getHallName(),x,y+22,Font.TRUETYPE_FONT,size);
            print.setType(1);
            prints.add(print);
            String seatRow=ticket.getSeatRow();
            String seatCol=ticket.getSeatCol();
            print=new Print(seatRow+"排"+seatCol+"号",x,y+33,Font.TRUETYPE_FONT,size);
            prints.add(print);
            print=new Print(TwoDimensionCodeUtil.qRCodeCommon(ticket.getTicketNo(),"7",9),x,y+40);
            prints.add(print);

                print=new Print(time,110,40,Font.TRUETYPE_FONT,size);
                prints.add(print);
                print=new Print(starDate,80,55,Font.TRUETYPE_FONT,size);
                prints.add(print);
            print=new Print("票价:"+ticket.getTicketPrice()+"元",x1,y1,Font.TRUETYPE_FONT,size1);
            prints.add(print);
            print=new Print("服务费:"+ticket.getServiceCharge()+"元",x1,y1+10,Font.TRUETYPE_FONT,size1);
            prints.add(print);
            print=new Print(ticket.getPrintTime()+"出票",x1,y1+20,Font.TRUETYPE_FONT,size1);
            prints.add(print);
            print=new Print(ticket.getCpnName(),x1,y1+30,Font.TRUETYPE_FONT,size1);
            prints.add(print);
            print=new Print(ticket.getTicketNo2(),x1,y1+40,Font.TRUETYPE_FONT,size1);
            prints.add(print);
            print=new Print(orderInfo.getHallName(),x2,y2,Font.TRUETYPE_FONT,size1);
            prints.add(print);
            print=new Print(seatRow+"排"+seatCol+"号",x2,y2+10,Font.TRUETYPE_FONT,size1);
            prints.add(print);

                print=new Print(time,x2,y2+20,Font.TRUETYPE_FONT,size1);
                prints.add(print);
                print=new Print(starDate,x2,y2+30,Font.TRUETYPE_FONT,size1);
                prints.add(print);
            print=new Print(orderInfo.getFilmName(),x2,y2+40,Font.TRUETYPE_FONT,size1);
            prints.add(print);
            print=new Print(ticket.getTicketPrice()+"元",x2,y2+75,Font.TRUETYPE_FONT,size1);
            prints.add(print);
            String ticketNo2=ticket.getTicketNo2();
            print=new Print(ticketNo2.substring(0,ticketNo2.length()/2),x2,y2+85,Font.TRUETYPE_FONT,size1);
            prints.add(print);
            print=new Print(ticketNo2.substring(ticketNo2.length()/2,ticketNo2.length()),x2,y2+95,Font.TRUETYPE_FONT,size1);
            prints.add(print);
            printService.print(prints,printDevice);
        }

    }

    @Override
    public void printMovieTicket2(OrderInfo orderInfo, PrintService printDevice) throws ParseException, PrintException {
        int[] x = {5, 79, 155};
        int[] y = {8, 105, 25};
        int[] sizes = {7, 10, 13};

        String[] startTimes = orderInfo.getStartTime().split(" ");
        String starDate = startTimes[0];
        String[] times = startTimes[1].split(":");
        String time = times[0] + ":" + times[1];

        List<MovieTicket> ticketList = orderInfo.getTicketList();
        for (MovieTicket ticket : ticketList) {
            List<Print> prints = new ArrayList<>();
            Print print = new Print(orderInfo.getCinemaName(), x[0], y[0], Font.TRUETYPE_FONT, sizes[1]);
            prints.add(print);
            print = new Print(orderInfo.getFilmName(), x[0], y[0] + 20, Font.TRUETYPE_FONT, sizes[2]);
            prints.add(print);
            print = new Print(orderInfo.getHallName(), x[0], y[0] + 40, Font.TRUETYPE_FONT, sizes[1]);
            prints.add(print);
            print = new Print(starDate, x[0], y[0] + 55, Font.TRUETYPE_FONT, sizes[1]);
            prints.add(print);
            print = new Print(time, x[0]+60, y[0] + 55, Font.TRUETYPE_FONT, sizes[1]);
            prints.add(print);
            String seatRow = ticket.getSeatRow();
            String seatCol = ticket.getSeatCol();
            print = new Print(seatRow + "排" + seatCol + "号", x[0], y[0] + 70, Font.TRUETYPE_FONT, sizes[1]);
            prints.add(print);
            print = new Print(TwoDimensionCodeUtil.qRCodeCommon(ticket.getTicketNo(), "7", 9), x[0], y[0] + 90);
            prints.add(print);

            prints.add(print);
            print = new Print("票价:" + ticket.getTicketPrice() + "元", x[1], y[1], Font.PLAIN, sizes[0]);
            prints.add(print);
            print = new Print("服务费:" + ticket.getServiceCharge() + "元", x[1], y[1] + 15, Font.PLAIN, sizes[0]);
            prints.add(print);
            print = new Print(ticket.getPrintTime() + "出票", x[1], y[1] + 30, Font.PLAIN, sizes[0]);
            prints.add(print);
            print = new Print(ticket.getCpnName(), x[1], y[1] + 45, Font.PLAIN, sizes[0]);
            prints.add(print);
            print = new Print(ticket.getTicketNo2(), x[1], y[1] + 60, Font.PLAIN, sizes[0]);
            prints.add(print);


            //副券
            String filmName = orderInfo.getFilmName();
            if (filmName.length() > 4) {
                String str1 = filmName.substring(0, 4);
                print = new Print(str1, x[2], y[2], Font.TRUETYPE_FONT, sizes[1]);
                prints.add(print);
                String str2 = filmName.substring(4, filmName.length());
                print = new Print(str2, x[2], y[2] + 10, Font.TRUETYPE_FONT, sizes[1]);
                prints.add(print);

            } else {
                print = new Print(orderInfo.getFilmName(), x[2], y[2], Font.TRUETYPE_FONT, sizes[1]);
                prints.add(print);
            }
            print = new Print(orderInfo.getHallName(), x[2], y[2] + 25, Font.TRUETYPE_FONT, sizes[0]);
            prints.add(print);
            print = new Print(starDate, x[2], y[2] + 50, Font.TRUETYPE_FONT, sizes[1]);
            prints.add(print);
            print = new Print(time, x[2], y[2] + 60, Font.TRUETYPE_FONT, sizes[1]);
            prints.add(print);
            print = new Print(seatRow + "排" + seatCol + "号", x[2], y[2] + 85, Font.TRUETYPE_FONT, sizes[1]);
            prints.add(print);
            String ticketNo2 = ticket.getTicketNo2();
            print = new Print(ticketNo2.substring(0, ticketNo2.length() / 2), x[2], y[2] + 105, Font.TRUETYPE_FONT, sizes[1]);
            prints.add(print);
            print = new Print(ticketNo2.substring(ticketNo2.length() / 2, ticketNo2.length()), x[2], y[2] + 115, Font.TRUETYPE_FONT, sizes[1]);
            prints.add(print);
            print = new Print(ticket.getTicketPrice() + "元", x[2], y[2] + 140, Font.TRUETYPE_FONT, sizes[1]);
            prints.add(print);
            printService.print(prints, printDevice);
        }

    }
}


