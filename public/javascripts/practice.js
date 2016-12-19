//访问器属性
var book = {
	_year: 2016,
	edition:1
}

Object.defineProperty(book,"year",{
	get: function(){
		return this._year;
	},set: function(newValue){

		if(newValue>2016){
			this._year = newValue;
			this.edition += newValue - 2016;
		}
	}
})

book.year = 2018;
console.log(book.edition);
//通过访问器进行设置值，会导致其他属性发生变化