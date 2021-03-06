package com.immy.dao;

import com.immy.beans.Product;
import com.immy.beans.ProductExample;
import java.util.List;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

public class ProductDAOImpl extends SqlMapClientDaoSupport implements ProductDAO {

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	public ProductDAOImpl() {
		super();
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	public int countByExample(ProductExample example) {
		Integer count = (Integer) getSqlMapClientTemplate().queryForObject(
				"PRODUCT.ibatorgenerated_countByExample", example);
		return count.intValue();
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	public int deleteByExample(ProductExample example) {
		int rows = getSqlMapClientTemplate().delete(
				"PRODUCT.ibatorgenerated_deleteByExample", example);
		return rows;
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	public int deleteByPrimaryKey(String id) {
		Product key = new Product();
		key.setId(id);
		int rows = getSqlMapClientTemplate().delete(
				"PRODUCT.ibatorgenerated_deleteByPrimaryKey", key);
		return rows;
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	public void insert(Product record) {
		getSqlMapClientTemplate().insert("PRODUCT.ibatorgenerated_insert",
				record);
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	public void insertSelective(Product record) {
		getSqlMapClientTemplate().insert(
				"PRODUCT.ibatorgenerated_insertSelective", record);
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	public List selectByExample(ProductExample example) {
		List list = getSqlMapClientTemplate().queryForList(
				"PRODUCT.ibatorgenerated_selectByExample", example);
		return list;
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	public Product selectByPrimaryKey(String id) {
		Product key = new Product();
		key.setId(id);
		Product record = (Product) getSqlMapClientTemplate().queryForObject(
				"PRODUCT.ibatorgenerated_selectByPrimaryKey", key);
		return record;
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	public int updateByExampleSelective(Product record, ProductExample example) {
		UpdateByExampleParms parms = new UpdateByExampleParms(record, example);
		int rows = getSqlMapClientTemplate().update(
				"PRODUCT.ibatorgenerated_updateByExampleSelective", parms);
		return rows;
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	public int updateByExample(Product record, ProductExample example) {
		UpdateByExampleParms parms = new UpdateByExampleParms(record, example);
		int rows = getSqlMapClientTemplate().update(
				"PRODUCT.ibatorgenerated_updateByExample", parms);
		return rows;
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	public int updateByPrimaryKeySelective(Product record) {
		int rows = getSqlMapClientTemplate().update(
				"PRODUCT.ibatorgenerated_updateByPrimaryKeySelective", record);
		return rows;
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	public int updateByPrimaryKey(Product record) {
		int rows = getSqlMapClientTemplate().update(
				"PRODUCT.ibatorgenerated_updateByPrimaryKey", record);
		return rows;
	}

	/**
	 * This class was generated by Apache iBATIS ibator. This class corresponds to the database table PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	private static class UpdateByExampleParms extends ProductExample {
		private Object record;

		public UpdateByExampleParms(Object record, ProductExample example) {
			super(example);
			this.record = record;
		}

		public Object getRecord() {
			return record;
		}
	}
}