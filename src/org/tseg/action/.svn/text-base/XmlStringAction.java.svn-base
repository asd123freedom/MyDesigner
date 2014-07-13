package org.tseg.action;

import java.io.*;
import java.util.Iterator;

import org.dom4j.*;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;

import com.opensymphony.xwork2.ActionSupport;

public class XmlStringAction extends ActionSupport{
	private String xml;
	private String format_xml;
	public static void main(String[] args) throws IOException, DocumentException {
		File f = new File("d:/a.txt");
		FileReader fr = new FileReader(f);
		BufferedReader br=new BufferedReader(fr);
		StringBuffer sb=new StringBuffer("");
		String str="";
		while((str=br.readLine())!=null){
			sb.append(str);
		}
		//XmlStringAction xsa=new XmlStringAction();
		//xsa.setXml(sb.toString());
		//System.out.println(sb.toString());
		//xsa.execute();
		Document doc = null;
        doc = DocumentHelper.parseText(sb.toString());
		OutputFormat formater=OutputFormat.createPrettyPrint();
		formater.setEncoding("utf-8");
		StringWriter out=new StringWriter();
		XMLWriter writer=new XMLWriter(out,formater);
		writer.write(doc);
		String result=out.toString();
		int index=result.indexOf("\n");
		System.out.println(out.toString().substring(40));
	}
	public String execute(){
		Document doc = null;
        try {
			doc = DocumentHelper.parseText(this.xml);
			System.out.println(this.xml);
			OutputFormat formater=OutputFormat.createPrettyPrint();
			formater.setEncoding("utf-8");
			StringWriter out=new StringWriter();
			XMLWriter writer=new XMLWriter(out,formater);
			writer.write(doc);
			String result=out.toString();
			int index=result.indexOf("\n");
			//System.out.println(out.toString().substring(40));
			File file=new File("F:/MyDesigner");
			PrintWriter pw=null;
			try {
				pw=new PrintWriter(file);
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			String str=out.toString().substring(40);
			this.format_xml=str;
			pw.write(str);
			pw.flush();
			pw.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
//        Document doc = null;
//        try {
//
//            // 读取并解析XML文档
//            // 下面的是通过解析xml字符串的
//
//            doc = DocumentHelper.parseText(this.xml); // 将字符串转为XML
//            Element rootElt = doc.getRootElement(); // 获取根节点
////    		File f = new File("d:/a.txt");
////    		FileWriter fw = new FileWriter(f);
////    		BufferedWriter bw=new BufferedWriter(fw);
////    		bw.write(this.xml);
////    		bw.close();
//            
//            System.out.println("<" + rootElt.getName()+">"); // 拿到根节点的名称
//            //System.out.println(rootElt.attribute(0).getName());
//            Iterator iter = rootElt.elementIterator();
//
//
//            // 遍历head节点
//
//            while (iter.hasNext()) {
//
//                Element recordEle = (Element) iter.next();
//                String title = recordEle.getName();
//
//                System.out.println("title:" + title);
//
//                Iterator iters = recordEle.elementIterator("script"); // 获取子节点head下的子节点script
//
//
//                // 遍历Header节点下的Response节点
//
//                while (iters.hasNext()) {
//
//                    Element itemEle = (Element) iters.next();
//
//                    String username = itemEle.elementTextTrim("username"); // 拿到head下的子节点script下的字节点username的值
//
//                    String password = itemEle.elementTextTrim("password");
//
//                    System.out.println("username:" + username);
//                    System.out.println("password:" + password);
//                }
//            }
//            Iterator iterss = rootElt.elementIterator("body"); ///获取根节点下的子节点body
//
//            // 遍历body节点
//
//            while (iterss.hasNext()) {
//
//                Element recordEless = (Element) iterss.next();
//                String result = recordEless.elementTextTrim("result"); // 拿到body节点下的子节点result值
//
//                System.out.println("result:" + result);
//
//                Iterator itersElIterator = recordEless.elementIterator("form"); // 获取子节点body下的子节点form
//
//                // 遍历Header节点下的Response节点
//
//                while (itersElIterator.hasNext()) {
//
//                    Element itemEle = (Element) itersElIterator.next();
//
//                    String banlce = itemEle.elementTextTrim("banlce"); // 拿到body下的子节点form下的字节点banlce的值
//
//                    String subID = itemEle.elementTextTrim("subID");
//
//                    System.out.println("banlce:" + banlce);
//                    System.out.println("subID:" + subID);
//                }
//            }
//        } catch (DocumentException e) {
//            e.printStackTrace();
//
//        } catch (Exception e) {
//            e.printStackTrace();
//
//        }
        return "success";
	}
	public String getXml() {
		return xml;
	}
	public void setXml(String xml) {
		this.xml = xml;
	}
	public String getFormat_xml() {
		return format_xml;
	}
	public void setFormat_xml(String formatXml) {
		format_xml = formatXml;
	}
}
