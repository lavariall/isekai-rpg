import Phaser from 'phaser';

/**
 * Handles damage calculation logic.
 */
export class DamageCalculator {
    /**
     * Calculates the result of an attack.
     * @param baseDamage The attacker's base damage.
     * @returns The calculated damage.
     */
    public static calculate(baseDamage: number): number {
        const variance = Phaser.Math.Between(-2, 5);
        return Math.max(1, baseDamage + variance);
    }
}
