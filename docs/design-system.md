# Portfolio UI tokens

`design-tokens.css` owns semantic colors, typography, the spacing scale, radii,
container widths, responsive gutters and transition timing. `component-rhythm.css`
is the last stylesheet on public pages and owns component-level spacing decisions.
Generated articles include it through `scripts/build-articles.mjs`.

- Spacing: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 56 / 64 / 80 / 96 px.
- Within a component: 8–16px; card padding: 24px desktop / 20px mobile.
- Between sections: 56px desktop / 48px tablet / 40px mobile.
- Normal reading: 16–18px; metadata: 14px; card titles: 22px.
- Colors describe roles (`--color-text-muted`, `--color-border`,
  `--color-accent`) rather than individual components. Light article mode can
  override these semantic tokens without changing component rules.
- Brand artwork, syntax highlighting and hero illustration gradients may keep
  their own colors. Icon coordinates and image heights are geometry, not spacing.
- Preserve the hero's visible overflow and pointer-following icon motion.

The home page's obsolete badge/personal-statement experiments were removed from
its styles. Its current simple introduction and existing icon composition remain.
