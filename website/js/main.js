
$(function(){


	$(".text-preview").on("mouseover", "span", function(){

		$(".text-preview span").removeClass("active");

		$(this).addClass("active");

	})

	$(".text-preview").on("click", "span", function(){

		
		$(this).toggleClass("selected");

	})


	var imageName = "l-1.jpg";

	$.ajax({
	  url: "../" + imageName + ".out.txt",
	  context: document.body
	}).done(function(data) {

		var items = data.split("\n");
		
		var isNewParagraph = false

		for (var i = 0; i < items.length; i++) {

			var line = items[i];


			if(line.length > 0){

				var p=  $("<p>")
				if(isNewParagraph){
					p.addClass("paragraph");
				}

				// Split each word

				var words = line.split(" ");
				for (var j = 0; j < words.length; j++) {

					var w=  $("<span>")

					w.append(words[j]);
					p.append(w);
					
				}




				$(".text-preview").append(p)
				isNewParagraph = false;
			}
			else {
				isNewParagraph = true;
			}
			
		   
		}


		


		
	});


	

})