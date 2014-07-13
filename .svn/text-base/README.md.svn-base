MyDesigner
==========
# 基于JavaScript，Html的流程设计器


基于JavaScript，Html，CSS借鉴了原先基于ActionScript实现的流程设计器的实现思路，采用基于对象的思想，依赖jquery，jqueryUI,jsPlumb和Bootstrap，实现了流程定义文件的生成和解析。本文档主要用于后来者对于设计器进行功能的补充和扩展扩展。

设计器的功能主要由各个图标的相关功能组成，例如，对于业务活动的图标，要编写生成`Activity`标签的相关代码，编写设置`Activity`的相关属性的前端页面，还有相应的解析xml文件，生成`Activity`对象

> 设计器中drag和drop操作依赖于[jqueryUI](http://jqueryui.com/)

> 设计器中的图标之间连线的绘制依赖于[jsPlumb](http://jsplumbtoolkit.com/demo/home/dom.html)

-------------------
### XML文件的生成
`xml`文件的生成功能主要利用了自定义标签和`jQuery`的`html()`方法
``` javascript
//自定义标签
var workflow=$("<workflow>");
//将其append一个已经存在的标签中;
workflow.appendTo($("body"));
//利用html代码得到xml字符串
var str=$("body").html;
```
### 1 对象

#### 1.1 构造方法

基本上保证每一个图标，对应一个类(`class`)，除此之外，`xml`文件中出现的一些较为复杂的标签也被抽象成为类，下面是`Module`标签对应的类。
```
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
```
可以看到其中还包括了`ExtendedAttributes`标签，`FormalParameters`标签，这些标签都有对应的类，在`constructor.js`文件中定义了全部的构造函数
#### 1.2 getXml()方法
之前已经讲过得到`xml`文件的方法是利用父标签的`html()`方法，每个对象的getXml()方法都负责生成自定义标签，由于每个对象都有`parent`属性，在`getXml()`方法中还将这些包涵自定义标签的`jQuery`对象添加到`parent`对象中，最终生成`xml`文件是在`process_xml.js`文件中，在这里指定每个对象的`parent`属性
#### 1.3 $("#container").data("w")
在运行设计器期间，所有对象都存在`$("#container").data("w")`中的相应数组里面，例如,`$("#container").data("w").activities`存储了所有`Activity`对象，最终生成`xml`文件，实际上就是遍历这些数组里面的对象调用`getXml()`方法
#### 1.4 注册自定义事件
在容器中，每次一个图标落入，都要出发一个事件，生成与图标相应的对象，因此，要进行后续开发的话除了编写相应的构造函数，还要注册事件,同时，出发自定义事件时，要传入需要的参数，如该活动的参与者，ID等。
``` javascript
//注册事件
$("#container").on("participant",function(e,name){
		var w1=$("#container").data("w") || {};
		var arr=w1.participants || [];
		var n1=name || "participant"+$("#container").data("participant");
		var p1=new participant(n1);
		arr.push(p1);
		w1.participants=arr;
		$("#container").data("w",w1);
});
```
``` javascript
//trigger函数
function trigger(container,str,performer){
    	var _this=$(container);
    	var num=$("#container").data(str)|| 0;
    	num++;
    	$("#container").data(str,num);
    	if(str.indexOf("activity")>0 && str.indexOf("route")==-1){
    		_this.trigger("activity",[str,performer]);
    	}else if(str.indexOf("route")>=0 || (str=='start' || str=='end')){
    		_this.trigger(str,[str,performer]);
    	}else{
    		_this.trigger(str);
    	}
}
```
#### 1.5 编辑页面
所有的编辑操作全部在`$("#new_course_dialog")`这样一个模态对话框中，具体的显示内容由`load()`方法确定，`controller.js`中的代码就负责确定到底显示哪一个`html`文件。
```
if(tran){
	$('#new_course_dialog').load("Transition.html?num="+d.getTime(),function(){
	    $("#new_course_dialog").trigger("show_transition");
	});
	return;
}
```

### 2 开发思路
对于完成新的功能，或者是要完成一些我没有完成的图标相关代码，基本上遵循以下步骤：
- 构造函数
- 注册事件
- 在drop事件处理函数中的合适位置`trigger`相应的自定义事件
- 编写显示对话框所需要的网页
- 在页面中编写相应的前端代码，将页面设置的数据添加到对应的对象中
- 编写相应的显示代码，可以将相应的对象中已经有数据显示在编辑对话框中，在已经编写的代码中，这部分代码也是通过自定义事件实现的，例如以下代码:

```
//显示编辑发送提醒应用的结果
$("#new_course_dialog").on("show_send",function(){
	Model.showSendOptionFilled(dict_appname);
});
//出发上面的自定义事件
$('#new_course_dialog').load("ActivityDialog.html?num="+d.getTime(),function(){
	//show();
	console.log(flag);
	if(flag=="init"){					
		$('#new_course_dialog').trigger(flag);
	}else{
		$('#new_course_dialog').trigger("show_"+flag);
	}
});

```
- 编写相应的解析函数，能够通过xml文件生成相应的对象


### 3 注意异步调用的串行化
设计器需要调用一些原系统的`action`，来添加一些数据，其中主要是动态表单的数据，显然，在`ajax`回调完成之后，才能进行一些页面初始化之类的操作，例如以下代码：

```
//如果是发送提醒业务的话，显示相关的数据
if(s.toLocaleLowerCase().indexOf("send")>=0){
	$(".send").removeClass("hide");
	Model.findAllUsers().done(Model.fillInUsers).done(function(){
		callbacks.fire();
	});
}
```
相关的`ajax`函数全部在`Modal.js`文件中
