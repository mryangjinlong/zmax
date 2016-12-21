import com.zmaxfilm.service.MsgHanderService;
import com.zmaxfilm.service.impl.MsgHanderServiceImpl;
import org.junit.BeforeClass;

/**
 * Created by jimmy on 2016/12/9.
 */
public class MsgHanderServiceTest {
    private static MsgHanderService msgHanderService;
    @BeforeClass
    public static void init(){
        msgHanderService = new MsgHanderServiceImpl();
    }

    public void processAdvertisingPushTest(){
        String msg = "{\"resultCode\":\"200\",\"resultData\":[{\"id\":\"4\",\"titile\":\"\\u6d4b\\u8bd5\",\"effectTime\":\"1481731200\",\"expiryTime\":\"1481731200\",\"screenPosition\":\"1\",\"advertiseType\":\"0\",\"video\":null,\"imgesInfo\":[{\"url\":\"\\/Uploads\\/zmaxyun\\/advertisement\\/Cache\\/2016-12-08\\/58492e1dbe1dc.jpg\",\"imgOrder\":\"4\",\"imgTime\":\"5\",\"imgLinkType\":\"2\",\"href\":\"\"}]}]}";
        msgHanderService.processSocketMsg(msg);
    }

    public void processUpdateNotificationTest(){
        String msg = "{\"resultCode\":\"100\",\"resultData\":[{\"systemVersion\":\"v1.4\",\"systemVersionUrl\":\"Uploads\\/zmaxyun\\/systemversion\\/Cache\\/2016-12-03\\/58421e9ba737a.zip\"}]}";
        msgHanderService.processSocketMsg(msg);
    }
}
