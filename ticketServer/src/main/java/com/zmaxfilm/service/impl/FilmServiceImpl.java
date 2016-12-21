package com.zmaxfilm.service.impl;

import com.zmaxfilm.model.Film;
import com.zmaxfilm.service.FilmService;
import com.zmaxfilm.util.EhcacheUtil;
import com.zmaxfilm.util.HttpUtil;

import java.util.List;

/**
 * Created by jimmy on 2016/11/28.
 */
public class FilmServiceImpl implements FilmService{

    private EhcacheUtil ehcacheUtil = EhcacheUtil.getInstance();

    // 电影列表
    @Override
    public List<Film> getFilmlist() {
        String url = "";
        HttpUtil.sendGet(url);
        return null;
    }

    //电影具体数据
    @Override
    public Film getFilmData(int id) {
        String url = "";
        Film film = (Film)ehcacheUtil.get(url);
        if(film != null){
            return film;
        } else{
            HttpUtil.sendGet(url);
            ehcacheUtil.put(url ,film,film.getTimeToLive());
           return null;
        }
    }

    //坐位图数据
    @Override
    public String seatData() {
        String url = "";
        return null;
    }
    //提交坐位图
    @Override
    public boolean sendSeatData() {
        return false;
    }
    //增加券包
    @Override
    public boolean addQuan() {
        return false;
    }
    //卖品列表
    @Override
    public String getGoods() {
        return null;
    }
    //请求打票
    @Override
    public String askPrintTicket() {
        return null;
    }
    //请求订单状态
    @Override
    public String askOrderStatus() {
        return null;
    }
}


