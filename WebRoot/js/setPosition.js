var setPosition=function(){
	var workflowprocess=$("#container").data("w");
	var activities=workflowprocess["activities"] || [];
	for(var i=0;i<activities.length;i++){
			//console.log(activities[i]);
			var name=activities[i].name;
			activities[i].x=$("#"+name).offset().left+"";
			activities[i].y=$("#"+name).offset().top+"";
	}
	if(workflowprocess.start){
		var start_name=workflowprocess.start.name;
		workflowprocess.start.x=$("#"+start_name).offset().left+"";
		workflowprocess.start.y=$("#"+start_name).offset().top+"";
	}
	if(workflowprocess.end){
		var end_name=workflowprocess.end.name;
		workflowprocess.end.x=$("#"+end_name).offset().left+"";
		workflowprocess.end.y=$("#"+end_name).offset().top+"";
	}
	
};