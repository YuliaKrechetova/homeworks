$(document).ready(function(){
	
	$.ajax({
		url: 'products.json',
		dataType: 'json',
		contentType: 'application/json',
		timeout: 1000,
		beforeSend: function() {
			$.fancybox.showLoading();
		}
	}).done(function(result) {
		var templateString = $('#menu-template').html(); // берем "шаблон" из index.html
		var template = _.template(templateString);
		var productsList = result;

		// фильтр распродажи
		var onSaleItems = productsList.filter(function(item) {
			return item.type == 'sale';			
		});
		var filteredMassive = template({data: onSaleItems}); // поскольку в переменную template мы записали функцию, она тоже стала функцией и мы даем ей агрумент

		$('#on-sale-container').html(filteredMassive); // отдаем содержимое переменной в нужный нам контейнер

		// фильтр промо-акций
		var promoItems = productsList.filter(function(item) {
			return item.type == 'promo';			
		});
		var filteredMassive = template({data: promoItems}); 

		$('#promo-container').html(filteredMassive); 

		// фильтр рекомендуемых
		var recommendedItems = productsList.filter(function(item) {
			return item.type == 'recommended';			
		});
		var filteredMassive = template({data: recommendedItems}); 

		$('#recommended-container').html(filteredMassive); 
	}).fail(function(request, errorType, errorMessage) {
		alert('Error: ' + errorType + errorMessage);
	}).always(function (xhr, status) {
	    $.fancybox.hideLoading(); 
	});		

});