---
name: deploy
description: Deploy the current project to staging. Runs the full test suite, builds the production bundle, and pushes to the staging remote/branch. Use when the user says "deploy", "ship to staging", "/deploy", or asks to push a release to staging.
---

# Deploy to staging

Run these three phases **in order**. If any phase fails, STOP — do not proceed to the next phase. Report the failure and let the user decide how to handle it.

## Phase 1 — Run all tests

1. Detect the test command from the project:
   - Node/JS: check `package.json` `scripts.test` (run with `npm test` / `pnpm test` / `yarn test` matching the project's lockfile). If no `test` script exists, check for `vitest`, `jest`, or `playwright` in devDependencies and run them directly.
   - Python: `pytest` if `pytest.ini` / `pyproject.toml` configures it, otherwise `python -m unittest`.
   - Go: `go test ./...`.
   - Rust: `cargo test`.
   - Other: ask the user for the test command.
2. Run the detected command. If it exits non-zero, STOP and report the failing tests. Do not attempt to "fix" tests as part of deploy — that is a separate task.
3. If the project has no test runner configured, tell the user explicitly ("no test runner detected") and ask whether to skip Phase 1 or abort. Do not silently skip.

## Phase 2 — Build production bundle

1. Detect the build command:
   - Node/JS: `package.json` `scripts.build` (typical: `npm run build`).
   - Other ecosystems: the conventional production build for the toolchain (e.g. `cargo build --release`, `go build`, `python -m build`).
2. Run it. If it exits non-zero, STOP and report. Do not deploy a broken build.
3. Confirm the build artifact exists (e.g. `dist/`, `build/`, `target/release/`) before moving on.

## Phase 3 — Push to staging

1. Determine the staging target by checking, in order:
   - A `staging` git remote (`git remote get-url staging`).
   - A `staging` branch (`git show-ref --verify refs/heads/staging`).
   - A `deploy:staging` script in `package.json` or a `Makefile` target named `deploy-staging` / `staging`.
   - If none found, ask the user what "staging" means for this project before pushing anywhere.
2. Confirm the target with the user in one short sentence before pushing (e.g. "About to push current branch to `staging` remote `main` — proceed?"). Pushing is a shared-state action and needs explicit go-ahead per turn unless the user said "deploy without confirming".
3. Run the push (`git push staging <branch>` or the project's deploy script).
4. Report: tests passed, build succeeded, what was pushed, and where.

## Notes

- Never use `--no-verify`, `--force`, or skip hooks unless the user explicitly asks.
- If the working tree is dirty, warn the user and ask whether to commit, stash, or abort before deploying.
- This skill does NOT promote staging to production. Production deploys are a separate flow.
