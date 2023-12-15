// remember me
$("#rememberLbl, #switchRemember").click(function(){
	$('div#switchRemember').toggleClass("switchOn");
	if (document.getElementById("rememberMe").checked == true) {
		document.getElementById("rememberMe").checked = false;
	} else {
		document.getElementById("rememberMe").checked = true;
	}
});
//
$("input#rememberMe").keydown(function(){
	$('div#switchRemember').toggleClass("switchOn");
});
//\
$(".show-password").click(function () {
	if($(".fa-eye-slash")[0]) {
		$(this).removeClass("fa-eye-slash");
		$(this).addClass("fa-eye");
		$(this).closest('div.record').find("input[type='password']").prop("type","text");
	} else {
		$(this).addClass("fa-eye-slash");
		$(this).removeClass("fa-eye");
		$(this).closest('div.record').find("input[type='text']").prop("type","password");
	}

});
//
function clear_login() {
	$("label.error").css("display", "none");
	$("div.record.one, div.record.two").css("border", "1px solid #cccccc");
}
//
function knowCapsOn(e) {
	var s = String.fromCharCode(e.which);
	if(s.toUpperCase() === s && s.toLowerCase() !== s && !e.shiftKey) {
		$("div.tooltip").css('display', 'inline');
	} else {
		$("div.tooltip").css('display', 'none');
	}
}
//
function checkLogIn() {
	// get passed values
	var username = $("#txtUsername").val();
	var password = $("#txtPassword").val();

	if(username.length < 1){
		$("div.record.one").css("border", "1px solid #e57325");
		$("label#error1").css("display", "inline");
		$("label#error1").html("Please type your username");
		return false;
	} else { clear_login(); }

	if(password.length < 1){
		$("div.record.two").css("border", "1px solid #e57325");
		$("label#error2").css("display", "inline");
		$("label#error2").html("Don't forget your password");
		return false;
	} else { clear_login(); }

	if(document.getElementById("rememberMe").checked == true) { remValue = "true"; }
	else { remValue = "false"; }

	$.post("./includes/basicFuncs.php?consider=checkLogin", { theRole:'normal', username:username, password:password, remember:remValue } , function(data) {
		if(data=="logged") {
			$("label#error2").css("display", "inline");
			$("label#error2").css("color", "#009900");
			$("label#error2").css("background", "none");
			document.getElementById("error2").innerHTML="please wait ...";
			window.location = "./dashboard.php";
			return true;
		} else if(data=="wrong-user") {
			$("div.record.one").css("border", "1px solid #e57325");
			$("label#error1").css("display", "inline");
			$("label#error1").html("Username does not found");
			return false;
		} else if(data=="wrong-pass") {
			$("div.record.two").css("border", "1px solid #e57325");
			$("label#error2").css("display", "inline");
			$("label#error2").html("Invalid password");
			return false;
		} else if(data=="not-active") {
			$("div.record.one").css("border", "1px solid #e57325");
			$("label#error1").css("display", "inline");
			$("label#error1").html("Username is not active");
			return false;
		} else if(data=="not-user") {
			$("div.record.one").css("border", "1px solid #e57325");
			$("label#error1").css("display", "inline");
			$("label#error1").html("Sorry, user registered as a waiter");
			return false;
		} else if(data=="update-error") {
			$("label#error1").css("display", "inline");
			$("label#error1").html("Update error, try again");
			return false;
		} else {
			alert(data); return false;
		}
	});
	return false;
}
//
function check_forgotPass() {
	var emailExp 	= /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
	var txtEmail = $("#txtEmail").val();
	var response = grecaptcha.getResponse();

	if(txtEmail.length < 1) {
		$("#error1").css("display", "inline");
		$("#error1").html("Provide your email address");
		$("#txtEmail").css("border-color", "#FF0000");
		return false;
	} else if(!txtEmail.match(emailExp)) {
		$("#error1").css("display", "inline");
		$("#error1").html("Email address in incorrect");
		$("#txtEmail").css("border-color", "#FF0000");
		return false;
	} else {
		$("#error1").css("display", "none");
		$("#txtEmail").css("border-color", "#CCCCCC");
	}

	if(response.length == 0) {
		$("#error2").css("display", "inline");
		$("#error2").html("Please verify that you are human.");
		return false;
	}

	$(".btnSubmit").val("wait...");
	return true;
}
//
function check_ResetPass() {
	$(".qaladka").css("display", "none");
	$("div.record input").css("border-color", "#ccc");

	var txtUser		= $("#txtUser").val();
	var hash		= $("#hash").val();
	var txtPassword = $("#txtPassword").val();
	var txtRePass	= $("#txtRePass").val();

	if(txtPassword.length < 1) {
		$("#error1").css("display", "inline");
		$("#error1").html("Type new password");
		$("#txtPassword").css("border-color", "#FF0000");
		return false;
	} else if(txtPassword.length < 6 || txtPassword.length > 20) {
		$("#error1").css("display", "inline");
		$("#error1").html("Password must between 6-20 chars");
		$("#txtPassword").css("border-color", "#FF0000");
		return false;
	} if(txtPassword.match(/^.*[^\s{1,}]\s.*/) || (document.getElementById("txtPassword").value[0]===' ')) {
		// detect if contains space
		$("#error1").css("display", "inline");
		$("#error1").html("Space is not allowed");
		$("#txtPassword").css("border-color", "#FF0000");
		return false;
	}

	if(txtRePass.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Please confirm password");
		$("#txtRePass").css("border-color", "#FF0000");
		return false;
	} else if(txtPassword != txtRePass) {
		$("#error2").css("display", "inline");
		$("#error2").html("Password dismatch");
		$("#txtRePass").css("border-color", "#FF0000");
		return false;
	}

	swal({
		title: "Confirm?",
	  	text: "You are going to reset your password?",
	    type: "info",
	    showCancelButton: true,
	    closeOnConfirm: false,
	    showLoaderOnConfirm: true,
	},
	function() {
		$.post("./includes/basicFuncs.php?action=updateExist&dest=resetPass&updatedBy="+txtUser, { username:txtUser, hash:hash, newPassword:txtPassword }, function(data) {
			if(data=="updated") {
				swal({
					title: "Success",
					text: "You created new password for your account. \n Now click Ok button to login",
					type: "success",
					closeOnConfirm: false
				},
					function(isConfirm) {
						window.location = "./";
					}
				);
			} else {
				swal("Oops!", data, "error");
			}
		});
	});
	return false;
}
//
/*function askPassword(username) {
	swal({
		title: "Username: "+username,
		text: 'Please provide your current password!',
		type: "input",
		showCancelButton: true,
		closeOnConfirm: false,
		animation: "slide-from-top",
		inputPlaceholder: "required",
	},
	function(password) {
		if (password === false) return false;
		if (password === "") {
			swal.showInputError("You need to provide your password");
			return false
		}
		$.post("./includes/basicFuncs.php?consider=checkLogin", { theRole:'waiter', username:username, password:password, remember:'false' }, function(data){
			if(data=="logged") {
				window.location = "./workplace-waiter.php";
				return true;
			} else if(data=="wrong-pass") {
				swal('Oops', 'Invalid password');
				return false;
			} else if(data=="not-active") {
				swal('Oops', 'Username is not active');
				return false;
			} else if(data=="update-error") {
				swal('Oops', 'Update error, try again');
				return false;
			} else {
				swal('Oops', data); return false;
			}
		});
	});
}*/
function checkWaiterLogin() {
	var username = $('[name="username"]:checked').val();
	var password = $("input#txtPassword").val();

	if(!username){
		swal("Oops!", "Select user", "info");
		return false;
	}
	if(!username){
		swal("Oops!", "Invalid passowrd", "info");
		return false;
	}
	$.post("./includes/basicFuncs.php?consider=checkLogin", { theRole:'waiter', username:username, password:password, remember:'false' }, function(data){
			if(data=="logged") {
				window.location = "./deegaan-restaurant/orders-workplace.php";
				return true;
			} else if(data=="wrong-pass") {
				swal('Oops', 'Incorrect password');
				return false;
			} else if(data=="not-active") {
				swal('Oops', 'Username is not active');
				return false;
			} else if(data=="update-error") {
				swal('Oops', 'Update error, try again');
				return false;
			} else {
				swal('Oops', data); return false;
			}
		});

}
function clearWaiterLogin() {
	$("input#txtPassword").val('');
	$("input#chkNum").prop('checked', false);

}
$('input[type=checkbox]#chkNum').on('change', function(e) {
	var chkVal = ($(this).val());
	var currPass = $("input#txtPassword").val()+chkVal;
	$("input#txtPassword").val(currPass);
});

