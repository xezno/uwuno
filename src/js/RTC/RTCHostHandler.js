class RTCHostHandler {
    constructor() {
        // We're the host, so there are a few things we need to do:
        // 1: Let other people join the game.  This includes some sub-steps:
        //   - Set up an RTC 'host' so that we can present data to the other 3 players
        //   - Register a unique key with the matchmaking server
        //   - Wait for 3 other players to join the game.
        // 2: Start the game when ready.  This also includes some sub-steps:
        //   - Set up a Game instance so that the game's rules, decks, etc. are all set up and ready.
        //   - Go through the Game loop until a win condition is met.
        // 3: On finishing the game, present each player with the results, and then ask the host if they want to play again.

        // Step 1: Letting other people join the game
        // First we set up an RTC host!
        // We will need 6 connection for four clients (nCr where n is 4, and r is 2)
        // This number goes up exponentially when there are more clients.
        this.rtcConnection = new RTCPeerConnection();
        this.rtcChannel = this.rtcConnection.createDataChannel("data-channel");

        this.rtcConnection.addEventListener("connectionstatechange");
    }
}