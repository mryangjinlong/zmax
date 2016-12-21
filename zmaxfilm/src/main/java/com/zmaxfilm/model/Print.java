package com.zmaxfilm.model;

import lombok.Data;

import java.awt.image.BufferedImage;

/**
 * Created by drj on 2016/11/4.
 * 打印对象
 */
@Data
public class Print {
    /**打印内容**/
    private String content;
    /**打印圖片**/
    private BufferedImage image;
    /**打印類型 1：內容 2：圖片**/
    private int type;
    /**打印坐标x**/
    private int x;
    /**打印坐标Y**/
    private int y;
    /**字体**/
    private int font;
    /**字号**/
    private int size;
    public Print(String content,int x,int y,int font,int size){
        this.type=1;this.content=content;this.x=x;this.y=y;
        this.font=font;this.size=size;
    }
    public Print(BufferedImage image,int x,int y){
        this.type=2;this.image=image;this.x=x;this.y=y;
    }
}
