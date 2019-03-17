/// <reference path=”http://code.jquery.com/jquery-1.12.4.min.js” />
/*
create by daniel 2017/02/23
*/
var cityLenght = 0;//多少城市
var i = 0;
var Wx,T,RH;
//設置天氣圖
function SetWeather(CName) {
	/**
	 * Wx 天氣現象
		RH 濕度
		T 均溫
	*/
	var parameters = {
		Authorization : "CWB-D948CD74-D1E1-4026-B416-9A066C0F7122", //替換成自己的ID
		format:"JSON",
		locationName: CName,
		elementName:"T,RH,Wx",
		sort:"time"
	};

	$.ajax({
		method:'Get',
		data:parameters,
		url: WeekForcastUrl 
	}).done(function(data) {
		$("#CName").text(CName);
		T = data.records.locations[0].location[0].weatherElement.filter(x=>x.elementName ==='T')[0].time;
		Wx =data.records.locations[0].location[0].weatherElement.filter(x=>x.elementName ==='Wx')[0].time;
		RH =data.records.locations[0].location[0].weatherElement.filter(x=>x.elementName ==='RH')[0].time;
		Setforcast();
		i++;
	});
}

function compareDate(x){
	return new Date(x.startTime).getDate()==new Date(x.endTime).getDate();
}

function Setforcast() {
	$(".weatherNow").empty();
	$(".weatherWeek").empty();
	for(index = 0; index < 7; index++){
		if (index == 0) {
			NowWeather();
        }
	    weatherWeekDay(index);	
	}
}
//今天氣象
function NowWeather(forcast){
	//天氣平均溫度
	
	var averagetemp= T.filter(compareDate)[index];
	var weatherImgCode = Wx.filter(compareDate)[index].elementValue[1].value;
	var wetPercent = RH.filter(compareDate)[index].elementValue[0].value
	var $WeatherNow='<div class="weatherNowIcon">'+
						'<img src="'+weather_con[weatherImgCode][0]+'" />'+//天氣編號
					'</div>'+
					'<div class="weatherNowDetail">'+
						'<h2>'+weather_con[weatherImgCode][1]+'</h2>'+
						'<p>濕度：'+wetPercent+'%</p>'+
					'</div>'+
					'<div class="weatherNowTemp">'+
						'<p>'+parseInt(averagetemp.elementValue[0].value)+'&deg;</p>'+
					'</div>';
	$(".weatherNow").append($WeatherNow);							
}

function GetMMDDString(today){
	return (today.getMonth() + 1) + '/' + today.getDate()
}
//下一周氣象
function weatherWeekDay(index){
	//如果是下周的頭和尾
	var signoe='';
	if(index==0){
		signoe=' weatherWeekDayFirst';		
	}
	else if(index==6){
		signoe=' weatherWeekDayLast';		
	}
	//天氣平均溫度
	var averagetemp=T.filter(compareDate)[index];
	var weatherImgCode = Wx.filter(compareDate)[index].elementValue[1].value;
	var today = new Date(averagetemp.startTime);
	
	var $Weather='<div class="weatherWeekDay'+signoe+'">'+
						'<p>'+GetMMDDString(today)+'</p>'+
						'<div class="weatherWeekIcon">'+
							'<img src="'+weather_con[weatherImgCode][0]+'" />'+//天氣編號
						'</div>'+
						'<p>'+parseInt(averagetemp.elementValue[0].value)+'&deg;</p>'+
					'</div>';
	$(".weatherWeek").append($Weather);							
}
//計算有幾個城市
(function () {
    $.each(word[0].City, function (index, value) {
        cityLenght++;
    });
})();
//每一秒跑一張圖 大於目前城鎮數量從0開始算
function ShowWaeather() {
    if (i>=cityLenght) {
        i = 0;
    }
    $("#todayWeather").empty();
    $("#otherdayWeather").empty();
    SetWeather(word[0].City[i].CName);
    setTimeout("ShowWaeather()", 5000);
};
ShowWaeather();
