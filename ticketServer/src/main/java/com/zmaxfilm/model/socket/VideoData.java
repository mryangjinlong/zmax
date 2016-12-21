package com.zmaxfilm.model.socket;

/**
 * Created by jimmy on 2016/12/5.
 * 广告中的视频数据
 */
public class VideoData {
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
