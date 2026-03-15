/**
 * Manages the global game state, scoring, and persistence.
 */
export class GameStateManager {
    private static instance: GameStateManager;
    
    private currentScore: number = 0;
    private highScore: number = 0;
    private startTime: number = 0;

    private constructor() {
        this.highScore = parseInt(localStorage.getItem('slimeHunter_highScore') || '0', 10);
    }

    public static getInstance(): GameStateManager {
        if (!GameStateManager.instance) {
            GameStateManager.instance = new GameStateManager();
        }
        return GameStateManager.instance;
    }

    public startSession(): void {
        this.currentScore = 0;
        this.startTime = Date.now();
    }

    public incrementScore(): void {
        this.currentScore++;
        if (this.currentScore > this.highScore) {
            this.highScore = this.currentScore;
            localStorage.setItem('slimeHunter_highScore', this.highScore.toString());
        }
    }

    public getScore(): number {
        return this.currentScore;
    }

    public getHighScore(): number {
        return this.highScore;
    }

    public getElapsedTime(): number {
        return Math.floor((Date.now() - this.startTime) / 1000);
    }
}
