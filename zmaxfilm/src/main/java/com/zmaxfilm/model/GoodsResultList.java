package com.zmaxfilm.model;

import lombok.Data;

import java.util.List;

/**
 * Created by Faith on 2016/12/17.
 */
@Data
public class GoodsResultList {

    private String resultCode;

    private List<GoodsInfo> resultData;

}
