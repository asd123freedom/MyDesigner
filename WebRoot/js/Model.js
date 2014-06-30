var Model=(function(){
	return {
		findAllUsers:function(){
			var dtd = $.Deferred();
			$.ajax({
				url: "http://127.0.0.1:8080/HiServiceCRM/findAllUsers.action",
					type: "POST",
			        success:function(data){
						dtd.resolve(data || []);
			        }
			});
			return dtd.promise();
		},
		fillInUsers:function(data,parent){
			var parent=parent || $("select.receive_id");
			for(var i=0;i<data.length;i++){
					var opt=parent.find(".temple").clone();
					opt.removeClass("hide temple");
					opt.attr("value",data[i].id+":"+data[i].userName);
					opt.html(data[i].id+":"+data[i].userName);
					opt.appendTo(parent);
			}
			
		},
		findAllDynamicModuleMetaData:function(){
			var dtd = $.Deferred();
			$.ajax({
					url: "http://127.0.0.1:8080/HiServiceCRM/findAllDynamicModuleMetaData.action",
	         		type: "POST",
	         		success:function(data){
						dtd.resolve(data || []);
	         		}
			});  
			return dtd.promise();
		},
		findAllParentDynamicModuleMetaData:function(){
			var dtd = $.Deferred();
			$.ajax({
					url: "http://127.0.0.1:8080/HiServiceCRM/findAllDynamicModuleMetaData!findParentDynamicModuleMetaData.action",
	         		type: "POST",
	         		success:function(data){
						dtd.resolve(data || []);
	         		}
			});  
			return dtd.promise();
		},
		findAllChildDynamicModuleMetaData:function(){
			var dtd = $.Deferred();
			$.ajax({
					url: "http://127.0.0.1:8080/HiServiceCRM/findAllDynamicModuleMetaData!findChildDynamicModuleMetaData.action",
	         		type: "POST",
	         		success:function(data){
						dtd.resolve(data || []);
	         		}
			});  
			return dtd.promise();
		},
		fillInAllDynamicModuleMetaData:function(data,parent){
			var parent=parent || $(".app:not('.hide') select.Module");
			for(var i=0;i<data.length;i++){
				var opt=parent.find(".temple").clone();
				opt.removeClass("hide temple");
				opt.attr("value",data[i].modulelabel);
				opt.html(data[i].moduleID+":"+data[i].modulelabel);
				opt.appendTo(parent);
				opt.data("id",data[i].moduleID);
			}	
		},
		findFieldbyDynamicModule:function(index){
			var dtd = $.Deferred();
			$.ajax({
					url: "http://127.0.0.1:8080/HiServiceCRM/findFieldbyDynamicModule.action",
	         		type: "POST",
	         		data: {"json":JSON.stringify(index)},
	         		success:function(data){
	         			dtd.resolve(data || []);
	         		},
	         	});
			return dtd.promise();
		},
		fillInFieldbyDynamicModule:function(data,parent,flag){
			//$(".app:not('.hide') select.Field option:not(.temple)").remove();
			var parent=parent || $(".app:not('.hide') select.Field");
			parent.find("option:not(.temple)").remove();
			for(var i=0;i<data.length;i++){
							//alert("");
				var opt=parent.find(".temple").clone();
				opt.removeClass("hide temple");
				opt.attr("value",data[i].fieldLable);
				if(flag && data[i].isRequest=="true"){
					opt.html(data[i].fieldId+":*"+data[i].fieldLable);
				}else{
					opt.html(data[i].fieldId+":"+data[i].fieldLable);
				}
				
				opt.appendTo(parent);
				opt.data("id",data[i].fieldId);
			}
		},
		findAllRolesList:function(){
			var dtd = $.Deferred();
			$.ajax({
					url: "http://127.0.0.1:8080/HiServiceCRM/findAllRolesList.action",
	         		type: "POST",
	         		success:function(data){
						dtd.resolve(data || []);
	         		},
	        });
			return dtd.promise();
		},
		fillInAllRolesList:function(data){
			var parent=$("select.receive_id");
			for(var i=0;i<data.length;i++){
				//alert("");
				var opt=parent.find(".temple").clone();
				opt.removeClass("hide temple");
				opt.attr("value",data[i].id+":"+data[i].name);
				opt.html(data[i].id+":&nbsp&nbsp"+data[i].name);
				opt.appendTo(parent);
			}
		},
		showSendOptionFilled:function(dict_appname){
			var obj=$("#new_course_dialog").data("obj");
			var arr=$("#container").data("w").activities || [];
			var cbForApp=$.Callbacks();
	  		console.log(arr);
	  		$(arr).each(function(index,e){
	  				if(obj.attr("id")==e.name){
	  					var app=$(e).data("app");
	  					$("input.participant_name").val(e.performer);
	  					$("select.app_type").val(app.Type);
  						//$("select.receive_type").data("TypeIndex",app.ReceiverType_index);
	  					//$("select.receive_id").data("IdVal",app.ReceiverId_val);
	  					$("textarea.app_info").val(app.Content);
	  					cbForApp.add(function(){
	  						var index=app.ReceiverType_index;
	  						var cbForReceiveType=$.Callbacks();
							$("select.receive_type").find("option:eq("+index+")").attr("selected",true);
		  					cbForReceiveType.add(function(){
		  						console.log(app.ReceiverId_val);
		  						if(/^\d+$/.test(app.ReceiverId_val)){
		  							$("select.receive_id").find("option").each(function(index,e){
		  								if($(e).val().indexOf(app.ReceiverId_val+":")==0){
		  									app.ReceiverId_val=$(e).val();
		  								}
		  							});
		  						}
		  						if(app.ReceiverId.substring(0,1)=="0"){
		  							$("select.receive_id").val(app.ReceiverId_val);
		  						}else{
		  							$("input.receive_actual").val(app.ReceiverId_val);
		  						}
		  					});
		  					$("select.receive_type").trigger("change",[cbForReceiveType]);
		  				});
		  				$("select.app_type").trigger("change",[cbForApp]);
	  				}
	  		});
		},
		showGetOptionFilled:function(dict_appname){
			var obj=$("#new_course_dialog").data("obj");
	  		var arr=$("#container").data("w").activities || [];
	  		var cbForApp=$.Callbacks();
	  		$(arr).each(function(index,e){
	  			if(obj.attr("id")==e.name){
	  				var app=$(e).data("app");
	  				console.log(app.Type);
	  				$("select.app_type").val(app.BusinessType);
	  				$("input.participant_name").val(e.performer);
	  				//$("select.Module").data("ModuleID",app.ModuleID);
	  				//console.log($("select.Module").data("ModuleID"));
	  				//$("select.Module").data("arr",e.actualParameters)
	  				var arr=e.actualParameters;
	  				cbForApp.add(function() {
	  					if(arr.length>0){
							$("table.get").find("tr.head").removeClass("hide");
						}
						for(var i=0;i<arr.length;i++){
							var line=$("table.get").find("tr.temple").clone();
							line.removeClass("hide temple");
							line.addClass("actual");
							line.find("td.id").text((i+1)+"");
							line.find("td.moduleID").text(arr[i].moduleID);
							line.find("td.module").text(arr[i].module);
							line.find("td.fieldID").text(arr[i].fieldID);
							line.find("td.field").text(arr[i].field);
							line.find("td.actualParam > input").val(arr[i].actualName);
							line.find(".btn-danger").bind("click",function(){
							$(this).parents("tr:eq(0)").remove();
								if($("tr:not(.temple)").length==1){
									$("table.get").find("tr.head").addClass("hide");
								}
							});
							line.appendTo($("table.get"));
						}

	  				});
	  				$("select.app_type").trigger("change",[cbForApp]);
	  			}
	  		});
		},
		showSaveOptionFilled:function(dict_appname){
			var obj=$("#new_course_dialog").data("obj");
	  		var arr=$("#container").data("w").activities || [];
	  		var cbForApp=$.Callbacks();
	  		$(arr).each(function(index,e){
	  			if(obj.attr("id")==e.name){
	  				var app=$(e).data("app");
	  				console.log(app.Type);
	  				$("select.app_type").val(app.BusinessType);
	  				$("input.participant_name").val(e.performer);
	  				//$("select.Module").data("ModuleID",app.ModuleID);
	  				//console.log($("select.Module").data("ModuleID"));
	  				//$("select.Module").data("arr",e.actualParameters)
	  				var arr=e.actualParameters;
	  				console.log(arr);
	  				cbForApp.add(function() {
	  					if(arr.length>0){
							$("table.save").find("tr.head").removeClass("hide");
						}
						for(var i=0;i<arr.length;i++){
							var line=$("table.save").find("tr.temple").clone();
							line.removeClass("hide temple");
							line.addClass("actual");
							line.find("td.id").text((i+1)+"");
							line.find("td.moduleID").text(arr[i].moduleID);
							line.find("td.module").text(arr[i].module);
							line.find("td.fieldID").text(arr[i].fieldID);
							line.find("td.field").text(arr[i].field);
							console.log(arr[i].ActualParam);
							line.find("td.actualParam").text(arr[i].ActualParam);
							line.find("td.recordID").text(arr[i].recordID);
							line.find(".btn-danger").bind("click",function(){
								$(this).parents("tr:eq(0)").remove();
								if($("tr:not(.temple)").length==1){
									$("table.save").find("tr.head").addClass("hide");
								}
							});
							line.appendTo($("table.save"));
						}
	  				});
	  				$("select.app_type").trigger("change",[cbForApp]);
	  			}
	  		});
		}
	};
})();
