---
name: pr-ready
description: Standard technical verification workflow to ensure a feature branch is ready for a Pull Request.
---

# PR Readiness Skill

This skill documents the mandatory verification steps required before submitting a Pull Request in the `isekai-rpg` project.

## Workflow Overview

1.  **Code Quality Check**: Run the linter to ensure style consistency and find potential bugs.
    ```powershell
    npm run lint
    ```
2.  **Type & Build Verification**: Run the build script to verify TypeScript types and production bundle generation.
    ```powershell
    npm run build
    ```
3.  **Visual Validation**: Manually verify the changes in the browser. 
    - Check for UI regressions.
    - Confirm the specific feature requirement is met.
    - Capture a screenshot or recording for the walkthrough.
4.  **Documentation Update**: Update the project's internal tracking and evidence.
    -   **task.md**: Mark all relevant tasks as `[x]`.
    -   **walkthrough.md**: Create or update the walkthrough with results and media evidence.
5.  **Commit & Push**: Ensure all changes (including new assets) are staged and pushed to the remote branch.

## Standards

- **Linting**: Exit code must be 0.
- **Build**: `tsc` must pass without errors.
- **Evidence**: At least one visual artifact (screenshot/video) must be linked in the walkthrough.
