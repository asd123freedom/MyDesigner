;$(function(window,undefined){
	$("#container").on("participant",function(){
		var w1=$("#container").data("w") || {};
		var arr=w1.participants || [];
		var n1="participant"+$("#container").data("participant");
		var p1=new participant(n1);
		arr.push(p1);
		w1.participants=arr;
		//console.log(arr);
		$("#container").data("w",w1);
		//console.log(w1);
	});
	$("#container").on("activity",function(e,name,performer){
		var w1=$("#container").data("w") || {};
		var arr=w1.activities || [];
		//console.log(w1.activities);
		var n1=name+$("#container").data(name);
		var p1=performer || "default_participant";
		var a1=new task_activity(p1);
		a1.name=n1;
		arr.push(a1);
		w1.activities=arr;
		console.log(arr);
		//console.log(w1);
		$("#container").data("w",w1);
	});
	$("#container").on("transition",function(e,from,to){
		//console.log(to);
		var w1=$("#container").data("w") || {};
		var arr=w1.transitions || [];
		//console.log(w1.activities);
		var n1="transition"+$("#container").data("transition");
		var a1=new transition(from,to);
		a1.name=n1;
		a1.Id=n1;
		arr.push(a1);
		w1.transitions=arr;
		//console.log(arr);
		$("#container").data("w",w1);
		//console.log(w1);
	});
	$("#container").on("start",function(){
		var w1=$("#container").data("w") || {};
		//console.log(w1.activities);
		var p1=w1.participants[0].name;
		var a1=new start_activity(p1);
		w1.start=a1;
		$("#container").data("w",w1);
	});
	$("#container").on("end",function(){
		var w1=$("#container").data("w") || {};
		//console.log(w1.activities);
		var p1=w1.participants[0].name;
		var a1=new end_activity(p1);
		w1.end=a1;
		$("#container").data("w",w1);
	});
	$("#container").on("application",function(){
		var w1=$("#container").data("w") || {};
		//console.log(w1.activities);
		var arr=w1.applications||[];
		var a1=new pojoapplication();
		arr.push(a1);
		w1.applications=arr;
		$("#container").data("w",w1);
	});
	$("#container").on("formapplication",function(e,n,callbacks){
		var callbacks=callbacks || $.Callbacks();
		var w1=$("#container").data("w") || {};
		var arr=w1.applications||[];
		var a1=new formapplication();
		a1.id=n;
		arr.push(a1);
		w1.applications=arr;
		$("#container").data("w",w1);
		callbacks.fire();
	});
});
