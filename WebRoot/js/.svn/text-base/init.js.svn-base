;(function() {
	
	window.jsPlumbDemo = {
			
		init : function() {
			
			jsPlumb.importDefaults({
				Connector : "Straight",
				PaintStyle:{ lineWidth:3, strokeStyle:"#ffa500", "dashstyle":"2 4" },
				Endpoint:[ "Dot", { radius:5 } ],
				ConnectionsDetachable:false,
				EndpointStyle:{ fillStyle:"#000" },
				Anchors:[ "LeftMiddle","RightMiddle"]
			});
			// NOTE here we are just using getSelector so we don't have to rewrite the code for each of the supported libraries.
			// you can just use the approriate selector from the library you're using, if you want to. like $(".shape) on jquery, for example.
			//var shapes = jsPlumb.getSelector(".tool");
			// make everything draggable
			var stateMachineConnector = {				
				connector:"Straight",
				paintStyle:{lineWidth:3,strokeStyle:"#056"},
				hoverPaintStyle:{strokeStyle:"#dbe300"},
				endpoint:"Blank",
				anchor:"Continuous",
				overlays:[ ["PlainArrow", {location:1,width:10, length:12} ]]
					//[ "Label", { cssClass:"component label",label:"1", location:0.5 }]
					//]
			};
			var shapes=$(".icon");
			var toolBar=$("#toolBar");
			toolBar.data("option",stateMachineConnector);
    }    
  }
  
})();