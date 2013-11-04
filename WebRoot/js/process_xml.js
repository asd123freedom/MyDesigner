;$(function(window,undefined){
	var c=$("container");
	//记得写初始化变量的代码
	var workflowprocess={};
	var packagedefinition=$("<Package>");
	packagedefinition.attr("Id","package1");
	var packageheader=$("<PackageHeader>");
	$("<XPDLVersion>").html("2.1").appendTo(packageheader);
	$("<Vendor>").html("TSEG").appendTo(packageheader);
	var d=new Date();
	$("<Created>").html(d.toString()).appendTo(packageheader);
	packageheader.appendTo(packagedefinition);
	$("#container").data("w",workflowprocess);
	$("#container").data("p",packagedefinition);
	//得在页面中new一下，放到数组里，存到某一个对象上
	workflowprocess.getXml=function(obj){
		var xml=$("<WorkflowProcess>");
		if(!c.data("process_id")){
			xml.attr("Id","test");
		}else{
			xml.attr("Id",c.data("process_id"));
		}
		//应用的xml(应该写在packge标签下)
		var p=$("#container").data("p");
		var applications=workflowprocess["applications"]|| [];
		for(var i=0;i<applications.length;i++){
			applications[i].parent=p;
			applications[i].getXml();
		}
		$("#container").data("p",p);
		//xml.appendTo(obj);
		//形参xml(暂时没有实现)
		//数据域xml(暂时没有实现)
		//参与者xml		
		var par_xml=$("<Participants>");
		//要在页面中存储参与者数组
		var participants=workflowprocess["participants"];
		console.log(participants);
		//var participants=c.data("participants");
		//先把参与者的drop方法实现
		if(participants.length>0){
				for(var i=0;i<participants.length;i++){
					//console.log(participants[i]);
					participants[i].parent=xml;
					participants[i].getXml();
				}
				//$(participants).each(function(index,e){
				//	e.parent=xml;
				//	e.getXml();
				//});	
		}else{
				var temp_part=new participant("default_participant");
				temp_part.parent=xml;
				temp_part.getXml();
		}
		//活动XML
		var temp_activities=$("<Activities>");
		var activities=workflowprocess["activities"] || [];
		for(var i=0;i<activities.length;i++){
				//console.log(activities[i]);
				activities[i].parent=xml;
				activities[i].getXml();
		}
		var transitions=workflowprocess["transitions"] || [];
		for(var i=0;i<transitions.length;i++){
				//console.log(activities[i]);
				transitions[i].parent=xml;
				transitions[i].getXml();
		}
		if($("#container").data("w").start){
			this.start.parent=xml;
			this.start.getXml();
		}
		if($("#container").data("w").end){
			this.end.parent=xml;
			this.end.getXml();
		}
		//console.log(xml);
		return xml;
	};
});