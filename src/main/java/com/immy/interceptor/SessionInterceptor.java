package com.immy.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.hatchet.entity.bo.Constant;


public class SessionInterceptor extends HandlerInterceptorAdapter {  
	@Override  
     public  boolean preHandle(HttpServletRequest request,  
            HttpServletResponse response, Object handler) throws Exception {
        String url = request.getRequestURI();  
//        if(url.contains("remote/"))
//        	return true;
        //Session session = SecurityUtils.getSubject().getSession();
        HttpSession session = request.getSession();
        if(url.endsWith("welcome.jhtml") || url.endsWith("login.jhtml")){
        	if(session != null && session.getAttribute(Constant.USER_SESSION_KEY) != null){
        		response.sendRedirect(request.getContextPath() + "/dashboard.jhtml");
        		//request.getRequestDispatcher(request.getContextPath()+ "/dashboard.jhtml").forward(request, response);
        		return false;
        	}
        	else return true;
        }
        if(url.endsWith("getSystemConfig.jhtml") || url.endsWith("test_mail.jhtml") ||
        		url.endsWith("getKaptchaImage.jhtml") || url.endsWith("validateKaptchaImage.jhtml"))
            return true;
        //HttpSession session = request.getSession();
        if(session != null && session.getAttribute(Constant.USER_SESSION_KEY) != null)
            return true;
        //SecurityUtils.getSubject().logout();
        
        if (request.getHeader("x-requested-with") != null  
                && request.getHeader("x-requested-with")  
                        .equalsIgnoreCase("XMLHttpRequest"))//如果是ajax请求响应头会有，x-requested-with；  
        {  
            response.setHeader("sessionstatus", "timeout");//在响应头设置session状态 
            return false;
        }
        
        response.sendRedirect(request.getContextPath() + "/welcome.jhtml");
        return false;
    }
	
	/*@Override  
    public void postHandle(HttpServletRequest request,HttpServletResponse response,Object handler,ModelAndView modelAndView) throws Exception{
		if(null !=modelAndView){
			Map<String,Object> map = modelAndView.getModel();
			for(Object o:map.values()){
				if(null != o){
					for(Field field:o.getClass().getDeclaredFields()){
						field.setAccessible(true);
						System.out.println(field.getType());
						if(field.getType() == Date.class){
							System.out.println("----------postHandle----------------");
							System.out.println(new SimpleDateFormat("yyyy-MM-dd").format(field.get(o)));
						}
					}
				}
				
			}
		}
		
        super.postHandle(request, response, handler, modelAndView) ;  
    }  */
}
