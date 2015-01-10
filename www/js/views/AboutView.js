var AboutView=function(){

     this.title = "About";

     var element = $('#AboutView');
     var initialized = false;
     
     this.initialize = function(){
        element.html(
          '<p>'+
          'Unnoficial mobile application for MiningRigRentals.com. This software is Free and Open source, released under The GNU General Public License version 3.'+
          '<br>'+
          '<a href="https://github.com/balazsgrill/miningrigrentals-mobile" onClick="javascript:return openExternal(this)">Project on GitHub</a>'+ 
          '</p>'
        );
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