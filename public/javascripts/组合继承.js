	function SuperType(name) {
	    this.name = name;
	    this.colors = ["red", "blue", "green"];
	}

	SuperType.protoType.sayName = function() {
	    alert(this.name);
	}

	function SubType(Name, age) {
	    SuperType.call(this, Name);//构造继承

	    this.age = age
	}

	SubType.protoType = new SuperType();//原型链继承
	SubType.protoType.constructor = SubType;
	SubType.protoType.sayAge = function() {
	    alert(this.age)
	}


//缺点：每一次调用两次超类的构造函数：一次是在创建子类原型的时候，另一次是在子类型构造函数内部
//解决：寄生组合继承