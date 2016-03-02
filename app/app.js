(function () {

    var app = angular.module('fireBaseChat',['ngRoute','firebase','ngAudio']);
    
        app.config(function($routeProvider){
        
            $routeProvider
                .when('/',
                      {
                        controller: 'userController',
                        templateUrl: '/app/views/user.html'
                      }
                     )
                .when('/chat/:username',
                      {
                        controller:'chatController',
                        templateUrl:'/app/views/chat.html'
                      })
                .otherwise({redirectTo:'/'});
            
        });

}())