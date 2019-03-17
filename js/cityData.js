var word = [
   {
	   Area: 'TW', City: [
		  { CName: '臺北市', EName: 'Taipei' },
	      { CName: '宜蘭縣', EName: 'Yilan' },
		  { CName: '嘉義縣', EName: 'Chiayi' },
		  { CName: '臺東縣', EName: 'Taitung' },
		  { CName: '臺中市', EName: 'Taichung' }
	   ]
   }
];

var WeekForcastUrl = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?';

var WeekChinese={
	"Mon":"一",
	"Tue":"二",
	"Wed":"三",
	"Thu":"四",
	"Fri":"五",
	"Sat":"六",
	"Sun":"日"
}

var weather_con = {
	"01":["weather_sunny.png","晴天"],
	"02":["weather_sunny.png","晴天"],
	"03":["weather_cloudy.png","多雲"],
	"04":["weather_cloudy.png","多雲"],
	"05":["weather_cloudy.png","多雲"],
	"06":["weather_cloudy.png","多雲"],
	"06":["weather_rain.png","雨天"],
	"07":["weather_rain.png","雨天"],
	"08":["weather_rain.png","雨天"],
	"09":["weather_rain.png","雨天"],
	"10":["weather_rain.png","雨天"],
	"11":["weather_rain.png","雨天"],
	"12":["weather_rain.png","雨天"],
	"13":["weather_rain.png","雨天"],
	"14":["weather_rain.png","雨天"],
	"15":["weather_rain.png","雨天"],
	"16":["weather_rain.png","雨天"],
	"17":["weather_rain.png","雨天"],
	"18":["weather_rain.png","雨天"]
}