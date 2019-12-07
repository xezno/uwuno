class Player {
    constructor(name) {
        this.hand = [];
        this.name = name;
    }

    AddToHand(card) {
        this.hand.push(card);
    }

    DrawFromHand() {
        return this.hand.pop();
    }

    PlayCard(index)
    {
        if (index < this.hand.length && index > 0)
        {
            return this.hand.splice(index, 1)[0];
        }
    }
}