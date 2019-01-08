var USERAGENT = '', IEversion = 0;
var Safariversion=0;
var ua = navigator.userAgent.toLowerCase();
if(window.openDatabase){
	if(ua.match(/version\/([\d.]+)/)!=null && ua.match(/version\/([\d.]+)/)!='null'){
		Safariversion = ua.match(/version\/([\d.]+)/)[1];
	}
}

function ieversion(){
	USERAGENT = navigator.userAgent.toLowerCase();
	USERAGENT.replace(/compatible;\smsie\s(\d+)\.\d+;.+/ig, function($0, $1) {
		IEversion = parseInt($1);
	});
	if(IEversion ==0 && USERAGENT.indexOf('trident') !== -1) {
		USERAGENT.replace(/mozilla\/\d+\.\d+\s\(windows.*?rv\:(\d+)\.\d+\) like gecko/ig, function($0, $1) {
			IEversion = parseInt($1);
		});
	}
	return IEversion;
}
ieversion();


var De = Times();
var This_time = new Date();
var This_year = This_time.getFullYear();
var This_month = This_time.getMonth() +1;
var curYear = This_year;
var curMonth = This_month;		

function creatCe(el,datajson,Years,Months,Days){
	var d = new Date(Years,Months,0);

  var Days = d.getDate();
  var d = new Date(Years,Months-1,0);
  var Week = d.getDay();
  var H = '';
  //上个月天数
  var YMonDay = d.getDate() - (Week-1);
  var Week_nul = 0;
  if(Week >0){
    for(i=0; i<Week; i++){
        H += '<li class="n_u">'+YMonDay+'</li>';
        YMonDay ++;
        Week_nul ++;
        if(Week_nul >=7) Week_nul = 0;
    }
  }
  
  
  for(i=1; i<=Days; i++){
      H += '<li id="cal_day_'+i+'">'+i+'</li>';
      Week_nul ++;
      if(Week_nul >=7) Week_nul = 0;
  }
  if(Week_nul >0){
      for(i=1; i<= 7-Week_nul; i++){
          H += '<li class="n_u">'+i+'</li>';
      }
  }
  el.html(H);	    
  
  if(curYear == De.Y && curMonth == De.M){
      $('#cal_day_'+De.D).addClass('u_u');
  }

  for(var i=0;i<datajson.length;i++){
  	var data=datajson[i];
  	var day=Number(data.date.split('-')[2]);
  	$('#cal_day_'+day).addClass('on');
  	$('#cal_day_'+day).data("text", data.text)
  	$('#cal_day_'+day).click(function(){
  		alert($(this).data("text"))
  	})
  }
}

function Times(Val) {
    var Times = new Date(); //中国标准时间
    if(Val) {
		
		Val = Val.toString();
		if(/^[0-9]+$/.test(Val)){//如果是纯数字 则对其进行处理
			if(Val.length ==10){//如果位数刚好10位则追加为13位
				Val = parseInt(Val);
				Val = Val * 1000;
			}else{//转int类型
				Val = parseInt(Val);
			}
		}else{//非数字型Y-m-d 格式化为 Y/m/d
			Val = Val.toString();
			Val = Val.replace(/-/g,'/');
		}
		
        Times = new Date(Val);
    }
    var D = {
        Y: Times.getFullYear(), //年
        M: Times.getMonth() + 1, //月
        D: Times.getDate(), //日
        H: Times.getHours(), //时
        I: Times.getMinutes(), //分
        S: Times.getSeconds(), //秒,
        W: Times.getDay(), //周(原生)
        timestamp: 0
    };
	D.timestamp = Times_to_Timestamp(D.Y, D.M, D.D, D.H, D.I, D.S);
    return D;
}

function Times_to_Timestamp(y, m, d, h, i, s) {
	
	if(!arguments.length) {
		//如果没有传入则调当前系统时间
		var dt = Times();
		y = dt.Y;
		m = dt.M;
		d = dt.D;
		h = dt.H;
		i = dt.I;
		s = dt.S;
	} else {
		if(y) y = y.toString();
		if(m) m = m.toString();
		if(d) d = d.toString();
		if(h) h = h.toString();
		if(i) i = i.toString();
		if(s) s = s.toString();
	}

	if(y && (y.indexOf('-') != -1 || y.indexOf('/') != -1)) {

		var dt = Times(y);
		y = dt.Y;
		m = dt.M;
		d = dt.D;
		h = dt.H;
		i = dt.I;
		s = dt.S;
	}
	var x = '-';
	if(IEversion || Safariversion) {
		x = '/';
	}
	var t = (y + x + (m ? m : '01') + x + (d ? d : '01') + ' ' + (h ? h : '00') + ':' + (i ? i : '00') + ':' + (s ? s : '00'));
	return Math.round(Date.parse(t) / 1000);
}