package com.zmaxfilm.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.zmaxfilm.Constant;
import com.zmaxfilm.Factory;
import com.zmaxfilm.model.*;
import com.zmaxfilm.service.GoodsService;
import com.zmaxfilm.util.DateUtils;
import com.zmaxfilm.util.HttpUtil;

import javax.print.PrintException;
import javax.print.PrintService;
import java.awt.*;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.List;

/**
 * Created by Faith on 2016/12/17.
 */
public class GoodsServiceImpl implements GoodsService{

    private com.zmaxfilm.service.PrintService printService= Factory.getPrintService(Constant.DEFAULT_IMPL);
    @Override
    public ResultInfo getGoodsList(String cinemaNo) {
        LinkedHashMap<String,String> map=new LinkedHashMap<>();
        map.put("cinemaNo",cinemaNo);
        map.put("coverImageType","4");
        ResultInfo resultInfo=new ResultInfo();
        try {
            String str = HttpUtil.sendHttpPost(Constant.FUNSTIONNAME_GOODS_LIST,map);
            GoodsResultList resultList=JSONObject.parseObject(str, GoodsResultList.class);
            if(resultList.getResultCode().equals("0")){
                resultInfo.setResult(true);
                Map<String,Object> value=new HashMap<>();
                value.put("data",resultList.getResultData());
                resultInfo.setValue(value);
            }else{
                resultInfo.setResult(false);
                resultInfo.setMessage("系统故障，联系管理员");
            }
        } catch (IOException e) {
            resultInfo.setResult(false);
            resultInfo.setMessage("请求失败");
        }
        return resultInfo;
    }

    @Override
    public ResultInfo lockGoods(String cinemaNo, List<GoodsParam> goodsList, String mobile) {
        LinkedHashMap<String,String> map=new LinkedHashMap<>();
        ResultInfo resultInfo=new ResultInfo();
        map.put("cinemaNo",cinemaNo);
        String str=UUID.randomUUID().toString();
        String serialNum=str.replace("-","");
        map.put("serialNum",serialNum);
        map.put("goodsList", JSONObject.toJSONString(goodsList));
        map.put("mobile",mobile);
        try {
            String reuslt=HttpUtil.sendHttpPost(Constant.FUNSTIONNAME_LOCKGOODS,map);
            JSONObject jsonObject=JSONObject.parseObject(reuslt);
            String resultCode= (String) jsonObject.get("resultCode");
            if(!resultCode.equals("0")){
                resultInfo.setResult(false);
                resultInfo.setMessage("下订单失败");
            }else{
                resultInfo.setResult(true);
            }
        } catch (IOException e) {
            resultInfo.setResult(false);
            resultInfo.setMessage("请求失败");
            e.printStackTrace();
        }
        return resultInfo;
    }

