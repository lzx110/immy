package com.immy.interceptor;

import java.net.InetAddress;
import java.net.UnknownHostException;

import org.aopalliance.intercept.MethodInvocation;
import org.apache.commons.logging.Log;
import org.apache.log4j.Logger;
import org.apache.log4j.MDC;
import org.springframework.aop.interceptor.CustomizableTraceInterceptor;

public class TraceInterceptor extends CustomizableTraceInterceptor {

	private static final long serialVersionUID = 287162721460370957L;
	protected static Logger logger4J = Logger.getLogger(TraceInterceptor.class.getSimpleName());

	@Override
	protected void writeToLog(Log logger, String message, Throwable ex) {
		if (ex != null) {
			logger4J.error(MDC.get("ip")+message, ex);
		} else {
			logger4J.debug(message);
		}
	}

	@Override
	protected boolean isInterceptorEnabled(MethodInvocation invocation, Log logger) {
		return true;
	}
	public static void main(String[] args) {
		try {
			InetAddress addr = InetAddress.getLocalHost();
			MDC.put("ip", addr.getHostAddress().toString());
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
		Logger.getRootLogger().error("abc");
		
	}
}