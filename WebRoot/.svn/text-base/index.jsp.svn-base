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
	<style>
		ul {
			list-style: none;
			width:300px;
			padding-left: 20px;
		}
		li {
			cursor : pointer;
			margin: 4px;
		}
	</style>
	<script language="javascript" type="text/javascript" src="jquery/jquery-1.9.1.js"></script>
  </head>
  <script>
  	$(function(){
  		//console.log("asd");
  // 		$.ajax({
		// 		url: "http://127.0.0.1:8080/HiServiceCRM/findAllRoles.action",
		// 		type: "POST",
		// 	    success:function(data){
		// 			console.log($.parseXML($("body").text()));
		// 			var node=$.parseXML($("body").text());
		// 			node=node.childNodes[0];
		// 			$("body").data("node",node);
		// 			//$("body").append(buildTree($(node)));
		// 			buildTree($(node)).appendTo($("body")).click(function(e){
		// 				e=e.originalEvent;
		// 				console.log(e.target);
		// 				var target=e.target.tagName.toLowerCase();
		// 				if(target!="li"){
		// 					return;
		// 				}
		// 				var ul=$(e.target).find("ul:eq(0)");
		// 				ul=ul[0];
		// 				console.log(ul);
		// 				if(ul){
		// 					ul.style.display=ul.style.display=="none"?"block":"none";
		// 				}						
		// 			});;
		// 	    }
		// });
		$.ajax({
				url: "http://127.0.0.1:8080/HiServiceCRM/getMonitorProcessDefinitionFile.action",
				type: "POST",
				data:{"id":"14853"},
			    success:function(data){
					console.log(data);
			    }
		});
		function buildTree(node){
			var parent=$("<ul>");
			$.each(node.children(),function(index,e){
				//console.log(e.childNodes.length);
				//console.log($(e).children().length);
				if($(e).children().length==0){
					$("<li>").html($(e).attr("label")).appendTo(parent);
				}else{
					var p=$("<li>").html($(e).attr("label")).appendTo(parent);
					p.append(buildTree($(e)));
				}
			});
			//console.log(parent[0]);
			//parent.appendTo($("body"));
			return parent;
		}
  	});
  </script>
  <body>
    &lt;node label='total'&gt;&lt;node label='管理员' value='1'&gt;&lt;node label='配置人员' value='41'&gt;&lt;/node&gt;&lt;/node&gt;&lt;node label='租户管理员' value='2'&gt;&lt;node label='董事长' value='21'&gt;&lt;node label='执行官' value='22'&gt;&lt;node label='市场销售部' value='23'&gt;&lt;node label='销售' value='28'&gt;&lt;/node&gt;&lt;/node&gt;&lt;node label='技术部' value='24'&gt;&lt;node label='开发人员' value='29'&gt;&lt;/node&gt;&lt;node label='产品经理' value='30'&gt;&lt;node label='产品人员' value='32'&gt;&lt;/node&gt;&lt;/node&gt;&lt;node label='美工' value='31'&gt;&lt;/node&gt;&lt;/node&gt;&lt;node label='财务部' value='25'&gt;&lt;/node&gt;&lt;node label='行政部' value='26'&gt;&lt;/node&gt;&lt;/node&gt;&lt;/node&gt;&lt;/node&gt;&lt;/node&gt;
  </body>
</html>