    @Override
    public ResultInfo printTicket(String cinemaNo, String orderNo, String validCode, String requestType) {
        LinkedHashMap<String,String> map=new LinkedHashMap<>();
        ResultInfo resultInfo=new ResultInfo();
        map.put("cinemaNo",cinemaNo);
        map.put("orderNo",orderNo);
        map.put("validCode",validCode);
        map.put("requestType",requestType);
        try {
            String str=HttpUtil.sendHttpPost(Constant.FUNSTIONNAME_PRINT_GOODS_TICKET,map);
            GoodsTicketResultInfo goodsTicketResultInfo=JSONObject.parseObject(str,GoodsTicketResultInfo.class);
            if(goodsTicketResultInfo.getResultCode().equals("100605")){
                resultInfo.setResult(false);
                resultInfo.setMessage("订单号错误！");
            }else if(!goodsTicketResultInfo.getResultCode().equals("0")) {
                resultInfo.setResult(false);
                resultInfo.setMessage("取票失败！");
            }else{
                try{
                    List<PrintService> printServices=printService.getAvailableDevicelist();
                    if(printServices.size()==0){
                        resultInfo.setResult(false);
                        resultInfo.setMessage("没有可用的打印机");
                    }else{
                        PrintService printDevice=printServices.get(0);
                        this.print(goodsTicketResultInfo.getResultData(),printDevice);
                        resultInfo.setResult(true);
                        Map<String,Object> value=new HashMap<>();
                        value.put("queueCount",printService.getPrintDeviceQueueCount(printDevice));
                        value.put("count",goodsTicketResultInfo.getResultData().getGoodsList().size());
                        value.put("deviceName",printDevice.getName());
                        resultInfo.setValue(value);
                    }
                }catch (PrintException e){
                    resultInfo.setMessage("打印出错");
                    resultInfo.setResult(false);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
            resultInfo.setMessage("打印出错");
            resultInfo.setResult(false);
        }

        return resultInfo;
    }

    @Override
    public ResultInfo testPrintTicket() {
        ResultInfo resultInfo=new ResultInfo();
        String str="打印测试";
        GoodsOrderInfo orderInfo=new GoodsOrderInfo();
        orderInfo.setOrderNo("000000000");
        orderInfo.setValidCode("000000000");
        List<GoodsTicket> goodsTickets=new ArrayList<>();
        GoodsTicket ticket=new GoodsTicket();
        ticket.setChannelName(str+"渠道");
        ticket.setCinemaName(str+"影院");
        ticket.setGoodsDescribe(str+"套餐内容");
        ticket.setGoodsName(str+"商品名");
        ticket.setGoodsNum("1");
        ticket.setSaleFee("1");
        ticket.setValidity(DateUtils.formatCurrentDate());
        goodsTickets.add(ticket);
        orderInfo.setGoodsList(goodsTickets);
        List<PrintService> printServices=printService.getAvailableDevicelist();
        if(printServices.size()==0){
            resultInfo.setResult(false);
            resultInfo.setMessage("没有可用的打印机");
        }else{
            PrintService printDevice=printServices.get(0);
            try {
                this.print(orderInfo,printDevice);
                resultInfo.setResult(true);
            }  catch (PrintException e) {
                resultInfo.setMessage("打印出错");
                resultInfo.setResult(false);
                e.printStackTrace();
            }

        }
        return resultInfo;
    }

    public void print(GoodsOrderInfo orderInfo, PrintService printDevice) throws PrintException {
        int x=5;
        int y=8;

        int x1=160;
        int y1=25;

        int[]sizes={7,10,13};

        List<GoodsTicket> goodsList=orderInfo.getGoodsList();

        for(GoodsTicket ticket:goodsList){
            List<Print> prints=new ArrayList<>();
            Print print=new Print(ticket.getCinemaName(),x,y, Font.TRUETYPE_FONT,sizes[1]);
            prints.add(print);
            print=new Print(ticket.getGoodsName(),x,y+20, Font.TRUETYPE_FONT,sizes[2]);
            prints.add(print);
            print=new Print(ticket.getGoodsDescribe(),x,y+35, Font.TRUETYPE_FONT,sizes[1]);
            prints.add(print);
            print=new Print(ticket.getGoodsNum()+"份",x,y+50, Font.TRUETYPE_FONT,sizes[1]);
            prints.add(print);
            print=new Print(ticket.getSaleFee()+"元",x+20,y+50, Font.TRUETYPE_FONT,sizes[1]);
            prints.add(print);
            print=new Print("订单号："+orderInfo.getOrderNo(),x,y+65, Font.TRUETYPE_FONT,sizes[1]);
            prints.add(print);
            print=new Print("取货码："+orderInfo.getValidCode(),x,y+80, Font.TRUETYPE_FONT,sizes[1]);
            prints.add(print);
            print=new Print("有效期："+ticket.getValidity(),x,y+95, Font.TRUETYPE_FONT,sizes[1]);
            prints.add(print);
            print=new Print("购买渠道："+ticket.getChannelName(),x,y+110, Font.TRUETYPE_FONT,sizes[1]);
            prints.add(print);
            print=new Print("使用说明：",x,y+125, Font.TRUETYPE_FONT,sizes[0]);
            prints.add(print);
            print=new Print("1.凭订单号及取货码至卖品部领取，无需验证;",x,y+135, Font.TRUETYPE_FONT,sizes[0]);
            prints.add(print);
            print=new Print("2.本券为兑换唯一凭证，请妥善保管;",x,y+145, Font.TRUETYPE_FONT,sizes[0]);
            prints.add(print);
            print=new Print("3.请务必在有效期内兑换，逾期自动作废;",x,y+155, Font.TRUETYPE_FONT,sizes[0]);
            prints.add(print);

            //副卷
            String goodsName=ticket.getGoodsName();
            if(goodsName.length()>4){
                String str1=goodsName.substring(0,4);
                print=new Print(str1,x1,y1, Font.TRUETYPE_FONT,sizes[1]);
                prints.add(print);
                String str2=goodsName.substring(4,goodsName.length());
                print=new Print(str2,x1,y1+10, Font.TRUETYPE_FONT,sizes[1]);
                prints.add(print);

            }else{
                print=new Print(ticket.getGoodsName(),x1,y1, Font.TRUETYPE_FONT,sizes[1]);
                prints.add(print);
            }
            print=new Print(ticket.getGoodsNum()+"份",x1,y1+20, Font.TRUETYPE_FONT,sizes[0]);
            prints.add(print);
            print=new Print(ticket.getSaleFee()+"元",x1+15,y1+20, Font.TRUETYPE_FONT,sizes[0]);
            prints.add(print);
            print=new Print("订单号:",x1,y1+45, Font.TRUETYPE_FONT,sizes[0]);
            prints.add(print);
            print=new Print(orderInfo.getOrderNo(),x1,y1+55, Font.TRUETYPE_FONT,sizes[0]);
            prints.add(print);
            print=new Print("取货码:",x1,y1+70, Font.TRUETYPE_FONT,sizes[0]);
            prints.add(print);
            print=new Print(orderInfo.getValidCode(),x1,y1+80, Font.TRUETYPE_FONT,sizes[0]);
            prints.add(print);
            print=new Print("有效期至:",x1,y1+95, Font.TRUETYPE_FONT,sizes[0]);
            prints.add(print);
            String validity=ticket.getValidity();
            String[] strs=validity.split(" ");
            print=new Print(strs[0],x1,y1+103, Font.TRUETYPE_FONT,sizes[0]);
            prints.add(print);
            print=new Print(strs[1],x1,y1+110, Font.TRUETYPE_FONT,sizes[0]);
            prints.add(print);
            print=new Print("购买渠道:",x1,y1+125, Font.TRUETYPE_FONT,sizes[0]);
            prints.add(print);
            print=new Print(ticket.getChannelName(),x1,y1+135, Font.TRUETYPE_FONT,sizes[0]);
            prints.add(print);
            printService.print(prints,printDevice);
        }

    }
}
