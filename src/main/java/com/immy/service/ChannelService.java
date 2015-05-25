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
					
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return  isoReq;
	}
	/**
	 * 图片
	 * */
	 public ISOMsg graphicsGeneration(ISOMsg isoReq) {
		 String merchantNo = isoReq.getString(42);
		 try {
			 String sql = "SELECT * FROM HATCHET_MERCHANT WHERE MERCHANT_NO=? ";
			 HatchetMerchant merchant = dao.findFirst(HatchetMerchant.class,sql,new Object[]{merchantNo});
			 String terminalVoucherNo = isoReq.getString(11);
			String acqRefNo = isoReq.getString(37);
			String orderSql = "select * from HATCHET_ORDER_PAYMENT where ACQ_REF_NO=? and TERMINAL_VOUCHER_NO =?";
			HatchetOrderPayment orderPayMent = dao.findFirst(HatchetOrderPayment.class, orderSql, new Object[]{acqRefNo,terminalVoucherNo});
			if(orderPayMent!=null){
				String orderImageSql = "SELECT * FROM HATCHET_ORDER_PAYMENT_IMAGE WHERE order_payment_id=? AND type='10D'";
				HatchetOrderPaymentImage orderImage = dao.findFirst(HatchetOrderPaymentImage.class, orderImageSql,orderPayMent.getId());
				String orderNo=orderPayMent.getOrderNo();
				BufferedImage image;  
				 int imageWidth = 300;//图片的宽度
			        int imageHeight = 400;//图片的高度
			        image = new BufferedImage(imageWidth, imageHeight, BufferedImage.TYPE_INT_RGB);
			        Graphics graphics = image.getGraphics();
			        graphics.setColor(Color.WHITE);
			        graphics.fillRect(0, 0, imageWidth, imageHeight);
			        graphics.setColor(Color.BLACK);
			        Font mf = new Font("SansSerif",10,15);
			        graphics.setFont(mf);
			        graphics.drawString("商户编号  : " + merchantNo, 20, 30);
			        graphics.drawString("年龄  : " + 0, 20, 50);
			        graphics.drawString("性别  : " + "男", 20, 70);
			        graphics.drawString("毕业院校  : " + 0, 20, 90);
			        graphics.drawString("爱好  : " + "吃饭喝酒睡觉觉", 20, 110);
			        graphics.drawString("最爱  : " + "工作", 20, 130);
			        ImageIcon imageIcon = new ImageIcon(orderImage.getImageUrl());
			        graphics.drawImage(imageIcon.getImage(), 0, 250, null);
			        	String uuid = com.hatchet.utils.lang.StringUtils.randomUUID();
			        	InputStream fis = null;
			        	File uploadFile = new File(orderImage.getImageUrl());
			        	URL url = new URL(orderImage.getImageUrl());
			        	URLConnection uc = url.openConnection(); 
			        	fis = uc.getInputStream(); 
			        	FtpArgs args = propertiesService.getImageFtpArgs();
			        	FtpUtil ftp = new FtpUtil(args);
						ftp.upload("orderpayment_image/" + orderNo, uuid + "." + "jpg",fis);
						HatchetOrderPaymentImage orderPaymentImage = new HatchetOrderPaymentImage();
						orderPaymentImage.setId(uuid);
						orderPaymentImage.setType("10E");
						orderPaymentImage.setCreateTime(new Date());
						orderPaymentImage.setImageUrl("http://" + args.webHost + ":" + args.webPort + args.path + "/orderpayment_image/" + orderNo + "/" + uuid + "." + "jpg");
						orderPaymentImage.setOrderPaymentId(orderPayMent.getId());
						String insertImage = "insert into HATCHET_ORDER_PAYMENT_IMAGE(id,image_url,order_payment_id,type,create_user_id,create_time)values(?,?,?,?,?,?)";
						dao.update(insertImage,new Object[]{orderPaymentImage.getId(),orderPaymentImage.getOrderPaymentId(),orderPaymentImage.getOrderPaymentId(),orderPaymentImage.getType(),orderPaymentImage.getCreateUserId(),orderPaymentImage.getCreateTime()});
						URL url1 = new URL(orderPaymentImage.getImageUrl());
			        	URLConnection uc1 = url1.openConnection();  
			        	uc1.setDoOutput(true);
			        	OutputStream ops = uc1.getOutputStream();
						BufferedOutputStream bos = new BufferedOutputStream(ops);
/*						FileOutputStream fos = new FileOutputStream("F:/2.jpg");
			            BufferedOutputStream bos1 = new BufferedOutputStream(fos);
			            JPEGImageEncoder encoder1 = JPEGCodec.createJPEGEncoder(bos1);
			            encoder1.encode(image);
			            bos1.close();*/
			        	 JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(bos);
			        	 encoder.encode(image);
			        	 bos.close();
			        	 isoReq.set(39,"00");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		 return isoReq;
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
	
	/**
	 * 校验MAC
	 * @param isoRes
	 * @return
	 */
	public boolean validateMACMD5(String sdata,String smac){
        String mac = DigestUtils.md5Hex(sdata+"21E4ACD4CD5D4619B063F40C5A454F7D");
        if(null!=smac && mac.toUpperCase().equals(smac.toUpperCase())){
			return true;
		}
		return false;
	}
	
	/**
	 * 生成商户编号后四位
	 * */
	public String getMerchantNo(String phone){
		Date date = new Date();
		SimpleDateFormat sdf  = new SimpleDateFormat("yyMM");
	    String randomNum= StringUtils.leftPad(RandomUtils.nextInt(9999)+"", 4, "0");
	    String merchantNo= "220"+phone.subSequence(3, 7)+sdf.format(date)+randomNum;
	    return merchantNo;
	}	
}


