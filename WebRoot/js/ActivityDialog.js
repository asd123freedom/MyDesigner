;$(function(window,undefined){
	var dict_classpath={
		"SendRemindMessage":"org.tseg.tsegbpm.BusinessApplication.SendMsgPojo",
		"SaveBusinessFormData":"org.tseg.tsegbpm.BusinessApplication.SaveBusinessFormDataHandler",
		"GetBusinessFormData":"org.tseg.tsegbpm.BusinessApplication.GetBusinessFormDataHandler",
		"EditBusinessFormData":"org.tseg.tsegbpm.BusinessApplication.EditBusinessFormDataHandler",
	};
	var dict_appname={
		"SendRemindMessage":"发送提醒",
		"SaveBusinessFormData":"存业务数据",
		"GetBusinessFormData":"取业务数据",
		"EditBusinessFormData":"修改业务数据",
	};
	$("#new_course_dialog").on("show_send",function(){
				Model.showSendOptionFilled(dict_appname);
				//$("select.app_type").trigger("change");
				/*var obj=$("#new_course_dialog").data("obj");
				console.log(obj);
	  			var arr=$("#container").data("w").activities || [];
	  			console.log(arr);
	  			$(arr).each(function(index,e){
	  				if(obj.attr("id")==e.name){
	  					var app=$(e).data("app");
	  					$("select.app_type").val(dict_appname[app.Type]);
	  					$("select.app_type").trigger("change");
	  					$("select.receive_type").data("TypeIndex",app.ReceiverType_index);
	  					//$("select.receive_type").find("option:eq("+app.ReceiverType_index+")")
	  					//.attr("selected",true);
	  					//console.log(app.ReceiverId_val);
	  					//$("select.receive_type").trigger("change");
	  					$("select.receive_id").data("IdVal",app.ReceiverId_val);
	  					$("textarea.app_info").val(app.Content);
	  				}
	  			});*/
	});
	$("#new_course_dialog").on("show_get",function(){
				//$("select.app_type").trigger("change");
				Model.showGetOptionFilled(dict_appname);
				/*var obj=$("#new_course_dialog").data("obj");
	  			var arr=$("#container").data("w").activities || [];
	  			console.log(arr);
	  			$(arr).each(function(index,e){
	  				if(obj.attr("id")==e.name){
	  					var app=$(e).data("app");
	  					//console.log(dict_appname[app.BusinessType]);
	  					$("select.app_type").val(app.BusinessType);
	  					//console.log($("select.app_type").val());
	  					$("select.app_type").trigger("change");
//	  					$("select.receive_type").find("option:eq("+app.ReceiverType_index+")")
//	  					.attr("selected",true);
	  					//console.log(app.ReceiverId_val);
	  					$("select.Module").data("ModuleID",app.ModuleID);
	  					console.log(app);
	  					console.log($("select.Module").data("ModuleID"));
	  					$("select.Module").data("arr",e.actualParameters);
	  					//$("select.Field").data("FieldID",app.ReceiverId_val);
	  					//$("textarea.app_info").val(app.Content);
	  				}
	  			});*/
	});
	$("#new_course_dialog").on("init",function(){
			$("select.app_type").trigger("change");
			 /*
			  * $.ajax({
					url: "http://127.0.0.1:8080/HiServiceCRM/findAllUsers.action",
	         		type: "POST",
	         		success:function(data){
						var parent=$("select.receive_id");
	         			//console.log(parent);
						for(var i=0;i<data.length;i++){
							//alert("");
							var opt=parent.find(".temple").clone();
							opt.removeClass("hide temple");
							opt.attr("value",data[i].id+":"+data[i].userName);
							opt.html(data[i].id+":&nbsp&nbsp"+data[i].userName);
							opt.appendTo(parent);
						}
	         		},
	        });
			*/
	});
	$("#new_course_dialog").on("get",function(){
		  	var obj=$(this).data("obj");
  			// console.log($(this).data("obj"));
  			var arr=$("#container").data("w").activities || [];
  			console.log(arr);
  			$(arr).each(function(index,e){
  				if(obj.attr("id")==e.name){
  					//将设置好的参数传给相应的activity对象
  					$("#container").trigger("application");
  					var arr=$("#container").data("w").applications;  					
  					var app=arr[arr.length-1];
  					app.Name=$("select.app_type").val()+""+arr.length;
					//app.Type="Class";
					app.Type=$("select.app_type").val();
					app.ClassPath=dict_classpath[$("select.app_type").val()];
					app.ModuleID=$(".Module").val();
					var actual=[];
					$("table").find("tr.actual").each(function(index,e){
						var a=new ActualParameter();
						a.module=$(e).find("td.module").text();
						a.moduleID=$(e).find("td.moduleID").text();
						a.fieldID=$(e).find("td.fieldID").text();
						a.field=$(e).find("td.field").text();
						a.actualName=$(e).find(".actualParam").find("input").val();
						//var str=MoudleID+";"+"RECORDID;"+FieldID+";"+act;
						//console.log(str);
						console.log(a);
						actual.push(a);
					});
					var w1=$("#container").data("w") || {};
					w1.actualParameters=actual;
					$("#container").data("w",w1);
					e.taskApplicationId=app.Name;
					e.taskApplicationType="get";
					e.actualParameters=actual;
					//app.Content=$("textarea.app_info").val();
					//console.log($("textarea.app_info").val());
					$(e).data("app",app);
  				}
  			});
	});
	$("#new_course_dialog").on("send",function(){
		var obj=$(this).data("obj");
  			// console.log($(this).data("obj"));
  			var arr=$("#container").data("w").activities || [];
  			console.log(arr);
  			$(arr).each(function(index,e){
  				if(obj.attr("id")==e.name){
  					//将设置好的参数传给相应的activity对象
  					//目前只完成了发送提醒的功能，剩下的功能要逐步完成
  					$("#container").trigger("application");
  					var arr=$("#container").data("w").applications;  					
  					var app=arr[arr.length-1];
  					app.Name=$("select.app_type").val()+""+arr.length;
					app.Type=$("select.app_type").val();
					app.ClassPath=dict_classpath[app.Type];
					app.ReceiverType=$("select.receive_type").val();
					app.ReceiverType_index=$("select.receive_type").prop("selectedIndex");
					app.ReceiverId_val=$("select.receive_id").val();
					var id="";
					if(app.ReceiverType!="ActualParameters"){
						id="0"+":"+$("select.receive_id").val().match(/\d+/)[0];
						app.ReceiverId=id;
					}else{
					    app.ReceiverType="user";
					    id="1"+":"+$("select.receive_id").val().match(/\d+/)[0];
					    app.ReceiverId=id;
					}
					e.taskApplicationId=app.Name;
					e.taskApplicationType="send";
					app.Content=$("textarea.app_info").val();
					console.log($("textarea.app_info").val());
					$(e).data("app",app);
  				}
  			});
	});
	//这个函数不应该放在这儿，以后改
	$('#new_course_dialog').on('submit', function (e,name) {
		console.log(name);
		if(name=="pojo"){
			if($("select.app_type").val().toLocaleLowerCase().indexOf("send")>=0){
				$('#new_course_dialog').trigger("send");
			}
			if($("select.app_type").val().toLocaleLowerCase().indexOf("get")>=0){
				$('#new_course_dialog').trigger("get");
			}
		}			
	});
	$('#new_course_dialog').on('hidden',function(){
		$('#new_course_dialog').data("obj",null);
	});
});
