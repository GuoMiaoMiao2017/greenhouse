$(document).ready(function (){
	
	var basePath = location.protocol + "//" + location.host + "/greenhouse";
	
	function activityNotificationHandler(response) {
		var activity = $.parseJSON(response.responseBody);
		
		$("<li></li>").
	    	addClass("newItem").
	    	append($("<img/>", {"src":(activity.memberPictureUrl ? activity.memberPictureUrl : "")}).addClass("profile")).
	    	append(activity.text).
	    	append($("<img/>", {"src":(activity.imageUrl ? activity.imageUrl : "")}).addClass("badge")).
	    	prependTo("#recentActivityList");
		
		if ($("#recentActivityList li").length == 6) {
		    $("#recentActivityList li:last").slideUp("slow", function() {
		        $(this).remove();
		    });
		}
		$("#recentActivityList li.newItem").slideDown("slow", function() {
		    $(this).removeClass("newItem");
		});
	}
	
	/* transport can be : long-polling, streaming or websocket */
	$.atmosphere.subscribe(basePath + '/pubsub/recent/notifications', activityNotificationHandler,
            $.atmosphere.request = {transport: "streaming", headers: {'Accept' : "application/json"}});
	
});