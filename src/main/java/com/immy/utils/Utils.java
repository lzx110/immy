package com.immy.utils;


import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Random;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.jpos.iso.ISOMsg;

public class Utils {
	// 十六进制字符串转byte数组
	public static byte[] hexStringToBytes(String hexString) {
		if (hexString == null || hexString.equals("")) {
			return null;
		}
		hexString = hexString.toUpperCase();
		int length = hexString.length() / 2;
		char[] hexChars = hexString.toCharArray();
		byte[] d = new byte[length];
		for (int i = 0; i < length; i++) {
			int pos = i * 2;
			d[i] = (byte) (charToByte(hexChars[pos]) << 4 | charToByte(hexChars[pos + 1]));
		}
		return d;
	}

	private static byte charToByte(char c) {
		return (byte) "0123456789ABCDEF".indexOf(c);
	}

	// 数组转字符串、以空格间隔
	public static String bytesToHexString(byte[] src) {
		StringBuilder stringBuilder = new StringBuilder("");
		if (src == null || src.length <= 0) {
			return null;
		}
		for (int i = 0; i < src.length; i++) {
			int v = src[i] & 0xFF;
			String hv = Integer.toHexString(v);
			if (hv.length() < 2) {
				stringBuilder.append(0);
			}
			if (i == src.length - 1) {
				stringBuilder.append(hv);
			} else {
				stringBuilder.append(hv + " ");
			}
		}
		return stringBuilder.toString();
	}

	public static String generateHexString(int paramInt) {
		StringBuffer localStringBuffer = new StringBuffer();
		Random localRandom = new Random();
		int i = 16;
		for (int j = 0; j < paramInt; j++) {
			if (j % 2 == 0) {
				localStringBuffer.append("0123456789ABCDEF".charAt(localRandom
						.nextInt(i)));
			} else {
				localStringBuffer.append("0123456789ABCDEF".charAt(localRandom
						.nextInt(i)) + " ");
			}
		}
		return localStringBuffer.toString();
	}

	public static byte[] decodeTripleDES(byte[] data, byte[] key)
			throws NoSuchAlgorithmException, NoSuchPaddingException,
			InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
		byte[] keys;
		if (key.length == 16) {
			keys = new byte[24];
			System.arraycopy(key, 0, keys, 0, 16);
			System.arraycopy(key, 0, keys, 16, 8);
		} else {
			keys = key;
		}

		Cipher cipher = Cipher.getInstance("DESede/ECB/NoPadding");
		SecretKey secretKey = new SecretKeySpec(keys, "DESede");
		cipher.init(Cipher.DECRYPT_MODE, secretKey);
		return cipher.doFinal(data);
	}

	public static boolean equals(byte[] b1, byte[] b2) {
		if (b1.length != b2.length) {
			return false;
		}
		for (int i = 0; i < b1.length; i++) {
			if (b1[i] != b2[i]) {
				return false;
			}
		}
		return true;
	}
	
	public static String dump(ISOMsg msg) {
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		try {
			msg.dump(new PrintStream(baos), "");
			baos.flush();
		} catch (IOException e) {
			// ignore
		} finally {
			try {
				baos.close();
			} catch (IOException e) {
				// ignore
			}
		}
		return new String(baos.toByteArray());
	}
}
