自己動手做簡單顯示一周天氣預報小程式

![alt text](https://az787680.vo.msecnd.net/user/九桃/e5d32e1d-950b-4dfa-9abc-eae333a7ae6c/1495339070_24073.PNG)

目前可以撈到天氣資訊的平台有:

* Yahoo weather API:
每2~3小時更新一次天氣資料
https://developer.yahoo.com/weather/

* 氣象資料開放平台:
每15~30分更新一次天氣資料
http://opendata.cwb.gov.tw/index;jsessionid=8C3566791736071759401AAEB07A2455

<br/>

這次我是選擇使用Yahoo weatherAPI，搭配使用JQuery和HTML,Css前端來實現

有三個主要呈現的資訊

- 一周每日天氣(圖片,文字)
- 哪個縣市
- 平均溫度

最核心的js程式 WeatherScript.JS
```javascript
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
```
每五秒會一個縣市(會從cityData.js中讀取word陣列)
```javascript
var word = [
   {
	   Area: 'TW', City: [
		  { ID: '20070568',CName: '台北', EName: 'Taipei' },
	      { ID: '2347336', CName: '宜蘭', EName: 'Yilan' },
		  { ID: '2306206', CName: '嘉義', EName: 'Chiayi' },
		  { ID: '2306190', CName: '台東', EName: 'Taitung' },
		  { ID: '2306181', CName: '台中', EName: 'Taichung' }
	   ]
   }
];
```


```javascript
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
```

再去呼叫 https://query.yahooapis.com/v1/public/yql

    其中要帶兩個主要參數
 * q:查詢資料的語句
 * format:回傳資料型態:JSON或XML
 
在會將資料傳送回來我們在依照他給的資料來綁定

----

## **2019/03/17 更新**

我發現Yahoo weather API 轉移了

> Important EOL Notice: As of Thursday, Jan. 3, 2019, the weather.yahooapis.com and query.yahooapis.com for Yahoo Weather API will be retired. 
To continue using our free Yahoo Weather APIs, use https://weather-ydn-yql.media.yahoo.com/forecastrss. Follow below instructions to get credentials and onboard to this free Yahoo Weather API service.

所以我改成使用

* 氣象資料開放平台: 每15~30分更新一次天氣資料http://opendata.cwb.gov.tw/index;jsessionid=8C3566791736071759401AAEB07A2455


使用前須先申請 [授權碼]([http://example.net/](https://opendata.cwb.gov.tw/devManual/insrtuction#getUserAuthkeyAnchor))  並將授權碼填入 `Authorization` 參數中



``` javascript
var parameters = {
	Authorization : "{替換成自己的ID}", //替換成自己的ID
	format:"JSON",
	locationName: CName,
	elementName:"T,RH,Wx",
	sort:"time"
};
```

![alt text](https://az787680.vo.msecnd.net/user/%E4%B9%9D%E6%A1%83/e5d32e1d-950b-4dfa-9abc-eae333a7ae6c/1552788030_83481.PNG)



[天氣API文件](https://opendata.cwb.gov.tw/opendatadoc/CWB_Opendata_API_V1.2.pdf) 

[天氣參數對照表](https://opendata.cwb.gov.tw/opendatadoc/MFC/D0047.pdf) 


因為氣象資料開放平台有提供濕度 所以我將他呈現在當天的資訊上


