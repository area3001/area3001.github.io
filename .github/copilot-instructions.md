# Copilot Instructions

These instructions define how Tailwind CSS should be written in this repository.

## Tailwind Consistency Rules

- Prefer human-readable, consistent utility patterns over arbitrary one-off values.
- Keep z-index on a clear scale. Prefer built-in tokens like `z-10`, `z-20`, `z-30`, `z-40`, `z-50` over mixed forms like `z-[1]`.
- Avoid redundant reset classes that do not change rendering in context.
- Do not add combinations like `my-0 p-0 rounded-none bg-none border-none shadow-none` unless they are required by a variant, breakpoint, or state.
- Keep color syntax consistent within a component. Do not mix unrelated styles like `bg-[rgba(...)]` with `text-[#...]` in the same block without reason.
- Prefer one color style per component (for example hex + alpha slash, or semantic theme tokens).
- Prefer CSS variables for project colors. Define color tokens centrally (for example in `:root`) and reference them in Tailwind with `var(--token)` (for example `text-[var(--crt-text)]`) instead of inline hex values.
- Use arbitrary values only when Tailwind scale values cannot express the intended result.
- Avoid older/deprecated utility styles when modern Tailwind utilities exist and are equivalent.
- Use typography utilities intentionally. Do not add values like `leading-6` unless they are required by design.

## Refactor Expectations

- During edits, normalize nearby classes toward the above rules when safe.
- Preserve visual behavior unless the task explicitly requests design changes.
- Keep class strings readable and grouped logically (layout, spacing, typography, colors, effects, states).

## Quality Gate

Before finishing a Tailwind-related change:

- Remove clearly redundant utilities.
- Check utility consistency inside each modified class string.
- Prefer tokenized Tailwind classes over arbitrary bracket forms when possible.
- When modernizing older Tailwind utilities, run `npx @tailwindcss/upgrade` and review the resulting diff before finalizing.

## Project Style Preset

Use these concrete patterns as defaults during edits.

### Z-Index

- Do: `z-10`, `z-20`, `z-30`, `z-40`, `z-50`
- Don't: `z-[1]`, `z-[2]`, `z-[3]`

### Redundant Resets

- Do: `w-full`
- Don't: `w-full my-0 p-0 rounded-none bg-none border-none shadow-none`
- Only keep reset utilities when they are scoped by variant/state/breakpoint and visibly required.

### Color Syntax (Same Component)

- Do: keep one style, e.g. `bg-[#040c05]/90 text-[#b8ffc2] border-[#8aff9c]/80`
- Don't: mix styles without reason, e.g. `bg-[rgba(4,12,5,0.9)] text-[#b8ffc2]`
- Do: move shared colors to CSS variables and use `bg-[var(--token)]`, `text-[var(--token)]`, `border-[var(--token)]`
- Don't: repeat inline hex values across multiple class strings when they represent the same design token

### Typography

- Do: use explicit typography only when design-driven (for example `leading-relaxed` in reading views)
- Don't: add generic line-height utilities like `leading-6` by default

### Arbitrary Values

- Do: use arbitrary values only for effects or layouts that Tailwind scale cannot express
- Don't: default to bracket values where tokenized utilities already cover the intent
