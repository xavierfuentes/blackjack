/**
 * Todo:
 * - increase dealer's "intelligence" with odds
 * - include betting
 * - be able to add more players
 * - splits and resplits (multi hand)
 * - refactor players, dealer and cards into directives for custom business logic and clean the Controller
 * - graphic improvement
 * - testing
 */
(function(){

    'use strict';

    angular.module('blackjack.home', [
        'ui.router',

        'blackjack.players'
    ]);

    /**
    * Home config
    * @ngInject
    */
    function HomeConfig($stateProvider){
        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'app/home/home.html',
            controller: 'HomeController as vm'
        });
    }

    /**
    * Home controller
    * @ngInject
    */
    function HomeController( $scope, $rootScope, Player, Deck, GAME_EVENTS, GAME_DEFAULTS ){
        var vm = this;
        var _players = [];

        // $scope variables
        vm.players = _players;
        vm.status = '';

        var _newGame = function () {
            vm.players = _players = [];
            vm.status = '';

            // creates the deck
            Deck.new();

            // creates the dealer
            var dealer = new Player(0);
            // hides the first card from the dealer
            dealer.hands[0].cards[0].visible = false;
            _players.push( dealer );

            // creates the players
            for ( var i = 1; i <= GAME_DEFAULTS.players; i++ ) {
                _players.push(new Player(i));
            }
        };

        var _hit = function ( player, hand ) {
            player.getCard(hand);
        };

        var _stand = function ( player, hand ) {
            player.stand(hand);
        };

        // $scope methods
        vm.newGame = _newGame;
        vm.hit = _hit;
        vm.stand = _stand;

        // Events
        $scope.$on( GAME_EVENTS.noCardsLeft, function () {
            vm.players = _players = [];

            // new deck
            Deck.new();
        });

        // Dealer "business logic"
        angular.forEach([
            GAME_EVENTS.handBusted,
            GAME_EVENTS.handWon,
            GAME_EVENTS.playerStand
        ], function(value) {
            $scope.$on(value, function(event) {
                // we only use one hand
                var hand = 0;
                var dealer = _players[0];
                var dealerScore = dealer.hands[hand].score;

                // the dealer should hit until reach his max
                while ( dealerScore < GAME_DEFAULTS.dealerMax ) {
                    dealer.getCard(hand);
                    dealerScore = dealer.hands[hand].score;
                }

                // we check who won the game
                var player = _players[1];
                var playerScore = player.hands[hand].score;

                var result = playerScore - dealerScore;

                if ( result !== 0 && playerScore <= 21 && dealerScore !== 21 ) { vm.status = 'You won!'; }
                else if ( result !== 0 && dealerScore <= 21 && playerScore !== 21 ) { vm.status = 'You lost!'; }
                else { vm.status = 'Tied!'; }
            });
        });
    }

    angular.module('blackjack.home')
        .config(HomeConfig)
        .controller('HomeController', HomeController)
    ;

})();
