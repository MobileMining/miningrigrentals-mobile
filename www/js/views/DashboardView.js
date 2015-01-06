var DashboardView=function(mrr){

    var element = $('#DashboardView');
    var storage = window.localStorage; 
    var mrr = mrr;
    
    var timer = null;

    this.initialize = function(){
      element.html(''+
      '<p id="result"></p><ul id="MyRigList"></ul>');
    }
     
    var doRefresh(data){
        var result = JSON.parse(data);
        
        if (result.success){
            $('#result').html('');
            
            
        }else{
            $('#result').html(result.message);
        }
    } 
     
    var refresh = function(){
          mrr.doGetMyRigs(function(data){
                    doRefresh(data);
                    $( "#SettingsView" ).trigger( "updatelayout" );
			   $('#result').html(mrr.key+"<br>"+mrr.secret+"<br>"+data);
		    });
    } 
     
    var initialized = false;
     
     this.activate = function(){
        if (!initialized){
          this.initialize();
          initialized = true;
        }
        element.show();
        refresh();
        timer = window.setInterval(refresh, 30000);
     }
     
     this.deactivate = function(){
        element.hide();
        window.clearInterval(timer);
     }

};