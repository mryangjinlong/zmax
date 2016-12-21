package com.zmaxfilm.model.socket;

/**
 * Created by jimmy on 2016/12/5.
 * 广告中的图片信息
 */
public class ImgData {
    private String title;   //标题
    private String url;     //下载url
    private String href;    //广告外链

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getHref() {
        return href;
    }

    public void setHref(String href) {
        this.href = href;
    }
}
