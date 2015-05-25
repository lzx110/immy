package com.immy.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FilenameUtils;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.jpos.iso.ISOException;
import org.jpos.iso.ISOField;
import org.jpos.iso.ISOMsg;
import org.jpos.util.NameRegistrar.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.JsonArray;
import com.immy.service.ChannelService;
import com.immy.utils.Utils;

/**
 * 请求分发器
 * @author Administrator
 *
 */
@Controller
public class RequestDispatcherController {

	private static final Logger log = LoggerFactory.getLogger(RequestDispatcherController.class);
	
	@Autowired
	public ChannelService channelService;
	
	@ResponseBody
	@RequestMapping(value="request")
	public Object accept(HttpServletRequest request,HttpServletResponse response) throws NotFoundException, ISOException, IOException{
		Map<String,String[]> reqMap = request.getParameterMap();
		ISOMsg reqMsg = new ISOMsg();
		ISOMsg resMsg = new ISOMsg();
		String sdata = "";
		for(String value:reqMap.keySet()){
			try {
				String v = reqMap.get(value)[0];
				/*if("0".equals(value)){
					reqMsg.setMTI(v);
					continue;
				}*/
				reqMsg.set(value, v);
			} catch (NumberFormatException e) {
				log.error(e.getMessage());
			} catch (Exception e) {
				log.error(e.getMessage());
			}

		}
		Map<Integer, ISOField> resMap = reqMsg.getChildren();
		for (Integer key : resMap.keySet()) {
			sdata+=reqMsg.getString(key);
		}
		log.info(Utils.dump(reqMsg));
		try {
			String mti = reqMsg.getString(3);
			if("190918".equals(mti)){//商户注册
				resMsg = channelService.register(reqMsg);
			}else if("190928".equals(mti)){
				resMsg = channelService.login(reqMsg);
			}else if("190938".equals(mti)){
				resMsg = channelService.getAllProductType(resMsg);
			}else if ("190948".equals(mti)){
				resMsg = channelService.getProductByTypeId(resMsg);
			}
			
		} catch (Exception e) {
				e.printStackTrace();
				log.error(e.getMessage());
			}
		
		return channelService.convert(resMsg);
	}
}