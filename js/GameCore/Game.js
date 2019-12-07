class Game {
    constructor() {
        this.deck = new Deck();
        this.players = [];
        this.playerTurn = 0;
        this.playerOrderReversed = false;
        for (let i = 0; i < 4; ++i)
        {
            let tempPlayer = new Player(`xezno ${i}`);
            for (let o = 0; o < 7; ++o)
            {
                tempPlayer.AddToHand(this.deck.DrawCard());
            }
            this.players.push(tempPlayer);
        }

        this.discardPile = new DiscardPile(this.deck.DrawCard());

        console.log(this.players);
    }

    // Run through one 'turn' (current player)
    Run() {
        // Get the current player's move (random valid card)
        let currentPlayer = this.GetCurrentPlayerMove();
        console.log(`== ${currentPlayer.name}'s turn: ${currentPlayer.hand.length} cards in hand ==`);
        
        // Check if we can play any of the cards in currentPlayer's deck
        // (if we can: play it)
        let cardChosen = -1;
        let discardPileTop = this.discardPile.GetLastCard();
        console.log(`Discard pile top: ${discardPileTop.toString()}`);
        console.log(`Player hand: ${currentPlayer.hand}`);
        for (let i in currentPlayer.hand)
        {
            let card = currentPlayer.hand[i];
            // We can play a card if:
            // a: the cards on the top of discard pile and the card in the player's hand
            //    share a common property (type or color); or
            // b: the card is 'wild'.
            if (
                discardPileTop.cardType == card.cardType ||
                discardPileTop.cardColor == card.cardColor || 
                card.cardType == "wild")
            {
                // The card is valid! Play it
                console.log(`Playing card ${card.toString()} (${i})`);
                cardChosen = i;
                break;
            }
        }

        if (cardChosen >= 0)
        {
            console.log("A suitable card was found! Next turn is ready");
            this.discardPile.AddToPile(currentPlayer.PlayCard(cardChosen));
        }
        else
        {
            console.log(`Player ${currentPlayer.name} had no valid cards to play; drawing from deck`);
            currentPlayer.AddToHand(this.deck.DrawCard());
        }
        // Check for win condition
        this.AdvancePlayerTurn();
    }

    GetCurrentPlayerMove() {
        return this.players[this.playerTurn];
    }

    AdvancePlayerTurn() {
        if (this.playerOrderReversed) 
            this.playerTurn--; 
        else 
            this.playerTurn++;

        if (this.playerTurn < 0) 
            this.playerTurn = this.players.length - 1;
        else if (this.playerTurn >= this.players.length) 
            this.playerTurn = 0;
    }
}