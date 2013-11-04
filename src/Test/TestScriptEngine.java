package Test;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

public class TestScriptEngine {
	public static void main(String[] args) throws ScriptException {
		ScriptEngineManager sem = new ScriptEngineManager(); 
		ScriptEngine engine = sem.getEngineByName("javascript");
		engine.put("msg", "just a test"); 
		String str = "msg += '!!!';var user = {name:'tom',age:23,hobbies:['football','basketball']}; var name = user.name; var hb = user.hobbies[1];"; 
		engine.eval(str); 
		System.out.println(engine.eval("1==true").getClass());
		String msg = (String) engine.get("msg"); 
		String name = (String) engine.get("name"); 
		String hb = (String) engine.get("hb"); 
		System.out.println(msg);
		if((Boolean)engine.eval("1==true")){
			System.out.println("测试成功！");
		}
		System.out.println(name + ":" + hb); 
	}

}
