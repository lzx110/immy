/**
 * 
 */
package com.immy.utils;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.httpclient.DefaultHttpMethodRetryHandler;
import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Sms {

	private static final Logger log = LoggerFactory.getLogger(Sms.class);

	private final static String sn = "SDK-BBX-010-13629";
	private final static String password = "556756";
	private final static String ENCODE = "UTF-8";

	/**
	 * 发送
	 * 
	 * @param mobile
	 *            电话号码
	 * @param context
	 *            内容
	 * @return
	 */
	public static int sendMsg(String mobile, String context) {

		PostUTF8Method postmethod = new PostUTF8Method(
				"http://sdk2.entinfo.cn/z_send.aspx");
		int sendStatus = 0;
		try {
			HttpClient httpclient = new HttpClient();
			// post请求
			NameValuePair[] postData = new NameValuePair[4];
			postData[0] = new NameValuePair("sn", sn);
			postData[1] = new NameValuePair("mobile", mobile);
			postData[2] = new NameValuePair("content", context + "[支付随心]");// ,
			postData[3] = new NameValuePair("pwd", password);

			Header header = new Header("Content-type",
					"application/x-www-form-urlencoded; charset=" + ENCODE);
			postmethod.setRequestHeader(header);

			postmethod.addParameters(postData);
			sendStatus = httpclient.executeMethod(postmethod);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			// 释放
			postmethod.releaseConnection();
		}

		return sendStatus;
	}

	public static int sendMsg1(String mobile, String context) {

		PostUTF8Method postmethod = new PostUTF8Method(
				"http://inter.ueswt.com/smsGBK.aspx");
		int sendStatus = 0;
		try {
			HttpClient httpclient = new HttpClient();
			// post请求
			NameValuePair[] postData = new NameValuePair[8];
			postData[0] = new NameValuePair("action", "send");
			postData[1] = new NameValuePair("userid", "75");
			postData[2] = new NameValuePair("account", "zhizhi");// ,
			postData[3] = new NameValuePair("password", "123456qwe");
			postData[4] = new NameValuePair("mobile", mobile);
			postData[5] = new NameValuePair("content", context);
			postData[6] = new NameValuePair("sendTime", "");
			postData[7] = new NameValuePair("extno", "");

			Header header = new Header("Content-type",
					"application/x-www-form-urlencoded; charset=" + ENCODE);
			postmethod.setRequestHeader(header);

			postmethod.addParameters(postData);
			sendStatus = httpclient.executeMethod(postmethod);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			// 释放
			postmethod.releaseConnection();
		}

		return sendStatus;
	}

	public static String sendHttpGet(String url, Map<String, String> valueList)
			throws Exception {
		HttpClient client = null;
		GetMethod method = null;
		NameValuePair[] valuePair = null;
		try {

			client = new HttpClient();
			client.getParams().setParameter(
					HttpMethodParams.HTTP_CONTENT_CHARSET, "GB2312");
			method = new GetMethod(url);
			method.addRequestHeader("Content-Type", "text/html; charset=UTF-8");
			method.getParams().setContentCharset("GB2312");
			valuePair = new NameValuePair[valueList.size()];

			int i = 0;
			for (Map.Entry<String, String> entry : valueList.entrySet())
				valuePair[i++] = new NameValuePair(entry.getKey(),
						entry.getValue());
			method.getParams().setParameter(
					HttpMethodParams.HTTP_CONTENT_CHARSET, "UTF-8");
			method.setQueryString(valuePair);
			client.executeMethod(method);
			return method.getResponseBodyAsString();
		} catch (Exception e) {
			throw new Exception(e);
		} finally {
			method.releaseConnection();
		}
	}

	public static int sendMsg2(String mobile, String context) {

		GetMethod getMethod = new GetMethod(
				"http://service.winic.org:8009/sys_port/gateway/?id=wangdj20010&pwd=wangdj20010&to="
						+ mobile + "&content=" + context);
		// 使用系统提供的默认的恢复策略
		getMethod.getParams().setParameter(HttpMethodParams.RETRY_HANDLER,
				new DefaultHttpMethodRetryHandler());
		int sendStatus = 0;
		try {
			HttpClient httpClient = new HttpClient();
			sendStatus = httpClient.executeMethod(getMethod);

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			// 释放
			getMethod.releaseConnection();
		}

		return sendStatus;
	}

	/**
	 * @param phones
	 * @param context
	 * @return
	 */
	public static void sendMsg(String[] phones, String context) {
		for (String phone : phones) {
			int status = sendMsg(phone, context);
			if (status != 200) {
				log.warn("定时短信发送任务,出错");
			}
		}
	}

}
