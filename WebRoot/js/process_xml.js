;$(function(window,undefined){
	//记得写初始化变量的代码
	var c=$("#container");
	var workflowprocess={};
	var packagedefinition=$("<Package>");
	packagedefinition.attr("Id","package1");
	var packageheader=$("<Package_Header>");
	$("<XPDLVersion>").html("2.1").appendTo(packageheader);
	$("<Vendor>").html("TSEG").appendTo(packageheader);
	//关于包的创建时间这里有一个bug需要修改
	var d=new Date();
	var raw_date=d.toString().split(" ");
	raw_date[6]=raw_date[3];
	raw_date[3]="";
	var str=raw_date.join(" ");
	$("<Created>").html(str).appendTo(packageheader);
	packageheader.appendTo(packagedefinition);
	$("#container").data("w",workflowprocess);
	$("#container").data("p",packagedefinition);
	//得在页面中new一下，放到数组里，存到某一个对象上
	//processHeader里面事件用toDateString方法
	workflowprocess.getXml=function(obj){
		var d=new Date();
		var package=$("#container").data("p");
		package.attr("Id",this.workflow || "newPackage");
		var raw_date=d.toString().split(" ");
		raw_date[6]=raw_date[3];
		raw_date[3]="";
		var str=raw_date.join(" ");
		package.find("created").html(str);
		var xml=$("<Workflow_Process>");
		xml.attr("Id",this.workflow || "workflowProcess1");
		//应用的xml(应该写在packge标签下)
		var p=$("#container").data("p");
		p.children().remove();
		var applications_label=$("<applications>");		
		var applications=workflowprocess["applications"]|| [];
		for(var i=0;i<applications.length;i++){
			applications[i].parent=applications_label;
			applications[i].getXml();
		}
		applications_label.appendTo(p);
		$("#container").data("p",p);
		//xml.appendTo(obj);
		//形参xml(暂时没有实现)
		//数据域xml(暂时没有实现)
		//参与者xml
		var processHeader=$("<Process_Header>");
		
		$("<Created>").html(d.toDateString()).appendTo(processHeader);
		$("<Description>").appendTo(processHeader);	
		processHeader.appendTo(xml);
		var par_xml=$("<Participants>");
		//要在页面中存储参与者数组
		var participants=workflowprocess["participants"] || [];
		console.log(participants);
		var participants_name_arr=[];
		//参与者XML
		if(participants.length>0){
				for(var i=0;i<participants.length;i++){
					//console.log(participants[i]);
					participants[i].parent=par_xml;
					if(participants[i].name=='default_participant'){
						participants_name_arr.push(participants[i].name);
						continue;
					}
					participants_name_arr.push(participants[i].name);
					participants[i].getXml();
				}
		}else{
				//var temp_part=new participant("default_participant");
				//temp_part.parent=xml;
				//temp_part.getXml();
		}
		par_xml.appendTo(xml);
		//活动XML
		var temp_activities=$("<Activities>");
		var activities=workflowprocess["activities"] || [];
		for(var i=0;i<activities.length;i++){
				//console.log(activities[i]);
				activities[i].parent=temp_activities;
				activities[i].getXml();
		}
		temp_activities.appendTo(xml);
		var temp_transitions=$("<Transitions>");
		var transitions=workflowprocess["transitions"] || [];
		for(var i=0;i<transitions.length;i++){
				//console.log(activities[i]);
				transitions[i].parent=temp_transitions;
				transitions[i].getXml();
		}
		temp_transitions.appendTo(xml);
		var es=$("<Extended_Attributes>");
		if(this.isTerminationImplicit===undefined){
			this.isTerminationImplicit=true;
		}
		var e2=new extended_attribute("TSEGBPM_GRAPH_PARTICIPANT_ORDER",participants_name_arr.join(","));
		e2.parent=es;
		e2.getXml();
		var e1=new extended_attribute("isTerminationImplicit",this.isTerminationImplicit+"");
		e1.parent=es;
		e1.getXml();
		if($("#container").data("w").start){
			this.start.parent=es;
			this.start.getXml();
		}
		if($("#container").data("w").end){
			this.end.parent=es;
			this.end.getXml();
		}
		//<ExtendedAttribute Name="TSEGBPM_GRAPH_PARTICIPANT_ORDER" Value="default_participant,participant2"/>
    	//<ExtendedAttribute Name="isTerminationImplicit" Value="true"/>
		es.appendTo(xml);
		return xml;
	};
});