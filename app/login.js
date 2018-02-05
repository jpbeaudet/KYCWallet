$(() => {

  const crypto = require('crypto')
$("#passphrase").submit(function(event) {
	event.preventDefault();
	var mydata = $("#pass").val() 
	$("#pass_container").hide()
	if(mydata== "" || null ){
		$("#pass_container").show()
		$("#unlock").addClass("btn btn-outline-danger my-2 my-sm-0 btn-block")
		$("#unlock").css("width: 100%;height:50px;margin:2em;")
		$("#pass").attr("placeholder","Wrong passphrase... Please Try again")
	}else{
	$("#loading").attr("hidden", false) 
	console.log("click")
	$("#unlock").addClass("btn btn-outline-success my-2 my-sm-0 btn-block")
	
    const val = mydata
    const sha512 = crypto.createHash('sha512').update(val, 'utf8').digest('hex')   
   
    console.log("val: "+mydata); // it's only for test
    console.log("sha512-output: "+sha512); // it's only for test
    window.location.href = "./dashboard.html"
}
    
});
  $('#passphrase').focus() // focus input box
})

