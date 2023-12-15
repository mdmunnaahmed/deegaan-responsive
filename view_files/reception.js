function simplfyAddRsrvtn() {
	//
	//check if client check is checked or not
	$('[name="chkClient"]').change(function() {
		var chkClient 		= $('[name="chkClient"]').prop('checked');
		$('[name="clientID"], [name="clientName"], [name="clientPhone"], [name="clientEmail"], [name="qrCode"], [name="clientBalance"]').val('');
		$('[name="clientName"]').attr('placeholder', 'search by name');
		if(chkClient) {
			$('[name="clientName"]').attr('placeholder', 'name');
		}
	});
	// search client 4 reservation
	$('[name="clientName"]').keyup(function() {
		$('[name="clientID"], [name="clientBalance"]').val('');
		$(".suggest.customer").css('display', 'none');
		$(".suggest.customer").html('');
		$(".suggest.customer").addClass('loading');
	    var chkClient 		= $('[name="chkClient"]').prop('checked');
	    var clientName 		= $('[name="clientName"]').val();
	    if(!chkClient && clientName) {
	    	$('[name="clientPhone"]').val('');
	    	$(".suggest.customer").css('display', 'table-row');
	    	$.ajax({
				type: "POST",
				url: "./includes/reception.php?action=searchRec&dest=pickClient4Rsrvtn",
				data: 'passedValue='+clientName,
				cache: false,
				timeout: 2000,
				success: function(result) {
					$(".suggest.customer").removeClass('loading');
					$(".suggest.customer").html(result);
				},
			});
	    }
	});
	// payee type action
	$('[name="chkPayee"]').attr('disabled', 'disabled');
	$('[name="payeeName"]').attr('disabled', 'disabled');
	$('[name="payeePhone"]').prop('disabled', 'disabled');
	$('[name="payeeEmail"]').prop('disabled', 'disabled');
	$('[name="slcPayeeType"]').change(function() {
		var slcPayeeType 		= $('[name="slcPayeeType"]').val();
		if(slcPayeeType=="self") {
	    	$('[name="chkPayee"]').prop('checked', true);
			$('[name="chkPayee"]').prop('disabled', true);
			$('[name="payeeName"]').prop('disabled', true);
			$('[name="payeePhone"]').prop('disabled', true);
			$('[name="payeeEmail"]').prop('disabled', true);
		} else {
			$('[name="chkPayee"]').attr('disabled', false);
			$('[name="payeeName"]').attr('disabled', false);
			$('[name="payeePhone"]').prop('disabled', false);
			$('[name="payeeEmail"]').prop('disabled', false);
		}
	});
	// search payee
	$('[name="chkPayee"]').change(function() {
		var chkPayee 		= $('[name="chkPayee"]').prop('checked');
		$('[name="payeeID"], [name="payeeName"]').val('');
		$('[name="payeeName"]').attr('placeholder', 'search payee name');
		if(chkPayee) {
			$('[name="payeeName"]').attr('placeholder', 'name');
		}
	});
	$('[name="payeeName"]').keyup(function() {
		$('[name="payeeID"]').val('');
		$(".suggest.payee").css('display', 'none');
		$(".suggest.payee").html('');
		$(".suggest.payee").addClass('loading');
	    var chkPayee 		= $('[name="chkPayee"]').prop('checked');
	    var payeeName 		= $('[name="payeeName"]').val();
	    if(!chkPayee && payeeName) {
	    	$(".suggest.payee").css('display', 'table-row');
	    	$.ajax({
				type: "POST",
				url: "./includes/reception.php?action=searchRec&dest=pickPayee4Rsrvtn",
				data: 'passedValue='+payeeName,
				cache: false,
				timeout: 2000,
				success: function(result) {
					$(".suggest.payee").removeClass('loading');
					$(".suggest.payee").html(result);
				},
			});
	    }
	});
	// search identity
	$('[name="chkIdentity"]').change(function() {
		var chkIdentity 		= $('[name="chkIdentity"]').prop('checked');
		$('[name="identityID"], [name="identityName"]').val('');
		$('[name="identityName"]').attr('placeholder', 'search identity type');
		if(chkIdentity) {
			$('[name="identityName"]').attr('placeholder', 'name');
		}
	});
	$('[name="identityName"]').keyup(function() {
		$('[name="identityID"]').val('');
		$(".suggest.identity").css('display', 'none');
		$(".suggest.identity").html('');
		$(".suggest.identity").addClass('loading');
	    var chkIdentity 		= $('[name="chkIdentity"]').prop('checked');
	    var identityName 		= $('[name="identityName"]').val();
	    if(!chkIdentity && identityName) {
	    	$('[name="identityNo"]').val('');
	    	$(".suggest.identity").css('display', 'table-row');
	    	$.ajax({
				type: "POST",
				url: "./includes/reception.php?action=searchRec&dest=pickIdentity4Rsrvtn",
				data: 'passedValue='+identityName,
				cache: false,
				timeout: 2000,
				success: function(result) {
					$(".suggest.identity").removeClass('loading');
					$(".suggest.identity").html(result);
				},
			});
	    }
	});
	// payee type action
	// $('[name="checkInTime"]').attr('disabled', 'disabled');
	// $('[name="checkOutTime"]').attr('disabled', 'disabled');
	$('[name="slcResType"]').change(function() {
		var slcResType 		= $('[name="slcResType"]').val();
		if(slcResType=="hour") {
			$('[name="checkInTime"]').attr('disabled', false);
			$('[name="checkOutTime"]').attr('disabled', false);
		} else {
			$('[name="checkInTime"]').attr('disabled', 'disabled');
			$('[name="checkOutTime"]').attr('disabled', 'disabled');
		}
	});
	//search allocation
	$('[name="allocName"]').keyup(function() {
		$('[name="allocID"]').val('');
		$(".suggest.allocation").css('display', 'none');
		$(".suggest.allocation").html('');
		$(".suggest.allocation").addClass('loading');
	    var allocName 		= $('[name="allocName"]').val();
	    var slcResType 		= $('[name="slcResType"]').val();
	    var checkInDate 	= $('[name="checkInDate"]').val();
	    var checkInTime 	= $('[name="checkInTime"]').val();
	    var checkOutDate 	= $('[name="checkOutDate"]').val();
	    var checkOutTime 	= $('[name="checkOutTime"]').val();

	    let timeIn 	= moment.duration(checkInTime, 'HH:mm')
	    let timeOut = moment.duration(checkOutTime, 'HH:mm')
	    let difference = timeOut.subtract(timeIn)

		if(difference._data.minutes > 0) {
			$(".error.checkOut").css("display", "inline");
			$(".error.checkOut").html(`Please select complete hours. There is ${difference._data.minutes} minutes difference`);
			$('[name="checkInDate"]').css("border-color", "#FF0000");
			$('[name="checkOutDate"]').css("border-color", "#FF0000");
			$('[name="checkInTime"]').css("border-color", "#FF0000");
			$('[name="checkOutTime"]').css("border-color", "#FF0000");
			return false;
		} else {clearErrors()}

	    if(checkInDate=='' || checkOutDate=='') {
			$(".error.checkOut").css("display", "inline");
			$(".error.checkOut").html("Select check in and check out days");
			$('[name="checkInDate"]').css("border-color", "#FF0000");
			$('[name="checkOutDate"]').css("border-color", "#FF0000");
			return false;
		} else { clearErrors(); }
		//
		if(checkInDate>checkOutDate) {
			$(".error.checkOut").css("display", "inline");
			$(".error.checkOut").html("Please pick valid checkin date and checkout date");
			$('[name="checkInDate"]').css("border-color", "#FF0000");
			$('[name="checkOutDate"]').css("border-color", "#FF0000");
			return false;
		} else { clearErrors(); }

    	$(".suggest.allocation").css('display', 'table-row');
    	$.ajax({
			type: "POST",
			url: "./includes/reception.php?action=searchRec&dest=pickAlloc4Rsrvtn",
			data: 'passedValue='+allocName+'&slcResType='+slcResType+'&checkInDate='+checkInDate+'&checkOutDate='+checkOutDate+'&checkInTime='+checkInTime+'&checkOutTime='+checkOutTime,
			cache: false,
			timeout: 2000,
			success: function(result) {
				$(".suggest.allocation").removeClass('loading');
				$(".suggest.allocation").html(result);
			},
		});
	});
	$('[name="txtDiscount"]').keyup(function() {
	    var price 	 = $('[name="pricePerDay"]').val();
	    var days 	 = $('[name="allocDays"]').val();
	    var discount = $('[name="txtDiscount"]').val();
	    var pricePerDay = $('[name="pricePerDay"]').val();
	    var allocDays = $('[name="allocDays"]').val();
	    var ttlPrice = (allocDays*pricePerDay);
		//
		if(parseFloat(discount)>parseFloat(ttlPrice)) {
			$('[name="txtDiscount"]').val(ttlPrice);
			$('[name="totalPrice"]').val('0');
		} else {
			var totalPrice = parseFloat(price*days);
			$('[name="totalPrice"]').val(parseFloat((price*days)-discount));
		}
	});
	//
	$("#chkInDate,#chkOutDate,#checkInTime,#checkOutTime").change(function() {
		var priceType = $("input#priceType").val();
		var txtPrice = $("input#txtPrice").val();
		var txtDisc = $("input#txtDisc").val();
		//
		var chkInDate = $("input#chkInDate").val();
		var chkOutDate = $("input#chkOutDate").val();
		//
		var checkInTime = $("input#checkInTime").val();
		var checkOutTime = $("input#checkOutTime").val();
		//
		$.post("./includes/reception.php?action=searchRec&dest=checkReservationDates",{ chkInDate:chkInDate,chkOutDate:chkOutDate,checkInTime:checkInTime,checkOutTime:checkOutTime,priceType:priceType }, function(data) {

			var ttlAllocP = parseFloat(txtPrice*data)-txtDisc;
			if(ttlAllocP>=0){
				$("#txtAllocQty").val(data);
				$("#txtTtlPrice").val(ttlAllocP);
			}else{
				$("#txtAllocQty").val('');
				$("label.error.checkOut").css("display", "inline");
				$("label.error.checkOut").html("Please provide valid reservation date");
				$("#chkOutDate").css("border-color", "#FF0000");
			}
		});

	});
	//
	$("#txtDisc").keyup(function() {
	    var pricePerDay 	 = $("#txtPrice").val();
	    var allocDays 	 = $("#txtAllocQty").val();
	    var discount = $("#txtDisc").val();
	    var ttlPrice = parseFloat(allocDays*pricePerDay);
		//
		if(parseFloat(discount)>parseFloat(ttlPrice)) {
			$("#txtDisc").val(ttlPrice);
			$("#txtTtlPrice").val('0');
		} else {
			var totalPrice = ttlPrice;
			$("#txtTtlPrice").val(parseFloat(ttlPrice-discount));
		}
	});
	//
	$("input#txtSrchAlloc").keyup(function(){
		var txtSrchAlloc	 = $("#txtSrchAlloc").val();
		if(txtSrchAlloc!="") {
			$("div.suggest").css("display", "table-row");
			$.post("./includes/reception.php?action=searchRec&dest=searchAlloc4Check",{ passedValue:txtSrchAlloc }, function(data) {
				$("div.suggest").html(data);
			});
		} else { $("div.suggest").css("display", "none"); }
		clearErrors();
	});
	//
	$('[name="checkInDate"],[name="checkOutDate"]').change(function () {
		$('[name="allocDays"]').val('');
		$('[name="pricePerDay"]').val('');
		$('[name="longName"]').val('');
		$('[name="allocType"]').val('');
		$('[name="allocID"]').val('');
		$('[name="allocName"]').val('');
		$('[name="txtDiscount"]').val('');
		$('[name="totalPrice"]').val('');
	});
}
//
function checkRoomStatus() {
	var allocID = $("#allocID").val();
	var txtSrchAlloc = $("#txtSrchAlloc").val();
	var fromDate = $("#fromDate").val();
	var toDate = $("#toDate").val();
	//
	if(allocID!="" && txtSrchAlloc!="") {
		$.post("./includes/reception.php?action=searchRec&dest=checkRoomStatus",{ allocID:allocID, fromDate:fromDate, toDate:toDate}, function(data) {
			$("div.alloc-data").html(data);
		});
	} else {$("div.alloc-data").html('');}

}
//
function closeOrder(orderID){
	swal({
		title: "Are you sure to cancel order?",
		text: "You going to cancel this order!",
		icon: "warning",
		dangerMode:true,
		buttons:["Cancel","'Yes, remove it!"],
		closeOnConfirm: false
	})
	.then(willDelete=> {
		if(willDelete) {
			$.post("./includes/reception.php?action=updateExist&dest=closeOrder&updatedBy="+myUser,{ orderID:orderID }, function(data){
				if(data=="updated") {
					swal({
						title: "Success",
						text: "Order cancelled successfully",
						icon: "success",
						timer: 1500,
						button: false
					})
						.then(value=> {
							location.reload();
						}
					);
				} else {
					swal("Oops!", data, "error");
				}
			});
		}
	});
	return false;
}
//
function catchClient4Rsrvtn(clientID, clientName, phone, email, qrCode, balance) {
	$('[name="clientID"]').val(clientID);
	$('[name="clientName"]').val(clientName);
	$('[name="clientPhone"]').val(phone);
	$('[name="clientEmail"]').val(email);
	$('[name="qrCode"]').val(qrCode);
	$('[name="clientBalance"]').val(balance);
	$(".suggest.customer").css("display", "none");
}
function catchPayee4Rsrvtn(clientID, clientName, phone, email) {
	$('[name="payeeID"]').val(clientID);
	$('[name="payeeName"]').val(clientName);
	$('[name="payeeName"]').val(clientName);
	$('[name="payeePhone"]').val(phone);
	$('[name="payeeEmail"]').val(email);
	$(".suggest.payee").css("display", "none");
}
function catchIdentity4Rsrvtn(identityID, identityName) {
	$('[name="identityID"]').val(identityID);
	$('[name="identityName"]').val(identityName);
	$(".suggest.identity").css("display", "none");
}
function catchAlloc4Rsrvtn( allocID, shortName, longName, typeNamme, price, maxDiscount, amenities, daysDiff) {
	$('[name="allocID"]').val(allocID);
	$('[name="allocName"]').val(shortName+', '+longName);
	$('[name="longName"]').val(longName);
	$('[name="allocType"]').val(typeNamme);
	$('[name="allocAmenities"]').val(amenities);
    var slcResType = $('[name="slcResType"]').val();
	$('[name="pricePerDay"]').val(price);
	$('[name="allocDays"]').val(daysDiff);
	$('[name="txtDiscount"]').val(0);
	$('[name="totalPrice"]').val(parseFloat((price*daysDiff).toFixed(2)));
	$(".suggest.allocation").css("display", "none");
}
function catchAlloc4Check( allocID, shortName, longName, typeNamme, price) {
	$('#allocID').val(allocID);
	$('#txtSrchAlloc').val(shortName+', '+longName);
	$(".suggest").css("display", "none");
}
function check_addReservation() {
    var clientName 		= $('[name="clientName"]').val();
    var clientPhone 	= $('[name="clientPhone"]').val();
    var slcResType 		= $('[name="slcResType"]').val();
    var checkInDate 	= $('[name="checkInDate"]').val();
    var checkInTime 	= $('[name="checkInTime"]').val();
    var checkOutDate 	= $('[name="checkOutDate"]').val();
    var checkOutTime 	= $('[name="checkOutTime"]').val();
    var slcPayeeType 	= $('[name="slcPayeeType"]').val();
    var payeeName 		= $('[name="payeeName"]').val();
    var payeePhone 		= $('[name="payeePhone"]').val();
    var allocName 		= $('[name="allocName"]').val();
    var allocID 		= $('[name="allocID"]').val();
    var allocDays 		= $('[name="allocDays"]').val();
    var txtDiscount 	= $('[name="txtDiscount"]').val();
    var totalPrice 		= $('[name="totalPrice"]').val();

    let timeIn 	= moment.duration(checkInTime, 'HH:mm')
    let timeOut = moment.duration(checkOutTime, 'HH:mm')
    let difference = timeOut.subtract(timeIn)

    // console.log(difference._data.minutes)

    if(!clientName) {
		$(".error.clientName").css("display", "inline");
		$(".error.clientName").html("Please select customer");
		$('[name="clientName"]').css("border-color", "#FF0000");
		return false;
	}
	if(!clientPhone) {
		$(".error.clientPhone").css("display", "inline");
		$(".error.clientPhone").html("Customer phone is missing");
		$('[name="clientPhone"]').css("border-color", "#FF0000");
		return false;
	}
	if(slcPayeeType=="other") {
		if(!payeeName) {
			$(".error.payeeName").css("display", "inline");
			$(".error.payeeName").html("Select payee");
			$('[name="payeeName"]').css("border-color", "#FF0000");
			return false;
		}
		if(!payeePhone) {
			$(".error.payeePhone").css("display", "inline");
			$(".error.payeePhone").html("Payee phone is missing");
			$('[name="payeePhone"]').css("border-color", "#FF0000");
			return false;
		}
	}
	if(!checkInDate || !checkOutDate) {
		$(".error.checkOut").css("display", "inline");
		$(".error.checkOut").html("Please select check in and check out");
		$('[name="checkInDate"]').css("border-color", "#FF0000");
		$('[name="checkOutDate"]').css("border-color", "#FF0000");
		return false;
	}

	if(difference._data.minutes > 0) {
		$(".error.checkOut").css("display", "inline");
		$(".error.checkOut").html(`Please select complete hours. There is ${difference._data.minutes} minutes difference`);
		$('[name="checkInDate"]').css("border-color", "#FF0000");
		$('[name="checkOutDate"]').css("border-color", "#FF0000");
		$('[name="checkInTime"]').css("border-color", "#FF0000");
		$('[name="checkOutTime"]').css("border-color", "#FF0000");
		return false;
	} else {clearErrors()}

	if(slcResType=="hour") {
		if(!checkInDate || !checkOutDate || !checkInTime || !checkOutTime) {
			$(".error.checkOut").css("display", "inline");
			$(".error.checkOut").html("Please select check in and check out hours");
			$('[name="checkInTime"]').css("border-color", "#FF0000");
			$('[name="checkOutTime"]').css("border-color", "#FF0000");
			return false;
		}
	}
	//
	if(!allocName || !allocID) {
		$(".error.allocName").css("display", "inline");
		$(".error.allocName").html("Select allocation");
		$('[name="allocName"]').css("border-color", "#FF0000");
		return false;
	}
	//
	if(parseFloat(totalPrice)<0) {
		$(".error.discount").css("display", "inline");
		$(".error.discount").html("Discount must equal or less then "+totalPrice);
		$('[name="txtDiscount"]').css("border-color", "#FF0000");
		return false;
	}
	//
	if(parseFloat(allocDays) < 1 && sameDayCheckOut == 'no') {
		$(".error.allocName").css("display", "inline");
		$(".error.allocName").html("Please provide valid reservation");
		$('[name="allocName"]').css("border-color", "#FF0000");
		$('[name="allocDays"]').css("border-color", "#FF0000");
		return false;
	}
	//
	$("#btnSave").attr("disabled", true);
	$("#btnSave").html("wait...");
	$("label.process").css("display", "inline");

	return true;
}
//
function editReservationDiscount(payeeID,checkInID,invocID,detailID,t_price) {
	swal({
		title: "Edit Reservation Discount",
		text: 'Please provide valid discount',
		content: "input",
		buttons: ["Cancel","Save"]
	})
	.then(newDiscount=> {
		var amntReg = /[0-9]/;
		if (newDiscount) {
			if(newDiscount.match(amntReg)) {
				if(parseFloat(newDiscount)<=parseFloat(t_price)) {
					$.post("./includes/reception.php?action=updateExist&dest=editReservationDiscount&updatedBy="+myUser, { newDiscount:newDiscount,checkInID:checkInID,payeeID:payeeID,invocID:invocID,detailID:detailID }, function(data) {
						if(data=="updated") {
							var lastID = data.slice(6,21);
							swal({
								title: "Success!",
								text: "You successfully updated selected record.",
								icon: "success",
								timer: 1500,
								button: false
							})
							.then(value=>{
								location.reload();
							});
						} else {
							swal("Oops!", data, "error");
						}
					});
				}
			}
		}
	});
	return false;
}
//
function simplfyTrnsfrRsrvtn(){
	$("#allocType").append(function() {
		var allocType	= $("#allocType").val();
		if(allocType== "hour") {
			$("input#timeIn, input#timeOut").attr('disabled', false);;
		} else {
			$("input#timeIn, input#timeOut").attr('disabled', 'disabled');;
		}
		$("input#allocID, input#allocPrice, input#srchRoom").val('');
		$("div.displayInfo.alloc").css("display", "none");
	});
	//
	$("input#srchRoom").keyup(function(){
		var srchRoom	= $("#srchRoom").val();
		var allocType	= $("#allocType").val();

		var chkInDate 	= $("#chkInDate").val();
		var chkOutDate	= $("#chkOutDate").val();
		var timeIn 		= $("#timeIn").val();
		var timeOut		= $("#timeOut").val();

		if(chkInDate=='' || chkOutDate=='') {
			$("#error3").css("display", "inline");
			$("#error3").html("Select check in and check out days");
			$("#chkInDate, #chkOutDate").css("border-color", "#FF0000");
			return false;
		} else { clearErrors(); }
		//
		if(chkInDate>chkOutDate) {
			swal('OOPS','Please pick valid checkin date and checkout date','error');
			$('[name="chkInDate"]').css("border-color", "#FF0000");
			$('[name="chkOutDate"]').css("border-color", "#FF0000");
			$("#srchRoom").val('');
			return false;
		} else { clearErrors(); }
		//
		if(allocType=='night') {
			if(chkInDate == chkOutDate && sameDayCheckOut == 'no') {
				$("#error3").css("display", "inline");
				$("#error3").html("Select different days");
				$("#chkOutDate").css("border-color", "#FF0000");
				$('html, body').animate({ scrollTop: $(".record.three").offset().top }, 'slow');
				return false;
			} else { clearErrors(); }

		} else {
			if((chkInDate == chkOutDate) && (timeIn == timeOut) && sameDayCheckOut == 'no') {
				$("#error3").css("display", "inline");
				$("#error3").html("Select different date time");
				$("#chkOutDate, #timeOut").css("border-color", "#FF0000");
				$('html, body').animate({ scrollTop: $(".record.three").offset().top }, 'slow');
				return false;
			} else { clearErrors(); }

		}
		if(srchRoom!="") {
			$("div.suggest.alloc").css("display", "table-row");
			$.post("./includes/reception.php?action=searchRec&dest=srchRoom4Rsrve", { srchRoom:srchRoom, allocType:allocType, chkInDate:chkInDate, chkOutDate:chkOutDate, timeIn:timeIn, timeOut:timeOut }, function(data) {
				$("div.suggest.alloc").html(data);
			});
		} else { $("div.suggest.alloc").css("display", "none"); }
		clearErrors();
	});
	//
	$("#chkInDate,#chkOutDate,#checkInTime,#checkOutTime").change(function() {
		var priceType = $("#allocType").val();
		var txtPrice = $("input#allocPrice").val();
		var oldQty = $("input#oldQty").val();
		var txtOldPrice = $("input#txtOldPrice").val();
		//
		var chkInDate = $("input#chkInDate").val();
		var chkOutDate = $("input#chkOutDate").val();
		//
		var checkInTime = $("input#checkInTime").val();
		var checkOutTime = $("input#checkOutTime").val();
		//
		$("input#newCheckOutDate").val(chkInDate);
		//
		$.post("./includes/reception.php?action=searchRec&dest=checkReservationDates",{ chkInDate:chkInDate,chkOutDate:chkOutDate,checkInTime:checkInTime,checkOutTime:checkOutTime,priceType:priceType }, function(data) {
			//
			var newCheckOutDate = $("input#newCheckOutDate").val();
			var txtOldCheckInDate = $("input#txtOldCheckInDate").val();
			$.post("./includes/reception.php?action=searchRec&dest=checkReservationDates",{ chkInDate:txtOldCheckInDate,chkOutDate:newCheckOutDate,checkInTime:checkInTime,checkOutTime:checkOutTime,priceType:priceType }, function(data2) {
				var oldttlAllocP = (parseFloat(txtOldPrice)*parseFloat((data2)));
				$("input#txtNewAmount").val(oldttlAllocP);
				//
				//alert(data-oldQty);
			});

			//
			var ttlAllocP = parseFloat(txtPrice*data);
			if(data>=0){
				$("#allocDays").val(data);
				$("#totalPrice").val(ttlAllocP);
				clearErrors();
			}else{
				$("#allocDays").val('');
				$("#error2").css("display", "inline");
				$("#error2").html("Please provide valid reservation date");
				$("#chkOutDate").css("border-color", "#FF0000");
			}

		});

	});
	//
	$("#txtDiscount").keyup(function() {
	    var pricePerDay 	 = $("#pricePerDay").val();
	    var allocDays 	 = $("#allocDays").val();
	    var discount = $("#txtDiscount").val();
	    var ttlPrice = parseFloat(allocDays*pricePerDay);
		//
		if(parseFloat(discount)>parseFloat(ttlPrice)) {
			$("#txtDiscount").val(ttlPrice);
			$("#totalPrice").val('0');
		} else {
			var totalPrice = ttlPrice;
			$("#totalPrice").val(parseFloat(ttlPrice-discount));
		}
	});
	//
	$("#txtOldDiscoiunt").keyup(function() {
	    var txtOldDiscoiunt 	 = $("#txtOldDiscoiunt").val();
	    var txtSubtotal 	 = $("#txtSubtotal").val();
		//
		if(parseFloat(txtOldDiscoiunt)>parseFloat(txtSubtotal)) {
			$("#txtOldDiscoiunt").val(txtSubtotal);
			$("#txtOldTotal").val('0');
			//$("#txtNewAmount").val('0');
		} else {
			$("#txtOldTotal").val(parseFloat(txtSubtotal-txtOldDiscoiunt));
			//$("#txtNewAmount").val(parseFloat(txtSubtotal-txtOldDiscoiunt));
		}
	});
}
function catchAlloc4Trnsfr(allocID, allocName, pprtyInfo, price, maxDiscount, amenities, status) {
	$("#allocID").val(allocID);
	$("#allocPrice").val(price);
	$("#srchRoom").val(allocName);
	var allocDays = $("#allocDays").val();
	var ttlPrice = (parseFloat(allocDays)*parseFloat(price));
	$("#totalPrice").val(ttlPrice);
	$("div.suggest.alloc").css("display", "none");
}
function transferCheckIn(){
	var guestID		= $("#guestID").val();
	var txtGuest	= $("#txtGuest").val();
	var roomID		= $("#roomID").val();
	var checkInID	= $("#checkInID").val();
	var checkDetID	= $("#checkDetID").val();
	var invoiceID	= $("#invoiceID").val();
	var allocType	= $("#allocType").val();

	var chkInDate	= $("#chkInDate").val();
	var chkOutDate	= $("#chkOutDate").val();
	var timeIn		= $("#checkInTime").val();
	var timeOut		= $("#checkOutTime").val();

	var srchRoom	= $("#srchRoom").val();
	var allocID		= $("#allocID").val();
	var allocPrice	= $("#allocPrice").val();
	var discount	= $("#discount").val();
	var oldDateIN	= $("#oldDateIN").val();
	//
	var txtOldDiscoiunt	= $("#txtOldDiscoiunt").val();
	var txtNewAmount	= $("#txtNewAmount").val();
	//
	if(txtGuest.length < 1 || guestID.length < 1) {
		$("#error1").css("display", "inline");
		$("#error1").html("Please provide guest");
		$("#txtGuest").css("border-color", "#FF0000");

		$("div.suggest").css("display", "none");
		return false;
	} else { clearErrors(); }


	if(txtOldDiscoiunt.length < 1 || txtNewAmount.length < 1 || parseFloat(txtNewAmount)<parseFloat(txtOldDiscoiunt)) {
		$("#txtOldDiscoiunt").css("border-color", "#FF0000");
		swal("OOPS","Please make sure discount must equal or less then $"+txtNewAmount,"error");
		return false;
	} else { clearErrors(); }

	if(allocType=='night') {
		if(chkInDate.length < 1 || chkOutDate.length < 1) {
			$("#error2").css("display", "inline");
			$("#error2").html("Select check in and check out days");
			$("#chkInDate, #chkOutDate").css("border-color", "#FF0000");
			return false;
		} else if((chkInDate == chkOutDate) && sameDayCheckOut == 'no') {
			$("#error2").css("display", "inline");
			$("#error2").html("Select different days");
			$("#chkOutDate").css("border-color", "#FF0000");
			return false;
		} else { clearErrors(); }

	} else {
		if(((chkInDate == chkOutDate) && (timeIn == timeOut)) && sameDayCheckOut == 'no') {
			$("#error2").css("display", "inline");
			$("#error2").html("Select different date time");
			$("#chkOutDate, #timeOut").css("border-color", "#FF0000");
			return false;
		} else { clearErrors(); }
	}

	if(srchRoom.length < 1 || allocID.length < 1) {
		$("#error3").css("display", "inline");
		$("#error3").html("Select allocation to transfer");
		$("#srchRoom").css("border-color", "#FF0000");
		$("div.suggest.room").css("display", "none");
		return false;
	} else { clearErrors(); }
	//
	//

	$("#btnUpdate").attr("disabled", true);
	$("#btnUpdate").html("wait...");
	$("label.process").css("display", "inline");

	$.post("./includes/reception.php?action=updateExist&dest=trnsfrRoom&updatedBy="+myUser, { guestID:guestID, roomID:roomID, checkInID:checkInID, checkDetID:checkDetID, invoiceID:invoiceID, allocType:allocType, chkInDate:chkInDate, chkOutDate:chkOutDate, timeIn:timeIn, timeOut:timeOut, allocID:allocID, allocPrice:allocPrice,discount:discount, oldDateIN:oldDateIN,txtOldDiscoiunt:txtOldDiscoiunt },function(data){
		$("label.process").css("display", "none");
		if(data=="updated") {
			swal({
				title: "Success!",
				text: "You transfered into other room.",
				icon: "success",
				timer: 1500,
				button: false
			})
				.then(value=> {
					window.location = "./reservation-workplace.php?role="+myRole+"&task=reservation&subtask=showInfo&recID="+checkInID;
				}
			);
		} else {
			swal("Oops!", data, "error");
		}
		$("#btnUpdate").attr("disabled", false);
		$("#btnUpdate").html("Update");
	});
	return false;
}
function check_editReservationDate() {
	var checkDetID		= $("#checkDetID").val();
	var checkInID 		= $("#checkInID").val();
	var guestID 		= $("#guestID").val();
	var chkInDate 		= $("#chkInDate").val();
	var chkOutDate 		= $("#chkOutDate").val();
	var priceType 		= $("#priceType").val();
	var checkInTime 	= $("#checkInTime").val();
	var checkOutTime 	= $("#checkOutTime").val();
	var discount 		= $("#txtDisc").val();
	var txtPrice 		= $("#txtPrice").val();
	var txtAllocQty 	= $("#txtAllocQty").val();
	var txtVatPercentage 	= $("#txtVatPercentage").val();

	var checkInDate 	= $('[name="checkInDate"]').val();
    var checkInTime 	= $('[name="checkInTime"]').val();
    var checkOutDate 	= $('[name="checkOutDate"]').val();
    var checkOutTime 	= $('[name="checkOutTime"]').val();

	let timeIn 	= moment.duration(checkInTime, 'HH:mm')
    let timeOut = moment.duration(checkOutTime, 'HH:mm')
    let difference = timeOut.subtract(timeIn)

	if(!checkDetID || !checkInID || !guestID) {
		swal("Oops!", "something went wrong", "error");
	}
	//
	if(!txtVatPercentage || parseFloat(txtVatPercentage)>100) {
		$(".error.vat").css("display", "inline");
		$(".error.vat").html("Please provide valid VAT percentage");
		$("#txtVatPercentage").css("border-color", "#FF0000");
		return false;
	}

	if(priceType=="hour") {
		if(!chkInDate || !chkOutDate || !checkInTime || !checkOutTime) {
			$(".error.checkOut").css("display", "inline");
			$(".error.checkOut").html("Please select check in and check out hours");
			$('[name="checkInTime"]').css("border-color", "#FF0000");
			$('[name="checkOutTime"]').css("border-color", "#FF0000");
			return false;
		}
	}

	if(chkInDate>chkOutDate) {
		$(".error.checkOut").css("display", "inline");
		$(".error.checkOut").html("Please pick valid checkin date and checkout date");
		$('[name="chkInDate"]').css("border-color", "#FF0000");
		$('[name="chkOutDate"]').css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(difference._data.minutes > 0) {
		$(".error.checkOut").css("display", "inline");
		$(".error.checkOut").html(`Please select complete hours. There is ${difference._data.minutes} minutes difference`);
		$('[name="checkInDate"]').css("border-color", "#FF0000");
		$('[name="checkOutDate"]').css("border-color", "#FF0000");
		$('[name="checkInTime"]').css("border-color", "#FF0000");
		$('[name="checkOutTime"]').css("border-color", "#FF0000");
		return false;
	} else {clearErrors()}

	if(discount>(txtAllocQty*txtPrice)) {
		$(".error.discount").css("display", "inline");
		$(".error.discount").html("Discount must equal or less then "+(txtAllocQty*txtPrice));
		$('[name="txtDisc"]').css("border-color", "#FF0000");
		return false;
	}
	//
	$("#btnAdd").attr("disabled", true);
	$("#btnAdd").html("wait...");
	$("div.suggest.one").css("display", "none");

	$.post("./includes/reception.php?action=updateExist&dest=editReservationDate&updatedBy="+myUser, {
		checkDetID:checkDetID,
		checkInID:checkInID,
		guestID:guestID,
		chkInDate:chkInDate,
		chkOutDate:chkOutDate,
		priceType:priceType,
		checkInTime:checkInTime,
		checkOutTime:checkOutTime,
		discount:discount,
		txtVatPercentage:txtVatPercentage,
	}, function(data) {

		if(data=="updated") {
			swal({
				title: "Success!",
				text: "You updated invoice commission.",
				icon: "success",
				timer: 1500,
				button: false
			})
				.then(value=> {
				window.location = "./reservation-workplace.php?role="+myRole+"&task=reservation&subtask=showInfo&recID="+checkInID;
			});
		} else {
			swal("Oops!", data, "error");
		}
		$("#btnAdd").attr("disabled", false);
		$("#btnAdd").html("Add");
	});
	return false;
}
//
function editReservationVat(checkInID) {
	swal({
		title: "Edit reservation vat (%)",
		text: 'Please provide vat as percentage(%)',
		content: "input",
		buttons: ["Cancel","Save"]
	})
	.then(vatPercentage=> {
		if (vatPercentage) {
			if(vatPercentage<=100 && vatPercentage>=0)
			$.post("./includes/reception.php?action=updateExist&dest=editReservationVat&updatedBy="+myUser, {checkInID:checkInID, vatPercentage:vatPercentage }, function(data) {

				if(data=="updated") {
					swal({
						title: "Success!",
						text: "You successfully updated vat.",
						icon: "success",
						timer: 1500,
						button: false
					});
					location.reload();

				} else {
					swal("Oops!", data, "error");
				}
			});
		}
	});
	return false;
}
//
function loadRsrvtion(pageLimit, perPage, period,myWhouse,myUser,myRole) {
	$("#dataTable #loading").css("display", "inline");
	var dataString = 'pageLimit='+ pageLimit+'&perPage='+ perPage+'&period='+ period+'&myWhouse='+myWhouse;
	$.ajax({
		type: "POST",
		url: "./includes/reception.php?action=loadTable&dest=allCheckIn&myRole="+myRole+"&myUser="+myUser,
		data: dataString,
		dataType: 'json',
		cache: false,
		timeout: 2000,
		success: function(result){
			$("#dataTable #loading").css("display", "none");
			$("#foundNum #count").html(result['numRecords']);
			$(".load_more_link").addClass('noneLink');
			$("#dataTable").append(result['records']);
		}
	});
	return false;
}
function check_searchBox() {
	$("input#srchCheckIn").keyup(function() {
		var passedValue = $("input#srchCheckIn").val();
		if(passedValue.val!="") {
			$("div.suggest").css("display", "table-row");
			$.post("./includes/reception.php?action=searchRec&dest=srchCheckIn", { passedValue: passedValue, myUser: myUser, myRole: myRole}, function(data) {
				$("div.suggest").html(data);
			});
		}
	});
	//
	$("input#srchCheckIn").blur(function() {
		if($("#srchCheckIn").val()=="") {
			$("div.suggest").css("display", "none");
		}
	});
	//
	$("input#srchGnrtBill").keyup(function() {
		var passedValue = $("input#srchGnrtBill").val();
		if(passedValue.val!="") {
			$("div.suggest").css("display", "table-row");
			$.post("./includes/reception.php?action=searchRec&dest=srchGnrtBill", { passedValue: passedValue, myUser: myUser, myRole: myRole}, function(data) {
				$("div.suggest").html(data);
			});
		}
	});
	//
	$("input#srchRecpt").keyup(function() {
		var passedValue = $("input#srchRecpt").val();
		if(passedValue.val!="") {
			$("div.suggest").css("display", "table-row");
			$.post("./includes/reception.php?action=searchRec&dest=srchRecpt", { passedValue: passedValue, myRole: myRole, myWhouse:myWhouse}, function(data) {
				$("div.suggest").html(data);
			});
		}
	});
	//
	$("input#srchClient").keyup(function() {
		var passedValue = $("input#srchClient").val();
		if(passedValue.val!="") {
			$("div.suggest").css("display", "table-row");
			$.post("./includes/reception.php?action=searchRec&dest=srchClient", { passedValue: passedValue }, function(data) {
				$("div.suggest").html(data);
			});
		}
	});
	//
	$("input#srchExtrOrdr").keyup(function() {
		var passedValue = $("input#srchExtrOrdr").val();
		if(passedValue.val!="") {
			$("div.suggest").css("display", "table-row");
			$.post("./includes/reception.php?action=searchRec&dest=srchExtrOrdr", { passedValue: passedValue, myUser: myUser, myRole: myRole}, function(data) {
				$("div.suggest").html(data);
			});
		}
	});
}
function catchCheckIn(recID) {
	$.post("./includes/reception.php?action=get_recInfo&dest=getCheckIn", { recID: recID, myUser: myUser, myRole: myRole,}, function(data) {
		$("div#foundNum").html('<label id="count">1</label> record has been selected.<span id="refresh"></span>');
		$("div#dataTable").html(data);
	});
	$("div.suggest").css("display", "none");
}
function cancelBooking(checkDetID, checkInID, total, checkDates,checkIn,checkOut){
	swal({
		title: "Are you sure to cancel?",
		text: "You going to cancel this reservation completely!",
		icon: "warning",
		dangerMode:true,
		buttons:["Cancel","'Yes, Cancel Now!"],
		closeOnConfirm: false
	})
	.then(willDelete=> {
		if(willDelete) {
		if(checkDates=='date-difference') {
			swal({
				title: "Date Difference Issue",
				text: "CheckIn date ("+checkIn+") \nand checkOut date ("+checkOut+") is not same",
				icon: "warning",
				dangerMode:true,
				buttons:["Cancel","'Yes, Cancel it!"],
				closeOnConfirm: false
			})
			.then(willDelete=> {
				if(willDelete) {
					$.post("./includes/reception.php?action=deleteRec&dest=cancelBooking", { checkDetID:checkDetID, checkInID:checkInID, total:total, myUser:myUser }, function(data) {
						if(data=="cancelled") {
							swal({
								title: "Success!",
								text: "Selected reservation record has been cancelled.",
								icon: "success",
								timer: 1500,
								button: false
							})
								.then(value=> {
									location.reload();
								}
							);
						} else {
							swal("Oops", data, "error");
						}
					});
				}
			});
		} else {
			$.post("./includes/reception.php?action=deleteRec&dest=cancelBooking", { checkDetID:checkDetID, checkInID:checkInID, total:total, myUser:myUser }, function(data) {
			if(data=="cancelled") {
				swal({
					title: "Success!",
					text: "Selected reservation record has been cancelled.",
					icon: "success",
					timer: 1500,
					button: false
				})
					.then(value=> {
						location.reload();
					}
				);
			} else {
				swal("Oops", data, "error");
			}
		});
		}
	}

	});
	return false;
}



/*-------------------------------------------------------
--------------------------Checkout-----------------------
-------------------------------------------------------*/
function simplfyGnrteBill() {
	$("#slcBillType").change(function() {
	$("#txtGuest").val('');
	$("#reference").val('');
	$("#ttlAccFee").val('');
	$("#clientID").val('');
	$("p#pCName").html('N/A');
	$("p#pProperty").html('N/A');
	$("p#pCheckIns").html('N/A');
	$("p#pPeriod").html('N/A');
	$("p#pAccFee").html('N/A');
	$("p#pTtlAccFee").html('N/A');
	$("p#pTtlBar").html('N/A');
	$("p#pTtlExtra").html('N/A');
	$("p#pComm").html('N/A');
	$("p#pTvat").html('N/A');
	$("p#pTtlDiscount").html('N/A');
	$("p#pTtlDeposit").html('N/A');
	$("p#pTtlBlnce").html('N/A');
	$("div.displayInfo").css("display", "inline");
	$("div.suggest").css("display", "none");
	});
	//
	$("input#txtGuest").keyup(function(){
		var txtGuest	 = $("#txtGuest").val();
		var billType 	= $("#slcBillType").val();
		if(txtGuest!="") {
			$("div.suggest").css("display", "table-row");
			$.post("./includes/reception.php?action=searchRec&dest=searchBill",{ passedValue:txtGuest, billType:billType }, function(data) {
				$("div.suggest").html(data);
			});
		} else { $("div.suggest").css("display", "none"); }
		clearErrors();
	});
}
function catchgGnrateBill(reference, clientID, clientName, clientPhone, totalDue, allocDetails, checkInPlsOut, quantityTxt, accFeeAmntTxt, ttlAccFee, ttlBarAmnt, ttlExtraAmnt, ttlDiscount,myBalance,vatvalue,commBalance,totalDue2) {
	$("#reference").val(reference);
	$("#ttlAccFee").val(parseFloat(ttlAccFee+commBalance));
	$("#clientID").val(clientID);
	$("#txtGuest").val(clientName);
	$("p#pCName").html(clientName+', '+clientPhone);
	$("p#pProperty").html(allocDetails);
	$("p#pCheckIns").html(checkInPlsOut);
	$("p#pPeriod").html(quantityTxt);
	$("p#pAccFee").html(accFeeAmntTxt);
	$("p#pTtlAccFee").html('$'+ttlAccFee);
	$("p#pTtlBar").html('$'+ttlBarAmnt);
	$("p#pTtlExtra").html('$'+ttlExtraAmnt);
	if(commBalance) $("p#pComm").html('$'+commBalance);
	else $("p#pComm").html('0');
	if(vatvalue) $("p#pTvat").html('$'+vatvalue);
	else $("p#pTvat").html('0');
	$("p#pTtlDiscount").html('$'+ttlDiscount);
	$("p#pTtlDeposit").html('<strong>$'+myBalance+'</strong>');
	//
	var custBalance = (parseFloat(myBalance)-parseFloat(totalDue2));
	var netBalance = (parseFloat(totalDue2)-parseFloat(myBalance)).toFixed(2);
	//
	$("p#pTtlAmount").html('<strong>$'+totalDue+'</strong>');
	if(custBalance>=0){$("p#pTtlBlnce").html('<strong>$'+custBalance+'</strong>');$("p.balance span").html('Customer Balance');}
	else{$("p#pTtlBlnce").html('$'+netBalance);}
	$("div.displayInfo").css("display", "inline");
	$("div.suggest").css("display", "none");
}
function check_gnrateBill() {
	var billType	= $("#slcBillType").val();
	var clientID	= $("#clientID").val();
	var reference	= $("#reference").val();
	var ttlAccFee	= $("#ttlAccFee").val();

  	if(reference.length < 1 || txtGuest.length < 1) {
		$("#error1").css("display", "inline");
		$("#error1").html("Please select customer name to pay");
		$("#txtGuest").removeClass("no-left");
		$("#txtGuest").css("border-color", "#FF0000");
		$("div.suggest").css("display", "none");
		return false;
   	} else { clearErrors(); }

	swal({
		title: "Are you sure?",
		text: "You going to generate invoice bill!",
		icon: "warning",
		dangerMode:true,
		buttons:["Cancel","'Yes, generate it!"],
		closeOnConfirm: false
	}).then(willDelete=> {
		if(willDelete) {
			$("label.process").css("display", "inline");
			$("#btnSave").prop("disabled", true);
			$("#btnSave").html("Wait...");
			$.post("./includes/reception.php?action=saveNew&dest=addGnrteBill&addedBy="+myUser, { billType:billType, reference:reference, clientID:clientID, ttlAccFee:ttlAccFee}, function(data) {
			var addedpos = data.search("added");
			$("label.process").css("display", "none");
			if(addedpos==0) {
				swal({
					title: "Success!",
					text: "You successfully generated invoice bill",
					icon: "success",
					timer: 1500,
					button: false
				}).then(value=> {
					window.location = "./reservation-workplace.php?role="+myRole+"&task=checkout\
					&subtask=showInfo&billType="+billType+"&reference="+reference;
				});
			} else if (data=="exist") {
				swal({
					title: "Oops!!",
					text: "already generated",
					icon: "error",
					button: true
				})
				.then(value=> {
					location.reload();
				})
			} else {
				swal("Oops!", data, "error");
			}
			$("#btnSave").prop("disabled", false);
			$("#btnSave").html("Generate Bill");
			});
		}
	});
	return false;
}
function loadGnrteBill(pageLimit, perPage, period) {
	$("#dataTable #loading").css("display", "inline");
	var dataString = 'pageLimit='+pageLimit+'&perPage='+perPage;
	$.ajax({
		type: "POST",
		url: "./includes/reception.php?action=loadTable&dest=allGnrteBill&myRole="+myRole,
		data: dataString,
		dataType: 'json',
		cache: false,
		timeout: 2000,
		success: function(result){
			$("#dataTable #loading").css("display", "none");
			$("#foundNum #count").html(result['numRecords']);
			$(".load_more_link").addClass('noneLink');
			$(".table-data").html(result['records']);

		}
	});
	return false;
}
function check_addGuest2Rsrve() {
	clearErrors();
	var clientName 		= $('[name="clientName"]').val();
	var clientID 		= $('[name="clientID"]').val();
    var clientPhone 	= $('[name="clientPhone"]').val();
    var slcResType 		= $('[name="slcResType"]').val();
    var checkInDate 	= $('[name="checkInDate"]').val();
    var checkInTime 	= $('[name="checkInTime"]').val();
    var checkOutDate 	= $('[name="checkOutDate"]').val();
    var checkOutTime 	= $('[name="checkOutTime"]').val();
    var allocName 		= $('[name="allocName"]').val();
    var allocID 		= $('[name="allocID"]').val();
     var allocDays 		= $('[name="allocDays"]').val();
    var txtDiscount 	= $('[name="txtDiscount"]').val();
    var totalPrice 		= $('[name="totalPrice"]').val();
    //
    //

    if(!clientName) {
		$(".error.clientName").css("display", "inline");
		$(".error.clientName").html("Please select customer");
		$('[name="clientName"]').css("border-color", "#FF0000");
		return false;
	}
	if(!clientPhone) {
		$(".error.clientPhone").css("display", "inline");
		$(".error.clientPhone").html("Customer phone is missing");
		$('[name="clientPhone"]').css("border-color", "#FF0000");
		return false;
	}
	if(!checkInDate || !checkOutDate) {
		$(".error.checkOut").css("display", "inline");
		$(".error.checkOut").html("Please select check in and check out");
		$('[name="checkInDate"]').css("border-color", "#FF0000");
		$('[name="checkOutDate"]').css("border-color", "#FF0000");
		return false;
	}
	if(slcResType=="hour") {
		if(!checkInDate || !checkOutDate) {
			$(".error.checkOut").css("display", "inline");
			$(".error.checkOut").html("Please select check in and check out hours");
			$('[name="checkInTime"]').css("border-color", "#FF0000");
			$('[name="checkOutTime"]').css("border-color", "#FF0000");
			return false;
		}
	}
	//
	if(!allocName || !allocID) {
		$(".error.allocName").css("display", "inline");
		$(".error.allocName").html("Select allocation");
		$('[name="allocName"]').css("border-color", "#FF0000");
		return false;
	}
	//
	if(parseFloat(totalPrice)<0) {
		$(".error.discount").css("display", "inline");
		$(".error.discount").html("Discount must equal or less then "+totalPrice);
		$('[name="txtDiscount"]').css("border-color", "#FF0000");
		return false;
	}
	//
	if(parseFloat(allocDays)==0) {
		$(".error.allocName").css("display", "inline");
		$(".error.allocName").html("Please provide valid reservation");
		$('[name="allocName"]').css("border-color", "#FF0000");
		$('[name="allocDays"]').css("border-color", "#FF0000");
		return false;
	}
}
function activeBooking(checkDetID){
	swal({
		title: "Are you sure?",
		text: "You going to make this reservation confirmed!",
		icon: "warning",
		dangerMode:true,
		buttons:["Cancel","'Yes, Confirm Now!"],
		closeOnConfirm: false
	})
	.then(willDelete=> {
		if(willDelete) {
			$.post("./includes/reception.php?action=updateExist&dest=activeBooking&updatedBy="+myUser, { checkDetID:checkDetID, myUser:myUser }, function(data) {
				if(data=="updated") {
					swal({
						title: "Success!",
						text: "Selected reservation record has been confirmed.",
						icon: "success",
						timer: 1500,
						button: false
					});
					location.reload();
				} else {
					swal("Oops", data, "error");
				}
			});
		}
	});
	return false;
}
function closeGenerate(gnrateID){
	swal({
		title: "Are you sure to cancel this bill?",
		text: "You are going to cancel this bill!",
		icon: "warning",
		dangerMode:true,
		buttons:["Cancel","'Yes, remove it!"],
		closeOnConfirm: false
	})
	.then(willDelete=> {
		if(willDelete) {
			$.post("./includes/reception.php?action=updateExist&dest=closeGenerate&updatedBy="+myUser,{ gnrateID:gnrateID }, function(data){
				if(data=="updated") {
					swal({
						title: "Success",
						text: "Bill generate cancelled successfully",
						icon: "success",
						timer: 1500,
						button: false
					})
						.then(value=> {
							location.reload();
						}
					);
				} else {
					swal("Oops!", data, "error");
				}
			});
		}
	});
	return false;
}



/*-------------------------------------------------------
------------------------Cashier--------------------------
-------------------------------------------------------*/

function loadRecpts(pageLimit, perPage, period) {
	$("#dataTable div#loading").css("display", "inline");
	var dataString = 'pageLimit='+ pageLimit+'&period='+ period+'&perPage='+ perPage;
	$.ajax({
		type: "POST",
		url: "./includes/reception.php?action=loadTable&dest=allRecpts&myRole="+myRole+"&myWhouse="+myWhouse,
		data: dataString,
		dataType: 'json',
		cache: false,
		timeout: 2000,
		success: function(result){
			$("#dataTable #loading").css("display", "none");
			$("#foundNum #count").html(result['numRecords']);
			$(".load_more_link").addClass('noneLink');
			$("#dataTable").append(result['records']);
		}
	});
	return false;
}
function simplifyCashierAdd() {
	$("#slcPurpose").change(function() {
		$("#txtClient, #invoiceRef, #payeeID, #balance, #txtAmount, #txtInWords, #txtPaidBy").val('');
		$("div.suggest").css("display", "none");
		//$("div.displayInfo").css("display", "none");
	});
	$("input#txtClient").keyup(function(){
		var txtClient 	= $("#txtClient").val();
		var slcPurpose 	= $("#slcPurpose").val();
		if(txtClient!="") {
			$("div.suggest.invoice").css("display", "table-row");
			$.post("./includes/reception.php?action=searchRec&dest=client4rcpt", { passedValue:txtClient, slcPurpose:slcPurpose, myWhouse:myWhouse, myUser:myUser}, function(data) {
				$("div.suggest").html(data);
			});
		} else { $("div.suggest").css("display", "none"); }
		clearErrors();
	});
	//
	$("#txtAmount").keyup(function() {
		inWords($("#txtAmount").val());
		var txtDueAmount	= $("#txtDueAmount").val();
		var txtAmount	= $("#txtAmount").val();
		if(parseFloat(txtAmount)>parseFloat( txtDueAmount)){
			$("#txtAmount").val(txtDueAmount);
			inWords(txtAmount);
		}

	});
	//
	$.post("./includes/reception.php?action=searchRec&dest=myBankAccs", { bankID: 101, myWhouse:myWhouse }, function(data) {
		$("#slcBankAcc").html(data);
	});
	//
	$("#slcBankID").change(function() {
		var bankID = $("#slcBankID").val();
		if(bankID=="") {
			$("#slcBankAcc").html('');
		} else {
			$.post("./includes/reception.php?action=searchRec&dest=myBankAccs", { bankID: bankID, myWhouse:myWhouse }, function(data) {
				$("#slcBankAcc").html(data);
			});
		}
	});
	//
	$("#txtRemarks").keyup(function(){
		return tweetFeed(this, 500);
	});



	// New method for searching the client and then searching his info afterwards by Abdullahi

	$("#txtSearchClient").on('keyup', function() {
	    let value = $("#txtSearchClient").val();
	    let slcPurpose = $("#slcPurpose").val();
	    $("div.suggest.invoice").css("display", "none");
	    $("div.suggest.client").css("display", "table-row");
	    $.post("./includes/reception.php?action=searchRec&dest=getOnlyClient", { passedValue:value, slcPurpose:slcPurpose, myWhouse:myWhouse, myUser:myUser}, function(data) {
	        $("div.suggest").html(data);
	    });
	});

}
//New method for searching the client and then searching his info afterwards by Abdullahi
function showSugges(clientID) {
    slcPurpose = 'reception';
    $("div.suggest.client").css("display", "none");
    $("div.suggest.invoice").css("display", "table-row");
    $.post("./includes/reception.php?action=searchRec&dest=client4rcpt", { passedValue:clientID, slcPurpose:slcPurpose, myWhouse:myWhouse, myUser:myUser}, function(data) {
        $("div.suggest").html(data);
    });
}
function catchClient4Rcpt(gnrateID, payeeID, payeeName, payeePhone, totalDue, balance) {
	$("#invoiceRef").val(gnrateID);
	$("#payeeID").val(payeeID);
	$("#txtClient").val(payeeName);
	$("#txtSearchClient").val(payeeName);
	$("#txtPhone").val(payeePhone);
	$("#txtTotalDue").val(totalDue);
	$("#txtAmount, #txtDueAmount").val(balance);
	inWords($("#txtAmount").val());
	$("div.suggest").css("display", "none");
}
function check_addCashier() {
	var slcPurpose	= $("#slcPurpose").val();
	var invoiceRef	= $("#invoiceRef").val();
	var payeeID		= $("#payeeID").val();
	var balance		= parseFloat($("#balance").val());

	var txtAmount	= $("#txtAmount").val();
	var txtInWords	= $("#txtInWords").val();

	var slcBankID	= $("#slcBankID").val();
	var slcBankAcc	= $("#slcBankAcc").val();
	var txtCheque	= $("#txtCheque").val();

	var txtRemarks	= $("#txtRemarks").val();
	var transDate	= $("#transDate").val();

	if(payeeID.length < 1 || invoiceRef.length < 1 || txtClient.length < 1) {
		$("#error1").css("display", "inline");
		$("#error1").html("Please find payee person");
		$("#txtClient").css("border-color", "#FF0000");
		$("div.suggest").css("display", "none");
		return false;
	} else { clearErrors(); }

	if(txtAmount.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Amount value is missing");
		$("#txtAmount").css("border-color", "#FF0000");
		return false;
	} else if(Number(txtAmount) <= 0) {
		$("#error2").css("display", "inline");
		$("#error2").html("Amount must be greater than 0");
		$("#txtAmount").css("border-color", "#FF0000");
		return false;
	} else if(parseFloat(txtAmount) > parseFloat(balance)) {
		$("#error2").css("display", "inline");
		$("#error2").html("Amount can't be greater than $"+balance);
		$("#txtAmount").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(slcBankID.length < 1) {
		$("#error3").css("display", "inline");
		$("#error3").html("Please select bank");
		$("#slcBankID").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(slcBankAcc=="---" || slcBankAcc.length < 1) {
		$("#error3").css("display", "inline");
		$("#error3").html("Select bank account");
		$("#slcBankAcc").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	$("label.process").css("display", "inline");
	$("#btnSave").attr("disabled", true);
	$("#btnSave").html("Wait...");

	$.post("./includes/reception.php?action=saveNew&dest=addCashier&addedBy="+myUser, { myWhouse:myWhouse, slcPurpose:slcPurpose, invoiceRef:invoiceRef, payeeID:payeeID, txtAmount:txtAmount, txtInWords:txtInWords, slcBankID:slcBankID, slcBankAcc:slcBankAcc, txtCheque:txtCheque, txtRemarks:txtRemarks, transDate:transDate, balance:balance }, function(data) {

		$("label.process").css("display", "none");
		if(data=='cashier-receipt') {
			swal({
				title: "Success!",
				text: "You added receipt record successfully.",
				icon: "success",
				timer: 1500,
				button: false
			})
				.then(value=> {
					window.location = "./reservation-workplace.php?role="+myRole+"&task=cashier";
				}
			);
		} else if (data=="exist") {
			swal({
				title: "Oops!!",
				text: "something went wrong, plase try again",
				icon: "error",
				button: true
			})
			.then(value=> {
				location.reload();
			})
		} else {
			swal("Oops!", data, "error");
		}
		$("#btnSave").attr("disabled", false);
		$("#btnSave").html("Save");
	});
	return false;
}



/*-------------------------------------------------------
------------------------Customers------------------------
-------------------------------------------------------*/
function loadClients(pageLimit, perPage) {
	$("#dataTable div#loading").css("display", "inline");
	var dataString = 'pageLimit='+pageLimit+'&perPage='+perPage;
	$.ajax({
		type: "POST",
		url: "./includes/reception.php?action=loadTable&dest=allClients&myRole="+myRole+"&myUser="+myUser,
		data: dataString,
		dataType: 'json',
		cache: false,
		timeout: 2000,
		success: function(result){
			$("#dataTable #loading").css("display", "none");
			$("#foundNum #count").html(result['numRecords']);
			$(".load_more_link").addClass('noneLink');
			$("#dataTable").append(result['records']);
		}
	});
	return false;
}
function check_addClient() {
	var fullname	= $("#txtName").val();
	var gender		= $("#slcGender").val();
	var natnlity	= $("#slcNatlity").val();

	var phone		= $("#txtPhone").val();
	var qrCode		= $("#txtQrCode").val();
	var email		= $("#txtEmail").val();
	var address		= $("#txtAddress").val();
	var slcStatus	= $("#slcStatus").val();

	var facebook	= $("#txtFacebook").val();
	var twitter		= $("#txtTwitter").val();

	if(fullname.length < 1) {
		$("#error1").css("display", "inline");
		$("#error1").html("Please type full name");
		$("#txtName").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(phone.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Don't forget phone number");
		$("#txtPhone").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(email.length > 0) {
		if(!email.match(emailExp)) {
			$("#error3").css("display", "inline");
			$("#error3").html("invalid email address");
			$("#txtEmail").css("border-color", "#FF0000");
			return false;
		}
	} else { clearErrors(); }

	$("#btnSave").attr("disabled", true);
	$("#btnSave").html("wait...");
	$("label.process").css("display", "inline");

	$.post("./includes/reception.php?action=saveNew&dest=addCustomer&addedBy="+myUser, { fullname:fullname, gender:gender, natnlity:natnlity, phone:phone, qrCode:qrCode, email:email, address:address, facebook:facebook, twitter:twitter, slcStatus:slcStatus },function(data){
		var addedpos = data.search("added");
		$("label.process").css("display", "none");
		if(addedpos==0) {
			var lastID = data.slice(6,21);
			swal({
				title: "Success!",
				text: "You registered new profile book successfully.",
				icon: "success",
				timer: 1500,
				button: false
			})
				.then(value=> {
					window.location = "./reservation-workplace.php?role="+myRole+"&task=customerMgt&subtask=showInfo&recID="+lastID;
				}
			);
		} else {
			swal("Oops!", data, "error");
		}
		$("#btnSave").attr("disabled", false);
		$("#btnSave").html("Save");
	});
	return false;
}
function check_editClient() {
	var clientID	= $("#clientID").val();
	var fullname	= $("#txtName").val();
	var gender		= $("#slcGender").val();
	var natnlity	= $("#slcNatlity").val();

	var phone		= $("#txtPhone").val();
	var email		= $("#txtEmail").val();
	var address		= $("#txtAddress").val();

	var facebook	= $("#txtFacebook").val();
	var twitter		= $("#txtTwitter").val();
	var bookedFor	= $("#bookedFor").val();
	var status		= $("#slcStatus").val();

	if(fullname.length < 1) {
		$("#error1").css("display", "inline");
		$("#error1").html("Please type full name");
		$("#txtName").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(phone.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Don't forget phone number");
		$("#txtPhone").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(email.length > 0) {
		if(!email.match(emailExp)) {
			$("#error3").css("display", "inline");
			$("#error3").html("invalid email address");
			$("#txtEmail").css("border-color", "#FF0000");
			return false;
		}
	} else { clearErrors(); }

	$("#btnUpdate").attr("disabled", true);
	$("#btnUpdate").html("wait...");
	$("label.process").css("display", "inline");

	$.post("./includes/reception.php?action=updateExist&dest=editClient&updatedBy="+myUser, { clientID:clientID, fullname:fullname, gender:gender, natnlity:natnlity, phone:phone, email:email, address:address, facebook:facebook, twitter:twitter, status:status, bookedFor:bookedFor },function(data){
		$("label.process").css("display", "none");
		if(data=="updated") {
			swal({
				title: "Success!",
				text: "You updated profile book successfully.",
				icon: "success",
				timer: 1500,
				button: false
			})
				.then(value=> {
					window.location = "./reservation-workplace.php?role="+myRole+"&task=customerMgt&subtask=showInfo&recID="+clientID;
				}
			);
		} else {
			swal("Oops!", data, "error");
		}
		$("#btnUpdate").attr("disabled", false);
		$("#btnUpdate").html("Update");
	});
	return false;
}
//
function check_addCustomerDeposit() {
	var clientID	= $("#clientID").val();
	var checkInID   = $("#checkInID").val();
	var txtCustName		= $("#txtCustName").val();
	var txtAmount	= $("#txtAmount").val();
	var slcBankID	= $("#slcBankID").val();
	var slcBankAcc	= $("#slcBankAcc").val();

	var txtInWords		= $("#txtInWords").val();
	var transDate		= $("#transDate").val();

	if(clientID.length < 1 || txtCustName.length < 1) {
		$("#popuperror21").css("display", "inline");
		$("#popuperror21").html("Please select customer");
		$("#txtCustName").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(txtAmount.length < 1) {
		$("#popuperror22").css("display", "inline");
		$("#popuperror22").html("Please provide deposit amount ");
		$("#txtAmount").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }
	//
	if(slcBankID=="" || slcBankID=="---" || slcBankID.length < 1) {
		$("#popuperror23").css("display", "inline");
		$("#popuperror23").html("Please select bank");
		$("#slcBankID").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(slcBankAcc=="" || slcBankAcc=="---" || slcBankAcc.length < 1) {
		$("#popuperror24").css("display", "inline");
		$("#popuperror24").html("Select bank account");
		$("#slcBankAcc").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	$("#btnSave").attr("disabled", true);
	$("#btnSave").html("wait...");
	$("label.process").css("display", "inline");

	$.post("./includes/reception.php?action=saveNew&dest=addCustomerDeposit&addedBy="+myUser, { clientID:clientID, checkInID:checkInID, txtAmount:txtAmount, slcBankID:slcBankID, slcBankAcc:slcBankAcc, transDate:transDate },function(data){
		var addedpos = data.search("added");
		$("label.process").css("display", "none");
		if(addedpos==0) {
			var lastID = data.slice(6,21);
			swal({
				title: "Success!",
				text: "You added new deposit successfully.",
				icon: "success",
				timer: 1500,
				button: false
			})
				.then(value=> {
					location.reload();
				}
			);
		} else {
			swal("Oops!", data, "error");
		}
		$("#btnSave").attr("disabled", false);
		$("#btnSave").html("Save");
	});
	return false;
}
//
function check_refundCustomerDeposit() {
	var clientID		= $("#clientID4deposit").val();
	var checkInID       = $("#checkInID4deposit").val();
	var txtCustName		= $("#txtCustName4deposit").val();
	var txtAmount		= $("#txtAmount4deposit").val();
	var transDate		= $("#transDate4deposit").val();
	var slcBankID		= $("#slcBankID4deposit").val();
	var slcBankAcc		= $("#slcBankAcc4deposit").val();
	var depositBalance		= $("#depositBalance").val();

	if(clientID.length < 1 || txtCustName.length < 1) {
		$("#popuperror31").css("display", "inline");
		$("#popuperror31").html("Please select customer");
		$("#txtCustName4deposit").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(txtAmount.length < 1) {
		$("#popuperror32").css("display", "inline");
		$("#popuperror32").html("Please provide deposit amount ");
		$("#txtAmount4deposit").css("border-color", "#FF0000");
		return false;
	} else if(parseFloat(txtAmount)>parseFloat(depositBalance)) {
		$("#popuperror32").css("display", "inline");
		$("#popuperror32").html("deposit balance "+depositBalance);
		$("#txtAmount4deposit").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }
	//
	if(slcBankID=="" || slcBankID=="---" || slcBankID.length < 1) {
		$("#popuperror33").css("display", "inline");
		$("#popuperror33").html("Please select bank");
		$("#slcBankID4deposit").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(slcBankAcc=="" || slcBankAcc=="---" || slcBankAcc.length < 1) {
		$("#popuperror34").css("display", "inline");
		$("#popuperror34").html("Select bank account");
		$("#slcBankAcc4deposit").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	$("#btnSave").attr("disabled", true);
	$("#btnSave").html("wait...");
	$("label.process").css("display", "inline");

	$.post("./includes/reception.php?action=saveNew&dest=refundCustomerDeposit&addedBy="+myUser, { clientID:clientID, checkInID:checkInID, txtAmount:txtAmount, slcBankID:slcBankID, slcBankAcc:slcBankAcc, transDate:transDate },function(data){
		var addedpos = data.search("added");
		$("label.process").css("display", "none");
		if(addedpos==0) {
			var lastID = data.slice(6,21);
			swal({
				title: "Success!",
				text: "You added new deposit successfully.",
				icon: "success",
				timer: 1500,
				button: false
			})
				.then(value=> {
					location.reload();
				}
			);
		} else {
			swal("Oops!", data, "error");
		}
		$("#btnSave").attr("disabled", false);
		$("#btnSave").html("Save");
	});
	return false;
}

function removeClientDeposit(recID,clientID,depositAmount){
	swal({
		title: "Are you sure to delete?",
		text: "You going to delete this record!",
		icon: "warning",
		dangerMode:true,
		buttons:["Cancel","'Yes, remove it!"],
		closeOnConfirm: false
	})
	.then(willDelete=> {
		if(willDelete) {
			$.post("./includes/reception.php?action=deleteRec&dest=delClientDeposit", { recID:recID,clientID:clientID,depositAmount:depositAmount}, function(data) {
				if(data=="deleted") {
					swal({
						title: "Success!",
						text: "Selected record has been deleted.",
						type: "success",
						timer: 1500,
						showConfirmButton: false
					},
						function () {
							location.reload();
						}
					);
				} else {
					swal("Oops", data, "error");
				}
			});
		}
	});
	return false;
}

/*-------------------------------------------------------
------------------------Services-------------------------
-------------------------------------------------------*/
function loadExtraOrdr(pageLimit, perPage, period) {
	$("#dataTable div#loading").css("display", "inline");
	var dataString = 'pageLimit='+pageLimit+'&period='+period+'&perPage='+perPage+'&myWhouse='+myWhouse;
	$.ajax({
		type: "POST",
		url: "./includes/reception.php?action=loadTable&dest=allExtraOrdr&myRole="+myRole+"&myUser="+myUser,
		data: dataString,
		dataType: 'json',
		cache: false,
		timeout: 2000,
		success: function(result){
			$("#dataTable #loading").css("display", "none");
			$("#foundNum #count").html(result['numRecords']);
			$(".load_more_link").addClass('noneLink');
			$("#dataTable").append(result['records']);
		}
	});
	return false;
}
function simplyExraOrder() {
	$('fieldset.outside').css('display','none');
	$('[name="ordrFrom"]').change(function(){
		var ordrFrom = $('[name="ordrFrom"]').val();
		if(ordrFrom=='inside'){
			$('fieldset.outside').css('display','none');
			$('fieldset.inside').css('display','inline');
		} else {
			$('fieldset.inside').css('display','none');
			$('fieldset.outside').css('display','inline');
		}
	});
	//
	$('[name="prpType"]').change(function() {
		var prpType = $("#prpType").val();
		$.post("./includes/reception.php?action=searchRec&dest=pickProperty4Service", { prpType: prpType }, function(data) {
			$('[name="slcAlloc"]').html(data);
		});
	});
	//
	$('[name="clientName"]').keyup(function() {
		$('[name="clientID"], [name="clientBalance"]').val('');
		$(".suggest.customer").css('display', 'none');
		$(".suggest.customer").html('');
		$(".suggest.customer").addClass('loading');
	    var chkClient 		= $('[name="chkClient"]').prop('checked');
	    var clientName 		= $('[name="clientName"]').val();
	    if(!chkClient && clientName) {
	    	$('[name="clientPhone"]').val('');
	    	$(".suggest.customer").css('display', 'table-row');
	    	$.ajax({
				type: "POST",
				url: "./includes/reception.php?action=searchRec&dest=pickClient4Service",
				data: 'passedValue='+clientName,
				cache: false,
				timeout: 2000,
				success: function(result) {
					$(".suggest.customer").removeClass('loading');
					$(".suggest.customer").html(result);
				},
			});
	    }
	});
	$('[name="slcExtra"]').change(function() {
		var slcExtra 	= $('[name="slcExtra"]').val();
		if(slcExtra!="---") {
			$.post("./includes/reception.php?action=searchRec&dest=getExtraCost", { slcExtra: slcExtra }, function(data) {
				$("input#txtCostPrice").val(data);
				$("input#txtQnty").val(1);
				$("input#txtUnitQnty").val(1);
				$("input#subTotal").val(data);
				$("input#total").val(data);
			});
		} else {
			$("input#txtCostPrice").val('');
		}
		$("#discount").val(0);
		clearErrors();
	});
	//
	$("input#txtQnty").keyup("keyup change", function(e) {
		var txtUnitQnty	= parseFloat($("#txtUnitQnty").val());
		var quantity	= parseFloat($("#txtQnty").val());
		var costPrice	= parseFloat($("#txtCostPrice").val());
		var discount 	= parseFloat($("#discount").val());
		//
		if(!txtUnitQnty) txtUnitQnty = 1;
		if(!quantity) quantity = 0;
		if(!costPrice) costPrice = 0;
		if(!discount) discount = 0;
		//
		var ttlQty 		= parseFloat(txtUnitQnty*quantity);
		//
		if(quantity > 0 && costPrice > 0) {
			var subTotal = (ttlQty*costPrice);
			if(discount != 0 || discount != "") {
				if(discount>subTotal) {
					$("input#discount").val(0);
				}
				var total = (subTotal-discount);
			} else {
				var total = subTotal;
			}
			$("input#subTotal").val(subTotal);
			$("input#total").val(total);
		} else {
			$("input#subTotal, input#total").val(0);
		}
		clearErrors();
	});
	//
	$("input#txtUnitQnty").keyup("keyup change", function(e) {
		var txtUnitQnty	= parseFloat($("#txtUnitQnty").val());
		var quantity	= parseFloat($("#txtQnty").val());
		var costPrice	= parseFloat($("#txtCostPrice").val());
		var discount 	= parseFloat($("#discount").val());
		//
		if(!txtUnitQnty) txtUnitQnty = 1;
		if(!quantity) quantity = 0;
		if(!costPrice) costPrice = 0;
		if(!discount) discount = 0;
		var ttlQty 		= parseFloat(txtUnitQnty*quantity);
		//
		if(quantity > 0 && costPrice > 0) {
			var subTotal = (ttlQty*costPrice);
			if(discount != 0 || discount != "") {
				if(discount>subTotal) {
					$("input#discount").val(0);
				}
				var total = (subTotal-discount);
			} else {
				var total = subTotal;
			}
			$("input#subTotal").val(subTotal);
			$("input#total").val(total);
		} else {
			$("input#subTotal, input#total").val(0);
		}
		clearErrors();
	});
	//
	$("input#txtCostPrice").keyup("keyup change", function(e) {
		var txtUnitQnty	= parseFloat($("#txtUnitQnty").val());
		var quantity	= parseFloat($("#txtQnty").val());
		var costPrice	= parseFloat($("input#txtCostPrice").val());
		var discount	= parseFloat($("#discount").val());
		//
		if(!txtUnitQnty) txtUnitQnty = 1;
		if(!quantity) quantity = 0;
		if(!costPrice) costPrice = 0;
		if(!discount) discount = 0;
		//
		var ttlQty 		= txtUnitQnty*quantity;
		var subTotal 	= (ttlQty*costPrice);
		//
		$("input#subTotal").val(subTotal);
		$("input#total").val(subTotal-discount);
		clearErrors();
	});
	$("input#discount").keyup("keyup change", function(e) {
		var txtUnitQnty	= parseFloat($("#txtUnitQnty").val());
		var quantity	= parseFloat($("#txtQnty").val());
		var costPrice	= parseFloat($("#txtCostPrice").val());
		var discount	= parseFloat($("#discount").val());
		//
		if(!txtUnitQnty) txtUnitQnty = 1;
		if(!quantity) quantity = 0;
		if(!costPrice) costPrice = 0;
		if(!discount) discount = 0;
		var ttlQty 		= parseFloat(txtUnitQnty*quantity);
		var subTotal 	= (ttlQty*costPrice);
		//
		$("input#subTotal").val(subTotal);
		$("input#total").val(subTotal-discount);
		clearErrors();
	});
	//
	$('[name="clientName"]').keyup(function() {
		$('[name="clientID"], [name="clientBalance"]').val('');
		$(".suggest.customer").css('display', 'none');
		$(".suggest.customer").html('');
		$(".suggest.customer").addClass('loading');
	    var clientName 		= $('[name="clientName"]').val();
	    if(clientName) {
	    	$('[name="clientPhone"]').val('');
	    	$(".suggest.customer").css('display', 'table-row');
	    	$.ajax({
				type: "POST",
				url: "./includes/reception.php?action=searchRec&dest=pickClient4Rsrvtn",
				data: 'passedValue='+clientName,
				cache: false,
				timeout: 2000,
				success: function(result) {
					$(".suggest.customer").removeClass('loading');
					$(".suggest.customer").html(result);
				},
			});
	    }
	});
	//
	/*$('[name="slcExtraMsr"]').change(function() {
		$("input#txtUnitQnty").val(1);
	    var slcAlloc 		= $('[name="slcAlloc"]').val();
	    if(slcAlloc){
	    	$.post("./includes/reception.php?action=searchRec&dest=getUnitQty", { slcAlloc: slcAlloc }, function(data) {
				$("input#txtUnitQnty").val(1);
				var quantity	= parseFloat($("#txtQnty").val());
				var ttlQty 		= data*quantity;
				var costPrice	= parseFloat($("input#txtCostPrice").val());
				var subTotal 	= (ttlQty*costPrice);
				var discount	= parseFloat($("#discount").val());
				$("input#subTotal").val(subTotal);
				$("input#total").val(subTotal-discount);
				clearErrors();
			});
	    } else {
			$("input#txtUnitQnty").val(1);
	    }
	});*/
}
function catchClient(clientID, clientName, phone, balance) {
	$('[name="clientID"]').val(clientID);
	$('[name="clientName"]').val(clientName);
	$("div.suggest.customer").css("display", "none");
}
function addNewService() {
	var txtServiceName = $("#txtServiceName").val();
	var txtServiceCost = $("#txtServiceCost").val();

	if(!txtServiceName) {
		$("#error1").css("display", "inline");
		$("#error1").html("Service name is missing");
		$("#txtServiceName").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(!txtServiceCost) {
		$("#error2").css("display", "inline");
		$("#error2").html("Please provide service cost");
		$("#txtServiceCost").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	$("#btnAdd").attr("disabled", true);
	$("#btnAdd").html("wait...");

	$.post("./includes/reception.php?action=saveNew&dest=addNewService&addedBy="+myUser, { txtServiceName:txtServiceName, txtServiceCost:txtServiceCost }, function(data) {
		var addedpos = data.search("added");
		if(addedpos==0) {
			document.getElementById("addNewService").checked = false;
			var lastID = data.slice(6,21);
        	$('[name="slcExtra"]').append(`<option value="${lastID}" selected="selected">${txtServiceName}</option>`);
			$("input#txtCost").val(txtServiceCost);
			$("input#txtQnty").val(1);
			$("input#txtUnitQnty").val(1);
			$("input#txtCostPrice").val(txtServiceCost);
			$("input#subTotal").val(txtServiceCost);
			$("input#total").val(txtServiceCost);
			$("#addNewService").attr("checked",false);
			$("div.popupContainer").css("display","none");
			swal({
				title: "Success!",
				text: "You added new customer successfully.",
				icon: "success",
				timer: 1500,
				button: false
			});
		} else {
			swal("Oops!", data, "error");
		}
		$("#btnAdd").attr("disabled", false);
		$("#btnAdd").html("Add");
	});
	return false;
}
function addExtraMeasure(selectCtrlName) {
	swal({
		title: "Add Extra Service Measure",
		text: 'Give a name to this measure',
		content: "input",
		buttons: ["Cancel","Save"]
	})
	.then(measureName=> {
		if (measureName) {

			$.post("./includes/reception.php?action=saveNew&dest=addExtraMeasure&addedBy="+myUser, { measureName:measureName }, function(data) {
				var addedpos = data.search("added");
				if(addedpos==0) {
					var lastID = data.slice(6,21);
					swal({
						title: "Success!",
						text: "You successfully added new measure.",
						icon: "success",
						timer: 1500,
						button: false
					});
					$.post("./includes/reception.php?action=get_recInfo&dest=getExtraMsr4Order", {lastID:lastID},function (data) {
	        			$('[name="'+selectCtrlName+'"]').html(data);
					});
				} else {
					swal("Oops!", data, "error");
				}
			});
		}
	});
	return false;
}
function add2List4Extra() {
	var slcExtra	= $("#slcExtra").val();
	var slcExtra2	= $("#slcExtra :selected").text();
	var txtQnty		= $("#txtQnty").val();
	var txtUnitQnty	= $("#txtUnitQnty").val();
	var ttlQuantity = Number(txtQnty*txtUnitQnty);
	var slcExtraMsr	= $("#slcExtraMsr").val();
	var slcExtraMsr2		= $("#slcExtraMsr :selected").text();
	var slcExtraMsr4Unit	= $("#slcExtraMsr2").val();
	var slcExtraMsr4Unit2	= $("#slcExtraMsr2 :selected").text();
	var txtCostPrice		= $("#txtCostPrice").val();
	var subTotal	= Number(ttlQuantity*txtCostPrice);
	var discount	= $("#discount").val();
	var total		= Number(subTotal-discount);



	if(slcExtraMsr4Unit=="---") {slcExtraMsr4Unit2=slcExtraMsr4Unit="";}
	if(slcExtra == "---") {
		$("#error4").css("display", "inline");
		$("#error4").html("Select extra service to add this order");
		$("#slcExtra").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(txtQnty.length < 1) {
		$("#error4").css("display", "inline");
		$("#error4").html("Quantity is missing");
		$("#txtQnty").css("border-color", "#FF0000");
		return false;
	} else if(Number(txtQnty) < 1) {
		$("#error4").css("display", "inline");
		$("#error4").html("Quantity must be greater than 0");
		$("#txtQnty").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(slcExtraMsr=="---") {
		$("#error4").css("display", "inline");
		$("#error4").html("Please provide measure");
		$("#slcExtraMsr").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(txtCostPrice.length < 1) {
		$("#error4").css("display", "inline");
		$("#error4").html("Price can't be empty");
		$("#txtCostPrice").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	$(".theForm .list .listItem.zero").remove();
	$("div.list").append('<div class="listItem num'+num+'">\
		<div class="cave serial"></div>\
		<div class="cave medium">\
			<input type="hidden" name="extraID[]" value="'+slcExtra+'" readonly="readonly" />\
			<input type="text" value="'+slcExtra2+'" readonly="readonly" />\
		</div>\
		<div class="cave vsmall">\
			<input type="hidden" name="extraMsrID[]" value="'+slcExtraMsr+'" readonly="readonly" />\
			<input type="hidden" name="ordQnty[]" value="'+txtQnty+'" readonly="readonly" />\
			<input type="text" value="'+txtQnty+' '+slcExtraMsr2+'" readonly="readonly" />\
		</div>\
		<div class="cave vsmall">\
			<input type="text" name="extraCost[]" value="$'+txtCostPrice+'" readonly="readonly" />\
		</div>\
		<div class="cave vsmall">\
			<input type="hidden" name="extraMsrID2[]" value="'+slcExtraMsr4Unit+'" readonly="readonly" />\
			<input type="hidden" name="unitQnty[]" value="'+txtUnitQnty+'" readonly="readonly" />\
			<input type="text" value="'+txtUnitQnty+' '+slcExtraMsr4Unit2+'" readonly="readonly" />\
		</div>\
		<div class="cave vsmall subTtl"><input type="text" value="$'+subTotal+'" readonly="readonly" /></div>\
		<div class="cave vsmall"><input type="text" name="ordrDscnt[]" value="'+discount+'" readonly="readonly" /></div>\
		<div class="cave vsmall subTtl"><input type="text" value="$'+total+'" readonly="readonly" /></div>\
		<div class="cave last"><a id="remove" onclick="return removeItem('+num+');">remove</a></div>\
	</div>');

	$("select#slcExtra option:first").attr("selected", "selected");
	$("select#slcExtraMsr option:first").attr("selected", "selected");
	$("select#slcExtraMsr2 option:first").attr("selected", "selected");
	$("input#txtQnty, input#txtCostPrice, input#subTotal, input#total, input#txtUnitQnty").val('');
	$("input#discount").val(0);

	num++;
}
function check_addExtraOrder() {
	var ordrFrom	= $("#ordrFrom").val();
	var prpType		= $("#prpType").val();
	var slcAlloc	= $("#slcAlloc").val();

	var clientName	= $("#clientName").val();
	var clientID	= $("#clientID").val();

	var listItem 		= $('.listItem').find('input[name^="extraID"]').height();
	// var listItem = $("div.theForm .listItem").height();
	if(ordrFrom=="inside") {
		if(prpType.length < 1) {
			$("#error01").css("display", "inline");
			$("#error01").html("Please select property type");
			$("#prpType").css("border-color", "#FF0000");
			return false;
		} else { clearErrors(); }

		if(slcAlloc=="---") {
			$("#error01").css("display", "inline");
			$("#error01").html("Select property");
			$("#slcAlloc").css("border-color", "#FF0000");
			return false;
		} else { clearErrors(); }

	} else if(ordrFrom=="outside") {
		if(clientName.length < 1) {
			$("#error02").css("display", "inline");
			$("#error02").html("Select customer");
			$("#clientName").css("border-color", "#FF0000");
			return false;
		} else { clearErrors(); }

	}
	if(listItem==null) {
		$("#error5").css("display", "inline");
		$("#error5").html("You must add at least one service to the list");
		return false;
	} else { clearErrors(); }

	$("label.process").css("display", "inline");
	$("#btnSave").attr("disabled", true);
	$("#btnSave").html("Wait...");

	return true;
}
function simplySrvcShow() {
	$("#txtPopQty,#txtPopCost,#txtUQty,#txtPopDiscount").keyup(function(){
		var txtPopQty = parseFloat($(this).parentsUntil('.content').find('[name="txtPopQty"]').val());
		var txtPopCost = parseFloat($(this).parentsUntil('.content').find('[name="txtPopCost"]').val());
		var txtUQty = parseFloat($(this).parentsUntil('.content').find('[name="txtUQty"]').val());
		var txtPopDiscount = parseFloat($(this).parentsUntil('.content').find('[name="txtPopDiscount"]').val());
		if(!txtPopCost) txtPopCost = 0;
		if(!txtUQty) txtUQty = 1;
		if(!txtPopQty) txtPopQty = 0;
		if(!txtPopDiscount) txtPopDiscount = 0;
		$(this).parentsUntil('.content').find('[name="txtPopTotal"]').val(parseFloat(((txtPopQty*txtUQty)*txtPopCost)-txtPopDiscount));
	});
	// edit service
	$('.btnAdd.editServices').click(function() {
		clearErrors();
		var detailID	  = $(this).parentsUntil('.content').find('[name="detailID4Pop"]').val();
		var extraID		  = $(this).parentsUntil('.content').find('[name="extraID4Pop"]').val();
		var orderID		  = $(this).parentsUntil('.content').find('[name="orderID4Pop"]').val();
		var txtUQty		  = $(this).parentsUntil('.content').find('[name="txtUQty"]').val();
		var txtQty		  = $(this).parentsUntil('.content').find('[name="txtPopQty"]').val();
		var slcMsrID	  = $(this).parentsUntil('.content').find('[name="slcMsrID"]').val();
		var txtCost		  = $(this).parentsUntil('.content').find('[name="txtPopCost"]').val();
		var txtDiscount	  = $(this).parentsUntil('.content').find('[name="txtPopDiscount"]').val();
		var slcMsrID2	  = $(this).parentsUntil('.content').find('[name="slcMsrID2"]').val();
		var txtPopTotal	  = $(this).parentsUntil('.content').find('[name="txtPopTotal"]').val();
		//
		var curTotal = (txtQty*txtUQty*txtCost);
		//

		if(!txtQty) {
			$(this).parentsUntil('.content').find('.error#txtQty').css("display", "inline");
			$(this).parentsUntil('.content').find('.error#txtQty').html("Qty is missing");
			$(this).parentsUntil('.content').find('[name="txtQty"]').addClass("highlight");
			return false;
		} else if(txtQty==0) {
			$(this).parentsUntil('.content').find('.error#txtQty').css("display", "inline");
			$(this).parentsUntil('.content').find('.error#txtQty').html("Invalid quantity");
			$(this).parentsUntil('.content').find('[name="txtQty"]').addClass("highlight");
			return false;
		}

		if(!txtCost) {
			$(this).parentsUntil('.content').find('#txtCost').css("display", "inline");
			$(this).parentsUntil('.content').find('.error#txtCost').html("Please provide service price");
			$(this).parentsUntil('.content').find('[name="txtCost"]').addClass("highlight");
			return false;
		}

		if(parseFloat(curTotal) < parseFloat(txtDiscount)) {
			$(this).parentsUntil('.content').find('.error#txtDiscount').css("display", "inline");
			$(this).parentsUntil('.content').find('.error#txtDiscount').html("Discount can't exceed the price");
			$(this).parentsUntil('.content').find('[name="txtCost"]').addClass("highlight");
			$(this).parentsUntil('.content').find('[name="txtDiscount"]').addClass("highlight");
			return false;
		}
		$(this).html('Wait..');
		$(this).attr("disabled", true);
		$.post("./includes/reception.php?action=updateExist&dest=editServices&updatedBy="+myUser, { detailID:detailID, extraID:extraID, orderID:orderID, txtUQty:txtUQty, txtQty:txtQty, slcMsrID:slcMsrID, txtCost:txtCost, txtDiscount:txtDiscount, slcMsrID2:slcMsrID2 }, function(data) {
	        if(data=="updated") {
				swal({
					title: "Success!",
					text: "Your changes has been saved.",
					icon: "success",
					timer: 1500,
					button: false
				})
					.then(value=> {
						location.reload();
					}
				);
			} else {
				swal("Oops!", data, "error");
			}
			$('.editServices').attr("disabled", false);
			$('.editServices').html("Update");
		});
		return false;
	});
}
function delServices(detailID, orderID){
	swal({
		title: "Are you sure to delete?",
		text: "You going to delete this item!",
		icon: "warning",
		dangerMode:true,
		buttons:["Cancel","'Yes, remove it!"],
		closeOnConfirm: false
	})
	.then(willDelete=> {
		if(willDelete) {
			$.post("./includes/reception.php?action=deleteRec&dest=delServices", { detailID:detailID, orderID:orderID }, function(data) {
				if(data=="deleted") {
					swal({
						title: "Success!",
						text: "Selected item has been deleted.",
						icon: "success",
						timer: 1500,
						button: false
					})
						.then(value=> {
							location.reload();
						}
					);
				} else {
					swal("Oops", data, "error");
				}
			});
		}
	});
	return false;
}

/*-------------------------------------------------------
------------------------Quotation------------------------
-------------------------------------------------------*/

function loadQuotation(pageLimit, perPage, period) {
	$("#dataTable div#loading").css("display", "inline");
	var dataString = 'pageLimit='+pageLimit+'&period='+period+'&perPage='+perPage+'&myWhouse='+myWhouse;
	$.ajax({
		type: "POST",
		url: "./includes/reception.php?action=loadTable&dest=allQuotation&myRole="+myRole+"&myUser="+myUser,
		data: dataString,
		dataType: 'json',
		cache: false,
		timeout: 2000,
		success: function(result){
			$("#dataTable #loading").css("display", "none");
			$("#foundNum #count").html(result['numRecords']);
			$(".load_more_link").addClass('noneLink');
			$("#dataTable").append(result['records']);
		}
	});
	return false;
}
function simplfyAddQuotation() {
	$(".restaurant-part").css('display','none');
	$(".service-part").css('display','none');
	$("#slcType").change(function() {
		var slcType = $("#slcType").val();
		if(slcType=='reservation'){
			$(".reservation-part").css('display','inline');
			$(".restaurant-part").css('display','none');
			$(".service-part").css('display','none');
		} else if(slcType=='restaurant'){
			$(".restaurant-part").css('display','inline');
			$(".reservation-part").css('display','none');
			$(".service-part").css('display','none');
		} else if(slcType=='service'){
			$(".restaurant-part").css('display','none');
			$(".reservation-part").css('display','none');
			$(".service-part").css('display','inline');
		}

	});

	$("#slcAllocType").change(function(){
		var slcAllocType = $("#slcAllocType").val();
		var chkInDate = $("#chkInDate").val();
		var chkOutDate = $("#chkOutDate").val();
		$.post("./includes/reception.php?action=searchRec&dest=getAllocationAmount",{ slcAllocType:slcAllocType, chkInDate:chkInDate, chkOutDate:chkOutDate }, function(data) {
			var data2 = data.split("||");
			var price = data2[0];
			var type  = data2[1]
			var group = data2[2]
			$("#txtDays").val(1);
			$("#txtPricePerday").val(price);
			$("#subtotal").val(price);
			$("#txtDiscount").val(0);
			$("#totalAccAmnt").val(price);
			$("#typeName").val(type);
			$("#groupName").val(group);
		});
	});
	//
	$("#txtPricePerday,#txtDays,#txtUnitQnty,#txtDiscount").keyup(function(){
		var txtDays = parseFloat($("#txtDays").val());
		var txtPricePerday = parseFloat($("#txtPricePerday").val());
		var txtUnitQnty = parseFloat($("#txtUnitQnty").val());
		var txtDiscount = parseFloat($("#txtDiscount").val());
		if(!txtPricePerday) txtPricePerday = 0;
		if(!txtUnitQnty) txtUnitQnty = 1;
		if(!txtDays) txtDays = 0;
		if(!txtDiscount) txtDiscount = 0;
		$("#subtotal").val(parseFloat((txtDays*txtUnitQnty)*txtPricePerday));
		$("#totalAccAmnt").val(parseFloat((txtDays*txtUnitQnty)*txtPricePerday)-txtDiscount);
	});
	//
	$("#slcMealOrder").change(function(){
		var slcMealOrder = $("#slcMealOrder").val();
		$.post("./includes/reception.php?action=searchRec&dest=getMealOrder",{ slcMealOrder:slcMealOrder }, function(data) {
			var data2 		= data.split("||");
			var itemName  	= data2[0];
			var packageName = data2[1];
			var costprice 	= data2[2];
			$("#txtMQty").val(1);
			$("#txtMCost").val(costprice);
			$("#totalMCost").val(costprice);
			$("#totalMSub").val(costprice);
			$("#discountM").val(0);
			$("#itemName").val(itemName);
			$("#packageName").val(packageName);
		});
	});
	//
	$("#txtMQty,#txtMUnitQnty,#txtMCost,#discountM").keyup(function(){
		var txtMCost = parseFloat($("#txtMCost").val());
		var txtMQty  = parseFloat($("#txtMQty").val());
		var txtMUnitQnty  = parseFloat($("#txtMUnitQnty").val());
		var discountM  = parseFloat($("#discountM").val());
		if(!txtMQty) txtMQty = 0;
		if(!txtMCost) txtMCost = 0;
		if(!txtMUnitQnty) txtMUnitQnty = 1;
		if(!discountM) discountM = 0;
		$("#totalMSub").val(parseFloat(txtMCost*(txtMQty*txtMUnitQnty)));
		$("#totalMCost").val(parseFloat(txtMCost*(txtMQty*txtMUnitQnty)-discountM));
	})
	//
	$("#slcExtra").change(function(){
		var slcExtra = $("#slcExtra").val();
		$.post("./includes/reception.php?action=searchRec&dest=getServiceOrder",{ slcExtra:slcExtra }, function(data) {
			var data2 		= data.split("||");
			var service  	= data2[0];
			var cost 		= data2[1];
			$("#txtSQty").val(1);
			$("#txtSCost").val(cost);
			$("#totalSCost").val(cost);
			$("#subtotalS").val(cost);
			$("#discountS").val(0);
			$("#txtService").val(service);
		});
	});
	//
	$("#txtSQty,#txtSUnitQnty,#txtSCost,#discountS").keyup(function(){
		var txtSQty = parseFloat($("#txtSQty").val());
		var txtSCost  = parseFloat($("#txtSCost").val());
		var txtSUnitQnty  = parseFloat($("#txtSUnitQnty").val());
		var discountS  = parseFloat($("#discountS").val());
		//
		if(!txtSCost) txtSCost = 0;
		if(!txtSUnitQnty) txtSUnitQnty = 1;
		if(!txtSQty) txtSQty = 0;
		if(!discountS) discountS = 0;
		//
		$("#subtotalS").val(parseFloat(txtSCost*(txtSQty*txtSUnitQnty)));
		$("#totalSCost").val(parseFloat(txtSCost*(txtSQty*txtSUnitQnty)-discountS));
	})
}
function add2List4Quotation() {
	var slcType			= $("#slcType").val();
	if(slcType=='reservation'){
		var allocType		= $("#allocType").val();
		var chkInDate		= $("#chkInDate").val();
		var chkOutDate		= $("#chkOutDate").val();
		var slcAllocType	= $("#slcAllocType").val();
		var txtDays			= $("#txtDays").val();
		var txtUnitQty		= $("#txtUnitQnty").val();
		var slcRMeasure2	= $("#slcRMeasure2").val();
		var txtPricePerday	= $("#txtPricePerday").val();
		var totalAccAmnt	= $("#totalAccAmnt").val();
		var typeName		= $("#typeName").val();
		var groupName		= $("#groupName").val();
		var slcRMeasure		= $("#slcRMeasure").val();
		var subtotal		= $("#subtotal").val();
		var txtDiscount		= $("#txtDiscount").val();
		//
		if(!slcAllocType) {
			$("#error5").css("display", "inline");
			$("#error5").html("Select accommodation type");
			$("#slcAllocType").css("border-color", "#FF0000");
			return false;
		} else { clearErrors(); }
		if(!txtPricePerday) {
			$("#error5").css("display", "inline");
			$("#error5").html("provide amount per day");
			$("#txtPricePerday").css("border-color", "#FF0000");
			return false;
		} else { clearErrors(); }

		var reference   = slcAllocType;
		var measureID   = slcRMeasure;
		var measure 	= $("#slcRMeasure :selected").text();
		var orderDetail = groupName+', '+typeName;
		var qty 	= txtDays;
		var unitQty 	= txtUnitQty;
		var measure2 	= $("#slcRMeasure2 :selected").text();
		var measure2ID 	= slcRMeasure2;
		var price 		= txtPricePerday;
		var subtotal 		= subtotal;
		var discount 		= txtDiscount;
		var total 		= parseFloat(totalAccAmnt);

	} else if(slcType=='restaurant'){
		var slcMealOrder	= $("#slcMealOrder").val();
		var itemName		= $("#itemName").val();
		var packageName		= $("#packageName").val();
		var txtMQty			= $("#txtMQty").val();
		var txtMCost		= $("#txtMCost").val();
		var totalMCost		= $("#totalMCost").val();
		var slcMMeasure		= $("#slcMMeasure").val();
		var txtMUnitQnty	= $("#txtMUnitQnty").val();
		var slcMMeasure2	= $("#slcMMeasure2").val();
		var totalMSub	= $("#totalMSub").val();
		var discountM	= $("#discountM").val();

		if(!slcMealOrder) {
			$("#error5").css("display", "inline");
			$("#error5").html("Please select item");
			$("#slcMealOrder").css("border-color", "#FF0000");
			return false;
		} else { clearErrors(); }
		if(!txtMQty) {
			$("#error5").css("display", "inline");
			$("#error5").html("Qty is missing");
			$("#txtMQty").css("border-color", "#FF0000");
			return false;
		} else { clearErrors(); }

		var reference   = slcMealOrder;
		var measureID   = slcMMeasure;
		var measure 	= $("#slcMMeasure :selected").text();
		var orderDetail = packageName+', '+itemName;
		var qty 		= txtMQty;
		var unitQty 	= txtMUnitQnty;
		var measure2 	= $("#slcMMeasure2 :selected").text();
		var measure2ID 	= slcMMeasure2;
		var price 		= txtMCost;
		var total 		= parseFloat(totalMCost);
		var subtotal 	= totalMSub;
		var discount 	= discountM;

	} else if(slcType=='service'){
		var slcExtra	= $("#slcExtra").val();
		var txtService	= $("#txtService").val();
		var txtSQty		= $("#txtSQty").val();
		var txtSUnitQnty		= $("#txtSUnitQnty").val();
		var txtSCost	= $("#txtSCost").val();
		var totalSCost	= $("#totalSCost").val();
		var slcSMeasure	= $("#slcSMeasure").val();
		var slcSMeasure2	= $("#slcSMeasure2").val();
		var subtotalS	= $("#subtotalS").val();
		var discountS	= $("#discountS").val();

		if(!slcExtra) {
			$("#error5").css("display", "inline");
			$("#error5").html("Please select service type");
			$("#slcExtra").css("border-color", "#FF0000");
			return false;
		} else { clearErrors(); }

		if(!txtSQty) {
			$("#error5").css("display", "inline");
			$("#error5").html("Provide service qty");
			$("#txtSQty").css("border-color", "#FF0000");
			return false;
		} else if(parseFloat(txtSQty)<1) {
			$("#error5").css("display", "inline");
			$("#error5").html("invalid quantity");
			$("#txtSQty").css("border-color", "#FF0000");
			return false;
		} else { clearErrors(); }

		var reference   = slcExtra;
		var measureID   = slcSMeasure;
		var measure 	= $("#slcSMeasure :selected").text();
		var orderDetail = txtService;
		var qty 		= txtSQty;
		var unitQty 	= txtSUnitQnty;
		var measure2 	= $("#slcSMeasure2 :selected").text();
		var measure2ID 	= slcSMeasure2;
		var price 		= txtSCost;
		var total 		= totalSCost;
		var subtotal 		= subtotalS;
		var discount 		= discountS;

	}


	$(".theForm .list .listItem.zero").remove();
	$("div.list").append('<div class="listItem num'+num+'">\
		<div class="cave serial"></div>\
			<input type="hidden" name="itemID[]" value="'+reference+'" readonly="readonly" />\
			<input type="hidden" name="serviceType[]" value="'+slcType+'" readonly="readonly" />\
			<input type="hidden" name="quantity[]" value="'+qty+'" readonly="readonly" />\
			<input type="hidden" name="txtUnitQty[]" value="'+unitQty+'" readonly="readonly" />\
			<input type="hidden" name="costPrice[]" value="'+price+'" readonly="readonly" />\
			<input type="hidden" name="discount[]" value="'+discount+'" readonly="readonly" />\
			<input type="hidden" name="totalPrice[]" value="'+total+'" readonly="readonly" />\
			<input type="hidden" name="measure[]" value="'+measureID+'" readonly="readonly" />\
			<input type="hidden" name="measure2[]" value="'+measure2ID+'" readonly="readonly" />\
		<div class="cave vsmall"><input type="text" value="'+slcType+'" readonly="readonly" /></div>\
		<div class="cave medium"><input type="text" value="'+orderDetail+'" readonly="readonly" /></div>\
		<div class="cave vsmall"><input type="text" value="'+qty+'" readonly="readonly" /></div>\
		<div class="cave tiny"><input type="text" value="$'+price+'" readonly="readonly" /></div>\
		<div class="cave tiny"><input type="text" value="'+unitQty+'" readonly="readonly" /></div>\
		<div class="cave tiny"><input type="text" value="$'+subtotal+'" readonly="readonly" /></div>\
		<div class="cave tiny"><input type="text" value="$'+discount+'" readonly="readonly" /></div>\
		<div class="cave tiny"><input type="text" value="$'+total+'" readonly="readonly" /></div>\
		<div class="cave tiny"><a id="remove" onclick="return removeItem('+num+');">remove</a></div>\
	</div>');

	$('#txtDays,#txtUnitQty,#txtPricePerday,#totalAccAmnt').val('');
	num++;
}
function check_addQuotation() {
	var clientName 		= $('[name="clientName"]').val();
	var clientID 		= $('[name="clientID"]').val();
	var chkClient 		= $('[name="chkClient"]').prop('checked');
	//
	//
	var listItem 		= $('.listItem').height();
	//
	if(!chkClient) {
		if(!clientID) {
			$(".error.clientName").css("display", "inline");
			$(".error.clientName").html("Please provide customer");
			$('[name="clientName"]').css("border-color", "#FF0000");
			return false;
		} else { clearErrors(); }
	}
	//
	if(!clientName) {
		$(".error.clientName").css("display", "inline");
		$(".error.clientName").html("Please select customer");
		$('[name="clientName"]').css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }
	//
	if(listItem==null) {
		$("#error5").css("display", "inline");
		$("#error5").html("You must add at least one item to the list");
		return false;
	} else { clearErrors(); }
	//
	$("#btnSave").attr("disabled", true);
	$("#btnSave").html("wait...");
	$("label.process").css("display", "inline");

	return true;
}
//
function add2List4Quotation4Edit() {
	var quotationID			= $("#quotationID").val();
	var slcType			= $("#slcType").val();
	if(slcType=='reservation'){
		var allocType		= $("#allocType").val();
		var chkInDate		= $("#chkInDate").val();
		var chkOutDate		= $("#chkOutDate").val();
		var slcAllocType	= $("#slcAllocType").val();
		var txtDays			= $("#txtDays").val();
		var txtUnitQty		= $("#txtUnitQnty").val();
		var slcRMeasure2	= $("#slcRMeasure2").val();
		var txtPricePerday	= $("#txtPricePerday").val();
		var totalAccAmnt	= $("#totalAccAmnt").val();
		var typeName		= $("#typeName").val();
		var groupName		= $("#groupName").val();
		var slcRMeasure		= $("#slcRMeasure").val();
		var subtotal		= $("#subtotal").val();
		var txtDiscount		= $("#txtDiscount").val();
		//
		if(!slcAllocType) {
			$("#error5").css("display", "inline");
			$("#error5").html("Select accommodation type");
			$("#slcAllocType").css("border-color", "#FF0000");
			return false;
		} else { clearErrors(); }
		if(!txtPricePerday) {
			$("#error5").css("display", "inline");
			$("#error5").html("provide amount per day");
			$("#txtPricePerday").css("border-color", "#FF0000");
			return false;
		} else { clearErrors(); }

		var reference   = slcAllocType;
		var measureID   = slcRMeasure;
		var measure 	= $("#slcRMeasure :selected").text();
		var orderDetail = groupName+', '+typeName;
		var qty 	= txtDays;
		var unitQty 	= txtUnitQty;
		var measure2 	= $("#slcRMeasure2 :selected").text();
		var measure2ID 	= slcRMeasure2;
		var price 		= txtPricePerday;
		var subtotal 		= subtotal;
		var discount 		= txtDiscount;
		var total 		= parseFloat(totalAccAmnt);

	} else if(slcType=='restaurant'){
		var slcMealOrder	= $("#slcMealOrder").val();
		var itemName		= $("#itemName").val();
		var packageName		= $("#packageName").val();
		var txtMQty			= $("#txtMQty").val();
		var txtMCost		= $("#txtMCost").val();
		var totalMCost		= $("#totalMCost").val();
		var slcMMeasure		= $("#slcMMeasure").val();
		var txtMUnitQnty	= $("#txtMUnitQnty").val();
		var slcMMeasure2	= $("#slcMMeasure2").val();
		var totalMSub	= $("#totalMSub").val();
		var discountM	= $("#discountM").val();

		if(!slcMealOrder) {
			$("#error5").css("display", "inline");
			$("#error5").html("Please select item");
			$("#slcMealOrder").css("border-color", "#FF0000");
			return false;
		} else { clearErrors(); }
		if(!txtMQty) {
			$("#error5").css("display", "inline");
			$("#error5").html("Qty is missing");
			$("#txtMQty").css("border-color", "#FF0000");
			return false;
		} else { clearErrors(); }

		var reference   = slcMealOrder;
		var measureID   = slcMMeasure;
		var measure 	= $("#slcMMeasure :selected").text();
		var orderDetail = packageName+', '+itemName;
		var qty 		= txtMQty;
		var unitQty 	= txtMUnitQnty;
		var measure2 	= $("#slcMMeasure2 :selected").text();
		var measure2ID 	= slcMMeasure2;
		var price 		= txtMCost;
		var total 		= parseFloat(totalMCost);
		var subtotal 	= totalMSub;
		var discount 	= discountM;

	} else if(slcType=='service'){
		var slcExtra	= $("#slcExtra").val();
		var txtService	= $("#txtService").val();
		var txtSQty		= $("#txtSQty").val();
		var txtSUnitQnty		= $("#txtSUnitQnty").val();
		var txtSCost	= $("#txtSCost").val();
		var totalSCost	= $("#totalSCost").val();
		var slcSMeasure	= $("#slcSMeasure").val();
		var slcSMeasure2	= $("#slcSMeasure2").val();
		var subtotalS	= $("#subtotalS").val();
		var discountS	= $("#discountS").val();

		if(!slcExtra) {
			$("#error5").css("display", "inline");
			$("#error5").html("Please select service type");
			$("#slcExtra").css("border-color", "#FF0000");
			return false;
		} else { clearErrors(); }

		if(!txtSQty) {
			$("#error5").css("display", "inline");
			$("#error5").html("Provide service qty");
			$("#txtSQty").css("border-color", "#FF0000");
			return false;
		} else if(parseFloat(txtSQty)<1) {
			$("#error5").css("display", "inline");
			$("#error5").html("invalid quantity");
			$("#txtSQty").css("border-color", "#FF0000");
			return false;
		} else { clearErrors(); }

		var reference   = slcExtra;
		var measureID   = slcSMeasure;
		var measure 	= $("#slcSMeasure :selected").text();
		var orderDetail = txtService;
		var qty 		= txtSQty;
		var unitQty 	= txtSUnitQnty;
		var measure2 	= $("#slcSMeasure2 :selected").text();
		var measure2ID 	= slcSMeasure2;
		var price 		= txtSCost;
		var total 		= totalSCost;
		var subtotal 		= subtotalS;
		var discount 		= discountS;

	}
	//
	/*
	<input type="hidden" name="itemID[]" value="'+reference+'" readonly="readonly" />\
	<input type="hidden" name="serviceType[]" value="'+slcType+'" readonly="readonly" />\
	<input type="hidden" name="quantity[]" value="'+qty+'" readonly="readonly" />\
	<input type="hidden" name="txtUnitQty[]" value="'+unitQty+'" readonly="readonly" />\
	<input type="hidden" name="costPrice[]" value="'+price+'" readonly="readonly" />\
	<input type="hidden" name="discount[]" value="'+discount+'" readonly="readonly" />\
	<input type="hidden" name="totalPrice[]" value="'+total+'" readonly="readonly" />\
	<input type="hidden" name="measure[]" value="'+measureID+'" readonly="readonly" />\
	<input type="hidden" name="measure2[]" value="'+measure2ID+'" readonly="readonly" />
	*/
	//
	$.post("./includes/reception.php?action=saveNew&dest=addNewItem4Quotation&addedBy="+myUser, {
		quotationID:quotationID,
		itemID:reference,
		serviceType:slcType,
		quantity:qty,
		txtUnitQty:unitQty,
		costPrice:price,
		discount:discount,
		totalPrice:total,
		measure:measureID,
		measure2:measure2ID,
	}, function(data) {
		var addedpos = data.search("added");
		if(addedpos==0) {
			swal({
				title: "Success!",
				text: "Your selcted record has been saved.",
				icon: "success",
				timer: 1500,
				button: false
			})
				.then(value=> {
					location.reload();
				}
			);
		} else {
			swal("Oops!", data, "error");
		}
	});
	//
	return false;
}
//
function editQuoVatPercentage(quotationID,curVal) {
	swal({
		title: "Edit Quotation VAT %",
		text: 'Please check input value',
		content: "input",
		buttons: ["Cancel","Save"]
	})
	.then(newVatVal=> {
		if (newVatVal) {
			$.post("./includes/reception.php?action=updateExist&dest=editQuoVatPercentage&updatedBy="+myUser, { quotationID:quotationID,newVatVal:newVatVal }, function(data) {
				if(data=="updated") {
					swal({
						title: "Success!",
						text: "Your changes has been saved.",
						icon: "success",
						timer: 1500,
						button: false
					})
						.then(value=> {
							location.reload();
						}
					);
				} else {
					swal("Oops!", data, "error");
				}
			});
		}
	});
	return false;
}
//
function delQuotationItem(quotation_detID) {
	swal({
		title: "Are you sure to remove this item?",
		text: "You going to remove this this item!",
		icon: "warning",
		dangerMode:true,
		buttons:["Cancel","'Yes, remove it!"],
		closeOnConfirm: false
	})
	.then(willDelete=> {
		if(willDelete) {
			$.post("./includes/reception.php?action=deleteRec&dest=delQuotationItem",{ quotation_detID:quotation_detID }, function(data){
				if(data=="deleted") {
					swal({
						title: "Success",
						text: "Order removeed successfully",
						icon: "success",
						timer: 1500,
						button: false
					})
					.then(value=> {
						location.reload();
					});
				} else {
					swal("Oops!", data, "error");
				}
			});
		}
	});
	return false;
}
//
function delQuotation(quotationID) {
	swal({
		title: "Are you sure to remove order?",
		text: "You going to remove this order!",
		icon: "warning",
		dangerMode:true,
		buttons:["Cancel","'Yes, remove it!"],
		closeOnConfirm: false
	})
	.then(willDelete=> {
		if(willDelete) {
			$.post("./includes/reception.php?action=deleteRec&dest=delQuotation",{ quotationID:quotationID }, function(data){
				if(data=="deleted") {
					swal({
						title: "Success",
						text: "Order removeed successfully",
						icon: "success",
						timer: 1500,
						button: false
					})
					.then(value=> {
						location.reload();
					});
				} else {
					swal("Oops!", data, "error");
				}
			});
		}
	});
	return false;
}
/*-------------------------------------------------------
------------------------Gate Pass------------------------
-------------------------------------------------------*/

function smpfyGatePass() {
	$("#txtGuest").keyup(function(){
		var passedValue = $("input#txtGuest").val();
		if(passedValue.val!="") {
			$("div.suggest").css("display", "table-row");
			$.post("./includes/reception.php?action=searchRec&dest=srchGatePass", { passedValue: passedValue }, function(data) {
				$("div.suggest").html(data);
			});
		}
	});
}
function catchGatePass(checkInDetID, propID, roomName, profileID, clientName, checkInDate, checkOutDate, title, footer) {
	$("input#guestID").val(profileID);
	$("input#checkInDetID").val(checkInDetID);
	$("input#txtGuest").val(clientName);
	$("#txtRemarks").val(title+' '+clientName+' oo Daganaaye ' +roomName+ ' '+footer);
	$("div.displayInfo").css("display", "inline");
	$("p#pGName").html(clientName);
	$("p#pRoom").html(roomName);
	$("p#pDateIn").html(checkInDate);
	$("p#pDateOut").html(checkOutDate);
	$("p#pReserveID").html('#'+checkInDetID);
	$("div.suggest").css("display", "none");
}
function check_gatePass() {
	var txtGuest		= $("#txtGuest").val();
	var guestID			= $("#guestID").val();
	var checkInDetID	= $("#checkInDetID").val();
	var txtRemarks		= $("#txtRemarks").val();

	if(txtGuest.length < 1 || guestID.length < 1) {
		$("#error1").css("display", "inline");
		$("#error1").html("Please select guest");
		$("#txtGuest").css("border-color", "#FF0000");
		$("div.suggest").css("display", "none");
		return false;
	} else { clearErrors(); }

	$("label.process").css("display", "inline");
	$("#btnSave").attr("disabled", true);
	$("#btnSave").html("Wait...");

	$.post("./includes/reception.php?action=saveNew&dest=addGatePass&addedBy="+myUser, { checkInDetID:checkInDetID, txtRemarks:txtRemarks }, function(data) {
		var addedpos = data.search("added");
		$("label.process").css("display", "none");
		if(addedpos==0) {
			var lastID = data.slice(6,21);
			swal({
				title: "Success!",
				text: "Gate Pass has been registered successfully.",
				icon: "success",
				timer: 1500,
				button: false
			})
				.then(value=> {
					window.location = "./reservation-workplace.php?role="+myRole+"&task=checkout&subtask=gatePass\
					&action=showInfo&recID="+lastID;
				}
			);
		} else {
			swal("Oops!", data, "error");
		}
		$("#btnSave").attr("disabled", false);
		$("#btnSave").html("Save");
	});
	return false;
}



/*---------------------------------------*/
function catchGnrtBill(recID) {
	$.post("./includes/reception.php?action=get_recInfo&dest=getGnrtBill", { recID:recID, myUser:myUser, myRole:myRole }, function(data) {
		$("div#foundNum").html('<label id="count">1</label> record has been selected.<span id="refresh"></span>');
		$("div#dataTable").html(data);
	});
	$("div.suggest").css("display", "none");
}
function catchRecpt(recID) {
	$.post("./includes/reception.php?action=get_recInfo&dest=getRecpt", { recID:recID, myRole:myRole }, function(data) {
		$("div#foundNum").html('<label id="count">1</label> record has been selected.<span id="refresh"></span>');
		$("div#dataTable").html(data);
	});
	$("div.suggest").css("display", "none");
}
function catchClient4Page(clientID) {
	$.post("./includes/reception.php?action=get_recInfo&dest=getClient", { clientID:clientID, myUser:myUser, myRole:myRole }, function(data) {
		$("div#foundNum").html('<label id="count">1</label> record has been selected.<span id="refresh"></span>');
		$("div#dataTable").html(data);
	});
	$("div.suggest").css("display", "none");
}
function catchExtrOrdr(recID) {
	$.post("./includes/reception.php?action=get_recInfo&dest=getExtrOrdr", { recID:recID, myUser:myUser, myRole:myRole }, function(data) {
		$("div#foundNum").html('<label id="count">1</label> record has been selected.<span id="refresh"></span>');
		$("div#dataTable").html(data);
	});
	$("div.suggest").css("display", "none");
}