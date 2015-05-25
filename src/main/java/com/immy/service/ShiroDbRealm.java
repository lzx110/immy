package com.immy.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.SimplePrincipalCollection;

import com.hatchet.entity.bo.Constant;
import com.immy.beans.User;
import com.immy.beans.UserExample;
import com.immy.dao.UserDAO;
import com.persistence.busidao.SelectDAO;
public class ShiroDbRealm extends AuthorizingRealm {
	
	private UserDAO systemUserDAO;
	private SelectDAO selectDAO;
	
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken) throws AuthenticationException {
		UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
		UserExample example=new UserExample();
		example.createCriteria().andPhoneEqualTo(token.getUsername()).andPasswdEqualTo((new String(token.getPassword()))).andStatusEqualTo("10A");
		List<User> list  = systemUserDAO.selectByExample(example);
		if(list !=null && list.size() > 0){
			SecurityUtils.getSubject().getSession().setAttribute(Constant.USER_SESSION_KEY, list.get(0));
			return new SimpleAuthenticationInfo(token.getUsername(),token.getPassword(), getName());
		}
//		Map  user=new HashMap<String, String>();;
//		user.put("loginName", token.getUsername());
//		user.put("password",new String(token.getPassword()));
//		HatchetSystemUser systemUser=selectDAO.selectHatchetSystemUser(user);
//		if(systemUser !=null ){
//			SecurityUtils.getSubject().getSession().setAttribute(Constant.USER_SESSION_KEY, systemUser);
//			return new SimpleAuthenticationInfo(token.getUsername(),token.getPassword(), getName());
//		}
		return null;
	}

	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		System.out.println("doGetAuthorizationInfo......................");
		String userName = principals.fromRealm(getName()).iterator().next().toString();
		SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
		Map conditions = new HashMap();
		conditions.put("loginName", userName);
		List permissionList = selectDAO.list("SYSTEM.getPermissionListByUserName", conditions);
		info.addStringPermissions(permissionList);
		return info;
	}

	/**
	 * 清除缓存权限信息
	 */
	public void clearCachedAuthorizationInfo(String principal) {
		SimplePrincipalCollection principals = new SimplePrincipalCollection(principal, getName());
		clearCachedAuthorizationInfo(principals);
	}

	/**
	 * 清空所有缓存权限信息
	 */
	public void clearAllCachedAuthorizationInfo() {
		Cache<Object, AuthorizationInfo> cache = getAuthorizationCache();
		if (cache != null) {
			for (Object key : cache.keys()) {
				if(key instanceof SimplePrincipalCollection){
					cache.remove(key);
				}
			}
		}
	}

	public UserDAO getSystemUserDAO() {
		return systemUserDAO;
	}

	public void setSystemUserDAO(UserDAO systemUserDAO) {
		this.systemUserDAO = systemUserDAO;
	}

	public SelectDAO getSelectDAO() {
		return selectDAO;
	}

	public void setSelectDAO(SelectDAO selectDAO) {
		this.selectDAO = selectDAO;
	}
	

}
