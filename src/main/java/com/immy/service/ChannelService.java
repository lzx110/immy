package com.immy.service;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLConnection;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.swing.ImageIcon;

import net.sf.json.JSONArray;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.RandomUtils;
import org.jpos.iso.ISOException;
import org.jpos.iso.ISOField;
import org.jpos.iso.ISOMsg;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hatchet.entity.bo.FtpArgs;
import com.hatchet.entity.vo.AppPaymentVO;
import com.hatchet.entity.vo.AppPosTerminalVO;
import com.hatchet.po.HatchetCardBin;
import com.hatchet.po.HatchetIssBank;
import com.hatchet.po.HatchetMerchant;
import com.hatchet.po.HatchetMerchantImage;
import com.hatchet.po.HatchetOrderPayment;
import com.hatchet.po.HatchetOrderPaymentImage;
import com.hatchet.po.HatchetPosTerminal;
import com.hatchet.po.HatchetSystemLookupCde;
import com.hatchet.utils.net.FtpUtil;
import com.immy.beans.Product;
import com.immy.beans.ProductType;
import com.immy.beans.User;
import com.immy.beans.UserProduct;
import com.immy.dao.UserProductDAO;
import com.immy.utils.Dao;
import com.immy.vo.ProductVO;
import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;

/**
 * 转发服务
 * 
 * @author Administrator
 *
 */
@Service
public class ChannelService {

	private static final Logger log = LoggerFactory.getLogger(ChannelService.class);

	@Resource
	private Dao dao;
	@Autowired
	public PropertiesService  propertiesService;
	

	/**
	 * 注册
	 */
	public ISOMsg register(ISOMsg isoReq ) {
		try{
		String phone = isoReq.getString("1");
		String passwd = isoReq.getString("8");
		String selectSql = "select * from user  where phone =? and status ='70A'";
		User user1 = dao.findFirst(User.class, selectSql, new Object[] { isoReq.getString("1") });
		if(user1!=null){
			isoReq.set("39","用户已被注册");
			return isoReq;
		}
		User user = new User();
		user.setId(com.hatchet.utils.lang.StringUtils.randomUUID());
		user.setCreateTime(new Date());
		user.setPhone(phone);
		user.setPasswd(passwd);
		user.setSource("WEB");
		user.setStatus("70A");
			String sql = "insert into user(id,phone,passwd,source,create_time,status) values(?,?,?,?,?,?)";
			dao.update(sql, new Object[] { user.getId(), user.getPhone(),user.getPasswd(),user.getSource(),user.getCreateTime(),user.getStatus() });
			isoReq.set("39","00");
		}catch (Exception e) {
			e.printStackTrace();
		}
		return isoReq;
	}

	/**
	 * 登录
	 */
	public ISOMsg login(ISOMsg isoReq) {
		try {
			String sql = "select * from user  where phone =? and PASSWD =? and source =? and status ='70A' ";
			User user = dao.findFirst(User.class, sql, new Object[] { isoReq.getString(1),isoReq.getString(8),"APP"});
			if (null != user) {
				isoReq.set(39, "00");
			} else {
				isoReq.set(39, "ZZ");
			}
		} catch (Exception e) {
			e.printStackTrace();
		} 
		return isoReq;
	}

	/**
	 * 获得所有专题
	 * */
	public ISOMsg getAllProductType(ISOMsg isoReq){
		JSONArray jsonArray=null;
		try {
			String sql = "SELECT * FROM product_type ORDER BY create_time DESC";
			List<ProductType> productTypeList = dao.find(ProductType.class, sql);
				jsonArray = JSONArray.fromObject(productTypeList); 
				isoReq.set(57,jsonArray.toString());
				isoReq.set(39,"00");
		} catch (Exception e) {
			e.printStackTrace();
		}
		 return isoReq;
	}
		
	/**
	 * 获取当前专题下所有商品
	 * */
	public  ISOMsg getProductByTypeId(ISOMsg isoReq){
		String typeId =isoReq.getString(12);
		JSONArray jsonArray=null;
		try {
			String sql = "SELECT * FROM product WHERE type_id=? ORDER BY create_time DESC";
			List<Product>  productList = dao.find(Product.class, sql, typeId);
			if(productList.size()>0){
				isoReq.set(39,"00");
				jsonArray=JSONArray.fromObject(productList);
				isoReq.set(57,jsonArray.toString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return isoReq;
	}
	/**
	 * 收藏
	 * */
	public ISOMsg collect(ISOMsg isoReq){
		String phone = isoReq.getString(1);
		String productId =isoReq.getString(13);
		String selectSql = "select * from user  where phone =? and status ='70A'";
		try {
			User user = dao.findFirst(User.class, selectSql,phone);
			if(user!=null){
					String userProductSql = "insert into USER_PRODUCT(id,user_id,product_id,status,create_time) values(?,?,?,?,?)";
					UserProduct userProduct = new UserProduct();
					userProduct.setCreateTime(new Date());
					userProduct.setId(com.hatchet.utils.lang.StringUtils.randomUUID());
					userProduct.setProductId(productId);
					userProduct.setStatus("10A");
					userProduct.setUserId(user.getId());
					dao.update(userProductSql, new Object[]{userProduct.getId(),userProduct.getUserId(),userProduct.getProductId(),userProduct.getStatus(),userProduct.getCreateTime()});
					isoReq.set(39,"00");
			}else{
				isoReq.set(39,"ZZ");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return  isoReq;
	}
	
	/**
	 * 转换isoRes
	 * 
	 * @param isoRes
	 * @return
	 */
	public Map<Integer, String> convert(ISOMsg isoRes) {
		Map<Integer, String> res = new HashMap<Integer, String>();
		Map<Integer, ISOField> resMap = isoRes.getChildren();
		for (Integer key : resMap.keySet()) {
			res.put(key, isoRes.getString(key));
		}
		return res;
	}
}