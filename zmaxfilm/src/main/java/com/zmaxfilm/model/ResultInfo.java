package com.zmaxfilm.model;

import lombok.Data;

import java.util.Map;

/**
 * Created by Faith on 2016/12/15.
 */
@Data
public class ResultInfo {
    /**执行结果 成功或者失败**/
    private boolean result;
    /**具体执行信息**/
    private String message;
    /**返回值**/
    private Map<String,Object> value;
}
