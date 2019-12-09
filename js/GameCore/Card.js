class Card {
    constructor(cardFlipped, cardType, cardColor) {
        this.cardFlipped = cardFlipped;
        this.cardColor = cardColor;
        this.cardType = cardType;
        if (cardFlipped) {
            this.texture = "card_back.png";
        } else {
            this.texture = `${cardColor}_${cardType}.png`;
        }
    }

    Flip() {
        if (this.cardFlipped) {
            this.texture = `${this.cardColor}_${this.cardType}.png`;
        } else {
            this.texture = "card_back.png";
        }
        this.cardFlipped = !this.cardFlipped;
    }

    // lowercase cos js is shit
    toString() {
        return (this.cardFlipped) ? "Unknown (flipped)" : `${this.cardColor} ${this.cardType}`;
    }
}