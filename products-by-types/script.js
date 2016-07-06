$(document).ready(function(){

	var html = _.template(tmpl)({
	  title: "Сладости",
	  items: [
	    "Торт",
	    "Печенье",
	    "Пирожное"
	  ]
	});
	
	$.ajax({
		url: 'products.json',
		dataType: 'json',
		contentType: 'application/json'
	}).done(function(result) {
		// var productsList = result;
		// var onSale = productsList.filter(function(type) {
		// 	return type == 'sale';			
		// });
		alert(result);
		var msg = $("<p></p>");
		msg.append(result.pic);
		msg.append("Название товара: " + result.name + ";");
		msg.append("Цена: " + result.price + "руб.");		
		$('#sale').find('.products-container').html(msg).fadeIn();
	}).fail(function(request, errorType, errorMessage) {
		alert('Error: ' + errorType + errorMessage);
	}).always(function (xhr, status) {
	    $.fancybox.hideLoading(); // А когда она должна показаться-то?
	});		

});