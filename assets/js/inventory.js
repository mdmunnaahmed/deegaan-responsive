function check_searchBox(){
	// search purchase order
	$("input#srchPrchsOrder").keyup(function() {
		var passedValue = $("input#srchPrchsOrder").val();
		if(passedValue.val!="") {
			$("div.suggest").css("display", "table-row");
			$.post("./includes/inventory.php?action=searchRec&dest=srchPrchsOrder", { passedValue: passedValue, myWhouse: myWhouse, myRole: myRole  }, function(data) {
				$("div.suggest").html(data);
			});
		}
	});
	$("input#srchPrchsOrder").blur(function() {
		if($("#srchPrchsOrder").val()=="") {
			$("div.suggest").css("display", "none");
		}
	});
	// search purchase
	$("input#srchPrchse").keyup(function() {
		var passedValue = $("input#srchPrchse").val();
		if(passedValue.val!="") {
			$("div.suggest").css("display", "table-row");
			$.post("./includes/inventory.php?action=searchRec&dest=srchPrchse", { passedValue: passedValue}, function(data) {
				$("div.suggest").html(data);
			});
		}
	});
	$("input#srchPrchse").blur(function() {
		if($("#srchPrchse").val()=="") {
			$("div.suggest").css("display", "none");
		}
	});
	// search distributed product
	$("input#srchDistrPrdt").keyup(function() {
		var passedValue = $("input#srchDistrPrdt").val();
		if(passedValue.val!="") {
			$("div.suggest").css("display", "table-row");
			$.post("./includes/inventory.php?action=searchRec&dest=srchDistrPrdt", { passedValue: passedValue }, function(data) {
				$("div.suggest").html(data);
			});
		}
	});
	$("input#srchDistrPrdt").blur(function() {
		if($("#srchDistrPrdt").val()=="") {
			$("div.suggest").css("display", "none");
		}
	});
	// search transfered product
	$("input#srchTrnsfPrdt").keyup(function() {
		var passedValue = $("input#srchTrnsfPrdt").val();
		if(passedValue.val!="") {
			$("div.suggest").css("display", "table-row");
			$.post("./includes/inventory.php?action=searchRec&dest=srchTnsfrPrdt", { passedValue: passedValue }, function(data) {
				$("div.suggest").html(data);
			});
		}
	});
	$("input#srchTrnsfPrdt").blur(function() {
		if($("#srchTrnsfPrdt").val()=="") {
			$("div.suggest").css("display", "none");
		}
	});
	// search store adjustment
	$("input#srchStore").keyup(function() {
		var passedValue = $("input#srchStore").val();
		if(passedValue.val!="") {
			$("div.suggest").css("display", "table-row");
			$.post("./includes/inventory.php?action=searchRec&dest=srchStore", { passedValue: passedValue, myBranch: myBranch, myWhouse: myWhouse}, function(data) {
				$("div.suggest").html(data);
			});
		}
	});
	$("input#srchStore").blur(function() {
		if($("#srchStore").val()=="") {
			$("div.suggest").css("display", "none");
		}
	});
	// search product shelf
	$("input#srchPrdtShlf").keyup(function() {
		var passedValue = $("input#srchPrdtShlf").val();
		if(passedValue.val!="") {
			$("div.suggest").css("display", "table-row");
			$.post("./includes/inventory.php?action=searchRec&dest=srchPrdtShlf", { passedValue:passedValue, myWhouse:myWhouse }, function(data) {
				$("div.suggest").html(data);
			});
		}
	});
	$("input#srchPrdtShlf").blur(function() {
		if($("#srchPrdtShlf").val()=="") {
			$("div.suggest").css("display", "none");
		}
	});
	// search customer
	$("input#srchClient").keyup(function() {
		var passedValue = $("input#srchClient").val();
		if(passedValue.val!="") {
			$("div.suggest").css("display", "table-row");
			$.post("./includes/inventory.php?action=searchRec&dest=srchClient", { passedValue:passedValue, myRole:myRole, myWhouse:myWhouse }, function(data) {
				$("div.suggest").html(data);
			});
		}
	});
	$("input#srchClient").blur(function() {
		if($("#srchClient").val()=="") {
			$("div.suggest").css("display", "none");
		}
	});
	// search Measure
	$("input#srchMsure").keyup(function() {
		var passedValue = $("input#srchMsure").val();
		if(passedValue.val!="") {
			$("div.suggest").css("display", "table-row");
			$.post("./includes/inventory.php?action=searchRec&dest=srchMsure", { passedValue: passedValue }, function(data) {
				$("div.suggest").html(data);
			});
	}
	});

	//
	$("input#srchMsure").blur(function() {
		if($("#srchMsure").val()=="") {
			  $("div.suggest").css("display", "none");
		  }
	  });
	}
	// search category
	$("input#srchCtgry").keyup(function() {
		var passedValue = $("input#srchCtgry").val();
		if(passedValue.val!="") {
			$("div.suggest.one").css("display", "table-row");
			$.post("./includes/inventory.php?action=searchRec&dest=srchCtgry", { passedValue: passedValue }, function(data) {
				$("div.suggest.one").html(data);
			});
		}
	});
	$("input#srchCtgry").blur(function() {
		if($("#srchCtgry").val()=="") {
			$("div.suggest.one").css("display", "none");
		}
	});
	// search product
	$("input#srchProduct").keyup(function() {
		var passedValue = $("input#srchProduct").val();
		if(passedValue.val!="") {
			$("div.suggest.two").css("display", "table-row");
			$.post("./includes/inventory.php?action=searchRec&dest=srchProduct", { passedValue: passedValue }, function(data) {
				$("div.suggest.two").html(data);
			});
		}
	});
	$("input#srchProduct").blur(function() {
		if($("#srchProduct").val()=="") {
			$("div.suggest.two").css("display", "none");
		}
	});

/* ---------------------------------------------------------------
------------------------- purchase order -------------------------
-----------------------------------------------------------------*/
function updatePrchseOrdrBar() {
	var perPage = $("#slcPerPage").val();
	var count = $("label#count").html();
	var dataString = 'myWhouse='+ myWhouse;
	$.ajax({
		type: "POST",
		url: "./includes/inventory.php?action=setFoundNum&dest=prchsOrder&myRole="+myRole,
		data: dataString,
		cache: false,
		timeout: 2000,
		success: function(result){
			if(result != count){
				$("#refresh").html('records changed, \
				<a onclick="return loadPrchsOrderTwo(0,'+perPage+');">refresh now!</a>');
				(function blink(){
					$("span#refresh a").fadeOut(500).fadeIn(500, blink);
				})();
			}
			setTimeout(function(){
				updatePrchseOrdrBar();
			}, 60000);
		}
	});
}
function loadPrchsOrder(pageLimit, perPage) {
	$("#dataTable div#loading").css("display", "inline");
	var dataString = 'pageLimit='+pageLimit+'&perPage='+perPage+'&myWhouse='+ myWhouse;
	$.ajax({
		type: "POST",
		url: "./includes/inventory.php?action=loadTable&dest=allPrchsOrder&myRole="+myRole+"&myUser="+myUser,
		data: dataString,
		cache: false,
		timeout: 2000,
		success: function(result){
			$("#dataTable div#loading").css("display", "none");
			$(".load_more_link").addClass('noneLink');
			$("#dataTable").append(result);
		},
	});
	return false;
}
function loadPrchsOrderTwo(pageLimit, perPage) {
	$("#dataTable div#loading").css("display", "inline");
	var dataString = 'pageLimit='+pageLimit+'&perPage='+perPage+'&myWhouse='+ myWhouse;
	$.ajax({
		type: "POST",
		url: "./includes/inventory.php?action=loadTable&dest=allPrchsOrder&myRole="+myRole+"&myUser="+myUser,
		data: dataString,
		cache: false,
		timeout: 2000,
		success: function(result){
			$("#dataTable div#loading").css("display", "none");
			$(".load_more_link").addClass('noneLink');
			$("#dataTable").html('<div id="record" class="header"><div class="cave button">Action</div><div class="cave lshort">Order #</div><div class="cave long">Department</div><div class="cave middle">Num. of Items</div><div class="cave middle">Date</div></div>');
			$("#dataTable").append(result);

			(function (){
				//
				var dataString = 'myWhouse='+ myWhouse;
				$.ajax({
					type: "POST",
					url: "./includes/inventory.php?action=setFoundNum&dest=prchsOrder&myRole="+myRole,
					data: dataString,
					cache: false,
					timeout: 2000,
					success: function(numRecs){
						$("#foundNum").html('<label id="count">'+numRecs+'</label> record(s) has been found\
						<span id="refresh"></span>');
					}
				});
				//
			})();
		},
	});
	return false;
}

