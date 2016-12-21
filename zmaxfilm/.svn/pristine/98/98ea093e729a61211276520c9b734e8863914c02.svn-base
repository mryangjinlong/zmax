package com.zmaxfilm.service;

import com.zmaxfilm.model.OrderInfo;
import com.zmaxfilm.model.ResultInfo;
import com.zmaxfilm.model.http.*;

import javax.print.PrintException;
import java.text.ParseException;
import java.util.List;

/**
 * 电影相关服务
 * Created by jimmy on 2016/11/28.
 */
public interface FilmService {



    List<Cinema> getCinemas();  //获取电影院信息

    List<FilmPlan4Http> getPlans(String cinemaNo);    //获取影院所有排期

    List<HallSite> getHallSites(String cinemaNo , String hallNo);   //获取影厅对应的所有座位信息

    List<PlanSeat> getPlanSeats(String cinemaNo , String featureAppNo , String seatType);   //取排期的座位状态


    String getMovieTickets(String cinemaNo,String orderNumber,String validCode,String requestType);//去影票或卖品

    ResultInfo testPrintMovieTickets();

    void printMovieTicket(OrderInfo orderInfo, javax.print.PrintService printDevice) throws ParseException, PrintException;

    void printMovieTicket2(OrderInfo orderInfo, javax.print.PrintService printDevice) throws ParseException, PrintException;
}
