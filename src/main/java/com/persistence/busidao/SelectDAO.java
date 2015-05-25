package com.persistence.busidao;

import java.util.List;
import java.util.Map;

import com.hatchet.entity.bo.DataSet;
import com.hatchet.entity.vo.StatisticalDataVO;

public abstract interface SelectDAO {
	public abstract int count(String paramString, Map<String, Object> paramMap);

	  public abstract String amount(String paramString, Map<String, Object> paramMap);

	  public abstract StatisticalDataVO QueryRowsAndAmount(String paramString, Map<String, Object> paramMap);

	  public abstract List list(String paramString, Map<String, Object> paramMap, int paramInt1, int paramInt2);

	  public abstract DataSet getDataSet(String paramString1, String paramString2, Map<String, Object> paramMap, int paramInt1, int paramInt2);

	  public abstract List list(String paramString);

	  public abstract List list(String paramString1, String paramString2);

	  public abstract List list(String paramString, Map<String, Object> paramMap);

	  public abstract Object object(String paramString);

	  public abstract Object object(String paramString1, String paramString2);

	  public abstract Object object(String paramString, Map<String, Object> paramMap);

	  public abstract Object selectSqlPage(Map<String, Object> paramMap);

	  public abstract Object selectSqlCount(Map<String, Object> paramMap);

	  public abstract Object selectSql(Map<String, Object> paramMap);

	  public abstract Map map(String paramString1, Object paramObject, String paramString2);

	  public abstract Map map(String paramString1, Object paramObject, String paramString2, String paramString3);

	  public abstract long getBeginNum(int paramInt1, int paramInt2);

	  public abstract long getEndNum(int paramInt1, int paramInt2);
}
