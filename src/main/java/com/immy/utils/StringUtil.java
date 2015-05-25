package com.immy.utils;

public class StringUtil {
	
	/**
	 * 字符串左补0
	 * */
	public static String stringFillLeftZero(String str, int len) {
		if (str.length() < len) {
			StringBuffer sb = new StringBuffer(len);
			for (int i = 0; i < len - str.length(); i++)
				sb.append('0');
			sb.append(str);
			return new String(sb);
		} else
			return str;
	}
	
	
	 
  /**
   * 
   * @param obj
   * @return String
   * @obj==null,或obj是空字符串，就返回参数ifEmptyThen，否则返回obj.toString。
   */

  public static String ifEmptyThen(Object obj,String ifEmptyThen) {
    String ret="";
    if(obj==null||String.valueOf(obj)==""){
      ret=ifEmptyThen;
    }else{
      ret=obj.toString();
    }
    return ret;
  }
  
	
}
