class Card {
    constructor(cardFlipped, cardType, cardColor) {
        this.cardFlipped = cardFlipped;
        if (cardFlipped) return this.texture = "card_back.png";
        this.cardColor = cardColor;
        this.cardType = cardType;
        this.texture = `${cardColor}_${cardType}.png`;
    }

    // lowercase cos js is shit
    toString() {
        return (this.cardFlipped) ? "Unknown (flipped)" : `${this.cardColor} ${this.cardType}`;
    }
}