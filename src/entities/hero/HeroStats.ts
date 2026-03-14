export class HeroStats {
    public health: number;
    public maxHealth: number;
    public level: number;
    public strength: number;
    public manapoints: number;
    public maxManapoints: number;
    public magicPower: number;
    public agility: number;
    public xp: number;
    public nextLevelXp: number;

    constructor() {
        this.level = 1;
        this.maxHealth = 100;
        this.health = 100;
        this.strength = 10;
        this.maxManapoints = 50;
        this.manapoints = 50;
        this.magicPower = 10;
        this.agility = 10;
        this.xp = 0;
        this.nextLevelXp = 100;
    }

    public takeDamage(amount: number) {
        this.health = Math.max(0, this.health - amount);
    }

    public heal(amount: number) {
        this.health = Math.min(this.maxHealth, this.health + amount);
    }

    public addXp(amount: number) {
        this.xp += amount;
        if (this.xp >= this.nextLevelXp) {
            this.levelUp();
        }
    }

    private levelUp() {
        this.level++;
        this.xp -= this.nextLevelXp;
        this.nextLevelXp = Math.floor(this.nextLevelXp * 1.5);
        this.maxHealth += 20;
        this.health = this.maxHealth;
        this.strength += 2;
        this.maxManapoints += 10;
        this.manapoints = this.maxManapoints;
        this.magicPower += 2;
        this.agility += 2;
    }
}
