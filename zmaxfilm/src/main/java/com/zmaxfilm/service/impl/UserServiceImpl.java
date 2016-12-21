package com.zmaxfilm.service.impl;

import com.zmaxfilm.Constant;
import com.zmaxfilm.model.User;
import com.zmaxfilm.service.UserService;
import com.zmaxfilm.util.EhcacheUtil;
import com.zmaxfilm.util.HttpUtil;
import org.apache.log4j.Logger;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * 用户服务
 * Created by jimmy on 2016/12/12.
 */
public class UserServiceImpl implements UserService{

    private EhcacheUtil ehcacheUtil = EhcacheUtil.getInstance();
    private static Logger logger = Logger.getLogger(UserServiceImpl.class);

    public String login(String cardCinemaNo , String userAccount , String userPassword){
        LinkedHashMap<String,String> map = new LinkedHashMap<>();
        map.put("cardCinemaNo", cardCinemaNo);
        map.put("userAccount", userAccount);
        map.put("userPassword", userPassword);
        String msg;
        try {
            msg = HttpUtil.sendHttpPost(Constant.FUNSTIONNAME_LOGIN, map);
            System.out.println("userMsg :        " + msg);
        } catch (IOException e) {
            logger.debug(e.getMessage());
            return "";
        }
        return msg;
    }

    public static void main(String[] args) {
        new UserServiceImpl().login(""+35013801, 20311705+"" ,311705+"");
    }
    /**
     * 扫二维码登录
     * @return User
     */
    @Override
    public User scanCodeLogin() {
        return null;
    }

    /**
     * 短信验证登录
     * @param phoneNum  手机号
     * @param code       验证码
     * @return User
     */
    @Override
    public User SMSLogin(String phoneNum, String code) {
        return null;
    }

    @Override
    public User getUser() {
        return (User)ehcacheUtil.get(Constant.CACHE_KEY_USER);
    }

    @Override
    public void loginOut() {
        ehcacheUtil.remove(Constant.CACHE_KEY_USER);
    }
}
