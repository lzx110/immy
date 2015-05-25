package com.immy.utils;


import java.io.IOException;
import java.util.Map;

import org.apache.commons.httpclient.DefaultHttpMethodRetryHandler;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;

public class HttpClientUtil {
	 
	public static String getHTTP(String URL)
	{
		String responseMsg="";
		
		HttpClient httpClient=new HttpClient();
		
		GetMethod getmethod=new GetMethod(URL);
		
		getmethod.getParams().setParameter(HttpMethodParams.RETRY_HANDLER, new DefaultHttpMethodRetryHandler());
		
		try {
			httpClient.executeMethod(getmethod);
			byte[] responseBody =getmethod.getResponseBody();
			
			responseMsg=new String(responseBody);
			
		} catch (HttpException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}finally
		{
			getmethod.releaseConnection();
		}
		return responseMsg;
	}

 
	public static String postHTTP(String URL,String uid,String pwd,String tos,String content,String otime)
	{
		String ResultStrMsg="";
		
		 HttpClient httpClient=new HttpClient();
		 httpClient.getParams().setContentCharset("GB2312");
		 
		 PostMethod method=new PostMethod(URL);
		 
		 
		 NameValuePair[] dataparam={
		 	 new NameValuePair("id",uid),
		 	 new NameValuePair("pwd",pwd),
		 	new NameValuePair("to",tos),
		 	new NameValuePair("content",content),
		 	new NameValuePair("time",otime)
		 }; 
		 
		 method.addParameters(dataparam);
		 

		 try {
			httpClient.executeMethod(method);
			ResultStrMsg = method.getResponseBodyAsString().trim();
			System.out.println("HTTP POST  "+ResultStrMsg);
		} catch (HttpException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally
		{
			method.releaseConnection();
		}
		return ResultStrMsg;
	}
	
	public static String httpSend(String url,Map<String, String> params){
		String ResultStrMsg="";
		
		 HttpClient httpClient=new HttpClient();
		 httpClient.getParams().setContentCharset("utf-8");
		 
		 PostMethod method=new PostMethod(url);
		 
		 
		 NameValuePair[] dataparam={
				 new NameValuePair("service",params.get("service") ),
				 new NameValuePair("partner",params.get("partner") ),
				 new NameValuePair("_input_charset",params.get("_input_charset") ),
				 new NameValuePair("sign_type",params.get("sign_type") ),
				 new NameValuePair("sign",params.get("sign") ),
				 new NameValuePair("timestamp",params.get("timestamp") ),
				 new NameValuePair("method",params.get("method") ),
				 new NameValuePair("qrcode",params.get("qrcode") ),
				 new NameValuePair("biz_type",params.get("biz_type") ),
				 new NameValuePair("biz_data",params.get("biz_data") ),
		 }; 
		 
		 method.addParameters(dataparam);
		 

		 try {
			httpClient.executeMethod(method);
			ResultStrMsg = method.getResponseBodyAsString().trim();
			System.out.println("HTTP POST  "+ResultStrMsg);
		} catch (HttpException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}finally
		{
			method.releaseConnection();
		}
		return ResultStrMsg;
	}
}
