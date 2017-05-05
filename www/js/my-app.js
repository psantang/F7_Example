// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true,
    domCache: true //enable inline pages
});



// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");




});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page
    myApp.alert('Here comes About page...initiated from onPageInit.');
})

// Option 2. Using one 'pageInit' event handler for all pages:
/*
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page...initiated from pageInit');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page...initiated with live pageInit');
})
*/


myApp.onPageInit('link1', function (page) {
  console.log('link1 initialized');
  console.log(page);

  //$$('#button_ajaxData').on('click', function (e) {
  $$('#button_ajaxData').click(function() {
    console.log('button_ajaxData clicked');
    init_login();
  });

});






function init_login() {
  console.log('init_login called');


				var user_name=$$('#user_name').val();
				var pwd=$$('#pwd').val();
				var url='http://finappv2.paulsantangelo.com/ws/ws_login_ret_json.php';

      	$$.ajax({url:url,data:{ user_name:user_name,pwd:pwd },type:'POST',async:true,dataType:'json',success:function(json_Obj) {

    console.log('ajax success.');
		if (json_Obj.length>0) { // RETURNED RESULTS
          	if (json_Obj[0].RETURN_CODE==1) {
            		//alert('response :' + json_Obj);
					console.log('user_name is ' + json_Obj[0].user_name);
					console.log('id is ' + json_Obj[0].id);
					console.log('json_Obj length is ' + json_Obj.length);
          $$('#ajaxData').text('Hi there ' + json_Obj[0].user_name);
					//document.location.href='mysetup.html';
				}
			}
      		}, complete: function(){
      				//alert('complete function called');
              console.log('ajax complete.')
              $$("#progressBar").hide();
      	  }, // end COMPLETE
					timeout: 5000,
					error: function(json_Obj, status, err) {
						if (status == "timeout") {
								console.log("Timeout Error. " + json_Obj + status + err);
								//$( "#error_login").html("Timeout error.  Please retry.")
								//$(popDiv).html('TimeOut Error:   Please retry.');
						} else {
								// another error occured
								//$( "#error_login").html('Error occurred.  Please retry.');
								console.log("error: " + json_Obj + status + err);
						}
          }, // end error
            beforeSend: function(){
		            console.log('ajax beforeSend.');
                $$("#progressBar").show();
		        } // END before Send

    });


} // END init_login
