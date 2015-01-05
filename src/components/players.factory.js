(function(){

    'use strict';

    angular.module('blackjack.players', [
        'blackjack.hands'
    ]);

    /**
    * Player factory
    * @ngInject
    */
    function PlayersFactory( $rootScope, Hand, GAME_EVENTS ){

        var Player = function( index ) {
            this.hands = [];
            this.hands.push( new Hand() );
            this.id = index;
            this.name = ( index !== 0 ) ? 'Player ' + index : 'Dealer';
            this.status = 'playing';
        };

        // instance methods
        Player.prototype = {

            getCard: function ( hand ) {
                this.hands[hand].getCard();
            },

            stand: function ( hand ) {
                this.hands[hand].active = false;
                this.status = 'stand';
                $rootScope.$broadcast(GAME_EVENTS.playerStand);
            }
        };

        return Player;
    }

    angular.module('blackjack.players')
        .factory('Player', PlayersFactory)
    ;

})();
