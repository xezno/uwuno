class Deck {
    constructor() {
        this.cardList = [];
        let cardTypes = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "picker", "reverse", "skip" ];
        let cardColors = [ "blue", "green", "yellow", "red" ];
        // alright buckle up
        // for some reason unos decks have duplicate cards
        // there should be 108 cards in a standard uno deck:
        // 4x 0 cards (one of each color)
        // 8x 1 to 9 cards (two of each color)
        //      (so 72x)
        // 8x EACH of the 'action' cards (two of each color)
        //      (so 24x)
        // 4x EACH of the two wIlD 'action' cards
        //      (so 8x)
        for (let cardColor of cardColors)
        {
            for (let cardType of cardTypes)
            {
                let cardCount = 1; // how many cards of each color??
                if (cardType != "0")
                    cardCount = 2;
                for (var i = 0; i < cardCount; ++i)
                    this.cardList.push(new Card(false, cardType, cardColor));
            }
        }

        // ok so we handled all of the non-wild cards, lets handle the wild ones
        let wildTypes = ["color_changer", "pick_four"]
        for (let cardType in wildTypes)
        {
            for (var i = 0; i < 2; ++i)
                this.cardList.push(new Card(false, cardType, "wild"));
        }
        this.cardList.sort((a, b) => { return Math.floor((Math.random() * 2) - 1); });
        console.log(`There are ${this.cardList.length} cards in the deck`);
    }

    DrawCard() {
        return this.cardList.pop();
    }
}