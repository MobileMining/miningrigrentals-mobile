// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
	var mrr = new MiningRigRentals();
	var storage = window.localStorage; 

  FastClick.attach(document.body);

	mrr.key = storage.mrrkey;
	mrr.secret = storage.mrrsecret;

  var dashboard = new DashboardView(mrr);
  var settings = new SettingsView(mrr);
  
  var activeView = dashboard;
  
  settings.deactivate();
  dashboard.activate();

  var doSelectView = function(view){
      event.preventDefault();
        activeView.deactivate();
		    view.activate();
        activeView = view;
        $( "#mypanel" ).panel( "close" );
  }

  $('#panel-dashboard').click(function(event){
		     doSelectView(dashboard);
	});
  $('#panel-settings').click(function(event){
		    doSelectView(settings);
	});


}());
