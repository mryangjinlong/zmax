package com.zmaxfilm.model.http;

import java.util.Objects;

/**
 *排期页电影列表
 * Created by jimmy on 2016/12/13.
 */
public class FilmData {
    private String filmNo;
    private String filmName;

    public FilmData(String filmNo, String filmName) {
        this.filmNo = filmNo;
        this.filmName = filmName;
    }

    public String getFilmNo() {
        return filmNo;
    }

    public void setFilmNo(String filmNo) {
        this.filmNo = filmNo;
    }

    public String getFilmName() {
        return filmName;
    }

    public void setFilmName(String filmName) {
        this.filmName = filmName;
    }

    @Override
    public boolean equals(Object otherObject) {
        if(this == otherObject) return true;
        if(otherObject == null) return false;
        if(getClass() != otherObject.getClass()) return false;
        FilmData other = (FilmData)otherObject;
        return Objects.equals(filmNo, other.filmNo);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(filmNo);
    }
}

