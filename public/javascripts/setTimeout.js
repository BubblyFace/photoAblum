var setTimeoutEvent;

function start(itemID){
	console.log($("#"+itemID).css("visibility"));
	if($("#"+itemID+"P").css("visibility")!="hidden")
	{
		$("#"+itemID+"P").css("visibility","hidden");
	}else{
		$("#"+itemID+"P").css("visibility","visible");
	}
	setTimeoutEvent = setTimeout(function(){
		start(itemID);
	},100)
}
function stop(itemID){
	clearTimeout(setTimeoutEvent);
	$("img").css("visibility","visible");
}

$(document).on("click","button",function(e){
	var targetId = e.target.getAttribute("id");
	console.log(targetId.search("start"))
	if(targetId.search("Start")!=-1){
		start(targetId)
	}else{
		stop(targetId)
	}
})