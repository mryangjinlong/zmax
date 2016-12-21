package com.zmaxfilm;

/**
 * Created by Administrator on 2016/11/12.
 * 常量类
 */
public class Constant {

    public static final String FRAME_XML_PATH = "frame/frame.fxml";

    //默认的接口实现类型
    public static final int DEFAULT_IMPL = -1;

    public static final String SOCKET_IP = "192.168.10.190";
    public static final int SOCKET_PORT = 9501;

    //文件根目录
    public static final String FILE_ROOT_PATH = "C:/Users/Public/zmaxFilm/";
    //DLL文件目录
    public static final String DLL_PATH = FILE_ROOT_PATH + "dll/";
    //WEB文件目录
    public static final String WEB_PATH = FILE_ROOT_PATH + "web/";
    //HTML文件目录
    public static final String HTML_PATH = WEB_PATH + "html/";
    //广告文件目录
    public static final String AD_PATH = WEB_PATH + "ad/";
    //日志文件目录
    public static final String LOG_PATH = FILE_ROOT_PATH + "log/";
    //首页url
    public static final String INDEX_URL = HTML_PATH + "index.html";

    public static final String FILE_HEAD = "file:///";


    public static final String APP_ACCOUNT = "selfService";                 //应用账号
    public static final String APP_PASSWORD = "selfService12131";          //应用密码



    public static final String HTTP_URL = "http://yun.zmaxfilm.net:8181/Service/";//http请求url

    //缓存的KEY值
    public static final String CACHE_KEY_PLAN = "plan" ;        //影院排期 此KEY未完整  完整KEY为   plan + 影院ID 如影院ID为12345  则KEY为  plan12345 对应值 List<FilmPlan4Http>
    public static final String CACHE_KEY_CINEMA = "cinemas";   //所有影院的信息  对应值是 ArrayList<Cinema> 类型
    public static final String CACHE_KEY_HALL_SITE = "hallSite";   //所有影院的信息  对应值是坐位图的json格式   完整KEY为 hallSite + cinemaNo + hallNo
    public static final String CACHE_KEY_USER = "user";             //用户信息


    //默认缓存时间
    public static final int CACHE_TIME_PLAN = 1000*60*10;       //影院排期
    public static final int CACHE_TIME_CINEMA= 1000*60*60*24;   //影院列表信息
    public static final int CACHE_TIME_HALL_SITE= 1000*60*60*24;   //坐位图信息

    //HTTP接口名称
    public static final String MOVIE_URL="ticketApi/";
    public static final String MEMBER_URL="memberApi/";    //会员接口

    public static final String FUNSTIONNAME_PLAN = MOVIE_URL+"getPlan";       //获取排期的接口
    public static final String FUNSTIONNAME_CINEMA = MOVIE_URL+"getCinema";   //获取影院列表的接口
    public static final String FUNSTIONNAME_HALL_SITE = MOVIE_URL+"getHallSite";   //获取影厅坐位图
    public static final String FUNSTIONNAME_PLAN_SEAT = MOVIE_URL+"getPlanSeat";   //获取排期的座位状态
    public static final String FUNSTIONNAME_LOGIN = MEMBER_URL+"memberLogin";        //登录
    public static final String FUNSTIONNAME_PRINTTICKET=MOVIE_URL+"printTicket";//打印影票接口

    public static final String GOODS_URL="saleApi/";
    public static final String FUNSTIONNAME_GOODS_LIST=GOODS_URL+"getCinemaGoodsList";
    public static final String FUNSTIONNAME_LOCKGOODS=GOODS_URL+"lockGoods";
    public static final String FUNSTIONNAME_PRINT_GOODS_TICKET=GOODS_URL+"printGoods";

}
