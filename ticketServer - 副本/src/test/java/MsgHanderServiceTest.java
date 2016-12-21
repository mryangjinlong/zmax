import com.alibaba.fastjson.JSON;
import com.zmaxfilm.service.MsgHanderService;
import com.zmaxfilm.service.impl.MsgHanderServiceImpl;
import com.zmaxfilm.util.EncryptUtil;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by jimmy on 2016/12/2.
 */
public class MsgHanderServiceTest {
    private static MsgHanderService msgHanderService;

    @BeforeClass
    public static void beforeClass(){
        msgHanderService = new MsgHanderServiceImpl();
    }



}
