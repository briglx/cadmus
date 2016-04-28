
$(function(){

	var filename = "WIN_20160403_15_16_53_Pro"
	var libPath = "..\\lib\\"
	var dataPath = "..\\data\\"
	var rawDataPath = dataPath + "raw_images\\"
	var cropDataPath = dataPath + "crop_images\\"
	var textDataPath = dataPath + "ocr_output\\"
	var filePath = rawDataPath  + filename + ".jpg"
	

	var imageName = "WIN_20160403_15_16_53_Pro";
	var imageHand = "l"
	var imageVersion = 0;
	var imageExtention = "jpg"
	var flagCount = 0;

	var imagePath =  imageName + "-" + imageHand + imageVersion + "." + imageExtention


	$(".text-preview").on("mouseover", "span", function(){

		$(".text-preview span").removeClass("active");

		$(this).addClass("active");

	})

	$(".btn.prev").on("click", function(){


		imageVersion = imageVersion - 1 ;
		imagePath = imageName + "-" + imageHand + imageVersion + "." + imageExtention

		loadImage(imagePath);

	})

	$(".btn.next").on("click", function(){

		imageVersion = imageVersion + 1 ;
		imagePath = imageName + "-" + imageHand + imageVersion + "." + imageExtention

		loadImage(imagePath);
		
	})

	$(".text-preview").on("mouseover", "span", function(){

		$(".text-preview span").removeClass("active");

		$(this).addClass("active");

	})

	

	$(".text-preview").on("click", "span", function(){

		
		$(this).toggleClass("selected");

		$(".flagged .badge").text($(".text-preview .selected").size())

	})


	var loadImage = function(imageName){

		$(".img-title").html(imageName)

		$(".viewer-content .img").attr(
		    'src',
		    cropDataPath + imageName
		);

		$.ajax({
		  url: textDataPath + imageName + ".out.txt",
		  context: document.body
		}).done(function(data) {


			$(".text-preview").empty()

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

	}

	

	loadImage(imagePath)

	

})