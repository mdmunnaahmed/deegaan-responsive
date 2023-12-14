

$('#sidebarToggler').on('click', function (e) {
	$('.sidebar').toggleClass('active')
	$('#sidebar').toggleClass('active')
	$('.overlay').toggleClass('active')
})
$('.overlay').on('click', function (e) {
	$('.sidebar').removeClass('active')
	$('#sidebar').removeClass('active')
	$('.overlay').removeClass('active')
})