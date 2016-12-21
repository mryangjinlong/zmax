package com.zmaxfilm.service;

import com.zmaxfilm.model.User;

/**用户服务接口
 * Created by jimmy on 2016/12/12.
 */
public interface UserService {
    String login(String cardCinemaNo , String userAccount , String userPassword);
    //扫码登录
    User scanCodeLogin();
    //短信验证码登录
    User SMSLogin(String phoneNum , String code);
    //从缓存中拿用户信息
    User getUser();
    //登出
    void loginOut();
}
