package com.immy.vo;

import com.immy.beans.Product;

public class ProductVO extends Product{
	private int likes;
	private String isLike;
	private String typeId;
	private String typeName;
	private String typeDes;
	private String typeStatus;
	public int getLikes() {
		return likes;
	}
	public void setLikes(int likes) {
		this.likes = likes;
	}
	public String getIsLike() {
		return isLike;
	}
	public void setIsLike(String isLike) {
		this.isLike = isLike;
	}
	public String getTypeId() {
		return typeId;
	}
	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public String getTypeDes() {
		return typeDes;
	}
	public void setTypeDes(String typeDes) {
		this.typeDes = typeDes;
	}
	public String getTypeStatus() {
		return typeStatus;
	}
	public void setTypeStatus(String typeStatus) {
		this.typeStatus = typeStatus;
	}
}