//
function isDecimalNum(txt, evt) {
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode == 46) {
		if (txt.value.indexOf('.') === -1) {
			return true;
		} else {
			return false;
		}
	} else {
		if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;
	}
	return true;
}
//
function isNumberKey(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57))
	return false;
	return true;
}
//
function inWords(d){
	var e=["","Thousand","Million","Billion","Trillion"];var f=["Zero","One","Two","Three","Four","Five","Six","Seven","Eight","Nine"];var a=["Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];var b=["Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];function c(l){l=l.replace(/[\, ]/g,"");if(l!=parseFloat(l)){return"not a number"}var h=l.indexOf(".");if(h==-1){h=l.length}if(h>15){return"too big"}var p=l.split("");var m="";var j=0;for(var k=0;k<h;k++){if((h-k)%3==2){if(p[k]=="1"){m+=a[Number(p[k+1])]+" ";k++;j=1}else{if(p[k]!=0){m+=b[p[k]-2]+" ";j=1}}}else{if(p[k]!=0){m+=f[p[k]]+" ";if((h-k)%3==0){m+="hundred "}j=1}}if((h-k)%3==1){if(j){m+=e[(h-k-1)/3]+" "}j=0}}if(h!=l.length){var o=l.length;m+="point ";for(var k=h+1;k<o;k++){m+=f[p[k]]+" "}}return m.replace(/\s+/g," ")}var g=c(d);if(g==="not a number"){$("#txtInWords").val(g)}else{if(d>1){$("#txtInWords").val(g+"US Dollars")}else{$("#txtInWords").val(g+"US Dollar")}}
}

