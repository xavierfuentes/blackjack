(function(){

    'use strict';

    angular.module('blackjack.config', [])
        .constant( 'GAME_DEFAULTS', {
            players: 1,
            dealerMax: 17
        })
        .constant( 'GAME_EVENTS', {
            noCardsLeft: 'no-cards-left',
            handBusted: 'hand-busted',
            handWon: 'hand-won',
            playerStand: 'player-stand',
            playerWins: 'player-wins',
            playerLoses: 'player-loses',
            playerTies: 'player-ties'
        })
    ;

})();
