package com.zmaxfilm.service.impl;


import com.zmaxfilm.model.Print;
import com.zmaxfilm.util.HttpUtil;
import org.apache.log4j.Logger;

import javax.print.*;
import javax.print.attribute.DocAttributeSet;
import javax.print.attribute.HashDocAttributeSet;
import javax.print.attribute.HashPrintRequestAttributeSet;
import javax.print.attribute.PrintRequestAttributeSet;
import javax.print.attribute.standard.MediaSizeName;
import java.awt.*;
import java.awt.print.PageFormat;
import java.awt.print.Printable;
import java.awt.print.PrinterException;

/**
 * Created by drj on 2016/11/14.
 */
public class PrintServiceImpl implements com.zmaxfilm.service.PrintService,Printable {
    private static Logger logger = Logger.getLogger(PrintServiceImpl.class);

    private java.util.List<Print> prints ;

    public void print( java.util.List<Print> prints, javax.print.PrintService printDevice) {


        //构建打印请求属性集
        this.prints=prints;

        HashPrintRequestAttributeSet pras = new HashPrintRequestAttributeSet();
        pras.add(MediaSizeName.ISO_A4);

        DocFlavor flavor = DocFlavor.SERVICE_FORMATTED.PRINTABLE;
        DocAttributeSet das = new HashDocAttributeSet();
        Doc doc = new SimpleDoc(this, flavor, das);
        DocPrintJob job = printDevice.createPrintJob();
        try {
            job.print(doc, pras);
        } catch (PrintException e) {
            e.printStackTrace();
        }

    }

    public javax.print.PrintService getPrintDeviceList(String deviceName) {
        PrintRequestAttributeSet pras = new HashPrintRequestAttributeSet();
        DocFlavor flavor = DocFlavor.BYTE_ARRAY.PNG;
        javax.print.PrintService printDevices[] = PrintServiceLookup.lookupPrintServices(flavor, pras);
        for (javax.print.PrintService printDevice : printDevices) {
            if (deviceName.equals(printDevice.getName())) {
                return printDevice;
            }
        }
        return null;
    }

    public int print(Graphics graphics, PageFormat pageFormat, int pageIndex) throws PrinterException {


        if (pageIndex > 0) {
            return NO_SUCH_PAGE;
        }
        Graphics2D g2d = (Graphics2D) graphics;
        for (Print print : prints) {
            g2d.setFont(new Font("Default", print.getFont(), print.getSize()));
            g2d.drawString(print.getContent(), print.getX(), print.getY());
        }
        return PAGE_EXISTS;
    }
}
