

$(function(){
	
	
	
	var uname;
	var pwd;
	
	
	$('#loginclick').click( function(){
		uname = $('.username').val();
		pwd = $('.password').val();
		
		if(uname == '' )
		{
		alert('username cannot be empty');
		
		$('#foo').css("display", "block");
	    $('#login').css("display", "none");
       

		
		
		}
		else if(pwd =='' ){
		
		alert('password cannot be empty');

       	$('#foo').css("display", "block");
	    $('#login').css("display", "none");
    
		}
		
		
		else
		{
	    $('#authuser').html(uname);
		$('#login').css("display", "block");
       	$('#foo').css("display", "none");
	
		
		
		
		}
		
		
		  
	});
	
	$('#runprocess').click( function(e){ 
		var tradeid;
  	      $('#login').css("display", "block");
          $('#foo').css("display", "none");
          tradeid=$('#tradeselected').val();
          $('#tradelabel').html(tradeid);

          e.preventDefault(); 
 });
	$('#capturebtn').click(function(e){
	alert('go clicked');
	
});


});










