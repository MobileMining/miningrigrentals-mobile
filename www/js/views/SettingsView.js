var SettingsView=function(mrr){

     this.title = "Settings";

     var element = $('#SettingsView');
     var storage = window.localStorage; 
     var mrr = mrr;
     var initialized = false;
     
     this.initialize = function(){
        element.html(
          '<input id="SettingsView-key" type="text" placeholder="API key"/>'+
          '<input id="SettingsView-secret" type="text" placeholder="API secret"/>'+
          '<label><input type="checkbox" name="SettingsView-hideOffline" id="SettingsView-hideOffline">Hide Offline and Disabled rigs</label>'
        );
        $('#SettingsView-key').on('keyup', function(){
          storage.mrrkey = $('#SettingsView-key').val();
          mrr.key = storage.mrrkey;
        });
        $('#SettingsView-secret').on('keyup', function(){
          storage.mrrsecret = $('#SettingsView-secret').val();
          mrr.secret = storage.mrrsecret;
	       });                
        $('#SettingsView-hideOffline').click(function(){
          storage.hideOffline = $('#SettingsView-hideOffline').prop('checked');
        });
         
        $('#SettingsView-secret').val(storage.mrrsecret);
        $('#SettingsView-key').val(storage.mrrkey);
        $( "#SettingsView" ).trigger( "updatelayout" );
        
        $('#SettingsView-hideOffline').prop('checked', storage.hideOffline); 
     }
     
     this.activate = function(){
        if (!initialized){
          this.initialize();
          initialized = true;
        }
        element.show();
     }
     
     this.deactivate = function(){
        element.hide();
     }

};