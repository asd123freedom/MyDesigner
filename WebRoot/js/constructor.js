var dict_part_type={
		"用户":"HUMAN",
		"组":"ORGANIZATIONAL_UNIT",
		"角色":"ROLE",
		"资源域":"RESOURCE_SET",
	};
var dict_extendattr={
		"offset":"TSEGBPM_GRAPH_OFFSET",
		"signalmode":"SIGNALMODE",
		"paticipant":"TSEGBPM_GRAPH_PATICIPANT_ID",
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
		this.Description=null;
		//还有缺少的属性，编写参与者的对话框时再编写
		this.getXml=function(){
			var temp_part=$("<Participant>")
			temp_part.attr("Id",this.name+"");
			temp_part.attr("name",this.name+"");
			var part_type=$("<ParticipantType>");
			part_type.attr("Type",dict_part_type["用户"]);
			part_type.appendTo(temp_part);
			this.Description.appendTo(temp_part);
			//console.log(this.parent);
			temp_part.appendTo(this.parent);
		};
	};
	var start_activity=function(par){
		this.name="start1";
		this.incoming=0;
		this.outgoing=0;
		this.participant=par || "default_participant";
		this.parent=null;
		this.getXml=function(){
			var tmp=new extended_attribute(this.name,this.participant,"");
			tmp.parent=this.parent;
			tmp.getXml();
		};
	}
	var end_activity=function(par){
		this.name="end1";
		this.incoming=0;
		this.outgoing=0;
		this.participant=par || "default_participant";
		this.parent=null;
		this.getXml=function(){
			var tmp=new extended_attribute(this.name,this.participant,"");
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
			$("<StartMode>").append($("<Automatic/>")).appendTo(activity);
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
			var Moudles=$("<Moudles>");
			for(var i=0;i<this.Moudles.length;i++){
				var tmp=this.Moudles[i];
				tmp.appendTo(Moudles);
			}
			Moudles.appendTo(Form);
			var ChildModules=$("<ChildModules>");
			var Description=$("<Description>");
			for(var i=0;i<this.ChildMoudles.length;i++){
				var tmp=this.ChildMoudles[i];
				tmp.appendTo(ChildMoudles);
			}
			Description.appendTo(ChildModules);
			Form.appendTo(this.parent);
		};
	};
	var Module=function(){
		this.ModuleId="";
		this.ModuleName="";
		this.parent=null;
		this.FormalParameters=[];
		this.getXml=function(){
			var Moudle=$("<Moudle>");
			$("<MoudleId>").html(this.MoudleId).appendTo(Moudle);
			$("<ModuleName>").html(this.MoudleName).appendTo(Moudle);
			var FormalParamArray=$("FormalParameters");
			for(var i=0;i<this.FormalParameters.length;i++){
				this.FormalParameters[i].appendTo(FormalParamArray);
			}
			FormalParamArray.appendTo(Moudle);
			Moudle.appendTo(this.parent);
		};
	}
	var FormalParameter=function(){
		this.Id="";
		this.Mode="";
		this.Name="";
		this.BasicType="";
		this.parent=null;
		this.getXml=function(){
			var FormalParameter=$("<FormalParameter>");
			$(FormalParameter).attr("Id",this.Id);
			$(FormalParameter).attr("Name",this.Name);
			$(FormalParameter).attr("Mode",this.Mode);
			$(FormalParameter).attr("Reference","");
			var dataType=$("<DataType>");
			$("<BasicType>").attr("Type",this.BasicType).appendtTo(dataType);
			dataType.appendTo(FormalParameter);
			var es=$("<ExtendedAttributes>");
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
		this.name="";
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
			activity.attr("Name",this.name);
			var impl=$("<Implementation>");
			var task=$("<Task>");
			var taskapp=$("<TaskApplication>");
			var param=$("<ActualParameters>");
			for(var i=0;i<this.actualParameters.length;i++){
				$("<ActualParameter>").html(this.actualParameters[i].getXml()).appendTo(param);
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
				var loopstandard=$("<LoopStandard>");
				var lc=$("<LoopCounter>").html(this.loopcounter);
				lc.appendTo(loopstandard);
				loopstandard.appendTo(loop);
			}
			taskapp.appendTo(task);
			task.appendTo(impl);
			impl.appendTo(activity);
			taskapp.attr("Id",this.taskApplicationId);
			$("<Description>").html(this.description).appendTo(activity);
			$("<Performer>").html(this.performer.name).appendTo(activity);
			if(this.name.indexOf("humantaskactivity")>0){
				$("<StartMode>").append($("<Manual/>")).appendTo(activity);
			}else{				
				$("<StartMode>").append($("<Automatic/>")).appendTo(activity);
			}
			loop.appendTo(activity);
			//还没有设置<ExtendedAttributes>标签
			var es=$("<ExtendedAttributes>");
			var e1=new extended_attribute(dict_extendattr.paticipant,this.performer.name);
			e1.parent=es;
			e1.getXml();
			var e2=new extended_attribute(dict_extendattr.signalmode,this.signalmode);
			e2.parent=es;
			e2.getXml();
			var e3=new extended_attribute(dict_extendattr.task_type,this.task_type || "BusinessTask");
			e3.parent=es;
			e3.getXml();
			var e4=new extended_attribute(dict_extendattr.offset,this.x+","+this.y);
			e4.parent=es;
			e4.getXml();
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
			var temp_ext=$("<ExtendedAttribute>");
			temp_ext.attr("Name",name);
			temp_ext.attr("Value",value);
			temp_ext.appendTo(this.parent);
		}
	};
	var transition=function(from,to){
		this.Id="";
		this.Name="";
		this.from=from;
		this.to=to;
		this.condition="";
		this.parent=null;
		this.actualParameter="";
		this.getXml=function(){
			var tmp_tran=$("<Transition>");
			tmp_tran.attr("Id",this.Id);
			tmp_tran.attr("Name",this.name);
			tmp_tran.attr("From",this.from);
			tmp_tran.attr("To",this.to);
			tmp_tran.appendTo(this.parent);
			//<Condition Type="CONDITION">jybyj==1</Condition>
			var con=$("<Condition>");
			con.attr("Type","CONDITION");
			con.html(this.condition);
			con.appendTo(tmp_tran);
		}
	};
	var pojoapplication=function(){
		this.Name="";
		this.Type="";
		this.ClassPath=""
		this.ReceiverType="";
		this.ReceiverId="";
		this.Content="";
		this.IsFormular="flase";//公式的功能暂时未实现
		this.parent=null;
		this.getXml=function(){
			var app=$("<application>");
			app.attr("Id",this.Name);
			$("<Pojo/>").appendTo(app);
			var es=$("<ExtendedAttributes>");
			for(item in this){
				if(item=="parent"){
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
		}
	};
	
	
	