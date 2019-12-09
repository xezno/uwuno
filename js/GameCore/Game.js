class Game {
    constructor() {
        this.deck = new Deck(); 
        this.players = [];
        this.playerTurn = 0;
        this.playerOrderReversed = false;
        this.gameRunning = true;
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

        console.dir(this.players);
    }

    get discardPileTop() {
        return this.discardPile.GetLastCard();
    }

    // Run through one 'turn' (current player)
    Run() {
        // Get the current player's move (random valid card)
        let currentPlayer = this.GetCurrentPlayerMove();
        console.log(`== ${currentPlayer.name}'s turn: ${currentPlayer.hand.length} cards in hand ==`);
        
        // Check if we can play any of the cards in currentPlayer's deck
        // (if we can: play it)
        let cardChosen = -1; // Set as -1 so that we know whether the player had a valid card or not
        if (!this.discardPileTop) 
        {
            console.error("how");
            console.dir(this.discardPile);
        }
        console.log(`Discard pile top: ${this.discardPileTop.toString()}`);
        console.log(`Player hand: ${currentPlayer.hand}`);
        for (let i in currentPlayer.hand)
        {
            let card = currentPlayer.hand[i];
            // We can play a card if:
            // a: the cards on the top of discard pile and the card in the player's hand
            //    share a common property (type or color); or
            // b: either of the cards are 'wild' (for now).
            console.log(`${card.cardType} vs ${this.discardPileTop.cardType}`);
            if (this.CanPlayCard(card))
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

        this.CheckForWinCondition();

        this.AdvancePlayerTurn();
    }

    CanPlayCard(card) {
        return (this.discardPileTop.cardType == card.cardType ||
            this.discardPileTop.cardColor == card.cardColor || 
            card.cardColor == "wild" ||
            this.discardPileTop.cardColor == "wild")
    }

    CheckForWinCondition() {
        for (let player of this.players) {
            if (player.hand.length < 1) {
                // Player has won the game.
                alert("Win condition reached!");
            }
        }
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
        {
            this.playerTurn = this.players.length - 1;
        }
        else if (this.playerTurn >= this.players.length) 
        {
            this.playerTurn = 0;
        }
    }
}