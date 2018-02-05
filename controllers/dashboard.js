$(() => {
const Store = require('../store.js');
const store = new Store({
  // We'll call our data file 'accounts'
  configName: 'wallets',
  defaults: {
    accounts:  [{address: "fffffffffffffffffffffffffffffffffff" , balance: 0.0444}]
  }
});
var accounts = store.get("accounts")
for (var i = 0; i < accounts.length; i++) {
  var address = JSON.stringify(store.get("accounts")[i].address)
var balance = JSON.stringify(store.get("accounts")[i].balance)
$('#wallets').append('<tr><td> <a class="wallet" id="'+address+'">'+address+'</a> </td><td> '+balance+' <small> ETH</small></td></tr>')
}
 $('body').focus() // focus input box
  $('#addnew').click(function(){
	  window.location.href = "./newaccount.html"
  })
 $('.wallet').click(function(){
	 var address = $(this).attr('id')
	 window.location.href = "./wallet.html"
})
})



