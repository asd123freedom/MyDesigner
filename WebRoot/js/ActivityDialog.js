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
	});
	$("#new_course_dialog").on("show_get",function(){
			Model.showGetOptionFilled(dict_appname);
	});
	$("#new_course_dialog").on("show_save",function(){
			Model.showSaveOptionFilled(dict_appname);
	});
	$("#new_course_dialog").on("show_edit",function(){
			//修改数据业务和存数据业务公用代码
			Model.showSaveOptionFilled(dict_appname);
	});
	$("#new_course_dialog").on("init",function(){
			var obj=$("#new_course_dialog").data("obj");
	  		var arr=$("#container").data("w").activities || [];
	  		$(arr).each(function(index,e){
	  			if(obj.attr("id")==e.name){
	  				$("input.participant_name").val(e.performer);
	  			}
	  		});
			$("select.app_type").trigger("change");			
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
					app.Type="Class";
					app.BusinessType=$("select.app_type").val();
					app.ClassPath=dict_classpath[$("select.app_type").val()];
					//app.ModuleID=$(".Module").val();
					var patrnt=e;
					var actual=[];
					$("table.get").find("tr.actual").each(function(index,e){
						var a=new ActualParameter();
						a.module=$(e).find("td.module").text();
						a.moduleID=$(e).find("td.moduleID").text();
						a.fieldID=$(e).find("td.fieldID").text();
						a.field=$(e).find("td.field").text();
						a.actualName=$(e).find(".actualParam").find("input").val();
						a.content=a.moduleID+";"+"RECORDID;"+a.fieldID+";"+a.actualName;
						//a.parent=parent;
						//var str=MoudleID+";"+"RECORDID;"+FieldID+";"+act;
						//console.log(str);
						console.log(a);
						actual.push(a);
					});
					//var w1=$("#container").data("w") || {};
					//w1.actualParameters=w1.actualParameters || [];
					//w1.actualParameters=w1.actualParameters.concat(actual);
					//$("#container").data("w",w1);
					e.taskApplicationId=app.Name;
					e.taskApplicationType="get";
					e.actualParameters=actual;
					$(e).data("app",app);
  				}
  			});
	});
	$("#new_course_dialog").on("save",function(){
		var obj=$(this).data("obj");
		var arr=$("#container").data("w").activities || [];
		console.log(arr);
		$(arr).each(function(index,e){
			if(obj.attr("id")==e.name){
				//将设置好的参数传给相应的activity对象
				$("#container").trigger("application");
				var arr=$("#container").data("w").applications;  					
				var app=arr[arr.length-1];
				app.Name=$("select.app_type").val()+""+arr.length;
				app.Type="Class";
				app.BusinessType=$("select.app_type").val();
				app.ClassPath=dict_classpath["SaveBusinessFormData"];
				var parent=e;
				var actual=[];
				$("table.save").find("tr.actual").each(function(index,e){
						var a=new ActualParameter();
						a.ID=$(e).find("td.id").text();
						a.module=$(e).find("td.module").text();
						a.moduleID=$(e).find("td.moduleID").text();
						a.fieldID=$(e).find("td.fieldID").text();
						a.field=$(e).find("td.field").text();
						a.ActualParam=$(e).find("td.actualParam").text();
						a.recordID=$(e).find("td.recordID").text();
						a.content=a.ID+";"+a.moduleID+";"+a.fieldID+";"+
								  a.ActualParam+";"+a.recordID;
						actual.push(a);
				});
				e.taskApplicationId=app.Name;
				e.taskApplicationType="save";
				e.actualParameters=actual;
				$(e).data("app",app);
			}
		});
	});
	$("#new_course_dialog").on("edit",function(){
		var obj=$(this).data("obj");
		var arr=$("#container").data("w").activities || [];
		console.log(arr);
		$(arr).each(function(index,e){
			if(obj.attr("id")==e.name){
				//将设置好的参数传给相应的activity对象
				$("#container").trigger("application");
				var arr=$("#container").data("w").applications;  					
				var app=arr[arr.length-1];
				app.Name=$("select.app_type").val()+""+arr.length;
				app.Type="Class";
				app.BusinessType=$("select.app_type").val();
				app.ClassPath=dict_classpath["EditBusinessFormData"];
				var parent=e;
				var actual=[];
				$("table.save").find("tr.actual").each(function(index,e){
						var a=new ActualParameter();
						a.ID=$(e).find("td.id").text();
						a.module=$(e).find("td.module").text();
						a.moduleID=$(e).find("td.moduleID").text();
						a.fieldID=$(e).find("td.fieldID").text();
						a.field=$(e).find("td.field").text();
						a.ActualParam=$(e).find("td.actualParam").text();
						a.recordID=$(e).find("td.recordID").text();
						a.content=a.moduleID+";"+a.recordID+";"+a.fieldID+";"+
								  a.ActualParam;
						console.log(a.content);
						actual.push(a);
				});
				e.taskApplicationId=app.Name;
				e.taskApplicationType="save";
				e.actualParameters=actual;
				$(e).data("app",app);
			}
		});
	});
	$("#new_course_dialog").on("send",function(){
		var obj=$(this).data("obj");
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
				app.ReceiverId_val=$("select.receive_id").val() || $("input.receive_actual").val();
				var id="";
				if(!$("input.receive_actual").val() && !$("select.receive_id").val()){
					alert("填写接收人");
					return;
				}
				if($("input.receive_actual").val()){
				    app.ReceiverType="user";
				    id="1"+":"+$("input.receive_actual").val();
				    app.ReceiverId=id;
				}else{
					id="0"+":"+$("select.receive_id").val().match(/\d+/)[0];
					app.ReceiverId=id;
				}
				e.taskApplicationId=app.Name;
				e.taskApplicationType="send";
				app.Content=$("textarea.app_info").val().replace(/\s+/,"");;
				console.log(app.Content);
				$(e).data("app",app);
			}
		});
	});
	$("#new_course_dialog").on("delete",function(){
		var obj=$(this).data("obj");
		var arr=$("#container").data("w").activities || [];
		console.log(arr);
		$(arr).each(function(index,e){
			if(obj.attr("id")==e.name){
				arr.splice(index,1);	
			}
		});
	});
	//这个函数不应该放在这儿，以后改
	$('#new_course_dialog').on('submit', function (e,name) {
		console.log(name);
		if(name=="pojo"){
			var obj=$(this).data("obj");
			var arr=$("#container").data("w").activities || [];
			//console.log(arr);
			if($("#new_course_dialog").find(".btn-danger").hasClass("disabled")){
				$("#new_course_dialog").trigger("delete");
				return;
			}	
			if($("select.app_type").val().toLocaleLowerCase().indexOf("send")>=0){
				$('#new_course_dialog').trigger("send");
			}
			if($("select.app_type").val().toLocaleLowerCase().indexOf("get")>=0){
				$('#new_course_dialog').trigger("get");
			}
			if($("select.app_type").val().toLocaleLowerCase().indexOf("save")>=0){
				$('#new_course_dialog').trigger("save");
			}
			if($("select.app_type").val().toLocaleLowerCase().indexOf("edit")>=0){
				$('#new_course_dialog').trigger("edit");
			}
		}			
	});
	$('#new_course_dialog').on('hidden',function(){
		$('#new_course_dialog').data("obj",null);
	});
});
