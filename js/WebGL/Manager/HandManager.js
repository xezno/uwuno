class HandManager {
    constructor(glInstance, game, gameFrontend) {
        this.glInstance = glInstance;
        this.gl = glInstance.gl;

        this.renderList = [];
        this.game = game;
        this.gameFrontend = gameFrontend;
    }

    CalcDiscardRotation(index) {
        if (index == undefined) 
            index = this.game.discardPile.cardList.length;

        let noiseOffset = this.CalcDiscardOffset(index);
        let noiseTotal = noiseOffset[0] * noiseOffset[1];
        return ((index + noiseTotal) * 20) % 360;
    }

    CalcDiscardOffset(index) {
        if (index == undefined) 
            index = this.game.discardPile.cardList.length;
        let noiseX = Math.sin(index);
        let noiseY = Math.cos(index * 3);
        noiseX = (noiseY * 2) - (noiseX);
        noiseY = (noiseY * 2) - (noiseY);
        noiseX *= 0.1;
        noiseY *= 0.1;
        return [noiseX, noiseY, -index / 10];
    }

    UpdateCards() {
        this.renderList = [];
        var totalCardIndex = 0;
        for (var playerIndex in this.game.players)
        {
            var playerCardIndex = 0;
            for (var card of this.game.players[playerIndex].hand)
            {
                if (playerIndex == 0 && card.isFlipped) 
                    card.Flip();
                let cardRenderer = new CardRenderer(this.glInstance, card, true);
                if (playerIndex % 2 == 0) {
                    var offset = (playerIndex % 4 == 0) ? -3 : 3;
                    cardRenderer.position = vec3.fromValues(playerCardIndex - 3, offset * CARD_SCALE_MULTIPLIER[1], 0);
                } else {
                    var offset = (playerIndex % 3 == 0) ? -8 : 8;
                    cardRenderer.position = vec3.fromValues(offset, playerCardIndex * CARD_SCALE_MULTIPLIER[1] - 4, 0);
                }
                cardRenderer.rotation = (playerCardIndex - (this.game.players[playerIndex].hand.length / 2)) * -10;
                this.renderList.push(cardRenderer);
                playerCardIndex++;
                totalCardIndex++;
            }
        }
        this.renderList.push(new ArrowRenderer(this.glInstance, this.game.playerTurn - 2));

        this.UpdateDiscardPile();
    }

    UpdateDiscardPile() {
        let discardPileIndex = 0;
        for (let discardPileCard of this.game.discardPile.cardList)
        {
            if (discardPileCard.isFlipped)
                discardPileCard.Flip();
            var discardPileSceneObject = new CardRenderer(this.glInstance, discardPileCard);

            discardPileSceneObject.position = this.CalcDiscardOffset(discardPileIndex);
            discardPileSceneObject.rotation = this.CalcDiscardRotation(discardPileIndex);
            discardPileSceneObject.scale = vec3.fromValues(1.25, 1.25, 1.25);
            this.renderList.push(discardPileSceneObject);
            discardPileIndex++;
        }
    }

    MouseMoved(mousePosWorld) {
        this.mousePosWorld = mousePosWorld;
        for (let obj of this.renderList)
        {
            if (obj.MouseMoved)
                obj.MouseMoved(mousePosWorld);
        }
    }

    MouseClicked(gameFrontend) {
        for (let obj of this.renderList)
        {
            if (obj.MouseClicked)
                obj.MouseClicked(gameFrontend);
        }
    }

    Draw() {
        for (let obj of this.renderList)
            obj.Draw(this.gameFrontend);
    }

    Destroy(targetObj) {
        var renderListCopy = [...this.renderList]; // Prevent any render artifacts by copying the array temporarily
        renderListCopy.splice(this.renderList.indexOf(targetObj), 1);
        this.renderList = renderListCopy;
    }
}