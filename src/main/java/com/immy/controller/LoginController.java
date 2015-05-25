package com.immy.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.hatchet.entity.bo.AjaxMessage;
import com.hatchet.entity.bo.Constant;
import com.hatchet.po.HatchetSystemRole;
import com.hatchet.po.HatchetSystemUser;
import com.immy.beans.User;

@Controller
public class LoginController {

	@RequestMapping(value="/welcome")
	public ModelAndView welcome(String msg,String loginName) throws UnsupportedEncodingException{
		AjaxMessage message = new AjaxMessage();
		if (msg != null) {
			msg = URLDecoder.decode(msg, "utf8");
			message.setValue(msg);
		}
		if(loginName != null){
			loginName = URLDecoder.decode(loginName, "utf8");
			message.setContent(loginName);
		}
		return new ModelAndView("login","MSG",message);
	}
	@RequestMapping(value="/login")
	public ModelAndView login(User user,HttpSession session){
		AjaxMessage message = new AjaxMessage();
		Map<String, String> map = new HashMap<String, String>();
		message.setObj(user);
		String loginName = user.getLoginName();
		String passwd = user.getPasswd();
		if(StringUtils.isEmpty(loginName)){
			return null;
		}
		if(StringUtils.isEmpty(passwd)){
			return null;
		}
		Subject us = SecurityUtils.getSubject();
		UsernamePasswordToken token= new UsernamePasswordToken(user.getLoginName(),
				com.hatchet.utils.security.SecurityUtils.EncoderByMd5(user.getPasswd()));
		us.login(token);
		return new ModelAndView(new RedirectView("dashboard.app"));
	}
	@RequestMapping(value="/dashboard")
	public ModelAndView dashboard(){
		User user = (User)SecurityUtils.getSubject().getSession().getAttribute(Constant.USER_SESSION_KEY);
		Map loginMap = new HashMap();
		loginMap.put("user", user);
		return new ModelAndView("index","loginMap",loginMap);
	}
}
