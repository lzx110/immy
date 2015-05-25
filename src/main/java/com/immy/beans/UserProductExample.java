package com.immy.beans;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UserProductExample {

	/**
	 * This field was generated by Apache iBATIS ibator. This field corresponds to the database table USER_PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	protected String orderByClause;
	/**
	 * This field was generated by Apache iBATIS ibator. This field corresponds to the database table USER_PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	protected List oredCriteria;

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table USER_PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	public UserProductExample() {
		oredCriteria = new ArrayList();
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table USER_PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	protected UserProductExample(UserProductExample example) {
		this.orderByClause = example.orderByClause;
		this.oredCriteria = example.oredCriteria;
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table USER_PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	public void setOrderByClause(String orderByClause) {
		this.orderByClause = orderByClause;
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table USER_PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	public String getOrderByClause() {
		return orderByClause;
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table USER_PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	public List getOredCriteria() {
		return oredCriteria;
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table USER_PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	public void or(Criteria criteria) {
		oredCriteria.add(criteria);
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table USER_PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	public Criteria createCriteria() {
		Criteria criteria = createCriteriaInternal();
		if (oredCriteria.size() == 0) {
			oredCriteria.add(criteria);
		}
		return criteria;
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table USER_PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	protected Criteria createCriteriaInternal() {
		Criteria criteria = new Criteria();
		return criteria;
	}

	/**
	 * This method was generated by Apache iBATIS ibator. This method corresponds to the database table USER_PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	public void clear() {
		oredCriteria.clear();
	}

	/**
	 * This class was generated by Apache iBATIS ibator. This class corresponds to the database table USER_PRODUCT
	 * @ibatorgenerated  Fri May 22 08:54:35 CST 2015
	 */
	public static class Criteria {
		protected List criteriaWithoutValue;
		protected List criteriaWithSingleValue;
		protected List criteriaWithListValue;
		protected List criteriaWithBetweenValue;

		protected Criteria() {
			super();
			criteriaWithoutValue = new ArrayList();
			criteriaWithSingleValue = new ArrayList();
			criteriaWithListValue = new ArrayList();
			criteriaWithBetweenValue = new ArrayList();
		}

		public boolean isValid() {
			return criteriaWithoutValue.size() > 0
					|| criteriaWithSingleValue.size() > 0
					|| criteriaWithListValue.size() > 0
					|| criteriaWithBetweenValue.size() > 0;
		}

		public List getCriteriaWithoutValue() {
			return criteriaWithoutValue;
		}

		public List getCriteriaWithSingleValue() {
			return criteriaWithSingleValue;
		}

		public List getCriteriaWithListValue() {
			return criteriaWithListValue;
		}

		public List getCriteriaWithBetweenValue() {
			return criteriaWithBetweenValue;
		}

		protected void addCriterion(String condition) {
			if (condition == null) {
				throw new RuntimeException("Value for condition cannot be null");
			}
			criteriaWithoutValue.add(condition);
		}

		protected void addCriterion(String condition, Object value,
				String property) {
			if (value == null) {
				throw new RuntimeException("Value for " + property
						+ " cannot be null");
			}
			Map map = new HashMap();
			map.put("condition", condition);
			map.put("value", value);
			criteriaWithSingleValue.add(map);
		}

		protected void addCriterion(String condition, List values,
				String property) {
			if (values == null || values.size() == 0) {
				throw new RuntimeException("Value list for " + property
						+ " cannot be null or empty");
			}
			Map map = new HashMap();
			map.put("condition", condition);
			map.put("values", values);
			criteriaWithListValue.add(map);
		}

		protected void addCriterion(String condition, Object value1,
				Object value2, String property) {
			if (value1 == null || value2 == null) {
				throw new RuntimeException("Between values for " + property
						+ " cannot be null");
			}
			List list = new ArrayList();
			list.add(value1);
			list.add(value2);
			Map map = new HashMap();
			map.put("condition", condition);
			map.put("values", list);
			criteriaWithBetweenValue.add(map);
		}

		public Criteria andIdIsNull() {
			addCriterion("id is null");
			return this;
		}

		public Criteria andIdIsNotNull() {
			addCriterion("id is not null");
			return this;
		}

		public Criteria andIdEqualTo(String value) {
			addCriterion("id =", value, "id");
			return this;
		}

		public Criteria andIdNotEqualTo(String value) {
			addCriterion("id <>", value, "id");
			return this;
		}

		public Criteria andIdGreaterThan(String value) {
			addCriterion("id >", value, "id");
			return this;
		}

		public Criteria andIdGreaterThanOrEqualTo(String value) {
			addCriterion("id >=", value, "id");
			return this;
		}

		public Criteria andIdLessThan(String value) {
			addCriterion("id <", value, "id");
			return this;
		}

		public Criteria andIdLessThanOrEqualTo(String value) {
			addCriterion("id <=", value, "id");
			return this;
		}

		public Criteria andIdLike(String value) {
			addCriterion("id like", value, "id");
			return this;
		}

		public Criteria andIdNotLike(String value) {
			addCriterion("id not like", value, "id");
			return this;
		}

		public Criteria andIdIn(List values) {
			addCriterion("id in", values, "id");
			return this;
		}

		public Criteria andIdNotIn(List values) {
			addCriterion("id not in", values, "id");
			return this;
		}

		public Criteria andIdBetween(String value1, String value2) {
			addCriterion("id between", value1, value2, "id");
			return this;
		}

		public Criteria andIdNotBetween(String value1, String value2) {
			addCriterion("id not between", value1, value2, "id");
			return this;
		}

		public Criteria andUserIdIsNull() {
			addCriterion("user_id is null");
			return this;
		}

		public Criteria andUserIdIsNotNull() {
			addCriterion("user_id is not null");
			return this;
		}

		public Criteria andUserIdEqualTo(String value) {
			addCriterion("user_id =", value, "userId");
			return this;
		}

		public Criteria andUserIdNotEqualTo(String value) {
			addCriterion("user_id <>", value, "userId");
			return this;
		}

		public Criteria andUserIdGreaterThan(String value) {
			addCriterion("user_id >", value, "userId");
			return this;
		}

		public Criteria andUserIdGreaterThanOrEqualTo(String value) {
			addCriterion("user_id >=", value, "userId");
			return this;
		}

		public Criteria andUserIdLessThan(String value) {
			addCriterion("user_id <", value, "userId");
			return this;
		}

		public Criteria andUserIdLessThanOrEqualTo(String value) {
			addCriterion("user_id <=", value, "userId");
			return this;
		}

		public Criteria andUserIdLike(String value) {
			addCriterion("user_id like", value, "userId");
			return this;
		}

		public Criteria andUserIdNotLike(String value) {
			addCriterion("user_id not like", value, "userId");
			return this;
		}

		public Criteria andUserIdIn(List values) {
			addCriterion("user_id in", values, "userId");
			return this;
		}

		public Criteria andUserIdNotIn(List values) {
			addCriterion("user_id not in", values, "userId");
			return this;
		}

		public Criteria andUserIdBetween(String value1, String value2) {
			addCriterion("user_id between", value1, value2, "userId");
			return this;
		}

		public Criteria andUserIdNotBetween(String value1, String value2) {
			addCriterion("user_id not between", value1, value2, "userId");
			return this;
		}

		public Criteria andProductIdIsNull() {
			addCriterion("product_id is null");
			return this;
		}

		public Criteria andProductIdIsNotNull() {
			addCriterion("product_id is not null");
			return this;
		}

		public Criteria andProductIdEqualTo(String value) {
			addCriterion("product_id =", value, "productId");
			return this;
		}

		public Criteria andProductIdNotEqualTo(String value) {
			addCriterion("product_id <>", value, "productId");
			return this;
		}

		public Criteria andProductIdGreaterThan(String value) {
			addCriterion("product_id >", value, "productId");
			return this;
		}

		public Criteria andProductIdGreaterThanOrEqualTo(String value) {
			addCriterion("product_id >=", value, "productId");
			return this;
		}

		public Criteria andProductIdLessThan(String value) {
			addCriterion("product_id <", value, "productId");
			return this;
		}

		public Criteria andProductIdLessThanOrEqualTo(String value) {
			addCriterion("product_id <=", value, "productId");
			return this;
		}

		public Criteria andProductIdLike(String value) {
			addCriterion("product_id like", value, "productId");
			return this;
		}

		public Criteria andProductIdNotLike(String value) {
			addCriterion("product_id not like", value, "productId");
			return this;
		}

		public Criteria andProductIdIn(List values) {
			addCriterion("product_id in", values, "productId");
			return this;
		}

		public Criteria andProductIdNotIn(List values) {
			addCriterion("product_id not in", values, "productId");
			return this;
		}

		public Criteria andProductIdBetween(String value1, String value2) {
			addCriterion("product_id between", value1, value2, "productId");
			return this;
		}

		public Criteria andProductIdNotBetween(String value1, String value2) {
			addCriterion("product_id not between", value1, value2, "productId");
			return this;
		}

		public Criteria andStatusIsNull() {
			addCriterion("status is null");
			return this;
		}

		public Criteria andStatusIsNotNull() {
			addCriterion("status is not null");
			return this;
		}

		public Criteria andStatusEqualTo(String value) {
			addCriterion("status =", value, "status");
			return this;
		}

		public Criteria andStatusNotEqualTo(String value) {
			addCriterion("status <>", value, "status");
			return this;
		}

		public Criteria andStatusGreaterThan(String value) {
			addCriterion("status >", value, "status");
			return this;
		}

		public Criteria andStatusGreaterThanOrEqualTo(String value) {
			addCriterion("status >=", value, "status");
			return this;
		}

		public Criteria andStatusLessThan(String value) {
			addCriterion("status <", value, "status");
			return this;
		}

		public Criteria andStatusLessThanOrEqualTo(String value) {
			addCriterion("status <=", value, "status");
			return this;
		}

		public Criteria andStatusLike(String value) {
			addCriterion("status like", value, "status");
			return this;
		}

		public Criteria andStatusNotLike(String value) {
			addCriterion("status not like", value, "status");
			return this;
		}

		public Criteria andStatusIn(List values) {
			addCriterion("status in", values, "status");
			return this;
		}

		public Criteria andStatusNotIn(List values) {
			addCriterion("status not in", values, "status");
			return this;
		}

		public Criteria andStatusBetween(String value1, String value2) {
			addCriterion("status between", value1, value2, "status");
			return this;
		}

		public Criteria andStatusNotBetween(String value1, String value2) {
			addCriterion("status not between", value1, value2, "status");
			return this;
		}

		public Criteria andCreateTimeIsNull() {
			addCriterion("create_time is null");
			return this;
		}

		public Criteria andCreateTimeIsNotNull() {
			addCriterion("create_time is not null");
			return this;
		}

		public Criteria andCreateTimeEqualTo(Date value) {
			addCriterion("create_time =", value, "createTime");
			return this;
		}

		public Criteria andCreateTimeNotEqualTo(Date value) {
			addCriterion("create_time <>", value, "createTime");
			return this;
		}

		public Criteria andCreateTimeGreaterThan(Date value) {
			addCriterion("create_time >", value, "createTime");
			return this;
		}

		public Criteria andCreateTimeGreaterThanOrEqualTo(Date value) {
			addCriterion("create_time >=", value, "createTime");
			return this;
		}

		public Criteria andCreateTimeLessThan(Date value) {
			addCriterion("create_time <", value, "createTime");
			return this;
		}

		public Criteria andCreateTimeLessThanOrEqualTo(Date value) {
			addCriterion("create_time <=", value, "createTime");
			return this;
		}

		public Criteria andCreateTimeIn(List values) {
			addCriterion("create_time in", values, "createTime");
			return this;
		}

		public Criteria andCreateTimeNotIn(List values) {
			addCriterion("create_time not in", values, "createTime");
			return this;
		}

		public Criteria andCreateTimeBetween(Date value1, Date value2) {
			addCriterion("create_time between", value1, value2, "createTime");
			return this;
		}

		public Criteria andCreateTimeNotBetween(Date value1, Date value2) {
			addCriterion("create_time not between", value1, value2,
					"createTime");
			return this;
		}
	}
}