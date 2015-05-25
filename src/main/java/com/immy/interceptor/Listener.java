package com.immy.interceptor;

import java.net.Inet6Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.Enumeration;
import java.util.Properties;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.MDC;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

public class Listener implements ServletContextListener{

	private static WebApplicationContext springContext;
	
	public static String ip;
	
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		
	}

	public void contextInitialized(ServletContextEvent arg0) {
		springContext = WebApplicationContextUtils.getWebApplicationContext(arg0.getServletContext());
		ip = getLocalIP();
		MDC.put("ip", ip);
	}
	
	public String getLocalIP(){
		String ip = "";
		try {
			if(getSystem().startsWith("Windows")){
				InetAddress addr = InetAddress.getLocalHost();
				ip = addr.getHostAddress().toString();
			}else{
		        try {
		            Enumeration<?> e1 = (Enumeration<?>) NetworkInterface.getNetworkInterfaces();
		            while (e1.hasMoreElements()) {
		                NetworkInterface ni = (NetworkInterface) e1.nextElement();
		                if (!ni.getName().equals("eth0")) {
		                    continue;
		                } else {
		                    Enumeration<?> e2 = ni.getInetAddresses();
		                    while (e2.hasMoreElements()) {
		                        InetAddress ia = (InetAddress) e2.nextElement();
		                        if (ia instanceof Inet6Address)
		                            continue;
		                        ip = ia.getHostAddress();
		                    }
		                    break;
		                }
		            }
		        } catch (SocketException e) {
		            e.printStackTrace();
		            System.exit(-1);
		        }
			}
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
        
        return ip;
    }
	
	public String getSystem() {
		Properties props = System.getProperties();
		/*props.getProperty("os.name");
		props.getProperty("os.arch");
		props.getProperty("os.version");*/
		return props.getProperty("os.name");
	}
	
	public static ApplicationContext getApplicationContext() {
        return springContext;
    }

}
