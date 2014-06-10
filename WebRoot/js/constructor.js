var dict_part_type={
		"user":"HUMAN",
		"group":"ORGANIZATIONAL_UNIT",
		"role":"ROLE",
		"area":"RESOURCE_SET",
	};
var dict_extendattr={
		"offset":"TSEGBPM_GRAPH_OFFSET",
		"signalmode":"SIGNALMODE",
		"participant":"TSEGBPM_GRAPH_PATICIPANT_ID",
		"task_type":"TASK_TYPE",
	};
		//this.Name="";
		//this.Type="";
		//this.ClassPath=""
		//this.ReceiverType="";
		//this.ReceiverId="";
		//this.Content="";
		//this.IsFormular="flase";//公式的功能暂时未实现
var application_array=["Name","Type","ClassPath","ReceiverType","ReceiverId","Content","IsFormular","BusinessType"];
	var participant=function(name){
		this.name=name || "default_participant";
		this.parent=null;
		this.show_name="";
		this.Description=null;
		this.type="";
		//还有缺少的属性，编写参与者的对话框时再编写
		this.getXml=function(){
			var temp_part=$("<Participant>")
			temp_part.attr("Id",this.name+"");
			temp_part.attr("name",this.show_name+"");
			var part_type=$("<Participant_Type>");
			console.log(dict_part_type[this.type]);
			part_type.attr("Type",dict_part_type[this.type] || "null");
			part_type.appendTo(temp_part);
			if(!this.Description){
			   //暂时不知道这里应该写什么？
			}else{
				var arr_names=[];
				var human_tasks=$("#"+this.name).parent().find("div[id*='humantaskactivity']");
				$(human_tasks).each(function(index,e){
					arr_names.push($(e).attr("id"));
				});
				var str=arr_names.join(",");
				this.Description.find("Task").attr("_name",str);
				this.Description.appendTo(temp_part);
			}						
			//console.log(this.parent);
			temp_part.appendTo(this.parent);
		};
	};
	var start_activity=function(par){
		this.name='start1';
		this.show_name="TSEGBPM_GRAPH_START_ACTIVITY";
		this.connecting="";
		this.participant=par || "default_participant";
		this.parent=null;
		this.x="";
		this.y="";
		this.getXml=function(){
			if(this.connecting){
				var value=dict_extendattr.participant+"="+this.participant+",TSEGBPM_GRAPH_CONNECTING_ACTIVITY="+this.connecting+
						",TSEGBPM_GRAPH_OFFSET_X:"+this.x+",TSEGBPM_GRAPH_OFFSET_Y:"+this.y;
			}else{
				var value=dict_extendattr.participant+"="+this.participant+
						",TSEGBPM_GRAPH_OFFSET_X:"+this.x+",TSEGBPM_GRAPH_OFFSET_Y:"+this.y;
			}
			
			var tmp=new extended_attribute(this.show_name,value,"");
			tmp.parent=this.parent;
			tmp.getXml();
		};
	}
	var end_activity=function(par){
		this.name='end1';
		this.show_name="TSEGBPM_GRAPH_END_ACTIVITY";
		this.participant=par || "default_participant";
		this.connecting="";
		this.parent=null;
		this.x="";
		this.y="";
		this.getXml=function(){
			if(this.connecting){
				var value=dict_extendattr.participant+"="+this.participant+",TSEGBPM_GRAPH_CONNECTING_ACTIVITY="+this.connecting+
						",TSEGBPM_GRAPH_OFFSET_X="+this.x+",TSEGBPM_GRAPH_OFFSET_Y="+this.y;
			}else{
				var value=dict_extendattr.participant+"="+this.participant+
						",TSEGBPM_GRAPH_OFFSET_X="+this.x+",TSEGBPM_GRAPH_OFFSET_Y="+this.y;
			}
			
			var tmp=new extended_attribute(this.show_name,value,"");
			tmp.parent=this.parent;
			tmp.getXml();
		};
	}
	var normal_activity=function(performer){
		this.name="";
		this.description="";
		this.performer=performer || "default_participant";
		//事务暂缺
		this.parent=null;
		this.getXml=function(){
			var activity=$("<Activity>");
			activity.attr("Id",this.name);
			activity.attr("Name",this.name);
			$("<Description>").html(this.description).appendTo(activity);
			$("<Performer>").html(this.performer).appendTo(activity);
			$("<Start_Mode>").append($("<Automatic/>")).appendTo(activity);
			//console.log(this.parent);
			activity.appendTo(this.parent);
		};
	};
	var Form=function(){
		this.Modules=[];
		this.parent=null;
		this.ChildModules=[];
		this.getXml=function(){
			var Form=$("<Form>")
			var Modules=$("<Modules>");
			for(var i=0;i<this.Modules.length;i++){
				var tmp=this.Modules[i];
				tmp.parent=Modules;
				tmp.getXml(false);
				//tmp.appendTo(Modules);
			}
			Modules.appendTo(Form);
			var ChildModules=$("<Child_Modules>");
			var Description=$("<Description>");
			for(var i=0;i<this.ChildModules.length;i++){
				var tmp=this.ChildModules[i];
				tmp.parent=ChildModules;
				tmp.getXml(true);
				//tmp.appendTo(ChildModules);
			}
			ChildModules.appendTo(Form);
			Description.appendTo(ChildModules);
			Form.appendTo(this.parent);
		};
	};
	var Module=function(){
		this.ModuleId="";
		this.ModuleName="";
		this.parent=null;
		this.FormalParameters=[];
		this.RecordListName="";
		this.getXml=function(flag){
			var Module=$("<Module>");
			$("<Module_Id>").html(this.ModuleId).appendTo(Module);
			$("<Module_Name>").html(this.ModuleName).appendTo(Module);
			var FormalParamArray=$("<Formal_Parameters>");
			for(var i=0;i<this.FormalParameters.length;i++){
				this.FormalParameters[i].parent=FormalParamArray;
				this.FormalParameters[i].getXml();
				//this.FormalParameters[i].appendTo(FormalParamArray);
			}
			FormalParamArray.appendTo(Module);
			var es=$("<Extended_Attributes>");
			if(!this.RecordListName && flag){				
				var e1=new extended_attribute("IsReferenceRecordList","false");
				e1.parent=es;
				e1.getXml();
			}else if(flag){
				var e1=new extended_attribute("IsReferenceRecordList","true");
				e1.parent=es;
				e1.getXml();
				var e2=new extended_attribute("RecordListName",this.RecordListName);
				e2.parent=es;
				e2.getXml();
			}
			if(flag){
				es.appendTo(Module);
			}			
			Module.appendTo(this.parent);
		};
	}
	var FormalParameter=function(){
		this.Id="";
		this.Mode="";
		this.Name="";
		this.BasicType="";
		this.parent=null;
		this.getXml=function(){
			var FormalParameter=$("<Formal_Parameter>");
			$(FormalParameter).attr("Id",this.Id);
			$(FormalParameter).attr("Mode",this.Mode);
			$(FormalParameter).attr("Reference","");
			$(FormalParameter).attr("Name",this.Name);
			var dataType=$("<Data_Type>");
			$("<Basic_Type>").attr("Type",this.BasicType).appendTo(dataType);
			dataType.appendTo(FormalParameter);
			var es=$("<Extended_Attributes>");
			var e1=new extended_attribute("IsReferenceChildModule","false");
			e1.parent=es;
			e1.getXml();
			es.appendTo(FormalParameter);
			FormalParameter.appendTo(this.parent);
		};		
	}
	var ActualParameter=function(){
		this.ID="";
		this.moduleID="";
		this.module="";
		this.fieldID="";
		this.field=""
		this.actualName="";
		this.parent=null;
		this.content="";
		this.getXml=function(){
			// var content=[];
			// for(item in this){
			// 	if(item=="parent"){
			// 		continue;
			// 	}
			// 	if(this[item]){
			// 		content.push(this[item]);	
			// 	}
			// }
			// content=content.join(";");
			// console.log("content="+content);
			// //这个只是取数据的情况
			// $("<ActualParameter>").html(content).appendTo(parent);
			return this.content;
		};
	}
	//集成三种activity，具体设置type是在事件的handler里
	var task_activity=function(performer){
		this.id="";
		this.name="";
		this.show_name="";
		this.description="";
		this.performer=performer || "default_participant";
		//事务暂缺
		this.parent=null;
		this.taskApplicationId="";
		this.actualParameters=[];
		this.task_type="";
		this.signalmode="last";
		this.loopcounter="";
		this.x;
		this.y;
		this.getXml=function(){
			var activity=$("<Activity>");
			activity.attr("Id",this.name);
			activity.attr("Name",this.show_name);
			var impl=$("<Implementation>");
			var task=$("<Task>");
			var taskapp=$("<Task_Application>");
			var param=$("<Actual_Parameters>");
			for(var i=0;i<this.actualParameters.length;i++){
				$("<Actual_Parameter>").html(this.actualParameters[i].getXml()).appendTo(param);
			}
			if(this.actualParameters.length){				
				param.appendTo(taskapp);
			}
			// <Loop>
			//     <LoopStandard>
			//       <LoopCounter>32</LoopCounter>
			//     </LoopStandard>
			// </Loop>
			if(this.loopcounter){
				var loop=$("<Loop>");
				var loopstandard=$("<Loop_Standard>");
				var lc=$("<Loop_Counter>").html(this.loopcounter);
				lc.appendTo(loopstandard);
				loopstandard.appendTo(loop);
			}
			taskapp.appendTo(task);
			task.appendTo(impl);
			impl.appendTo(activity);
			taskapp.attr("Id",this.taskApplicationId);
			//$("<Description>").html(this.description).appendTo(activity);
			//$("<Performer>").html(this.performer).appendTo(activity);
			if(this.name.indexOf("humantaskactivity")>=0){
				if(this.description){
					$("<Description>").html(this.description).appendTo(activity);
				}
				$("<Performer>").html(this.performer).appendTo(activity);
				$("<Start_Mode>").append($("<Manual/>")).appendTo(activity);
			}else{				
				$("<Start_Mode>").append($("<Automatic/>")).appendTo(activity);
			}
			if(loop!=null){
				loop.appendTo(activity);
			}			
			var es=$("<Extended_Attributes>");
			/*
				人工任务节点的扩展属性
				  <ExtendedAttributes>
				    <ExtendedAttribute Name="TSEGBPM_GRAPH_OFFSET" Value="334,41"/>
				    <ExtendedAttribute Name="SIGNALMODE" Value="last"/>
				    <ExtendedAttribute Name="TSEGBPM_GRAPH_PATICIPANT_ID" Value="participant2"/>
				    <ExtendedAttribute Name="TASK_TYPE" Value="Task"/>
				    <ExtendedAttribute Name="RECOVERY_PRIVILEGE" Value="false"/>
				  </ExtendedAttributes>
			*/
			/*
				业务节点的扩展属性
				  <ExtendedAttributes>
				    <ExtendedAttribute Name="TSEGBPM_GRAPH_PATICIPANT_ID" Value="default_participant"/>
				    <ExtendedAttribute Name="TSEGBPM_GRAPH_OFFSET" Value="215,92"/>
				    <ExtendedAttribute Name="SIGNALMODE" Value="last"/>
				    <ExtendedAttribute Name="TASK_TYPE" Value="BusinessTask"/>
				  </ExtendedAttributes>
			*/			
			if(this.name.indexOf("humantaskactivity")>=0){
				var e1=new extended_attribute(dict_extendattr.offset,this.x+","+this.y);
				e1.parent=es;
				e1.getXml();
				var e2=new extended_attribute(dict_extendattr.signalmode,this.signalmode);
				e2.parent=es;
				e2.getXml();
				var e3=new extended_attribute(dict_extendattr.participant,this.performer);
				e3.parent=es;
				e3.getXml();
				var e4=new extended_attribute(dict_extendattr.task_type,this.task_type || "BusinessTask");
				e4.parent=es;
				e4.getXml();
				var e5=new extended_attribute("RECOVERY_PRIVILEGE","false");
				e5.parent=es;
				e5.getXml(); 
			}else{
				var e1=new extended_attribute(dict_extendattr.participant,this.performer);
				e1.parent=es;
				e1.getXml();
				var e4=new extended_attribute(dict_extendattr.offset,this.x+","+this.y);
				e4.parent=es;
				e4.getXml();
				var e2=new extended_attribute(dict_extendattr.signalmode,this.signalmode);
				e2.parent=es;
				e2.getXml();
				var e3=new extended_attribute(dict_extendattr.task_type,this.task_type || "BusinessTask");
				e3.parent=es;
				e3.getXml();
			}
			es.appendTo(activity);
			activity.appendTo(this.parent);
		};
	};
	var extended_attribute=function(name,value,content){
		this.name=name || "";
		this.value=value || "";
		this.content=content || "";
		this.parent=null;
		this.getXml=function(){
			var temp_ext=$("<Extended_Attribute>");
			temp_ext.attr("Name",name);
			temp_ext.attr("Value",value);
			temp_ext.appendTo(this.parent);
		}
	};
	var transition=function(from,to){
		this.name="";
		this.show_name="";
		this.from=from;
		this.to=to;
		this.condition="";
		this.parent=null;
		this.actualParameter="";
		this.getXml=function(){
			var tmp_tran=$("<Transition>");
			tmp_tran.attr("Id",this.name);
			tmp_tran.attr("Name",this.show_name);
			tmp_tran.attr("From",this.from);
			tmp_tran.attr("To",this.to);
			tmp_tran.appendTo(this.parent);
			//<Condition Type="CONDITION">jybyj==1</Condition>
			if(this.condition){
				var con=$("<Condition>");
				con.attr("Type","CONDITION");
				con.html(this.condition);
				con.appendTo(tmp_tran);
			}			
		}
	};
	var arr_app=["Type","BusinessType","ClassPath"];
	var arr_sendApp=["Type","ClassPath","ReceiverType","ReceiverId","Content","IsFormular"];
	var pojoapplication=function(){
		this.Name="";
		this.Type="";
		this.ClassPath=""
		this.ReceiverType="";
		this.ReceiverId="";
		this.Content="";
		this.IsFormular="false";//公式的功能暂时未实现
		this.parent=null;
		this.getXml=function(){
			var app=$("<application>");
			app.attr("Id",this.Name);
			$("<Pojo/>").appendTo(app);
			var es=$("<Extended_Attributes>");
			var arr_temp=[];
			if(this.Name.toLowerCase().indexOf("send")>=0){
				arr_temp=arr_sendApp;
			}else{
				arr_temp=arr_app;
			}
			for(item in this){
				if(item=="parent" || arr_temp.indexOf(item)==-1){
					continue;
				}
				if(this.hasOwnProperty(item) && this[item]){
					var e=new extended_attribute(item,this[item]);
					e.parent=es;
					e.getXml();
				}
			}
			// for(var i=0;i<application_array.length;i++){
			// 	if(!this[application_array[i]]){
			// 		continue;
			// 	}
			// 	var e=new extended_attribute(application_array[i],this[application_array[i]]);
			// 	e.parent=es;
			// 	e.getXml();
			// }
			/*
				get应用的扩展属性
				  <ExtendedAttributes>
			        <ExtendedAttribute Name="Type" Value="Class"/>
			        <ExtendedAttribute Name="BusinessType" Value="GetBusinessFormData"/>
			        <ExtendedAttribute Name="ClassPath" Value="org.tseg.tsegbpm.BusinessApplication.GetBusinessFormDataHandler"/>
			      </ExtendedAttributes>
			*/
			/*
				send应用的扩展属性
				  <ExtendedAttributes>
			        <ExtendedAttribute Name="Type" Value="SendRemindMessage"/>
			        <ExtendedAttribute Name="ClassPath" Value="org.tseg.tsegbpm.BusinessApplication.SendMsgPojo"/>
			        <ExtendedAttribute Name="ReceiverType" Value="user"/>
			        <ExtendedAttribute Name="ReceiverId" Value="1:cpjl"/>
			        <ExtendedAttribute Name="Content" Value="有工单需要处理！"/>
			        <ExtendedAttribute Name="IsFormular" Value="false"/>
			      </ExtendedAttributes>
			*/
			es.appendTo(app);
			app.appendTo(this.parent);
		}
	};
	var formapplication=function(){
		this.id="";
		this.type="form";
		this.Form=new Form();
		this.getXml=function(){
			var app=$("<application>");
			app.attr("Id",this.id);
			this.Form.parent=app;
			this.Form.getXml();
			app.appendTo(this.parent);
		}
	};
	var routesplitactivity=function(performer){
		this.id="";
		this.description="";
		this.name="";
		this.show_name="";
		this.performer=performer || "default_participant";
		this.parent=null;
		this.TransitionRefs=[];
		this.split_type="";
		this.OutgoingCondition="";
		this.getXml=function(){
			var activity=$("<Activity>");
			activity.attr("Id",this.name);
			activity.attr("Name",this.show_name);
			var route=$("<Route>");
			route.appendTo(activity);
			var TransitionRestrictions=$("<Transition_Restrictions>");
			var TransitionRestriction=$("<Transition_Restriction>");
			var split=$("<Split>").attr("Type",this.split_type);
			if(this.OutgoingCondition){
				split.attr("Outgoing_Condition",this.OutgoingCondition);
			}
			var TransitionRefs=$("<Transition_Refs>");
			for(var i=0;i<this.TransitionRefs.length;i++){
				var tranName=this.TransitionRefs[i];
				$("<Transition_Ref>").attr("Id",tranName).appendTo(TransitionRefs);
			}
			TransitionRefs.appendTo(split);
			split.appendTo(TransitionRestriction);
			TransitionRestriction.appendTo(TransitionRestrictions);
			TransitionRestrictions.appendTo(activity);
			if(this.performer!="default_participant"){
				$("<Performer>").html(this.performer).appendTo(activity);
			}
			var es=$("<Extended_Attributes>");
			var e4=new extended_attribute(dict_extendattr.offset,this.x+","+this.y);
			e4.parent=es;
			e4.getXml();
			var e1=new extended_attribute(dict_extendattr.participant,this.performer);
			e1.parent=es;
			e1.getXml();
			es.appendTo(activity);
			activity.appendTo(this.parent);
		}
	};
	var routejoinactivity=function(performer){
		this.id="";
		this.description="";
		this.name="";
		this.show_name="";
		this.performer=performer || "default_participant";
		this.parent=null;
		//this.TransitionRefs=[];
		this.join_type="";
		this.IncomingCondition="";
		this.x="";
		this.y="";
		this.getXml=function(){
			var activity=$("<Activity>");
			activity.attr("Id",this.name);
			activity.attr("Name",this.show_name);
			var route=$("<Route>");
			route.appendTo(activity);
			var TransitionRestrictions=$("<Transition_Restrictions>");
			var TransitionRestriction=$("<Transition_Restriction>");
			var join=$("<Join>").attr("Type",this.join_type);
			if(this.IncomingCondition){
				join.attr("Incoming_Condition",this.IncomingCondition);
			}
			join.appendTo(TransitionRestriction);
			TransitionRestriction.appendTo(TransitionRestrictions);
			TransitionRestrictions.appendTo(activity);
			if(this.performer!="default_participant"){
				$("<Performer>").html(this.performer).appendTo(activity);
			}
			var es=$("<Extended_Attributes>");
			var e4=new extended_attribute(dict_extendattr.offset,this.x+","+this.y);
			e4.parent=es;
			e4.getXml();
			var e1=new extended_attribute(dict_extendattr.participant,this.performer);
			e1.parent=es;
			e1.getXml();
			es.appendTo(activity);
			activity.appendTo(this.parent);
		}
	};
	
	
	