# Slime Hunter - Isekai Pseudo-3D RPG

**Play Slime Hunter live at: [https://lavariall.github.io/isekai-rpg/](https://lavariall.github.io/isekai-rpg/)**

## Overview
**Slime Hunter** is a playable prototype of a top-down RPG featuring a unique "Pseudo-3D" aesthetic achieved through **Sprite Stacking**. You play as an Isekai hero armed with a sword, exploring a procedural grassland populated by slimes.

## Technical Stack
- **Engine**: [Phaser 3](https://phaser.io/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Features
- **Pseudo-3D Sprite Stacking**: Characters and environment objects are built from vertically stacked 2D layers, creating a 3D illusion with depth and parallax.
- **Dynamic Character Controller**: Uses WASD for movement with procedural tilting and rotation in the direction of travel (refactored into components).
- **High-Quality Character Assets**: New high-resolution hero assets processed via `rembg` for perfect transparency and scaling.
- **Improved Architecture**: Refactored `Hero` class using a component-based system (`HeroStats`, `HeroGraphics`, `HeroController`).
- **Asset Processing Utility**: Python script using `uv` and `rembg` for automated background removal and resizing of sprite layers.
- **Simple Combat**: Tactical sword swinging (Spacebar) to defeat enemies.
- **AI Enemies**: Slimes move towards the player and drop XP particles upon defeat.
- **Optimized Physics**: Circle-based collision detection using Phaser's Arcade Physics.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/lavariall/isekai-rpg.git
   cd isekai-rpg
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Controls
- **WASD / Arrow Keys**: Move
- **Spacebar**: Attack (Sword Swing)

## Project Architecture
- `src/entities/hero/`: Modular components for the Hero (`HeroStats.ts`, `HeroGraphics.ts`, `HeroController.ts`).
- `src/entities/`: Main game logic for `Hero.ts` (composition root), `Slime.ts`, and the base `SpriteStack.ts` class.
- `src/graphics/`: `TextureGenerator.ts` for procedural Canvas drawing.
- `src/scenes/`: `GameScene.ts` handles the world, camera, and game loop.
- `utilities/`: Python scripts for asset processing.
- `public/assets/hero/`: Pre-processed hero sprite layers.

---
*Created as part of an Isekai Game Development project.*
