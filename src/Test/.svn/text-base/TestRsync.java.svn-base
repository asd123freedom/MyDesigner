package Test;

import java.security.MessageDigest;
import java.util.zip.Adler32;

public class TestRsync {
	public static void main(String[] args) {
		// Adler32 checkSum=new Adler32();
		// checkSum.update("name".getBytes());
		// System.out.println(checkSum.getValue());
		// checkSum.reset();
		// checkSum.update("name".getBytes());
		// System.out.println(checkSum.getValue());
		testForAdler32();
//		byte[] b="name".getBytes();
//		for(int i=0;i<"name".getBytes().length;i++){
//			System.out.println(b[i]);
//		}
		System.out.println(checkSum_Adler32("I am freedom".getBytes(),4));
		//System.out.println("3".hashCode());
	}

	public static void testForAdler32() {
		Adler32 checkSum = new Adler32();
		checkSum.reset();
		checkSum.update("I am freedom".getBytes(),0,1);
		System.out.println(checkSum.getValue());
		//checkSum.update("".getBytes(),2,0);
		//System.out.println(checkSum.getValue());
		//checkSum.reset();
		//checkSum.update("a".getBytes());
		Integer.valueOf(3).hashCode();
		//System.out.println(checkSum.getValue());
	}

	public static void testForMD5() {
		MessageDigest md5 = null;
		if (md5 == null) {
			try {
				md5 = MessageDigest.getInstance("MD5");
			} catch (Exception e) {
				throw new RuntimeException("MD5 not supported", e);
			}
		}
		md5.reset();
		md5.update("name".getBytes());
		byte[] b = md5.digest();
		for (int i = 0; i < b.length; i++) {
			int n = b[i];
			String s = Integer.toHexString(n & 0xff);
			// System.out.println(b[i]);
			System.out.println(s);
		}
		// return md5.digest();
		System.out.println(md5.digest().length);
	}
	public static long checkSum_Adler32(byte[] buf, int len) {
		int i;
		long s1, s2;
		s1 = s2 = 0;
		for (i = 0; i < (len - 4); i += 4) {
			s2 += 4 * (s1 + buf[i]) + 3 * buf[i + 1] + 2 * buf[i + 2]
					+ buf[i + 3];
			s1 += (buf[i + 0] + buf[i + 1] + buf[i + 2] + buf[i + 3]);
		}
		for (; i < len; i++) {
			s1 += (buf[i]);
			s2 += s1;
		}
		s1=s1%65536;
		s2=s2%65536;
		return (s1 & 0xffff) + ((s2 & 0xffff) << 16);
	}
}
