(function ($) {

    //全局信息
    var SelfServiceData = {

        //会员类型
        UserType: {
            memberCard: 1, //会员卡会员
            memberRegister: 2 //注册会员
        }
    };

    //方法扩展
    $.zxfun = {};
    //适配
    var adapt = function () {
        var w = $('body').width();
        var fontSize = w / 1080 * 100;
        $('html').css('font-size', fontSize + 'px');
    };
    adapt();
    //当窗口大小变化的时候调用函数
    $(window).resize(function () {
        adapt();
    });

    //初始化banner
    $.zxfun.swiperBanner = new Swiper('#header', {
        autoplay: 1000,
        loop: true
    });
    $.zxfun.swiperBanner.startAutoplay();
    //获取url参数值
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    $.zxfun.get_unix_time = function (dateStr) {
            var newstr = dateStr.replace(/-/g, '/');
            var date = new Date(newstr);
            var time_str = date.getTime().toString();
            return time_str.substr(0, 10);
        }
        //时间如果为单位数补0
    function fixZero(num, length) {
        var str = "" + num;
        var len = str.length;
        var s = "";
        for (var i = length; i-- > len;) {
            s += "0";
        }
        return s + str;
    }

    //时间转换  now时间截格式
    function formatDate(now, tyle) {
        var now = new Date(now);
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        var week = now.getDay();

        var currentDate = new Date();
        var currentWeek = currentDate.getDay();
        if (tyle == 1) {
            return year + "-" + fixZero(month, 2) + "-" + fixZero(date, 2) + "    " +
                "" + fixZero(hour, 2) + ":" + fixZero(minute, 2);
        } else if (tyle == 2) {
            return '剩余' + fixZero(minute, 2) + '分' + fixZero(second, 2) + '秒';
        } else if (tyle == 3) {
            return fixZero(month, 2) + '月' + fixZero(date, 2) + '日';
        } else if (tyle == 4) {
            return year + "-" + fixZero(month, 2) + "-" + fixZero(date, 2);
        } else if (tyle == 5) {
            if (week == currentWeek) return "今天";
            if (week == 1) {
                return "周一";
            } else if (week == 2) {
                return "周二";
            } else if (week == 3) {
                return "周三";
            } else if (week == 4) {
                return "周四";
            } else if (week == 5) {
                return "周五";
            } else if (week == 6) {
                return "周六";
            } else if (week == 0) {
                return "周日";
            }

        } else if (tyle == 6) {
            return fixZero(month, 2) + "-" + fixZero(date, 2) + "    " +
                "" + fixZero(hour, 2) + ":" + fixZero(minute, 2);
        } else if (tyle == 7) {
            return fixZero(hour, 2) + ":" + fixZero(minute, 2);
        } else if (tyle == 8) {
            return fixZero(month, 2) + '-' + fixZero(date, 2);
        }

    }
    //获取get值
    $.zxfun.urlGet = function (key) {
            var aQuery = window.location.href.split("?"); //取得Get参数
            var aGET = new Array();
            if (aQuery.length > 1) {
                var aBuf = aQuery[1].split("&");
                for (var i = 0, iLoop = aBuf.length; i < iLoop; i++) {
                    var aTmp = aBuf[i].split("="); //分离key与Value
                    aGET[aTmp[0]] = aTmp[1];
                }
            }
            if (typeof (key) == "undefined") {
                return aGET;
            }
            return aGET[key];
        }
        //数字键盘调用 只针对页面两个输入框
    $.zxfun.numberKeyBoard = function (conf) {
        var confExtend = ({
            pageId: conf.pageId,
            inpuIdOne: conf.inpuIdOne
        }, conf);
        //如果第二个框存在的话
        if (conf.inpuIdTwo) {
            confExtend.inpuIdTwo = conf.inpuIdTwo;
        }
        var CaretPos = 0;
        var _inputTab = true;
        $('' + confExtend.inpuIdOne + '').focus(function () {
            _inputTab = true;
        });
        if (conf.inpuIdTwo) {
            $('' + confExtend.inpuIdTwo + '').focus(function () {
                _inputTab = false;
            });
        }

        $('' + confExtend.pageId + ' .numKeyBoard li').on('click', function () {
            var _this = $(this);
            $(this).addClass('check');
            setTimeout(function () {
                    $('' + confExtend.pageId + ' .numKeyBoard li').removeClass('check');
                }, 100)
                //判断开关，如果是true输入在第一个框 否则输入在第二个
                //模拟键盘 未封装
            if (_inputTab) {

                if (_this.is('.reinput')) {
                    $('' + confExtend.inpuIdOne + '').val('');
                } else if (_this.is('.deleteBack')) {
                    var _oldVal = $('' + confExtend.inpuIdOne + '').val();
                    if (CaretPos >= 1) {
                        var _arr = _oldVal.split('');
                        _arr.splice(CaretPos - 1, 1);
                        $('' + confExtend.inpuIdOne + '').val(_arr.join(''));
                        CaretPos--;
                    }
                } else {
                    //如果有限制数量
                    if (conf.maxNUmber) {
                        var _maxnumber = parseInt(conf.maxNUmber);
                        var _nowLength = $('' + confExtend.inpuIdOne + '').val().length;
                        if (_maxnumber <= _nowLength) {
                            return false;
                        }
                    }
                    var _oldVal = $('' + confExtend.inpuIdOne + '').val();
                    var _newVal = $(this).html();
                    var arrEntities = {
                        'lt': '<',
                        'gt': '>',
                        'nbsp': ' ',
                        'amp': '&',
                        'quot': '"'
                    };
                    _newVal = _newVal.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
                        return arrEntities[t];
                    });
                    if (CaretPos >= 0) {
                        var _arr = _oldVal.split('');
                        _arr.splice(CaretPos, 0, _newVal);
                        $('' + confExtend.inpuIdOne + '').val(_arr.join(''));
                        CaretPos++;
                    }
                }
                $('' + confExtend.inpuIdOne + '').get(0).setSelectionRange(CaretPos, CaretPos)
                $('' + confExtend.inpuIdOne + '').get(0).focus()
            } else {

                if (_this.is('.reinput')) {
                    $('' + confExtend.inpuIdTwo + '').val('');
                } else if (_this.is('.deleteBack')) {
                    var _oldVal = $('' + confExtend.inpuIdTwo + '').val();
                    if (CaretPos >= 1) {
                        var _arr = _oldVal.split('');
                        _arr.splice(CaretPos - 1, 1);
                        $('' + confExtend.inpuIdTwo + '').val(_arr.join(''));
                        CaretPos--;
                    }
                } else {
                    //限制数量
                    if (conf.maxNUmber2) {
                        var _maxnumber = parseInt(conf.maxNUmber2);
                        var _nowLength = $('' + confExtend.inpuIdTwo + '').val().length;
                        if (_maxnumber <= _nowLength) {
                            return false;
                        }
                    }
                    var _oldVal = $('' + confExtend.inpuIdTwo + '').val();
                    var _newVal = $(this).html();
                    var arrEntities = {
                        'lt': '<',
                        'gt': '>',
                        'nbsp': ' ',
                        'amp': '&',
                        'quot': '"'
                    };
                    _newVal = _newVal.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
                        return arrEntities[t];
                    });
                    if (CaretPos >= 0) {
                        var _arr = _oldVal.split('');
                        _arr.splice(CaretPos, 0, _newVal);
                        $('' + confExtend.inpuIdTwo + '').val(_arr.join(''));
                        CaretPos++;
                    }
                }
                $('' + confExtend.inpuIdTwo + '').get(0).setSelectionRange(CaretPos, CaretPos)
                $('' + confExtend.inpuIdTwo + '').get(0).focus()
            }
            if (conf.inpuIdTwo) {
                var _inputOne = $('' + confExtend.inpuIdOne + '').val();
                var _inputTwo = $('' + confExtend.inpuIdTwo + '').val();
                if (_inputOne.length >= 1 && _inputTwo.length >= 1) {
                    $('' + conf.getBtn + '').addClass('active');
                } else {
                    $('' + conf.getBtn + '').removeClass('active');
                }
            }


        })
        $('' + confExtend.inpuIdOne + '').blur(function () {
            var _this = $(this).get(0);
            getCursortPosition(_this);
        });
        if (conf.inpuIdTwo) {
            $('' + confExtend.inpuIdTwo + '').blur(function () {
                var _this = $(this).get(0);
                getCursortPosition(_this);
            });
        }

        function getCursortPosition(ctrl) {
            if (document.selection) {
                ctrl.focus();
                var Sel = document.selection.createRange();
                Sel.moveStart('character', -ctrl.value.length);
                CaretPos = Sel.text.length;
            }
            // Firefox support
            else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
                CaretPos = ctrl.selectionStart;
            }
            //return (CaretPos);
        }
    }

    // 全键盘调用 使用方法：传入pageId 目标输入框  如果只有一个如果框就一个 两个就传两个（inpuIdOne跟inpuIdTwo）
    $.zxfun.keyBod = function (conf) {
        var confExtend = ({
            pageId: conf.pageId,
            inpuIdOne: conf.inpuIdOne
        }, conf);
        //如果第二个框存在的话
        if (conf.inpuIdTwo) {
            confExtend.inpuIdTwo = conf.inpuIdTwo;
        }
        var CaretPos = 0;
        var _inputTab = true;
        $('' + confExtend.inpuIdOne + '').focus(function () {
            _inputTab = true;
        });
        //如果第二个框存在的话
        if (confExtend.inpuIdTwo) {
            $('' + confExtend.inpuIdTwo + '').focus(function () {
                _inputTab = false;
            });
        }
        //分大小写

        var _keBoxObj = confExtend.pageId + ' #keyBoxAllSmall .key,' + confExtend.pageId + ' #keyBoxAllBig .key';
        if (conf.isFh == '使用符号') {
            _keBoxObj += ',' + confExtend.pageId + ' #keyBoxAllFH .key'
        }


        $(document).off('click').on('click', '' + _keBoxObj + '', function () {
            var _this = $(this);
            $(this).addClass('check');
            setTimeout(function () {
                    $('' + _keBoxObj + '').removeClass('check');
                }, 100)
                //判断开关，如果是true输入在第一个框 否则输入在第二个
                //模拟键盘 未封装
            if (_inputTab) {
                if (_this.is('.deleteBack')) {
                    var _oldVal = $('' + confExtend.inpuIdOne + '').val();
                    if (CaretPos >= 1) {
                        var _arr = _oldVal.split('');
                        _arr.splice(CaretPos - 1, 1);
                        $('' + confExtend.inpuIdOne + '').val(_arr.join(''));
                        CaretPos--;
                    }
                } else {
                    var _oldVal = $('' + confExtend.inpuIdOne + '').val();
                    var _newVal = $(this).html();
                    var arrEntities = {
                        'lt': '<',
                        'gt': '>',
                        'nbsp': ' ',
                        'amp': '&',
                        'quot': '"'
                    };
                    _newVal = _newVal.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
                        return arrEntities[t];
                    });
                    if (CaretPos >= 0) {
                        var _arr = _oldVal.split('');
                        _arr.splice(CaretPos, 0, _newVal);
                        $('' + confExtend.inpuIdOne + '').val(_arr.join(''));
                        CaretPos++;
                    }
                }
                $('' + confExtend.inpuIdOne + '').get(0).setSelectionRange(CaretPos, CaretPos)
                $('' + confExtend.inpuIdOne + '').get(0).focus()
            } else {
                if (_this.is('.deleteBack')) {
                    var _oldVal = $('' + confExtend.inpuIdTwo + '').val();
                    if (CaretPos >= 1) {
                        var _arr = _oldVal.split('');
                        _arr.splice(CaretPos - 1, 1);
                        $('' + confExtend.inpuIdTwo + '').val(_arr.join(''));
                        CaretPos--;
                    }
                } else {
                    var _oldVal = $('' + confExtend.inpuIdTwo + '').val();
                    var _newVal = $(this).html();
                    var arrEntities = {
                        'lt': '<',
                        'gt': '>',
                        'nbsp': ' ',
                        'amp': '&',
                        'quot': '"'
                    };
                    _newVal = _newVal.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
                        return arrEntities[t];
                    });
                    if (CaretPos >= 0) {
                        var _arr = _oldVal.split('');
                        _arr.splice(CaretPos, 0, _newVal);
                        $('' + confExtend.inpuIdTwo + '').val(_arr.join(''));
                        CaretPos++;
                    }
                }
                $('' + confExtend.inpuIdTwo + '').get(0).setSelectionRange(CaretPos, CaretPos)
                $('' + confExtend.inpuIdTwo + '').get(0).focus()
            }
        })
        $('' + confExtend.inpuIdOne + '').blur(function () {
            var _this = $(this).get(0);
            getCursortPosition(_this);
        });

        //如果第二个框存在的话
        if (confExtend.inpuIdTwo) {
            $('' + confExtend.inpuIdTwo + '').blur(function () {
                var _this = $(this).get(0);
                getCursortPosition(_this);
            });
        }

        function getCursortPosition(ctrl) {
            if (document.selection) {
                ctrl.focus();
                var Sel = document.selection.createRange();
                Sel.moveStart('character', -ctrl.value.length);
                CaretPos = Sel.text.length;
            }
            // Firefox support
            else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
                CaretPos = ctrl.selectionStart;
            }
            //return (CaretPos);
        }
    }

    //通用弹窗
    $.zxfun.Toast = function (str, conf) {
        var content = $.extend({
                adminit: false,
                timeout: 3000
            },
            conf
        );
        var _html = "";
        _html += '<div id="ToastAlert">';
        _html += '<div id="pageZzbg"></div>';
        if (content.adminit) {
            _html += '<div id="pageAlert"><span class="bgImg"></span>' + str + '</div>';
        } else {
            _html += '<div id="pageAlert">' + str + '</div>';
        }
        _html += '</div>';
        $('.wrap').append(_html);
        setTimeout(function () {
            $('#ToastAlert').remove();
            if (conf.fn) {
                conf.fn();
            }
        }, content.timeout);
    }



    //首页面初始化
    $(document).on("pageInit", "#page-index", function () {
        touch.on("#footer", "swipe", function () {
            $.zxfun.Toast('正在进入工作台', {
                adminit: true,
                tomeout: 2000,
                fn: function () {
                    location.href = 'filmSystem.html'
                }
            })
        });
        //                   window.app.loginOut();
    });
    //排期页初始化
    $(document).on("pageInit", "#page-plan", function () {

        var TimeSwiper = new Swiper('.planTime', {
            slidesPerView: 5,
            paginationClickable: true,
            spaceBetween: 0,
            freeMode: true
        });



        //        滚动条
        //        $('.planBt').jScrollPane();


        //选择影院
        $(document).off('click', '.downIcon').on('click', '.downIcon', function () {
            $('#cityChose').show();
            $('#cinemaChose').hide();
            $('.choseCinema').slideToggle();
            $('.cinemaTop img').remove();
        });
        $(document).off('click', '.cinemaTop a').on('click', '.cinemaTop a', function () {
            $('.choseCinema').slideUp();
        });
        $(document).off('click', '.cinemaTop img').on('click', '.cinemaTop img', function () {
            $('#cityChose').fadeToggle();
            $('#cinemaChose').fadeToggle();
            $('.cinemaTop img').remove();
        });

        //***********************************************************************************************************************************************************************************
        //=======================================================================排期具体业务开始=============================================================================================
        //***********************************************************************************************************************************************************************************
        function FilmData(filmNo, filmName, copyType, imgUrl, score, plan) {
            this.filmNo = filmNo;
            this.filmName = filmName;
            this.copyType = copyType;
            //后面三个还没有完成
            this.imgUrl = imgUrl;
            this.score = score;
            this.plan = plan;

        }
        //代表整个排期页面
        var planPage = {
            planTop: $(".planTop"),
            planBody: $(".planBody"),
            planTime: $(".planTime"),
            planBt: $(".planBt"),
            cityChose: $("#cityChose"),
            cinemaChose: $("#cinemaChose"),
            defaultFilmNo: "",
            defaultStartTime: "",
            //影院状态  1正常 2关闭
            Cinema_Status: {
                NORMAL: 1,
                CLOSE: 2
            },
            //排期状态   1 正常 2 关闭
            Plan_Status: {
                NORMAL: 1,
                CLOSE: 2
            },
            //销售状态  1正常 2关闭
            Sale_Status: {
                NORMAL: 1,
                CLOSE: 2
            },
            CopyType: {

            },
            //初始化
            init: function () {
                try {
                    this.initData();
                } catch (e) {
                    //TODO 提示数据加载失败
                    window.app.console("数据加载失败");
                    return;
                }

                this.initPage();
                this.addEvent();

            },
            //初始化所有数据
            initData: function () {

                this.userType = getQueryString("userType"); //会员类型
                if (!(this.cinemas)) {
                    this.cinemas = JSON.parse(window.app.getCinemas()); //所有影院信息
                }
                if (!(this.cinema)) {
                    //测试语句
                    for (var i = 0; i < this.cinemas.length; i++) {
                        var cinema = this.cinemas[i];
                        if (cinema.cinemaNo == "35012401") {
                            this.cinema = cinema;
                            break;
                        }
                    }
                    // this.cinema = this.cinemas[0]; //当前影院信息  默认所有影院中的第一个
                }

                this.plan = JSON.parse(window.app.getPlans(this.cinema.cinemaNo)); //所有排期信息
                if (this.plan.length > 0) {
                    this.defaultFilmNo = this.plan[0].filmNo; //默认filmNo  默认为所有排期的第一部影片
                    this.defaultStartTime = this.plan[0].startTime.substring(0, 10); //默认开始时间为所有排期中第一部影片的开始时间
                }
                this.defaultCity = this.cinema.city;
                this.initFilmDatas();
                this.initCitys();
                SelfServiceData.cinemaNO = this.cinema.cinemaNo;

            },
            //初始化filmDatas
            initFilmDatas: function () {
                this.filmDatas = [];
                var filmNames = [];
                for (var i = 0; i < this.plan.length; i++) {
                    var data = this.plan[i];
                    if ($.inArray(data.filmName, filmNames) != -1)
                        continue;
                    filmNames.push(data.filmName);
                    this.filmDatas.push(new FilmData(data.filmNo, data.filmName, data.copyType));
                }
            },
            initCitys: function () {
                this.citys = [];
                if (this.citys.length == 0) {
                    for (var i = 0; i < this.cinemas.length; i++) {
                        var cinema = this.cinemas[i];
                        if ($.inArray(cinema.city, this.citys) == -1) {
                            this.citys.push(cinema.city);
                        }
                    }
                }

            },
            //初始化页面
            initPage: function () {

                this.buildPlanTop();
                this.buildPlanBody();
                this.buildPlanTime();
                this.buildCityChose();
            },
            buildPlanTop: function () {
                this.planTop.empty();
                var html = [];
                if (this.cinema.status == this.Cinema_Status.NORMAL) {
                    html.push('<h1>正在售票</h1>');
                } else {
                    html.push('<h1>关闭售票</h1>');
                }
                html.push('<a class="toBack" href="index.html"></a>');
                html.push('<a class="ciname" href="#">' + this.cinema.cinemaName + '</a>');
                html.push('<img class="downIcon" src="./img/inshell/down.png" alt="" draggable="false">');
                this.planTop.append(html.join(""));
            },
            //构建planBody
            buildPlanBody: function () {
                this.planBody.empty();
                var html = [];

                html.push('<ul class="swiper-wrapper">');
                for (var i = 0; i < this.filmDatas.length; i++) {
                    var data = this.filmDatas[i];
                    html.push('<li filmNo="' + data.filmNo + '" class="swiper-slide">');
                    html.push('<img src="./img/inshell/1.jpg" alt="" draggable="false">');
                    html.push('<div class="indexAll">' + (i + 1) + '/' + this.filmDatas.length + '</div>');
                    html.push('<p>' + data.filmName + '</p><em>8.3</em>'); //TODO 分数 影片制式
                    html.push('<div class="film3d"></div>');
                    if (data.copyType == "3d") {
                        html.push('<div class="film3d"></div>');
                    } else if (data.copyType == "3dmax") {
                        html.push('<div class="film3d"></div>');
                        html.push('<div class="filmMax3d"></div>');
                    } else if (data.copyType == "") {
                        html.push('<div class="willShell"></div>');
                    }

                    html.push('</li>')
                }

                html.push('</ul>');
                this.planBody.append(html.join(""));


            },
            buildPlanTime: function (filmNo) {

                if (!filmNo) {
                    filmNo = this.defaultFilmNo;
                }
                this.planTime.empty();
                var html = [];
                html.push('<ul class="swiper-wrapper">');
                var dateStrs = [];
                var dateStrTemp;
                for (var i = 0; i < this.plan.length; i++) {
                    var data = this.plan[i];

                    var dateStr = data.startTime.substring(0, 10);
                    if (data.filmNo == filmNo && ($.inArray(dateStr, dateStrs) == -1)) {
                        dateStrs.push(dateStr);
                        if (dateStrs.length == 1) {
                            dateStrTemp = dateStr;
                            html.push('<li filmNo="' + data.filmNo + '" dateStr="' + dateStr + '" class="swiper-slide active">');
                        } else {
                            html.push('<li filmNo="' + data.filmNo + '" dateStr="' + dateStr + '" class="swiper-slide">');
                        }
                        var dateTemp = new Date(data.startTime.replace(/-/g, "/"));
                        html.push('<h3>' + formatDate(dateTemp.getTime(), 5) + '</h3>');
                        html.push('<h2>' + formatDate(dateTemp.getTime(), 3) + '</h2>');
                    }
                }

                html.push('</ul>');
                this.planTime.append(html.join(""));

                this.buildPlanBt(filmNo, dateStrTemp);

            },
            buildPlanBt: function (filmNo, dateStr) {
                if (!filmNo) {
                    filmNo = this.defaultFilmNo;
                }
                if (!dateStr) {
                    dateStr = this.defaultStartTime;
                }
                this.planBt.empty();

                var html = [];
                var showPlanNum = 0; //当前日期显示的排期数量
                for (var i = 0; i < this.plan.length; i++) {
                    var data = this.plan[i];
                    if (data.saleStatus != this.Sale_Status.CLOSE && data.planStatus != this.Plan_Status.CLOSE) {
                        var dateTemp = data.startTime.substring(0, 10); //开始放映日期

                        if (data.filmNo == filmNo && dateTemp == dateStr) {
                            showPlanNum++;
                            var startTimeTemp = data.startTime.substring(11, 16); //开始放映时间
                            var startTime = new Date(data.startTime.replace(/-/g, "/"));
                            var endTime = startTime;
                            //处理结束时间
                            var playMin = parseInt(data.totalTime);
                            var hour = playMin / 60;
                            var minute = playMin % 60;
                            endTime.setHours(endTime.getHours() + hour);
                            endTime.setMinutes(endTime.getMinutes() + minute);
                            var endTimeStr = endTime.getHours() + ":" + endTime.getMinutes();

                            var isStopSale = ((new Date().getTime() - (startTime.setMinutes(startTime.getMinutes() - 20))) >= 0); //是否已经停止售票  电影开映前20分钟停止售票


                            html.push('<ul class="dragFilmPlan">');
                            html.push('<li cinemaNo="' + this.cinema.cinemaNo + '" hallNo="' + data.hallNo + '">');

                            if (isStopSale) {
                                html.push('<ul class="filmUl stopShell">');
                            } else {
                                html.push('<ul class="filmUl ">');
                            }

                            html.push('<li>');
                            html.push('<h2>' + startTimeTemp + '</h2>');
                            html.push('<h3>' + endTimeStr + '散场</h3>');
                            html.push('</li>');
                            html.push('<li>');
                            html.push('<h2>' + data.copyLanguage + '</h2>');
                            html.push('<h3>' + data.copyType + '</h3>');
                            html.push('</li>');
                            html.push('<li>');
                            html.push('<h2>' + data.hallName + '</h2>');
                            html.push('<h3>座位充足：70%-100%</h3>');
                            html.push('</li>');
                            html.push('<li>');
                            html.push('<h2>¥' + data.lowestPrice + '<em>起</em></h2>');
                            html.push('<del>¥' + data.listingPrice + '</del>');
                            html.push('</li>');
                            html.push('<li>');
                            if (isStopSale) {
                                html.push('<a href="#">停止售票</a>');
                            } else {
                                var href = "seat.html?cinemaNo=" + this.cinema.cinemaNo + "&featureAppNo=" + data.featureAppNo + "&userType=" + this.userType;
                                html.push('<a href="' + href + '">选座购票</a>');
                            }

                            html.push('</li>');
                            html.push('<img src="img/inshell/border.png" alt="">');
                            html.push('</ul>');
                            html.push('</li>');
                            html.push('</ul>');
                        }
                    }

                }

                if (showPlanNum == 0) {
                    html.push('<div class="planNone">');
                    html.push('<img src="./img/inshell/calendar.png" alt="" draggable="false">');
                    html.push('<p>今天所有场次已结束放映</p>');
                    html.push('</div>');
                }
                this.planBt.append(html.join(""));

            },
            buildCityChose: function () {
                this.cityChose.empty();
                var html = [];
                html.push("<ul>");
                for (var i = 0; i < this.citys.length; i++) {
                    html.push("<li city='" + this.citys[i] + "'>" + this.citys[i] + "</li>");
                }
                html.push("</ul>");
                this.cityChose.append(html.join(""));

            },
            buildCinemaChose: function (city) {
                this.cinemaChose.empty();
                if (!city) city = this.defaultCity;
                var html = [];
                html.push('<ul>');
                for (var i = 0; i < this.cinemas.length; i++) {
                    var data = this.cinemas[i];
                    if (data.city == city) {
                        html.push('<li cinemaNo="' + data.cinemaNo + '">');
                        html.push('<a href="javascript:;">');
                        html.push('<h2>' + data.cinemaName + '</h2>');
                        html.push('<h3>' + data.address + '</h3>');
                        html.push('<img src="./img/inshell/right.png" alt="" draggable="false">');
                        html.push('</a>');
                        html.push('</li>');
                    }
                }
                html.push('</ul>');
                this.cinemaChose.append(html.join(""));

            },
            changeCinema : function (cinemaNo) {
                for (var i = 0; i < this.cinemas.length; i++) {
                    var cinema = this.cinemas[i];
                    if (cinemaNo == cinema.cinemaNo) {
                        this.cinema = cinema;
                        break;
                    }
                }
                this.init();
            },
            addEvent: function () {
                $(document).off('click', '#cinemaChose ul li>a').on('click', '#cinemaChose ul li>a', function () {

                    var cinemaNo = $(this).attr("cinemaNo");
                    planPage.changeCinema(cinemaNo);

                    var _this = $(this);
                    $('.choseCinema').slideUp();
                    var _ciname = _this.find('h2').html();
                    $('.planTop .ciname').html(_ciname);
                    $('.cinemaTop img').remove();
                });



                $(document).off('click', '#cityChose ul li').on('click', '#cityChose ul li', function () {

                    var city = $(this).attr("city");
                    planPage.buildCinemaChose(city);

                    var _this = $(this);
                    $('#cityChose').fadeOut();
                    $('#cinemaChose').fadeIn();
                    $('.cinemaTop span').html(_this.html());
                    var _downImg = '<img src="./img/inshell/redDown.png" alt="" draggable="false">';
                    $('.cinemaTop').append(_downImg);


                });



                //停售提示框
                $(document).off('click', '.stopShell li').on('click', '.stopShell li', function () {
                    $('.alert').show();
                    clearTimeout(timer);
                    var timer;
                    timer = setTimeout(function () {
                        $('.alert').hide();
                    }, 2000)
                });

                //添加事件
                $('.planTime li').off("click").on('click', function () {
                    $('.planTime li').removeClass('active');
                    $(this).addClass('active');
                    var filmNo = $(this).attr("filmNo");
                    var dateStr = $(this).attr("dateStr");

                    planPage.buildPlanBt(filmNo, dateStr);

                });

                //添加planBody的事件
                var FilmSwiper = new Swiper('.planBody', {
                    paginationClickable: true,
                    effect: 'coverflow',
                    grabCursor: true,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    coverflow: {
                        rotate: 30,
                        stretch: 0,
                        depth: 20,
                        modifier: 1,
                        slideShadows: false
                    },
                    onTap: function (swiper) {
                        FilmSwiper.slideTo(FilmSwiper.clickedIndex, 1000, false); //切换到第一个slide，速度为1秒 第三个是回调行数
                        var li = $(".planBody > ul").find("li");
                        li = li[FilmSwiper.clickedIndex];
                        var filmNo = $(li).attr("filmNo");
                        if (filmNo) {
                            planPage.buildPlanTime(filmNo);

                            //添加事件
                            $('.planTime li').off("click").on('click', function () {
                                $('.planTime li').removeClass('active');
                                $(this).addClass('active');
                                var filmNo = $(this).attr("filmNo");
                                var dateStr = $(this).attr("dateStr");

                                planPage.buildPlanBt(filmNo, dateStr);

                            });
                        }
                    }
                });

            }
        };

        planPage.init();
        //***********************************************************************************************************************************************************************************
        //=======================================================================排期具体业务结束=============================================================================================
        //***********************************************************************************************************************************************************************************

    });

    //选座页面初始化
    $(document).on("pageInit", "#page-seat", function () {

        $(document).off('click', '.BtBtLf ul li.isSeat>img').on('click', '.BtBtLf ul li.isSeat>img', function () {
            var _this = $(this);
            _this.parent('li').remove();
            var graphRow = $(this).attr("graphRow");
            var graphCol = $(this).attr("graphCol");
            seatPage.removeSeat(parseInt(graphRow),parseInt(graphCol));
            $('.BtBtLf ul').append('<li><span>待选座位</span></li>');
            $('.choseSeatRt li').each(function () {
                if ($(this).attr('data-seat') == _this.siblings('span').html()) {
                    if ($(this).is('.starChose')) {
                        $(this).attr('class', '').addClass('star');
                    } else if ($(this).is('.hasChose')) {
                        $(this).attr('class', '').addClass('canSeat');
                    } else if ($(this).is('.vipSeatChose')) {
                        $(this).attr('class', '').addClass('vipSeat');
                    }

                }
            })

        })
        $(document).off('click', '.seatErrorAlert>a').on('click', '.seatErrorAlert>a', function () {
            $(this).parent().fadeOut()
        })
        $(document).off('click', '.newChoseSeat').on('click', '.newChoseSeat', function () {
            $(this).parent().fadeOut()
        })
        $(document).off('click', '.INosure').on('click', '.INosure', function () {
            $(this).parent().fadeOut()
        })

        //***********************************************************************************************************************************************************************************
        //=======================================================================选座具体业务开始=============================================================================================
        //***********************************************************************************************************************************************************************************
        /**
         * 进入选座页面需要传以下参数    cinemaNo   featureAppNo
         * @type {{seatTop: (*), init: init, initData: initData, initPage: initPage, initSeatTop: initSeatTop}}
         */
        //代表一张票包含位置 价格信息
        function Ticket(planSeat) {
             this.planSeat = planSeat;
        }
        var seatPage = {
            seatTop: $(".seatTop"),
            bodyTop: $(".bodyTop"),
            bodyBtTop: $(".bodyBtTop"),
            payInfo : $(".payInfo"),
            totalEm : $(".needPayMoney em") ,
            totalAmount : 0,    //需要支付的总价格
            tickets : [] ,       //已经购买的票的数组
            user: null,
            //当前影厅的信息
            hallData: {
                maxRowNum: 1, //最大行坐标
                maxColNum: 1, //最大列坐标
                minRowNum: 1, //最小行坐标
                minColNum: 1 //最小列坐标
            },
            init: function () {
                window.app.console("seatPage Init1");
                try {
                    this.initData();
                } catch (e) {
                    //TODO 提示数据加载失败
                    window.app.console("选座加载数据失败");
                    return;
                }
                window.app.console("seatPage Init2");
                this.initPage();
                window.app.console("seatPage Init3");
                this.addEvent();
                window.app.console("seatPage Init4");
            },
            initData: function () {

                this.userType = getQueryString("userType");
                //所有影院信息
                this.cinemas = JSON.parse(window.app.getCinemas());

                //初始化当前页面的影院
                var cinemaNo = getQueryString("cinemaNo");

                for (var i = 0; i < this.cinemas.length; i++) {
                    var cinema = this.cinemas[i];
                    if (cinemaNo == cinema.cinemaNo) {
                        this.cinema = cinema;
                        break;
                    }
                }

                this.plans = JSON.parse(window.app.getPlans(this.cinema.cinemaNo)); //所有排期信息

                if (!this.featureAppNo) {
                    this.featureAppNo = getQueryString("featureAppNo"); //排期ID
                }

                for (var i = 0; i < this.plans.length; i++) {
                    var plan = this.plans[i];
                    if (this.featureAppNo == plan.featureAppNo) {
                        this.plan = plan;
                        break;
                    }
                }
                this.thisFilmNoPlans = []; //当前电影的排期
                for (var i = 0; i < this.plans.length; i++) {
                    var plan = this.plans[i];
                    if (plan.filmNo == this.plan.filmNo) {
                        this.thisFilmNoPlans.push(plan);
                    }
                }

                //对当前电影的排期进行排序
                this.thisFilmNoPlans.sort(function (a, b) {
                    var dateA = new Date(a.startTime.replace(/-/g, "/"));
                    var dateB = new Date(b.startTime.replace(/-/g, "/"));
                    return dateA.getTime() - dateB.getTime();
                });

                for (var i = 0; i < this.thisFilmNoPlans.length; i++) {
                    var plan = this.thisFilmNoPlans[i];
                    if (plan.featureAppNo == this.plan.featureAppNo) {
                        if (i == 0) {
                            this.prePlan = null;
                        } else {
                            this.prePlan = this.thisFilmNoPlans[i - 1];
                        }
                        if (i == (this.thisFilmNoPlans.length - 1)) {
                            this.nextPlan = null;
                        } else {
                            this.nextPlan = this.thisFilmNoPlans[i + 1];
                        }
                    }
                }

                this.hallSites = JSON.parse(window.app.getHallSites(this.cinema.cinemaNo, this.plan.hallNo)); //影厅对应的所有座位信息  1维数组

                //初始化 hallData
                for (var i = 0; i < this.hallSites.length; i++) {
                    var hallSite = this.hallSites[i];
                    if (parseInt(hallSite.graphRow) > this.hallData.maxRowNum) this.hallData.maxRowNum = hallSite.graphRow;
                    if (parseInt(hallSite.graphRow) < this.hallData.minRowNum) this.hallData.minRowNum = hallSite.graphRow;
                    if (parseInt(hallSite.graphCol) > this.hallData.maxColNum) this.hallData.maxColNum = hallSite.graphCol;
                    if (parseInt(hallSite.graphCol) < this.hallData.minColNum) this.hallData.minColNum = hallSite.graphCol;
                }

                this.hallSitesTwoD = []; //影厅对应的所有座位信息  2维数组
                this.planSeatsTwoD = []; //排期的座位状态          2维数组
                for (var i = this.hallData.minRowNum; i <= this.hallData.maxRowNum; i++) {
                    var temp1 = [];
                    this.hallSitesTwoD[i] = temp1;
                    var temp2 = [];
                    this.planSeatsTwoD[i] = temp2;
                }

                for (var i = 0; i < this.hallSites.length; i++) {
                    var hallSite = this.hallSites[i];
                    var j = parseInt(hallSite.graphRow);
                    var k = parseInt(hallSite.graphCol);
                    this.hallSitesTwoD[j][k] = hallSite;
                }

                //排期的座位状态
                this.planSeats = JSON.parse(window.app.getPlanSeats(this.cinema.cinemaNo, this.plan.featureAppNo, "Available"));;
                for (var i = 0; i < this.planSeats.length; i++) {
                    var planSeat = this.planSeats[i];
                    var j = parseInt(planSeat.graphRow);
                    var k = parseInt(planSeat.graphCol);
                    this.planSeatsTwoD[j][k] = planSeat;
                }


                //初始化用户信息
                var userStr = window.app.getUserFromCache();
                if (userStr) this.user = JSON.parse(userStr);

                //TODO 模拟数据开始   后期要删除
                this.user = {};
                this.user.userType = SelfServiceData.UserType.memberRegister;
                this.user.levelId = 1;
                //TODO 模拟数据结束

                //设置票价
                if(this.user){
                    if(this.user.userType == SelfServiceData.UserType.memberRegister){
                        for(var i = 0 ; i < this.plan.priceConfig.register.length ; i ++){
                            var register = this.plan.priceConfig.register[i];
                            if(this.user.levelId == register.levelId){
                                this.settlementPrice = parseFloat(register.settlementPrice);
                                this.ticketPrice = parseFloat(register.ticketPrice);
                                break;
                            }
                        }
                    }else if(this.user.userType == SelfServiceData.UserType.memberCard){
                        for(var i = 0 ; i < this.plan.priceConfig.memberCard.length ; i ++){
                            var membercard = this.plan.priceConfig.memberCard[i];
                            if(this.user.levelId == membercard.levelId){
                                this.settlementPrice = parseFloat(membercard.settlementPrice);  //结算价
                                this.ticketPrice = parseFloat(membercard.ticketPrice);          //票价
                                break;
                            }
                        }
                    }
                }

            },
            initPage: function () {
                this.initSeatTop();
                this.initBodyTop();
                this.initBodyBtTop();
            },
            initSeatTop: function () {
                this.seatTop.empty();
                var html = [];
                html.push('<h1>' + this.plan.filmName + '</h1>');
                html.push('<a class="toBack" href="#page-plan"></a>');
                if (this.user) {
                    html.push('<div class="backIndex">安全退出</div>');
                }

                this.seatTop.append(html.join(""));
            },
            initBodyTop: function () {
                this.bodyTop.empty();
                var html = [];
                html.push('<div class="topScrol"></div>');
                html.push('<p class="filmInfo">' + this.cinema.cinemaName + ' ' + this.plan.hallName + ' 荧幕 </p>');

                html.push('<div class="seatImg">');
                html.push('<img src="./img/seat/small/canSeat.png" alt="" draggable="false">');
                html.push('<span>可选</span>');
                html.push('<img src="./img/seat/small/hasSell.png" alt="" draggable="false">');
                html.push('<span>已售</span>');
                html.push('<img src="./img/seat/small/hasChose.png" alt="" draggable="false">');
                html.push('<span>已选</span>');
                html.push('<img src="./img/seat/small/star.png" alt="" draggable="false">');
                html.push('<span>黄金座</span>');
                html.push('<img src="./img/seat/small/vip.png" alt="" draggable="false">');
                html.push('<span>vip座</span>');
                // html.push('<img src="./img/seat/small/ql.png" alt="" draggable="false" style="width:0.76rem">');
                // html.push('<span>情侣座</span>');
                html.push('</div>');

                html.push('<div class="choseSeat">');
                html.push('<div class="choseSeatCT">');

                html.push('<div class="choseSeatLf">');
                html.push('<div class="linex"></div><div class="liney"></div>');

                html.push('<ul>');

                for (var i = this.hallData.minRowNum; i <= this.hallData.maxRowNum; i++) {
                    if (this.hallData.minRowNum == 0) {
                        html.push('<li>' + (i + 1) + '</li>');
                    } else {
                        html.push('<li>' + i + '</li>');
                    }
                }
                html.push('</ul>');
                html.push('</div>');

                html.push('<div class="choseSeatRt">');

                for (var i = this.hallData.minRowNum; i <= this.hallData.maxRowNum; i++) {
                    html.push('<ul>');
                    for (var j = this.hallData.minColNum; j <= this.hallData.maxColNum; j++) {
                        var hallSite = this.hallSitesTwoD[i][j];
                        var planSeat = this.planSeatsTwoD[i][j];

                        if (!hallSite) {
                            html.push('<li>' + j + '</li>'); //没有座位
                        } else {
                            var seatNo = hallSite.seatCol;
                            if (planSeat) {
                                //位置可售
                                var seatMsg = hallSite.seatRow + "排" + hallSite.seatCol + "座";
                                html.push('<li graphRow="'+planSeat.graphRow+'" graphCol="'+planSeat.graphCol+ '" class="canSeat" data-seat="' + seatMsg + '">' + seatNo + '</li>');
                            } else {
                                //位置不可售
                                html.push('<li class="hasSell">' + seatNo + '</li>');
                            }
                        }

                    }
                    html.push('</ul>');
                }

                html.push('</div>');

                html.push('</div>');
                html.push('</div>');

                this.bodyTop.append(html.join(""));
            },
            initBodyBtTop: function () {
                this.bodyBtTop.empty();
                var html = [];
                html.push('<img src="./img/seat/play.png" alt="" draggable="false">');

                var planDate = new Date(this.plan.startTime.replace(/-/g, "/"));
                planDate = planDate.getTime();
                var dateStr = formatDate(planDate, 5);
                dateStr += formatDate(planDate, 3);
                dateStr += " " + formatDate(planDate, 7);
                html.push('<span>当前场：' + dateStr + '</span>');

                var prevHref = "#";
                var nextHref = "#";
                var preStr = "<上一场/无场次";
                var nextStr = "下一场/无场次>";
                if (seatPage.prePlan) {
                    // prevHref = "seat.html?cinemaNo=" + seatPage.cinema.cinemaNo + "&featureAppNo=" + seatPage.prePlan.featureAppNo ;
                    var date = new Date(seatPage.prePlan.startTime.replace(/-/g, "/"));
                    preStr = "上一场/" + formatDate(date.getTime(), 7);
                }
                if (seatPage.nextPlan) {
                    // nextHref = "seat.html?cinemaNo=" + seatPage.cinema.cinemaNo + "&featureAppNo=" + seatPage.nextPlan.featureAppNo ;
                    var date = new Date(seatPage.nextPlan.startTime.replace(/-/g, "/"));
                    nextStr = "下一场/" + formatDate(date.getTime(), 7);
                }

                html.push('<div class="prev"><a href="#">' + preStr + '</a></div>');
                html.push('<div class="next"><a href="#">' + nextStr + '</a></div>');


                this.bodyBtTop.append(html.join(""));
            },
            //跳到下一场
            skip2nextPlan : function () {
                this.featureAppNo = this.nextPlan.featureAppNo;
                this.init();
            },
            //跳到上一场
            skip2prePlan : function () {
                this.featureAppNo = this.prePlan.featureAppNo;
                this.init();
            },
            //移除座位
            removeSeat : function (graphRow,graphCol) {
                this.totalAmount -= this.settlementPrice;

                for(var i = 0 ; i < this.tickets.length ; i++){
                    var ticket = this.tickets[i];
                    if(ticket.planSeat.graphRow == graphRow && ticket.planSeat.graphCol == graphCol){
                        this.tickets[i] = null;
                        break;
                    }
                }
                var temp = [];
                for(var i = 0 ; i < this.tickets.length ; i++){
                    var ticket = this.tickets[i];
                    if(ticket){
                        temp.push(ticket);
                    }
                }
                this.tickets = temp;
                this.initNeedPayMoney();
            },
            //选择座位
            choseSeat : function (graphRow,graphCol) {
                //点击座位如果未登录则跳转到登录页面

                if(!this.user){
                    //登录成功后返回的页面
                    var url = "seat.html?cinemaNo="+this.cinema.cinemaNo +"&featureAppNo="+this.featureAppNo+"&userType=" + this.userType;
                    url = encodeURIComponent(url);
                    if(this.userType == SelfServiceData.UserType.memberCard){
                        $.router.loadPage("cardLogin.html?goUrl=" + url);
                    } else if (this.userType == SelfServiceData.UserType.memberRegister) {
                        $.router.loadPage("login.html?goUrl="+url);
                    }
                }else{
                        if(this.tickets.length < 4){
                            this.totalAmount += this.settlementPrice;
                            this.tickets.push(new Ticket(this.planSeatsTwoD[graphRow][graphCol]));
                            this.initNeedPayMoney();
                        }
                    //TODO  已经登录则计算票价
                }
            },
            initNeedPayMoney : function () {
                window.app.console("aaaaaaaaaaa");
                this.totalEm.html(this.totalAmount.toFixed(2));
                var str = "";
                for(var i = 0 ; i < this.tickets.length ; i++){
                    str += this.settlementPrice.toFixed(2) + "*1";
                    if(i < this.tickets.length -1){
                        str += "+";
                    }
                }
                window.app.console("bbbbbbbbbbbbbb");
                this.payInfo.empty();
                this.payInfo.html(str);
            },
            addEvent: function () {
                $(".prev").on("click", function () {
                    seatPage.skip2prePlan();
                });
                $(".next").on("click", function () {
                    seatPage.skip2nextPlan();
                });
                //选座页面li的宽度   让ul宽度随li宽度展开
                //copy 座位图
                $('.seatInfoShow  .Info').append($('.choseSeatRt').html());


                // 选座页面li的宽度   让ul宽度随li宽度展开  封装
                function setSeat (obj, conf) {
                    $('' + obj + ' ul').each(function (i,k) {
                        var _liWidth = $(this).children('li').outerWidth(true);
                        var _liLength = $(this).children('li').length + 2;
                        var _ulWidth = (_liWidth * _liLength);
                        $(this).css('width', _ulWidth);
                        var _lineWidth = $('' + obj + ' .linex').outerWidth(true);
                        if(i==0){
                            $('' + obj + ' .linex').css('width', _ulWidth);
                        }
                        if (_lineWidth < _ulWidth) {
                            $('' + obj + ' .linex').css('width', _ulWidth);
                            if (_liLength % 2 == 1) {
                                $('' + obj + ' .liney').css('left', _ulWidth / 2 - _liWidth * 0.68);
                            } else {
                                $('' + obj + ' .liney').css('left', _ulWidth / 2 - _liWidth * 0.18);
                            }
                        }
                    });
                    var _ulHeight = $('' + obj + ' ul').outerHeight(true);
                    var _ulL = $('' + obj + ' ul').length;
                    $('' + obj + ' .liney').css('height', _ulL * _ulHeight);
                    if (_ulL % 2 == 1) {
                        $('' + obj + ' .linex').css('top', (_ulL * _ulHeight) / 2);
                        $('' + obj + ' .linex').css('margin-top', '-0.2rem');
                    } else {
                        $('' + obj + ' .linex').css('top', (_ulL * _ulHeight) / 2);
                        $('' + obj + ' .linex').css('margin-top', '0.1rem');
                    }
                    if(conf){
                        conf.fn();
                    }
                }
                setSeat('.choseSeatRt');
                //操作预览座位图
                setSeat('.seatInfoShow',{
                    fn:function(){
                        $('.seatInfoShow').css({
                            hieght:$('.seatInfoShow .liney').outerHeight(true),
                            width:$('.seatInfoShow .linex').outerWidth(true),
                        })
                    }
                });
                //选座 左边块的半透明固定
                $('.choseSeatCT').scroll(function () {
                    $('.choseSeatLf').css('left', ($('.choseSeatCT').scrollLeft()) / 100 + 'rem');
                    $('.borderBox').css('left', ($('.choseSeatCT').scrollLeft()) / 620 + 'rem');
                    $('.borderBox').css('top', ($('.choseSeatCT').scrollTop()) / 680 + 'rem');
                });
                $('.choseSeatRt').hover(function(){
                    $('.seatInfoShow').css('opacity',1);
                },function(){
                    $('.seatInfoShow').css('opacity',0);
                })


                $('.choseSeatRt ul li').on('click', function () {
                    var _this = $(this);
                    var _activeTength = $('.BtBtLf ul li.isSeat').length;
                    var _ifCanSeat = true;

                    if (_activeTength == 4) {
                        _ifCanSeat = false;
                        if (_this.is('.vipSeatChose') || _this.is('.starChose') || _this.is('.hasChose')){
                            _ifCanSeat = true;
                        }
                    }
                    //              情侣座判断
                    //            else if (_activeTength == 3) {
                    //                if (_this.is('.fimilySeat')) {
                    //                    _ifCanSeat = false;
                    //                }
                    //            }
                    //                else if (_this.is('.fimilySeat')) {
                    //                    _this.removeClass('fimilySeat').addClass('fimilySeatChose').addClass('active');
                    //                    $('.BtBtLf ul li').each(function () {
                    //                            var _isSeat = $(this);
                    //                            if (!_isSeat.is('.isSeat')) {
                    //                                _isSeat.html('<span>' + _this.attr('data-seat') + '</span><img src="./img/seat/x.png" alt="" draggable="false">');
                    //                                _isSeat.addClass('isSeat').addClass('qlSeat');
                    //                                _isSeat.next().html('<span>' + _this.attr('data-seatTwo') + '</span><img src="./img/seat/x.png" alt="" draggable="false">');
                    //                                _isSeat.next().addClass('isSeat').addClass('qlSeat');
                    //                                return false;
                    //                            }
                    //                        })
                    //                            else if (_this.is('.fimilySeatChose')) {
                    //                                _this.removeClass('fimilySeatChose').removeClass('active').addClass('fimilySeat');
                    //                            }
                    var graphRow = parseInt($(this).attr("graphRow"));
                    var graphCol = parseInt($(this).attr("graphCol"));
                    if (_ifCanSeat) {

                        //点击选座
                        if (_this.is('.canSeat')) {
                            //点击座位如果未登录则跳转到登录页面
                            seatPage.choseSeat(graphRow,graphCol);
                            _this.removeClass('canSeat').addClass('hasChose').addClass('active');
                            $('.BtBtLf ul li').each(function () {
                                var _isSeat = $(this);
                                if (!_isSeat.is('.isSeat')) {

                                    _isSeat.html('<span >' + _this.attr('data-seat') + '</span><img graphCol="'+graphCol+'" graphRow="'+graphRow+'" src="./img/seat/x.png" alt="" draggable="false">');
                                    _isSeat.addClass('isSeat');
                                    return false;
                                }
                            })
                        } else if (_this.is('.vipSeat')) {
                            //点击座位如果未登录则跳转到登录页面
                            seatPage.choseSeat(graphRow,graphCol);
                            _this.removeClass('vipSeat').addClass('vipSeatChose').addClass('active');
                            $('.BtBtLf ul li').each(function () {
                                var _isSeat = $(this);
                                if (!_isSeat.is('.isSeat')) {

                                    _isSeat.html('<span>' + _this.attr('data-seat') + '</span><img src="./img/seat/x.png" alt="" draggable="false">');
                                    _isSeat.addClass('isSeat');
                                    return false;
                                }
                            })
                        } else if (_this.is('.star')) {
                            //点击座位如果未登录则跳转到登录页面
                            seatPage.choseSeat(graphRow,graphCol);
                            _this.removeClass('star').addClass('starChose').addClass('active');
                            $('.BtBtLf ul li').each(function () {
                                var _isSeat = $(this);
                                if (!_isSeat.is('.isSeat')) {
                                    _isSeat.html('<span>' + _this.attr('data-seat') + '</span><img src="./img/seat/x.png" alt="" draggable="false">');
                                    _isSeat.addClass('isSeat');
                                    return false;
                                }
                            })
                        }
                        //下面开始是取消座位的了
                        else if (_this.is('.vipSeatChose')) {
                            seatPage.removeSeat(graphRow,graphCol);
                            _this.removeClass('vipSeatChose').removeClass('active').addClass('vipSeat');
                            $('.BtBtLf li').each(function () {
                                if (_this.attr('data-seat') == $(this).find('span').html()) {
                                    $(this).remove();
                                    $('.BtBtLf ul').append('<li><span>待选座位</span></li>');
                                    return false;
                                }
                            })


                        } else if (_this.is('.starChose')) {
                            seatPage.removeSeat(graphRow,graphCol);
                            _this.removeClass('starChose').removeClass('active').addClass('star');
                            $('.BtBtLf li').each(function () {
                                if (_this.attr('data-seat') == $(this).find('span').html()) {
                                    $(this).remove();
                                    $('.BtBtLf ul').append('<li><span>待选座位</span></li>');
                                    return false;
                                }
                            })

                        } else if (_this.is('.hasChose')) {
                            seatPage.removeSeat(graphRow,graphCol);
                            _this.removeClass('hasChose').removeClass('active').addClass('canSeat');
                            $('.BtBtLf li').each(function () {
                                if (_this.attr('data-seat') == $(this).find('span').html()) {
                                    $(this).remove();
                                    $('.BtBtLf ul').append('<li><span>待选座位</span></li>');
                                    return false;
                                }
                            })

                        }

                    }
                });

                $('.pay').on('click', function () {
                    $('#zzBG').show();
                    $('.SeatAlert').fadeIn();
                    setTimeout(function () {
                        $('#zzBG').hide();
                        $('.SeatAlert').fadeOut();
                    }, 5000)
                    setTimeout(function () {
                        $('.seatErrorAlert').fadeIn();
                    }, 10000)
                    setTimeout(function () {
                        location.href = 'pay.html';
                    }, 20000)
                });
            },

        };
        seatPage.init();
        //***********************************************************************************************************************************************************************************
        //=======================================================================选座具体业务结束=============================================================================================
        //***********************************************************************************************************************************************************************************
    });

    //支付页面
    $(document).on("pageInit", "#page-pay", function () {

        $('#zfb').on('click', function () {
            $('#payZfbAlert').fadeIn();
            $('#zzBG').show();
        })
        $('#weixin').on('click', function () {
            $('#payWxAlert').fadeIn();
            $('#zzBG').show();
        })
        $('#count').on('click', function () {
            $('#acountPayAlert').fadeIn();
            $('#zzBG').show();
        })
        $(document).off('click', '.close').on('click', '.close', function () {
            $(this).parent().fadeToggle();
            $('#zzBG').hide();
            location.href = 'wait.html'
        })

    });

    // 等待结果页面
    $(document).on("pageInit", "#page-wait", function () {
        var count = $.zxfun.urlGet("count")
        var queueCount = $.zxfun.urlGet("queueCount");
        var orderNo = $.zxfun.urlGet("orderNo");

        var deviceName = localStorage.deviceName;
        if (parseInt(queueCount) > 0) {
            var timeOut = 3000 * parseInt(count);
            setTimeout(function () {
                var nowQueueCount = app.getQueueCountByDeviceName(deviceName);
                if (parseInt(nowQueueCount) > 0) {
                    location.href = 'resultfalse.html?orderNo' + "&orderNo=" + orderNo;
                } else {
                    location.href = 'result.html?count=' + count;
                }
            }, timeOut);
        } else {
            location.href = 'result.html?count=' + count;
        }
    });

    // 成功回调页页面
    $(document).on("pageInit", "#page-result", function () {
        //speedNum 速度
        var _showImg = function (speedNum) {
            clearInterval(timer);
            var timer;
            var speed = speedNum;
            timer = setInterval(function () {
                var _this_top = parseFloat($('.pAdminit').css('top'));
                _this_top += speed;

                if (_this_top >= 197) {
                    clearInterval(timer);
                    setTimeout(function () {
                        $('.pAdminit').fadeOut("slow", function () {
                            $('.pAdminit').css('top', '-3.45rem');
                            clearTimeout(_timer);
                            var _timer;
                            _timer = setTimeout(function () {
                                $('.pAdminit').show();
                                _showImg(10);
                            }, 1000)
                        })
                    }, 500)
                } else {
                    $('.pAdminit').css('top', (_this_top / 100) + 'rem');
                }
            }, 50)
        };
        _showImg(10); //执行打票
        setTimeout(function () {
            $('.resultSucces').hide();
            $('.resultSuccesBack').fadeIn();
        }, 6000)

        //        倒计时跳转  现在产品狗取消了
        //        var _timeBack = 10;
        //        var _tiemr;
        //        clearInterval(_tiemr);
        //        _tiemr = setInterval(function () {
        //            _timeBack--;
        //            if (_timeBack == 0) {
        //                clearInterval(_tiemr);
        //            }
        //            $('.systemInfo>time').html(_timeBack);
        //        }, 1000)
        //        var _timeBack2 = 10;
        //        var _tiemr2;
        //        clearInterval(_tiemr2);
        //        _tiemr2 = setInterval(function () {
        //            _timeBack2--;
        //            if (_timeBack == 0) {
        //                clearInterval(_tiemr2);
        //            }
        //            $('.resultError>p>time').html(_timeBack2 + 's');
        //        }, 1000)
    });

    // 取票
    $(document).on("pageInit", "#page-checkin", function () {
        var _timeBack = 5;
        var _tiemr;
        clearInterval(_tiemr);
        _tiemr = setInterval(function () {
            _timeBack--;
            if (_timeBack == 0) {
                clearInterval(_tiemr);
            }
            $('.systemInfo>time').html(_timeBack);
        }, 1000);
        //调用数字键盘
        $.zxfun.numberKeyBoard({
            pageId: '#page-checkin',
            inpuIdOne: '#inputOrder',
            inpuIdTwo: '#inputFilmCode',
            getBtn: '.getBtn'
        })


        //二维码出场动画
        $('.ewmCode').on('click', function () {
            $('.howToGetFilm').animate({
                right: '50%',
                opacity: '1',
                marginRight: '-3.5rem'
            })
        })
        $('.close').on('click', function () {
            $(this).parent().animate({
                right: '-7rem',
                opacity: '0',
                marginRight: '0rem'
            }, "slow")
        })
        $(document).off('click', '.seatErrorAlert a').on('click', '.seatErrorAlert a', function () {
            $(this).parent().fadeOut();
        })
        $('.getBtn').on('click', function () {
            var orderNo = $('#inputOrder').val();
            var validCode = $('#inputFilmCode').val();
            if (orderNo == null || orderNo === '') {
                $.toast('请输入订单号！')
                return
            }
            if (validCode == null || validCode === '') {
                $.toast('请输取票码！')
                return
            }
            $('#zzBG').show();
            $('.SeatAlert').show();
            var data = app.getMovieTicketsAndGoods("35012401", orderNo, validCode, "0");
            $('#zzBG').hide();
            $('.SeatAlert').hide();
            if (data == null) {
                $.toast("取票出错，请联系管理员！")
            } else {
                data = JSON.parse(data);
                var value = data.value;

                if (data.result == false) {
                    $.toast(data.message);
                } else {
                    localStorage.deviceName = value.deviceName;
                    window.location.href = 'wait.html?count=' + value.count + "&queueCount=" + value.queueCount + "&orderNo=" + orderNo;
                }
            }
        })
    });


    // 取卖品
    $(document).on("pageInit", "#page-getgoods", function () {
        var _timeBack = 5;
        var _tiemr;
        clearInterval(_tiemr);
        _tiemr = setInterval(function () {
            _timeBack--;
            if (_timeBack == 0) {
                clearInterval(_tiemr);
            }
            $('.systemInfo>time').html(_timeBack);
        }, 1000);
        //调用数字键盘
        $.zxfun.numberKeyBoard({
            pageId: '#page-getgoods',
            inpuIdOne: '#inputOrder',
            inpuIdTwo: '#inputFilmCode',
            getBtn: '.getBtn'
        })


        //二维码出场动画
        $('.ewmCode').on('click', function () {
            $('.howToGetFilm').animate({
                right: '50%',
                opacity: '1',
                marginRight: '-3.5rem'
            }, "slow")
        })
        $('.close').on('click', function () {
            $(this).parent().animate({
                right: '-7rem',
                opacity: '0',
                marginRight: '0rem'
            })
        })
        $(document).off('.seatErrorAlert a').on('click', '.seatErrorAlert a', function () {
            $(this).parent().fadeOut();
        })
        $('.getBtn').on('click', function () {
            var orderNo = $('#inputOrder').val();
            var validCode = $('#inputFilmCode').val();
            if (orderNo == null || orderNo === '') {
                $.toast('请输入订单号！')
                return
            }
            if (validCode == null || validCode === '') {
                $.toast('请输取票码！')
                return
            }
            $('#zzBG').show();
            $('.SeatAlert').show();
            var data = app.printGoodsTicket("35012401", orderNo, validCode, "0");
            $('#zzBG').hide();
            $('.SeatAlert').hide();
            if (data == null) {
                $.toast("取票出错，请联系管理员！")
            } else {
                data = JSON.parse(data);
                var value = data.value;

                if (data.result == false) {
                    $.toast(data.message);
                } else {
                    localStorage.deviceName = value.deviceName;
                    window.location.href = 'wait.html?count=' + value.count + "&queueCount=" + value.queueCount + "&orderNo=" + orderNo;
                }
            }
        })



    });

    // 选择使用卖品券 或者 电影券
    $(document).on("pageInit", "#page-choseCpType", function () {
        $('.useFilmCp').on('click', function () {
            location.href = 'cuppon.html?type=films';
        })
        $('.useGoodCp').on('click', function () {
            location.href = 'cuppon.html?type=goods';
        })
    });
    // 选择卖品券 或者 电影券
    $(document).on("pageInit", "#page-cuppon", function () {
        var _type = $.zxfun.urlGet('type');
        if (_type == 'films') {

        } else if (_type == 'goods') {
            //卖品 
            $('#page-cuppon .seatTop').find('h1').html('使用卖品券');
            $('.hasUseCp a').attr('href', 'goods.html').html('选卖品');
            //下面数据也是静态的数据 需要换成接口提供的数据
            $('#cupponBox ul').html('');
            var _html;
            _html += '<li class="mpqId">';
            _html += '<div class="liLeft">';
            _html += '<div class="liLeftTp">';
            _html += '<em>¥</em>';
            _html += '<strong>15</strong>';
            _html += '</div>';
            _html += '<div class="liLeftBt">卖品券</div>';
            _html += ' </div>';
            _html += ' <div class="liCenter">';
            _html += '<h3>SDJ897KJEJ3</h3>';
            _html += '<p>有效期截止：2016年12月31日</p>';
            _html += ' <p>按券面值抵扣影票金额,特别场次需补差</p>';
            _html += ' </div>';
            _html += '  <div class="liRight">立即使用</div>';
            _html += '</li>';
            $('#cupponBox ul').append(_html);
        }
        //调用全键盘
        $.zxfun.keyBod({
                pageId: '#page-cuppon',
                inpuIdOne: '#serchInput'
            })
            //有使用券的情况下面显示使用
        $('#page-cuppon #cupponBox li .liRight').on('click', function () {
                if ($(this).parent().is('.historyId')) {
                    return false;
                }
                $(this).toggleClass('active');
                if ($(this).is('.active')) {
                    $(this).html('取消使用');
                } else {
                    $(this).html('立即使用');
                }
                if ($('#page-cuppon #cupponBox li').find('.active').length >= 1) {
                    $('.hasUseCp').fadeIn();
                } else {
                    $('.hasUseCp').fadeOut();
                }
            })
            //打开键盘
        $('#serchInput').focusin(function () {
                $('#keyBoxAllSmall').fadeIn();
            })
            //关闭键盘
        $(document).off('click', '#keyBoxAllSmall .close').on('click', '#keyBoxAllSmall .close', function () {
                $('#keyBoxAllSmall').fadeOut();
            })
            //转大写
        $(document).off('click', '#keyBoxAllSmall .toUpperCase').on('click', '#keyBoxAllSmall .toUpperCase', function () {
                $('#keyBoxAllSmall').fadeOut();
                $('#keyBoxAllBig').fadeIn();
            })
            //关闭键盘 大写
        $(document).off('click', '#keyBoxAllBig .close').on('click', '#keyBoxAllBig .close', function () {
                $('#keyBoxAllBig').fadeOut();
                $('#keyBoxAllSmall').fadeOut();
            })
            //转小写
        $(document).off('click', '#keyBoxAllBig .toLowerCase').on('click', '#keyBoxAllBig .toLowerCase', function () {
            $('#keyBoxAllBig').fadeOut();
            $('#keyBoxAllSmall').fadeIn();
        })
    });


    // 买卖品
    $(document).on("pageInit", "#page-goods", function () {
        var _money = 0;
        var data = app.getGoodsList('35012401');
        data = JSON.parse(data);
        if (data == null) {
            $.toast('获取卖品列表失败，请联系管理员');
        } else if (data.result == false) {
            $.toast(data.message);
        } else {
            var goodsList = data.value.data;
            var html = '';
            for (var i = 0; i < goodsList.length; i++) {
                var goods = goodsList[i];
                var key = i + 1;
                var fee = parseFloat(goods.channelFee) + parseFloat(goods.accessFee);
                fee = fee.toFixed(2);
                html += '<li> <img class="goodsImg" src="./img/cuppon/goods.png" alt="" draggable="false"> ' +
                    '<h2>' + goods.goodsName + '</h2> <p>会员价：<var>¥' + fee + '</var><del>¥' + goods.marketFee + '</del></p> ' +
                    '<p>' + goods.goodsDescribe + '</p> <p>兑换有效期：自购买日起<time>' + goods.validity + '</time>天内有效</p> <div class="Spinner"> ' +
                    '<div class="leftBtn" href="#" data-name=' + goods.goodsName + ' data-money="' + fee + '" data-key=' + goods.goodsNo + '></div> ' +
                    '<input class="goodsNum" type="text"> <div class="rightBtn" href="#" data-name="' + goods.goodsName +
                    '" data-money="' + fee + '" data-key="' + goods.goodsNo + '"></div> </div> <img class="border" src="' + goods.goodsCoverImage + '" alt=""> </li>';
            }
            $('#goodsList').html(html);
        }

        $(".Spinner").Spinner({
            value: 0,
            min: 0,
            len: 2,
            max: 99
        });
        //减号
        $(document).off('click', '.leftBtn').on('click', '.leftBtn', function () {
                var _this = $(this);
                var inpuNum = _this.siblings('.goodsNum').val();
                var _GoodsName = $(this).attr('data-name');
                var _GoodsMoney = parseFloat($(this).attr('data-money'));
                var _goodsKey = $(this).attr('data-key');

                var _html = '';
                _html += '<span class="goods' + _goodsKey + '" data-price="' + _GoodsMoney + '" data-key="' + _goodsKey + '">' + _GoodsName + '*' + inpuNum + '</span>';
                if ($('.goodsBtLf>p span').is('.goods' + _goodsKey + '')) {
                    $('.goodsBtLf>p').find('.goods' + _goodsKey + '').html(_GoodsName + '*' + inpuNum);
                }
                _money -= _GoodsMoney;
                if (inpuNum <= 0) {
                    _this.parent('.Spinner').animate({
                        width: '0.6rem'
                    })
                    $('.goodsBtLf>p').find('.goods' + _goodsKey + '').remove();
                }
                if (_money > 0) {
                    $('.goodsBodyBt').fadeIn();
                    $('.goodsBtRt p>em').html('¥' + parseFloat(_money).toFixed(2))
                } else {
                    $('.goodsBodyBt').fadeOut();
                }

            })
            //加号
        $(document).off('click', '.rightBtn').on('click', '.rightBtn', function () {
            var _this = $(this);
            var inpuNum = _this.siblings('.goodsNum').val();
            var _GoodsName = $(this).attr('data-name');
            var _GoodsMoney = parseFloat($(this).attr('data-money'));
            var _goodsKey = $(this).attr('data-key');
            var _html = '';
            _html += '<span class="goods' + _goodsKey + '" data-price="' + _GoodsMoney + '" data-key="' + _goodsKey + '">' + _GoodsName + '*' + inpuNum + '</span>';
            if ($('.goodsBtLf>p span').is('.goods' + _goodsKey + '')) {
                $('.goodsBtLf>p').find('.goods' + _goodsKey + '').html(_GoodsName + '*' + inpuNum);
            } else {
                $('.goodsBtLf>p').append(_html)
            }

            _money += _GoodsMoney;
            if (inpuNum > 0) {
                _this.parent('.Spinner').animate({
                    width: '1.92rem'
                })
            }
            if (_money > 0) {
                $('.goodsBodyBt').fadeIn();
                $('.goodsBtRt p>em').html('¥' + parseFloat(_money).toFixed(2))
            } else {
                $('.goodsBodyBt').fadeOut();
            }
        })

        $('#toPay').on('click', function () {
            var parm = [];
            $('.goodsBtLf>p span').each(function () {
                var goodsSum = $(this).html().split('*')[1];
                var goodsNo = $(this).attr('data-key');
                var saleFee = parseFloat($(this).attr('data-price')) * parseFloat(goodsSum);
                parm.push({
                    goodsNo: goodsNo,
                    goodsSum: goodsSum,
                    saleFee: saleFee
                })
            })
            var data1 = app.lockGoods('35012401', JSON.stringify(parm), '13159435553');
            data1 = JSON.parse(data1);
            if (data1.result == true) {
                $.toast("下单成功");
            } else {
                $.toast(data1.message);
            }
        })

    });
    // 会员卡
    $(document).on("pageInit", "#page-cards", function () {



        })
        // 购票失败
    $(document).on("pageInit", "#page-resultfalse", function () {
            var orderNo = $.zxfun.urlGet("orderNo");
            $('#orderNo').html(orderNo);


        })
        //会员卡支付
    $(document).on("pageInit", "#page-cardPay", function () {

            $('.seatErrorAlert>a').on('click', function () {
                $(this).parent('.seatErrorAlert').fadeOut();
            })

        })
        // 会员卡充值
    $(document).on("pageInit", "#page-cardCz", function () {

        $(".Spinner").Spinner({
            value: 0,
            min: 0,
            len: 2,
            max: 100000
        });
        $('.czNumBox ul li').on('click', function () {
                $('.czNumBox ul li').removeClass('active');
                $(this).addClass('active');
                var _value = parseInt($(this).html());
                $("#page-cardCz").find('.goodsNum').val(_value)
            })
            //弹窗
        $('.zfb').on('click', function () {
            $('#payZfbAlert').fadeIn();
            $('#zzBG').show();
        })
        $('.wx').on('click', function () {
            $('#payWxAlert').fadeIn();
            $('#zzBG').show();
        })
        $(document).off('click', '.close').on('click', '.close', function () {
            $(this).parent().fadeToggle();
            $('#zzBG').hide();
            location.href = 'czsucces.html'
        })



    })

    //充值成功页面
    $(document).on("pageInit", "#page-czsucces", function () {
        var _timeBack2 = 5;
        var _tiemr2;
        clearInterval(_tiemr2);
        _tiemr2 = setInterval(function () {
            _timeBack2--;
            if (_timeBack2 == 0) {
                clearInterval(_tiemr2);
                location.href = 'index.html'
            }
            $('.czsuccesBody p time').html(_timeBack2);
        }, 1000)
    })


    //会员登录
    $(document).on("pageInit", "#page-login", function () {
        localStorage.inputType = 1;
        //localStorage.inputType==1 小写 2大写 3符号
        //调用数字键盘
        $.zxfun.numberKeyBoard({
                pageId: '#page-login',
                inpuIdOne: '#phoneTab>.phone',
                maxNUmber: 11
            })
            //调用全键盘
        $.zxfun.keyBod({
                pageId: '#page-login',
                inpuIdOne: '#phoneTab>.psw',
                isFh: '使用符号'
            })
            //调用数字键盘
        $.zxfun.numberKeyBoard({
            pageId: '#page-login',
            inpuIdOne: '#messageTab>.phone',
            inpuIdTwo: '#messageTab>.messageCode',
            getBtn: '.loginBoxBt',
            maxNUmber: 11, //这边是手机号数量
            maxNUmber2: 6, //这边是验证码
        })
        $('#phoneTab  .phone').focus(function () {
            $('#phoneTab .allkeyboxposition').hide();
            $('#phoneTab .numKeyBoard').show();
        })

        $('#phoneTab  .phone,#phoneTab  .psw').blur(function () {
            var _phone = $('#phoneTab  .phone').val();
            var _psw = $('#phoneTab  .psw').val();
            if (_phone.length != 11) {
                //                 $('#phoneTab  .phone+p').css('opacity',1).html('手机格式有误');
                $('.loginBoxBt').removeClass('active');
            } else {
                $('#phoneTab  .phone+p').css('opacity', 0);
            }
            if (_psw.length == 0) {
                //                 $('#phoneTab  .psw+p').css('opacity',1).html('请输入账号及密码');
                $('.loginBoxBt').removeClass('active');
            } else {
                $('#phoneTab  .psw+p').css('opacity', 0);
            }
            if (_phone.length == 11 && _psw.length != 0) {
                $('.loginBoxBt').addClass('active')
            }


        })
        $('#messageTab  .phone,#messageTab  .messageCode').blur(function () {
            var _phone = $('#messageTab  .phone').val();
            var _psw = $('#messageTab  .messageCode').val();
            if (_phone.length != 11) {
                //                 $('#messageTab  .phone+p').css('opacity',1).html('手机格式有误');
                $('.loginBoxBt').removeClass('active');
            } else {
                $('#messageTab  .phone+p').css('opacity', 0);
            }
            if (_psw.length == 0) {
                //                 $('#messageTab  .messageCode~p').css('opacity',1).html('请输入短信验证码');
                $('.loginBoxBt').removeClass('active');
            } else {
                $('#messageTab  .messageCode~p').css('opacity', 0);
            }
            if (_phone.length == 11 && _psw.length != 0) {
                $('.loginBoxBt').addClass('active')
            }
        })
        $('#phoneTab  .psw').focus(function () {
                $('#phoneTab .allkeyboxposition').hide();
                if (localStorage.inputType == 1) {
                    $('#phoneTab #keyBoxAllSmall').show();
                } else if (localStorage.inputType == 2) {
                    $('#phoneTab #keyBoxAllBig').show();
                } else if (localStorage.inputType == 3) {
                    $('#phoneTab #keyBoxAllFH').show();
                } else {
                    $('#phoneTab #keyBoxAllSmall').show();
                }

            })
            //转大写
        $(document).off('.click', '#page-login #keyBoxAllSmall .toUpperCase').on('click', '#page-login #keyBoxAllSmall .toUpperCase', function () {
                $('#keyBoxAllSmall').fadeOut();
                $('#keyBoxAllBig').fadeIn();
                localStorage.inputType = 2;
            })
            //转小写
        $(document).off('.click', '#page-login #keyBoxAllBig .toLowerCase').on('click', '#page-login #keyBoxAllBig .toLowerCase', function () {
                $('#keyBoxAllBig').fadeOut();
                $('#keyBoxAllSmall').fadeIn();
                localStorage.inputType = 1
            })
            //转特殊字符  close类 
        $(document).off('.click', '#page-login #keyBoxAllBig .close,#page-login #keyBoxAllSmall .close').on('click', '#page-login #keyBoxAllBig .close,#page-login #keyBoxAllSmall .close', function () {
                $('#keyBoxAllBig').fadeOut();
                $('#keyBoxAllSmall').fadeOut();
                $('#keyBoxAllFH').fadeIn();
                localStorage.inputType = 3
            })
            //转大写
        $(document).off('.click', '#page-login #keyBoxAllFH .ABC').on('click', '#page-login #keyBoxAllFH .ABC', function () {
            $('#keyBoxAllBig').fadeIn();
            $('#keyBoxAllSmall').fadeOut();
            $('#keyBoxAllFH').fadeOut();
            localStorage.inputType = 2
        })
        $('.loginBoxTop>a').on('click', function () {
            $('.loginBoxTop>a').removeClass('active');
            $(this).addClass('active');
            if ($(this).is('.phoneLogin')) {

                $('#phoneTab').show();
                $('#codeTab').hide();
                $('#messageTab').hide();
                $('.loginBoxBt').removeClass('active');
                $('#phoneTab').find('input').val('');
            } else if ($(this).is('.codeLogin')) {
                $('#codeTab').show();
                $('#phoneTab').hide();
                $('#messageTab').hide();
                $('.loginBoxBt').removeClass('active')
            } else if ($(this).is('.messageLogin')) {
                $('#messageTab').show();
                $('#codeTab').hide();
                $('#phoneTab').hide();
                $('.loginBoxBt').removeClass('active');
                $('#messageTab').find('input').val('');
            }
        })

        $('.getCod').on('click', function () {
            var _this = $(this);
            var _time;
            if (!_this.is('.active')) {
                var _newTime = 30;
                _this.addClass('active');
                _time = setInterval(function () {
                    if (_newTime == 0) {
                        _this.css('background', '#df3031');
                        _this.html('获取短信验证码');
                        _this.removeClass('active');
                        clearInterval(_time);
                    } else {
                        _this.css('background', '#999999');
                        _this.html(_newTime + 's后重新获取');
                        _newTime--;
                    }
                }, 1000)
            }
        })


    })


    //会员卡登录
    $(document).on("pageInit", "#page-cardlogin", function () {
//***********************************************************************************************************************************************************************************
//=======================================================================会员卡登录具体业务开始=============================================================================================
//***********************************************************************************************************************************************************************************
        var loginPage = {
            cinemaUl: $(".cinemaUl"),
            cityUl: $(".cityUl"),
            init: function () {
                this.initData();
                this.initPage();
                this.addEvent();
            },
            initData: function () {
                this.goUrl = getQueryString("goUrl");
                if (!(this.cinemas)) {
                    this.cinemas = JSON.parse(window.app.getCinemas()); //所有影院信息
                }
                this.initCitys();
            },
            initCitys: function () {
                this.citys = [];
                if (this.citys.length == 0) {
                    for (var i = 0; i < this.cinemas.length; i++) {
                        var cinema = this.cinemas[i];
                        if ($.inArray(cinema.city, this.citys) == -1) {
                            this.citys.push(cinema.city);
                        }
                    }
                }

            },
            initPage: function () {
                this.initCityUi();
                // this.initCinemaUI();
            },
            initCityUi: function () {
                this.cityUl.empty();
                var html = [];
                for (var i = 0; i < this.citys.length; i++) {
                    html.push("<li city='" + this.citys[i] + "'>" + this.citys[i] + "</li>");
                }
                this.cityUl.append(html.join(""));
            },
            initCinemaUI: function (city) {
                this.cinemaUl.empty();
                // if (!city) city = this.defaultCity;
                var html = [];
                for (var i = 0; i < this.cinemas.length; i++) {
                    var data = this.cinemas[i];
                    if (data.city == city) {
                        html.push('<li cinemaNo="' + data.cinemaNo + '">');
                        html.push('<h2>' + data.cinemaName + '</h2>');
                        html.push('<p>' + data.address + '</p>');
                        html.push('<div class="line"></div>');
                        html.push('<div class="rightImg"></div>');
                        html.push('</li>');
                    }
                }
                this.cinemaUl.append(html.join(""));

            },
            login: function () {
                var cinemaNo = this.cinema.cinemaNo;
                var userAccount = $(".carNumber").val();
                var userPassword = $(".psw").val();
                var user = JSON.parse(window.app.login(cinemaNo, userAccount, userPassword));

                if (!user) {
                    $('#page-cardlogin .cardloginBody #Tab p').html('账号密码错误').css('opacity', 1);
                } else {
                    $.router.loadPage(this.goUrl);
                }
            },
            changeCinema: function (cinemaNo) {
                for (var i = 0; i < this.cinemas.length; i++) {
                    var cinema = this.cinemas[i];
                    if (cinemaNo == cinema.cinemaNo) {
                        this.cinema = cinema;
                        break;
                    }
                }
            },
            addEvent: function () {
                //调用数字键盘
                $.zxfun.numberKeyBoard({
                        pageId: '#page-cardlogin',
                        inpuIdOne: '#Tab>.carNumber',
                        inpuIdTwo: '#Tab>.psw'
                    })
                    //
                $('.lodingCinema').on('click', function () {
                    $('.cinemaBox').fadeIn();

                })
                $('.cinemaBoxTop .close').on('click', function () {
                    $('.cinemaBox').fadeOut()
                })
                $(document).off('click', '#page-cardlogin .cinemaBox .cinemaBoxBt ul.cinemaUl li').on('click', '#page-cardlogin .cinemaBox .cinemaBoxBt ul.cinemaUl li', function () {
                    var _this = $(this);
                    $('.cardloginBoxTop  span').html(_this.find('h2').html());
                    $('.cinemaBox').fadeOut();

                    var cinemaNo = $(this).attr("cinemaNo");
                    loginPage.changeCinema(cinemaNo);

                })
                $('#page-cardlogin .cinemaBox .cinemaBoxBt ul.cityUl li').on('click', function () {
                    var _this = $(this);
                    $('.cityName').html(_this.html());
                    $('.cinemaBoxTop .downRed').show();
                    $('#page-cardlogin .cinemaBox .cinemaBoxBt ul.cityUl').fadeOut();
                    $('#page-cardlogin .cinemaBox .cinemaBoxBt ul.cinemaUl').fadeIn();

                    var city = $(this).attr("city");
                    loginPage.initCinemaUI(city);

                })
                $('.cinemaBoxTop .downRed').on('click', function () {
                    var _this = $(this);
                    $('.cityName').html('选择城市');
                    $('.cinemaBoxTop .downRed').hide();
                    $('#page-cardlogin .cinemaBox .cinemaBoxBt ul.cityUl').fadeIn();
                    $('#page-cardlogin .cinemaBox .cinemaBoxBt ul.cinemaUl').fadeOut();
                })

                $('#page-cardlogin  .carNumber,#page-cardlogin  .psw').blur(function () {
                    var _carNumber = $('#page-cardlogin  .carNumber').val();
                    var _psw = $('#page-cardlogin  .psw').val();
                    var _cinemaNo;
                    if (loginPage.cinema) {
                        _cinemaNo = loginPage.cinema.cinemaNo;
                    }
                    if (_carNumber.length != 0 && _psw.length != 0 && _cinemaNo) {
                        $('.loginBoxBt').addClass('active');
                        $('#page-cardlogin .cardloginBody #Tab p').css('opacity', 0);
                    } else {
                        $('.loginBoxBt').removeClass('active');
                        $('#page-cardlogin .cardloginBody #Tab p').html('请输入账号及密码').css('opacity', 1);
                    }
                })

                $(".loginBoxBt").on("click", function () {
                    var _this = $(this);
                    if (_this.is('.active')) {
                        loginPage.login();
                    }
                });

            }
        };

        loginPage.init();

//***********************************************************************************************************************************************************************************
//=======================================================================会员卡登录具体业务结束=============================================================================================
//***********************************************************************************************************************************************************************************
            });
    //打印测试
    $(document).on("pageInit", "#page-system", function () {
       $('.newToget').on('click',function(){
           location.href='newToGet.html';
       })
       $('.newTogetFilm').on('click',function(){
           location.href='grintTest.html';
       })
       $('.newTogetGoods').on('click',function(){
           location.href='grintTest.html?type=goods';
       })
    })

    $(document).on("pageInit", "#page-system", function () {

        $('#testPrintMovieTickets').on('click',function () {
            app.testPrintMovieTickets();
        })
        $('#testPrintTicket').on('click',function () {
            app.testPrintTicket();
        })
    })

    // 工作台登录
    $(document).on("pageInit", "#page-systemlogin", function () {
            //调用数字键盘
            $.zxfun.numberKeyBoard({
                pageId: '#page-systemlogin',
                inpuIdOne: '.sysLoginBox .count',
                inpuIdTwo: '.sysLoginBox .psw'
            })
            $('#page-systemlogin  .count,#page-systemlogin  .psw').blur(function () {
                var _phone = $('#page-systemlogin  .count').val();
                var _psw = $('#page-systemlogin  .psw').val();
                if (_phone.length != 0 && _psw.length != 0) {
                    $('.toLogin').addClass('active')
                } else {
                    $('.toLogin').removeClass('active')
                }
            })

        })
        //重新打票
    $(document).on("pageInit", "#page-newGet", function () {
        //调用数字键盘
        $.zxfun.numberKeyBoard({
                pageId: '#page-newGet',
                inpuIdOne: '#newGetInput'
            })
            //打开键盘
        $('#newGetInput').focusin(function () {
            $('.numKeyBoard').fadeIn();
        })
        $('.newGetSerch a').add('.searInfo').on('click', function () {
            $('.numKeyBoard').fadeOut();
        })
        var _liWidth = $('.searInfo ul li').outerWidth(true);
        var _liLength = $('.searInfo ul li').length;
        $('.searInfo ul').css('width',_liWidth*_liLength);
        $('.searchShow>p').find('span').html(_liLength);
        $('.preImg').on('click',function(){
            var _uloffsetLf=$('.searInfo ul').position().left;
            if(_uloffsetLf<0){
                var _liThis=$('.searInfo ul li.active');
                 _liThis.removeClass('active');
                 _liThis.prev().addClass('active');
                $('.searInfo ul').css('left',_uloffsetLf+_liWidth);
               $('.searchShow>p').find('em').html($('.searInfo ul li.active').index()+1);
            }
        })
         $('.nextImg').on('click',function(){
            var _uloffsetLf=$('.searInfo ul').position().left;
            var _maxLf=-(_liLength-1)*_liWidth;
             if(_uloffsetLf>_maxLf){
                 var _liThis=$('.searInfo ul li.active');
                 _liThis.removeClass('active');
                 _liThis.next().addClass('active');
                  $('.searInfo ul').css('left',_uloffsetLf-_liWidth);
                  $('.searchShow>p').find('em').html($('.searInfo ul li.active').index()+1);
             }
        })
    })
    //打印测试
    $(document).on("pageInit", "#page-grintTest", function () {
       var _type = $.zxfun.urlGet('type');
       if(_type=='goods'){
           $('.grintTestBody>p>span').html('卖品');
            $('.seatTop h1').html('卖品打印测试');
           $('#testPrint').on('click',function (e) {
               var count=$(e.target).text().replace('张','');
               app.testPrintTicket(count);
           })
       }else{
           $('#testPrint').on('click',function (e) {
               var count=$(e.target).text().replace('张','');
               app.testPrintMovieTickets(count);
           })
       }
        $('.imgBox span').on('click',function(){
            $('.imgBox span').removeClass('active');
            $(this).addClass('active');
        })
    })






    $.init();
})($)