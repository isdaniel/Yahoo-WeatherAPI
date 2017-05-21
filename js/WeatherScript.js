/// <reference path=”http://code.jquery.com/jquery-1.12.4.min.js” />
/*
create by daniel 2017/02/23
*/
var cityLenght = 0;//多少城市
var i = 0;
//設置天氣圖
function SetWeeaTher(woeid) {
    //將locationQuery不要轉換
    var locationQuery = escape("select * from weather.forecast where woeid ='" + woeid + "' and u='c'");
    $.getJSON("https://query.yahooapis.com/v1/public/yql?q=" + locationQuery + "&format=json",
        function (data) {
            var forcast = data.query.results.channel.item.forecast;//本周天氣
            var cityName = word[0].City[i].CName//城市
			$("#CName").text(cityName);
			Setforcast(forcast);
			i++;
        });
}

function Setforcast(forcast) {
	$(".weatherNow").empty();
	$(".weatherWeek").empty();
	for(index = 0; index < 7; index++){
		if (index == 0) {
			NowWeather(forcast[index]);
        }
		weatherWeekDay(forcast[index],index);	
	}
}
//今天氣象
function NowWeather(data){
	//天氣平均溫度
	var averagetemp=(parseInt(data.high)+parseInt(data.low))/2;
	var $WeatherNow='<div class="weatherNowIcon">'+
						'<img src="images/'+weather_con[data.code][0]+'" />'+//天氣編號
					'</div>'+
					'<div class="weatherNowDetail">'+
						'<h2>'+weather_con[data.code][1]+'</h2>'+
						'<p>'+data.low+'&deg; / '+data.high+'&deg;</p>'+//最高  最低溫
					'</div>'+
					'<div class="weatherNowTemp">'+
						'<p>'+parseInt(averagetemp)+'&deg;</p>'+
					'</div>';
	$(".weatherNow").append($WeatherNow);							
}
//下一周氣象
function weatherWeekDay(data,index){
	//如果是下周的頭和尾
	var signoe='';
	if(index==0){
		signoe=' weatherWeekDayFirst';		
	}
	else if(index==6){
		signoe=' weatherWeekDayLast';		
	}
	//天氣平均溫度
	var averagetemp=(parseInt(data.high)+parseInt(data.low))/2;
	var $Weather='<div class="weatherWeekDay'+signoe+'">'+
						'<p>'+WeekChinese[data.day]+'</p>'+//星期幾
						'<div class="weatherWeekIcon">'+
							'<img src="images/'+weather_con[data.code][0]+'" />'+//天氣編號
						'</div>'+
						'<p>'+parseInt(averagetemp)+'&deg;</p>'+
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
    SetWeeaTher(word[0].City[i].ID);
    setTimeout("ShowWaeather()", 5000);
};
ShowWaeather();
