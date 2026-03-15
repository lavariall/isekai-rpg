/**
 * Manages the global game state, scoring, and persistence.
 */
export class GameStateManager {
    /** Instance of the GameStateManager */
    private static instance: GameStateManager;
    
    private currentScore: number = 0;
    private highScore: number = 0;
    private startTime: number = 0;

    private constructor() {
        this.highScore = parseInt(localStorage.getItem('slimeHunter_highScore') || '0', 10);
    }

    /**
     * Returns the singleton instance of GameStateManager.
     * @returns The GameStateManager instance.
     */
    public static getInstance(): GameStateManager {
        if (!GameStateManager.instance) {
            GameStateManager.instance = new GameStateManager();
        }
        return GameStateManager.instance;
    }

    /**
     * Initializes a new game session.
     */
    public startSession(): void {
        this.currentScore = 0;
        this.startTime = Date.now();
    }

    /**
     * Increments the current score and updates high score if necessary.
     */
    public incrementScore(): void {
        this.currentScore++;
        if (this.currentScore > this.highScore) {
            this.highScore = this.currentScore;
            localStorage.setItem('slimeHunter_highScore', this.highScore.toString());
        }
    }

    /**
     * Returns the current session score.
     * @returns The current score.
     */
    public getScore(): number {
        return this.currentScore;
    }

    /**
     * Returns the persistent high score.
     * @returns The high score.
     */
    public getHighScore(): number {
        return this.highScore;
    }

    /**
     * Returns the elapsed time in seconds since the session started.
     * @returns The elapsed time in seconds.
     */
    public getElapsedTime(): number {
        return Math.floor((Date.now() - this.startTime) / 1000);
    }
}
