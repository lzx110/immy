package com.immy.service;

import java.util.ResourceBundle;

import org.springframework.stereotype.Service;

import com.hatchet.entity.bo.FtpArgs;

/**
 * 获取公共配置文件服务
 * @author admin
 *
 */
@Service
public class PropertiesService {

	/* (non-Javadoc)
	 */
	
	public FtpArgs getImageFtpArgs(){
		ResourceBundle resource =ResourceBundle.getBundle("ftp");
		FtpArgs args = new FtpArgs();
		args.host=resource.getString("image.host");
		args.port=resource.getString("image.port");
		args.passwd=resource.getString("image.pw");
		args.user=resource.getString("image.user");
		args.bufferSize=resource.getString("ftp.bufferSize");
		args.path = resource.getString("image.rootpath");
	
		args.webPort = resource.getString("image.web.port");
		args.webHost = resource.getString("image.web.host");
		return args;
	}
}
