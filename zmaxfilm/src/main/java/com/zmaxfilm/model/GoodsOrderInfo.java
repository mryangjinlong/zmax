package com.zmaxfilm.model;

import lombok.Data;

import java.util.List;

/**
 * Created by Faith on 2016/12/19.
 */
@Data
public class GoodsOrderInfo {
    private String orderNo;
    private String orderStatus;
    private String validCode;
    private List<GoodsTicket> goodsList;
}
