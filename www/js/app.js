// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
	var mrr = new MiningRigRentals();
	var storage = window.localStorage; 

	debuginit(storage);

	$('.key').val(storage.mrrkey);
	$('.secret').val(storage.mrrsecret);
	mrr.key = storage.mrrkey;
	mrr.secret = storage.mrrsecret;

    /* --------------------------------- Event Registration -------------------------------- */
    $('.key').on('keyup', function(){
		storage.mrrkey = $('.key').val();
		mrr.key = storage.mrrkey;
	});
    $('.secret').on('keyup', function(){
		storage.mrrsecret = $('.secret').val();
		mrr.secret = storage.mrrsecret;
	});


	$('#myrigs').click(function(event){
		event.preventDefault();
		mrr.doGetMyRigs(function(data){
			$('#result').html(mrr.key+"<br>"+mrr.secret+"<br>"+data);
		});
	});
}());
