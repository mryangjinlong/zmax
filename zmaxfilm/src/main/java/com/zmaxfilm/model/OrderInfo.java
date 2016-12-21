package com.zmaxfilm.model;

import lombok.Data;

import java.util.List;

/**
 * Created by Faith on 2016/12/15.
 */
@Data
public class OrderInfo {

    /**影院名称**/
    private String cinemaName;
    /**电影名称**/
    private String filmName;
    /**影厅名**/
    private String hallName;
    /**排期时间**/
    private String startTime;

    /**具体票**/
    private List<MovieTicket> ticketList;
}
