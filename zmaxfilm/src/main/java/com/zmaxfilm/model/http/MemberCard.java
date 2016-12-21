package com.zmaxfilm.model.http;

import java.math.BigDecimal;

/**
 * 会员卡会员等级信息
 * Created by jimmy on 2016/12/17.
 */
public class MemberCard {
    private BigDecimal settlementPrice;  //结算价
    private BigDecimal ticketPrice;      //票价
    private int levelId;                //会员等级

    public BigDecimal getSettlementPrice() {
        return settlementPrice;
    }

    public void setSettlementPrice(BigDecimal settlementPrice) {
        this.settlementPrice = settlementPrice;
    }

    public BigDecimal getTicketPrice() {
        return ticketPrice;
    }

    public void setTicketPrice(BigDecimal ticketPrice) {
        this.ticketPrice = ticketPrice;
    }

    public int getLevelId() {
        return levelId;
    }

    public void setLevelId(int levelId) {
        this.levelId = levelId;
    }

}
