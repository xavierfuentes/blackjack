(function(){

    'use strict';

    angular.module('blackjack.decks', [
        'blackjack.cards'
    ]);

    /**
    * Deck factory
    * @ngInject
    */
    function DeckFactory( $rootScope, Card, GAME_EVENTS ){
        var service = {};

        var _deck = [];

        var _new = function () {
            _deck = [];

            for ( var j = 1; j <= 4; j++ ) {
                for ( var i = 1; i <= 13; i++ ) {
                    _deck.push( new Card(j,i) );
                }
            }

            return _shuffle(_deck);
        };

        var _shuffle = function ( deck ) {
            var i, j, tmp;

            for ( i = deck.length - 1 ; i ; i-- ) {
                j = Math.floor(Math.random() * (i + 1));
                tmp = deck[j];
                deck[j] = deck[i];
                deck[i] = tmp;
            }

            return deck;
        };

        var _dealCard = function () {
            if ( _deck.length === 0 ) {
                $rootScope.$broadcast(GAME_EVENTS.noCardsLeft);
                return false;
            }

            return _deck.pop();
        };

        service.new = _new;
        service.dealCard = _dealCard;

        return service;
    }

    angular.module('blackjack.decks')
        .factory('Deck', DeckFactory)
    ;

})();
