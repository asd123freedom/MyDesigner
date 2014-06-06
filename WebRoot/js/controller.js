$(function(){
	$( document ).ajaxError(function(event,jqXHR,ajaxSettings,thrownError ) {
		//console.log(data);
  		console.log(thrownError);
	});
	$('#new_course_dialog').on('show', function (e,o) {
			var flag="init";
			var tran=$("#new_course_dialog").data("tran");
			var type="";
			//console.log(tran);
			//$("#new_course_dialog").data("tran",null);
			var d=new Date();
			if(tran){
				$('#new_course_dialog').load("Transition.html?num="+d.getTime(),function(){
					$("#new_course_dialog").trigger("show_transition");
				});
				//var arr_actual=$("#container").data("w").actualParameters || [];
				// var arr_tran=$("#container").data("w").transitions || [];
				// $(arr_tran).each(function(index,e){
				// 	if(tran.sourceId==e.from && tran.targetId==e.to){
				// 		//这里添加的是显示的时候代码
				// 		$("td.condition").find("input").val(e.condition);
				// 	}
				// });
				return;
			}
			var obj=$("#new_course_dialog").data("obj");
			//console.log(obj);
			if(obj && obj.attr("id").indexOf("participant")>=0){
				$('#new_course_dialog').load("ParticipantDialog.html?num="+d.getTime(),function(){
					var arr=$("#container").data("w").participants || [];
					$(arr).each(function(index,e){
						if(obj.attr("id")==e.name){
							var type=e.type;
							$("select.type").val(e.type);
						}
					});
				});
				return;
			}
			if(obj){
				var arr=$("#container").data("w").activities || [];
		  		$(arr).each(function(index,e){
		  				if(obj.attr("id")==e.name){
		  					var app=$(e).data("app");
		  					if(!app){
		  						flag="init";
		  					}else{
		  						flag=e.taskApplicationType;
		  					}
		  					type=e.name.replace(/\d+/,"");
		  				}
		  		});
		  		console.log(type);
		  		if(type=="businessactivity"){
		  			$('#new_course_dialog').load("ActivityDialog.html?num="+d.getTime(),function(){
						//show();
						console.log(flag);
						if(flag=="init"){					
							$('#new_course_dialog').trigger(flag);
						}else{
							$('#new_course_dialog').trigger("show_"+flag);
						}
					});
					return;
		  		}else if(type=="humantaskactivity"){
		  			$('#new_course_dialog').load("HumanActivityDialog.html?num="+d.getTime(),function(){
		  				$('#new_course_dialog').trigger("show_humanactivity");
					});
					return;
		  		}else if(type=="routesplitactivity"){
		  			$('#new_course_dialog').load("SplitActivityDialog.html?num="+d.getTime(),function(){
		  				$('#new_course_dialog').trigger("show_split");
					});
					return;
		  		}else if(type=="routejoinactivity"){
		  			$('#new_course_dialog').load("JoinActivityDialog.html?num="+d.getTime(),function(){
		  				$('#new_course_dialog').trigger("show_join");
					});
					return;
		  		}
			}
			//什么图标都没点，那么显示添加表单应用的对话框，在此之上的代码都是对点击图标有反应的
			$('#new_course_dialog').load("FormDialog.html?num="+d.getTime(),function(){
				$("#new_course_dialog").trigger("show_form");
			});
	});
	$("#new_course_dialog").on("hide",function(e,o){
		var obj=$(this).data("obj");
		var tran=$(this).data("tran");
		if(!obj && !tran){
			return;
		}
		//console.log($(this).find("#name").val());
		if(obj){
			obj.find("span").text($(this).find("#name").val()).css("display","block");
			$(this).data("obj",null);
			return;
		}
		if(tran){
			//设置连线上需要显示的话
			var info=$(this).find("#name").val();
			console.log(info);
			setTransitionLabel(tran,info);
			$(this).data("tran",null);
			return;
		}
	});
	function setTransitionLabel(connect,info){
		connect.setLabel({ cssClass:"component label",label:info, location:0.5 });
	}
});