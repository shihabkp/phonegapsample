$( document ).ready( function(){	
	var hosturls = "http://nairobinews.nation.co.ke/category/";
	var hosturle = "/feed/";
	/*var hosturls = "xml/";
	var hosturle = ".xml";*/
	
	$('nav a').on('touchstart', function (evt) {
		var $this = $(this).attr('href');
		$(this).on('touchend', function(e){
			e.preventDefault();
			$this = $(this).attr('href');
			var ret = $this.split("#");
			var str1 = ret[1];
			var totalLink = hosturls+str1+hosturle;
			if(str1 == 'photos' || str1 == 'videos'){
				navigator.notification.alert(
					'Coming Soon',
					comingsoondis,
					'Developing Progress',
					'OK'
				);
			}else{
				$('#home').hide();
				$('#news').show();
				$('.feedname').html(str1);
				$("#listFfeatured, #listFnews, #listFvoices, #listFchillax, #listFmoney-spinner, #listFlife, #listFsports, #listFeditors-picks, #listFjobs, #listFblog").hide();
				$('#listF'+str1+'').show();
				
				function printData(){					
					if( !$.trim( $('#listF'+str1+' .newslist').html() ).length ) {
						$('.loader').fadeIn();	
					}else{
						
					}					
					$.ajax({
						type: 'GET',
						url: hosturls+str1+hosturle,
						dataType: "xml",
						beforeSend: function( xhr ){							
							if( !$.trim( $('#listF'+str1+' .newslist').html() ).length ) {
								$('#listF'+str1+' .newslist').empty();
								$('.loader').fadeIn();
							}else{
								
							}
							$('.hTitle h1').html('Nairobi News » '+str1);
						},
						success: function(xml){
							var $xml = $(xml);
							var ttle = $xml.find('channel > title').text();
							$('.hTitle h1').empty();
							$('.hTitle h1').html(ttle);
							if( !$.trim( $('#listF'+str1+' .newslist').html() ).length ) {
								
							}else{
								$('#listF'+str1+' .newslist').empty();
							}
							$xml.find("item").each(function () {
								var description = $(this).find('description').text();
								var hLink = $(this).find("link").text();
								var hTitle = $(this).find("title").text();
								var hTime = $(this).find("pubDate").text();
								var hContent = $(this).find('encoded').text();
								//alert(hContent);
								var srcText = /src=/;
								var srcExist = srcText.test(description);
								var src1,src2,src3,ifImg;
								if(srcExist){
									src1 = $(description).text();
									src2 = $(description)[0];
									src3 = $(src2).attr('src');
								}else{
									src3 = 'img/noimage.png';
									src1 = description.split('<');
									src1 = src1[0];
								}
								$('#listF'+str1+' .newslist').append('<li><a data-link="'+hLink+'" class="newslista"><img src="'+src3+'"><article><h1>'+hTitle+'</h1><p>'+src1+'</p><time>'+hTime+'</time><textarea>'+hContent+'</textarea></article></a></li>');
								$(".newslist li").fadeIn(1000);
							});
						},
						complete: function(xhr, statusText){
							if(xhr.status == 200){
								$('.loader').fadeOut();
							}
						},
						error: function(xhr, statusText, err){
							if(xhr.status == 0){
								$('.loader').fadeIn();
								printData();
							}else{
								alert("No data received. Check your data connection");
								showHome();
							}
						}
					});
				}
				printData();
			}
        	$(this).off('touchend');
        });
		
    	$(this).on('touchmove', function(e){
        	$(this).off('touchend');
        });     
	});
	
	
	$('.newslist').on('touchstart', '.newslista', function () {
		var $thiss = $(this).attr('data-link');
		$(this).on('touchend', function(e){
			e.preventDefault();
			$thiss = $(this).attr('data-link');
			str1 = $('.feedname').text();
			$('#news').hide();
			$('#article').show();
			$('.loader').fadeIn();
			var finalContent = $(this).find('textarea').val();
			var finalHeader = $(this).find('h1').text();
			var finalDate = $(this).find('time').text();
			var finalLink = $thiss;
			
			$('#articleContent > h1').html(finalHeader);			
			$('#articleContent > div.completeArticle').html(finalContent);
			$('#articleContent .finalLink').html(finalLink);
			$('#articleContent .crp_related').remove();
			$(".content").animate({scrollTop:0}, 'fast');
			$('#articleContent > time').html(finalDate);
			$('.loader').fadeOut(100);			
			$(this).off('touchend');
		});
		$(this).on('touchmove', function(e){
			$(this).off('touchend');
		});
	});
	
	$('.share').on('touchstart', function () {
		var finalLink = $('.finalLink').text();
		var textMessage = $('.completeArticle').text();		
		var message = {
			text: textMessage,
			url: finalLink
		};
		window.socialmessage.send(message);
	});
	
	
	$('.view').on('touchstart', function () {
		var checkGrid = $(this).hasClass('grid');
		var listHeight;
		if(checkGrid){
			$(this).removeClass('grid');
			$('.navgrid').addClass('navlist');
			listHeight = $('ul.navlist li a i').css('height');
			$('ul.navlist li a i').css('width',listHeight );
			var spanLeft = $('ul.navlist li a i').height() + 10;
			$('ul.navlist li a span').css('left',spanLeft );
		}else{
			$(this).addClass('grid');
			$('.navgrid').removeClass('navlist');
			$('ul.navgrid li a i').css({"width" : "100%", "height" : "100%"});
			$('ul.navgrid li a span').css({"left" : "0"});
		}
	});
});
function comingsoondis(){
	//alert('Coming Soon');
}