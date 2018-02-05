$(document).ready(function() {
console.log("jquery running...")
$("form#passphrase").submit(function() {
    var mydata = $("form#passphrase").serialize();
    console.log(mydata); // it's only for test
});
});
