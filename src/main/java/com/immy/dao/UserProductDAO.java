package com.immy.dao;

import com.immy.beans.UserProduct;
import com.immy.beans.UserProductExample;
import java.util.List;

public interface UserProductDAO {

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table USER_PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	int countByExample(UserProductExample example);

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table USER_PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	int deleteByExample(UserProductExample example);

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table USER_PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	int deleteByPrimaryKey(String id);

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table USER_PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	void insert(UserProduct record);

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table USER_PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	void insertSelective(UserProduct record);

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table USER_PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	List selectByExample(UserProductExample example);

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table USER_PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	UserProduct selectByPrimaryKey(String id);

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table USER_PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	int updateByExampleSelective(UserProduct record, UserProductExample example);

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table USER_PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	int updateByExample(UserProduct record, UserProductExample example);

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table USER_PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	int updateByPrimaryKeySelective(UserProduct record);

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table USER_PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	int updateByPrimaryKey(UserProduct record);
}