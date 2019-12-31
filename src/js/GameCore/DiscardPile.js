class DiscardPile {
    constructor(firstCard) {
        this.cardList = [firstCard];
    }

    AddToPile(card) {
        this.cardList.push(card);
    }

    GetLastCard() {
        return this.cardList[this.cardList.length - 1];
    }
}