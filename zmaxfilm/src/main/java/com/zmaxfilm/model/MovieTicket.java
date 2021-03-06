package com.zmaxfilm.model;

import lombok.Data;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by Faith on 2016/12/15.
 */
@Data
public class MovieTicket {

    /**座位行**/
    private String seatRow;
    /**座位列**/
    private String seatCol;
    /**二维码票号**/
    private String ticketNo;
    /**票价**/
    private String ticketPrice;
    /**服务费**/
    private String serviceCharge;
    /**打印时间**/
    private String printTime;
    public String getPrintTime(){
        SimpleDateFormat sdf = new SimpleDateFormat("MM-dd hh:mm");
        return sdf.format(new Date());
    }
    /**合作券名称**/
    private String cpnName;
    /**票号**/
    private String ticketNo2;

}
