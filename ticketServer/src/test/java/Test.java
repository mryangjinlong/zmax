import com.zmaxfilm.Constant;
import com.zmaxfilm.util.FileUtils;

/**
 * Created by jimmy on 2016/11/17.
 */
public class Test {
    public static void main(String[] args) {
        String filePath = Constant.WEB_PATH + "a.rar";
        FileUtils.unRarFile(filePath , Constant.WEB_PATH);
    }
}
