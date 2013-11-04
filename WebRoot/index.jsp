<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'index.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
  </head>
  
  <body>
    &lt;node label='total'&gt;&lt;node label='管理员' value='1'&gt;&lt;node label='配置人员' value='41'&gt;&lt;/node&gt;&lt;/node&gt;&lt;node label='租户管理员' value='2'&gt;&lt;node label='董事长' value='21'&gt;&lt;node label='执行官' value='22'&gt;&lt;node label='市场销售部' value='23'&gt;&lt;node label='销售' value='28'&gt;&lt;/node&gt;&lt;/node&gt;&lt;node label='技术部' value='24'&gt;&lt;node label='开发人员' value='29'&gt;&lt;/node&gt;&lt;node label='产品经理' value='30'&gt;&lt;node label='产品人员' value='32'&gt;&lt;/node&gt;&lt;/node&gt;&lt;node label='美工' value='31'&gt;&lt;/node&gt;&lt;/node&gt;&lt;node label='财务部' value='25'&gt;&lt;/node&gt;&lt;node label='行政部' value='26'&gt;&lt;/node&gt;&lt;/node&gt;&lt;/node&gt;&lt;/node&gt;&lt;/node&gt;
  </body>
</html>
