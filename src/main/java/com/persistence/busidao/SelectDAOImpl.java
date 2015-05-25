package com.persistence.busidao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.hatchet.entity.bo.DataSet;
import com.hatchet.entity.vo.StatisticalDataVO;

public abstract class SelectDAOImpl extends SqlMapClientDaoSupport{

	  public int count(String sqlId, Map<String, Object> conditions)
	  {
	    Integer integerCount = (Integer)getSqlMapClientTemplate().queryForObject(sqlId, conditions);
	    if (integerCount != null)
	      return integerCount.intValue();

	    return 0; }

	  public String amount(String sqlId, Map<String, Object> conditions) {
	    String amountStr = (String)getSqlMapClientTemplate().queryForObject(sqlId, conditions);
	    return amountStr; }

	  public StatisticalDataVO QueryRowsAndAmount(String sqlId, Map<String, Object> conditions) {
	    StatisticalDataVO count = (StatisticalDataVO)getSqlMapClientTemplate().queryForObject(sqlId, conditions);
	    return count;
	  }

	  public abstract long getBeginNum(int paramInt1, int paramInt2);

	  public abstract long getEndNum(int paramInt1, int paramInt2);

	  public List<Object> list(String sqlId, Map<String, Object> conditions, int pageNumber, int pageSize)
	  {
	    if (conditions == null)
	      conditions = new HashMap();

	    conditions.put("begin", Long.valueOf(getBeginNum(pageNumber, pageSize)));
	    conditions.put("end", Long.valueOf(getEndNum(pageNumber, pageSize)));

	    List list = getSqlMapClientTemplate().queryForList(sqlId, conditions);
	    return list;
	  }

	  public DataSet getDataSet(String countSqlId, String listSqlId, Map<String, Object> conditions, int pageNumber, int pageSize) {
	    int count = count(countSqlId, conditions);
	    List list = list(countSqlId, conditions, pageNumber, pageSize);
	    DataSet dataSet = new DataSet(pageNumber, pageSize, count, list);
	    return dataSet;
	  }

	  public List list(String sqlId)
	  {
	    return getSqlMapClientTemplate().queryForList(sqlId); }

	  public List list(String sqlId, String condition) {
	    return getSqlMapClientTemplate().queryForList(sqlId, condition); }

	  public List list(String sqlId, Map<String, Object> conditions) {
	    return getSqlMapClientTemplate().queryForList(sqlId, conditions);
	  }

	  public Map map(String sqlId, Object parameter, String mapKey) {
	    return getSqlMapClientTemplate().queryForMap(sqlId, parameter, mapKey);
	  }

	  public Map map(String sqlId, Object parameter, String mapKey, String valueProperty) {
	    return getSqlMapClientTemplate().queryForMap(sqlId, parameter, mapKey, valueProperty);
	  }

	  public Object object(String sqlId) {
	    return getSqlMapClientTemplate().queryForObject(sqlId); }

	  public Object object(String sqlId, String condition) {
	    return getSqlMapClientTemplate().queryForObject(sqlId, condition); }

	  public Object object(String sqlId, Map<String, Object> conditions) {
	    return getSqlMapClientTemplate().queryForObject(sqlId, conditions);
	  }

	  public Object selectSql(Map<String, Object> conditions) {
	    return getSqlMapClientTemplate().queryForList("SYSTEM.selectBySql", conditions);
	  }

	  public Object selectSqlCount(Map<String, Object> conditions) {
	    return getSqlMapClientTemplate().queryForObject("SYSTEM.selectBySqlCount", conditions);
	  }

	  public Object selectSqlPage(Map<String, Object> conditions) {
	    return getSqlMapClientTemplate().queryForList("SYSTEM.selectBySqlPage", conditions);
	  }
}
