var getProcessDefinition=function(){
	$.ajax({
		url: "http://127.0.0.1:8080/MyDesigner/MyDesigner.json",
		type: "POST",
		dataType:"xml",
		success:function(data){
			//console.log($(data).find("Application"));
			//parseApplication($(data).find("Application"));
			//var obj=$("#container").data("parseFun").appendNewElement;
			//parseActivities($(data).find("Activity"),obj);
			//selectContainer(data);
			parseParticipants(data,addElement);
		}
	});
}
function addElement(container,str,src,x,y,name){
	var incoming=str;
	var new_element=$('<img>').attr("src",src).addClass("dropped").addClass("unselected");
	var num_y=$(container).css("height").match(/\d*/);
	var parent=null;
	var arr=$("#container").data("w").participants || [];
	var name="";
	var new_container=null;
	var off_y=(num_y[0])*(arr.length-1)+119+10*(arr.length-1);
	var index=0;
	//var name_index=0;
	var span=$("<span>").css({
		position:'absolute',
		display:'none'
	});
	if(incoming!="participant" && incoming!="default_participant"){
			parent=$('<div>').css({
				position:'absolute',
				left:x,
				top:y
			})
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
			createTransition(getFrom(),getTo(),stateMachineConnector);
		}
	});
};
var parseApplication=function(data){
	$(data).each(function(index,e){
		var name=$(e).attr("Id");
		if(name.indexOf("application")==0){
			//表单应用
			console.log(name);
			$("#container").trigger("formapplication",[name]);
			var arr_apps=$("#container").data("w").applications;
			var app=arr_apps[arr_apps.length-1];
			var arr_module=$(e).find("Modules").children();
			console.log(arr_module);
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
var parseActivities=function(data,addElement){
	$(data).each(function(index,e){
		if($(e).attr("Id").indexOf("business")==0){
			var name=$(e).attr()
			var performer=$(e).find("ExtendedAttribute[Name='TSEGBPM_GRAPH_PATICIPANT_ID']").attr("Value");
			$("#container").trigger("activity",[name,performer]);
			//参与者的显示

		}else if($(e).attr("Id").indexOf("human")==0){

		}
	});
}
var parseParticipants=function(data,addElement){
	var obj=selectContainer(data);
	for(item in obj){
		if(obj.hasOwnProperty(item)){
			$("#container").trigger(item.replace(/\d+/,""),[item]);
			var arr_participant=$("#container").data('w').participants;
			if(arr_participant.length>0){
				var src=$("#toolBar").find("#"+item.replace(/\d+/,"")).attr('src');
				var str=item.replace(/\d+/,"");
				var container=$("#container");
				//console.log(addElement);
				addElement(container,str,src);
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
			obj_container[arr_participant[i]]='container'+i;
		}
	}
	return obj_container;
}
