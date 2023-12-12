function itemClickEvent(targetCrl) {
	var itemID = targetCrl.value;
	var targetAlt = targetCrl.alt;
	//alert(targetAlt);
	$("[name="+targetCrl.id+"]:checked").each(function(){
	var ttl_costprice = 0;
	//alert($("[name="+targetCrl.id+"]:checked").val());
		//
		var itemName 	= $(this).parentsUntil('div.radio-box.'+targetAlt).find('input#itemName'+targetAlt).val();
		var costPrice 	= $(this).parentsUntil('div.radio-box.'+targetAlt).find('input#costPrice'+targetAlt).val();
		var qty 		= $(this).parentsUntil('div.radio-box.'+targetAlt).find('input#txtQty'+targetAlt).val();
		var packageID 	= $(this).parentsUntil('div.radio-box.'+targetAlt).find('input#packageID'+targetAlt).val();
		//
		var curItemID = itemID.trim();
		//
		var itemExist = 0;
		$("input#mealID").each(function(){
			var curVal = $(this).val();
			if(curVal==curItemID){
				itemExist=1;
			}
		});
		//
		if(itemExist==0) {
			$("div.prices-wrap").append('<div class="record values slctedItem '+listNum+'">\
				<input type="hidden" name="recordType[]" value="new" />\
				<input type="hidden" class="mealItemNotes" name="mealItemNotes[]" value="" />\
				<input type="hidden" name="packageID[]" value="'+packageID+'" />\
				<input type="hidden" id="mealID" name="mealID[]" value="'+itemID+'" />\
				<input type="hidden" name="itemQty[]"  id="itemQty" class="itemQty'+listNum+'" value="'+qty+'" alt="'+costPrice+'"/>\
				<input type="hidden" name="costPrice[]" id="costPrice" class="costPrice'+listNum+'" value="'+costPrice+'" />\
				<span class="col name">'+itemName+'</span>\
				<span class="col qty">\
                    <i class="qty-btn qty-down fal fa-minus-circle decreaseQty" onclick="return decreaseQty('+listNum+')"></i>\
                    <div class="input quantity-div '+listNum+'" name="txtQty" contenteditable="true" spellcheck="false">'+qty+'</div>\
                    <i class="qty-btn qty-up fal fa-plus-circle increaseQty" onclick="return increaseQty('+listNum+')"></i>\
				</span>\
				<span class="col price">$<label class="item-price '+listNum+'">'+costPrice+'</label></span>\
				<span class="col delete item" onclick="return removeListItem('+listNum+')"><a class="fal fa-trash-alt del-item"></a></span>\
			</div>');
		listNum+=1;
		} /*else {swal('OOPS',itemName+' already added','error');}*/

		/*----------*/
		var pricelist = $(".prices-wrap").find(".price .item-price");
		var totalPrice = 0;
		$.each(pricelist, function(i, price){
			totalPrice += parseFloat($(price).text());
		});
		var discount = parseFloat($(".theDiscount").text());

			var vatPercents = $('[name="vatPercents"]').val();
			vat = parseFloat((totalPrice/100)*vatPercents);
			grand_total = parseFloat(totalPrice-discount+vat);
		$("input#txtTotalOrderAmount").val(totalPrice);
		$('.subTotal.amount').text('$'+totalPrice.toFixed(2));
		$('.vat.amount').text('$'+vat.toFixed(2));
		$('.total.amount').text('$'+grand_total.toFixed(2));
		/*----------*/
		return false;
	});
}
//
function removeListItem(num) {
	$("div.slctedItem."+num).remove();
	//var removedQty=parseFloat($("#itemQty"+num).val());
	//var removedPrice=parseFloat($("#costPrice"+num).val());
	//
	var removedQty=0;
	var removedPrice=0
	var removedAmount=0
	$("input#itemQty").each(function(){
    	removedQty = parseFloat($(this).val());
    	var removedPrice = $(this).attr("alt");
    	removedAmount+= (parseFloat(removedQty)*parseFloat(removedPrice));
    	//alert(removedPrice);
    });
	//
	var vatPercents = $('[name="vatPercents"]').val();
	//
	var totalAmount = $("input#txtTotalOrderAmount").val();
	var totalPrice  = removedAmount;
	var vat = parseFloat((totalPrice/100)*vatPercents);
	var grand_total = parseFloat(totalPrice+vat);
	//
	$("input#txtTotalOrderAmount").val(totalPrice);
	$('.subTotal.amount').text('$'+totalPrice.toFixed(2));
	$('.vat.amount').text('$'+vat.toFixed(2));
	$('.total.amount').text('$'+grand_total.toFixed(2));
}
//
function increaseQty(num) {
	var itemQty		= $("input.itemQty"+num).val();
	var costPrice	= $("input.costPrice"+num).val();
	// Max qty only works at the split order page.
	var maxQty		= $("input.maxQty"+num).val();
	// console.log(maxQty, itemQty)
	if(maxQty && itemQty >= parseFloat(maxQty)) return false

	itemQty ++;
	$("input.itemQty"+num).val(itemQty);
	$("div.quantity-div."+num).html(itemQty);
	$(".price .item-price."+num).html((costPrice*itemQty).toFixed(2));
	// update total cost
	var pricelist = $(".prices-wrap").find(".price .item-price");
	var totalPrice = 0;
	$.each(pricelist, function(i, price){
		totalPrice += parseFloat($(price).text());
	});
	//
	//totalPrice = totalPrice.toFixed(2);

	var vatPercents = $('[name="vatPercents"]').val();
	vat = parseFloat((totalPrice/100)*vatPercents);
	grand_total = parseFloat(totalPrice+vat);
	//grand_total = grand_total.toFixed(2);
	//

	$("input#txtTotalOrderAmount").val(totalPrice.toFixed(2));
	$('.subTotal.amount').text('$'+totalPrice.toFixed(2));
	$('.vat.amount').text('$'+vat.toFixed(2));
	$('.total.amount').text('$'+grand_total.toFixed(2));
}
//
function decreaseQty(num, allowOrderDecrease = false) {
	var itemQty		= $("input.itemQty"+num).val();
	var costPrice	= $("input.costPrice"+num).val();
	console.log(allowOrderDecrease)
	if(allowOrderDecrease && allowOrderDecrease == 'off') return false;
	itemQty --
	if(itemQty){
		$("input.itemQty"+num).val(itemQty);
		$("div.quantity-div."+num).html(itemQty);
		$(".price .item-price."+num).html((costPrice*itemQty).toFixed(2));
	}
	// update total cost
	var pricelist = $(".prices-wrap").find(".price .item-price");
	var totalPrice = 0;
	$.each(pricelist, function(i, price){
		totalPrice += parseFloat($(price).text());
	});
		var vatPercents = $('[name="vatPercents"]').val();
		vat = parseFloat((totalPrice/100)*vatPercents);
		grand_total = parseFloat(totalPrice+vat);
	$("input#txtTotalOrderAmount").val(totalPrice.toFixed(2));
	$('.subTotal.amount').text('$'+totalPrice.toFixed(2));
	$('.vat.amount').text('$'+vat.toFixed(2));
	$('.total.amount').text('$'+grand_total.toFixed(2));
}
//
function simply_order_content() {

	$(".wrap.items").html('');
	var packageID = $('[name="package"]:checked').val();
	if(!packageID) packageID='';
	$.post("./includes/general.php?action=searchRec&dest=getItem4package", { packageID:packageID }, function(data) {
		$(".wrap.items").html(data);
	});


	$('.packages').click('[name="package"]', function(e) {
		let label =  $(e.target).parents('label.radio-box')
		// console.log(label)
  		var packageID = $(label).find(('[name="package"]')).val();
  		$(".wrap.items").html('');
  		// console.log(packageID)
  		if(!packageID) packageID='';
		$.post("./includes/general.php?action=searchRec&dest=getItem4package", { packageID:packageID }, function(data) {
			// console.log(data)
			$(".wrap.items").html(data);
		});
	});
	//

	//add selected item to the list
	/*$('[name="itemID"]').click(function() {
  		var itemID = $('[name="itemID"]:checked').val();
  		//get item info and then add my order list
  		var ttl_costprice = 0;
		//
		var itemName 	= $(this).closest('div.radio-box').find('input#itemName').val();
		var costPrice 	= $(this).closest('div.radio-box').find('input#costPrice').val();
		var qty 		= $(this).closest('div.radio-box').find('input#txtQty').val();
		var packageID 	= $(this).closest('div.radio-box').find('input#packageID').val();
		//
		var curItemID = itemID.trim();
		//
		var itemExist = 0;
		$("input#mealID").each(function(){
			var curVal = $(this).val();
			if(curVal==curItemID){
				itemExist=1;
			}
		});
		//
		if(itemExist==0) {
			$("div.prices-wrap").append('<div class="record values slctedItem">\
				<input type="hidden" name="recordType[]" value="new" />\
				<input type="hidden" name="packageID[]" value="'+packageID+'" />\
				<input type="hidden" id="mealID" name="mealID[]" value="'+itemID+'" />\
				<input type="hidden" name="itemQty[]"  id="itemQty" value="'+qty+'" />\
				<input type="hidden" name="costPrice[]" id="costPrice" value="'+costPrice+'" />\
				<span class="col name">'+itemName+'</span>\
				<span class="col qty">\
                    <i class="qty-btn qty-down fal fa-minus-circle decreaseQty"></i>\
                    <div class="input quantity-div" name="txtQty" contenteditable="true" spellcheck="false">'+qty+'</div>\
                    <i class="qty-btn qty-up fal fa-plus-circle increaseQty"></i>\
				</span>\
				<span class="col price">$<label class="item-price">'+costPrice+'</label></span>\
				<span class="col delete item"><a class="fal fa-trash-alt del-item"></a></span>\
			</div>');

		} /*else {swal('OOPS',itemName+' already added','error');}*/

		/*----------*/
		/*var pricelist = $(".prices-wrap").find(".price .item-price");
		var totalPrice = 0;
		$.each(pricelist, function(i, price){
			totalPrice += parseFloat($(price).text());
		});
		var discount = parseFloat($(".theDiscount").text());

			var vatPercents = $('[name="vatPercents"]').val();
			vat = parseFloat((totalPrice/100)*vatPercents);
			grand_total = parseFloat(totalPrice-discount+vat);
		$("input#txtTotalOrderAmount").val(totalPrice);
		$('.subTotal.amount').text('$'+totalPrice.toFixed(2));
		$('.vat.amount').text('$'+vat.toFixed(2));
		$('.total.amount').text('$'+grand_total.toFixed(2));
		/*----------*/
		/*return false;
		//});
	});*/
	//delete item on order list
	/*$("span.delete.item").click(function() {
		var totalAmount = $("input#txtTotalOrderAmount").val();
		var costPrice	= $(this).parents('.slctedItem').find("input#costPrice").val();
		var itemQty		= $(this).parents('.slctedItem').find("input#itemQty").val();
		var vatPercents = $('[name="vatPercents"]').val();
		var ttl_cost 	= costPrice*itemQty;
		var totalPrice  = totalAmount-ttl_cost;
		vat 			= parseFloat((totalPrice/100)*vatPercents);
		grand_total		= parseFloat(totalPrice+vat);
		$('.subTotal.amount').text('$'+totalPrice.toFixed(2));
		$('.vat.amount').text('$'+vat.toFixed(2));
		$('.total.amount').text('$'+grand_total.toFixed(2));
		$("input#txtTotalOrderAmount").val(totalPrice);
		$(this).parent(".slctedItem").find("input").val("");
		$(this).parent(".slctedItem").fadeOut(500, function(){ $(this).remove(); });

		/*$(".list .listItem.num"+num).fadeOut(500, function(){ $(this).remove(); });*/
	/*});*/
	//increase item quantity
	/*$(".increaseQty").on('click', function() {
		var itemQty		= $(this).parents('.slctedItem').find("input#itemQty").val();
		var costPrice	= $(this).parents('.slctedItem').find("input#costPrice").val();
		itemQty ++;
		$(this).parents('.slctedItem').find("input#itemQty").val(itemQty);
		$(this).parents('.slctedItem').find("div.quantity-div").html(itemQty);
		$(this).parents('.slctedItem').find(".price .item-price").html(costPrice*itemQty);
		// update total cost
		var pricelist = $(".prices-wrap").find(".price .item-price");
		var totalPrice = 0;
		$.each(pricelist, function(i, price){
			totalPrice += parseFloat($(price).text());
		});
			var vatPercents = $('[name="vatPercents"]').val();
			vat = parseFloat((totalPrice/100)*vatPercents);
			grand_total = parseFloat(totalPrice+vat);
		$("input#txtTotalOrderAmount").val(totalPrice);
		$('.subTotal.amount').text('$'+totalPrice.toFixed(2));
		$('.vat.amount').text('$'+vat.toFixed(2));
		$('.total.amount').text('$'+grand_total.toFixed(2));
		/*----------*/
		/*return false
	});*/
	//dicrease item quantity
	/*$(".decreaseQty").on('click', function() {
		var itemQty		= $(this).parents('.slctedItem').find("input#itemQty").val();
		var costPrice	= $(this).parents('.slctedItem').find("input#costPrice").val();
		itemQty --;
			if(itemQty){
			$(this).parents('.slctedItem').find("input#itemQty").val(itemQty);
			$(this).parents('.slctedItem').find("div.quantity-div").html(itemQty);
			$(this).parents('.slctedItem').find(".price .item-price").html(costPrice*itemQty);
		}
		// update total cost
		var pricelist = $(".prices-wrap").find(".price .item-price");
		var totalPrice = 0;
		$.each(pricelist, function(i, price){
			totalPrice += parseFloat($(price).text());
		});
			var vatPercents = $('[name="vatPercents"]').val();
			vat = parseFloat((totalPrice/100)*vatPercents);
			grand_total = parseFloat(totalPrice+vat);
		$("input#txtTotalOrderAmount").val(totalPrice);
		$('.subTotal.amount').text('$'+totalPrice.toFixed(2));
		$('.vat.amount').text('$'+vat.toFixed(2));
		$('.total.amount').text('$'+grand_total.toFixed(2));
			/*----------*/
		/*return false
	});*/
	// get waiter tables
	var waiter = $('[name="waiter"]:checked').val();
	if(!waiter) waiter='N/A';
	$.post("./includes/general.php?action=searchRec&dest=getWaiterTables", { waiter:waiter }, function(data) {
		$('.tables-tab').html(data);
	});
	/*$('[name="waiter"]:checked').on('click', function() {alert();
  		var waiter = $('[name="waiter"]:checked').val();
  		$.post("./includes/general.php?action=searchRec&dest=getWaiterTables", { waiter:waiter }, function(data) {
  			$('.tables-tab').html(data);
  		});
  	});*/
	// display selected table on allocation tab
	/*$('[name="tableID"]').on('click', function(e) {
		$(':input[value="tables"]').attr("checked",true);
		var tableID = $('[name="tableID"]:checked').val();
		$.post("./includes/general.php?action=searchRec&dest=getTableName", { tableID:tableID }, function(data) {
			$('.selection-type p').html(data);
  		});
  		// hide allocation popup
		$("input#hotelTables").prop('checked', false);
  	});*/
	// display selected client on allocation tab
  	$('[name="txtClients"]').on('change', function(e) {
		$(':input[value="book"]').attr("checked",true);

		var clientName = $("input#client").val();
		$('.selection-type p').html(clientName);
  		// hide allocation popup
		$("input#bookClients").prop('checked', false);
  	});
	// display selected room or hall on allocation tab
	$('[name="allocationID"]').on('click', function(e) {
		$(':input[value="hotel"]').attr("checked",true);
		var allocID = $('[name="allocationID"]:checked').val();
		var clientName = $('[name="allocationID"]:checked').attr("alt");
		$.post("./includes/general.php?action=searchRec&dest=getAllocName", { allocID:allocID }, function(data) {
			$('.selection-type p').html(data+"-"+clientName);
  		});
  		// hide popup
		$("input#hotelRooms").prop('checked', false);
	});
}
//
function emulateWaiterTables(waiter) {
	$.post("./includes/general.php?action=searchRec&dest=getWaiterTables", { waiter:waiter }, function(data) {
		$('.tables-tab').html(data);
	});

	if(restrictedMealPkgs == 'yes') {
		if(myRole == 'cashier' || myRole == 'waiter') {
			console.log(waiter)
			$.post("./includes/general.php?action=searchRec&dest=getWaiterPackages", { waiter:waiter }, function(data) {
				$('.packages').html(data)
				$('[name="package"]:checked').trigger('click');
			});
		}
	}
}
//
function emulateTablePanel(tableID,tableName) {
	$(':input[value="tables"]').attr("checked",true);
	//var tableID = $('[name="tableID"]:checked').val();
	//alert(tableID)
	/*$.post("./includes/general.php?action=searchRec&dest=getTableName", { tableID:tableID }, function(data) {
		$('.selection-type p').html(data);
		});*/
		$('.selection-type p').html(tableName);
		// hide allocation popup
	$("input#hotelTables").prop('checked', false);
}
//
function check_addWMealOrder() {
	var tableID 		= $('input[name="tableID"]:checked').val();
	var allocationID 	= $('[name="allocationID"]:checked').val();
	var waiter 			= $('[name="waiter"]:checked').val();
	var clientType 		= $('[name="clientType"]:checked').val();
	var listItem		= $(".prices-wrap .slctedItem").height();

	let myWhouse 	= $('input[name="myWhouse"]').val();
	let directRcpt 	= $('input[name="directRcpt"]:checked').val();
	let clientID 	= $('input[name="clientID"]').val();

	let recordType = [];
	let mealItemNotes = [];
	let packageID = [];
	let mealID = [];
	let itemQty = [];
	let costPrice = [];
	let vatPercents = [];
	let txtTotalOrderAmount = [];

	$('.record.values.slctedItem').each((i, el) => {
		if(el) {
			recordType.push($(el).find('input[name^="recordType"]').val())
			mealItemNotes.push($(el).find('input[name^="mealItemNotes"]').val())
			packageID.push($(el).find('input[name^="packageID"]').val());
			mealID.push($(el).find('input[name^="mealID"]').val())
			itemQty.push($(el).find('input[name^="itemQty"]').val())
			costPrice.push($(el).find('input[name^="costPrice"]').val())
			vatPercents.push($(el).find('input[name="vatPercents"]').val())
			txtTotalOrderAmount.push($(el).find('input[name="txtTotalOrderAmount"]').val());

		}
	})

	console.log(recordType, mealItemNotes, packageID, mealID, itemQty, costPrice, vatPercents, txtTotalOrderAmount)

	// return false;

	// Check if notes popup is on so close the pop
	let checkNotesPopup = $('#addMealItemNotesPopup').attr('checked')

	if(checkNotesPopup && checkNotesPopup == 'checked') {
		$('button#addNoteToMealItem').trigger('click')
		return false
	}

	if(!waiter) {
		swal("Empty Waiter!", "Please select waiter", "info");
		return false;
	}

	if(!listItem) {
		swal("Empty order list!", "Please checkout your order list", "info");
		return false;
	}
	if(clientType=='tables'){
		if(!tableID){
			$('.selection-type p').html("Select order table");
			$('.selection-type p').css('color', '#fff');
			$('.selection-type p').css('background', '#f00');
			$('.selection-type p').css('font-weight', 'bold');
			return false;
		}
	} else if(clientType=='hotel'){
		if(!allocationID){
			$('.selection-type p').html("Select order allocation");
			$('.selection-type p').css('color', '#fff');
			$('.selection-type p').css('background', '#f00');
			$('.selection-type p').css('font-weight', 'bold');
			return false;
		}
	}
	$('.btn-submit').attr('disabled', true)
	$('.btn-submit').prop('disabled', true)
	$('.btn-submit span').html('Processing..')
	// $('.loader.spinner').css('display', 'block')


	let formData = {
		tableID: tableID,
		allocationID:allocationID,
		waiter:waiter,
		clientType:clientType,
		myWhouse:myWhouse,
		directRcpt:directRcpt,
		clientID:clientID,

		recordType:recordType,
		mealItemNotes:mealItemNotes,
		packageID:packageID,
		mealID:mealID,
		itemQty:itemQty,
		costPrice:costPrice,
		costPrice:costPrice,
		costPrice:costPrice,

	}

	// return false;

    $.ajax({
        type: "POST",
        url: `./includes/general.php?action=saveNew&dest=addWMealOrder&addedBy=${myUser}=&myRole=${myRole}`,
        data: formData,
        cache: false,
        success: function(data){
        	console.log(data)
        	let res = JSON.parse(data)
        	let iframe = $(res.iframe);
        	$('body').append(iframe)
        	// return false;
        	if(res.msg == 'added') {
				swal({
	                title:'Success',
	                text: 'Order saved successfully',
	                icon: "success",
	                timer: 1500,
	                button: false
	            }).then(() => {
	            	location.reload();
	            })
			} else {
				swal("Oops", data, 'error');
			}
        },
    });
	return false;
}
function loadMealOrder(pageLimit, perPage, period, task) {
	$("#dataTable div#loading").css("display", "inline");
	var dataString = 'pageLimit='+pageLimit+'&perPage='+perPage+'&period='+period;
	$.ajax({
		type: "POST",
		url: "./includes/general.php?action=loadTable&dest=allMealOrdr&myRole="+myRole+"&myUser="+myUser+"&task="+task,
		data: dataString,
		cache: false,
		timeout: 2000,
		success: function(data){
			// console.log(data)
			// return false
			let res = JSON.parse(data)
			let result = res.data
			data4Merge = res.data4Merge
			simplifyMerge(data4Merge)
			// console.log(data4Merge)
			$("#dataTable div#loading").css("display", "none");
			$(".load_more_link").addClass('noneLink');
			$("#dataTable .load-data").html(result);
		},
	});
	return false;
}
//
function slcPaymentAcc(payBtnNum,orderID,txtDigit,txtAmount,balance,orderFrom) {
	let popUp = $('input#slcPaymentAcc').parents('aside.slcPaymentAcc')[0]
	let btn = $(popUp).find('#receiptBnt')[0]
	// console.log(btn)
	document.getElementById('slcPaymentAcc').checked = true
	$(btn).attr('onclick', `return payRstBlance('${payBtnNum}', '${orderID}', '${txtDigit}', '${txtAmount}', '${balance}', '${orderFrom}', this)`)
	$(btn).html(`Receipt $${txtAmount}`)
}
function payRstBlance(payBtnNum,orderID,txtDigit,txtAmount,balance,orderFrom, btn = false) {
	let bankID = null
	let accNumber = null

	if(btn) {
		let popUp = $(btn).parents('aside.slcPaymentAcc')[0]
		let input = $(popUp).find('input.slcBank:checked')[0]

		bankID = $(input).data().id
		accNumber = $(input).data().num
	}

	// console.log(bankID, accNumber)
	// return false;

	if(txtAmount > balance) {
		swal("Oops", "Amount can't be greater than $"+balance, "error");
		$(this).parents("div.cave.button").parent("div.record").find("input#txtAmount").css("border", "1px solid #f00");
		return false;
	}

	if((orderFrom=="inside")&&(txtAmount<0.1)) {
		swal("Oops", "Amount can't be 0", "error");
		$(this).parents("div.cave.button").parent("div.record").find("input#txtAmount").css("border", "1px solid #f00");
		return false;
	}

	$.post("./includes/general.php?action=updateExist&dest=payRstBlance&updatedBy="+myUser, { myRole:myRole, orderID:orderID, txtAmount:txtAmount, txtDigit:txtDigit,  myWhouse:myWhouse, bankID:bankID, accNumber:accNumber }, function(data) {
		var addedpos = data.search("updated");
		var addedVat = data.search("addedVat");
		if(addedpos==0) {
			var lastID = data.slice(8,25);
			swal({
				title: "Success!",
				text: "You collected sum of $"+txtAmount+" for orderID = "+orderID+".",
				icon: "success",
				timer: 1500,
				button: false
			}).then(value=> {
				location.reload();
			});
		} else if(addedVat==0) {
			swal({
				title: "Success!",
				text: "You collected sum of $"+txtAmount+" for orderID = "+orderID+".",
				icon: "success",
				timer: 1500,
				button: false
			}).then(value=> {
				location.reload();
			});
		} else {
			swal("Oops", data, "error");
		}
	});
	/*swal({
		title: "Are you sure to receipt $"+balance,
		text: "You going to collect balance amount of this order",
		icon: "warning",
		dangerMode:true,
		buttons:["Cancel","'Yes, receipt it!"],
		// closeOnConfirm: false
	}).then(willDelete=> {
		if(willDelete) {
			$.post("./includes/general.php?action=updateExist&dest=payRstBlance&updatedBy="+myUser, { myRole:myRole, orderID:orderID, txtAmount:txtAmount, txtDigit:txtDigit,  myWhouse:myWhouse, bankID:bankID, accNumber:accNumber }, function(data) {
				var addedpos = data.search("updated");
				var addedVat = data.search("addedVat");
				if(addedpos==0) {
					var lastID = data.slice(8,25);
					swal({
						title: "Success!",
						text: "You collected sum of $"+txtAmount+" for orderID = "+orderID+".",
						icon: "success",
						timer: 1500,
						button: false
					}).then(value=> {
						location.reload();
					});
				} else if(addedVat==0) {
					swal({
						title: "Success!",
						text: "You collected sum of $"+txtAmount+" for orderID = "+orderID+".",
						icon: "success",
						timer: 1500,
						button: false
					}).then(value=> {
						location.reload();
					});
				} else {
					swal("Oops", data, "error");
				}
			});
		}
	});*/
	return false;
}
function smplyAddMyOrder(){
	$(".record input#txt4Digits").on("keyup", function() {
		var txt4Digits	= $(this).parents(".record").find("input#txt4Digits").val();
		$("input#txtDigit").val(txt4Digits);
	});
	/*$("a.payRstBlance.orderID").on("click", function() {
		var orderID		= $(this).parents("div.cave.button").parent("div.record").find("input#orderID").val();
		var txtDigit	= $(this).parents("div.cave.button").parent("div.record").find("input#txtDigit").val();
		var txtAmount	= parseFloat($(this).parents("div.cave.button").parent("div.record").find("input#txtAmount").val());
		var balance		= parseFloat($(this).parents("div.cave.button").parent("div.record").find("input#balance").val());
		var orderFrom	= $(this).parents("div.cave.button").parent("div.record").find("input#orderFrom").val();

		if(txtAmount > balance) {
			swal("Oops", "Amount can't be greater than $"+balance, "error");
			$(this).parents("div.cave.button").parent("div.record").find("input#txtAmount").css("border", "1px solid #f00");
			return false;
		}

		if((orderFrom=="inside")&&(txtAmount<0.1)) {
			swal("Oops", "Amount can't be 0", "error");
			$(this).parents("div.cave.button").parent("div.record").find("input#txtAmount").css("border", "1px solid #f00");
			return false;
		}
		swal({
			title: "Are you sure to receipt $"+balance,
			text: "You going to collect balance amount of this order",
			icon: "warning",
			dangerMode:true,
			buttons:["Cancel","'Yes, remove it!"],
			closeOnConfirm: false
		})
		.then(willDelete=> {
			if(willDelete) {
				$.post("./includes/general.php?action=updateExist&dest=payRstBlance&updatedBy="+myUser, { myRole:myRole, orderID:orderID, txtAmount:txtAmount, txtDigit:txtDigit,  myWhouse:myWhouse }, function(data) {
					var addedpos = data.search("updated");
					var addedVat = data.search("addedVat");
					if(addedpos==0) {
						var lastID = data.slice(8,25);
						swal({
							title: "Success!",
							text: "You collected sum of $"+txtAmount+" for orderID = "+orderID+".",
							icon: "success",
							timer: 1500,
							button: false
						})
							.then(value=> {
								location.reload();
							}
						);
					}else if(addedVat==0) {
						swal({
							title: "Success!",
							text: "You collected sum of $"+txtAmount+" for orderID = "+orderID+".",
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
	});*/
	//search type on change
	$('[name="srchType"]').change(function() {
		$("div.suggest").css("display", "none");
		$("input#srchWMealOrder").val('');
	});
	//
	$('.customers-list').css("display","none");
	$('[name="slcPaymentType"]').change(function() {
		slcPaymentType 		= $('[name="slcPaymentType"]').val();
		if(slcPaymentType=='waiter'){
			$('.customers-list').css("display","none");
			$('.order-date, .waiters-list, .w-balance').css("display","inline");
			$('.lbl-today').html(today);
		} else {
			$('.lbl-today').html('');
			$('.order-date, .waiters-list, .w-balance').css("display","none");
			$('.customers-list').css("display","inline");
		}
	});
	$('[name="slcWaiter"]').change(function() {
		waiter 		= $('[name="slcWaiter"]').val();
		paymentDate = $('[name="paymentDate"]').val();
		//
		$.post("./includes/general.php?action=searchRec&dest=getWPaymentInfo", { waiter:waiter, paymentDate:paymentDate }, function(data) {
			$('[name="txtRecieved"]').val(data);
			$('[name="txtDueAmount"]').val(data);
			$('[name="txtNewCash"]').val('0');
			$('[name="txtBalance"]').val(data);
		});
		//
		/*$.post("./includes/general.php?action=searchRec&dest=getWBalanceInfo", { waiter:waiter}, function(data) {
			$('[name="txtTtlBalance"]').val(data);
		});*/
	});
	//
	$('[name="slcCustomer"]').change(function() {
		clientID 	= $('[name="slcCustomer"]').val();
		$.post("./includes/general.php?action=searchRec&dest=getCPaymentInfo", { clientID:clientID }, function(data) {
			$('[name="txtRecieved"]').val(data);
			$('[name="txtDueAmount"]').val(data);
			$('[name="txtNewCash"]').val('0');
			$('[name="txtBalance"]').val(data);
		});
	});
	//
	//
	$('[name="slcCustomer4Disc"]').change(function() {
		clientID 	= $('[name="slcCustomer4Disc"]').val();
		$.post("./includes/general.php?action=searchRec&dest=getCDiscountInfo", { clientID:clientID }, function(data) {

			$('[name="txtDueAmount4Disc"]').val(data);
			$('[name="txtNewDiscount"]').val('');
			$('[name="txtBalance4Disc"]').val(data);
		});
	});
	//
	$('[name="paymentDate"]').change(function() {
		waiter 		= $('[name="slcWaiter"]').val();
		paymentDate = $('[name="paymentDate"]').val();
		$('span.lbl-today').html(paymentDate);
		if(waiter){
			$.post("./includes/general.php?action=searchRec&dest=getWPaymentInfo", { waiter:waiter, paymentDate:paymentDate }, function(data) {
				$('[name="txtRecieved"]').val(data);
				$('[name="txtDueAmount"]').val(data);
				$('[name="txtNewCash"]').val('0');
				$('[name="txtBalance"]').val(data);

			});
		}
	});
	$('[name="txtNewCash"]').keyup(function() {
		var txtDueAmount  	= parseFloat($('[name="txtDueAmount"]').val());
		var txtNewCash 		= parseFloat($('[name="txtNewCash"]').val());
		var txtTtlBalance 	= parseFloat($('[name="txtTtlBalance"]').val());
		var slcPaymentType 	= $('[name="slcPaymentType"]').val();
		//
		if(!txtDueAmount) {txtDueAmount=0;}
		if(!txtNewCash) {txtNewCash=0;}
		//
		balance 	   = txtDueAmount-txtNewCash;

		//
		//
		if(slcPaymentType=='waiter') {
			balance 	   = txtDueAmount-txtNewCash;

			//
			if(txtDueAmount<txtNewCash) {
				$('[name="txtNewCash"]').val(txtDueAmount.toFixed(2));
				$('[name="txtBalance"]').val(0);
			}else {
				$('[name="txtBalance"]').val(balance.toFixed(2));
			}
		} else {
			if(txtDueAmount<txtNewCash) {
				$('[name="txtNewCash"]').val(txtDueAmount.toFixed(2));
				$('[name="txtBalance"]').val(0);
			}else {
				$('[name="txtBalance"]').val(balance.toFixed(2));
			}
		}

	});
	//
	$('[name="txtNewDiscount"]').keyup(function() {
		var txtDueAmount  	= parseFloat($('[name="txtDueAmount4Disc"]').val());
		var txtNewDiscount 		= parseFloat($('[name="txtNewDiscount"]').val());
		var txtTtlBalance 	= parseFloat($('[name="txtTtlBalance4Disc"]').val());

		balance 	   = txtDueAmount-txtNewDiscount;
		//
			if(txtDueAmount<txtNewDiscount) {
				$('[name="txtNewDiscount"]').val(txtDueAmount.toFixed(2));
				$('[name="txtBalance4Disc"]').val(0);
			}else {
				$('[name="txtBalance4Disc"]').val(balance.toFixed(2));
			}


	});

	var slcCustomer = new IconicMultiSelect( {
	    select: '#slcCustomer',
	})
	slcCustomer.init();
	slcCustomer.subscribe(function(e) {
	    if(e.action == 'ADD_OPTION') {
	        clientID    = e.value //$('[name="slcCustomer"]').val();
	        $.post("./includes/general.php?action=searchRec&dest=getCPaymentInfo", { clientID:clientID }, function(data) {
	            $('[name="txtRecieved"]').val(data);
	            $('[name="txtDueAmount"]').val(data);
	            $('[name="txtNewCash"]').val('0');
	            $('[name="txtBalance"]').val(data);

	            $('[name="slcCustomer"]').val(clientID);
	        });
	    } else if(e.action == 'REMOVE_OPTION') {
	        $('[name="txtRecieved"]').val('');
	        $('[name="txtDueAmount"]').val('');
	        $('[name="txtNewCash"]').val('');
	        $('[name="txtBalance"]').val('');
	    }
	})
}
function simplfyOrderContent() {
	$("input#srchCustomer").keyup(function() {
		var passedValue = $("input#srchCustomer").val();
		if(passedValue.val!="") {
			$("div.suggest").css("display", "table-row");
			$.post("./includes/general.php?action=searchRec&dest=srchCustomer", { passedValue: passedValue }, function(data) {
				$("div.suggest").html(data);
			});
		}
	});

	$("input[name='clientType']").change(function() {
		var clientType = $(this).val();
		if(clientType=="takeaway") {
			$(".selection-type p").html('Takeaway');
		}
	});
	//
	$("input[name='tableID']").change(function() {
		//alert($(this).val());
	});
	//
}
function catchClients(clientID, clientName) {
	$("input#clientID").val(clientID);
	$("input#srchCustomer").val(clientName);
	$('.selection-type p').html(clientName);
	$(':input[value="book"]').attr("checked",true);
	$("input#bookClients").prop('checked', false);
	$("div.suggest").css("display", "none");
}
function delMealFromOrder(detailID, orderID, invoiceID,invalidOrders){
	//Check if Order is not matched in tables invoiceDetials,OrderSummary by using AllocationID,InvoiceI and OrderID
	if(invalidOrders<1) {
		swal("LAMA TIRI KARO", "This item can\'t delete", "error");
		return false;
	}
	//
	swal({
		title: "Are you sure to delete?",
		text: "You going to remove this meal from this order!",
		icon: "warning",
		dangerMode:true,
		buttons:["Cancel","'Yes, remove it!"],
		closeOnConfirm: false
	})
	.then(willDelete=> {
		if(willDelete) {
			$.post("./includes/general.php?action=deleteRec&dest=delMealOrdrItem",{ detailID:detailID, orderID:orderID, invoiceID:invoiceID }, function(data){
				if(data=="deleted") {
					location.reload();
				} else {
					swal("Oops!", data, "error");
				}
			});
		}
	});
	return false;
}
function editMealOrderDiscount(orderID, olDisc, roughtTtl, vatvalue){

	swal({
		title: "Order Discount",
		text: 'Please provide discount',
		content: "input",
		buttons:["Cancel","Save"]
	})
	.then(newDiscount=> {
		var amntReg = /[0-9]/;
		if (newDiscount) {
			if(newDiscount.match(amntReg)) {

				if (newDiscount>=0) {
					if(parseFloat(newDiscount)<=parseFloat(roughtTtl)){
						newDiscount = parseFloat(newDiscount).toFixed(2);
						$("input#txtTheDisc").val(newDiscount);
						$("span.theDiscount").text(newDiscount);
						swal.close();
					}
				}
			}
		}

	});
	return false;
}
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
			$.post("./includes/general.php?action=updateExist&dest=closeOrder",{ orderID:orderID }, function(data){
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
function check_searchBox() {
	// search MealPackage
	$("input#srchMealPackage").keyup(function() {
		var passedValue = $("input#srchMealPackage").val();
		if(passedValue.val!="") {
			$("div.suggest.two").css("display", "table-row");
			$.post("./includes/general.php?action=searchRec&dest=srchMealPackage", { passedValue:passedValue }, function(data){
				$("div.suggest.two").html(data);
			});
		}
	});
	$("input#srchMealPackage").blur(function() {
		if($("#srchMealPackage").val()=="") {
			$("div.suggest.two").css("display", "none");
		}
	});
	// search MealItem
	$("input#srchMealItem").keyup(function() {
		var passedValue = $("input#srchMealItem").val();
		if(passedValue.val!="") {
			$("div.suggest.one").css("display", "table-row");
			$.post("./includes/general.php?action=searchRec&dest=srchMealItem", { passedValue: passedValue }, function(data) {
				$("div.suggest.one").html(data);
			});
		}
	});
	$("input#srchMealItem").blur(function() {
		if($("#srchMealItem").val()=="") {
			$("div.suggest.one").css("display", "none");
		}
	});
}
function catchMealPackage(recID) {
	$.post("./includes/general.php?action=get_recInfo&dest=getMealPackage", { recID: recID, myUser: myUser, myRole: myRole }, function(data) {
		$("div.twoCols.two header span").html('[1 row]');
		$("div.dynamicData.two").html(data);
	});
	$("div.suggest.two").css("display", "none");
}
function catchMealItem(recID) {
	$.post("./includes/general.php?action=get_recInfo&dest=getMealItem", { recID: recID, myUser: myUser, myRole: myRole }, function(data) {
		$("div.twoCols.one header span").html('[1 row]');
		$("div.dynamicData.one").html(data);
	});
	$("div.suggest.one").css("display", "none");
}
function catchWMealOrder(recID) {
	$.post("./includes/general.php?action=get_recInfo&dest=getWMealOrder", { recID:recID, myUser:myUser, myRole:myRole }, function(data) {
		$("div#foundNum").html('<label id="count">1</label> record has been selected.<span id="refresh"></span>');
		$("div#dataTable").html(data);
	});
	$("div.suggest").css("display", "none");
}
function searchMealOrder() {
	var passedValue = $("input#srchWMealOrder").val();
	var srchType = $('[name="srchType"]').val();
	var perPage 	= $("#slcPerPage").val();
	if(passedValue){
		$.post("./includes/general.php?action=get_recInfo&dest=getWMealOrder", { passedValue:passedValue, srchType:srchType, perPage:perPage, myUser:myUser, myRole:myRole }, function(data) {
			//alert(data);
			$("div#foundNum").html('<label id="count">'+data.split("||")[0]+'</label> record has been selected.<span id="refresh"></span>');
			$("div#dataTable").html(data.split("||")[1]);
		});
	}
}
//
//
function addWPayment() {
	slcPaymentType 	= $('[name="slcPaymentType"]').val();
	slcCustomer 	= $('[name="slcCustomer"]').val();
	paymentDate 	= $('[name="paymentDate"]').val();
	slcWaiter 		= $('[name="slcWaiter"]').val();
	txtRecieved 	= $('[name="txtRecieved"]').val();
	txtDueAmount 	= $('[name="txtDueAmount"]').val();
	txtNewCash 		= $('[name="txtNewCash"]').val();
	txtBalance 		= $('[name="txtBalance"]').val();
	tranDate 		= $('[name="tranDate"]').val();

	slcBanAcc       = $('[name="slcBanAcc"] :selected')[0];

	let bankID = null
	let accNumber = null

	 bankID    = $(slcBanAcc).data('id');
	 accNumber = $(slcBanAcc).val();

	// console.log(bankID, accNumber)

	// return false;

	if(slcPaymentType=='waiter'){
		if(!slcWaiter) {
			$("#perror1").css("display", "inline");
			$("#perror1").html("Please select waiter");
			$('[name="slcWaiter"]').css("border-color", "#FF0000");
			return false;
		} else { clearErrors(); }
	} else {
		if(!slcCustomer) {
			$("#perror2").css("display", "inline");
			$("#perror2").html("Please select customer");
			$('[name="slcCustomer"]').css("border-color", "#FF0000");
			return false;
		} else { clearErrors(); }
	}
	if(slcPaymentType=='customer'){
		if(!parseFloat(txtRecieved) || !parseFloat(txtDueAmount)) {
			$("#perror3").css("display", "inline");
			$("#perror3").html("Invalid due amount");
			$('[name="txtRecieved"]').css("border-color", "#FF0000");
			$('[name="txtDueAmount"]').css("border-color", "#FF0000");
			return false;
		} else { clearErrors(); }
	}

	if(!parseFloat(txtNewCash)) {
		$("#perror4").css("display", "inline");
		$("#perror4").html("Please enter paid amount");
		$('[name="txtNewCash"]').css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }


	$(".btnAdd.payment").attr("disabled", true);
	$(".btnAdd.payment").html("wait...");
	$("div.suggest.one").css("display", "none");

	$.post("./includes/general.php?action=saveNew&dest=addWPayment&addedBy="+myUser, { slcPaymentType:slcPaymentType, slcCustomer:slcCustomer, paymentDate:paymentDate, slcWaiter:slcWaiter,  txtRecieved:txtRecieved, txtDueAmount:txtDueAmount, txtNewCash:txtNewCash, txtBalance:txtBalance, tranDate:tranDate, myWhouse:myWhouse, addedBy:myUser, bankID:bankID, accNumber:accNumber },function(data){
		if(data=='added') {
			swal({
				title: "Success!",
				text: "You added new customer successfully.",
				icon: "success",
				timer: 1500,
				button: false
			})
			.then(value=> {
				window.location = "./orders-workplace.php?task=myOrders";
			});
		} else {
			swal("Oops!", data, "error");
		}
	});
	return false;
}
function addCDiscount() {

	slcCustomer 	= $('[name="slcCustomer4Disc"]').val();
	txtDueAmount 	= $('[name="txtDueAmount4Disc"]').val();
	txtNewDiscount 	= $('[name="txtNewDiscount"]').val();
	txtBalance 		= $('[name="txtBalance4Disc"]').val();


	if(!slcCustomer) {
		$("#perror2").css("display", "inline");
		$("#perror2").html("Please select customer");
		$('[name="slcCustomer4Disc"]').css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }


	if(!parseFloat(txtNewDiscount)) {
		$("#perror4").css("display", "inline");
		$("#perror4").html("Please enter discount amount");
		$('[name="txtNewDiscount"]').css("border-color", "#FF0000");
		return false;
	} else if(parseFloat(txtNewDiscount)>parseFloat(txtDueAmount)) {
		$("#perror4").css("display", "inline");
		$("#perror4").html("Discount can\'t greater then "+txtDueAmount);
		$('[name="txtNewDiscount"]').css("border-color", "#FF0000");
		return false;
	} else if(parseFloat(txtBalance)<0) {
		$("#perror4").css("display", "inline");
		$("#perror4").html("Discount can\'t greater then "+txtDueAmount);
		$('[name="txtNewDiscount"]').css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }


	$(".btnAdd.discount").attr("disabled", true);
	$(".btnAdd.discount").html("wait...");
	$("div.suggest.one").css("display", "none");

	$.post("./includes/general.php?action=saveNew&dest=addCDiscount&addedBy="+myUser, { slcCustomer:slcCustomer, txtDueAmount:txtDueAmount, txtDueAmount:txtDueAmount, txtNewDiscount:txtNewDiscount, txtBalance:txtBalance, myWhouse:myWhouse, addedBy:myUser },function(data){
		if(data=='added') {
			swal({
				title: "Success!",
				text: "You added new customer successfully.",
				icon: "success",
				timer: 1500,
				button: false
			})
			.then(value=> {
				window.location = "./orders-workplace.php?task=myOrders";
			});
		} else {
			swal("Oops!", data, "error");
		}
	});
	return false;
}
/*------------------------------------------------*/
function loadMealPckgs(pageLimit) {
	$("div.dynamicData.two #loading").css("display", "inline");
	var dataString = 'pageLimit='+ pageLimit+'&perPage='+15;
	$.ajax({
		type: "POST",
		url: "./includes/general.php?action=loadTable&dest=allMealPckgs&myUser="+myUser+"&myRole="+myRole,
		data: dataString,
		cache: false,
		timeout: 2000,
		success: function(result){
			$("div.dynamicData.two #loading").css("display", "none");
			$("div.dynamicData.two .load_more_link").addClass('noneLink');
			$("div.dynamicData.two").append(result);
		}
	});
	return false;
}
function loadMealItems(pageLimit) {
	$("div.dynamicData.one #loading").css("display", "inline");
	var dataString = 'pageLimit='+ pageLimit+'&perPage='+15;
	$.ajax({
		type: "POST",
		url: "./includes/general.php?action=loadTable&dest=allMealItems&myUser="+myUser+"&myRole="+myRole,
		data: dataString,
		cache: false,
		timeout: 2000,
		success: function(result){
			$("div.dynamicData.one #loading").css("display", "none");
			$("div.dynamicData.one .load_more_link").addClass('noneLink');
			$("div.dynamicData.one").append(result);
		}
	});
	return false;
}
function loadMealStations(pageLimit) {
	$("div.dynamicData.stations #loading").css("display", "inline");
	var dataString = 'pageLimit='+ pageLimit+'&perPage='+15;
	$.ajax({
		type: "POST",
		url: "./includes/general.php?action=loadTable&dest=allMealStations&myUser="+myUser+"&myRole="+myRole,
		data: dataString,
		cache: false,
		timeout: 2000,
		success: function(result){
			$("div.dynamicData.stations #loading").css("display", "none");
			$("div.dynamicData.stations .load_more_link").addClass('noneLink');
			$("div.dynamicData.stations").html(result);
		}
	});
	return false;
}
function loadUserPackages(pageLimit) {
	$("div.dynamicData.userPkgs #loading").css("display", "inline");
	var dataString = 'pageLimit='+ pageLimit+'&perPage='+15;
	$.ajax({
		type: "POST",
		url: "./includes/general.php?action=loadTable&dest=allMealUserPkgs&myUser="+myUser+"&myRole="+myRole,
		data: dataString,
		cache: false,
		timeout: 2000,
		success: function(result){
			$("div.dynamicData.userPkgs #loading").css("display", "none");
			$("div.dynamicData.userPkgs .load_more_link").addClass('noneLink');
			$("div.dynamicData.userPkgs").html(result);
		}
	});
	return false;
}
function check_addMealpckge(){
	var pckgName	= $("#pckgName").val();

   	if(pckgName.length < 1) {
		$("#error1").css("display", "inline");
		$("#error1").html("Please provide package name");
		$("#pckgName").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

 	$("label.process").css("display", "inline");
	$("#btnSave").attr("disabled", true);
	$("#btnSave").html("Wait...");

	return true;
}
function check_editMealPckge(){
	var pckgeName 		= $("#pckgeName").val();

	if(pckgeName .length < 1) {
		$("#error1").css("display", "inline");
		$("#error1").html("Please select Type");
		$("#pckgeName").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	$("label.process").css("display", "inline");
	$("#btnUpdate").attr("disabled", true);
	$("#btnUpdate").html("Wait...");

	return true;
}
function check_addMealItem() {
	var itemName	= $("#itemName").val();
	var slcPckge	= $("#slcPckge").val();
	var costPrice	= $("#costPrice").val();
	var slcType		= $("#slcType").val();

   	if(itemName.length < 1) {
		$("#error1").css("display", "inline");
		$("#error1").html("Please provide item name");
		$("#itemName").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(slcPckge=="---"){
		$("#error2").css("display", "inline");
		$("#error2").html("Please provide package name");
		$("#slcPckge").css("border-color", "#FF0000");
		return false;
	} else {clearErrors();}
 	if(costPrice.length < 1) {
		$("#error3").css("display", "inline");
		$("#error3").html("Item cost is missing");
		$("#costPrice").css("border-color", "#FF0000");
		return false;
	} else if(costPrice <= 0) {
		$("#error3").css("display", "inline");
		$("#error3").html("Invalid item cost, please try it");
		$("#costPrice").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }
	 if(slcType=="") {
		 $("#error4").css("display", "inline");
		 $("#error4").html("Please select availability time");
		 $("#slcType").css("border-color", "#FF0000");
		 return false;
   	} else {};


 	$("label.process").css("display", "inline");
	$("#btnSave").attr("disabled", true);
	$("#btnSave").html("Wait...");

	return true;
}
function smplfyAddMItem(){
	$("#slcType").change(function(){
		var slcType = $("#slcType").val();
		if(slcType!=""){
			var starTime = endTime = "";
			if(slcType=="morning" || slcType=="custom"){
				var starTime = "05:00"; var endTime = "11:59";
			} else if(slcType=="afternoon"){
				var starTime = "12:00"; var endTime = "17:59";
			} else if(slcType=="evening"){
				var starTime = "18:00"; var endTime = "23:59";
			} else if(slcType=="all-times"){
				var starTime = "00:00"; var endTime = "23:59";
			} else if(slcType=="all-day"){
				var starTime = "05:00"; var endTime = "17:59";
			} else if(slcType=="all-night"){
				var starTime = "18:00"; var endTime = "04:59";
			}
		} else {
			var starTime = endTime = "";
		}
		$("#starTime").val(starTime);
		$("#endTime").val(endTime);
	});
	//
	$("#starTime, #endTime").bind("change, keyup", function() {
		$("#slcType option:last").attr("selected", "selected");
	});



	$('#slcPckge').on('change', (e) => {
		let {ip, described, orderto} = $('#slcPckge option:selected').data();
		$('[name="orderTo"]').find('option').each((i,el) => {
			if(orderto == $(el).val()) {
				$(el).attr('selected', true)
				$(el).prop('selected', 'selected')
			}
		})
		$('[name="printOrderToIP"]').val(ip)
	})


	$('[name="orderTo"]').on('change', () => {
		let {ip, described, orderto} = $('[name="orderTo"] option:selected').data();
		$('[name="printOrderToIP"]').val(ip)
		console.log(ip)
	})
}
function delMealPckge (packageID){
	swal({
		title: "Are you sure?",
		text: "You going to delete this Meal Package!",
		kicon: "warning",
		dangerMode:true,
		buttons:["Cancel","'Yes, remove it!"],
		closeOnConfirm: false
	})
	.then(willDelete=> {
		if(willDelete) {
			$.post("./includes/general.php?action=deleteRec&dest=delMealPckge", { packageID:packageID }, function(data) {
				if(data=="deleted") {
					swal({
						title: "Success!",
						text: "Selected Meal Package has been deleted.",
						icon: "success",
						timer: 1500,
						button: false
					})
						.then(value=> {
							window.location = "./orders-workplace.php?role="+myRole+"&task=mealMgt";
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
function delMealItem (itemID){
	swal({
		title: "Are you sure?",
		text: "You going to delete this Meal Item!",
		icon: "warning",
		dangerMode:true,
		buttons:["Cancel","'Yes, remove it!"],
		closeOnConfirm: false
	})
	.then(willDelete=> {
		if(willDelete) {
			$.post("./includes/general.php?action=deleteRec&dest=delMealItem", { itemID:itemID }, function(data) {
				if(data=="deleted") {
					swal({
						title: "Success!",
						text: "Selected Meal Item has been deleted.",
						icon: "success",
						timer: 1500,
						button: false
					})
						.then(value=> {
							window.location = "./orders-workplace.php?role="+myRole+"&task=mealMgt";
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
function addMealStation() {
	let mealCtgryOrderTo = $('#mealCtgryOrderTo').val();
	let describedAs 	= $('#describedAs').val();
	let ipAddress 		= $('#ipAddress').val();
	let description 	= $('#description').val();

	if(!mealCtgryOrderTo) {
		$("#error1").css("display", "inline");
		$("#error1").html("Please select category");
		$("#mealCtgryOrderTo").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(!describedAs) {
		$("#error2").css("display", "inline");
		$("#error2").html("Please provide described as.");
		$("#describedAs").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(!ipAddress) {
		$("#error2").css("display", "inline");
		$("#error2").html("Please provide IP Address.");
		$("#ipAddress").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	$.post("./includes/general.php?action=saveNew&dest=addMealStation&addedBy="+myUser, {mealCtgryOrderTo, describedAs, ipAddress, description}, function(data) {
		console.log(data)
		if(data=="saved") {
			swal({
				title: "Success!",
				text: "Meal station order to is successfully saved.",
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
function editMealStation(e) {
	let mealCtgryOrderTo = $(e).parents('.popupBody').find('#mealCtgryOrderTo').val();
	let describedAs 	= $(e).parents('.popupBody').find('#describedAs').val();
	let ipAddress 		= $(e).parents('.popupBody').find('#ipAddress').val();
	let description 	= $(e).parents('.popupBody').find('#description').val();
	let printOrderToID 	= $(e).parents('.popupBody').find('#printOrderToID').val();
	let slcStatus 		= $(e).parents('.popupBody').find('#slcStatus').val();

	if(!mealCtgryOrderTo) {
		$(e).parents('.popupBody').find("#error1").css("display", "inline");
		$(e).parents('.popupBody').find("#error1").html("Please select category");
		$(e).parents('.popupBody').find("#mealCtgryOrderTo").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(!describedAs) {
		$(e).parents('.popupBody').find("#error2").css("display", "inline");
		$(e).parents('.popupBody').find("#error2").html("Please provide described as.");
		$(e).parents('.popupBody').find("#describedAs").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(!ipAddress) {
		$(e).parents('.popupBody').find("#error2").css("display", "inline");
		$(e).parents('.popupBody').find("#error2").html("Please provide IP Address.");
		$(e).parents('.popupBody').find("#ipAddress").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	$.post("./includes/general.php?action=updateExist&dest=editMealStation&addedBy="+myUser, {mealCtgryOrderTo, describedAs, ipAddress, description, printOrderToID, slcStatus}, function(data) {
		console.log(data)
		if(data=="updated") {
			swal({
				title: "Success!",
				text: "Meal station order to is successfully Updated.",
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
function delMealOrderStation (printOrderToID){
	swal({
		title: "Are you sure?",
		text: "You going to delete this Meal order station!",
		icon: "warning",
		dangerMode:true,
		buttons:["Cancel","'Yes, remove it!"],
		closeOnConfirm: false
	})
	.then(willDelete=> {
		if(willDelete) {
			$.post("./includes/general.php?action=deleteRec&dest=delMealOrderStation", { printOrderToID:printOrderToID }, function(data) {
				if(data=="deleted") {
					swal({
						title: "Success!",
						text: "Selected Meal order station has been deleted.",
						icon: "success",
						timer: 1500,
						button: false
					})
						.then(value=> {
							window.location = "./orders-workplace.php?role="+myRole+"&task=mealMgt";
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
function addUserPkges() {
	let slcUser = $('#slcUser').val();
	let slcUserPkges 	= $('#slcUserPkges').val();

	if(!slcUser) {
		$("#error111").css("display", "inline");
		$("#error111").html("Please select user");
		$("#slcUser").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(!slcUserPkges) {
		$("#error222").css("display", "inline");
		$("#error222").html("Please select package.");
		$("#slcUserPkges").css("border-color", "#FF0000");
		return false;
	}

	$.post("./includes/general.php?action=saveNew&dest=addUserPkges&addedBy="+myUser, {slcUserPkges, slcUser}, function(data) {
		console.log(data)
		if(data=="saved") {
			swal({
				title: "Success!",
				text: "Meal station order to is successfully saved.",
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

function editUserAllowedPkgs(e) {
	let slcUser = $(e).parents('.popupBody').find('#slcUser').val();
	let slcUserPkges 	= $(e).parents('.popupBody').find('#slcUserPkges').val();

	if(!slcUser) {
		$(e).parents('.popupBody').find("#error1").css("display", "inline");
		$(e).parents('.popupBody').find("#error1").html("Please select user");
		$(e).parents('.popupBody').find("#slcUser").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(!slcUserPkges) {
		$(e).parents('.popupBody').find("#error2").css("display", "inline");
		$(e).parents('.popupBody').find("#error2").html("Please select packages.");
		$(e).parents('.popupBody').find("#slcUserPkges").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	$.post("./includes/general.php?action=updateExist&dest=editUserAllowedPkgs&addedBy="+myUser, {slcUser, slcUserPkges}, function(data) {
		console.log(data)
		if(data=="updated") {
			swal({
				title: "Success!",
				text: "User allowed packages is successfully Updated.",
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
function delUserAllowedPkgs (username){
	swal({
		title: "Are you sure?",
		text: "You going to delete this user's allowed packages record!",
		icon: "warning",
		dangerMode:true,
		buttons:["Cancel","'Yes, remove it!"],
		closeOnConfirm: false
	})
	.then(willDelete=> {
		if(willDelete) {
			$.post("./includes/general.php?action=deleteRec&dest=delUserAllowedPkgs", { username:username }, function(data) {
				if(data=="deleted") {
					swal({
						title: "Success!",
						text: "Selected records has been deleted.",
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
/* --------------------------------------------------------------
------------------------- table management ----------------------
----------------------------------------------------------------- */

function loadTables(pageLimit, perPage) {
	$("div.dynamicData.one #loading").css("display", "inline");
	var dataString = 'pageLimit='+ pageLimit+'&perPage='+15;
	$.ajax({
		type: "POST",
		url: "./includes/general.php?action=loadTable&dest=allTables&myRole="+myRole+"&myUser="+myUser,
		data: dataString,
		cache: false,
		timeout: 2000,
		success: function(result){
			$("div.dynamicData.one #loading").css("display", "none");
			$("div.dynamicData.one .load_more_link").addClass('noneLink');
			$("div.dynamicData.one").append(result);
		},
	});
	return false;
}
function check_addTable(){
	var tableName	= $("#tableName").val();
	var bColor		= $("#bColor").val();
	var fColor		= $("#fColor").val();

	var defaultTable	= $("input#defaultTable:checked").val();
	if(defaultTable!="on") { var defaultTable="No"; } else { var defaultTable="Yes"; }

   	if(tableName.length < 1) {
		$("#error1").css("display", "inline");
		$("#error1").html("Please provide table name");
		$("#tableName").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

 	$("label.process").css("display", "inline");
	$("#btnSave").attr("disabled", true);
	$("#btnSave").html("Wait...");

	$.post("./includes/general.php?action=saveNew&dest=addTable&addedBy="+myUser, { tableName:tableName, bColor:bColor,  fColor:fColor, defaultTable:defaultTable }, function(data) {
		var addedpos = data.search("added");
		$("label.process").css("display", "none");
		if(addedpos==0) {
			var lastID = data.slice(6,21);
			swal({
				title: "Success!",
				text: "You added new table successfully.",
				icon: "success",
				timer: 1500,
				button: false
			})
				.then(value=> {
					window.location = "./orders-workplace.php?role="+myRole+"&task=tableMgt";
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
function loadUserTables(pageLimit, perPage) {
	$("div.dynamicData.two #loading").css("display", "inline");
	var dataString = 'pageLimit='+ pageLimit+'&perPage='+15;
	$.ajax({
		type: "POST",
		url: "./includes/general.php?action=loadTable&dest=allUsrTbles&myRole="+myRole+"&myUser="+myUser,
		data: dataString,
		cache: false,
		timeout: 2000,
		success: function(result){
			$("div.dynamicData.two #loading").css("display", "none");
			$("div.dynamicData.two .load_more_link").addClass('noneLink');
			$("div.dynamicData.two").append(result);
		},
	});
	return false;
}
function add2List4UsrTable() {
	var slcTable	= $("#slcTable").val();
	var slcTable2	= $("#slcTable :selected").text();

	if(slcTable == "---") {
		$("#error2").css("display", "inline");
		$("#error2").html("Please select table");
		$("#slcTable").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	$("div.list").append('<div class="listItem num'+num+'">\
		<div class="cave serial"><input type="hidden" name="tableID[]" value="'+slcTable+'" /></div>\
		<div class="cave jumbo">'+slcTable2+'</div>\
		<div class="cave last"><a id="remove" onclick="return removeItem('+num+');">remove</a></div>\
	</div>');

	$("select#slcTable option:first").attr('selected', 'selected');

	num++;
	return false;
}
function check_addUserTable() {
	var slcUser		= $("#slcUser").val();
	var listItem	= $("div.theForm .listItem").height();

	if(slcUser == "---") {
		$("#error1").css("display", "inline");
		$("#error1").html("Please select waiter");
		$("#slcUser").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(listItem<1) {
		$("#error3").css("display", "inline");
		$("#error3").html("You must assign at least one table to this waiter");
		return false;
	} else { clearErrors(); }

	$("label.process").css("display", "inline");
	$("#btnSave").attr("disabled", true);
	$("#btnSave").html("Wait...");

	return true;
}
function addDrct4UsrTable() {
	var slcUser		= $("#slcUser").val();
	var slcTable	= $("#slcTable").val();

	if(slcTable == "---") {
		$("#error2").css("display", "inline");
		$("#error2").html("Please select table");
		$("#slcTable").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	$.post("./includes/general.php?action=saveNew&dest=addDrct4UsrTable&addedBy="+myUser, { slcUser:slcUser, slcTable:slcTable }, function(data) {
		var addedpos = data.search("added");
		$("label.process").css("display", "none");
		if(addedpos==0) {
			var lastID = data.slice(6,21);
			swal({
				title: "Success!",
				text: "You assigned new table to "+slcUser+" successfully.",
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
	return false;
}
function delUsrTable(recID, username) {
	swal({
		title: "Are you sure?",
		text: "You going to un-assign this table from "+username+"!",
		icon: "warning",
		dangerMode:true,
		buttons:["Cancel","'Yes, remove it!"],
		closeOnConfirm: false
	})
	.then(willDelete=> {
		if(willDelete) {
			$.post("./includes/general.php?action=deleteRec&dest=delUsrTable", { recID:recID, username:username }, function(data) {
				if(data=="deleted") {
					swal({
						title: "Success!",
						text: "Selected table has been removed from "+username+".",
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
function check_editTable() {
	var tableID		= $("#tableID").val();
	var tblName		= $("#tblName").val();
	var bColor 		= $("#bColor").val();
	var fColor 		= $("#fColor").val();
	var slcStatus 	= $("#slcStatus").val();

	var defaultTable	= $("input#defaultTable:checked").val();
	if(defaultTable!="on") { var defaultTable="No"; } else { var defaultTable="Yes"; }

	if(tblName.length < 1) {
		$("#error1").css("display", "inline");
		$("#error1").html("Table name is missing");
		$("#tblName").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	$("label.process").css("display", "inline");
	$("#btnUpdate").attr("disabled", true);
	$("#btnUpdate").html("Wait...");

	$.post("./includes/general.php?action=updateExist&dest=editTable&updatedBy="+myUser, { tableID:tableID, tblName:tblName,bColor:bColor, fColor:fColor, slcStatus:slcStatus, defaultTable:defaultTable }, function(data) {
		$("label.process").css("display", "none");
		if(data=="updated") {
			swal({
				title: "Success!",
				text: "You updated table details successfully.",
				icon: "success",
				timer: 1500,
				button: false
			})
				.then(value=> {
					window.location = "./orders-workplace.php?role="+myRole+"&task=tableMgt";
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
function delTable(tableID){
	swal({
		title: "Are you sure?",
		text: "You going to delete this Table!",
		icon: "warning",
		dangerMode:true,
		buttons:["Cancel","'Yes, remove it!"],
		closeOnConfirm: false
	})
	.then(willDelete=> {
		if(willDelete) {
			$.post("./includes/general.php?action=deleteRec&dest=delTable", { tableID:tableID }, function(data) {
				if(data=="deleted") {
					swal({
						title: "Success!",
						text: "Selected Table  has been deleted.",
						icon: "success",
						timer: 1500,
						button: false
					})
						.then(value=> {
							window.location = "./orders-workplace.php?role="+myRole+"&task=tableMgt";
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
function clearMyPage() {
	location.reload();
}

/*---------------------------------------------------*/

function addLoyaltyGroup() {
	txtGroup 		= $('[name="txtGroup"]').val();
	maxPoints 		= $('[name="maxPoints"]').val();
	minPoints 		= $('[name="minPoints"]').val();
	pointsVal 		= $('[name="pointsVal"]').val();
	redeemVal 		= $('[name="redeemVal"]').val();

	if(!txtGroup) {
		$("#lerror1").css("display", "inline");
		$("#lerror1").html("Please provide group name");
		$('[name="txtGroup"]').css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(!maxPoints) {
		$("#lerror2").css("display", "inline");
		$("#lerror2").html("Enter maximum points");
		$('[name="maxPoints"]').css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(!minPoints) {
		$("#lerror3").css("display", "inline");
		$("#lerror3").html("Enter minimum points");
		$('[name="minPoints"]').css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(!pointsVal) {
		$("#lerror4").css("display", "inline");
		$("#lerror4").html("Enter points value");
		$('[name="pointsVal"]').css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(!redeemVal) {
		$("#lerror5").css("display", "inline");
		$("#lerror5").html("Enter redeem value");
		$('[name="redeemVal"]').css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }


	$("#btnAdd").attr("disabled", true);
	$("#btnAdd").html("wait...");

	$.post("./includes/general.php?action=saveNew&dest=addLoyaltyGroup&addedBy="+myUser, { txtGroup:txtGroup, maxPoints:maxPoints, minPoints:minPoints, pointsVal:pointsVal, redeemVal:redeemVal, addedBy:myUser },function(data){
		var addedpos = data.search("added");
		if(addedpos==0) {
			swal({
				title: "Success!",
				text: "You added new customer successfully.",
				icon: "success",
				timer: 1500,
				button: false
			});
			window.location = "./orders-workplace.php?task=loyalty";
		} else {
			swal("Oops!", data, "error");
		}
	});
	return false;
}
function loadLoyalty(pageLimit, perPage) {
	$("div.dynamicData.one #loading").css("display", "inline");
	var dataString = 'pageLimit='+ pageLimit+'&perPage='+15;
	$.ajax({
		type: "POST",
		url: "./includes/general.php?action=loadTable&dest=allLoyaltyGroup&myRole="+myRole+"&myUser="+myUser,
		data: dataString,
		cache: false,
		timeout: 2000,
		success: function(result){
			$("div.dynamicData.one #loading").css("display", "none");
			$("div.dynamicData.one .load_more_link").addClass('noneLink');
			$("div.dynamicData.one").append(result);
		},
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
		url: "./includes/general.php?action=loadTable&dest=allClients&myRole="+myRole+"&myUser="+myUser,
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
function check_addClient(page = '') {
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

	$.post("./includes/general.php?action=saveNew&dest=addCustomer&addedBy="+myUser, { fullname:fullname, gender:gender, natnlity:natnlity, phone:phone, qrCode:qrCode, email:email, address:address, facebook:facebook, twitter:twitter, slcStatus:slcStatus },function(data){
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
			}).then(value=> {
				if(page == 'orders') {
					$("input#clientID").val(lastID);
					$("input#srchCustomer").val(fullname);
					$('.selection-type p').html(fullname);
					$(':input[value="book"]').attr("checked",true);
					$("input#bookClients").prop('checked', false);
					$("input#addNewCustomer").prop('checked', false);
					// $("div.suggest").css("display", "none");
				} else {
					window.location = "./orders-workplace.php?role="+myRole+"&task=customerMgt&subtask=showInfo&recID="+lastID;
				}
			});
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

	$.post("./includes/general.php?action=updateExist&dest=editClient&updatedBy="+myUser, { clientID:clientID, fullname:fullname, gender:gender, natnlity:natnlity, phone:phone, email:email, address:address, facebook:facebook, twitter:twitter, status:status, bookedFor:bookedFor },function(data){
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
					window.location = "./orders-workplace.php?role="+myRole+"&task=customerMgt&subtask=showInfo&recID="+clientID;
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
//
function check_addCustomerDeposit() {
	var clientID	= $("#clientID").val();
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

	$.post("./includes/general.php?action=saveNew&dest=addCustomerDeposit&addedBy="+myUser, { clientID:clientID, txtAmount:txtAmount, slcBankID:slcBankID, slcBankAcc:slcBankAcc, transDate:transDate },function(data){
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
function check_refundCustomerDeposit() {
	var clientID		= $("#clientID4deposit").val();
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

	$.post("./includes/general.php?action=saveNew&dest=refundCustomerDeposit&addedBy="+myUser, { clientID:clientID, txtAmount:txtAmount, slcBankID:slcBankID, slcBankAcc:slcBankAcc, transDate:transDate },function(data){
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
			$.post("./includes/general.php?action=deleteRec&dest=delClientDeposit", { recID:recID,clientID:clientID,depositAmount:depositAmount}, function(data) {
				if(data=="deleted") {
					swal({
						title: "Success!",
						text: "Selected record has been deleted.",
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
/*---------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------*/
function chngOrderType() {
	$.post("./includes/general.php?action=updateExist&dest=chngOrderType",{ },function(data){
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
//
function chngOrderDesgn() {
	$.post("./includes/general.php?action=updateExist&dest=chngOrderDesgn",{ },function(data){
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
//
function chnagePrintStatus(orderID, details = false) {
	swal({
		title: "Are you sure?",
		text: "You going to change order print status",
		icon: "warning",
		dangerMode:true,
		buttons:["Cancel","'Yes, change it!"],
		closeOnConfirm: false
	})
	.then(willDelete=> {
		if(willDelete) {
			$.post("./includes/general.php?action=updateExist&dest=chnagePrintStatus",{ orderID:orderID, details:details},function(data){
				if(data=="updated") {
					window.location = "../prints/print.php?report=mealOrder&printType=all&recID="+orderID;
				} else {
					swal("Oops!", data, "error");
				}
			});
		}
	});
}
function simplifyMealItemNotes(mealIDPass = false) {
	$(document).on('click', '.record .col.name', (ele) => {
		let record = $(ele.target).parents('.record.values.slctedItem');
		let mealID = $(record).find('input#mealID').val();
		if(!mealID)  {
			swal('Oops', 'No meal item selected.', 'error');
			return false;
		}

		let popup = $('.popup-box.addMealItemNotesPopup')
		$(popup).find('#mealID4Notes').val(mealID)
		$(popup).find('.addedItemsNotes .notes-added')
		$(popup).find('.addedItemsNotes .notes-added').html('')

		let inputVal = $(record).find('input.mealItemNotes').val();
		if(inputVal && inputVal.length > 0) {
			// console.log(inputVal.split(','))
			inputVal.split(',').map((note) => {
				let notDiv = `<div class="note-added" >
					<span class="note-text">${note}</span>
					<span class="rmveNote" >&times;</span>
				</div>`
				$(popup).find('.addedItemsNotes .notes-added').append(notDiv)
			})
		}

		let recordClass = $(record).attr('class').trim().split(' ').join('.')
		$(popup).find('#recordNumber').val(recordClass)

		// Get meal item notes
		$.post("./includes/general.php?action=get_recInfo&dest=get_mealItemNotes",{mealID:mealID},function(data){
			$(popup).find('#mealItemNotes').html(data)
			if(!data) $('#itemNoteNotFound').val(false)
			$(popup).find('#addMealItemNotesPopup').attr('checked', true)
			$(popup).find('#addMealItemNotesPopup').prop('checked', true)
		});
	})

	$('#srchMealItemNotes').on('change', () => {
		let notesAdded = [];
		let note = $('#srchMealItemNotes').val();
		if(note) {
			let popup = $('.popup-box.addMealItemNotesPopup')
			let noteFound = $('#itemNoteNotFound').val();
			let mealID = $(popup).find('#mealID4Notes').val();
			// console.log(noteFound)
			if(noteFound == 'false') {
				$.post("./includes/general.php?action=get_recInfo&dest=new_mealItemNote",{mealID:mealID, note:note},function(data){
					$(popup).find('#mealItemNotes').html(data)
				});
			}

			let notDiv = `<div class="note-added" >
				<span class="note-text">${note}</span>
				<span class="rmveNote" >&times;</span>
			</div>`

			$(".note-added").each((i, el) => {
				if(el) {
					notesAdded.push($(el).find('.note-text').text())
				}
			})

			// console.log(notesAdded)
			if(!notesAdded.includes(note)){
				$(popup).find('.addedItemsNotes .notes-added').append(notDiv)
			}
			notesAdded.push(note)
			$('#srchMealItemNotes').val('');
		}
		return false
	})
	$('#srchMealItemNotesBtn').click(() => {
		$('#srchMealItemNotes').trigger('change')
	})

	$(document).on('click', '.note-added', (el) => {
		$(el.currentTarget).fadeOut(500, function(){ $(this).remove(); });
		let thisNote = $(el.currentTarget).find('.note-text').text().trim()

		// Remove note item from record input
		let popup = $(el.target).parents('.popup-box.addMealItemNotesPopup')
		let recordClass = $(popup).find('#recordNumber').val();
		let record = $('.'+recordClass)

		let inputVal = $(record).find('input.mealItemNotes').val();
		if(inputVal && inputVal.length > 0) {
			inputVal = inputVal.split(',')
			let index = inputVal.indexOf(thisNote)
			if(index !== -1) inputVal.splice(index, 1)
			$(record).find('input.mealItemNotes').val(inputVal.join(','))
		}
	})

	// Add Note
	$('button#addNoteToMealItem').click((el) => {
		let popup = $(el.target).parents('.popup-box.addMealItemNotesPopup')
		let recordClass = $(popup).find('#recordNumber').val();

		console.log(recordClass)
		let record = $('.'+recordClass)
		let note = "";

		let input = $(record).find('input.mealItemNotes')

		$(popup).find(".note-added").each((i, el) => {
			if(el) {
				note +=',' + $(el).find('.note-text').text()
			}
		})
		note = note.substring(1)

		if(input.length > 0) {
			$(input).val(note)
		} else {
			input = `<input type="hidden" value="${note}" class="mealItemNotes" name="mealItemNotes[]" />`
			$(record).append(input)
		}

		$(popup).find('#mealItemNotes').html('')
		$(popup).find('.addedItemsNotes .notes-added').html('')

		// Add class has-note to record
		$(record).addClass('has-note')
		// Swal for confirm note added
		swal({
			icon: "success",
			title: "Success",
			text: "Meal item notes added successfully.",
			button: false,
			timer: 1000,
		}).then(() => {
			$(popup).find('#addMealItemNotesPopup').attr('checked', false)
			$(popup).find('#addMealItemNotesPopup').prop('checked', false)
		})
		return false
	})
}
function simplifyMerge(data4Merge = '') {
	// Get popup
	$(document).on('click', '.addNewMerge', (e) => {
		let label = $(e.target)
		let orderID = $(label).data('id');
		let cost = $(label).data('cost');

		let popup = $('.mergePopup.popUpForm')

		$(popup).find('.header').find('h3').html(`Merge orders to this order #${orderID}`)
		$('#slctedOrderID').val(orderID)
		$('input#addNewMerge').attr('checked', true)
		$('input#addNewMerge').prop('checked', true)

		$('p.totalPara .amnt').html(`$${cost}`)
		$('.totalOrdersAmount').val(cost)
		$(popup).find(`.orders-record`).css("display", "flex");
		$(popup).find(`.orders-record.${orderID}`).css("display", "none");
	})

	// Data 4 merge
	if(data4Merge) {
		let record = '';
		let totlOrders = 0;
		// console.log(data4Merge)
		data4Merge.map((rec) => {
			record += `<div class="orders-record ${rec.orderID}">
	    		<div class="orders-col">
	    			<label class="rec-check" value="${rec.orderID}">
	    				<input type="checkbox" class="record-checkbox" value="${rec.orderID}" name="orderIDRec[]">
	    				<span class="tick"></span>
	    				<span class="text">#${rec.orderID}</span>
	    			</label>
	    		</div>
	    		<div class="orders-col">${rec.orderedTo}</div>
	    		<div class="orders-col">
	    			<input type="hidden" value="${rec.orderAmount}" class="orderAmnt">
	    			$${rec.orderAmount}
	    		</div>
	    	</div>`

	    	totlOrders += rec.orderAmount;
		})

		// $('p.totalPara .amnt').html(`$${totlOrders}`)
		$('p.totalPara .amnt').html(`$${0}`)
    	$("#orders-table4Merge").html(record);
	}

	// Search order 4 merge
	$('#searchOrders4MergeBtn').on('click', () => {
		let passedValue = $('#searchOrders4Merge').val();
		let orderID = $('#slctedOrderID').val()
		$.post("./includes/general.php?action=searchRec&dest=getOrders4Merge", { passedValue:passedValue, myRole: myRole, orderID:orderID}, function(data) {
			// console.log(data)
			// return false
			let res = JSON.parse(data)
			// $('p.totalPara .amnt').html(`$${res.amounts}`)
			$('p.totalPara .amnt').html(`$${0}`)
    		$("#orders-table4Merge").html(res.result);
		});
	})

	// Select (check) order 4 merge
	$('input.record-checkbox').on('change',  (e) => {
		let check = $(e.target).prop('checked')
		let record = $(e.target).parents('.orders-record ')
		let totalOrdersAmount = parseFloat($('.totalOrdersAmount').val())
		let orderAmnt = parseFloat($(record).find('.orderAmnt').val())
		// console.log(check)
		if(check) totalOrdersAmount += orderAmnt
		else totalOrdersAmount -= orderAmnt

		$('.totalOrdersAmount').val(totalOrdersAmount)
		$('p.totalPara .amnt').html(`$${totalOrdersAmount}`)
	})

	// Search order 4 split
	$('#searchOrders4SplitBtn').on('click', () => {
		console.log('cool')
		let passedValue = $('#searchOrders4Split').val()
		$('div.suggest.split').css('display', 'block')
		$.post("./includes/general.php?action=searchRec&dest=getOrders4Split", { passedValue:passedValue, myRole: myRole}, function(data) {
			// console.log(data)
			// return false
			let res = JSON.parse(data)
			$('div.suggest.split').html(res.result)
		});
	})

	// Increase quantity or decrease
	$('.splitQty').on('click', (ev) => {
		ev.preventDefault()
		let span 	= $(ev.target);
		let action 	= $(span).data('action')
		let input 	= $(span).parents('.rightPrt').find('#splitNumber')
		let inputVal = parseFloat($(input).val());

		if(action == 'increase') $(input).val(inputVal+1)
		else if(action == 'decrease' && inputVal > 2) $(input).val(inputVal-1)
	})
}
function checkAddMerge(form) {
	let orderID = $('#slctedOrderID').val();
	var slctedOrders	= $("input.record-checkbox:checked").val();
	console.log(orderID, slctedOrders)
	if(!slctedOrders) {
		swal('Oops', 'Please select at least one order', 'error')
		return false;
	}

	return true
}
function catchOrder4Split(orderID, details, date, amount) {
	$('#searchOrders4Split').val('#'+orderID)
	$('#orderID4Split').val(orderID)
	$('.amntParag .amnt').html(`$${amount}`)
	/*let orderDetails = `<div class="min-row">
		<p style="flex-basis: 40%;">
			<span style="" class="big">Order: </span>
			<span>#${orderID}</span>
		</p>
		<p style="flex-basis: 60%;">
			<span class="big">Date:</span>
			<span>${date}</span>
		</p>
	</div>
	<div class="min-row" >
		<p style="flex-basis: 40%;">
			<span class="big">Amount:</span>
			<span>$${amount}</span>
		</p>
		<p style="flex-basis: 60%; white-space:nowrap;">
			<span style="" class="big">Details: </span>
			<span>${details}</span>
		</p>
	</div>`;

	$('.col.order-details').html(orderDetails)*/
	// $('.col.order-details').css('display', 'flex')
	$('div.suggest.split').css('display', 'none')
	return false
}
function check_splitOrders(btn) {
	clearErrors();
	let orderID = $('#orderID4Split').val()
	let splitMethod = $('input.splitMethod').val();//$('#slcSplitMethod').val()
	let splitNumber = $('#splitNumber').val()

	// Conditions
	if(!orderID) {
		$('#splitOrderIDError').css('display', 'block')
		$('#searchOrders4Split').css('border', '1px solid red')
		return false;
	}
	if(!splitMethod) {
		$('#slcSplitMethodError').css('display', 'block')
		$('#slcSplitMethod').css('border', '1px solid red')
		return false;
	}
	if(!splitNumber) {
		$('#slcSplitNumberError').css('display', 'block')
		$('#splitNumber').css('border', '1px solid red')
		return false;
	}

	window.location = `./orders-workplace.php?task=splitOrder&role=${myRole}&orderID=${orderID}&method=${splitMethod}&number=${splitNumber}`;
	// redirect to split page
}
function simplifySplit() {
	// Record Qty Changes
	$(document).on('keyup', '.itemQty', (ev) => {
		let record =  $(ev.target).parents('.record')
	})

	$(document).on('click', '.removeItemSplitItem', (ev) => {
		const record = $(ev.target).data('id')
		$(".record."+record).fadeOut(500, function(){ $(this).remove(); });
	})
}
function itemClickEvent4Split(targetCrl) {
	var itemID = targetCrl.value;
	var targetAlt = targetCrl.alt;

	$("[name="+targetCrl.id+"]:checked").each(function(){
		var ttl_costprice = 0;
		var maxQty 		= $(this).parentsUntil('div.radio-box.'+targetAlt).find('input.mealMaxQty.meal'+itemID).val();
		var itemName 	= $(this).parentsUntil('div.radio-box.'+targetAlt).find('input#itemName'+targetAlt).val();
		var costPrice 	= $(this).parentsUntil('div.radio-box.'+targetAlt).find('input#costPrice'+targetAlt).val();
		var qty 		= $(this).parentsUntil('div.radio-box.'+targetAlt).find('input#txtQty'+targetAlt).val();
		var packageID 	= $(this).parentsUntil('div.radio-box.'+targetAlt).find('input#packageID'+targetAlt).val();

		var curItemID = itemID.trim();

		var itemExist = 0;
		$("input#mealID").each(function(){
			var curVal = $(this).val();
			if(curVal==curItemID){
				itemExist=1;
			}
		});

		if(itemExist==0) {
			$("div.prices-wrap").append('<div class="record values slctedItem '+listNum+'">\
				<input type="hidden" name="recordType[]" value="new" />\
				<input type="hidden" name="packageID[]" value="'+packageID+'" />\
				<input type="hidden" id="mealID" name="mealID[]" value="'+itemID+'" />\
				<input type="hidden" id="maxQty" name="maxQty[]" class="maxQty'+listNum+'" value="'+maxQty+'" />\
				<input type="hidden" name="itemQty[]"  id="itemQty" class="itemQty'+listNum+'" value="'+qty+'" alt="'+costPrice+'"/>\
				<input type="hidden" name="costPrice[]" id="costPrice" class="costPrice'+listNum+'" value="'+costPrice+'" />\
				<span class="col name">'+itemName+'</span>\
				<span class="col qty">\
                    <i class="qty-btn qty-down fal fa-minus-circle decreaseQty" onclick="return decreaseQty('+listNum+')"></i>\
                    <div class="input quantity-div '+listNum+'" name="txtQty" contenteditable="true" spellcheck="false">'+qty+'</div>\
                    <i class="qty-btn qty-up fal fa-plus-circle increaseQty" onclick="return increaseQty('+listNum+')"></i>\
				</span>\
				<span class="col price">$<label class="item-price '+listNum+'">'+costPrice+'</label></span>\
				<span class="col delete item" onclick="return removeListItem('+listNum+')"><a class="fal fa-trash-alt del-item"></a></span>\
			</div>');
		listNum+=1;
		}

		var pricelist = $(".prices-wrap").find(".price .item-price");
		var totalPrice = 0;
		$.each(pricelist, function(i, price){
			totalPrice += parseFloat($(price).text());
		});
		var discount = parseFloat($(".theDiscount").text());

		var vatPercents = $('[name="vatPercents"]').val();
		vat = parseFloat((totalPrice/100)*vatPercents);
		grand_total = parseFloat(totalPrice-discount+vat);
		$("input#txtTotalOrderAmount").val(totalPrice);
		$('.subTotal.amount').text('$'+totalPrice.toFixed(2));
		$('.vat.amount').text('$'+vat.toFixed(2));
		$('.total.amount').text('$'+grand_total.toFixed(2));
		/*----------*/
		return false;
	});
}
function check_addSplitRecord(ev) {
	let records = $('.prices-wrap .record.values');
	let splitNumber = $("input[name^=splitNumber]:checked").val();
	let splitTitle = $("input[name^=splitNumber]:checked").data('split');
	if(records.length < 1) {
		swal('Oops', 'Please add some meal items to split.', 'error');
		return false;
	}
	if(!splitNumber) {
		swal('Oops', 'Please select split to number.', 'error');
		return false;
	}
	let recordHtml = `<div id="header" style="padding-left: 0px;">Meals added to ${splitTitle}</div>
        <div class="listItems splitRecords">
        	<header>
        		<input type="hidden" value="${splitNumber}" name="splitNumber[]"/>
                <div class="box first">No.</div>
                <div class="box middle">Meal Details</div>
                <div class="box">Quantity</div>
                <div class="box">Price/Item</div>
                <div class="box hide">Sub Total</div>
                <div class="box important">Discount</div>
                <div class="box hide">Total</div>
                <div class="box hide" style="width: 7%; ">Action</div>
            </header>`
	$('.prices-wrap .record.values').each((i, el) => {
		let itemName 	= $(el).find('span.col.name').text();
		let packageID 	= $(el).find("input[name^=packageID]").val();
		let mealID 		= $(el).find("input[name^=mealID]").val();
		let maxQty 		= parseFloat($(el).find("input[name^=maxQty]").val());
		let itemQty 	= parseFloat($(el).find("input[name^=itemQty]").val());
		let costPrice 	= parseFloat($(el).find("input[name^=costPrice").val());
		let discount 	= 0;

		let subtotal 	= itemQty*costPrice
		let total  		= subtotal-discount

		if(maxQty == itemQty) {
			$('.mealMaxQty.meal'+mealID).parents('.radio-box').fadeOut(500, function(){ $(this).remove(); });
		}

		recordHtml += `<div class="record ${splitRecord}">
            <div class="box first">${splitRecord}. <i style=" margin-left: 2px;  margin-top: 8px; color:red" class="inline-icon fa fa-print"></i></div>
            <div class="box middle">
            	<input type="hidden" name="mealID4Split${splitNumber}[]" id="mealID4Split" value="${mealID}">
            	<input type="hidden" name="packageID4Split${splitNumber}[]" id="packageID4Split" value="${packageID}">
            	<input type="hidden" name="packageID4Split${splitNumber}[]" id="packageID4Split" value="${packageID}">
                ${itemName}
            </div>
            <div class="box has-input">
            	<input type="text" value="${itemQty}" readonly="" name="mealQty4Split${splitNumber}[]"  id="mealQty4Split" class="mealQty4Split">
            </div>
            <div class="box has-input">
            	<span>$</span>
            	<input type="text" value="${costPrice}" readonly="" id="mealPrice4Split" name="mealPrice4Split${splitNumber}[]" class="mealPrice4Split">
            </div>
            <div class="box hide subTotal">$${subtotal}</div>
            <div class="box important has-input">
            	<input type="text" value="${discount}" readonly="" id="mealDiscount" name="mealDiscount${splitNumber}[]" class="mealDiscount">
            </div>
            <div class="box hide">$${total}</div>
            <div class="box hide" style="width: 7%; ">
            	<a id="remove" class="removeItemSplitItem" data-id="${splitRecord}">remove</a>
            </div>
        </div>`
        splitRecord++
	})
	if(recordHtml) $('.splitRecords.details.long').append(recordHtml)


	$('.prices-wrap').html('')
	$("input[name^=splitNumber]:checked").attr('disabled', true)
	$("input[name^=splitNumber]").attr('checked', false)
	$("input[name^=splitNumber]").prop('checked', false)

	$("input#txtTotalOrderAmount").val('0.00');
	$('.subTotal.amount').text('0.00');
	$('.vat.amount').text('0.00');
	$('.total.amount').text('0.00');
	return false
}
function check_finishSplitOrder(ev) {
	let form = $(ev.target)
	let tables = $(form).find('.showRecord').find('.listItems.splitRecords')

	if(tables.length < 1) {
		swal('Oops', 'Please add orders to split to.', 'error')
		return false
	}

	console.log(tables)
	return true
}

// mun
$('#sidebarToggler').on('click', function(e) {
	$('.sidebar').toggleClass('active')
	$('.overlay').toggleClass('active')
})
$('.overlay').on('click', function(e) {
	$('.sidebar').removeClass('active')
	$('.overlay').removeClass('active')
})