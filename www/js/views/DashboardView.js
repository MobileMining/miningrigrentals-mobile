var DashboardModel=function(mrr){

    var rigs = new Object();

    var mrr = mrr;

    var fireRefresh = function(){}

    this.getRigs = function(){
      return rigs;
    }

    this.setRefreshCallback = function(callback){
        fireRefresh = callback;
    }

    this.doRefreshRigs = function(data){
         var result = JSON.parse(data);
         if (result.success){
            var elements = result.data.records;
             
            var i;
            for(i=0;i<elements.length;++i){
              
              var rig;
              if (rigs[elements[i].id]){
                rig = rigs[elements[i].id];
              }else{
                rig = new Object();
                rigs[elements[i].id] = rig;
              }
              
              for(var prop in elements[i]){
                rig[prop] = elements[i][prop];
              }
            }
            fireRefresh();
            
            for(var id in rigs){
              // If online, request details
              if (rigs[id].online == 1){
                   mrr.doGetRigDetails(id, function(data){
                       var result = JSON.parse(data);
                       if (result.success){
                           var rig = rigs[result.data.id];
                           if (rig != null){
                            for(var prop in result.data){
                               rig[prop] = result.data[prop];
                            }
                            fireRefresh();
                           }
                       }
                   });
              }
            }
         }else{
            //Keep data, TODO: report error
         }
    }

    this.refreshModel = function(){
      mrr.doGetMyRigs(this.doRefreshRigs);
    }

};

var DashboardView=function(mrr){

    this.title = "Dashboard";

    var element = $('#DashboardView');
    var model = new DashboardModel(mrr);
    var storage = window.localStorage; 
    var mrr = mrr;
    
    var timer = null;

    this.initialize = function(){
      element.html(''+
      '<p id="result"></p><ul data-role="listview" data-inset="true" id="DashboardData" data-divider-theme="a"></ul>');
    }
     
    var doRefresh = function(){
        
        var elements = model.getRigs();
        
            var d = '<li data-role="list-divider"><h1>My Rigs</h1><span class="ui-li-count">'+Object.keys(elements).length+'</span></li>';

            for(var index in elements){
              if (!storage.hideOffline || (elements[index].online == 1)){
            
              d += "<li><h2>"+elements[index].id+" - "+elements[index].name+"</h2><p>";
              
              if (elements[index].online == 1){
                d += "ONLINE ";
                if (elements[index].hashrate){
                  d += formatHashRate(elements[index].hashrate['5min'])+" ("+formatHashRate(elements[index].hashrate['advertised'])+")";
                }
              }else{
                d += "OFFLINE ";
              }
              
              d += "<br>";
              d += elements[index].type+" ";
              d += elements[index].status;
              if (elements[index].available_in_hours){
                d += " for "+elements[index].available_in_hours+" hours";
              }
              
              d += "</p>";
              
              d+="</li>";
              }
            }
            $('#DashboardData').html(d);
    }
    
    model.setRefreshCallback(doRefresh);
    
    var formatHashRate = function(hash){
        var rate = hash;
        var i = 0;
        var prefixes=["h/s", "kh/s", "Mh/s", "Gh/s", "Th/s"];
        while(rate > 1000 && i<prefixes.length-1){
          rate = rate/1000;
          i++;
        }
        return (Math.round(rate * 100) / 100)+prefixes[i];
    }
     
    var refresh = function(){
       model.refreshModel();   
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