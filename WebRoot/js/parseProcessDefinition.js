$(function(){

var parseProcessDefinition=function(){
	$.ajax({
		url: "http://127.0.0.1:8080/MyDesigner/MyDesigner.json",
		type: "POST",
		dataType:"xml",
		success:function(data){
			var obj=selectContainer(data);
			//console.log(obj);
			//console.log($(data).find("Application"));
			parseApplication($(data).find("Application"));
			//var obj=$("#container").data("parseFun").appendNewElement;
			//parseActivities($(data).find("Activity"),obj);
			//selectContainer(data);
			//console.log($(data).find("ActualParameter"));
			parseParticipants(data,addElementForParse);
			parseActivities(data,$(data).find("Activity"),addElementForParse,obj);
			parseStart(data,addElementForParse,obj);
			parseEnd(data,addElementForParse,obj);
			parseTransitions(data);
		}
	});
}
$(".menu .importOrder").bind("click",function(){
	parseProcessDefinition();
});
function createTransitionForParse(from,to,stateMachineConnector,show_name,name){
	//stateMachineConnector=$("#toolBar").data("option");
	var come=from;
	var go=to;
	if(come===go){
		setFrom(null);
		setTo(null);
		return;
	}
	var connect=null;
	var num=$("#container").data("transition")|| 0;
	num++;
	$("#container").data("transition",num);
	connect=jsPlumb.connect({
			source:come,
			target:go,
	},stateMachineConnector);
	//console.log(show_name);
	connect.setLabel({ cssClass:"component label",label:show_name+"", location:0.5 });
	if(from.indexOf("start")<0 && to.indexOf("end")<0){					
			$("#container").trigger("transition",[from,to,name,show_name]);
	}else if(from.indexOf("start")>=0){
		$("#container").data("w").start.connecting=to;
	}else if(to.indexOf("end")>=0){
		$("#container").data("w").end.connecting=from;
	}
	//将起点和终点恢复成空值
	setFrom(null);
	setTo(null);
	connect.bind("dblclick", function(conn) {
			$('#new_course_dialog').data('tran',conn);
			$('#new_course_dialog').modal('show');
			//jsPlumb.detach(conn);
	});
	return connect;
}
function triggerForParse(container,str,performer){
	var _this=$(container);
	console.log(str);
	var num=$("#container").data(str)|| 0;
	num++;
	$("#container").data(str,num);
	if(str.indexOf("activity")>0 && str.indexOf("route")==-1){
		_this.trigger("activity",[str,performer]);
	}else if(str.indexOf("route")>=0 || (str=='start' || str=='end')){
		_this.trigger(str,[str,performer]);
	}else{
		_this.trigger(str);
	}
}
function addElementForParse(container,str,src,x,y,name){
	var incoming=str;
	var new_element=$('<img>').attr("src",src).addClass("dropped").addClass("unselected");
	var num_y=$(container).css("height").match(/\d*/);
	var parent=null;
	var arr=$("#container").data("w").participants || [];
	//var name="";
	var new_container=null;
	var off_y=(num_y[0])*(arr.length-1)+119+10*(arr.length-1);
	var index=0;
	//var name_index=0;
	var span=$("<span>").css({
		position:'absolute',
		display:'none'
	});
	x=parseInt(x);
	y=parseInt(y);
	if(incoming!="participant" && incoming!="default_participant"){
			parent=$('<div>').css({
				position:'absolute',
				left:x,
				top:y
			});
			span.css({
				left:0,
				top:32,
				width:50
			});
	}else{
			parent=$('<div>').css({
				position:'absolute',
				left:27,
				top:off_y,
			});
			
			span.css({
				left:0,
				top:32,
				width:50
			});
	}
	new_element.attr("title",name);
	new_element.appendTo(parent);
	span.appendTo(parent);//要想修改它的位置要在append操作之后修改
	parent.attr("id",name).addClass("dropped");
	//双击图标事件
	parent.bind("dblclick",function(){
		$(".dialog").trigger("click",[$(this)]);
	});
	if(new_container=addNewLine(container,incoming)){
		parent.appendTo(new_container);
	}else{		
		parent.appendTo(container);
	}
	jsPlumb.draggable(parent,{revert: "invalid",
		stop:function(e){
			//console.log($(e.target).attr("id"));
		}
	});
	var stateMachineConnector=$("#toolBar").data("option");
	parent.bind("click",function(){
		if($("#unCondition_transition").hasClass("unselected")){
			return;
		}
		if(!getFrom() && !getTo()){
			setFrom($(this).attr("id"));
		}else if(getFrom() && !getTo()){
			setTo($(this).attr("id"));
			createTransitionForParse(getFrom(),getTo(),stateMachineConnector);
		}
	});
};
var parseApplication=function(data){
	$(data).each(function(index,e){
		var name=$(e).attr("Id");
		if(name.indexOf("application")==0){
			//表单应用
			//console.log(name);
			$("#container").trigger("formapplication",[name]);
			var arr_apps=$("#container").data("w").applications;
			var app=arr_apps[arr_apps.length-1];
			var arr_module=$(e).find("Modules").children();
			//console.log(arr_module);
			for(var i=0;i<arr_module.length;i++){
				var module=new Module();
				app.Form.Modules.push(module);
				module.ModuleId=$(arr_module[i]).find("ModuleId").html();
				module.ModuleName=$(arr_module[i]).find("ModuleName").html();
				var arr_formalParam=$(arr_module[i]).find("FormalParameter");
				for(var i=0;i<arr_formalParam.length;i++){
					var formalParam=new FormalParameter();
					module.FormalParameters.push(formalParam);
					var formalParam_name=$(arr_formalParam[i]).attr("Id");
					formalParam.Name=formalParam_name.split("_")[0];
					formalParam.Id=formalParam_name;
					formalParam.BasicType=$(arr_formalParam[i]).find("BasicType").attr("Type");
					formalParam.Mode=$(arr_formalParam[i]).attr("Mode");
				}
			}
			arr_module=$(e).find("ChildModules").children();
			for(var i=0;i<arr_module.length;i++){
				var module=new Module();
				app.Form.ChildModules.push(module);
				module.ModuleId=$(arr_module[i]).find("ModuleId").html();
				module.ModuleName=$(arr_module[i]).find("ModuleName").html();
				var arr_formalParam=$(arr_module[i]).find("FormalParameter");
				for(var i=0;i<arr_formalParam.length;i++){
					var formalParam=new FormalParameter();
					module.FormalParameters.push(formalParam);
					var formalParam_name=$(arr_formalParam[i]).attr("Id");
					formalParam.Name=formalParam_name.split("_")[0];
					formalParam.Id=formalParam_name;
					formalParam.BasicType=$(arr_formalParam[i]).find("BasicType").attr("Type");
					formalParam.Mode=$(arr_formalParam[i]).attr("Mode");
				}
			}
		}else{
			//业务活动用到的应用的解析要和业务活动的解析一起
		}
	});
}
var parseActivities=function(parent,data,addElement,obj){
	var async_len=$(data).find("TaskApplication[Id*='Get']").find("ActualParameter").length;
	async_len=async_len*2;
	var async_count=0;
	$("body").data("async",async_count);
	//console.log(async_len);
	$(data).each(function(index,e){
		if($(e).attr("Id").indexOf("business")==0){
			var name=$(e).attr("Id");
			var performer=$(e).find("ExtendedAttribute[Name='TSEGBPM_GRAPH_PATICIPANT_ID']").attr("Value");
			//$("#container").trigger("activity",[name,performer]);
			triggerForParse($("#container"),name.replace(/\d+/,""),performer);
			var temp_len=$("#container").data("w").activities.length;
			var activity=$("#container").data("w").activities[temp_len-1];
			activity.name=name;
			activity.show_name=$(e).attr("Name");
			//活动图标的显示
			var str=name.replace(/\d+/,"");
			var src=$("#toolBar").find("#"+name.replace(/\d+/,"")).attr('src');
			var offset=$(e).find("ExtendedAttribute[Name='TSEGBPM_GRAPH_OFFSET']").attr("Value");
			var x=offset.split(",")[0];
			var y=offset.split(",")[1];
			var container=$("#"+obj[performer]);
			addElementForParse(container,str,src,x,y,name);
			//实参的解析
			var actual=[];
			activity.actualParameters=actual;
			$(e).find("ActualParameter").each(function(index,ele){
				var str=$(ele).html();
				var strs=str.split(";");
				var a=new ActualParameter();
				a.moduleID=strs[0];
				a.fieldID=strs[2];
				a.actualName=strs[3];
				a.content=str;
				var data1={"moduleId":parseInt(a.moduleID)};
				Model.findAllDynamicModuleMetaData().done(function(data){
					for(var i=0;i<data.length;i++){
						if(data[i].moduleID==a.moduleID){
							a.module=data[i].modulelabel;
							var count=$("body").data("async");
							count++;
							$("body").data("async",count);
							if(count==async_len){
								alert("异步调用全部完成");
							}
							break;
						}
					}
				});
				Model.findFieldbyDynamicModule(data1).done(function(data){
					for(var i=0;i<data.length;i++){
						if(data[i].fieldId==a.fieldID){
							a.field=data[i].fieldLable;
							var count=$("body").data("async");
							count++;
							$("body").data("async",count);
							if(count==async_len){
								alert("异步调用全部完成");
							}
							break;
						}
					}
				});
				actual.push(a);
			});
			//业务活动的应用的解析
			var app_name=$(e).find("TaskApplication").attr("Id");
			$("#container").trigger("application");			
			var arr_apps=$("#container").data("w").applications;
			var app=arr_apps[arr_apps.length-1];
			$(activity).data("app",app);
			var pojo_app=$(parent).find("Application[Id='"+app_name+"']");
			if(app_name.indexOf("Send")==0){
				//发送消息的任务
				app.Name=app_name;
				app.Type=$(pojo_app).find("ExtendedAttribute[Name='Type']").attr("Value");
				app.ClassPath=$(pojo_app).find("ExtendedAttribute[Name='ClassPath']").attr("Value");
				app.ReceiverType=$(pojo_app).find("ExtendedAttribute[Name='ReceiverType']").attr("Value");
				if(app.ReceiverType=='user'){
					app.ReceiverType_index=0;
				}else if(app.ReceiverType=='role'){
					app.ReceiverType_index=1;
				}else{
					app.ReceiverType_index=2;
				}
				app.ReceiverId_val=$(pojo_app).find("ExtendedAttribute[Name='ReceiverId']").attr("Value").split(":")[1];
				app.ReceiverId=$(pojo_app).find("ExtendedAttribute[Name='ReceiverId']").attr("Value");
				app.Content=$(pojo_app).find("ExtendedAttribute[Name='Content']").attr("Value")
				activity.taskApplicationId=app.Name;
				activity.taskApplicationType="send";
			}else{
				//其他类型的任务
				app.Name=app_name;
				app.Type="Class";
				app.BusinessType=$(pojo_app).find("ExtendedAttribute[Name='BusinessType']").attr("Value");
				activity.taskApplicationId=app.Name;
				if(app.BusinessType.indexOf('Get')==0){
					activity.taskApplicationType="get";
				}else if(app.BusinessType.indexOf('Save')==0){
					activity.taskApplicationType="save";
				}else if(app.BusinessType.indexOf('Edit')==0){
					activity.taskApplicationType="edit";
				}
			}
		}else if($(e).attr("Id").indexOf("human")==0){
			//人工活动
			var name=$(e).attr("Id");
			var performer=$(e).find("ExtendedAttribute[Name='TSEGBPM_GRAPH_PATICIPANT_ID']").attr("Value");
			//$("#container").trigger("activity",[name,performer]);
			triggerForParse($("#container"),name.replace(/\d+/,""),performer);
			var temp_len=$("#container").data("w").activities.length;
			var activity=$("#container").data("w").activities[temp_len-1];
			activity.name=name;
			activity.show_name=$(e).attr("Name");
			activity.taskApplicationId=$(e).find("TaskApplication").attr("Id");
			//活动图标的显示
			var str=name.replace(/\d+/,"");
			var src=$("#toolBar").find("#"+name.replace(/\d+/,"")).attr('src');
			var offset=$(e).find("ExtendedAttribute[Name='TSEGBPM_GRAPH_OFFSET']").attr("Value");
			var x=offset.split(",")[0];
			var y=offset.split(",")[1];
			//console.log(obj[performer]);
			var container=$("#"+obj[performer]);
			addElementForParse(container,str,src,x,y,name);
			//实参的解析
			var actual=[];
			activity.actualParameters=actual;
			$(e).find("ActualParameter").each(function(index,ele){
				var a=new ActualParameter();
                a.content=$(ele).html();
                actual.push(a);
			});
			activity.loopcounter=$(e).find("LoopCounter").html();
			activity.task_type="Task";
			activity.signalmode=$(e).find("ExtendedAttribute[Name='SIGNALMODE']").attr("Value");
		}else if($(e).attr("Id").indexOf("join")>=0){
			var name=$(e).attr("Id");
			var performer=$(e).find("ExtendedAttribute[Name='TSEGBPM_GRAPH_PATICIPANT_ID']").attr("Value");
			//$("#container").trigger("activity",[name,performer]);
			triggerForParse($("#container"),name.replace(/\d+/,""),performer);
			var temp_len=$("#container").data("w").activities.length;
			var activity=$("#container").data("w").activities[temp_len-1];
			activity.name=name;
			activity.show_name=$(e).attr("Name");
			//活动图标的显示
			var str=name.replace(/\d+/,"");
			var src=$("#toolBar").find("#"+name.replace(/\d+/,"")).attr('src');
			var offset=$(e).find("ExtendedAttribute[Name='TSEGBPM_GRAPH_OFFSET']").attr("Value");
			var x=offset.split(",")[0];
			var y=offset.split(",")[1];
			//console.log(obj[performer]);
			var container=$("#"+obj[performer]);
			addElementForParse(container,str,src,x,y,name);
			var tranRefs=[];
	        var tran_arr=$(e).find("TransitionRef");
	        for(var i=0;i<tran_arr.length;i++){
	            tranRefs.push($(tran_arr[i]).attr("Id"));
	        }
            activity.TransitionRefs=tranRefs;
            activity.split_type=$(e).find("Split").attr("Type");
            activity.OutgoingCondition=$(e).find("Split").attr("OutgoingCondition");
		}else if($(e).attr("Id").indexOf("join")>=0){
			var name=$(e).attr("Id");
			var performer=$(e).find("ExtendedAttribute[Name='TSEGBPM_GRAPH_PATICIPANT_ID']").attr("Value");
			//$("#container").trigger("activity",[name,performer]);
			triggerForParse($("#container"),name.replace(/\d+/,""),performer);
			var temp_len=$("#container").data("w").activities.length;
			var activity=$("#container").data("w").activities[temp_len-1];
			activity.name=name;
			activity.show_name=$(e).attr("Name");
			//活动图标的显示
			var str=name.replace(/\d+/,"");
			var src=$("#toolBar").find("#"+name.replace(/\d+/,"")).attr('src');
			var offset=$(e).find("ExtendedAttribute[Name='TSEGBPM_GRAPH_OFFSET']").attr("Value");
			var x=offset.split(",")[0];
			var y=offset.split(",")[1];
			//console.log(obj[performer]);
			var container=$("#"+obj[performer]);
			addElementForParse(container,str,src,x,y,name);
            activity.join_type=$(e).find("Join").attr("Type");
            activity.IncomingCondition=$(e).find("Join").attr("IncomingCondition");
		}
	});
}
var parseParticipants=function(data,addElement){
	var obj=selectContainer(data);
	for(item in obj){
		if(obj.hasOwnProperty(item)){
			//$("#container").trigger(item.replace(/\d+/,""),[item]);
			triggerForParse($("#container"),item.replace(/\d+/,""));
			var arr_participant=$("#container").data('w').participants;
			if(arr_participant.length>0){
				var src=$("#toolBar").find("#"+item.replace(/\d+/,"")).attr('src');
				var str=item.replace(/\d+/,"");
				var container=$("#container");
				addElementForParse(container,str,src,0,0,item);
				var part=arr_participant[arr_participant.length-1];
				if(item!="default_participant"){
					var element=$(data).find("Participant[Id='"+item+"']");
					part.show_name=$(element).attr("Name");
					var raw_type=$(element).find("ParticipantType").attr("Type");
					if(raw_type=="HUMAN"){
						part.type="user";
					}else if(raw_type=="ORGANIZATIONAL_UNIT"){
						part.type="group";
					}else if(raw_type=="ROLE"){
						part.type="role";
					}else if(raw_type=="RESOURCE_SET"){
						part.type="area";
					}
				}
				part.Description=$(element).find("Description");
			}
		}
	}

};
//将参与者分解出来，并设置好想对应的容器的Id
var selectContainer=function(data){
	var participant_order=$(data).find("ExtendedAttribute[Name='TSEGBPM_GRAPH_PARTICIPANT_ORDER']");
	var arr_participant=participant_order.attr("Value").split(",");
	var obj_container={};
	for(var i=0;i<arr_participant.length;i++){
		if(i==0){
			obj_container[arr_participant[i]]='container';
		}else{
			obj_container[arr_participant[i]]='container'+(i+1);
		}
	}
	return obj_container;
}
var parseStart=function(data,addElement,obj){
	var str=$(data).find("ExtendedAttribute[Name='TSEGBPM_GRAPH_START_ACTIVITY']").attr("Value");
	str=str.split(",");
	var incoming='start';
	var src=$("#toolBar").find("#start").attr('src');
	var container=$("#"+obj[str[0].split("=")[1]]);
	var x=str[2].split("=")[1];
	var y=str[3].split("=")[1];
	addElement(container,incoming,src,x,y,"start1");
	triggerForParse($("#container"),"start",str[0].split("=")[1]);
	var conn_activity=str[1].split("=")[1];
	createTransitionForParse("start1",conn_activity,$("#toolBar").data("option"),"");
}
var parseEnd=function(data,addElement,obj){
	var str=$(data).find("ExtendedAttribute[Name='TSEGBPM_GRAPH_END_ACTIVITY']").attr("Value");
	str=str.split(",");
	var incoming='start';
	var src=$("#toolBar").find("#end").attr('src');
	var container=$("#"+obj[str[0].split("=")[1]]);
	var x=str[2].split("=")[1];
	var y=str[3].split("=")[1];
	addElement(container,incoming,src,x,y,"end1");
	trigger($("#container"),"end",str[0].split("=")[1]);
	var conn_activity=str[1].split("=")[1];
	createTransitionForParse(conn_activity,"end1",$("#toolBar").data("option"),"");
}
var parseTransitions=function(data){
	$(data).find("Transition").each(function(index,e){
		var from=$(e).attr("From");
		var to=$(e).attr("To");
		var info=$(e).attr("Id").replace(/[a-zA-Z]+/g,"");
		createTransitionForParse(from,to,$("#toolBar").data("option"),info,$(e).attr("Id"));
		var arr=$("#container").data("w").transitions;
		var tran=arr[arr.length-1];
		tran.condition=$(e).find("Condition").html();
	});
}

});