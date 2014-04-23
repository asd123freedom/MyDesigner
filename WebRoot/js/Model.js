var getAllUsers=function(dtd){
	$.ajax({
		url: "http://127.0.0.1:8080/HiServiceCRM/findAllUsers.action",
			type: "POST",
	        success:function(data){
				dtd.resolve(data);
	        }
	});
	return dtd;
	/*$.ajax({
			url: "http://127.0.0.1:8080/HiServiceCRM/findAllUsers.action",
			type: "POST",
	        success:function(data){
						var parent=$("select.receive_id");
	         			//console.log(parent);
						for(var i=0;i<data.length;i++){
							//alert("");
							var opt=parent.find(".temple").clone();
							opt.removeClass("hide temple");
							opt.attr("value",data[i].id+":"+data[i].userName);
							opt.html(data[i].id+":"+data[i].userName);
							opt.appendTo(parent);
						}
						if($("select.receive_type").data("TypeIndex") || $("select.receive_type").data("TypeIndex") ===0){
							var index=$("select.receive_type").data("TypeIndex");
							$("select.receive_type").find("option:eq("+index+")")
	  						.attr("selected",true);
	  						//alert("");
	  						$("select.receive_type").trigger("change");
	  						$("select.receive_type").data("TypeIndex",null);
						}
	         },
	 });
	*/
}