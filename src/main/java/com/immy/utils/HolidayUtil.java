package com.immy.utils;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

public class HolidayUtil {
	
	static Date nextDay(Date date, int period){
		Date day = null;
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(calendar.DATE, period);
		day = calendar.getTime();
		return day;
	}
	
	static Boolean find(JSONObject holidays, Date nextDay){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
		String monthStr = sdf.format(nextDay);
		JSONObject month = holidays.getJSONObject(monthStr);
		
		sdf = new SimpleDateFormat("dd");
		String dayStr = sdf.format(nextDay);
		String day = month.getString(dayStr);
		if("2".equals(day)|| "1".equals(day)){
			return false;
		}
		return true;
	}
	
	public static Date settleDate(int period){
		String a = "{\"201412\":{\"06\":\"1\",\"07\":\"1\",\"13\":\"1\",\"14\":\"1\",\"20\":\"1\",\"21\":\"1\",\"27\":\"1\",\"28\":\"1\"},\"201501\":{\"01\":\"2\",\"02\":\"1\",\"03\":\"1\",\"10\":\"1\",\"11\":\"1\",\"17\":\"1\",\"18\":\"1\",\"24\":\"1\",\"25\":\"1\",\"31\":\"1\"},\"201502\":{\"01\":\"1\",\"07\":\"1\",\"08\":\"1\",\"14\":\"1\",\"18\":\"2\",\"19\":\"2\",\"20\":\"2\",\"21\":\"1\",\"22\":\"1\",\"23\":\"1\",\"24\":\"1\"},\"201503\":{\"01\":\"1\",\"07\":\"1\",\"08\":\"1\",\"14\":\"1\",\"15\":\"1\",\"21\":\"1\",\"22\":\"1\",\"28\":\"1\",\"29\":\"1\"},\"201504\":{\"04\":\"1\",\"05\":\"2\",\"06\":\"1\",\"11\":\"1\",\"12\":\"1\",\"18\":\"1\",\"19\":\"1\",\"25\":\"1\",\"26\":\"1\"},\"201505\":{\"01\":\"2\",\"02\":\"1\",\"03\":\"1\",\"09\":\"1\",\"10\":\"1\",\"16\":\"1\",\"17\":\"1\",\"23\":\"1\",\"24\":\"1\",\"30\":\"1\",\"31\":\"1\"},\"201506\":{\"06\":\"1\",\"07\":\"1\",\"13\":\"1\",\"14\":\"1\",\"20\":\"2\",\"21\":\"1\",\"22\":\"1\",\"27\":\"1\",\"28\":\"1\"},\"201507\":{\"04\":\"1\",\"05\":\"1\",\"11\":\"1\",\"12\":\"1\",\"18\":\"1\",\"19\":\"1\",\"25\":\"1\",\"26\":\"1\"},\"201508\":{\"01\":\"1\",\"02\":\"1\",\"08\":\"1\",\"09\":\"1\",\"15\":\"1\",\"16\":\"1\",\"22\":\"1\",\"23\":\"1\",\"29\":\"1\",\"30\":\"1\"},\"201509\":{\"05\":\"1\",\"06\":\"1\",\"12\":\"1\",\"13\":\"1\",\"19\":\"1\",\"20\":\"1\",\"26\":\"1\",\"27\":\"2\"},\"201510\":{\"01\":\"2\",\"02\":\"1\",\"03\":\"1\",\"04\":\"1\",\"05\":\"1\",\"06\":\"1\",\"07\":\"1\",\"11\":\"1\",\"17\":\"1\",\"18\":\"1\",\"24\":\"1\",\"25\":\"1\",\"31\":\"1\"},\"201511\":{\"01\":\"1\",\"07\":\"1\",\"08\":\"1\",\"14\":\"1\",\"15\":\"1\",\"21\":\"1\",\"22\":\"1\",\"28\":\"1\",\"29\":\"1\"},\"201512\":{\"05\":\"1\",\"06\":\"1\",\"12\":\"1\",\"13\":\"1\",\"19\":\"1\",\"20\":\"1\",\"26\":\"1\",\"27\":\"1\"}}";
		JSONObject holidays = (JSONObject) JSONArray.parse(a);
		Boolean found = false;
		Date nextDay = new Date();
		for(int i=0;i<period;i++){
			if(nextDay != null){
				nextDay =nextDay(nextDay, 1);
				found = false;
			}else{
				nextDay =nextDay(new Date(), 1);
			}
			while(!found){
					found = find(holidays, nextDay);
					if(!found){
						nextDay = nextDay(nextDay, 1);
					}
			}
		}
		return nextDay;
	}
	
	public static void main(String[] args) {
		Date day = settleDate(2);
		System.out.println("result=============="+day);
		
	}

}
