var MiningRigRentals = function(){
	
	this.doAPICall = function(endpoint, queryparams, callback){
		var params = $.extend(true, {}, queryparams);

		params.nonce = new Date().getTime();
	       
		// generate the POST data string
		var post_data = $.param(params);

		var hash = CryptoJS.HmacSHA1(post_data, this.secret);
		var sign = hash.toString(CryptoJS.enc.Base64);

		$.ajaxSetup({
  			beforeSend: function(request) {
    				request.setRequestHeader("User-Agent",'Mozilla/4.0 (compatible; MiningRigRentals %VERSION%)');
				request.setRequestHeader("x-api-sign", sign);
				request.setRequestHeader("x-api-key", this.key);
  			}
		});

		$.ajax({
    			type: 'POST',
    			url: 'https://www.miningrigrentals.com/api/v1/'+endpoint,
    			data: post_data
		}).done(callback);
	
	}

	this.doGetMyRigs = function(callback){
		return this.doAPICall("account", {method:"myrigs"},callback);
	}

	this.isAnonymous = function(){
		return this.key == null;
	};	
	
};
