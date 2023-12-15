$('.datepicker').each(function(index, element) {
	new Pikaday({
		field: element,
		firstDay: 6,
	});
});
//
