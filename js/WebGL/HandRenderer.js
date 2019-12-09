class HandRenderer {
    constructor(glInstance, game, gameFrontend) {
        this.glInstance = glInstance;
        this.gl = glInstance.gl;

        this.renderList = [];
        this.game = game;
        this.gameFrontend = gameFrontend;
    }

    UpdateCards() {
        this.renderList = [];
        var totalCardIndex = 0;
        for (var playerIndex in this.game.players)
        {
            var playerCardIndex = 0;
            for (var card of this.game.players[playerIndex].hand)
            {
                this.renderList.push(new CardRenderer(this.glInstance, card));
                if (playerIndex % 2 == 0) {
                    var offset = (playerIndex % 4 == 0) ? -3 : 3;
                    this.renderList[totalCardIndex].position = vec3.fromValues(playerCardIndex - 3, offset * this.renderList[totalCardIndex].scale[1], 0);
                } else {
                    var offset = (playerIndex % 3 == 0) ? -8 : 8;
                    console.log(offset);
                    this.renderList[totalCardIndex].position = vec3.fromValues(offset, playerCardIndex * this.renderList[totalCardIndex].scale[1] - 4, 0);
                }
                playerCardIndex++;
                totalCardIndex++;
            }
        }
        this.renderList.push(new ArrowRenderer(this.glInstance, this.game.playerTurn - 2));
    }

    UpdateDiscardPile() {
        var discardPileIndex = 0;
        for (var discardPileCard of this.game.discardPile.cardList)
        {
            var discardPileCardRenderer = new CardRenderer(this.glInstance, discardPileCard);
            var noiseX = Math.sin(discardPileIndex);
            var noiseY = Math.cos(discardPileIndex * 3);
            noiseX = (noiseY * 2) - (noiseX);
            noiseY = (noiseY * 2) - (noiseY);
            noiseX *= 0.1;
            noiseY *= 0.1;

            var noiseTotal = noiseX * noiseY;
            discardPileCardRenderer.position = vec3.fromValues(noiseX, noiseY, 0);
            discardPileCardRenderer.rotation = (discardPileIndex + noiseTotal) * 20;
            this.renderList.push(discardPileCardRenderer);
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
                obj.MouseClicked(gameFrontend, this);
        }
    }

    Draw() {
        for (let obj of this.renderList)
            obj.Draw(this.gameFrontend);
    }
}