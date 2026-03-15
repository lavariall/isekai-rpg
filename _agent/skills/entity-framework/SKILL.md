---
name: entity-framework
description: standards for entity colliders and damageable interfaces
---

# Entity Framework Skill

This skill documents the architectural standards for creating new entities and handling interactions in the Anime RPG.

## Core Requirements

All future entities and interaction components MUST follow these standards:

1. **Damageable Entities**: Any entity that can take damage must implement the `IDamageable` interface found in `src/entities/common/IDamageable.ts`.
2. **Entity Colliders**: All weapons, projectiles, or environmental hazards that cause damage must inherit from the `EntityCollider` abstract class in `src/entities/common/EntityCollider.ts`.
3. **Modular Structure**: Entities should be organized as modules within their own subdirectories under `src/entities/`.
    - `EntityName/`
        - `EntityName.ts` (Main assembly)
        - `EntityNameStatus.ts` (Stats and health)
        - `EntityNameController.ts` or `EntityNameLogic.ts` (Input/AI)
        - `EntityNameColliders.ts` (Interaction areas)
4. **Interaction Management**: Use the `EntityInteractionManager` module for cross-entity logic like damage calculation or NPC dialogs.
5. **Spawners**: Create dedicated spawner classes in `src/spawners/` to handle initialization and registration.

---
*Follow these rules to ensure consistency and scalability in the game's architecture.*
