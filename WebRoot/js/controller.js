$(function(){
	$('#new_course_dialog').on('show', function (e,o) {
			var flag="init";
			var tran=$("#new_course_dialog").data("tran");
			var type="";
			//console.log(tran);
			//$("#new_course_dialog").data("tran",null);
			var d=new Date();
			if(tran){
				$('#new_course_dialog').load("Transition.html?num="+d.getTime());
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
			if(obj && obj.attr("id").indexOf("participant")>=0){
				$('#new_course_dialog').load("ParticipantDialog.html?num="+d.getTime(),function(){});
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
		  		//console.log(type);
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
		  		}
			}
			//什么图标都没点，那么显示添加表单应用的对话框，在此之上的代码都是对点击图标有反应的
			$('#new_course_dialog').load("FormDialog.html?num="+d.getTime(),function(){
				$("#new_course_dialog").trigger("show_form");
			});
	});
	$("#new_course_dialog").on("hide",function(e,o){
		var obj=$(this).data("obj");
		//console.log(obj);
		if(!obj){
			return;
		}
		//console.log($(this).find("#name").val());
		obj.find("span").text($(this).find("#name").val()).css("display","block");
		$(this).data("obj",null);
	})
});