//
function tweetFeed(txt, tweetMax) {
	var t_lenght = $("#txtRemarks").val().length;
	var char_left = tweetMax - t_lenght;
	$("#tweet_feed").html(char_left + " chars left");
}
// for menu items
(function($) {
	$(document).ready(function() {
		$('#sidebar > ul > li > a').click(function() {

			$(this).closest('li').addClass('active');
			var checkElement = $(this).next();
			if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
				$(this).closest('li').removeClass('active');
				checkElement.slideUp('normal');
			}
			if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
				$('#sidebar ul ul:visible').slideUp('normal');
				checkElement.slideDown('normal');
			}
			if($(this).closest('li').find('ul').children().length == 0) {
				return true;
			} else {
				return false;
			}
		});
	});
})($);
// for popUp form
(function($){
	$.fn.extend({
		leanModal:function(options){
			var defaults={
				top:100,
				overlay:0.5,
				closeButton:null
			};
			var overlay=$("<div id='lean_overlay'></div>");
			$("body").append(overlay);
			options=$.extend(defaults,options);
			return this.each(function(){
				var o=options;$(this).click(function(e){
					var modal_id=$(this).attr("href");
					$("#lean_overlay").click(function(){
						close_modal(modal_id)
					});
						$(o.closeButton).click(function(){
							close_modal(modal_id)
						});
						var modal_height=$(modal_id).outerHeight();
						var modal_width=$(modal_id).outerWidth();


					$("#lean_overlay").css({
						"display":"block",
						opacity:0
					});
					$("#lean_overlay").fadeTo(200,o.overlay);
					$(modal_id).css({
						"display":"block",
						"position":"fixed",
						"opacity":0,
						"z-index":11000,
						"left":50+"%",
						"margin-left":-(modal_width/2)+"px",
						"top":o.top+"px"
					});
					$(modal_id).fadeTo(200,1);e.preventDefault()
				})
			});
		function close_modal(modal_id){
			$("#lean_overlay").fadeOut(200);
			$(modal_id).css({
				"display":"none"
			})
		}
	}
	})
})($);
//
function simplfyTopBar() {
	$("div.icon.profile").click(function() {
		$("div.dropDown").fadeToggle(300);
		return false;
	});
	$(document).click(function() {
		$("div.dropDown").hide();
	});
	$("div.dropDown").click(function(e) {
		e.stopPropagation();
	});
}
function simplfyWaiterTopBar() {
	$("div.user.icon").click(function() {
		$("div.drop-down").fadeToggle(300);
		return false;
	});
	$(document).click(function() {
		$("div.drop-down").hide();
	});
	$("div.drop-down").click(function(e) {
		e.stopPropagation();
	});
}
//
function displayChart() {
	var areaChartData = {
		labels:["01", "05", "10", "15", "20", "25", lastday],
		datasets: [
			{
				strokeColor:"rgba(255, 255, 255, 1)",
				pointColor:"rgba(255, 255, 255, 1)",
				pointStrokeColor:"#3a2621",
				data:[amnt0To1,amnt6To10,amnt11To15,amnt16To20,amnt21To25,amntLst],
			}
		],
	};

    var areaChartOptions = {
		//Boolean - If we should show the scale at all
		showScale:true,
		//String - Colour of the grid lines
		scaleGridLineColor:"rgba(51,51,51,0.1)",
		//Number - Width of the grid lines
		scaleGridLineWidth:1,
		//Boolean - Whether to show horizontal lines (except X axis)
		scaleShowHorizontalLines:true,
		//Boolean - Whether to show vertical lines (except Y axis)
		scaleShowVerticalLines:false,
		//Boolean - Whether the line is curved between points
		bezierCurve:true,
		//Number - Tension of the bezier curve between points
		bezierCurveTension:0,
		//Boolean - Whether to show a dot for each point
		pointDot:true,
		//Number - Radius of each point dot in pixels
		pointDotRadius:4,
		//Number - Pixel width of dataset stroke
		datasetStrokeWidth:1,
		//Boolean - Whether to fill the dataset with a color
		datasetFill:true,
		//Boolean - whether to make the chart responsive to window resizing
		responsive:true,
    };
    var lineChartCanvas = $("#lineChart").get(0).getContext("2d");
    var lineChart = new Chart(lineChartCanvas);
    var lineChartOptions = areaChartOptions;
    lineChartOptions.datasetFill = false;
    lineChart.Line(areaChartData, lineChartOptions);
}
//
function clearErrors() {
	$("label.error, label.oops").css("display", "none");
	$("input, select").css("border-color", "#cccccc");
}
//
$('input[list]').on('input', function(e) {
    var $input = $(e.target);
    var $options = $('#'+$input.attr('list') + ' option');
    var $hiddenInput = $('#' + $input.attr('id') + '-hidden');
    var label = $input .val();

    $hiddenInput.val(label);

    for (var i = 0; i < $options.length; i++) {
        var $option = $options.eq(i);
        if($option.text() === label) {
            $hiddenInput.val($option.attr('data-value'));
            break;
        }
    }
});
function removeItem(num) {
	$(".list .listItem.num"+num).find("input").val("");
	$(".list .listItem.num"+num).fadeOut(500, function(){ $(this).remove(); });
	if( $(".list .listItem").length == 1 ) {
		$(".list").fadeIn(500, function() {
			$(".list").append(`<div class="listItem zero"><p class="noRecord">No record has been added yet.</p></div>`);
		});
	}
}
//
function goBack() {
	window.history.back();
}