function addVendor() {
	var popVName 	= $("#popVName").val();
	var popVPhone	= $("#popVPhone").val();
	var popVEmail 	= $("#popVEmail").val();

	if(popVName.length < 1) {
		$("#vendorError1").css("display", "inline");
		$("#vendorError1").html("Provide vendor's full name");
		$("#popVName").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(popVPhone.length < 1) {
		$("#vendorError2").css("display", "inline");
		$("#vendorError2").html("Phone number is missing");
		$("#popVPhone").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(popVEmail.length > 0) {
		var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
		if(!popVEmail.match(emailExp)) {
			$("#vendorError3").css("display", "inline");
			$("#vendorError3").html("invalid email address");
			$("#popVEmail").css("border-color", "#FF0000");
			return false;
		} else { clearErrors(); }
	}

	$("#btnAdd").attr("disabled", true);
	$("#btnAdd").html("Wait...");

	$.post("./includes/inventory.php?action=saveNew&dest=addVendorFromPopUp&addedBy="+myUser, { txtName:popVName, txtPhone:popVPhone, txtEmail:popVEmail }, function(data) {
		var addedpos = data.search("added");
		$("label.process").css("display", "none");
		if(addedpos==0) {
			var lastID = data.slice(6,21);
			swal({
				title: "Success!",
				text: "You added new vendor successfully.",
				type: "success",
				timer: 1500,
				showConfirmButton: false,
			});
			$("#popVName, #popVPhone, #popVEmail").val('');
			$("input#vendorID").val(lastID);
			$("input#txtVendorName").val(popVName);
			$("div.displayInfo.vendor").css("display", "inline");
			$("p#pVName").html(popVName);
			$("p#pVPhone").html(popVPhone);
			$("p#pVBalance").html(0);
			$("div.suggest.vendor").css("display", "none");
			$("#addVednor").attr("checked",false);
			$("div.popupContainer").css("display","none");

		} else {
			swal("Oops!", data, "error");
		}
		$("#btnAdd").attr("disabled", false);
		$("#btnAdd").html("Add");
	});
	return false;
}
function catchVendor4Prchse(vndID,fullname,phone,balance) {
	$("input#vendorID").val(vndID);
	$("input#txtVendorName").val(fullname);
	$("div.displayInfo.vendor").css("display", "inline");
	$("p#pVName").html(fullname);
	$("p#pVPhone").html(phone);
	if(balance>0) {
		$("p#pVBalance").html('$'+balance);
	} else {
		$("p#pVBalance").html(balance);
	}
	$("div.suggest").css("display", "none");
}

function smpfyAddPrchse() {
	$("#checkBlnce, #switchBalance").click(function(){
		$('div#switchBalance').toggleClass("switchOn");
		if (document.getElementById("beginBalance").checked == true) {
			document.getElementById("beginBalance").checked = false;
		} else {
			document.getElementById("beginBalance").checked = true;
		}
		$("#vendorID, #txtVendorName").val('');
		$("div.displayInfo.vendor").css("display", "none");

		// $("#vendorID","#txtVendorNameInventory").val('');
		// $("#txtItemName").val('');
		// $("txtProductName").val('');

	});
	//
	var kahor1sano = Number(sanadkan)-1;
	var picker = new Pikaday({
		field: document.getElementById("transDate"),
		firstDay: 6,
		maxDate: new Date(maanta),
		yearRange: [kahor1sano,sanadkan],
	});
	//
	$("#txtVendorName").keyup(function(){
		var vendorName = $("#txtVendorName").val();
		if(vendorName!="") {
			$("div.suggest").css("display", "table-row");
			$.post("./includes/inventory.php?action=searchRec&dest=pickVendor", {vendorName:vendorName}, function(data){
				$("div.suggest").html(data);
			});
		} else { $("div.suggest").css("display", "none"); }
		clearErrors();
	});
		//commented By Hamdi

	// inventory Menu search vendor
	// $("#txtVendorNameInventory").keyup(function(){
	// 	var vendorName1 = $("#txtVendorNameInventory").val();
	// 	if (vendorName1!="") {
	// 		$("div.suggest.vendor").css("display", "table-row");
	// 		$.post("./includes/inventory.php?action=searchRec&dest=pickVendor4Inventory", {vendorName1:vendorName1}, function(data){
	// 			$("div.suggest.vendor").html(data);
	// 		});
	// 	} else { $("div.suggest.vendor").css("display", "none"); }
	// 	clearErrors();
	// });
	// // purchase search item name
	// $(document).on('keyup', '.txtItemName', function(e) {
	// 	let input = $(e.target);
	// 	let record = $(input).parents('.record')
	// 	let recNo = $(record)[0].classList[1];
	// 	console.log(recNo)
	// 	let itemName = $(input).val()
	// 	$("div.suggest.itemName").css("display", "none");
	// 	if (itemName!="") {
	// 		$(record).find("div.suggest.itemName").css("display", "block");
	// 		$.post("./includes/inventory.php?action=searchRec&dest=pickInventoryProduct", {itemName:itemName, recNo:recNo}, function(data){
	// 			$("div.suggest.itemName").html(data);
	// 		});
	//   	} else { $("div.suggest.itemName").css("display", "none"); }
	// 	clearErrors();
	// });
	// //
	// $("#txtCost").on("keyup change", function() {
	// 	var prdQnty		= $("#txtQuantity").val();
	// 	var slcPrdcts	= $("#txtPrdctID").val();
	// 		if(slcPrdcts!="") {
	// 				// var quantity = prdQnty;
	// 				var costPrice	= $("#txtCost").val();
	// 				$("input.txtTtlCost").val(costPrice);
	// 				if(prdQnty!="") {
	// 					if(costPrice != "" || costPrice > 0 ) {
	// 						var totalCost = Number(prdQnty*costPrice);
	// 						$(".txtTtlCost").val(totalCost);
	// 					}
	// 				} else {
	// 					$(".txtTtlCost").val('');
	// 				}
	// 		}
	// 	clearErrors();
	// });
	// // stock search item name
	// $(document).on('keyup', '.txtProductName', function(e) {
	// 	let input = $(e.target);
	// 	let record = $(input).parents('.record')
	// 	let recNo = $(record)[0].classList[1];
	// 	console.log(recNo)
	// 	let productName = $(input).val()
	// 	$("div.suggest").css("display", "none");
	// 	if (productName!="") {
	// 		$(record).find("div.suggest").css("display", "block");
	// 		$.post("./includes/inventory.php?action=searchRec&dest=pickInventoryStockProduct", {productName:productName, recNo:recNo}, function(data){
	// 			$("div.suggest").html(data);
	// 		});
	//   	} else { $("div.suggest").css("display", "none"); }
	// 	clearErrors();
	// });
	// //
	// $("#newQty").on("keyup change", function() {
	// 	var qtyOnStock	= $("#qtyOnStock").val();
	// 	var newQty	= $("#newQty").val();
	// 	if(qtyOnStock!="") {
	// 		if(newQty != "" || newQty > 0 ) {
	// 			var totalCost = Number(qtyOnStock-newQty);
	// 			if (totalCost < 0){
	// 			 	totalCost = 0;
	// 				$("#newQty").val(qtyOnStock);
	// 			}
	// 			$(".varience").val(totalCost);
	// 		}
	// 	} else {
	// 		$(".varience").val('');
	// 	}
	// 	console.log(totalCost)
	// 	clearErrors();
	// });
	//
	$("#slcCtgry").change(function() {
		var ctgryID = $("#slcCtgry").val();
		if(ctgryID=="") {
			$("#slcPrdcts").html('');
		} else {
			$.post("./includes/inventory.php?action=searchRec&dest=allPrdcts", { ctgryID: ctgryID }, function(data) {
				$("#slcPrdcts").html(data);
			});
		}
		clearErrors();
	});
	//
	$("#slcPrdcts").change(function() {
		var prdID = $("#slcPrdcts").val();
		if(prdID=="") {
			$("div.displayInfo.product").css('display','none');
		} else {
			$.post("./includes/inventory.php?action=searchRec&dest=getPrdctMsr", { prdID: prdID }, function(data) {
				$("select#slcMeasure").html(data);
			});
			$.post("./includes/inventory.php?action=searchRec&dest=getPrdctInfo", { prdID: prdID }, function(data) {
				$("div.displayInfo.product").css('display','inline');
				$("div.displayInfo.product").html(data);
			});
		}
		clearErrors();
	});
	//
	$("#txtPrdQnty").bind("keyup change", function(e) {
		var prdQnty		= $("#txtPrdQnty").val();
		var slcPrdcts	= $("#slcPrdcts").val();
		var slcMeasure	= $("#slcMeasure").val();
		if(prdQnty.match(numExp) || prdQnty!="") {
			if(slcPrdcts!="" && slcMeasure!="") {
				$.post("./includes/inventory.php?action=searchRec&dest=getMsrQnty", { prdID:slcPrdcts, msrID:slcMeasure }, function(data){
					var msrQty	= data;
					var quantity = (msrQty*prdQnty);
					$("input#txtQuantity").val(quantity);
					//
					var costPrice	= $("#txtCost").val();
					var salesPrice	= $("#txtSales").val();
					if(quantity!="") {
						if(costPrice != "" || costPrice > 0 ) {
							var totalCost = Number(quantity*costPrice);
							$("#txtTtlCost").val(totalCost);
						}
						if(salesPrice != "" || salesPrice > 0 ) {
							var totalSales = Number(quantity*salesPrice);
							$("#txtTtlSls").val(totalSales);
						}
					} else {
						$("#txtTtlCost, #txtTtlSls").val('');
					}
				});
			}
		}
		clearErrors();
	});
	//
	$("#slcMeasure").bind("change", function(e) {
		var prdQnty		= $("#txtPrdQnty").val();
		var slcPrdcts	= $("#slcPrdcts").val();
		var slcMeasure	= $("#slcMeasure").val();
		$("#txtCost, #txtTtlCost, #txtSales, #txtTtlSls").val('');
		if(prdQnty.match(numExp) || prdQnty!="") {
			if(slcPrdcts.length > 0 && slcMeasure.length > 0) {
				$.post("./includes/inventory.php?action=searchRec&dest=getMsrQnty", { prdID:slcPrdcts, msrID:slcMeasure }, function(data){
					var msrQty	= data;
					var quantity = (msrQty*prdQnty);
					$("input#txtQuantity").val(quantity);
				});
			}
		}
	});
	//
	$("#txtCost").bind("keyup change", function(e) {
		var quantity = $("#txtQuantity").val();
		var costPrice = $("#txtCost").val();
		if(costPrice != "" || costPrice > 0 ) {
			var totalCost = Number(quantity*costPrice);
			$("#txtTtlCost").val(totalCost);
		} else {
			$("#txtTtlCost").val('');
		}
		clearErrors();
	});
	//
	$("#txtSales").bind("keyup change", function(e) {
		var quantity = $("#txtQuantity").val();
		var salesPrice = $("#txtSales").val();
		if(salesPrice != "" || salesPrice > 0 ) {
			var totalSales = Number(quantity*salesPrice);
			$("#txtTtlSls").val(totalSales);
		} else {
			$("#txtTtlSls").val('');
		}
		clearErrors();
	});
	//
	$("#txtRemarks").bind("keyup change", function(e) {
		return tweetFeed(this, 500);
	});
}
//
function add2List4PrchsOrder() {
	var slcCtgry	= $("#slcCtgry").val(); 		var slcCtgry2 = $("#slcCtgry :selected").text();
	var slcPrdcts	= $("#slcPrdcts").val();		var slcPrdcts2 = $("#slcPrdcts :selected").text();
	var txtPrdQnty	= $("#txtPrdQnty").val();
	var slcMeasure	= $("#slcMeasure").val();		var slcMeasure2 = $("#slcMeasure :selected").text();
	var slcPriority	= $("#slcPriority").val();

	if(slcCtgry.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Select category");
		$("#slcCtgry").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(slcPrdcts.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Select product");
		$("#slcPrdcts").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(txtPrdQnty.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Quantity is missing");
		$("#txtPrdQnty").css("border-color", "#FF0000");
		return false;
	} else if(Number(txtPrdQnty) < 0.1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Quantity must be greater than 0");
		$("#txtPrdQnty").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(slcMeasure.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Measurement is missing");
		$("#slcMeasure").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	$("div.list").append('<div class="listItem num'+num+'">\
		<div class="cave serial">\
			<input type="hidden" name="prdID[]" value="'+slcPrdcts+'" readonly="readonly" /></div>\
		<div class="cave large"><input type="text" value="'+slcCtgry2+', '+slcPrdcts2+'" readonly="readonly" /></div>\
		<div class="cave small"><input type="text" name="quantity[]" value="'+txtPrdQnty+'" readonly="readonly" /></div>\
		<div class="cave tiny">\
			<input type="hidden" name="slcMeasure[]" value="'+slcMeasure+'" readonly="readonly" />\
			<input type="text" value="'+slcMeasure2+'" readonly="readonly" /></div>\
		<div class="cave tiny"><input type="text" name=priority[]" value="'+slcPriority+'" readonly="readonly" /></div>\
		<div class="cave last"><a id="remove" onclick="return removeItem('+num+');">remove</a></div>\
	</div>');

	$("#slcCtgry option:first").attr("selected", "selected");
	$("#slcPrdcts, #slcMeasure").html('');
	$("#txtPrdQnty").val('');

	num++;
	return false;
}
function check_addPrchseOrder() {
	var listItem	= $("div.theForm .listItem").height();

	if(listItem<1) {
		$("#error3").css("display", "inline");
		$("#error3").html("You must add at least one product to the list");
		if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.four").offset().top }, 'slow'); }
		return false;
	} else { clearErrors(); }

	$("label.process").css("display", "inline");
	$("#btnSave").attr("disabled", true);
	$("#btnSave").html("Wait...");

	return true;
}
function check_addPrchse() {
	var beginBalance	= $("input#beginBalance:checked").val();
	if(beginBalance!="on") { var beginBalance="no"; } else { var beginBalance="yes"; }

	var vendorName	= $("#txtVendorName").val();
	var vendorID	= $("#vendorID").val();
	var listItem	= $("div.theForm .listItem").height();

	if(beginBalance=="no") {
		if(vendorID.length < 1 || vendorName.length < 1) {
			$("#error1").css("display", "inline");
			$("#error1").html("Please select vendor");
			$("#txtVendorName").css("border-color", "#FF0000");
			$("div.suggest").css("display", "none");
			if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.two").offset().top }, 'slow'); }
			return false;
		} else { clearErrors(); }
	}

	if(listItem<1) {
		$("#error3").css("display", "inline");
		$("#error3").html("You must add at least one product to the list");
		if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.four").offset().top }, 'slow'); }
		return false;
	} else { clearErrors(); }

	$("label.process").css("display", "inline");
	$("#btnSave").attr("disabled", true);
	$("#btnSave").html("Wait...");

	return true;
}
function add2List4PrchsOrderInEdit() {
	var orderID		= $("#orderID").val();
	var slcCtgry	= $("#slcCtgry").val(); 		var slcCtgry2 = $("#slcCtgry :selected").text();
	var slcPrdcts	= $("#slcPrdcts").val();		var slcPrdcts2 = $("#slcPrdcts :selected").text();
	var txtPrdQnty	= $("#txtPrdQnty").val();
	var slcMeasure	= $("#slcMeasure").val();		var slcMeasure2 = $("#slcMeasure :selected").text();
	var slcPriority	= $("#slcPriority").val();

	if(slcCtgry.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Select category");
		$("#slcCtgry").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(slcPrdcts.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Select product");
		$("#slcPrdcts").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(txtPrdQnty.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Quantity is missing");
		$("#txtPrdQnty").css("border-color", "#FF0000");
		return false;
	} else if(Number(txtPrdQnty) < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Quantity must be greater than 0");
		$("#txtPrdQnty").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(slcMeasure.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Measurement is missing");
		$("#slcMeasure").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	$.post("./includes/inventory.php?action=saveNew&dest=addPrd4OrderInEdit&addedBy="+myUser, { orderID:orderID, prdtID:slcPrdcts, prdQnty:txtPrdQnty, msureID:slcMeasure, priority:slcPriority }, function(data) {
		var addedpos = data.search("added");
		$("label.process").css("display", "none");
		if(addedpos==0) {
			var lastID = data.slice(6,21);
			swal({
				title: "Success!",
				text: "You added new product for this order successfully.",
				type: "success",
				timer: 1500,
				showConfirmButton: false
			},
				function() {
					location.reload();
				}
			);
		} else {
			swal("Oops!", data, "error");
		}
	});
	return false;
}
function delPrchOrderList(recNum, itemID, orderID) {
	swal({
		title: "Are you sure to delete?",
		text: "You going to delete this product from purchase order.",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: 'Yes, delete it!',
		closeOnConfirm: false
	},
	function() {
		$.post("./includes/inventory.php?action=deleteRec&dest=delPrchOrderItem",{ itemID:itemID, orderID:orderID }, function(data){
			if(data=="deleted") {
				$("div#list div.listItem.num"+recNum).find("input").val("");
				$("div#list div.listItem.num"+recNum).fadeOut(500, function(){ $(this).remove(); });
				swal({
					title: "Success",
					text: "Product you selected has been removed permenantly",
					type: "success",
					timer: 1500,
					showConfirmButton: false
				});
			} else {
				swal("Oops!", data, "error");
			}
		});
	});
	return false;
}
function check_editPrchsOrder() {
	var vendorName	= $("#txtVendorName").val();
	var vendorID	= $("#vendorID").val();
	var listItem	= $("div.theForm .listItem").height();

	if(vendorID.length < 1 || vendorName.length < 1) {
		$("#error1").css("display", "inline");
		$("#error1").html("Please select vendor");
		$("#txtVendorName").css("border-color", "#FF0000");
		$("div.suggest").css("display", "none");
		if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.one").offset().top }, 'slow'); }
		return false;
	} else { clearErrors(); }

	$("label.process").css("display", "inline");
	$("#btnUpdate").attr("disabled", true);
	$("#btnUpdate").html("Wait...");

	return true;
}
function delPrchOrder(orderID) {
	swal({
		title: "Are you sure?",
		text: "You going to delete this purchase order record!",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: 'Yes, delete it!',
		closeOnConfirm: false
	},
	function() {
		$.post("./includes/inventory.php?action=deleteRec&dest=delPrchOrder", { orderID:orderID }, function(data) {
			if(data=="deleted") {
				swal({
					title: "Success!",
					text: "Selected purchase record has been deleted.",
					type: "success",
					timer: 1500,
					showConfirmButton: false
				});
				var count = $("label#count").html();
				$("label#count").html(count-1);
				$("a.masax.rec"+orderID).parents("#record").fadeOut(500);
			} else {
				swal("Oops", data, "error");
			}
		});
	});
	return false;
}
function catchPrchOrder(recID) {
	$.post("./includes/inventory.php?action=get_recInfo&dest=getPrchOrder", { recID:recID,myUser:myUser,myRole:myRole }, function(data) {
		$("div#foundNum").html('<label id="count">1</label> record has been selected.<span id="refresh"></span>');
		$("div#dataTable").html(data);
	});
	$("div.suggest").css("display", "none");
}


/* ---------------------------------------------------------------
---------------------------- purchases ---------------------------
-----------------------------------------------------------------*/

function updatePrchseBar() {
	var perPage = $("#slcPerPage").val();
	var period = $("#slcPeriod").val();
	var count = $("label#count").html();
	$.ajax({
		type: "POST",
		url: "./includes/inventory.php?action=setFoundNum&dest=purchase",
		cache: false,
		timeout: 2000,
		success: function(result){
			if(result != count){
				$("#refresh").html('records changed, \
				<a onclick="return loadPrchsesTwo(0,'+perPage+',\''+period+'\');">refresh now!</a>');
				(function blink(){
					$("span#refresh a").fadeOut(500).fadeIn(500, blink);
				})();
			}
			setTimeout(function(){
				updatePrchseBar();
			}, 60000);
		}
	});
}
function loadPrchses(pageLimit, perPage, period) {
	$("#dataTable div#loading").css("display", "inline");
	var dataString = 'pageLimit='+ pageLimit+'&period='+ period+'&perPage='+ perPage;
	$.ajax({
		type: "POST",
		url: "./includes/inventory.php?action=loadTable&dest=allPrchses&myRole="+myRole+"&myUser="+myUser,
		data: dataString,
		cache: false,
		timeout: 2000,
		success: function(result){
			$("#dataTable div#loading").css("display", "none");
			$(".load_more_link").addClass('noneLink');
			$("#dataTable").append(result);
		},
	});
	return false;
}
function loadPrchsesTwo(pageLimit, perPage, period) {
	$("#dataTable div#loading").css("display", "inline");
	var dataString = 'pageLimit='+ pageLimit+'&period='+ period+'&perPage='+ perPage;
	$.ajax({
		type: "POST",
		url: "./includes/inventory.php?action=loadTable&dest=allPrchses&myRole="+myRole+"&myUser="+myUser,
		data: dataString,
		cache: false,
		timeout: 2000,
		success: function(result){
			$("#dataTable div#loading").css("display", "none");
			$(".load_more_link").addClass('noneLink');
			$("#dataTable").html('<div id="record" class="header"><div class="cave button">Action</div><div class="cave long">Vendor</div><div class="cave lshort">Total Amount</div><div class="cave middle">Num. of Items</div><div class="cave middle">Date</div></div>');
			$("#dataTable").append(result);

			(function (){
				//
				$.ajax({
					type: "POST",
					url: "./includes/inventory.php?action=setFoundNum&dest=purchase",
					cache: false,
					timeout: 2000,
					success: function(numRecs){
						$("#foundNum").html('<label id="count">'+numRecs+'</label> record(s) has been found\
						<span id="refresh"></span>');
					}
				});
				//
			})();
		},
	});
	return false;
}
function add2List4Prchse() {
	var slcCtgry = $("#slcCtgry").val(); 		var slcCtgry2 = $("#slcCtgry :selected").text();
	var slcPrdcts = $("#slcPrdcts").val();		var slcPrdcts2 = $("#slcPrdcts :selected").text();
	var txtPrdQnty = $("#txtPrdQnty").val();	var quantity = $("#txtQuantity").val();
	var slcMeasure = $("#slcMeasure").val();	var slcMeasure2 = $("#slcMeasure :selected").text();
	var txtCost = $("#txtCost").val();
		var ttlCost = Number(quantity*txtCost);
	var txtSales = $("#txtSales").val();
		var ttlSales = Number(quantity*txtSales);

	if(slcCtgry.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Select category");
		$("#slcCtgry").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(slcPrdcts.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Select product");
		$("#slcPrdcts").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(txtPrdQnty.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Quantity is missing");
		$("#txtPrdQnty").css("border-color", "#FF0000");
		return false;
	} else if(Number(txtPrdQnty) < 0.1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Quantity must be greater than 0");
		$("#txtPrdQnty").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(txtCost.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Cost price is missing");
		$("#txtCost").css("border-color", "#FF0000");
		return false;
	} else if(Number(txtCost) < 0.1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Cost price must be greater than 0");
		$("#txtCost").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(txtSales.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Sales price is missing");
		$("#txtSales").css("border-color", "#FF0000");
		return false;
	} else if(Number(txtSales) < 0.1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Sales price must be greater than 0");
		$("#txtSales").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	var productID	= slcPrdcts.trim();
	var prdAdded	= $("input#prdID", list);
	var msrAdded	= $("input#msrID", list);

	if((!prdAdded.is("*") || !prdAdded.filter(function(i, el){return el.value.indexOf(productID) > -1}).is("*"))) {
		$("div.list").append('<div class="listItem num'+num+'">\
			<div class="cave serial">\
				<input type="hidden" id="prdID" name="prdID[]" value="'+slcPrdcts+'" readonly="readonly" /></div>\
			<div class="cave medium">\
				<input type="text" value="'+slcCtgry2+', '+slcPrdcts2+'" readonly="readonly" /></div>\
			<div class="cave tiny">\
				<input type="text" name="quantity[]" value="'+txtPrdQnty+'" readonly="readonly" /></div>\
			<div class="cave tiny">\
				<input type="hidden" id="msrID" name="msrID[]" value="'+slcMeasure+'" readonly="readonly" />\
				<input type="text" value="'+slcMeasure2+'" readonly="readonly" />\
			</div>\
			<div class="cave vsmall">\
				<input type="text" name="costPrice[]" value="$'+txtCost+'" readonly="readonly" /></div>\
			<div class="cave vsmall subTtl"><input type="text" value="$'+ttlCost+'" readonly="readonly" /></div>\
			<div class="cave vsmall">\
				<input type="text" name="salesPrice[]" value="$'+txtSales+'" readonly="readonly" /></div>\
			<div class="cave vsmall subTtl"><input type="text" value="$'+ttlSales+'" readonly="readonly" /></div>\
			<div class="cave last"><a id="remove" onclick="return removeItem('+num+');">remove</a></div>\
		</div>');
		$("#slcCtgry option:first").attr("selected", "selected");
		$("#slcPrdcts, #slcMeasure").html('');
		$("#txtPrdQnty, #txtQuantity, #txtCost, #txtTtlCost, #txtSales, #txtTtlSls").val('');
		$("div.displayInfo.product").css("display", "none");
		num++;

    } else {
        swal("Oops", slcPrdcts2 + " has already been added to list", "error");
    }
	return false;
}
function catchPurchase(recID) {
	$.post("./includes/inventory.php?action=get_recInfo&dest=getPrchase", { recID:recID,myUser:myUser,myRole:myRole }, function(data) {
		$("div#foundNum").html('<label id="count">1</label> record has been selected.<span id="refresh"></span>');
		$("div#dataTable").html(data);
	});
	$("div.suggest").css("display", "none");
}
function rtrnPrchsItem(itemID, prchseID, prdtID, quantity, msrID) {
	swal({
		title: "Are you sure to return?",
		text: "You going to return this product!\n\
		Once returned, it will be removed from this purchase record.",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: 'Yes, return it!',
		closeOnConfirm: false
	},
	function() {
		$.post("./includes/inventory.php?action=updateExist&dest=rtrnPrdct&updatedBy="+myUser,{itemID:itemID, prchseID:prchseID, prdtID:prdtID, quantity:quantity, msrID:msrID}, function(data){
			if(data=="updated") {
				swal({
					title: "Success",
					text: "the product you selected has been returned successfully",
					type: "success",
					timer: 1500,
					showConfirmButton: false
				},
					function() {
						location.reload();
					}
				);
			} else {
				swal("Oops!", data, "error");
			}
		});
	});
	return false;
}
function addNewItem4Prchse() {
	var prchseID	= $("#prchseID").val();
	var slcCtgry	= $("#slcCtgry").val(); 		var slcCtgry2	= $("#slcCtgry :selected").text();
	var slcPrdcts	= $("#slcPrdcts").val();		var slcPrdcts2	= $("#slcPrdcts :selected").text();
	var slcMeasure	= $("#slcMeasure").val();		var slcMeasure2	= $("#slcMeasure :selected").text();
	var txtPrdQnty	= $("#txtPrdQnty").val();
	var txtCost		= $("#txtCost").val();
	var txtSales	= $("#txtSales").val();

	if(slcCtgry.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Select category");
		$("#slcCtgry").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(slcPrdcts.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Select product");
		$("#slcPrdcts").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(txtPrdQnty.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Quantity is missing");
		$("#txtPrdQnty").css("border-color", "#FF0000");
		return false;
	} else if(Number(txtPrdQnty) < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Quantity must be greater than 0");
		$("#txtPrdQnty").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(txtCost.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Cost price is missing");
		$("#txtCost").css("border-color", "#FF0000");
		return false;
	} else if(Number(txtCost) < 0.1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Cost price must be greater than 0");
		$("#txtCost").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(txtSales.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Sales price is missing");
		$("#txtSales").css("border-color", "#FF0000");
		return false;
	} else if(Number(txtSales) < 0.1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Sales price must be greater than 0");
		$("#txtSales").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	$.post("./includes/inventory.php?action=saveNew&dest=addNewItem4Prchse&addedBy="+myUser, { prchseID:prchseID, prdtID:slcPrdcts, quantity:txtPrdQnty, measure:slcMeasure, costPrice:txtCost, salesPrice:txtSales }, function(data) {
		var addedpos = data.search("added");
		$("label.process").css("display", "none");
		if(addedpos==0) {
			var lastID = data.slice(6,21);
			swal({
				title: "Success!",
				text: "You added new product for this purchase record.",
				type: "success",
				timer: 1500,
				showConfirmButton: false
			},
				function() {
					location.reload();
				}
			);
		} else {
			swal("Oops!", data, "error");
			$("#btnAdd2").attr("disabled", false);
		}
	});
	return false;
}
function delPrchseItem(recNum, itemID, prchseID) {
	swal({
		title: "Are you sure to delete?",
		text: "You going to remove this product from this purchase!",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: 'Yes, remove it!',
		closeOnConfirm: false
	},
	function() {
		$.post("./includes/inventory.php?action=deleteRec&dest=delPrchseItem",{ itemID:itemID, prchseID:prchseID }, function(data){
			if(data=="deleted") {
				$("div#list div.listItem.rec"+recNum).find("input").val("");
				$("div#list div.listItem.rec"+recNum).fadeOut(500, function(){ $(this).remove(); });
				swal({
					title: "Success",
					text: "Product you selected has been removed permenantly",
					type: "success",
					timer: 1500,
					showConfirmButton: false
				});
			} else {
				swal("Oops!", data, "error");
			}
		});
	});
	return false;
}


/* ---------------------------------------------------------------
---------------------- distribute products -----------------------
-----------------------------------------------------------------*/

function updateDistrPrdt() {
	var perPage = $("#slcPerPage").val();
	var period = $("#slcPeriod").val();
	var count = $("label#count").html();
	$.ajax({
		type: "POST",
		url: "./includes/inventory.php?action=setFoundNum&dest=distrPrdt",
		cache: false,
		timeout: 2000,
		success: function(result){
			if(result != count){
				$("#refresh").html('records changed, \
				<a onclick="return loadDistrPrdtTwo(0,'+perPage+',\''+period+'\');">refresh now!</a>');
				(function blink(){
					$("span#refresh a").fadeOut(500).fadeIn(500, blink);
				})();
			}
			setTimeout(function(){
				updateDistrPrdt();
			}, 60000);
		}
	});
}
function loadDistrPrdt(pageLimit, perPage, period) {
	$("#dataTable div#loading").css("display", "inline");
	var dataString = 'pageLimit='+ pageLimit+'&period='+ period+'&perPage='+ perPage;
	$.ajax({
		type: "POST",
		url: "./includes/inventory.php?action=loadTable&dest=allDistrPrdt&myRole="+myRole+"&myUser="+myUser,
		data: dataString,
		cache: false,
		timeout: 2000,
		success: function(result){
			$("#dataTable div#loading").css("display", "none");
			$(".load_more_link").addClass('noneLink');
			$("#dataTable").append(result);
		},
	});
	return false;
}
function loadDistrPrdtTwo(pageLimit, perPage, period) {
	$("#dataTable div#loading").css("display", "inline");
	var dataString = 'pageLimit='+ pageLimit+'&period='+ period+'&perPage='+ perPage;
	$.ajax({
		type: "POST",
		url: "./includes/inventory.php?action=loadTable&dest=allDistrPrdt&myRole="+myRole+"&myUser="+myUser,
		data: dataString,
		cache: false,
		timeout: 2000,
		success: function(result){
			$("#dataTable div#loading").css("display", "none");
			$(".load_more_link").addClass('noneLink');
			$("#dataTable").html('<div id="record" class="header"><div class="cave button">Action</div>\
                <div class="cave lshort">Sales No.</div>\
                <div class="cave middle">Department</div>\
                <div class="cave lmiddle">Carrier Person</div>\
                <div class="cave lshort">No. Products</div>\
                <div class="cave middle">Date</div></div>');
			$("#dataTable").append(result);

			(function (){
				//
				$.ajax({
					type: "POST",
					url: "./includes/inventory.php?action=setFoundNum&dest=distrPrdt",
					cache: false,
					timeout: 2000,
					success: function(numRecs){
						$("#foundNum").html('<label id="count">'+numRecs+'</label> record(s) has been found\
						<span id="refresh"></span>');
					}
				});
				//
			})();
		},
	});
	return false;
}
function smpfyDistrPrdt() {
	$("#slcCtgry").change(function() {
		var ctgryID = $("#slcCtgry").val();
		if(ctgryID=="") {
			$("#slcPrdcts").html('');
		} else {
			$.post("./includes/inventory.php?action=searchRec&dest=ctgry4Distr", { ctgryID: ctgryID }, function(data) {
				$("#slcPrdcts").html(data);
			});
		}
		$("#prdctQnty").val('');
		clearErrors();
	});
	//
	$("#slcPrdcts").change(function() {
		var prdID = $("#slcPrdcts").val();
		if(prdID=="") {
			$("select#slcMeasure").html('');
		} else {
			$.post("./includes/inventory.php?action=searchRec&dest=getPrdctMsr", { prdID: prdID }, function(data) {
				$("select#slcMeasure").html(data);
			});
		}
		clearErrors();
	});
}
function check_distrPrdt() {
	var txtCarrier 	= $("#txtCarrier").val();
	var slcCtgry	= $("#slcCtgry").val();
	var slcPrdcts	= $("#slcPrdcts").val();		var slcPrdcts2	= $("#slcPrdcts :selected").text();
	var prdctQnty	= $("#prdctQnty").val();
	var slcMeasure	= $("#slcMeasure").val();
	var slcWhouse	= $("#slcWhouse").val();		var slcWhouse2	= $("#slcWhouse :selected").text();

	if(slcCtgry.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Select category");
		$("#slcCtgry").css("border-color", "#FF0000");
		if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.two").offset().top }, 'slow'); }
		return false;
	} else { clearErrors(); }

	if(slcPrdcts.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Select product");
		$("#slcPrdcts").css("border-color", "#FF0000");
		if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.two").offset().top }, 'slow'); }
		return false;
	} else { clearErrors(); }

	if(prdctQnty.length < 1) {
		$("#error3").css("display", "inline");
		$("#error3").html("Quantity is missing");
		$("#prdctQnty").css("border-color", "#FF0000");
		if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.two").offset().top }, 'slow'); }
		return false;
	} else if(Number(prdctQnty) < 0.1) {
		$("#error3").css("display", "inline");
		$("#error3").html("Quantity must be greater than 0");
		$("#prdctQnty").css("border-color", "#FF0000");
		if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.two").offset().top }, 'slow'); }
		return false;
	} else { clearErrors(); }

	if(slcMeasure.length < 1) {
		$("#error3").css("display", "inline");
		$("#error3").html("Select measurement");
		$("#slcMeasure").css("border-color", "#FF0000");
		if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.two").offset().top }, 'slow'); }
		return false;
	} else { clearErrors(); }

	if(slcWhouse.length < 1) {
		$("#error4").css("display", "inline");
		$("#error4").html("Select wherehouse");
		$("#slcWhouse").css("border-color", "#FF0000");
		if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.two").offset().top }, 'slow'); }
		return false;
	} else { clearErrors(); }

	swal({
		title: "Are you sure?",
		text: "You going to distribute this product right now!\nBe aware that you can distribute other products later",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: '#ad5418',
		confirmButtonText: 'Yes, do it!',
		closeOnConfirm: false
	},
	function() {
		$("label.process").css("display", "inline");
		$("#btnSave").attr("disabled", true);
		$("#btnSave").html("Wait...");
		$.post("./includes/inventory.php?action=saveNew&dest=distrPrdt&addedBy="+myUser, { txtCarrier:txtCarrier, prdctID:slcPrdcts, prdctQnty:prdctQnty, slcMeasure:slcMeasure, slcWhouse:slcWhouse}, function(data) {
			var addedpos = data.search("added");
			if(addedpos==0) {
				var lastID = data.slice(6,21);
				swal({
					title: "Success!",
					text: "Your distributed "+prdctQnty+" piece(s) of "+slcPrdcts2+" to "+slcWhouse2,
					type: "success",
					timer: 1500,
					showConfirmButton: false
				},
					function() {
						window.location = "./workplace.php?role="+myRole+"&task=inventory&subtask=distrPrdts\
						&action=showInfo&salesID="+lastID;
					}
				);
			} else {
				swal("Oops", data, "error");
			}
			$("label.process").css("display", "none");
			$("#btnSave").attr("disabled", false);
			$("#btnSave").html("Distribute");
		});
	});
	return false;
}
function distrNewPrdt() {
	var txtCarrier 	= $("#txtCarrier").val();
	var reference 	= $("#reference").val();
	var slcCtgry	= $("#slcCtgry").val();
	var slcPrdcts	= $("#slcPrdcts").val();		var slcPrdcts2	= $("#slcPrdcts :selected").text();
	var prdctQnty	= $("#prdctQnty").val();
	var slcMeasure	= $("#slcMeasure").val();		var slcMeasure2	= $("#slcMeasure :selected").text();
	var slcWhouse	= $("#slcWhouse").val();		var slcWhouseTxt = $("#slcWhouseTxt").val();

	if(slcCtgry.length < 1) {
		$("#qalad1").css("display", "inline");
		$("#qalad1").html("Select category");
		$("#slcCtgry").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(slcPrdcts.length < 1) {
		$("#qalad2").css("display", "inline");
		$("#qalad2").html("Select product");
		$("#slcPrdcts").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(prdctQnty.length < 1) {
		$("#qalad3").css("display", "inline");
		$("#qalad3").html("Quantity is missing");
		$("#prdctQnty").css("border-color", "#FF0000");
		return false;
	} else if(Number(prdctQnty) < 0.1) {
		$("#qalad3").css("display", "inline");
		$("#qalad3").html("Quantity must be greater than 0");
		$("#prdctQnty").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(slcMeasure.length < 1) {
		$("#qalad3").css("display", "inline");
		$("#qalad3").html("Select measurement");
		$("#slcMeasure").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	swal({
		title: "Are you sure?",
		text: "You going to distribute this product right now!",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: '#ad5418',
		confirmButtonText: 'Yes, do it!',
		closeOnConfirm: false
	},
	function() {
		$("#btnAdd").attr("disabled", true);
		$("#btnAdd").html("Wait...");
		$.post("./includes/inventory.php?action=updateExist&dest=distrPrdt4Pop&updatedBy="+myUser, { txtCarrier:txtCarrier, reference:reference, prdctID:slcPrdcts, prdctQnty:prdctQnty, slcMeasure:slcMeasure, slcWhouse:slcWhouse}, function(data) {
			if(data=="updated") {
				swal({
					title: "Success!",
					text: "Your distributed "+prdctQnty+" "+slcMeasure2+" of "+slcPrdcts2+" to "+slcWhouseTxt,
					type: "success",
					timer: 1500,
					showConfirmButton: false
				},
					function() {
						location.reload();
					}
				);
			} else {
				swal("Oops", data, "error");
			}
			$("#btnAdd").attr("disabled", false);
			$("#btnAdd").html("Distribute");
		});
	});
	return false;
}
function catchDistrPrdt(recID) {
	$.post("./includes/inventory.php?action=get_recInfo&dest=getDistrPrdt", { recID:recID, myRole:myRole }, function(data) {
		$("div#foundNum").html('<label id="count">1</label> record has been selected.<span id="refresh"></span>');
		$("div#dataTable").html(data);
	});
	$("div.suggest").css("display", "none");
}


/* ---------------------------------------------------------------
---------------------- transfer products -----------------------
-----------------------------------------------------------------*/

function updateTrnsfPrdt() {
	var perPage = $("#slcPerPage").val();
	var period = $("#slcPeriod").val();
	var count = $("label#count").html();
	$.ajax({
		type: "POST",
		url: "./includes/inventory.php?action=setFoundNum&dest=trnsfPrdt",
		cache: false,
		timeout: 2000,
		success: function(result){
			if(result != count){
				$("#refresh").html('records changed, \
				<a onclick="return loadTrnsfPrdtTwo(0,'+perPage+',\''+period+'\');">refresh now!</a>');
				(function blink(){
					$("span#refresh a").fadeOut(500).fadeIn(500, blink);
				})();
			}
			setTimeout(function(){
				updateTrnsfPrdt();
			}, 60000);
		}
	});
}
function loadTrnsfPrdt(pageLimit, perPage, period) {
	$("#dataTable div#loading").css("display", "inline");
	var dataString = 'pageLimit='+ pageLimit+'&period='+ period+'&perPage='+ perPage;
	$.ajax({
		type: "POST",
		url: "./includes/inventory.php?action=loadTable&dest=allTrnsfPrdt&myRole="+myRole+"&myUser="+myUser,
		data: dataString,
		cache: false,
		timeout: 2000,
		success: function(result){
			$("#dataTable div#loading").css("display", "none");
			$(".load_more_link").addClass('noneLink');
			$("#dataTable").append(result);
		},
	});
	return false;
}
function loadTrnsfPrdtTwo(pageLimit, perPage, period) {
	$("#dataTable div#loading").css("display", "inline");
	var dataString = 'pageLimit='+ pageLimit+'&period='+ period+'&perPage='+ perPage;
	$.ajax({
		type: "POST",
		url: "./includes/inventory.php?action=loadTable&dest=allTrnsfPrdt&myRole="+myRole+"&myUser="+myUser,
		data: dataString,
		cache: false,
		timeout: 2000,
		success: function(result){
			$("#dataTable div#loading").css("display", "none");
			$(".load_more_link").addClass('noneLink');
			$("#dataTable").html('<div id="record" class="header">\
				<div class="cave button">Action</div>\
                <div class="cave lshort">Trans. No</div>\
                <div class="cave lmiddle">From Department</div>\
                <div class="cave lmiddle">To Department</div>\
                <div class="cave lshort">No. Products</div>\
                <div class="cave smiddle">Date</div>\
			</div>');
			$("#dataTable").append(result);

			(function (){
				//
				$.ajax({
					type: "POST",
					url: "./includes/inventory.php?action=setFoundNum&dest=trnsfPrdt",
					data: dataString,
					cache: false,
					timeout: 2000,
					success: function(numRecs){
						$("#foundNum").html('<label id="count">'+numRecs+'</label> record(s) has been found\
						<span id="refresh"></span>');
					}
				});
				//
			})();
		},
	});
	return false;
}
function smpfyTrnsfrPrdt() {
	$("#slcWhouse1").change(function() {
		var whouseID = $("#slcWhouse1").val();
		if(whouseID=="") {
			$("#slcCtgry").html('');
		} else {
			$.post("./includes/inventory.php?action=searchRec&dest=ctgry4trnfr", { whouseID: whouseID }, function(data) {
				$("#slcCtgry").html(data);
			});
		}
		$("#slcPrdcts").html('');
		$("#prdQnty").val('');
		clearErrors();
	});
	//
	$("#slcCtgry").change(function() {
		var ctgryID = $("#slcCtgry").val();
		var slcWhouse1 = $("#slcWhouse1").val();
		if(ctgryID=="") {
			$("#slcPrdcts").html('');
		} else {
			$.post("./includes/inventory.php?action=searchRec&dest=whousePrdcts", { ctgryID: ctgryID, myWhouse: slcWhouse1 }, function(data) {
				$("#slcPrdcts").html(data);
			});
		}
		clearErrors();
	});
	//
	$("#slcPrdcts").change(function() {
		var prdID = $("#slcPrdcts").val();
		if(prdID=="") {
			$("select#slcMeasure").html('');
		} else {
			$.post("./includes/inventory.php?action=searchRec&dest=getPrdctMsr", { prdID: prdID }, function(data) {
				$("select#slcMeasure").html(data);
			});
		}
		clearErrors();
	});
}
function check_trnsPrdct() {
	var txtCarrier 	= $("#txtCarrier").val();
	var slcWhouse1	= $("#slcWhouse1").val();
	var slcCtgry	= $("#slcCtgry").val();
	var slcPrdcts	= $("#slcPrdcts").val();		var slcPrdcts2		= $("#slcPrdcts :selected").text();
	var prdctQnty	= $("#prdctQnty").val();
	var slcMeasure	= $("#slcMeasure").val();		var slcMeasure2		= $("#slcMeasure :selected").text();
	var slcWhouse2	= $("#slcWhouse2").val();

	if(slcWhouse1.length < 1) {
		$("#error1").css("display", "inline");
		$("#error1").html("Select wherehouse from");
		$("#slcWhouse1").css("border-color", "#FF0000");
		if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.two").offset().top }, 'slow'); }
		return false;
	} else { clearErrors(); }

	if(slcCtgry.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Select category");
		$("#slcCtgry").css("border-color", "#FF0000");
		if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.three").offset().top }, 'slow'); }
		return false;
	} else { clearErrors(); }

	if(slcPrdcts.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Select product");
		$("#slcPrdcts").css("border-color", "#FF0000");
		if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.three").offset().top }, 'slow'); }
		return false;
	} else { clearErrors(); }

	if(prdctQnty.length < 1) {
		$("#error3").css("display", "inline");
		$("#error3").html("Quantity is missing");
		$("#prdctQnty").css("border-color", "#FF0000");
		if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.three").offset().top }, 'slow'); }
		return false;
	} else if(Number(prdctQnty) < 0.1) {
		$("#error3").css("display", "inline");
		$("#error3").html("Quantity must be greater than 0");
		$("#prdctQnty").css("border-color", "#FF0000");
		if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.three").offset().top }, 'slow'); }
		return false;
	} else { clearErrors(); }

	if(slcMeasure.length < 1) {
		$("#error3").css("display", "inline");
		$("#error3").html("Select measurement");
		$("#slcMeasure").css("border-color", "#FF0000");
		if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.three").offset().top }, 'slow'); }
		return false;
	} else { clearErrors(); }

	if(slcWhouse2.length < 1) {
		$("#error4").css("display", "inline");
		$("#error4").html("Select wherehouse to");
		$("#slcWhouse2").css("border-color", "#FF0000");
		if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.four").offset().top }, 'slow'); }
		return false;
	} else if(slcWhouse1==slcWhouse2) {
		$("#error4").css("display", "inline");
		$("#error4").html("Select different wherehouses");
		$("#slcWhouse2").css("border-color", "#FF0000");
		if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.four").offset().top }, 'slow'); }
		return false;
	} else { clearErrors(); }

	swal({
		title: "Are you sure?",
		text: "You going to transfer this product directly!",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: '#ad5418',
		confirmButtonText: 'Yes, do it!',
		closeOnConfirm: false
	},
	function() {
		$("label.process").css("display", "inline");
		$("#btnSave").attr("disabled", true);
		$("#btnSave").html("Wait...");
		$.post("./includes/inventory.php?action=updateExist&dest=trnsfPrdt&updatedBy="+myUser, { txtCarrier:txtCarrier, slcWhouse1:slcWhouse1, prdctID:slcPrdcts, prdctQnty:prdctQnty, slcMeasure:slcMeasure, slcWhouse2:slcWhouse2 }, function(data) {
			var addedpos = data.search("added");
			if(addedpos==0) {
				var lastID = data.slice(6,21);
				swal({
					title: "Success!",
					text: "Your transfered "+prdctQnty+" "+slcMeasure2+" of "+slcPrdcts2,
					type: "success",
					timer: 1500,
					showConfirmButton: false
				},
					function() {
						window.location = "./workplace.php?role="+myRole+"&task=inventory&subtask=trnsfrPrdcts\
						&action=showInfo&acvtyID="+lastID;
					}
				);
			} else {
				swal("Oops", data, "error");
			}
			$("label.process").css("display", "none");
			$("#btnSave").attr("disabled", false);
			$("#btnSave").html("Transfer");
		});
	});
	return false;
}
function trnsfNewPrdt() {
	var txtCarrier 	= $("#txtCarrier").val();
	var reference 	= $("#reference").val();
	var slcCtgry	= $("#slcCtgry").val();
	var slcPrdcts	= $("#slcPrdcts").val();		var slcPrdcts2	= $("#slcPrdcts :selected").text();
	var prdctQnty	= $("#prdctQnty").val();
	var slcMeasure	= $("#slcMeasure").val();		var slcMeasure2	= $("#slcMeasure :selected").text();
	var slcWhouse1	= $("#slcWhouse1").val();
	var slcWhouse2	= $("#slcWhouse2").val();		var slcWhouseTo	= $("p#whouseTo").html();

	if(slcCtgry.length < 1) {
		$("#qalad1").css("display", "inline");
		$("#qalad1").html("Select category");
		$("#slcCtgry").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(slcPrdcts.length < 1) {
		$("#qalad2").css("display", "inline");
		$("#qalad2").html("Select product");
		$("#slcPrdcts").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(prdctQnty.length < 1) {
		$("#qalad3").css("display", "inline");
		$("#qalad3").html("Quantity is missing");
		$("#prdctQnty").css("border-color", "#FF0000");
		return false;
	} else if(Number(prdctQnty) < 0.1) {
		$("#qalad3").css("display", "inline");
		$("#qalad3").html("Quantity must be greater than 0");
		$("#prdctQnty").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(slcMeasure.length < 1) {
		$("#qalad3").css("display", "inline");
		$("#qalad3").html("Select measurement");
		$("#slcMeasure").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	swal({
		title: "Are you sure?",
		text: "You going to transfer this product right now!",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: '#ad5418',
		confirmButtonText: 'Yes, do it!',
		closeOnConfirm: false
	},
	function() {
		$("#btnAdd").attr("disabled", true);
		$("#btnAdd").html("Wait...");
		$.post("./includes/inventory.php?action=updateExist&dest=trnsfPrdt4Pop&updatedBy="+myUser, { txtCarrier:txtCarrier, reference:reference, prdctID:slcPrdcts, prdctQnty:prdctQnty, slcMeasure:slcMeasure, slcWhouse1:slcWhouse1, slcWhouse2:slcWhouse2}, function(data) {
			var addedpos = data.search("added");
			if(addedpos==0) {
				var lastID = data.slice(6,21);
				swal({
					title: "Success!",
					text: "Your transfered "+prdctQnty+" "+slcMeasure2+" of "+slcPrdcts2+" to "+slcWhouseTo,
					type: "success",
					timer: 1500,
					showConfirmButton: false
				},
					function() {
						location.reload();
					}
				);
			} else {
				swal("Oops", data, "error");
			}
			$("#btnAdd").attr("disabled", false);
			$("#btnAdd").html("Transfer");
		});
	});
	return false;
}
function catchTrnsfPrdt(recID) {
	$.post("./includes/inventory.php?action=get_recInfo&dest=getTrnsfPrdt", { recID:recID, myRole:myRole }, function(data) {
		$("div#foundNum").html('<label id="count">1</label> record has been selected.<span id="refresh"></span>');
		$("div#dataTable").html(data);
	});
	$("div.suggest").css("display", "none");
}



/* ---------------------------------------------------------------
------------------------ store management ------------------------
-----------------------------------------------------------------*/
function loadStore(pageLimit, perPage) {
	$("#dataTable div#loading").css("display", "inline");
	var dataString = 'pageLimit='+ pageLimit+'&perPage='+ perPage;
	$.ajax({
		type: "POST",
		url: "./includes/inventory.php?action=loadTable&dest=allStore&myRole="+myRole+"&myBranch="+myBranch+"&myWhouse="+myWhouse,
		data: dataString,
		cache: false,
		timeout: 2000,
		success: function(result){
			$("#dataTable div#loading").css("display", "none");
			$(".load_more_link").addClass('noneLink');
			$("#dataTable").append(result);
		},
	});
	return false;
}
function editQnty4StoreAdj(){
	var whouseID	= $("#whouseID").val();
	var prdtID		= $("#prdtID").val();
	var newQuantity = $("#newQuantity").val();
	var prInfo 		= $("#prInfo").val();
	var quantity 	= $("#quantity").val();
	var slcMeasure 	= $("#slcMeasure").val();
	var cosPr 		= $("#cosPr").val();

	if(prdtID.length < 1) {
		$("#error1").css("display", "inline");
		$("#error1").html("Product is missing");
		$("#prdtID").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(quantity.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Current quantity is missing");
		$("#quantity").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(newQuantity.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Quantity is missing");
		$("#newQuantity").css("border-color", "#FF0000");
		return false;
	} else if(Number(newQuantity) < 0.1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Quantity must be greater than 0");
		$("#newQuantity").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

 	swal({
		title: "Are you sure?",
		text: "You going to change the store quantity for this product right now!\n",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: '#ad5418',
		confirmButtonText: 'Yes, do it!',
		closeOnConfirm: false
	},
	function() {
		$.post("./includes/inventory.php?action=updateExist&dest=editStoreQty&updatedBy="+myUser, { prdtID:prdtID, whouseID:whouseID, newQuantity:newQuantity, cosPr:cosPr, quantity:quantity, slcMeasure:slcMeasure}, function(data) {
			$("label.process").css("display", "none");
			if(data=="updated") {
				var lastID = data.slice(6,21);
				swal({
					title: "Success!",
					text: "Your changed quantity of "+prInfo+" to "+newQuantity,
					type: "success",
					timer: 1500,
					showConfirmButton: false
				},
					function() {
						window.location = "./workplace.php?role="+myRole+"&task=inventory&subtask=strAdjsmnt";
					}
				);
			} else {
				swal("Oops", data, "error");
			}
		});
	});
	return false;
}
function editPrice4StoreAdj(){
	var whouseID	= $("#whouseID").val();
	var prdtID		= $("#prdtID").val();
	var salPr		= $("#salPr").val();
	var NewPrice 	= $("#NewPrice").val();
	var prInfo 		= $("#prInfo").val();
	var quantity 	= $("#quantity").val();

	if(prdtID.length < 1) {
		$("#error1").css("display", "inline");
		$("#error1").html("Product is missing");
		$("#prdtID").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(salPr.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Current sales price is missing");
		$("#salPr").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(NewPrice.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("New sales price can't empty");
		$("#NewPrice").css("border-color", "#FF0000");
		return false;
	} else if(Number(NewPrice) < 0.1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Sales price must be greater than 0");
		$("#NewPrice").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

 	swal({
		title: "Are you sure?",
		text: "You going to change the sales price of this product!\n",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: '#ad5418',
		confirmButtonText: 'Yes, do it!',
		closeOnConfirm: false
	},
	function() {
		$.post("./includes/inventory.php?action=updateExist&dest=editStorePrice&updatedBy="+myUser, { prdtID:prdtID, whouseID:whouseID, NewPrice:NewPrice, salPr:salPr, quantity:quantity}, function(data) {
			$("label.process").css("display", "none");
			if(data=="updated") {
				var lastID = data.slice(6,21);
				swal({
					title: "Success!",
					text: "Your changed "+prInfo+" price  of $"+ NewPrice,
					type: "success",
					timer: 1500,
					showConfirmButton: false
				},
					function() {
						window.location = "./workplace.php?role="+myRole+"&task=inventory&subtask=strAdjsmnt";
					}
				);
			} else {
				swal("Oops", data, "error");
			}
		});
	});
	return false;
}
function catchPrdtInStre(recID){
	$.post("./includes/inventory.php?action=get_recInfo&dest=getPrdtInStore", { recID:recID, myRole:myRole }, function(data) {
		$("div#foundNum").html('<label id="count">1</label> record has been selected.<span id="refresh"></span>');
		$("div#dataTable").html(data);
	});
	$("div.suggest").css("display", "none");
}



/* ---------------------------------------------------------------
--------------------------- customers ----------------------------
-----------------------------------------------------------------*/

function updateCustBar() {
	var perPage = $("#slcPerPage").val();
	var count = $("label#count").html();
	var dataString = 'myRole='+ myRole+'&myWhouse='+ myWhouse;
	$.ajax({
		type: "POST",
		url: "./includes/inventory.php?action=setFoundNum&dest=clients",
		data: dataString,
		cache: false,
		timeout: 2000,
		success: function(result){
			if(result != count){
				$("#refresh").html('records changed, <a onclick="return loadClientsTwo(0,'+perPage+');">refresh now!</a>');
				(function blink(){
					$("span#refresh a").fadeOut(500).fadeIn(500, blink);
				})();
			}
			setTimeout(function(){
				updateCustBar();
			}, 60000);
		}
	});
}
function loadClients(pageLimit, perPage) {
	$("#dataTable div#loading").css("display", "inline");
	var dataString = 'pageLimit='+ pageLimit+'&perPage='+ perPage+"&myWhouse="+myWhouse;
	$.ajax({
		type: "POST",
		url: "./includes/inventory.php?action=loadTable&dest=allClient&myUser="+myUser+"&myRole="+myRole,
		data: dataString,
		cache: false,
		timeout: 2000,
		success: function(result){
			$("#dataTable div#loading").css("display", "none");
			$(".load_more_link").addClass('noneLink');
			$("#dataTable").append(result);
		},
	});
	return false;
}
function loadClientsTwo(pageLimit, perPage) {
	$("#dataTable div#loading").css("display", "inline");
	var dataString = 'pageLimit='+ pageLimit+'&perPage='+ perPage+"&myWhouse="+myWhouse;
	$.ajax({
		type: "POST",
		url: "./includes/inventory.php?action=loadTable&dest=allClient&myUser="+myUser+"&myRole="+myRole,
		data: dataString,
		cache: false,
		timeout: 2000,
		success: function(result){
			$("#dataTable div#loading").css("display", "none");
			$(".load_more_link").addClass('noneLink');
			$("#dataTable").html('<div id="record" class="header"><div class="cave button">Action</div><div class="cave long">Customer Name</div><div class="cave smiddle">Phone Number</div><div class="cave lmiddle">Email Address</div><div class="cave lshort">Status</div></div>');
			$("#dataTable").append(result);

			(function (){
				//
				var dataString = 'myRole='+ myRole+'&myWhouse='+ myWhouse;
				$.ajax({
					type: "POST",
					url: "./includes/inventory.php?action=setFoundNum&dest=clients",
					data: dataString,
					cache: false,
					timeout: 2000,
					success: function(numRecs){
						$("#foundNum").html('<label id="count">'+numRecs+'</label> record(s) has been found\
						<span id="refresh"></span>');
					}
				});
				//
			})();
		},
	});
	return false;
}
function check_editClient() {
	var clientID 	= $("#clientID").val();
	var clientName 	= $("#clientName").val();
	var txtPhone	= $("#txtPhone").val();
	var txtEmail 	= $("#txtEmail").val();
	var slcStatus 	= $("#slcStatus").val();

	if(clientName.length < 1) {
		$("#error1").css("display", "inline");
		$("#error1").html("Customer name can't be empty");
		$("#clientName").css("border-color", "#FF0000");
		if(window.innerWidth<=768) {
			$('html, body').animate({ scrollTop: $(".record.one").offset().top }, 'slow');
		}
		return false;
	} else { clearErrors(); }

	if(txtPhone.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Phone number is missing");
		$("#txtPhone").css("border-color", "#FF0000");
		if(window.innerWidth<=768) {
			$('html, body').animate({ scrollTop: $(".record.two").offset().top }, 'slow');
		}
		return false;
	} else { clearErrors(); }

	if(txtEmail.length > 0) {
		var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
		if(!txtEmail.match(emailExp)) {
			$("#error3").css("display", "inline");
			$("#error3").html("invalid email address");
			$("#txtEmail").css("border-color", "#FF0000");
			if(window.innerWidth<=768) {
				$('html, body').animate({ scrollTop: $(".record.two").offset().top }, 'slow');
			}
			return false;
		} else { clearErrors(); }
	}

	$("label.process").css("display", "inline");
	$("#btnUpdate").attr("disabled", true);
	$("#btnUpdate").html("Wait...");

	$.post("./includes/inventory.php?action=updateExist&dest=editClient&updatedBy="+myUser, { clientID:clientID, clientName:clientName, txtPhone:txtPhone, txtEmail:txtEmail, slcStatus:slcStatus }, function(data) {
		var addedpos = data.search("added");
		$("label.process").css("display", "none");
		if(data=="updated") {
			swal({
				title: "Success!",
				text: "You updated customer details successfully.",
				type: "success",
				timer: 1500,
				showConfirmButton: false,
			},
				function() {
					window.location = "./workplace.php?role="+myRole+"&task=inventory&subtask=clients\
					&action=showInfo&recID="+clientID;
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
function delClient(clientID) {
	swal({
		title: "Are you sure?",
		text: "You going to delete this customer!",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: 'Yes, delete it!',
		closeOnConfirm: false
	},
	function() {
		$.post("./includes/inventory.php?action=deleteRec&dest=delClient", { clientID:clientID }, function(data) {
			if(data=="deleted") {
				swal({
					title: "Success!",
					text: "Selected customer details has been deleted.",
					type: "success",
					timer: 1500,
					showConfirmButton: false
				});
				var count = $("label#count").html();
				$("label#count").html(count-1);
				$("a.masax.rec"+clientID).parents("#record").fadeOut(500);
			} else {
				swal("Oops", data, "error");
			}
		});
	});
	return false;
}
function catchClient(recID) {
	$.post("./includes/inventory.php?action=get_recInfo&dest=getClient", { recID:recID, myRole:myRole, myUser:myUser }, function(data) {
		$("div#foundNum").html('<label id="count">1</label> record has been selected.<span id="refresh"></span>');
		$("div#dataTable").html(data);
	});
	$("div.suggest").css("display", "none");
}



/* ---------------------------------------------------------------
------------------------- product category -----------------------
----------------------------------------------------------------- */
function loadCtgry(pageLimit) {
	$("div.dynamicData.one #loading").css("display", "inline");
	var dataString = 'pageLimit='+ pageLimit+'&perPage='+15;
	$.ajax({
		type: "POST",
		url: "./includes/inventory.php?action=loadTable&dest=allCtgry&myUser="+myUser+"&myRole="+myRole,
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
function addNewCtgry() {
	swal({
		title: "Add Category",
		text: 'Give a name to this category',
		type: "input",
		showCancelButton: true,
		closeOnConfirm: false,
		animation: "slide-from-top",
		inputPlaceholder: "required",
	},
	function(category) {
		if (category === false) return false;
		if (category === "") {
			swal.showInputError("Please write category name");
			return false
		}
		$.post("./includes/inventory.php?action=saveNew&dest=addCtgry&addedBy="+myUser, {category:category}, function(data){
			var addedpos = data.search("added");
			if(addedpos==0) {
				var lastID = data.slice(6,21);
				swal({
					title: "Success!",
					text: "You successfully added new category.",
					type: "success",
					timer: 1500,
					showConfirmButton: false
				},
					function() {
						window.location = "./workplace.php?role="+myRole+"&task=inventory&subtask=products";
					}
				);
			} else {
				swal("Oops!", data, "error");
			}
		});
	});
	return false;
}
function check_editCtgry() {
	var ctgryID 	= $("#ctgryID").val();
	var receivedBy 	= $("#txtCtgry").val();
	var slcStatus 	= $("#slcStatus").val();

	if(txtCtgry.length < 1) {
		$("#error1").css("display", "inline");
		$("#error1").html("Please provide category");
		$("#txtCtgry").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	$("label.process").css("display", "inline");
	$("#btnUpdate").attr("disabled", true);
	$("#btnUpdate").html("Wait...");

	$.post("./includes/inventory.php?action=updateExist&dest=editCtgry&updatedBy="+myUser, { ctgryID:ctgryID, txtCtgry:txtCtgry, slcStatus:slcStatus }, function(data) {
		if(data=="updated") {
			swal({
				title: "Success!",
				text: "You updated category record successfully.",
				type: "success",
				timer: 1500,
				showConfirmButton: false
			},
				function() {
					window.location = "./workplace.php?role="+myRole+"&task=inventory&subtask=products";
				}
			);
		} else {
			swal("Oops!", data, "error");

		}
		$("label.process").css("display", "none");
		$("#btnUpdate").attr("disabled", false);
		$("#btnUpdate").html("Update");
	});
	return false;
}
function catchCtgry(recID) {
	$.post("./includes/inventory.php?action=get_recInfo&dest=getCtgry", { recID: recID, myUser: myUser, myRole: myRole }, function(data) {
		$("div.twoCols.one header span").html('[1 row]');
		$("div.dynamicData.one").html(data);
	});
	$("div.suggest.one").css("display", "none");
}

function delCtgry(ctgryID) {
	swal({
		title: "Are you sure?",
		text: "You going to delete this product category!",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: 'Yes, delete it!',
		closeOnConfirm: false
	},
	function() {
		$.post("./includes/inventory.php?action=deleteRec&dest=delCtgry", { ctgryID:ctgryID }, function(data) {
			if(data=="deleted") {
				swal({
					title: "Success!",
					text: "Selected product category has been deleted.",
					type: "success",
					timer: 1500,
					showConfirmButton: false
				},
					function() {
						window.location = "./workplace.php?role="+myRole+"&task=inventory&subtask=products";
					}
				);
			} else {
				swal("Oops", data, "error");
			}
		});
	});
	return false;
}

function loadPrdcts(pageLimit) {
	$("div.dynamicData.two #loading").css("display", "inline");
	var dataString = 'pageLimit='+ pageLimit+'&perPage='+15;
	$.ajax({
		type: "POST",
		url: "./includes/inventory.php?action=loadTable&dest=allPrdcts&myUser="+myUser+"&myRole="+myRole,
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
function simplyAddProduct(){
	$("#checkUnit, #switchUnit").click(function(){
		$('div#switchUnit').toggleClass("switchOn");
		if (document.getElementById("isDefualt").checked == true) {
			document.getElementById("isDefualt").checked = false;
		} else {
			document.getElementById("isDefualt").checked = true;
		}
	});
	//
	$("#slcUnits").change(function(){
		var slcUnits = $("#slcUnits").val();
		if(slcUnits!="all") {
			$.post("./includes/inventory.php?action=searchRec&dest=pickProMsure",{ slcUnits:slcUnits }, function(data) {
				$("#slcMsrmnt").html(data);
			});
		} else { $("#slcMsrmnt").html('<option value=""></option>'); }
		clearErrors();
	});
}
function addMsure4Product() {
	var slcMsrmnt = $("#slcMsrmnt").val(); 		var slcMsrmnt2 = $("#slcMsrmnt :selected").text();
	var isDefualt	= $("input#isDefualt:checked").val();
	if(isDefualt!="on") { var isDefualt="No"; } else { var isDefualt="Yes"; }

	if(slcMsrmnt.length < 1) {
		$("#error4").css("display", "inline");
		$("#error4").html("Select measurement");
		$("#slcMsrmnt").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	var newValue 	= "Yes";
	var check		= $("input#newValue", list);
	var MsrmntID	= slcMsrmnt.trim();
	var msrAdded	= $("input#msureID", list);

	if((!check.is("*") || !check.filter(function(i, el){return el.value.indexOf(isDefualt) > -1}).is("*")) && (!msrAdded.is("*") || !msrAdded.filter(function(i, el){return el.value.indexOf(MsrmntID) > -1}).is("*")) ) {
		$("div.list").append('<div class="listItem num'+num+'">\
			<div class="cave serial">\
			<input type="hidden" id="msureID" name="msureID[]" value="'+slcMsrmnt+'" readonly="readonly" />\
			<input type="hidden" name="newValue[]" id="newValue" value="'+newValue+'" readonly="readonly" /></div>\
			<div class="cave xlarge"><input type="text" value="'+slcMsrmnt2+'" readonly="readonly" /></div>\
			<div class="cave medium"><input type="text" name="isDefualt[]" value="'+isDefualt+'" readonly="readonly" /></div>\
			<div class="cave small"><a id="remove" onclick="return removeItem('+num+');">remove</a></div>\
		</div>');
		$("#slcUnits option:first").attr("selected", "selected");
		$("#slcMsrmnt").html("");
		$("input#isDefualt").attr("checked", false);
		$("div.switch").removeClass("switchOn");
		num++;
	} else {
        swal("Oops","This measurement already been added to list", "error");
    }
	return false;
}
function check_addProduct() {
	var txtName		= $("#txtName").val();
	var category	= $("#slcCategory").val();
	var prdtCode	= $("#prdtCode").val();
	var prdtMCode	= $("#prdtMCode").val();
	var minSales	= $("#minSales").val();
	var listItem	= $("div.theForm .listItem").height();
	var isDefualt	= $("input#isDefualt:checked").val();

	if(txtName.length < 1) {
		$("#error1").css("display", "inline");
		$("#error1").html("Provide product name");
		$("#txtName").css("border-color", "#FF0000");
		if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.one").offset().top }, 'slow'); }
		return false;
	} else { clearErrors(); }

	if(category.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Select product category");
		$("#slcCategory").css("border-color", "#FF0000");
		if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.two").offset().top }, 'slow'); }
		return false;
	} else { clearErrors(); }

	if(minSales.length < 1) {
		$("#error3").css("display", "inline");
		$("#error3").html("Min sales price is missing");
		$("input#minSales").css("border", "1px solid #FF0000");
		if(window.innerWidth<=768) {
			$('html, body').animate({ scrollTop: $(".record.three .twoCol.two").offset().top }, 'slow'); }
		return false;
	} else if((Number(minSales) < 0.1) || (Number(minSales) > 100)) {
		$("#error3").css("display", "inline");
		$("#error3").html("Min sales pricecan be 1-100%");
		$("input#miniSales").css("border", "1px solid #FF0000");
		if(window.innerWidth<=768) {
			$('html, body').animate({ scrollTop: $(".record.three .twoCol.two").offset().top }, 'slow'); }
		return false;
	} else { clearErrors(); }

	if(listItem<1) {
		$("#error5").css("display", "inline");
		$("#error5").html("You must assign at least one measurement to the product");
		return false;
	} else { clearErrors(); }

	$("label.process").css("display", "inline");
	$("#btnSave").attr("disabled", true);
	$("#btnSave").html("Wait...");

	return true;
}
function addMsureInPopup() {
	var slcUnits = $("#slcUnits").val();
	var slcMsrmnt = $("#slcMsrmnt").val();
	var prdtID = $("#prdtID").val();
	var isDefualt	= $("input#isDefualt:checked").val();

	if(isDefualt!="on") { var isDefualt="No"; } else { var isDefualt="Yes"; }

	if(slcUnits.length < 1) {
		$("#error4").css("display", "inline");
		$("#error4").html("Select unit type");
		$("#slcUnits").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(slcMsrmnt.length < 1) {
		$("#error4").css("display", "inline");
		$("#error4").html("Select measurement");
		$("#slcMsrmnt").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	$("#addToList").html("Please wait...");
	$.post("./includes/inventory.php?action=saveNew&dest=addMsureInPopup&addedBy="+myUser, { prdtID:prdtID, slcMsrmnt:slcMsrmnt,isDefualt:isDefualt }, function(data) {
		var addedpos = data.search("added");
		if(addedpos==0) {
			var lastID = data.slice(6,21);
			swal({
				title: "Success!",
				text: "You added new measurement successfully.",
				type: "success",
				timer: 1500,
				showConfirmButton: false
			},
				function() {
					location.reload();
				}
			);
 		} else {
			swal("Oops!", data, "error");
		}
		$("#addToList").html("New Measurement");
	});
	return false;
}
function delPrdctMsure(recNum, msrID, prdtID) {
	swal({
		title: "Are you sure to delete?",
		text: "You going to remove this measurement for this product.",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: 'Yes, delete it!',
		closeOnConfirm: false
	},
	function() {
		$.post("./includes/inventory.php?action=deleteRec&dest=delPrdctMsure",{msrID:msrID, prdtID:prdtID}, function(data){
			if(data=="deleted") {
				$("div#list div.listItem.num"+recNum).find("input").val("");
				$("div#list div.listItem.num"+recNum).fadeOut(500, function(){ $(this).remove(); });
				swal({
					title: "Success",
					text: "Measurement you selected has been removed permenantly",
					type: "success",
					timer: 1500,
					showConfirmButton: false
				});
			} else {
				swal("Oops!", data, "error");
			}
		});
	});
	return false;
}
function check_editProduct() {
	var prdtID 		= $("#prdtID").val();
	var txtName		= $("#txtName").val();
	var category	= $("#slcCategory").val();
	var prdtCode	= $("#prdtCode").val();
	var prdtMCode	= $("#prdtMCode").val();
	var minSales	= $("#minSales").val();

	var slcStatus 	= $("#slcStatus").val();

	if(txtName.length < 1) {
		$("#error1").css("display", "inline");
		$("#error1").html("Provide product name");
		$("#txtName").css("border-color", "#FF0000");
		if(window.innerWidth<=768) {
			$('html, body').animate({ scrollTop: $(".record.one").offset().top }, 'slow');
		}
		return false;
	} else { clearErrors(); }

	if(category.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Select product category");
		$("#slcCategory").css("border-color", "#FF0000");
		if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.two").offset().top }, 'slow'); }
		return false;
	} else { clearErrors(); }

	if(minSales.length < 1) {
		$("#error3").css("display", "inline");
		$("#error3").html("Min sales price is missing");
		$("input#minSales").css("border", "1px solid #FF0000");
		if(window.innerWidth<=768) {
			$('html, body').animate({ scrollTop: $(".record.three .twoCol.two").offset().top }, 'slow'); }
		return false;
	} else if((Number(minSales) < 1) || (Number(minSales) > 100)) {
		$("#error3").css("display", "inline");
		$("#error3").html("Min sales pricecan be 1-100%");
		$("input#miniSales").css("border", "1px solid #FF0000");
		if(window.innerWidth<=768) {
			$('html, body').animate({ scrollTop: $(".record.three .twoCol.two").offset().top }, 'slow'); }
		return false;
	} else { clearErrors(); }

	$("label.process").css("display", "inline");
	$("#btnUpdate").attr("disabled", true);
	$("#btnUpdate").html("Wait...");

	$.post("./includes/inventory.php?action=updateExist&dest=editProduct&updatedBy="+myUser, { prdtID:prdtID, txtName:txtName, category:category, prdtCode:prdtCode, prdtMCode:prdtMCode, minSales:minSales, slcStatus:slcStatus }, function(data) {
		$("label.process").css("display", "none");
		if(data=="updated") {
			swal({
				title: "Success!",
				text: "You updated product details successfully",
				type: "success",
				timer: 1500,
				showConfirmButton: false
			},
				function (){
					window.location = "./workplace.php?role="+myRole+"&task=inventory&subtask=products\
					&action=showInfo&recID="+prdtID;
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
function catchPrdct(recID) {
	$.post("./includes/inventory.php?action=get_recInfo&dest=getPrdct", { recID: recID, myUser: myUser, myRole: myRole }, function(data) {
		$("div.twoCols.two header span").html('[1 row]');
		$("div.dynamicData.two").html(data);
	});
	$("div.suggest.two").css("display", "none");
}
function delPrdct(prdtID) {
	swal({
		title: "Are you sure?",
		text: "You going to delete this product!",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: 'Yes, delete it!',
		closeOnConfirm: false
	},
	function() {
		$.post("./includes/inventory.php?action=deleteRec&dest=delPrdct", { prdtID:prdtID }, function(data) {
			if(data=="deleted") {
				swal({
					title: "Success!",
					text: "Selected product has been deleted.",
					type: "success",
					timer: 1500,
					showConfirmButton: false
				},
					function() {
						window.location = "./workplace.php?role="+myRole+"&task=inventory&subtask=products";
					}
				);
			} else {
				swal("Oops", data, "error");
			}
		});
	});
	return false;
}

/* --------------------------------------------
------------------ reports -------------------
----------------------------------------------*/

function resetRptFilter() {
	$("div.filter").css("display", "none");
	$("div.filter.byWhouse").css("display", "inline");
	$("div.filter.byDate").css("display", "inline");
}
function resetRptError() {
	$("div.filter input, div.filter select").css("border","1px solid #ccc");
	$("label.error").css("display", "none");
}
function resetError() {
	$("div.reportArea input[type='text'], div.reportArea input[type='month']").css("border-color", "#ccc");
	$("div.reportArea select").css("border-color", "#ccc");
	$("div.reportArea label.error").css("display", "none");
}
function catchVendor4Rpt(vndID, fullname) {
	$("#vendorID").val(vndID);
	$("#txtVendor").val(fullname);
	$("div.suggest").css("display", "none");
}
function simplifyInveReport() {
	$("#txtVendor").keyup(function() {
		$("div.suggest").css("display", "none");
		var txtVendor = $("#txtVendor").val();
		if(txtVendor!="") {
			$("div.suggest.two").css("display", "table-row");
			$.post("./includes/inventory.php?action=searchRec&dest=pickVendor4Rpt",{ vendorName:txtVendor}, function(data) {
				$("div.suggest.two").html(data);
			});
		} else { $("div.suggest.two").css("display", "none"); }
		clearErrors();
	});
	//
	var picker = new Pikaday({
		field: document.getElementById("startDate"),
		firstDay: 6,
		maxDate: new Date(today),
		yearRange: [2017,thisYear],
	});
	var picker2 = new Pikaday({
		field: document.getElementById("endDate"),
		firstDay: 6,
		maxDate: new Date(today),
		yearRange: [2017,thisYear],
	});
	var startDate,
    endDate,
    updateStartDate = function() {
		startPicker.setStartRange(startDate);
        endPicker.setStartRange(startDate);
        endPicker.setMinDate(startDate);
    },
    updateEndDate = function() {
		startPicker.setEndRange(endDate);
        startPicker.setMaxDate(endDate);
        endPicker.setEndRange(endDate);
    },
    startPicker = new Pikaday({
		field: document.getElementById("startDate"),
        maxDate: new Date(today),
		yearRange: [2017,thisYear],
        onSelect: function() {
			startDate = this.getDate();
            updateStartDate();
        }
    }),
    endPicker = new Pikaday({
		field: document.getElementById('endDate'),
        minDate: new Date(),
        maxDate: new Date(today),
		yearRange: [2017,thisYear],
        onSelect: function() {
			endDate = this.getDate();
            updateEndDate();
        }
    }),
    _startDate = startPicker.getDate(),
    _endDate = endPicker.getDate();
	if (_startDate) {
		startDate = _startDate;
        updateStartDate();
    }
	if (_endDate) {
		endDate = _endDate;
        updateEndDate();
    }
	//
	$("div.reportArea span, div.reportArea input[type='radio']").click(function() {
		$(this).parent("div.oneDiv").find("input[type='radio']").attr("checked", "checked");

		var rptType = $("input[name='reportType']:checked").val();
		if(rptType=="products") {
			resetRptFilter();

		} else if(rptType=="vndActvty") {
			$("div.filter").css("display", "none");
			$("div.filter.byVndActvty").css("display", "inline");
			$("div.filter.byDate").css("display", "inline");

		} else if(rptType=="products") {
			$("div.filter").css("display", "none");
			$("div.filter.byMyWhouse").css("display", "inline");

		} else if(rptType=="purchases") {
			$("div.filter").css("display", "none");
			$("div.filter.byPurchase").css("display", "inline");
			$("div.filter.byDate").css("display", "inline");
		}
		resetError();
	});
}
function check_reportInvParam() {
	resetError();
	var rptType 	= $("input[name='reportType']:checked").val();

	var slcWhouse	= $("select#slcWhouse").val();
	var txtVendor	= $("input#txtVendor").val();
	var vendorID	= $("input#vendorID").val();
	//
	var startDate	= $("input#startDate").val();
	var endDate		= $("input#endDate").val();
	//
	if(rptType=="vndActvty") {
		if(txtVendor.length<1 || vendorID=="") {
			$("#error1").css("display", "inline");
			$("#error1").html("Please select vendor");
			$("input#txtVendor").css("border-color", "#FF0000");
			$("div.suggest.two").css("display", "none");
			return false;
		} else { resetError(); }
	}
	if(rptType="products") {
		if(slcWhouse.length<1  || slcWhouse=="---") {
			$("#error1").css("display", "inline");
			$("#error1").html("Please select wherehouse");
			$("select#slcWhouse").css("border-color", "#FF0000");
			return false;
		} else { resetError(); }

		if(startDate.length<1) {
			$("#error1").css("display", "inline");
			$("#error1").html("Please select begining date");
			$("input#startDate").css("border-color", "#FF0000");
			return false;
		} else { resetError(); }

		if(endDate.length<1) {
			$("#error1").css("display", "inline");
			$("#error1").html("Please select ending date");
			$("input#endDate").css("border-color", "#FF0000");
			return false;
		} else { resetError(); }
	}
	$("label#process").css("display", "inline");
	$("#btnDisplay").attr("disabled", true);
	$("#btnDisplay").html("Wait...");
	return true;
}


/* --------------------------------------------
------------------ Inventory Management -------------------
----------------------------------------------*/

function catchVendor4InventoryPrchse(vndID,fullname,phone){
	$("input#vendorID").val(vndID);
	$("input#txtVendorNameInventory").val(fullname);
	$("p#pVName").html(fullname);
	$("p#pVPhone").html(phone);

	$("div.suggest").css("display", "none");
}
function catchPrdct4InventoryPrchse(supItemID,supItemName,recNo, measures){
	let record = $(`div.record.${recNo}`)
	console.log(recNo)
	// $.post("./includes/inventory.php?action=searchRec&dest=pickMeasures4Item", {supItemID:supItemID}, function(data){
	// 	$(record).find(".slcMeasure").html(data);
	// });
	$(record).find(".slcMeasure").html(measures);
	$(record).find("#txtItemName").val(supItemName);
	$(record).find("#pVName4prdct").html(supItemName);
	$(record).find("#prdID").val(supItemID);
	$(record).find("div.suggest").css("display", "none");
}
function catchPrdct4Inventorystock(supItemID,supItemName,lastLabel,quantity,recNo, measures){
	let record = $(`div.record.${recNo}`)
	// console.log(recNo)
	// $.post("./includes/inventory.php?action=searchRec&dest=pickMeasures4Item", {supItemID:supItemID}, function(data){
	// 	$(record).find(".slcMeasure").html(data);
	// });
	$(record).find(".slcMeasure").html(measures);
	$(record).find(".qtyOnStock").val(quantity);
	$(record).find("#txtProductName").val(supItemName);
	$(record).find("#pVName4prdct").html(supItemName);
	$(record).find("#txtPrdctID").val(supItemID);
	$(record).find("div.suggest").css("display", "none");
}
function check_addinventoryPrchse(form) {
	var beginBalance	= $("input#beginBalance:checked").val();
	if(beginBalance !="on") { var beginBalance="no"; } else { var beginBalance="yes"; }
	var vendorName	= $("#txtVendorNameInventory").val();
	var vendorID	= $("#vendorID").val();
	let error = true;

	$('.record.row:not(".header")').each((i, el) => {
		let prdID = $(el).find("input[name^='prdID']").val();
		let msrID = $(el).find("#slcMeasure").val();
		let txtQuantity = $(el).find("#txtQuantity").val();
		let txtCost = $(el).find("#txtCost").val();


		$(el).find("#txtQuantity").css('border', '0px');
		$(el).find("#slcMeasure").css('border', '0px');
		$(el).find("#txtCost").css('border', '0px');

		if(prdID)  {
			if(!txtQuantity)  {
				swal('Oops', 'Please provide quantity for all rows.', 'error')
				$(el).find("#txtQuantity").css('border', '1px solid red');
				error = true
				return false
			} else if(!msrID)  {
				swal('Oops', 'Some items are missing unit.', 'error')
				$(el).find("#slcMeasure").css('border', '1px solid red');
				error = true
				return false
			} else if(!txtCost)  {
				swal('Oops', 'Please provide cost price for all rows.', 'error')
				$(el).find("#txtCost").css('border', '1px solid red');
				error = true
				return false
			} else {
				error = false
			}
		}
	})

	// return false
	if(beginBalance=="no") {
		if(vendorName.length < 1) {
			$("#error1").css("display", "inline");
			$("#error1").html("Please select vendor");
			$("#txtVendorNameInventory").addClass("highlight");
			$("div.suggest").css("display", "none");
			return false;
		} else { clearErrors(); }
	}

	if(!error) {
		$("label.process").css("display", "inline");
		$("#btnSave").attr("disabled", true);
		$("#btnSave").html("Wait...");
		return true;
	} else {
		swal('Oops', 'Please fill at least one row.', 'error')
		return false;
	}

	return false;
}
function check_addinventoryStock(form) {
	clearErrors();
	let prdID 		= $(form).find($("#prdID")).val();
	var slcAction 	= $(form).find("#slcAction").val();
	var slcStorage 	= $(form).find("#slcStorage").val();
	var receivedBy 	= $(form).find("#receivedBy").val();
	var slcStorageTo = $(form).find("#slcStorageTo").val();
	var newQty 		= $(form).find("#newQty").val();

	if(slcStorage == slcStorageTo && slcAction == 'transfer') {
		swal('Oops', 'Please select different station.', 'error')
		return false;
	}

	if(!slcAction) {
		$('#slcActionErr').css('display', 'block')
		$('#slcActionErr').html('Please select action')
		$("#slcAction").css('border', '1px solid red')
		return false;
	} else {
		$('#slcActionErr').css('display', 'none')
	}

	if(slcAction == 'adjustment') {
		$('#slcActionErr').css('display', 'block')
		$('#slcActionErr').html('Cannot perform this action.')
		$("#slcAction").css('border', '1px solid red')
		return false;
	} else {
		$('#slcActionErr').css('display', 'none')
	}

	if(!slcStorage) {
		$('#slcStorageErr').css('display', 'block')
		$('#slcStorageErr').html('Please select storage')
		$("#slcStorage").css('border', '1px solid red')
		return false;
	} else {
		$('#slcStorageErr').css('display', 'none')
	}

	if(slcAction == 'transfer' && !slcStorageTo) {
		$('#slcStorageToErr').css('display', 'block')
		$('#slcStorageToErr').html('Please select storage to move to.')
		$("#slcStorageTo").css('border', '1px solid red')
		return false;
	} else {
		$('#slcStorageToErr').css('display', 'none')
	}

	let error = true;

	$('.record.row:not(".header")').each((i, el) => {
		let prdID = $(el).find("input[name^='prdID']").val();
		if(prdID)  {
			error = false
		}
	})

	if(!error) {
		$("label.process").css("display", "inline");
		$("#btnSave").attr("disabled", true);
		$("#btnSave").html("Wait...");
		return true;
	} else {
		swal('Oops', 'Please fill at least one row.', 'error')
		return false;
	}

	return false;
}
function addNewRow(){
	setTotalAmountBtnData();
	// Get all selected IDs so no item can be selected twice
	let slctedIDs = [];
	let totalAmount = 0;
	$('.record:not(".header")').each((i, el) => {
		let prdID = $(el).find("input[name^='prdID']").val();
		slctedIDs.push(prdID)
	})
	console.log(optionsArray);

	// console.log(slctedIDs)
    let addNewRow = `<div class="record product-record row ${rowNum} row${rowNum}">
        <div class="cave long" style="position: relative; overflow: visible;">
            <select id="txtItemName" class="txtItemName" autocomplete="off" name="inventoryProduct[]">`;
            if(optionsArray && optionsArray._id.length == optionsArray._name.length) {
            	for (var i = 0; i < optionsArray._id.length; i++) {
            		if(!slctedIDs.includes(optionsArray._id[i])) {
            			addNewRow += `<option value="${optionsArray._id[i]}">${optionsArray._name[i]}</option>`
            		}
            	}
            }
            addNewRow += `</select>
            	<input type="hidden" id="itemName" name="itemName[]" />
	            <input type="hidden" id="prdID" name="prdID[]">
	        </div>
	        <div class="cave short">
	            <input type="text" onkeypress="return isDecimalNum(this, event);" id="txtQuantity" name="quantity[]" autocomplete="off">
	        </div>
	       <div class="cave short">
	            <select id="slcMeasure" class="slcMeasure" name="msrID[]" style="width: 100%; height: 28px; margin-top: 1px; border: none; background: none;">
	            	<option value=""></option>
	            </select>
	      </div>
	         <div class="cave lshort">
	           	<input type="text" onkeypress="return isDecimalNum(this, event);" id="txtCost" class="txtCost" autocomplete="off" name="costPrice[]">
	      	</div>
	        <div class="cave inventoryTotal lshort">
	         	<input type="text" class="txtTtlCost" onkeypress="return isDecimalNum(this, event);" id="txtTtlCost" name="inventoryTotal[]" autocomplete="off">
	      	</div>
	        <div class="cave middle">
	            <input type="text" name="inventoryDesc[]" autocomplete="off">
              	<i class="fa fa-times" style="color: grey;  position: absolute; width: 20px; margin-top: 8px; cursor: pointer; " onclick="removeRow(this)"></i>
	        </div>
	    </div>`	;

		$('#dataTable').append(addNewRow)
		setTimeout(function() {
			var slcProduct
			slcProduct = new IconicMultiSelect( {
		    	select: `.row${rowNum} select`,
		    	el_class: `record ${recordNumber}`,
			})
			slcProduct.init();
			console.log()
			slcProduct.subscribe(function(e) {
				let record = $($(slcProduct._selectContainer).parents('.record'));
			    if(e.action == 'ADD_OPTION') {
			        supItemID = e.value
			        let itemName = e.selection[0].text;
			        if(e.selection.length > 1) {
			        	$(record).find(`span.multiselect__selected[data-value=${e.selection[0].value}]`).remove()
			        	$(record).find(`li[data-value=${e.selection[0].value}]`).removeClass('multiselect__options--selected')
			        	e.selection.shift()
			        }
			        $.post("./includes/inventory.php?action=searchRec&dest=pickMeasures4Item", { supItemID:supItemID }, function(data) {
			        	$(record).find('#slcMeasure').html(data)
			        	$(record).find('#prdID').val(supItemID)
			        	$(record).find('#itemName').val(itemName)
			        	$(record).find('#prdID').trigger('change')
			        });
			    } else if(e.action == 'REMOVE_OPTION') {
			        $(record).find('#slcMeasure').html('')
		        	$(record).find('#prdID').val('')
			    }
			})
			rowNum += 1;
			recordNumber+=1;
		}, 50)

		return false;
}
function addNewRow4Stock(){
	$(document).on('keyup change', "input[name^='qtyOnStock'], input[name^='quantity'], input[name^='varience'], input[name^='comments']", function(e){
		let dataTable = $(e.target).parents('.record');
		let qtyOnStock     = parseFloat($(dataTable).find("input[name^='qtyOnStock']").val());
		let newQty         = parseFloat($(dataTable).find("input[name^='quantity']").val());
		let varience       = parseFloat($(dataTable).find("input[name^='varience']").val());
		if(!varience) varience = 0;
    	if(!newQty) newQty = 0;
       	let totalQty   = (qtyOnStock - newQty);
       	if (totalQty < 0){
		 	totalQty = 0;
			$(dataTable).find("input[name^='quantity']").val(qtyOnStock)
		}
    	$(dataTable).find(".varience span").html(totalQty);
    	$(dataTable).find("input[name^='varience']").val(totalQty);
   });

	let slcStorage = $('#slcStorage').val();
	if(!slcStorage) {
		swal('Oops', 'Please select storage', 'error')
		return false;
	}

	if(!optionsArray || optionsArray.length < 1) {
		swal('Oops', 'No more products to add', 'error')
		return false;
	}


    // Get all selected IDs so no item can be selected twice
	let slctedIDs = [];
	$('.record').each((i, el) => {
		let prdID = $(el).find("input[name^='prdID']").val();
		if(prdID) slctedIDs.push(prdID)
	})

    let addNewRow4Stock = `<div class="record row ${rowNum} row${rowNum}">
       	<div class="cave long" style="position: relative; overflow: visible;">
            <select id="txtProductName" class="txtProductName"  name="product[]">`;
	            if(optionsArray && optionsArray._id.length == optionsArray._name.length) {
	            	for (var i = 0; i < optionsArray._id.length; i++) {
	            		if(!slctedIDs.includes(optionsArray._id[i])) {
	            			addNewRow4Stock += `<option data-qty="${optionsArray._qty[i]}" value="${optionsArray._id[i]}">${optionsArray._name[i]}</option>`
	            		}
	            	}
	            }
            addNewRow4Stock += `</select>
            <input type="hidden" id="itemName" name="itemName[]" />
            <input type="hidden" id="prdID" name="prdID[]" />
            <div class="suggest" style=" font-size: 1.1em; margin-top: 0; margin-left: -11px;"></div>
        </div>
        <div class="cave lshort">
         	<input type="text" id="qtyOnStock" class="qtyOnStock" name="qtyOnStock[]" readonly="readonly">
        </div>
        <div class="cave short">
                <select id="slcMeasure" class="slcMeasure" name="msrID[]" style="width: 100%; height: 28px; margin-top: 1px; border: none; background: none;">
                	<option value=""></option>
                </select>
            </div>
        <div class="cave lshort">
            <input type="text" id="newQty" onkeypress="return isDecimalNum(this, event);"  name="quantity[]" autocomplete="off">
        </div>
        <div class="cave varience lshort">
           <input type="text" id="varience" class="varience" name="varience[]" readonly="readonly">
        </div>
        <div class="cave middle">
            <input type="text" name="comments[]">
                <i class="fa fa-times" style="color: grey;  position: absolute; width: 20px; margin-top: 8px; cursor: pointer;" onclick="return removeRow(this)"></i>
                </div>
            </div>
        </div>`;

        $('#dataTable').append(addNewRow4Stock)

        setTimeout(function() {
			var slcProduct
			slcProduct = new IconicMultiSelect( {
		    	select: `.row${rowNum} select.txtProductName`,
			})
			let options = slcProduct._selectContainer;
			slcProduct.init();
			slcProduct.subscribe(function(e) {
				let record = $($(slcProduct._selectContainer).parents('.record'));
			    if(e.action == 'ADD_OPTION') {
			    	let slcStorage = $('#slcStorage').val();
			        let supItemID = e.value;
			        let itemName = e.selection[0].text;
			        if(!slcStorage) {
			        	$('#slcStorage').css('border', '1px solid red')
			        	$('#slcStorageErr').html('Please select storage');
			        	$('#slcStorageErr').css('display', 'block')
			        	return false
				    } else {
			        	$('#slcStorageErr').css('display', 'none')
			        	$('#slcStorage').css('border', '1px solid #ccc')
			        }
			        if(!e.value) return false

			        let qty = $(record).find(`option[value=${e.value}]`).data('qty')
			        if(e.selection.length > 1) {
			        	$(record).find(`span.multiselect__selected[data-value=${e.selection[0].value}]`).remove()
			        	$(record).find(`li[data-value=${e.selection[0].value}]`).removeClass('multiselect__options--selected')
			        	e.selection.shift()

			        	$(record).find('#newQty').val('')
			        	$(record).find('#varience').val('')
			        }
			        $.post("./includes/inventory.php?action=searchRec&dest=pickMeasures4Item", { supItemID:supItemID }, function(data) {
			        	$(record).find('#slcMeasure').html(data)
			        	$(record).find('#prdID').val(supItemID)
			        	$(record).find('#itemName').val(itemName)
			        });

			        $(record).find('#qtyOnStock').val(qty)

			    } else if(e.action == 'REMOVE_OPTION') {
			        $(record).find('#slcMeasure').html('')
		        	$(record).find('#prdID').val('')
		        	$(record).find('#itemName').val('')

		        	$(record).find('#newQty').val('')
        			$(record).find('#varience').val('')
			    }
			})
			rowNum += 1;
		}, 50)
		// rowNum += 1;
		return false;
}
function removeRow(el){
	let row = $(el).parents('.record')
	$(row).fadeOut(500, function(){ $(this).remove(); });

	setTimeout(function() {
		setTotalAmountBtnData();
	},600)

	// setTotalAmountBtnData();
}
function addUnitFromPopUp() {
	var popUnitName = $("#popUnitName").val();
	var popUnitCon  = $("#popUnitCon").val();
	var sameUnit    = $("#slcMeasure").val();

	if (popUnitName.length < 1) {
		$("#unitError1").css("display", "inline");
		$("#unitError1").html("Provide Unit Name");
		$("#popUnitName").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if (popUnitCon.length < 1) {
		$("#unitError2").css("display", "inline");
		$("#unitError2").html("provide unit convertion");
		$("#popUnitCon").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	$("#btnSave").attr("disabled", true);
	$("#btnSave").html("Wait...");

	$.post("./includes/inventory.php?action=saveNew&dest=addUnitFromPopUp&addedBy="+myUser, { unitName:popUnitName, unitConversion:popUnitCon, baseMeasure:sameUnit}, function(data){

		let res = JSON.parse(data);
		if (!res.error) {
			swal({
				title: "Success",
				text: "You added New Unit successfully.",
				icon: "success",
				timer: 1500,
				button: false
			}).then(() => {
				location.reload()
			});
		} else {
			swal("Oops!", res.msg, "error");
			return false;
		}
		// var addedpos = data.search("added");
		// $("label.process").css("display", "none");
		// if (data=='inserted') {
		// 	$("#popUnitName, #popUnitCon").val('');
		// 	$("#addUnit").attr("checked",false);
		// 	swal({
		// 		title: "Success!",
		// 		text: "You added New Unit successfully.",
		// 		icon: "success",
		// 		timer: 1500,
		// 		button: false,
		// 	}).then(()=>{
		// 		location.reload()
		// 	});
		// } else {
		// 	swal("Oops!", data.msg, "error");
		// 	return false;
		// }
		$("#btnSave").attr("disabled", false);
		$("#btnSave").html("Save");
	});
	return false;
}
function editUnitPopUp(msrID) {
	document.getElementById(`editUnit${msrID}`).checked = true
}
function editUnitPopup(btn) {
	let popup = $(btn).parents('.editPopup.popUpForm')

	var msrID 		= $(popup).find("#msrID").val();
	var popUnitName = $(popup).find("#popUnitName").val();
	var popUnitCon  = $(popup).find("#popUnitCon").val();
	var sameUnit    = $(popup).find("#slcMeasure").val();
	var slcStatus   = $(popup).find("#slcStatus").val();

	// console.log(msrID, popUnitName, popUnitCon, sameUnit, slcStatus)

	if (popUnitName.length < 1) {
		$(popup).find("#unitError1").css("display", "inline");
		$(popup).find("#unitError1").html("Provide Unit Name");
		$(popup).find("#popUnitName").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if (popUnitCon.length < 1) {
		$(popup).find("#unitError2").css("display", "inline");
		$(popup).find("#unitError2").html("provide unit convertion");
		$(popup).find("#popUnitCon").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	$(popup).find("#btnSave").attr("disabled", true);
	$(popup).find("#btnSave").html("Wait...");

	$.post("./includes/inventory.php?action=updateExist&dest=editUnitFromPopUp&addedBy="+myUser, {msrID:msrID, unitName:popUnitName, unitConversion:popUnitCon, baseMeasure:sameUnit, slcStatus:slcStatus}, function(data){
		// var addedpos = data.search("added");
		$(popup).find("label.process").css("display", "none");
		if (data=='updated') {
			$(popup).find("#popUnitName, #popUnitCon").val('');
			$(popup).find("#addUnit").attr("checked",false);
			swal({
				title: "Success!",
				text: "You updated New Unit successfully.",
				icon: "success",
				timer: 1500,
				button: false,
			}).then(()=>{
				location.reload()
			});
		} else {
			swal("Oops!", data, "error");
		}
		$(popup).find("#btnSave").attr("disabled", false);
		$(popup).find("#btnSave").html("Edit");
	});
	return false;
}
function deleteUnit(msrID) {
	swal({
		title: "Are you sure to delete?",
		text: "You going to delete this unit.",
		icon: "warning",
		buttons: ['Cancel', 'Yes, delete it']
	}).then((e) => {
		if(e) {
			$.post("./includes/inventory.php?action=deleteRec&dest=deleteUnit",{ msrID:msrID}, function(data){
				if(data=="deleted") {
					swal({
						title: "Success",
						text: "Selected unit has been removed permenantly",
						icon: "success",
						timer: 1500,
						button: false
					}).then(() => {
						location.reload();
					});
				} else {
					swal("Oops!", data, "error");
				}
			});
		}
	})
	return false;
}
function initProducts(record = null){
	// let recordNumber = 1;
	if (!record ) {
		var slcProduct = new IconicMultiSelect( {
		    select: '.txtItemName',
		    el_class: `record ${recordNumber}`,
		})
		slcProduct.init();
		slcProduct.subscribe(function(e) {
			let record = $('.record.1')
		    if(e.action == 'ADD_OPTION') {
		        supItemID = e.value
		        let itemName = e.selection[0].text;
		        if(e.selection.length > 1) {
		        	$(record).find(`span.multiselect__selected[data-value=${e.selection[0].value}]`).remove()
		        	$(record).find(`li[data-value=${e.selection[0].value}]`).removeClass('multiselect__options--selected')
		        	e.selection.shift()
		        }
		        $.post("./includes/inventory.php?action=searchRec&dest=pickMeasures4Item", { supItemID:supItemID }, function(data) {
		        	console.log(data)
		        	$(record).find('#slcMeasure').html(data)
		        	$(record).find('#prdID').val(supItemID)
		        	$(record).find('#prdID').trigger('change')
		        	$(record).find('#itemName').val(itemName)
		        });
		    } else if(e.action == 'REMOVE_OPTION') {
		        $(record).find('#slcMeasure').html('')
	        	$(record).find('#prdID').val('')
		    }
		   
		})
		recordNumber++;

	} else {
		console.log(record)
		let _ID = Math.floor(Math.random()*25)+recordNumber;
		$($(record[0]).find('.txtItemName')).css("display","block")
		$($(record[0]).find('.txtItemName')).attr('id', `select${_ID}`);
		console.log($($(record[0]).find('.txtItemName'))[0]);
		// return false;

		var slcProduct = new IconicMultiSelect( {
		    select: "#select"+_ID,
		    el_class: `record ${recordNumber-1}`,
		})
		slcProduct.init();
		slcProduct.subscribe(function(e) {
			let record = $($(slcProduct._selectContainer).parents('.record'));
			console.log(record,recordNumber+1)
		    if(e.action == 'ADD_OPTION') {
		        supItemID = e.value
		        console.log(supItemID)
		        let itemName = e.selection[0].text;
		        if(e.selection.length > 1) {
		        	$(record).find(`span.multiselect__selected[data-value=${e.selection[0].value}]`).remove()
		        	$(record).find(`li[data-value=${e.selection[0].value}]`).removeClass('multiselect__options--selected')
		        	e.selection.shift()
		        }
		        $.post("./includes/inventory.php?action=searchRec&dest=pickMeasures4Item", { supItemID:supItemID }, function(data) {
		        	$(record).find('#slcMeasure').html(data)
		        	$(record).find('#prdID').val(supItemID)
		        	$(record).find('#prdID').trigger('change')
		        	$(record).find('#itemName').val(itemName)
		        });
		    } else if(e.action == 'REMOVE_OPTION') {
		        $(record).find('#slcMeasure').html('')
	        	$(record).find('#prdID').val('')
		    }
		   
		})
			


		
	}
		
	
	setTotalAmountBtnData();
	
}
function smpfyAddInvePrchse() {
	console.log(roundDigits)
	$("#checkBlnce, #switchBalance").click(function(){
		$('div#switchBalance').toggleClass("switchOn");
		if (document.getElementById("beginBalance").checked == true) {
			document.getElementById("beginBalance").checked = false;
		} else {
			document.getElementById("beginBalance").checked = true;
		}
		// $("#vendorID, #txtVendorName").val('');
		// $("div.displayInfo.vendor").css("display", "none");

		$("#vendorID","#txtVendorNameInventory").val('');
		$("#txtItemName").val('');
		$("txtProductName").val('');

	});

	var kahor1sano = Number(sanadkan)-1;
	var picker = new Pikaday({
		field: document.getElementById("transDate"),
		firstDay: 6,
		maxDate: new Date(maanta),
		yearRange: [kahor1sano,sanadkan],
	});


	// inventory Menu search vendor
	$("#txtVendorNameInventory").keyup(function(){
		var vendorName1 = $("#txtVendorNameInventory").val();
		if (vendorName1!="") {
			$("div.suggest.vendor").css("display", "table-row");
			$.post("./includes/inventory.php?action=searchRec&dest=pickVendor4Inventory", {vendorName1:vendorName1}, function(data){
				$("div.suggest.vendor").html(data);
			});
		} else { $("div.suggest.vendor").css("display", "none"); }
		clearErrors();
	});

	// purchase search item name
	$(document).on('keyup', '.txtItemName', function(e) {
		let input = $(e.target);
		let record = $(input).parents('.record')
		let recNo = $(record)[0].classList[1];
		console.log(recNo)
		let itemName = $(input).val()
		$("div.suggest.itemName").css("display", "none");
		if(itemName!="") {
			$(record).find("div.suggest.itemName").css("display", "block");
			$.post("./includes/inventory.php?action=searchRec&dest=pickInventoryProduct", {itemName:itemName, recNo:recNo}, function(data){
				$("div.suggest.itemName").html(data);
			});
	  	} else { $("div.suggest.itemName").css("display", "none"); }
		clearErrors();
	});
	//
	$(document).on("keyup change",'#txtCost', function(e) {
		let input = $(e.target);
		let record = $(input).parents('.record');
		let recNo = $(record)[0].classList[1];
		var prdQnty		= $(record).find("#txtQuantity").val();
		var slcPrdcts	= $(record).find("#txtPrdctID").val();
		if(!prdQnty || !Number(prdQnty)) prdQnty = 0;

		if(slcPrdcts!="") {
			var costPrice	= $(record).find("#txtCost").val();
			if(!costPrice || !Number(costPrice)) costPrice = 0;
			costPrice = parseFloat(costPrice);
			$(record).find("input.txtTtlCost").val(costPrice);
			if(prdQnty!="") {
				if(costPrice != "" || costPrice > 0 ) {
					var totalCost = Number(prdQnty*costPrice).toFixed(roundDigits);
					// Remove trailing zeros
					totalCost = parseFloat(totalCost);
					$(record).find(".txtTtlCost").val(totalCost);
				}
			} else {
				$(record).find(".txtTtlCost").val('');
			}
		}
		setTotalAmountBtnData();
		clearErrors();
	});

	$(document).on("keyup change",'#txtQuantity', function(e) {
		let input = $(e.target);
		let record = $(input).parents('.record');
		$(record).find('#txtCost').trigger('change')
	});

	$(document).on("keyup change",'#txtTtlCost', function(e) {
		let input = $(e.target);
		let record = $(input).parents('.record');

		var prdQnty = $(record).find("#txtQuantity").val();
		var slcPrdcts = $(record).find("#txtPrdctID").val();
		if (slcPrdcts!="") {
			var total  = $(record).find("#txtTtlCost").val();
			$(record).find("input.txtCost").val(total);
			if (prdQnty!="") {
				if (total != "" || total > 0) {
					// var costPrice = (total/prdQnty).toFixed(roundDigits);
					var costPrice = (total/prdQnty);
					$(record).find(".txtCost").val(costPrice);
				}
			} else {
				$(record).find(".txtCost").val('');
			}
		}

		setTotalAmountBtnData();
		});
	// stock search item name
	$(document).on('keyup', '.txtProductName', function(e) {
		let input = $(e.target);
		let record = $(input).parents('.record')
		let recNo = $(record)[0].classList[1];
		console.log(recNo)
		let productName = $(input).val()
		$("div.suggest").css("display", "none");
		if (productName!="") {
			$(record).find("div.suggest").css("display", "block");
			$.post("./includes/inventory.php?action=searchRec&dest=pickInventoryStockProduct", {productName:productName, recNo:recNo}, function(data){
				$("div.suggest").html(data);
			});
	  	} else { $("div.suggest").css("display", "none"); }
		clearErrors();
	});



	$(document).on('keyup', '.txtItemName, #txtQuantity, .txtCost, .txtTtlCost', function(e) {
		// console.log(e)
		let record = $(e.target).parents('.record:not(".checked")')
		let prdID = $(record).find('#prdID').val();
		let txtQuantity = $(record).find('#txtQuantity').val();
		let txtCost = $(record).find('#txtCost').val();
		let txtTtlCost = $(record).find('#txtTtlCost').val();

		if(prdID && txtQuantity && txtCost && txtTtlCost) {
			addNewRow();
			$(record).addClass('checked')
		}
		setTotalAmountBtnData();
	});


	/*$(document).on('change', '#prdID', function(e) {
		let record = $(e.target).parents('.record')
		$(record).find('#txtQuantity').trigger('keyup')
	})*/

	setTotalAmountBtnData();
}
function setTotalAmountBtnData() {
	let totalAmount = 0;
	$('.record:not(".header")').each((i, el) => {
		let prdID = $(el).find("input[name^='prdID']").val();
		let total = parseFloat($(el).find('input.txtTtlCost').val());
		if(isNaN(total) || !total || total < 0) total = 0
		if(total && Number(total)) {
			totalAmount += total;
		}
		// if(isNaN(totalAmount) || !totalAmount || totalAmount < 0) totalAmount = 0
		totalAmount =parseFloat(totalAmount.toFixed(roundDigits))
		// Remove trailing zeros 
		$('.record.total span').html(`$${totalAmount}`)
	})
}
function loadInventoryPrchse(pageLimit, perPage) {
	$("#dataTable div#loading").css("display", "inline");
	var period = $("#slcPeriod").val();
	var dataString = `pageLimit=${pageLimit}&perPage=${perPage}&myWhouse=${myWhouse}&period=${period}`;
	$.ajax({
		type: "POST",
		url: "./includes/inventory.php?action=loadTable&dest=allPurchaseSupplies&myRole="+myRole+"&myUser="+myUser,
		data: dataString,
		cache: false,
		timeout: 2000,
		success: function(result){
			$("#dataTable div#loading").css("display", "none");
			$("#dataTable").append(result);
			// console.log(result)
		},
	});
	return false;
}
function check_addItemsToPurchase(form) {
	let error = true;
	$('.record.row:not(".header")').each((i, el) => {
		let prdID = $(el).find("input[name^='prdID']").val();
		let msrID = $(el).find("#slcMeasure").val();
		let txtQuantity = $(el).find("#txtQuantity").val();
		let txtCost = $(el).find("#txtCost").val();


		$(el).find("#txtQuantity").css('border', '0px');
		$(el).find("#slcMeasure").css('border', '0px');
		$(el).find("#txtCost").css('border', '0px');

		if(prdID)  {
			if(!txtQuantity)  {
				swal('Oops', 'Please provide quantity for all rows.', 'error')
				$(el).find("#txtQuantity").css('border', '1px solid red');
				error = true
				return false
			} else if(!msrID)  {
				swal('Oops', 'Some items are missing unit.', 'error')
				$(el).find("#slcMeasure").css('border', '1px solid red');
				error = true
				return false
			} else if(!txtCost)  {
				swal('Oops', 'Please provide cost price for all rows.', 'error')
				$(el).find("#txtCost").css('border', '1px solid red');
				error = true
				return false
			} else {
				error = false
			}
		}
	})

	if(!error) {
		$("label.process").css("display", "inline");
		$("#btnSave").attr("disabled", true);
		$("#btnSave").html("Wait...");
		return true;
	} else {
		console.log('cool')
		swal('Oops', 'Please fill at least one row.', 'error')
		return false;
	}
	return false;
}
function delSupplyPrchseItem(recID, suppID,itemID) {
	swal({
		title: "Are you sure to delete?",
		text: "You going to remove this item from this purchase supply!",
		icon: "warning",
		dangerMode:true,
		buttons:["Cancel","'Yes, remove it!"],
		closeOnConfirm: false
	}).then(willDelete => {
		if(willDelete) {
			$.post("./includes/inventory.php?action=deleteRec&dest=delSupplyPrchseItem",{ recID:recID, suppID:suppID, itemID:itemID }, function(data){
				if(data=="deleted") {
					swal({
						title: "Success",
						text: "item you selected has been removed permenantly",
						icon: "success",
						timer: 1500,
						button: false
					}).then(value=> {
						location.reload();
					});
				} else if(data=="clear-purchase") {
					swal({
						title: "Success",
						text: "item you selected has been removed permenantly",
						icon: "success",
						timer: 1500,
						button: false
					}).then(value=> {
						window.location = "./workplace.php?role="+myRole+"&task=inventory&subtask=purchase";
					});
				} else {
					swal("Oops!", data, "error");
				}
			});
		}
	});
	return false;
}
function loadSupplyStock(pageLimit, perPage, action, storage) {
	$("#dataTable div#loading").css("display", "inline");
	var period = $("#slcPeriod").val();
	var action = $("#slcAction").val();
	var storage = $("#slcStorage").val();
	var dataString = `pageLimit=${pageLimit}&perPage=${perPage}&myWhouse=${myWhouse}&period=${period}&action=${action}&storage=${storage}`;
	$.ajax({
		type: "POST",
		url: "./includes/inventory.php?action=loadTable&dest=allSupplyStock&myRole="+myRole+"&myUser="+myUser,
		data: dataString,
		cache: false,
		timeout: 2000,
		success: function(result){
			$("#dataTable div#loading").css("display", "none");
			$("#dataTable").append(result);
			// console.log(result)
		},
	});
	return false;
}
function loadUnits(pageLimit, perPage = 10) {
	// let perPage = 10
	$("#dataTable div#loading").css("display", "inline");
	var period = $("#slcPeriod").val();
	var dataString = `pageLimit=${pageLimit}&perPage=${perPage}&myWhouse=${myWhouse}&period=${period}`;
	$.ajax({
		type: "POST",
		url: "./includes/inventory.php?action=loadTable&dest=allUnits&myRole="+myRole+"&myUser="+myUser,
		data: dataString,
		cache: false,
		timeout: 2000,
		success: function(result){
			let count =  JSON.parse(result)[1]
			$("#dataTable div#loading").css("display", "none");
			$("#dataTable").append(JSON.parse(result)[0]);
			if(count < perPage ) {
				$('.load_more_link').css('display', 'none')
			}
			// console.log(result)
		},
	});
	return false;
}
function initSelect() {
	$('.multiselect__container').remove();
	var slcProduct = new IconicMultiSelect( {
	    select: '#txtProductName',
	})
	let options = slcProduct._selectContainer;
	slcProduct.init();
	slcProduct.subscribe(function(e) {
		let record = $('.record.1')
	    if(e.action == 'ADD_OPTION') {
	    	let supItemID = e.value;
	    	let itemName = e.selection[0].text;
	    	if($('#slcStorage').val()) {
	    		let slcStorage = $('#slcStorage').val();
		        if(!slcStorage) {
		        	$('#slcStorage').css('border', '1px solid red')
		        	$('#slcStorageErr').html('Please select storage');
		        	$('#slcStorageErr').css('display', 'block')
		        	return false
			    } else {
		        	$('#slcStorageErr').css('display', 'none')
		        	$('#slcStorage').css('border', '1px solid #ccc')
		        }
		        if(!e.value) return false
	    	}
	        let qty = $(record).find(`option[value=${e.value}]`).data('qty')
	        if(e.selection.length > 1) {
	        	$(record).find(`span.multiselect__selected[data-value=${e.selection[0].value}]`).remove()
	        	$(record).find(`li[data-value=${e.selection[0].value}]`).removeClass('multiselect__options--selected')
	        	e.selection.shift()
	        	$(record).find('#newQty').val('')
	        	$(record).find('#varience').val('')
	        }
	        $.post("./includes/inventory.php?action=searchRec&dest=pickMeasures4Item", { supItemID:supItemID }, function(data) {
	        	$(record).find('#slcMeasure').html(data)
	        	$(record).find('#prdID').val(supItemID)
	        	$(record).find('#itemName').val(itemName)
	        });

	        $(record).find('#qtyOnStock').val(qty)
	    } else if(e.action == 'REMOVE_OPTION') {
	        $(record).find('#slcMeasure').html('')
        	$(record).find('#prdID').val('')

        	$(record).find('#newQty').val('')
        	$(record).find('#varience').val('')
	    }
	})
}
function smpfyAddStock() {
	initSelect();
	$('.multiselect__input').on('focus', () => {
		let slcStorage = $('#slcStorage').val();
		// console.log(slcStorage)
		if(!slcStorage) {
        	// console.log('Select action', slcStorage)
        	$('#slcStorage').css('border', '1px solid red')
        	$('#slcStorageErr').html('Please select storage');
        	$('#slcStorageErr').css('display', 'block')
        	return false
        } else {
        	$('#slcStorageErr').css('display', 'none')
        	$('#slcStorage').css('border', '1px solid #ccc')
        }
	})

	if(document.getElementById("slcAction")) {
		let slcAction = $("#slcAction").val();
	    let checkbox  = $("#checkbox");
	    let receivedBy = $("#receivedBy")
	    let slcStorageTo =  $("#slcStorageTo")

	    $('#slcAction').change(() => {
	    	let value = $('#slcAction').val();

	    	$(slcStorageTo).css('display', "none");
	    	$(receivedBy).css('display', "block");

	    	if (value == 'consumption') {
		        $(checkbox).css('display', "block");
		    } else if (value == 'transfer') {
		        $(checkbox).css('display', "none");
		        $(receivedBy).css('display', "block");
		        $(slcStorageTo).css('display', "block");
		    } else  {
		        $(checkbox).css('display',"none");
		        $(checkbox).css('display', "none");
		        $(receivedBy).css('display', "block");
		        $(slcStorageTo).css('display', "none");
		    }
	    })
	}

	$('#slcStorage').on('change', (e) => {
		let slctedStorage = $('#slcStorage').val();
		let slcStorageTo =  $("#slcStorageTo")
		$(slcStorageTo[0]).find(`option`).css('display', 'block')
	    $(slcStorageTo[0]).find(`option[value=${slctedStorage}]`).css('display', 'none')

	    $.post("./includes/inventory.php?action=searchRec&dest=getStockItems4Storage", { slctedStorage:slctedStorage }, function(data) {
        	let res = JSON.parse(data)
        	$('#txtProductName').html(res.option)
        	$('.multiselect__options ul').html(res.list)
        	optionsArray = res.products;

        	setTimeout(function() {
        		initSelect();
        	}, 50)
        });
	})

    $(document).on('keyup', '#newQty', (e) => {
    	let record = $(e.target).parents('.record')
    	let qty = parseFloat($(record).find('.qtyOnStock').val());
    	let newQty = parseFloat($(record).find('#newQty').val());
    	if(!qty) qty = 0;
    	if(!newQty) newQty = 0;
    	let totalQty = qty - newQty;
    	if(totalQty < 0) {
    		totalQty = 0;
    		$(record).find('#newQty').val(qty)
    	}
    	$(record).find("input.varience").val(totalQty);
    })

    $(document).on("keyup change",'#slcMeasure', function(e) {
		let select = $(e.target);
		let msrID = $(e.target).val();
		let record = $(select).parents('.record');
		let prdtID = $(record).find('#prdID').val()
		let itemName = $(record).find('#itemName').val()
		let slcStorage = $('#slcStorage').val()
		console.log(slcStorage)
		let qty = $(record).find('#qtyOnStock').val()
		$.post("./includes/inventory.php?action=searchRec&dest=calaculateMeasureQty", { msrID:msrID, prdtID:prdtID, slcStorage:slcStorage }, function(data) {
        	$(record).find('#qtyOnStock').val(data)
        });
	});


	$(document).on('keyup', '.txtProductName, #newQty, .varience', function(e) {
		// console.log(e)
		let record = $(e.target).parents('.record:not(".checked")')
		let prdID = $(record).find('#prdID').val();
		let qtyOnStock = $(record).find('#qtyOnStock').val();
		let newQty = $(record).find('#newQty').val();
		let varience = $(record).find('#varience').val();

		if(prdID && qtyOnStock && newQty && varience) {
			addNewRow4Stock();
			$(record).addClass('checked')
		}
	});
}

function initPrchseSlct(){
	$('.multiselect__container').remove();
	var slcVendor = new IconicMultiSelect( {
	    select: '#txtVendorName4prchse',
	    placeholder: "Select Vendor Name",//"Search purchase by vendor",
	})
	let options = slcVendor._selectContainer;
	slcVendor.init();
	slcVendor.subscribe(function(e) {
		let record = $('#command')
	    if(e.action == 'ADD_OPTION') {
	    	let vndID = e.value;
	        if(e.selection.length > 1) {
	        	$(record).find(`span.multiselect__selected[data-value=${e.selection[0].value}]`).remove()
	        	$(record).find(`li[data-value=${e.selection[0].value}]`).removeClass('multiselect__options--selected')
	        	e.selection.shift()
	        }
	        $.post("./includes/inventory.php?action=searchRec&dest=Vendor4prchse", { vndID:vndID }, function(data) {
	        	// console.log(data,vndID);
	        	$("#dataTable").html(data);
	        });
	    } else if(e.action == 'REMOVE_OPTION') {
        	 $.post("./includes/inventory.php?action=searchRec&dest=allPurchase", { }, function(data) {
	        	console.log(data);
	        	$("#dataTable").html(data);
	        });
	    }
	})
}

function simplfyInventoryPage(){
	initPrchseSlct();
}

function check_addItemsToStock(form) {
	let error = true;
	$('.record.row:not(".header")').each((i, el) => {
		let prdID = $(el).find("input[name^='prdID']").val();
		let newQty = $(el).find("#newQty").val();
		let slcMeasure = $(el).find("#slcMeasure").val();


		$(el).find("#newQty").css('border', '0px');
		$(el).find("#slcMeasure").css('border', '0px');
		$(el).find("#txtCost").css('border', '0px');

		if(prdID)  {
			if(!newQty)  {
				swal('Oops', 'Please provide quantity for all rows.', 'error')
				$(el).find("#newQty").css('border', '1px solid red');
				error = true
				return false
			} else if(!slcMeasure)  {
				swal('Oops', 'Some items are missing unit.', 'error')
				$(el).find("#slcMeasure").css('border', '1px solid red');
				error = true
				return false
			} else {
				error = false
			}
		}
	})

	if(!error) {
		$("label.process").css("display", "inline");
		$("#btnSave").attr("disabled", true);
		$("#btnSave").html("Wait...");
		return true;
	} else {
		console.log('cool')
		swal('Oops', 'Please fill at least one row.', 'error')
		return false;
	}
	return false;

}
function delSupplyUsageItemNew(recID, usageID, itemID) {
	swal({
		title: "Are you sure to delete?",
		text: "You going to remove this item from this stock!",
		icon: "warning",
		dangerMode:true,
		buttons:["Cancel","'Yes, remove it!"],
		closeOnConfirm: false
	}).then(willDelete => {
		if(willDelete) {
			$.post("./includes/inventory.php?action=deleteRec&dest=delSupplyUsageItem",{ recID:recID, usageID:usageID, itemID:itemID }, function(data){
				if(data=="deleted") {
					swal({
						title: "Success",
						text: "item you selected has been removed permenantly",
						icon: "success",
						timer: 1500,
						button: false
					}).then(value=> {
						location.reload();
					});
				} else if(data=="clear-purchase") {
					swal({
						title: "Success",
						text: "item you selected has been removed permenantly",
						icon: "success",
						timer: 1500,
						button: false
					}).then(value=> {
						window.location = "./workplace.php?role="+myRole+"&task=inventory&subtask=purchase";
					});
				} else {
					swal("Oops!", data, "error");
				}
			});
		}
	});
	return false;
}
function searchUnit() {
    var passedValue = $("input#srchUnit").val();
	if (passedValue) {
		$.post("./includes/inventory.php?action=get_recInfo&dest=getUnit", {passedValue:passedValue,  myUser:myUser, myRole:myRole }, function(data) {
			console.log(data);
			$("div#dataTable").html(data);
		  });
	}
}
function addCategoryFromPopUp(btn) {
	let popup = $(btn).parents('.popUpForm')
	let category = $(popup).find('#popCategoryName').val();

	if (category.length < 1) {
		$(popup).find("#categoryError1").css("display", "inline");
		$(popup).find("#categoryError1").html("Provide category Name");
		$(popup).find("#popCategoryName").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	$(popup).find("#btnSave").attr("disabled", true);
	$(popup).find("#btnSave").html("Wait...");

	$.post("./includes/inventory.php?action=saveNew&dest=addCtgry&addedBy="+myUser, {category:category}, function(data){
		// console.log(data)

		let res = JSON.parse(data);
		if (!res.error) {
			swal({
				title: "Success",
				text: "You added New Category successfully.",
				icon: "success",
				timer: 1500,
				button: false
			}).then(() => {
				if (currentPage == 'purchase') {
					let option = $.parseHTML(`<option selected="selected" value="${res.lastID}">${category}</option>`);
					
					$('#slcCategory').append(option);
				
					$("#addCategory").attr("checked",false);
					$('#addCategory').prop('checked',false);

					$(popup).find("#popCategoryName").val('');

				} else {
					location.reload()
					}
			
			});
		} else {
			swal("Oops!", res.msg, "error");
			return false;
		}
	});
				
				
				

					
					
		// // var addedpos = data.search("added");
		// $(popup).find("label.process").css("display", "none");
		// console.log(data)
		// if (data=='added') {
		// 	$(popup).find("#popCategoryName").val('');
		// 	$(popup).find("#addCategory").attr("checked",false);
		// 	swal({
		// 		title: "Success!",
		// 		text: "You added New Unit successfully.",
		// 		icon: "success",
		// 		timer: 1500,
		// 		button: false,
		// 	}).then(()=>{
		// 		if (currentPage == 'purchase') {
					
		// 		} else {
		// 			location.reload()
		// 		}

				
		// 	});
		// } else {
		// 	swal("Oops!", data, "error");
		// }
		$(popup).find("#btnSave").attr("disabled", false);
		$(popup).find("#btnSave").html("Save");
	
	return false;
}
function loadCategories(pageLimit, perPage = 10){
	$("#dataTable div#loading").css("display", "inline");
	var period = $("#slcPeriod").val();
	var dataString = `pageLimit=${pageLimit}&perPage=${perPage}&myWhouse=${myWhouse}&period=${period}`;
	$.ajax({
		type: "POST",
		url: "./includes/inventory.php?action=loadTable&dest=allCtgry&myRole="+myRole+"&myUser="+myUser,
		data: dataString,
		cache: false,
		timeout: 2000,
		success: function(result){
		let count =  JSON.parse(result)[1]
			$("#dataTable div#loading").css("display", "none");
			$("#dataTable").append(JSON.parse(result)[0]);
			if(count < perPage ) {
				$('.load_more_link').css('display', 'none')
			}
			// console.log(result)
		},
	});
	return false;
	return false;
}
function editCtgryPopUp(ctgryID) {
	document.getElementById(`editCategory${ctgryID}`).checked = true
}
function editCategory(btn) {
	let popup = $(btn).parents('.popUpForm')
	let ctgryID = $(popup).find('#ctgryID').val();
	let category = $(popup).find('#popCategoryName').val();
	let slcStatus = $(popup).find('#slcStatus').val();

	if (category.length < 1) {
		$(popup).find("#categoryError1").css("display", "inline");
		$(popup).find("#categoryError1").html("Provide category Name");
		$(popup).find("#popCategoryName").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	$(popup).find("#btnSave").attr("disabled", true);
	$(popup).find("#btnSave").html("Wait...");

	$.post("./includes/inventory.php?action=updateExist&dest=editCtgry&addedBy="+myUser, {ctgryID:ctgryID, txtCtgry:category, slcStatus:slcStatus}, function(data){
		// var addedpos = data.search("added");
		$(popup).find("label.process").css("display", "none");
		if (data=='updated') {
			$(popup).find("#popCategoryName").val('');
			$(popup).find("#addCategory").attr("checked",false);
			swal({
				title: "Success!",
				text: "You updated selected category successfully.",
				icon: "success",
				timer: 1500,
				button: false,
			}).then(()=>{
				location.reload()
			});
		} else {
			swal("Oops!", data, "error");
		}
		$(popup).find("#btnSave").attr("disabled", false);
		$(popup).find("#btnSave").html("Edit");
	});
	return false;
}
function deleteCtgry(ctgryID) {
	swal({
		title: "Are you sure to delete?",
		text: "You going to delete this category.",
		icon: "warning",
		buttons: ['Cancel', 'Yes, delete it']
	}).then((e) => {
		if(e) {
			$.post("./includes/inventory.php?action=deleteRec&dest=delCtgry",{ ctgryID:ctgryID}, function(data){
				if(data=="deleted") {
					swal({
						title: "Success",
						text: "Selected category has been removed permenantly",
						icon: "success",
						timer: 1500,
						button: false
					}).then(() => {
						location.reload();
					});
				} else {
					swal("Oops!", data, "error");
				}
			});
		}
	})
	return false;
}
function addVendorFromPopUp(btn) {
	let popup = $(btn).parents('.popUpForm')
	let popVendorName = $(popup).find('#popVendorName').val();
	let popVendorTel = $(popup).find('#popVendorTel').val();
	let popVendorEmail = $(popup).find('#popVendorEmail').val();
	let popVendorBlnce = $(popup).find('#popVendorBlnce').val();
	let popVendorAddress = $(popup).find('#popVendorAddress').val();

	if(!popVendorBlnce) popVendorBlnce = 0;

	if (popVendorName.length < 1) {
		$(popup).find("#vendorError1").css("display", "inline");
		$(popup).find("#vendorError1").html("Provide vendor Name");
		$(popup).find("#popVendorName").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if (popVendorTel.length < 1) {
		$(popup).find("#vendorError2").css("display", "inline");
		$(popup).find("#vendorError2").html("Provide vendor phone");
		$(popup).find("#popVendorTel").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	$(popup).find("#btnSave").attr("disabled", true);
	$(popup).find("#btnSave").html("Wait...");

	$.post("./includes/inventory.php?action=saveNew&dest=addVendor&addedBy="+myUser, {popVendorName:popVendorName, popVendorTel:popVendorTel, popVendorEmail:popVendorEmail, popVendorBlnce:popVendorBlnce, popVendorAddress:popVendorAddress}, function(data){
		// var addedpos = data.search("added");
		$(popup).find("label.process").css("display", "none");
		if (data=='added') {
			$(popup).find("#popCategoryName").val('');
			$(popup).find("#addCategory").attr("checked",false);
			swal({
				title: "Success!",
				text: "You added New vendor successfully.",
				icon: "success",
				timer: 1500,
				button: false,
			}).then(()=>{
				location.reload()
			});
		} else {
			swal("Oops!", data, "error");
		}
		$(popup).find("#btnSave").attr("disabled", false);
		$(popup).find("#btnSave").html("Edit");
	});
	return false;
}
function loadVendors(pageLimit, perPage = 10){
	$("#dataTable div#loading").css("display", "inline");
	var period = $("#slcPeriod").val();
	var dataString = `pageLimit=${pageLimit}&perPage=${perPage}&myWhouse=${myWhouse}&period=${period}`;
	$.ajax({
		type: "POST",
		url: "./includes/inventory.php?action=loadTable&dest=allVendors&myRole="+myRole+"&myUser="+myUser,
		data: dataString,
		cache: false,
		timeout: 2000,
		success: function(result){
			let count =  JSON.parse(result)[1]
			$("#dataTable div#loading").css("display", "none");
			$("#dataTable").append(JSON.parse(result)[0]);
			if(count < perPage ) {
				$('.load_more_link').css('display', 'none')
			}
			// console.log(result)
		},
	});
	return false;
	return false;
}
function deleteVendor(vndID) {
	swal({
		title: "Are you sure to delete?",
		text: "You going to delete this vendor.",
		icon: "warning",
		buttons: ['Cancel', 'Yes, delete it']
	}).then((e) => {
		if(e) {
			$.post("./includes/inventory.php?action=deleteRec&dest=delVendor",{ vndID:vndID}, function(data){
				if(data=="deleted") {
					swal({
						title: "Success",
						text: "Selected vendor has been removed permenantly",
						icon: "success",
						timer: 1500,
						button: false
					}).then(() => {
						location.reload();
					});
				} else {
					swal("Oops!", data, "error");
				}
			});
		}
	})
	return false;
}
function editVendorPopUp(vndID) {
	document.getElementById(`editVendor${vndID}`).checked = true
}
function editVendorFromPopUp(btn) {
	let popup = $(btn).parents('.popUpForm')
	let vndID = $(popup).find('#vndID').val();
	let popVendorName = $(popup).find('#popVendorName').val();
	let popVendorTel = $(popup).find('#popVendorTel').val();
	let popVendorEmail = $(popup).find('#popVendorEmail').val();
	let popVendorBlnce = $(popup).find('#popVendorBlnce').val();
	let popVendorAddress = $(popup).find('#popVendorAddress').val();
	let slcStatus = $(popup).find('#slcStatus').val();

	if(!popVendorBlnce) popVendorBlnce = 0;

	if (popVendorName.length < 1) {
		$(popup).find("#vendorError1").css("display", "inline");
		$(popup).find("#vendorError1").html("Provide vendor Name");
		$(popup).find("#popVendorName").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if (popVendorTel.length < 1) {
		$(popup).find("#vendorError2").css("display", "inline");
		$(popup).find("#vendorError2").html("Provide vendor phone");
		$(popup).find("#popVendorTel").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if(popVendorEmail.length > 0) {
		var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
		if(!popVendorEmail.match(emailExp)) {
				$(popup).find("#vendorError3").css("display", "inline");
				$(popup).find("#vendorError3").html("invalid email address");
				$(popup).find("#popVendorEmail").css("border-color", "#FF0000");
			// $("#vendorError3").css("display", "inline");
			// $("#vendorError3").html("invalid email address");
			// $("#popVendorEmail").css("border-color", "#FF0000");
			// if(window.innerWidth<=768) {
			// 	$('html, body').animate({ scrollTop: $(".record.two").offset().top }, 'slow');
			// }
			return false;
		} else { clearErrors(); }
	}

	$(popup).find("#btnSave").attr("disabled", true);
	$(popup).find("#btnSave").html("Wait...");

	$.post("./includes/inventory.php?action=updateExist&dest=editVendor&addedBy="+myUser, {vndID:vndID, popVendorName:popVendorName, popVendorTel:popVendorTel, popVendorEmail:popVendorEmail, popVendorBlnce:popVendorBlnce, popVendorAddress:popVendorAddress, slcStatus:slcStatus}, function(data){
		// var addedpos = data.search("added");
		$(popup).find("label.process").css("display", "none");
		if (data=='updated') {
			$(popup).find("#popCategoryName").val('');
			$(popup).find("#addCategory").attr("checked",false);
			swal({
				title: "Success!",
				text: "You updated selected vendor successfully.",
				icon: "success",
				timer: 1500,
				button: false,
			}).then(()=>{
				location.reload()
			});
		} else {
			swal("Oops!", data, "error");
		}
		$(popup).find("#btnSave").attr("disabled", false);
		$(popup).find("#btnSave").html("Edit");
	});
	return false;
}

function smpfyProductsPage() {
	var slcProduct = new IconicMultiSelect( {
	    select: '.slcMeasure',
	})
	let options = slcProduct._selectContainer;
	slcProduct.init();
	slcProduct.subscribe(function(e) {
		let record = $('.record.1')
	    if(e.action == 'ADD_OPTION') {
	        let msrID = e.value
	        let qty = $(record).find(`option[value=${e.value}]`).data('qty')
	        if(e.selection.length > 1) {
	        	$(record).find(`span.multiselect__selected[data-value=${e.selection[0].value}]`).remove()
	        	$(record).find(`li[data-value=${e.selection[0].value}]`).removeClass('multiselect__options--selected')
	        	e.selection.shift()
	        }
	        $.post("./includes/inventory.php?action=searchRec&dest=getMeasureConversion", { msrID:msrID }, function(data) {
	        	$(record).find('#conversion').val(data)
	        	$(record).find('#msrID').val(msrID)
	        	console.log(data)
	        });

	        $(record).find('#qtyOnStock').val(qty)
	    } else if(e.action == 'REMOVE_OPTION') {
	        $(record).find('#slcMeasure').html('')
        	$(record).find('#prdID').val('')
	    }
	})

	$(document).on('change', '.slcMeasure4Edit', (e) => {
		let record = $(e.target).parents('.record')
		let msrID = $(e.target).val()

		$.post("./includes/inventory.php?action=searchRec&dest=getMeasureConversion", { msrID:msrID }, function(data) {
        	$(record).find('#conversion').val(data)
        	$(record).find('#msrID').val(msrID)
        	console.log(data)
        });
	})

	$('#srchProduct').on('keyup', (e) => {
		let passedValue = $(e.target).val();
		if(passedValue) {
			$("div.suggest").css("display", "table-row");
			$.post("./includes/inventory.php?action=searchRec&dest=srchItems", { passedValue: passedValue}, function(data) {
				$("div.suggest").html(data);
			});
		}
	})

}

function catchSupplyItem4Search(supItemID) {
	$.post("./includes/inventory.php?action=get_recInfo&dest=get_suppItem4Search", { supItemID: supItemID}, function(data) {
		$("div.suggest").css("display", "none");
		$("#dataTable").html(data);
	});
}
function removeUnitFromProductAdd(btn) {
	let record = $(btn).parents('.record')
	$(record).fadeOut(500, function(){ $(this).remove(); });
}
function addNewUnitToProduct(btn) {
	let slctedIDs = [];
	$('.record').each((i, el) => {
		let msrID = $(el).find("input[name^='msrID']").val();
		if(msrID) slctedIDs.push(msrID)
	})
	let record = `<div class="record ${recNum} measure-record row${recNum}" style=" height: 35px !important;">
			<div class="cave long" >
				<select id="slcMeasure" class="slcMeasure"  name="product[]">`;
		            if(measuresArray && measuresArray._id.length == measuresArray._name.length) {
		            	for (var i = 0; i < measuresArray._id.length; i++) {
		            		if(!slctedIDs.includes(measuresArray._id[i])) {
		            			record += `<option value="${measuresArray._id[i]}">${measuresArray._name[i]}</option>`
		            		}
		            	}
		            }
	            record += `</select>
	            <input type="hidden" class="msrID" id="msrID" name="msrID[]">
	           </div>
			<div class="cave middle">
				<input type="text" readonly="" id="conversion" class="conversion"  name="conversion[]">
			</div>
			<div class="cave middle button actns" style="width: 20%;">
				<label  class="fa fa-circle" style="color: green"></label>
				<label class="fa fa-trash" onclick="return removeUnitFromProductAdd(this)"></label>
			</div>
		</div>`
	$('.unitsTable.Table').append(record)
	setTimeout(function() {
		var slcProduct = new IconicMultiSelect( {
		    // select: '.slcMeasure',
		    select: `.row${recNum} select.slcMeasure`,
		})
		let options = slcProduct._selectContainer;
		slcProduct.init();
		slcProduct.subscribe(function(e) {
			let record = $(`.record.${recNum-1}`)
			// console.log(record)
		    if(e.action == 'ADD_OPTION') {
		        let msrID = e.value
		        let qty = $(record).find(`option[value=${e.value}]`).data('qty')
		        if(e.selection.length > 1) {
		        	$(record).find(`span.multiselect__selected[data-value=${e.selection[0].value}]`).remove()
		        	$(record).find(`li[data-value=${e.selection[0].value}]`).removeClass('multiselect__options--selected')
		        	e.selection.shift()
		        }
		        $.post("./includes/inventory.php?action=searchRec&dest=getMeasureConversion", { msrID:msrID }, function(data) {
		        	$(record).find('#conversion').val(data)
		        	$(record).find('#msrID').val(msrID)
		        	console.log(data)
		        });

		        $(record).find('#qtyOnStock').val(qty)
		    } else if(e.action == 'REMOVE_OPTION') {
		        $(record).find('#slcMeasure').html('')
		    }
		})
		recNum += 1;
	}, 50)
	// rowNum += 1;
	return false;
}
function addNewUnitToProductEdit(btn, itemID) {
	let slctedIDs = [];
	$('.record').each((i, el) => {
		let msrID = $(el).find("input[name^='msrID']").val();
		if(msrID) slctedIDs.push(msrID)
	})
	let record = `<div class="record ${recNum} rec${itemID} row${recNum}" style=" height: 35px !important;">
			<div class="cave long" >
				<select id="slcMeasure${recNum}" class="slcMeasure3${itemID} slcMeasure4Edit"  name="product[]">`;
					record += `<option value="0">Select More Units</option>`;
		            if(optionsArrayEdit && optionsArrayEdit._id.length == optionsArrayEdit._name.length) {
		            	for (var i = 0; i < optionsArrayEdit._id.length; i++) {
		            		// console.log(slctedIDs)
		            		if(!slctedIDs.includes(optionsArrayEdit._id[i])) {
		            			record += `<option value="${optionsArrayEdit._id[i]}">${optionsArrayEdit._name[i]}</option>`
		            		}
		            	}
		            }
	            record += `</select>
	            <input type="hidden" class="msrID" id="msrID" name="msrID[]">
	           </div>
			<div class="cave middle">
				<input type="text" readonly="" id="conversion" class="conversion"  name="conversion[]">
			</div>
			<div class="cave middle button actns" style="width: 20%;">
				<label  class="fa fa-circle" style="color: green"></label>
				<label class="fa fa-trash" onclick="return removeUnitFromProductAdd(this)"></label>
			</div>
		</div>`
	$('.unitsTable2.Table').append(record)
	setTimeout(function() {
		// initForProductEditPopup(`#slcMeasure${recNum}`, false)
		var slcMeasures = new IconicMultiSelect( {
		    select: `#slcMeasure${recNum}`,
		})
		// console.log(slcMeasures)
		// let options = slcMeasures._selectContainer;
		slcMeasures.init();
		slcMeasures.subscribe(function(e) {
			let record = $(`.record.${recNum-1}`)
			console.log(record)
		    if(e.action == 'ADD_OPTION') {
		        let msrID = e.value
		        let qty = $(record).find(`option[value=${e.value}]`).data('qty')
		        if(e.selection.length > 1) {
		        	$(record).find(`span.multiselect__selected[data-value=${e.selection[0].value}]`).remove()
		        	$(record).find(`li[data-value=${e.selection[0].value}]`).removeClass('multiselect__options--selected')
		        	e.selection.shift()
		        }
		        $.post("./includes/inventory.php?action=searchRec&dest=getMeasureConversion", { msrID:msrID }, function(data) {
		        	$(record).find('#conversion').val(data)
		        	$(record).find('#msrID').val(msrID)
		        	console.log(data)
		        });

		        $(record).find('#qtyOnStock').val(qty)
		    } else if(e.action == 'REMOVE_OPTION') {
		        $(record).find('#slcMeasure').html('')
		    }
		})
		recNum += 1;
	}, 50)
	// rowNum += 1;
	return false;
}

function editProductFromPopUp(form) {
	let popup = $(form).parents('.addProduct.popUpForm')

	let txtPrdName 	= $(form).find('#txtPrdName').val();
	let slcCategory = $(form).find('#slcCategory').val();
	let slcMeasure 	= $(form).find('#slcMeasure').val();

	if (txtPrdName.length < 1) {
		$(form).find("#txtPrdNameErr").css("display", "inline");
		$(form).find("#txtPrdNameErr").html("Provide product Name");
		$(form).find("#txtPrdName").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if (slcCategory.length < 1) {
		$(form).find("#slcCategoryErr").css("display", "inline");
		$(form).find("#slcCategoryErr").html("Select Category");
		$(form).find("#slcCategory").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if (slcMeasure.length < 1) {
		$(form).find("#slcMeasureErr").css("display", "inline");
		$(form).find("#slcMeasureErr").html("Select Measurement");
		$(form).find("#slcMeasure").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	console.log(txtPrdName, slcCategory, slcMeasure)

	return true
}
function loadProducts(pageLimit, perPage = 10){
	$("#dataTable div#loading").css("display", "inline");
	var period = $("#slcPeriod").val();
	var dataString = `pageLimit=${pageLimit}&perPage=${perPage}&myWhouse=${myWhouse}&period=${period}`;
	$.ajax({
		type: "POST",
		url: "./includes/inventory.php?action=loadTable&dest=allProducts&myRole="+myRole+"&myUser="+myUser,
		data: dataString,
		cache: false,
		timeout: 2000,
		success: function(result){
			let count =  JSON.parse(result)[1]
			$("#dataTable div#loading").css("display", "none");
			$("#dataTable").append(JSON.parse(result)[0]);
			if(count < perPage ) {
				$('.load_more_link').css('display', 'none')
			}
		},
	});
	return false;
}
function deletePrduct(prdID) {
	swal({
		title: "Are you sure to delete?",
		text: "You going to delete this product.",
		icon: "warning",
		buttons: ['Cancel', 'Yes, delete it']
	}).then((e) => {
		if(e) {
			$.post("./includes/inventory.php?action=deleteRec&dest=delPrdct",{ prdID:prdID}, function(data){
				if(data=="deleted") {
					swal({
						title: "Success",
						text: "Selected product has been removed permenantly",
						icon: "success",
						timer: 1500,
						button: false
					}).then(() => {
						location.reload();
					});
				} else {
					swal("Oops!", data, "error");
				}
			});
		}
	})
	return false;
}
function deleteSupplyItem(itemID) {
	swal({
		title: "Are you sure to delete?",
		text: "You going to delete this product.",
		icon: "warning",
		buttons: ['Cancel', 'Yes, delete it']
	}).then((e) => {
		if(e) {
			$.post("./includes/inventory.php?action=deleteRec&dest=delSupplyItem",{ itemID:itemID}, function(data){
				if(data=="deleted") {
					swal({
						title: "Success",
						text: "Selected product has been deleted permenantly",
						icon: "success",
						timer: 1500,
						button: false
					}).then(() => {
						location.reload();
					});
				} else {
					swal("Oops!", data, "error");
				}
			});
		}
	})
	return false;
}
function removeUnitFromProduct(btn, recID, msrID, supItemID) {
	swal({
		title: "Are you sure to remove  this unit from this item?",
		text: "You going to remove this unit.",
		icon: "warning",
		buttons: ['Cancel', 'Yes, remove it']
	}).then((e) => {
		if(e) {
			$.post("./includes/inventory.php?action=deleteRec&dest=removeUnitFromProduct",{ recID:recID, msrID:msrID,supItemID:supItemID }, function(data){
				if(data=="deleted") {
					swal({
						title: "Success",
						text: "Selected unit has been removed permenantly",
						icon: "success",
						timer: 1500,
						button: false
					}).then(() => {
						location.reload();
					});
				} else {
					swal("Oops!", data, "error");
				}
			});
		}
	})
	return false;
}
function editPrductPopUp(prdtID) {
	let popupInput = document.getElementById(`editProduct${prdtID}`)
	let popup = $(popupInput).parents('.popUpForm')
	let el = $(popup).find('.record.1').find('select.slcMeasure2')
	// console.log(el[0])
	// initForProductEditPopup(`#slcMeasure2${prdtID}`,popup)
	document.getElementById(`editProduct${prdtID}`).checked = true
	// document.getElementById(`editProduct${prdtID}`).checked = true
}
function initForProductEditPopup(el, popup) {
	var slcMeasures = new IconicMultiSelect( {
	    select: el,
	})
	// let options = slcMeasures._selectContainer;
	console.log(slcMeasures)
	slcMeasures.init();
	slcMeasures.subscribe(function(e) {
		let record = $(popup).find('.record.1')
	    if(e.action == 'ADD_OPTION') {
	        let msrID = e.value
	        let qty = $(record).find(`option[value=${e.value}]`).data('qty')
	        if(e.selection.length > 1) {
	        	$(record).find(`span.multiselect__selected[data-value=${e.selection[0].value}]`).remove()
	        	$(record).find(`li[data-value=${e.selection[0].value}]`).removeClass('multiselect__options--selected')
	        	e.selection.shift()
	        }
	        $.post("./includes/inventory.php?action=searchRec&dest=getMeasureConversion", { msrID:msrID }, function(data) {
	        	$(record).find('#conversion').val(data)
	        	$(record).find('#msrID').val(msrID)
	        	console.log(data)
	        });

	        $(record).find('#qtyOnStock').val(qty)
	    } else if(e.action == 'REMOVE_OPTION') {
	        $(record).find('#slcMeasure').html('')
        	$(record).find('#prdID').val('')
	    }
	})
}
function addProductFromPopUp(form) {
	let popup = $(form).parents('.addProduct.popUpForm')

	let txtPrdName 	= $(form).find('#txtPrdName').val();
	let slcCategory = $(form).find('#slcCategory').val();
	let slcMeasure 	= $(form).find('#slcMeasure').val();



	let msrID = [];

	$(form).find('.record.measure-record').each((i,el)=>{
		msrID.push($(el).find('input.msrID').val())
	})

	console.log(msrID);

	if (txtPrdName.length < 1) {
		$(form).find("#txtPrdNameErr").css("display", "inline");
		$(form).find("#txtPrdNameErr").html("Provide product Name");
		$(form).find("#txtPrdName").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if (slcCategory.length < 1) {
		$(form).find("#slcCategoryErr").css("display", "inline");
		$(form).find("#slcCategoryErr").html("Select Category");
		$(form).find("#slcCategory").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if (slcMeasure.length < 1) {
		$(form).find("#slcMeasureErr").css("display", "inline");
		$(form).find("#slcMeasureErr").html("Select Measurement");
		$(form).find("#slcMeasure").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }



	// console.log(txtPrdName, slcCategory, slcMeasure)

	$.post("./includes/inventory.php?action=saveNew&dest=addProductFromPopUp",{ txtPrdName:txtPrdName, slcCategory:slcCategory, slcMeasure:slcMeasure, msrID:msrID }, function(data){
		console.log(data);

		let res = JSON.parse(data);
		if (!res.error) {
			swal({
				title: "Success",
				text: "New product has been added successfully",
				icon: "success",
				timer: 1500,
				button: false
			}).then(() => {
				if (currentPage == 'purchase') {
					let option = $.parseHTML(`<option selected="selected" value="${res.lastID}">${txtPrdName}</option>`);
					// let measure = $.parseHTML(`<option selected="selected" value="${res.lastID}">${slcMeasure}</option>`);
					$('.txtItemName option').attr("selected", false);
					$('.txtItemName option').prop("selected", false);
					$('.txtItemName').append(option);
					// $('.slcMeasure').append(measure);
					$('#addProduct').attr('checked',false);
					$('#addProduct').prop('checked',false);

					$(popup).find('#txtPrdName').val("");
					$(popup).find('#slcCategory option[value=""]').attr("selected",true);
					$(popup).find('#slcMeasure  option[value=""]').attr("selected",true);

					let nb = recordNumber-1;
					$(".multiselect__container.record."+nb).remove();
					console.log(nb)

					let slRecord = $(".record.product-record."+nb);

					$(slRecord).find("input#itemName").val(txtPrdName);
					$(slRecord).find("input#prdID").val(res.lastID);
					// $(slRecord).find("input#msrName").val(slcMeasure);
					// $(slRecord).find("input#msrID1").val(res.lastID);

					$.post("./includes/inventory.php?action=searchRec&dest=pickMeasures4Item", { supItemID:res.lastID }, function(data) {
			        	$(slRecord).find('#slcMeasure').html(data)
			        	$(slRecord).find('#prdID').val(res.lastID)
			        	$(slRecord).find('#prdID').trigger('change')
			        	$(slRecord).find('#itemName').val(txtPrdName)
			        });


					console.log(slRecord)
					setTimeout((e)=>{
						initProducts(slRecord);	
					},200)
				} else {
					location.reload();
				}
			
			});
		} else {
			swal("Oops!", res.msg, "error");
			return false;
		}
	});


	return false
}
function addNewStorageAreaFromPopUp(btn) {
	let popup = $(btn).parents('.popUpForm')
	let txtStationName = $(popup).find('#txtStationName').val();
	let txtStationPhone = $(popup).find('#txtStationPhone').val();
	let txtStationEmail = $(popup).find('#txtStationEmail').val();
	let txtStationAddress = $(popup).find('#txtStationAddress').val();


	if (txtStationName.length < 1) {
		$(popup).find("#txtStationNameErr").css("display", "inline");
		$(popup).find("#txtStationNameErr").html("Provide station Name");
		$(popup).find("#txtStationName").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	if (txtStationPhone.length < 1) {
		$(popup).find("#txtStationPhoneErr").css("display", "inline");
		$(popup).find("#txtStationPhoneErr").html("Provide station phone");
		$(popup).find("#txtStationPhone").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	$(popup).find("#btnSave").attr("disabled", true);
	$(popup).find("#btnSave").html("Wait...");

	$.post("./includes/inventory.php?action=saveNew&dest=addWhouse&addedBy="+myUser, {txtStationName:txtStationName, txtStationPhone:txtStationPhone, txtStationEmail:txtStationEmail, txtStationAddress:txtStationAddress}, function(data){
		// var addedpos = data.search("added");
		// console.log(data)
		document.getElementById(`addNewStorageArea`).checked = false
		let res =  JSON.parse(data)
		$(popup).find("label.process").css("display", "none");
		if (res.msg=='added') {
			$(popup).find("#addNewStorageArea").attr("checked",false);
			swal({
				title: "Success!",
				text: "You added New station successfully.",
				icon: "success",
				timer: 1500,
				button: false,
			}).then(()=>{
				// location.reload()
				let option = `<option selected="selected" value="${res._id}"> ${txtStationName}</option>`
				$('#slcStorage').append(option)
				$('#slcStorageTo').append(option)
			});
		} else {
			swal("Oops!", res.msg, "error");
		}
		$(popup).find("#btnSave").attr("disabled", false);
		$(popup).find("#btnSave").html("Edit");
	});
	return false;
}

function smpfyUnitPage(){
	$('#srchUnit').on('keyup', (e) => {
		let passedValue = $(e.target).val();
		if(passedValue) {
			$("div.suggest").css("display", "table-row");
			$.post("./includes/inventory.php?action=searchRec&dest=srchUnits", { passedValue: passedValue}, function(data) {
				$("div.suggest").html(data);
			});
		}
	})
}

function catchUnits(msrID) {
	$.post("./includes/inventory.php?action=get_recInfo&dest=get_units", { msrID: msrID}, function(data) {
		$("div.suggest").css("display", "none");
		$("#dataTable").html(data);
	});
}

function smpfyCategoryPage(){
	$('#srchCategory').on('keyup', (e) => {
		let passedValue = $(e.target).val();
		if(passedValue) {
			$("div.suggest").css("display", "table-row");
			$.post("./includes/inventory.php?action=searchRec&dest=srchCategory", { passedValue: passedValue}, function(data) {
				$("div.suggest").html(data);
			});
		}
	})
}

function catchCategory(ctgryID) {
	$.post("./includes/inventory.php?action=get_recInfo&dest=get_Category", { ctgryID: ctgryID}, function(data) {
		$("div.suggest").css("display", "none");
		$("#dataTable").html(data);
	});
}

function smpfyVendorPage(){
	$('#srchVendor').on('keyup', (e) => {
		let passedValue = $(e.target).val();
		if(passedValue) {
			$("div.suggest").css("display", "table-row");
			$.post("./includes/inventory.php?action=searchRec&dest=srchVendor", { passedValue: passedValue}, function(data) {
				$("div.suggest").html(data);
			});
		}
	})
}

function catchVendor(vndID) {
	$.post("./includes/inventory.php?action=get_recInfo&dest=get_Vendor", { vndID: vndID}, function(data) {
		$("div.suggest").css("display", "none");
		$("#dataTable").html(data);
	});
}

function editReceivedBy(btn) {
	let popup = $(btn).parents('.popUpForm')
	let receivedById = $(popup).find('#usageID').val();
	let receivedBy = $(popup).find('#popReceivedBy').val();

	if (receivedBy.length < 1) {
		$(popup).find("#receivedByError1").css("display", "inline");
		$(popup).find("#receivedByError1").html("Provide  ReceivedBy Name");
		$(popup).find("#popReceivedBy").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	$(popup).find("#btnSave").attr("disabled", true);
	$(popup).find("#btnSave").html("Wait...");

	$.post("./includes/inventory.php?action=updateExist&dest=editReceivedBy&addedBy="+myUser, {receivedById:receivedById, txtReceivedBy:receivedBy}, function(data){
		// var addedpos = data.search("added");
		$(popup).find("label.process").css("display", "none");
		if (data=='updated') {
			$(popup).find("#popReceivedBy").val('');
			$(popup).find("#editReceivedBy").attr("checked",false);
			swal({
				title: "Success!",
				text: "You updated selected receivedBy successfully.",
				icon: "success",
				timer: 1500,
				button: false,
			}).then(()=>{
				location.reload()
			});
		} else {
			swal("Oops!", data, "error");
		}
		$(popup).find("#btnSave").attr("disabled", false);
		$(popup).find("#btnSave").html("Edit");
	});
	return false;
}

function editReference(btn) {
	let popup = $(btn).parents('.popUpForm')
	let refID = $(popup).find('#refID').val();
	let txtRef = $(popup).find('#popRef').val();

	if (txtRef.length < 1) {
		$(popup).find("#refError1").css("display", "inline");
		$(popup).find("#refError1").html("Provide Reference Name");
		$(popup).find("#popRef").css("border-color", "#FF0000");
		return false;
	} else { clearErrors(); }

	$(popup).find("#btnSave").attr("disabled", true);
	$(popup).find("#btnSave").html("Wait...");

	$.post("./includes/inventory.php?action=updateExist&dest=editReference&addedBy="+myUser, {refID:refID, txtRef:txtRef}, function(data){
		// var addedpos = data.search("added");
		$(popup).find("label.process").css("display", "none");
		if (data=='updated') {
			$(popup).find("#popRef").val('');
			$(popup).find("#editRef").attr("checked",false);
			swal({
				title: "Success!",
				text: "You updated selected Reference successfully.",
				icon: "success",
				timer: 1500,
				button: false,
			}).then(()=>{
				location.reload()
			});
		} else {
			swal("Oops!", data, "error");
		}
		$(popup).find("#btnSave").attr("disabled", false);
		$(popup).find("#btnSave").html("Edit");
	});
	return false;
}