$(document).ready(function(){

    $("#parameter #init").click(function(){
        init($("#parameter .nbMax").val());
    });

    $("#parameter #validate").click(function(){
		activateTile();
    });

	function init(size) {
		$('#content').empty();
		for (var i = 0; i < size; i++) {
			for (var j = 0; j < size; j++) {
				$('#content').append('<div class="square" id="'+i+'-'+j+'" data-x="'+i+'" data-y="'+j+'"></div>');
			}
		}
		$('#content').css('width', size*20 + 2);
		$('#content').css('height', size*20 + 2);
	}

	var nbSquare=0;
	var minArea=0;
	var maxArea=0;
	function activateTile() {
		$('.currentTiles').addClass('squareCompleted');
		$('.currentTiles').attr('data-nb', nbSquare);
		size = $('.currentTiles').length;
		++nbSquare;
		if (minArea == 0 || minArea > size)
			minArea = size;
		if (maxArea == 0 || maxArea < size)
			maxArea = size;
		$("#score").html(maxArea-minArea);
		$('.currentTiles').removeClass('currentTiles');
	}

	var origin = null;
	$('body').on('mousedown', '.square', function() {
		x = $(this).data('x');
		y = $(this).data('y');
		origin = { x, y };
	}).on('mouseup mouseleave', function() {
		origin = null;
	});

	$('body').on('mouseenter', '.square', function() {
		if (origin == null)
			return ;
		x = $(this).data('x');
		y = $(this).data('y');
		current = { x, y };

		var min = [ ((current.x < origin.x) ? current.x : origin.x), ((current.y < origin.y) ? current.y : origin.y) ];
		var max = [ ((current.x > origin.x) ? current.x : origin.x), ((current.y > origin.y) ? current.y : origin.y) ];

		$('.currentTiles').removeClass('currentTiles');
		for (var i = min[0]; i <= max[0]; i++) {
			for (var j = min[1]; j <= max[1]; j++) {
				if ($('#'+i+'-'+j).hasClass('squareCompleted')) {
					$('.currentTiles').removeClass('currentTiles');
					origin = null;
					return;
				}
				$('#'+i+'-'+j).addClass('currentTiles');
			}
		}
		$("#parameter .displayer").val($('.currentTiles').length);
	});

	init(5);
});