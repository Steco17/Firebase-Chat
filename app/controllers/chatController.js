(function() {
    
    var chatController = function($scope,$routeParams,$firebaseArray,$window,$filter,ngAudio) {
        
        $scope.getUsername = $routeParams.username;
        
        $scope.sendplay = ngAudio.load("sounds/send.mp3");
        $scope.leftplay = ngAudio.load("sounds/left.mp3");
        $scope.joinedplay = ngAudio.load("sounds/join.mp3")
        
        
        var ref = new Firebase("https://firstappbind.firebaseio.com/messages");
        
        var statusref = new Firebase("https://firstappbind.firebaseio.com/chatstatus");

          // GET MESSAGES AS AN ARRAY
          $scope.messages = $firebaseArray(ref);
          $scope.chatstatus = $firebaseArray(statusref);
        

          //ADD MESSAGE METHOD
          $scope.addMessage = function(e) {

            //LISTEN FOR RETURN KEY
            if (e.keyCode === 13 && $scope.msg) {
              //ALLOW CUSTOM OR ANONYMOUS USER NAMES
              var name = $scope.getUsername;
            
              //FILTER DATE TO TIME & DATE FORMAT
             var displaydate = $filter('date')(new Date(),'dd-MM-yyyy hh:mm a');

              //ADD TO FIREBASE
              $scope.messages.$add({
                from: name,
                body: $scope.msg,
                date: displaydate
              });
            
            $scope.sendplay.play();
                
              //RESET MESSAGE
              $scope.msg = "";
            }
    
          };
        
        
        statusref.on('child_added', function(childSnapshot, prevChildKey) {
                var postsData = null;
                postsData = childSnapshot.val();
                logResults(postsData);
        });
        
        function logResults(postsData) {
            if (postsData.status.indexOf("joined") > -1) {
                $scope.joinedplay.play();
    
            }
            else{
                $scope.leftplay.play();
             }
        }
        
         $scope.onExit = function() {
            $scope.chatstatus.$add({
                status: $scope.getUsername + ' left'    
            });
        };
        
        $window.onbeforeunload =  $scope.onExit;
        
        var update = function (){
            $scope.chatstatus.$add({
                status: $scope.getUsername + ' joined'    
            });
        };
        
        update();
        
    };
     
    
    angular.module('fireBaseChat').controller('chatController',chatController);

}())