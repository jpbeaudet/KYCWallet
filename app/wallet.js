$(() => {
const Store = require('../store.js');
const store = new Store({
  // We'll call our data file 'accounts'
  configName: 'tx',
  defaults: {
    accounts:  [{txid: "xxxxxxxxxxxxxxxxxxxxxxxx" , date: "yy/mm/dd" , balance: 0.0444},{txid: "yyyyyyyyyyyyyyyyyyyyyyyyyy" , date: "yy/mm/dd" , balance: 0.0444}]
  }
});
var accounts = store.get("accounts")
for (var i = 0; i < accounts.length; i++) {
  var txid = store.get("accounts")[i].txid
var date = store.get("accounts")[i].date
var balance = store.get("accounts")[i].balance
$('#txs').append('<tr><td> '+date+' </td><td> '+txid+' </td><td> '+balance+' <small> ETH</small></td></tr>')
}
 $('body').focus() // focus input box
 $('.tx').click(function(){
	 var address = this.attr('id')
	 window.location.href = "./wallet.html"
})
})


