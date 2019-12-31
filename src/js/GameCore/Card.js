class Card {
    constructor(cardFlipped, cardType, cardColor) {
        this.isFlipped = cardFlipped;
        this.cardColor = cardColor;
        this.cardType = cardType;
        if (cardFlipped) {
            this.texture = "card_back.png";
        } else {
            this.texture = `${cardColor}_${cardType}.png`;
        }
    }

    Flip() {
        if (this.isFlipped) {
            this.texture = `${this.cardColor}_${this.cardType}.png`;
        } else {
            this.texture = "card_back.png";
        }
        this.isFlipped = !this.isFlipped;
    }

    // lowercase cos js is shit
    toString() {
        return `${this.cardColor} ${this.cardType}` + ((this.isFlipped) ? " (flipped)" : "");
    }
}