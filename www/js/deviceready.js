document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady(){
	setTimeout(function(){
		navigator.splashscreen.hide();
	}, 3000);	
	$(document.getElementById('home')).css("display", "block");
	document.addEventListener("backbutton", onBackKeyDown, false);
}
function alertDismissed(){
	//alert('alert Dismissed');
}
function onConfirm(button){
	if(button==2){
		navigator.notification.vibrate(1);
		return;
	}else{
		navigator.notification.vibrate(1);
		navigator.app.exitApp();
	}
}
function backButtonPress(data){
	navigator.notification.vibrate(1);
	if(data == 'home'){		
		navigator.notification.confirm(
			"Are you sure you want to exit ?",
			onConfirm,
			"Confirmation",
			"Yes,No"
		);
	}else if(data == 'news'){
		showHome();		
	}else if(data == 'article'){
		showNews();
	}
}
function onBackKeyDown(e){
	e.preventDefault();
	var pagename = document.getElementsByTagName("section");
	for (var i = 0; i < pagename .length; i++) {
		var aaa = document.getElementById(pagename[i].id);
	  	if(aaa.style.display == 'block'){
			backButtonPress(pagename[i].id);
		}
	}
}
function showNews(){
	$(document.getElementById('home')).css("display", "none");
	$(document.getElementById('article')).css("display", "none");
	$(document.getElementById('news')).css("display", "block");
}
function showHome(){
	$(document.getElementById('news')).css("display", "none");
	$(document.getElementById('article')).css("display", "none");
	$(document.getElementById('home')).css("display", "block");
}
function showArticle(){
	$(document.getElementById('home')).css("display", "none");
	$(document.getElementById('news')).css("display", "none");
	$(document.getElementById('article')).css("display", "block");
}