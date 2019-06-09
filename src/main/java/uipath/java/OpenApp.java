package uipath.java;

import java.io.IOException;

/**
 * @Description :
 * @Author : zhuoguangjing
 * @Date : 2019/6/5 11:40
 * @Version : 1.0
 */
public class OpenApp {
    public static void openApp(String path){
        Runtime runtime = Runtime.getRuntime();
        Process p = null;
        try {
            p = runtime.exec(path);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        openApp("");
    }
}
