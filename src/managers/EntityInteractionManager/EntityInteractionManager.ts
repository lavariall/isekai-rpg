import { DamageCalculator } from './DamageCalculator';
import { NpcInteractionHandler } from './NpcInteractionHandler';
import { ObjectInteractionHandler } from './ObjectInteractionHandler';

/**
 * Modular assembly for entity and object interactions.
 */
export class EntityInteractionManager {
    public static readonly Damage = DamageCalculator;
    public static readonly NPC = NpcInteractionHandler;
    public static readonly Objects = ObjectInteractionHandler;
}
