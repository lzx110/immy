package com.immy.server;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.jpos.q2.Q2;

public class Run implements ServletContextListener{

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
//		try {
//			//String dir = Run.class.getResource("/server").getPath();
//			String d2 = Thread.currentThread().getContextClassLoader().getResource("").getPath()+"server";
//			new Q2(d2).start();
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
	}

}
