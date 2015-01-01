var MiningRigRentals = function(){
	
	this.doAPICall = function(endpoint, queryparams, callback){
		var params = $.extend(true, {}, queryparams);

		params.nonce = new Date().getTime();

		// generate the POST data string
		var post_data = $.param(params);
		var key = this.key;

log("post_data: "+post_data);
log("key: "+key);

		var hash = CryptoJS.HmacSHA1(post_data, this.secret);
		var sign = hash.toString(CryptoJS.enc.Hex);

		$.ajax({
    			type: 'POST',
			headers: {
				"x-api-sign" : sign,
				"x-api-sign" : key,
			},
			beforeSend: function(request) {
    				request.setRequestHeader("User-Agent",'Mozilla/4.0 (compatible; MiningRigRentals %VERSION%)');
				request.setRequestHeader("x-api-sign", sign);
				request.setRequestHeader("x-api-key", key);
log("sign: "+sign);
log("key: "+key);
  			},
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
