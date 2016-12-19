function object(o) { //实现原型继承的函数
    function F() {}
    F.prototype = o;
    return new F();
}

function inheritPrototype(SubType, SuperType) { //实现寄生组合继承的东东
    var prototype = object(SuperType.prototype); //创建对象
    prototype.constructor = SubType; //增强对象
    SubType.prototype = prototype; //制定对象
}

//继承实现
function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"]
}

SuperType.prototype.sayName = function() {
    alert(this.name)
}

function SubType(name, age) { //
    SuperType.call(this); //构造继承创建父类实例副本
    this.age = age;
}

inheritPrototype(SubType, SuperType); //继承父类原型方法

SubType.prototype.sayAge = function() {
    alert(this.age);
}
