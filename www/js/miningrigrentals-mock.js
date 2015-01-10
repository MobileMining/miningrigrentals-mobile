var MiningRigRentals = function(){
	
	this.doAPICall = function(endpoint, queryparams, callback){
		var params = $.extend(true, {}, queryparams);

		params.nonce = new Date().getTime();

		// generate the POST data string
		var post_data = $.param(params);
		var key = this.key;

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
  			},
    			url: 'https://www.miningrigrentals.com/api/v1/'+endpoint,
    			data: post_data,
          error: function (xhr, ajaxOptions, thrownError) {
        }
		}).done(callback);
	
	}

	this.doGetMyRigs = function(callback){
    callback('{"success":true,"version":"1","data":{"records":[{"id":"13332","name":"ScryptBuster II (Min. difficulty: 128)","type":"scrypt","online":"1","price":"0.00026","price_hr":"0.00135417","minhrs":"3","maxhrs":"480","rating":"2.36","status":"available","hashrate_nice":"125.00M","hashrate":"125000000"}]}}');
		//return this.doAPICall("account", {method:"myrigs"},callback);
	}
  
  this.doGetRigDetails = function(id, callback){
    callback('{"success":true,"version":"1","data":{"id":"15287","name":"Modified AntMiner S1","owner":"balazsgrill","region":"eu","type":"sha256","hashrate":{"advertised":"140000000000","5min":186916976721.92,"30min":147958972132.82,"60min":140171657810.04},"price":"0.000000013","hours":{"min":"3","max":"480"},"status":"available"}}');
    //return this.doAPICall("rigs", {method:"detail", id:id}, callback);
  }

	this.isAnonymous = function(){
		return this.key == null;
	};	
	
};
