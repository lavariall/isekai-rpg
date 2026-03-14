# Slime Hunter - Isekai Pseudo-3D RPG

**Play Slime Hunter live at: [https://lavariall.github.io/isekai-rpg/](https://lavariall.github.io/isekai-rpg/)**

## Overview
**Slime Hunter** is a playable prototype of a top-down RPG featuring a unique "Pseudo-3D" aesthetic achieved through **Sprite Stacking**. You play as an Isekai hero armed with a sword, exploring a procedural grassland populated by slimes.

## Technical Stack
- **Engine**: [Phaser 3](https://phaser.io/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Features
- **Pseudo-3D Sprite Stacking**: Characters and environment objects are built from 12 vertically stacked 2D layers (drawn via code), creating a 3D illusion with depth and parallax.
- **Dynamic Character Controller**: Uses WASD for movement with procedural tilting and rotation in the direction of travel.
- **Procedural Graphics**: Textures for the Hero, Slimes, and obstacles (Rocks, Bushes) are generated at runtime using HTML Canvas.
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
- `src/entities/`: Main game logic for `Hero`, `Slime`, and the base `SpriteStack` class.
- `src/graphics/`: `TextureGenerator.ts` for procedural Canvas drawing.
- `src/scenes/`: `GameScene.ts` handles the world, camera, and game loop.
- `src/main.ts`: Phaser game initialization and configuration.

---
*Created as part of an Isekai Game Development project.*
