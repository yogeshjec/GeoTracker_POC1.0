angular.module('app.controllers', [])
  
.controller('homeCtrl', function($scope) {
    
    // Go=eo part start
 var x = document.getElementById("geoLocationx");
    var y = document.getElementById("geoLocationy");
    
    
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
   x.innerHTML =  position.coords.latitude;
   y.innerHTML = position.coords.longitude;
}
    getLocation();
    /// Geo part end

})
   
.controller('localizerCtrl', function($scope) {
    
   
document.addEventListener("deviceready", function(){
            navigator.geolocation.getCurrentPosition(function(position){
                
            var mapProp = {center:new google.maps.LatLng(position.coords.latitude,position.coords.longitude), zoom:10, mapTypeId:google.maps.MapTypeId.ROADMAP};
            var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
            var marker=new google.maps.Marker({position:new google.maps.LatLng(position.coords.latitude,position.coords.longitude)});
            marker.setMap(map);
            }, function(error){
                if(error.code == PositionError.PERMISSION_DENIED)
                {
                    alert("App doesn't have permission to use GPS");
                }
                else if(error.code == PositionError.POSITION_UNAVAILABLE)
                {
                    alert("No GPS device found");
                }
                else if(error.code == PositionError.TIMEOUT)
                {
                    alert("Its taking too long find user location");
                }
                else
                {
                    alert("An unknown error occured");
                }
            }, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
        }, false);
    
    
    
    
    // user detail
    // alert("local");
    function getLocalStorage() {
			
			var db ;
			
			try {
				if(window.localStorage ) 
					{	
						db = window.localStorage;            
					}
				}
				catch (e)
					{ return undefined; }
			
			
			var d1 = document.getElementById("d1");
        var c1 = document.getElementById("c1");
			var pairs;            
			var i=0;
       			    
				    key = db.key(0);          
					//alert(key);
				    d1.innerHTML =  key ;                    
                    c1.innerHTML =  db.getItem(key);
        
		}
    
     getLocalStorage();
    
    
})
   
.controller('trackMeCtrl', function($scope) {
    
    
    document.addEventListener("deviceready", function(){
            navigator.geolocation.getCurrentPosition(function(position){
                
            var mapProp = {center:new google.maps.LatLng(position.coords.latitude,position.coords.longitude), zoom:16, mapTypeId:google.maps.MapTypeId.ROADMAP};
            var map=new google.maps.Map(document.getElementById("googleMaptrackme"), mapProp);
            var marker=new google.maps.Marker({position:new google.maps.LatLng(position.coords.latitude,position.coords.longitude)});
            marker.setMap(map);
            }, function(error){
                if(error.code == PositionError.PERMISSION_DENIED)
                {
                    alert("App doesn't have permission to use GPS");
                }
                else if(error.code == PositionError.POSITION_UNAVAILABLE)
                {
                    alert("No GPS device found");
                }
                else if(error.code == PositionError.TIMEOUT)
                {
                    alert("Its taking too long find user location");
                }
                else
                {
                    alert("An unknown error occured");
                }
            }, { maximumAge: 2000, timeout: 5000, enableHighAccuracy: true });
        }, false);
    
    
    
    
    //--------------------
     var watchProcess = null;
        document.addEventListener("deviceready", function initiate_watchlocation() {
          if (watchProcess == null) {
              watchProcess = navigator.geolocation.watchPosition(handle_geolocation_query, handle_errors);
          }
        });
                                  
        function stop_watchlocation() {
          if (watchProcess != null)
          {
              navigator.geolocation.clearWatch(watchProcess);
              watchProcess = null;
          }
        }
        function handle_errors(error)
        {
            switch(error.code)
            {
                case error.PERMISSION_DENIED: alert("user did not share geolocation data");
                break;
                case error.POSITION_UNAVAILABLE: alert("could not detect current position");
                break;
                case error.TIMEOUT: alert("retrieving position timedout");
                break;
                default: alert("unknown error");
                break;
            }
        }
       
        function handle_geolocation_query(position) {          
           var mapProp = {center:new google.maps.LatLng(position.coords.latitude,position.coords.longitude), zoom:16, mapTypeId:google.maps.MapTypeId.ROADMAP};
            var map=new google.maps.Map(document.getElementById("googleMaptrackme"), mapProp);
            var marker=new google.maps.Marker({position:new google.maps.LatLng(position.coords.latitude,position.coords.longitude)});
            marker.setMap(map);
        }
    
    
    
    
    
    
})
      
.controller('historyCtrl', function($scope) {
$scope.data= { names:[]};
    
    $scope.data.names.push ({f: "Mahesh", c: "Parashar"});
    
    
     function getLocalStoragehistory() {
			
			var db ;
			
			try {
				if(window.localStorage ) 
					{	
						db = window.localStorage;            
					}
				}
				catch (e)
					{ return undefined; }
			var i=0;
         	    for (i=0; i<=db.length-1; i++) {     
					$scope.data.names.push ({f: db.key(i), c: db.getItem(db.key(i))});
				}
		}
     getLocalStoragehistory();
})
 