package com.zmaxfilm.service;

import com.zmaxfilm.model.GoodsInfo;
import com.zmaxfilm.model.GoodsParam;
import com.zmaxfilm.model.ResultInfo;

import java.util.List;

/**
 * Created by Faith on 2016/12/17.
 */
public interface GoodsService {

    ResultInfo getGoodsList(String cinemaNo);

    ResultInfo lockGoods(String cinemaNo , List<GoodsParam> goodsList, String mobile);

    ResultInfo printTicket(String cinemaNo,String orderNo,String validCode,String requestType);

    ResultInfo testPrintTicket();

}