/* ------------------------------------------------------------
--------------------------- profile --------------------------
--------------------------------------------------------------*/

function changeMyPhoto() {
	var progressBar = $('.progressBar'), bar = $('.progressBar .bar'), percent = $('.progressBar .percent');
	$('#image_upload_form').ajaxForm({
		beforeSend: function() {
			progressBar.fadeIn();
			var percentVal = '0%';
			bar.width(percentVal)
			percent.html(percentVal);
		},
		uploadProgress: function(event, position, total, percentComplete) {
			var percentVal = percentComplete + '%';
			bar.width(percentVal)
			percent.html(percentVal);
		},
		success: function(html, statusText, xhr, $form) {
			obj = $.parseJSON(html);
			if(obj.status) {
				var percentVal = '100%';
				bar.width(percentVal)
				percent.html(percentVal);
				$("div.icon.profile img").prop('src',obj.image_small);
				$("div.dropDown div#photo > img").prop('src',obj.image_medium);
				$("div.imgWrap img").prop('src',obj.image_medium);
				//
				$("div.profile-icon img").prop('src',obj.image_small);
				$("div.drop-down div.photo > img").prop('src',obj.image_medium);
			} else {
				alert(obj.error);
			}
		},
		complete: function(xhr) {
			progressBar.fadeOut();
		}
	}).submit();
}
function delProfilePic() {
	swal({
		title: "Confirm?",
		text: "You going to delete your current profile picture!",
		type: "info",
		showCancelButton: true,
		closeOnConfirm: false
	},
	function() {
		$.post("./includes/pre-register.php?action=deleteRec&dest=delPrflPic", { myUser:myUser }, function(data) {
			if(data=="deleted") {
				swal({
					title: "Success!",
					text: "Your profile picture has been deleted.",
					type: "success",
					timer: 1500,
					showConfirmButton: false
				},
					function () {
						window.location = "./workplace.php?role="+myRole+"&task=profile";
					}
				);
			} else {
				swal("Oops", data, "error");
			}
		});
	});
	return false;
}
function delProfilePicture() {
	swal({
		title: "Confirm?",
		text: "You going to delete your current profile picture!",
		type: "info",
		showCancelButton: true,
		closeOnConfirm: false
	},
	function() {
		$.post("./includes/general.php?action=deleteRec&dest=delPrflPic", { myUser:myUser }, function(data) {
			if(data=="deleted") {
				swal({
					title: "Success!",
					text: "Your profile picture has been deleted.",
					type: "success",
					timer: 1500,
					showConfirmButton: false
				},
					function () {
						window.location = "./workplace.php?role="+myRole+"&task=profile";
					}
				);
			} else {
				swal("Oops", data, "error");
			}
		});
	});
	return false;
}
function check_chngPass() {
	var txtMyUser	= $("#txtMyUser").val();
	var oldPassword	= $("#oldPassword").val();
	var txtPassword	= $("#txtPassword").val();
	var txtRePass 	= $("#txtRePass").val();

	if(oldPassword.length < 1) {
		$("#error1").css("display", "inline");
		$("#error1").html("Provide your current password");
		$("#oldPassword").css("border-color", "#FF0000");
		if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.one").offset().top }, 'slow'); }
		return false;
	} else { clearErrors(); }

	if(txtPassword.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Your new password can't be empty");
		$("#txtPassword").css("border-color", "#FF0000");
		if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.two").offset().top }, 'slow'); }
		return false;
	} else { clearErrors(); }

	if(txtRePass.length < 1) {
		$("#error3").css("display", "inline");
		$("#error3").html("Please confirm password");
		$("#txtRePass").css("border-color", "#FF0000");
		if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.three").offset().top }, 'slow'); }
		return false;
	} else if(txtPassword != txtRePass) {
		$("#error3").css("display", "inline");
		$("#error3").html("Password dismatch");
		$("#txtRePass").css("border-color", "#FF0000");
		if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.three").offset().top }, 'slow'); }
		return false;
	} else { clearErrors(); }



	swal({
		title: "Confirm?",
		text: "You going to change your password!",
		icon: "warning",
		buttons:["Cancel","Yes, Change Now"]
	})
	.then(willDelete=> {
		if(willDelete) {
			$("label.process").css("display", "inline");
			$("#btnChange").attr("disabled", true);
			$("#btnChange").html("Wait...");
			clearErrors();
			$.post("./includes/pre-register.php?action=updateExist&dest=editPassword&updatedBy="+txtMyUser, { txtMyUser:txtMyUser, oldPassword:oldPassword, newPassword:txtPassword }, function(data) {
				if(data=="updated") {
					swal({
						title: "Success!",
						text: "Your password has been changed successfully.",
						icon: "success",
						timer: 1500,
						button: false
					})
						.then (value=> {
							window.location = "./workplace.php?role="+myRole+"&task=profile&subtask=chngPass";
						}
					);
				} else if(data=="old-wrong") {
					$("#error1").css("display", "inline");
					$("#error1").html("You typed wrong password");
					swal("Oops!", "You typed wrong password, \nmake sure that your current password typed correctly.", "error");
					$("#oldPassword").css("border-color", "#FF0000");
					if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.one").offset().top }, 'slow'); }
				} else {
					swal("Oops", data, "error");
				}
				$("label.process").css("display", "none");
				$("#btnChange").attr("disabled", false);
				$("#btnChange").html("Change");
			});
		}
	});
	return false;
}
function check_chngPassword() {
	var txtMyUser	= $("#txtMyUser").val();
	var oldPassword	= $("#oldPassword").val();
	var txtPassword	= $("#txtPassword").val();
	var txtRePass 	= $("#txtRePass").val();

	if(oldPassword.length < 1) {
		$("#error1").css("display", "inline");
		$("#error1").html("Provide your current password");
		$("#oldPassword").css("border-color", "#FF0000");
		if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.one").offset().top }, 'slow'); }
		return false;
	} else { clearErrors(); }

	if(txtPassword.length < 1) {
		$("#error2").css("display", "inline");
		$("#error2").html("Your new password can't be empty");
		$("#txtPassword").css("border-color", "#FF0000");
		if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.two").offset().top }, 'slow'); }
		return false;
	} else { clearErrors(); }

	if(txtRePass.length < 1) {
		$("#error3").css("display", "inline");
		$("#error3").html("Please confirm password");
		$("#txtRePass").css("border-color", "#FF0000");
		if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.three").offset().top }, 'slow'); }
		return false;
	} else if(txtPassword != txtRePass) {
		$("#error3").css("display", "inline");
		$("#error3").html("Password dismatch");
		$("#txtRePass").css("border-color", "#FF0000");
		if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.three").offset().top }, 'slow'); }
		return false;
	} else { clearErrors(); }

	$("label.process").css("display", "inline");
	$("#btnChange").attr("disabled", true);
	$("#btnChange").html("Wait...");
	clearErrors();

	swal({
		title: "Confirm?",
		text: "You going to change your password!",
		icon: "warning",
		dangerMode: true,
		buttons:["Cancel","Yes, Change Now"]
	})
	.then(willDelete=> {
		if(willDelete){
			$.post("../includes/pre-register.php?action=updateExist&dest=editPassword&updatedBy="+txtMyUser, { txtMyUser:txtMyUser, oldPassword:oldPassword, newPassword:txtPassword }, function(data) {
				if(data=="updated") {
					swal({
						title: "Success!",
						text: "Your password has been changed successfully.",
						icon: "success",
						timer: 1500,
						button: false
					})
						.then (value=> {
							location.reload();
						}
					);
				} else if(data=="old-wrong") {
					$("#error1").css("display", "inline");
					$("#error1").html("You typed wrong password");
					swal("Oops!", "You typed wrong password, \nmake sure that your current password typed correctly.", "error");
					$("#oldPassword").css("border-color", "#FF0000");
					if(window.innerWidth<=768) { $('html, body').animate({ scrollTop: $(".record.one").offset().top }, 'slow'); }
				} else {
					swal("Oops", data, "error");
				}
				$("label.process").css("display", "none");
				$("#btnChange").attr("disabled", false);
				$("#btnChange").html("Change");
			});
		}
	});
	return false;
}
/* ------------------------------------------------------------
---------------------------- reports --------------------------
--------------------------------------------------------------*/

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
function catchClient4Rpt(clientID, clientName) {
	$("#clientID").val(clientID);
	$("#txtClient").val(clientName);
	$("div.suggest").css("display", "none");
}
function catchVendor4Rpt(vndID, fullname) {
	$("#vendorID").val(vndID);
	$("#txtVendor").val(fullname);
	$("div.suggest").css("display", "none");
}
function simplifyReport() {
	/*$("#slcBranch").change(function(){
		var slcBranch = $("#slcBranch").val();
		if(slcBranch!="all") {
			$.post("./includes/functions.php?action=searchRec&dest=pickWhouses",{ slcBranch:slcBranch }, function(data) {
				$("#slcWhouse").html(data);
			});
		} else { $("#slcWhouse").html('<option value="all">All</option>'); }
		clearErrors();
	});
	//
	$("#slcBankID").change(function() {
		var bankID = $("#slcBankID").val();
		if(bankID=="") {
			$("#slcBankAcc").html('');
		} else {
			$.post("./includes/functions.php?action=searchRec&dest=myBankAccs", { bankID: bankID, myBranch:myBranch, myWhouse:myWhouse }, function(data) {
				$("#slcBankAcc").html(data);
			});
		}
	});
	//
	$("#txtClient").keyup(function() {
		$("div.suggest").css("display", "none");
		var txtClient = $("#txtClient").val();
		if(txtClient.length > 0) {
			$("div.suggest.one").css("display", "table-row");
			$.post("./includes/functions.php?action=searchRec&dest=pickClient4Rpt",{ passedValue:txtClient, myRole:myRole, myWhouse:myWhouse }, function(data) {
				$("div.suggest.one").html(data);
			});
		} else { $("div.suggest.one").css("display", "none"); }
		clearErrors();
	});
	//
	$("#txtVendor").keyup(function() {
		$("div.suggest").css("display", "none");
		var txtVendor = $("#txtVendor").val();
		if(txtVendor!="") {
			$("div.suggest.two").css("display", "table-row");
			$.post("./includes/functions.php?action=searchRec&dest=pickVendor4Rpt",{ vendorName:txtVendor}, function(data) {
				$("div.suggest.two").html(data);
			});
		} else { $("div.suggest.two").css("display", "none"); }
		clearErrors();
	});*/
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
		if(rptType=="dailyRpt" || rptType=="receipts" || rptType=="cshTrnsfr") {
			resetRptFilter();

		} else if(rptType=="clientActvty") {
			$("div.filter").css("display", "none");
			$("div.filter.byClientActvty").css("display", "inline");
			$("div.filter.byDate").css("display", "inline");

		} else if(rptType=="vndActvty") {
			$("div.filter").css("display", "none");
			$("div.filter.byVndActvty").css("display", "inline");
			$("div.filter.byDate").css("display", "inline");

		} else if(rptType=="products") {
			$("div.filter").css("display", "none");
			$("div.filter.byMyWhouse").css("display", "inline");

		} else if(rptType=="slsRcvble" || rptType=="slsBenefit" || rptType=="shares" || rptType=="receivable" || rptType=="payable") {
			$("div.filter").css("display", "none");
			$("div.filter.byWhouse").css("display", "inline");

		} else if(rptType=="purchases") {
			$("div.filter").css("display", "none");
			$("div.filter.byPurchase").css("display", "inline");
			$("div.filter.byDate").css("display", "inline");

		} else if(rptType=="commission") {
			$("div.filter").css("display", "none");
			$("div.filter.byCommission").css("display", "inline");
			$("div.filter.byDate").css("display", "inline");

		} else if(rptType=="sales") {
			resetRptFilter();
			$("div.filter.byInvoice").css("display", "inline");

		} else if(rptType=="payments") {
			resetRptFilter();
			$("div.filter.byExpense").css("display", "inline");

		} else if(rptType=="othrIncome") {
			resetRptFilter();
			$("div.filter.byIncAccs").css("display", "inline");

		} else if(rptType=="assets") {
			$("div.filter").css("display", "none");
			$("div.filter.byAssets").css("display", "inline");

		} else if(rptType=="bankActvty") {
			$("div.filter").css("display", "none");
			$("div.filter.byBankActvty").css("display", "inline");
			$("div.filter.byDate").css("display", "inline");

		} else if(rptType=="incStatment") {
			$("div.filter").css("display", "none");
			$("div.filter.byWhouse").css("display", "inline");
			$("div.filter.byIncStatment").css("display", "inline");

		} else if(rptType=="cashFlow") {
			$("div.filter").css("display", "none");
			$("div.filter.byMyWhouse").css("display", "inline");
			$("div.filter.byDate").css("display", "inline");

		} else if(rptType=="blnceSheet") {
			$("div.filter").css("display", "none");
			$("div.filter.byblnceSheet").css("display", "inline");
		}
		resetError();

	});
	// for income-statment filter types
	$("#monthTick, #chkIncome4mnth").click(function() {
		document.getElementById("chkIncome4mnth").checked = true;
		document.getElementById("txtIncMonth").disabled = false;
		document.getElementById("slcIncYear").disabled = true;
		$("select#slcIncYear option:first").attr("selected", "selected");
	});
	$("#yearTick, #chkIncome4yr").click(function() {
		document.getElementById("chkIncome4yr").checked = true;
		document.getElementById("slcIncYear").disabled = false;
		document.getElementById("txtIncMonth").disabled = true;
		$("input#txtIncMonth").val('');
		resetError();
	});
}
//
function check_reportParam() {
	resetError();
	var rptType 	= $("input[name='reportType']:checked").val();

	var slcWhouse	= $("select#slcWhouse").val();
	var slcByComm	= $("select#slcByComm").val();
	var txtClient	= $("input#txtClient").val();
	var clientID	= $("input#clientID").val();
	var txtVendor	= $("input#txtVendor").val();
	var vendorID	= $("input#vendorID").val();
	var myWhouse	= $("input#myWhouse").val();
	//
	var startDate	= $("input#startDate").val();
	var endDate		= $("input#endDate").val();
	//
	var slcBankID	= $("select#slcBankID").val();
	var slcBankAcc	= $("select#slcBankAcc").val();
	var incomeFor	= $("input[name='incomeFor']:checked").val();
	var txtIncMonth	= $("input#txtIncMonth").val();
	var slcIncYear	= $("select#slcIncYear").val();
	var blnceYear 	= $("select#blnceYear").val();
	//
	if(rptType=="clientActvty") {
		if(txtClient.length<1 || clientID=="") {
			$("#error1").css("display", "inline");
			$("#error1").html("Please select customer");
			$("input#txtClient").css("border-color", "#FF0000");
			return false;
		} else { resetError(); }
	}
	if(rptType=="vndActvty") {
		if(txtVendor.length<1 || vendorID=="") {
			$("#error1").css("display", "inline");
			$("#error1").html("Please select vendor");
			$("input#txtVendor").css("border-color", "#FF0000");
			return false;
		} else { resetError(); }
	}
	if(rptType=="commission") {
		if(slcByComm.length<1 || slcByComm=="---") {
			$("#error1").css("display", "inline");
			$("#error1").html("Please select user");
			$("select#slcByComm").css("border-color", "#FF0000");
			return false;
		} else { resetError(); }
	}

	if(rptType=="bankActvty") {
		if(slcBankID.length<1 || slcBankID=="---") {
			$("#error1").css("display", "inline");
			$("#error1").html("Please select bank");
			$("select#slcBankID").css("border-color", "#FF0000");
			return false;
		} else { resetError(); }

		if(slcBankAcc.length<1 || slcBankAcc=="---") {
			$("#error1").css("display", "inline");
			$("#error1").html("Select bank account");
			$("select#slcBankAcc").css("border-color", "#FF0000");
			return false;
		} else { resetError(); }

	}
	if(rptType=="products") {
		if(myWhouse.length<1) {
			$("#error1").css("display", "inline");
			$("#error1").html("Can't find your wherehouse");
			return false;
		} else { resetError(); }

	}
	if(rptType!="products" && rptType!="slsRcvble" && rptType!="slsBenefit" && rptType!="assets" &&  rptType!="shares" && rptType!="receivable" && rptType!="payable" && rptType!="incStatment" && rptType!="cashFlow" && rptType!="blnceSheet") {
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

	} else if(rptType=="incStatment") {
		if(slcWhouse.length<1  || slcWhouse=="---") {
			$("#error1").css("display", "inline");
			$("#error1").html("Please select wherehouse");
			$("select#slcWhouse").css("border-color", "#FF0000");
			return false;
		} else { resetError(); }

		if(incomeFor=="monthly") {
			if(txtIncMonth.length<1) {
				$("#error1").css("display", "inline");
				$("#error1").html("Please select month");
				$("input#txtIncMonth").css("border-color", "#FF0000");
				return false;
			} else { resetError(); }

		} else if(incomeFor=="yearly") {
			if(slcIncYear=="---") {
				$("#error1").css("display", "inline");
				$("#error1").html("Please select year");
				$("select#slcIncYear").css("border-color", "#FF0000");
				return false;
			} else { resetError(); }
		}
	} else if(rptType=="cashFlow") {
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

	} else if(rptType=="blnceSheet") {
		if(blnceYear.length<1  || blnceYear=="---") {
			$("#error1").css("display", "inline");
			$("#error1").html("Please select year");
			$("select#blnceYear").css("border-color", "#FF0000");
			return false;
		} else { resetError(); }
	}

	$("label#process").css("display", "inline");
	$("#btnDisplay").attr("disabled", true);
	$("#btnDisplay").html("Wait...");
	return true;
}



var numExp 		= /^[0-9]+$/;
var spaceExp 	= /^.*[^\s{1,}]\s.*/;
var emailExp 	= /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
