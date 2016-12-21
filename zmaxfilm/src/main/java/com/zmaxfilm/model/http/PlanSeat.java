package com.zmaxfilm.model.http;

/**
 * Created by jimmy on 2016/12/15.
 */
public class PlanSeat {
        private String seatNo;		//座位编号
        private String seatState;		//状态	(-1不可售  0-可售)
        private String seatPieceNo ;	//座区编号
        private String seatRow;		//行
        private String seatCol;		//列
        private String  graphRow;		//屏幕列
        private String graphCol;		//屏幕行
        private String seatPieceName;		//座区名称

        public String getSeatNo() {
            return seatNo;
        }

        public void setSeatNo(String seatNo) {
            this.seatNo = seatNo;
        }

        public String getSeatState() {
            return seatState;
        }

        public void setSeatState(String seatState) {
            this.seatState = seatState;
        }

        public String getSeatPieceNo() {
            return seatPieceNo;
        }

        public void setSeatPieceNo(String seatPieceNo) {
            this.seatPieceNo = seatPieceNo;
        }

        public String getSeatRow() {
            return seatRow;
        }

        public void setSeatRow(String seatRow) {
            this.seatRow = seatRow;
        }

        public String getSeatCol() {
            return seatCol;
        }

        public void setSeatCol(String seatCol) {
            this.seatCol = seatCol;
        }

        public String getGraphRow() {
            return graphRow;
        }

        public void setGraphRow(String graphRow) {
            this.graphRow = graphRow;
        }

        public String getGraphCol() {
            return graphCol;
        }

        public void setGraphCol(String graphCol) {
            this.graphCol = graphCol;
        }

        public String getSeatPieceName() {
            return seatPieceName;
        }

        public void setSeatPieceName(String seatPieceName) {
            this.seatPieceName = seatPieceName;
        }
}
