(function(){

    'use strict';

    angular.module('blackjack.cards', [

    ]);

    /**
    * Cards factory
    * @ngInject
    */
    function CardsFactory(){
        var _suits = ['♥', '♣', '♦', '♠'];

        var Card = function ( suit, number ) {
            this.id = number + '_' + suit;
            this.number = _getNumber(number);
            this.suit = _getSuit(suit);
            this.score = _getScore(number);
            this.visible = true;
        };

        var _getNumber = function ( card ) {
            switch(card) {
                case 11 :
                    return 'J';
                case 12 :
                    return 'Q';
                case 13 :
                    return 'K';
                case 1 :
                    return 'A';
                default :
                    return card;
            }
        };

        var _getSuit = function ( card ) {
            return _suits[card-1];
        };

        var _getScore = function ( number ) {
            return (number > 10) ? 10 : (number === 1) ? 11 : number;
        };

        return Card;
    }

    angular.module('blackjack.cards')
        .factory('Card', CardsFactory)
    ;

})();
