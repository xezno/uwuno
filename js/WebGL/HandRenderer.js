class HandRenderer {
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
                this.renderList.push(new SceneObject(this.glInstance, card));
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
        let discardPileIndex = 0;
        for (let discardPileCard of this.game.discardPile.cardList)
        {
            var discardPileSceneObject = new SceneObject(this.glInstance, discardPileCard);

            discardPileSceneObject.position = this.CalcDiscardOffset(discardPileIndex);
            discardPileSceneObject.rotation = this.CalcDiscardRotation(discardPileIndex);
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
                obj.MouseClicked(gameFrontend.game, this);
        }
    }

    Draw() {
        for (let obj of this.renderList)
            obj.Draw(this.gameFrontend);
    }
}