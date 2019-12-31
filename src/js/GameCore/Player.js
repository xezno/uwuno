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
        if (index < this.hand.length && index > -1)
        {
            return this.hand.splice(index, 1)[0];
        }
        console.error(`${index} is not a valid index for hand with length ${this.hand.length}`);
        console.dir(this.hand);
    }
}