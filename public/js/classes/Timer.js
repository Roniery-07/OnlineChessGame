class Timer{
    constructor(duration, displayElement, turn) {
        this.duration = duration;
        this.displayElement = displayElement;
        this.timer = duration;
        this.intervalID = null;
        this.turn = turn
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes < 10 ? '0' + minutes : minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
    }

    start(whoTurn) {
        if(whoTurn === this.turn){

        
            this.updateDisplay();
            this.intervalID = setInterval(() => {
                this.timer--;
                this.updateDisplay();
                if (this.timer < 0) {
                    this.stop();
                    this.displayElement.textContent = "Tempo esgotado!";
                }
            }, 1000);
        }
        else{
            this.stop()
        }
    }

    updateDisplay() {
        this.displayElement.textContent = this.formatTime(this.timer);
    }

    stop() {
        clearInterval(this.intervalID);
    }

    reset() {
        this.stop();
        this.timer = this.duration;
        this.updateDisplay();
    }
}