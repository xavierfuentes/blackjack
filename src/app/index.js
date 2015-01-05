/**
 *
 */
(function(){

    'use strict';

    angular.module('blackjack', [
        // Third parties
        // 'ngAnimate',
        'ui.router',
        'ui.bootstrap',

        // States
        'blackjack.home',

        // Components
        'blackjack.config'
    ]);

    /**
     * App configuration
     * @ngInject
     */
    function AppConfig($urlRouterProvider){
        $urlRouterProvider.otherwise('/');
    }

    angular.module('blackjack')
        .config(AppConfig)
    ;

})();
