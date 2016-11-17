package com.zmaxfilm.util;


import com.sun.jna.ptr.IntByReference;
import org.apache.log4j.Logger;

public class Inspiry532Utils {

	private static Logger logger = Logger.getLogger(Inspiry532Utils.class);
	
	/**
	 * inspiry_532 设备初始化
	 * 
	 * @return 1.成功 2.失败
	 */
	public static int initInspiry532(){
		if(InspiryDeviceAPIFor532.INSTANCE.GetDevice() == 1){
			logger.debug("成功获取设备");
			int startDeviceState =  InspiryDeviceAPIFor532.INSTANCE.StartDevice();
			if(startDeviceState == 1){
				logger.debug("设备启动成功");
				InspiryDeviceAPIFor532.INSTANCE.SetLed(true);
				InspiryDeviceAPIFor532.INSTANCE.setQRable(true);
				InspiryDeviceAPIFor532.INSTANCE.setDMable(true);
				InspiryDeviceAPIFor532.INSTANCE.setBarcode(true);
				InspiryDeviceAPIFor532.INSTANCE.SetBeepTime(300);
				logger.debug("设备初始化完成");
				return 1;
			}
		}else {
			logger.debug("设备获取失败");
		}
		return 0;
	}

	/**
	 * 获取解码信息
	 *
	 * @return
	 */
	public static String getDecodeString(){
		byte Decodes[] = new byte[512];
		IntByReference lengthRe = new IntByReference();
		InspiryDeviceAPIFor532.INSTANCE.GetDecodeString(Decodes,lengthRe);
		logger.debug("二维码数据长度：" + lengthRe.getValue());
		String decodeString = new String(Decodes,0,lengthRe.getValue()) ;
		return decodeString;
	}

	/**
	 * 延时扫描
	 *
	 */
	public static void sleepNotifyEngine(){
		InspiryDeviceAPIFor532.INSTANCE.SetLed(false);
		InspiryDeviceAPIFor532.INSTANCE.setQRable(false);
		InspiryDeviceAPIFor532.INSTANCE.setDMable(false);
		try {
			Thread.sleep(3000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		InspiryDeviceAPIFor532.INSTANCE.SetLed(true);
		InspiryDeviceAPIFor532.INSTANCE.setQRable(true);
		InspiryDeviceAPIFor532.INSTANCE.setDMable(true);
	}


	public static void ReleaseDevice(){
		InspiryDeviceAPIFor532.INSTANCE.ReleaseDevice();
	}
}
