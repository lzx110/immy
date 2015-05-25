package com.immy.utils;

import org.apache.commons.httpclient.methods.PostMethod;

/**
 */
public class PostUTF8Method extends PostMethod {
	
	public PostUTF8Method(String url){
		super(url);
	}
	
	@Override
	public String getRequestCharSet(){
		return "UTF-8";
	}

}
