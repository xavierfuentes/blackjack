(function(){

    'use strict';

    angular.module('blackjack.hands', [
        'blackjack.decks'
    ]);

    /**
    * Hands factory
    * @ngInject
    */
    function HandsFactory( $rootScope, Deck, GAME_EVENTS ){

        var Hand = function () {
            this.cards = [];
            this.score = 0;
            this.active = true;

            // deal two cards at the beginning
            for ( var i = 0; i < 2; i++ ) { this.getCard(); }
        };

        // instance methods
        Hand.prototype = {

            getCard: function () {
                var card = Deck.dealCard();

                this.cards.push( card );
                this.score += card.score;

                if ( this.score > 21 ) {
                    this.active = false;
                    $rootScope.$broadcast(GAME_EVENTS.handBusted);
                }

                if ( this.score === 21 ) {
                    this.active = false;
                    $rootScope.$broadcast(GAME_EVENTS.handWon);
                }
            }
        };

        return Hand;
    }

    angular.module('blackjack.hands')
        .factory('Hand', HandsFactory)
    ;

})();
