# Backlog — Hop Premium

## Epic 1 — Make the fork visible

### [ ] 1. Build the live stay-versus-switch fork chart

- Dragging the stay-raise slider from 8% to 3% redraws both D3 paths during the
  drag without a submit action.
- The switching path visibly diverges from the stay path and the chart shows a
  dollar-labelled cumulative gap for the configured horizon.
- At default inputs, the chart renders annual values for every year in the horizon.

### [ ] 2. Create a tested compensation-compounding model

- Given starting pay, raise rate, switch bump, and horizon, the model returns one
  deterministic annual salary value per path per year.
- Unit tests verify 0% raise, 0% switch bump, and a positive compounding case.
- Cumulative earnings equal the sum of the annual salary values returned.

### [ ] 3. Add accessible continuous slider controls

- Both sliders expose a visible label, current percentage, and keyboard-adjustable
  range input with a 44px minimum touch target.
- Pointer, touch, and keyboard changes update the model and chart within one frame.
- Focus-visible, hover, active, and disabled states match `docs/DESIGN.md`.

### [ ] 4. Polish the chart-first hero composition

- At 1440×900, the chart occupies at least 60% of the initial viewport and controls
  do not overlap it.
- At 390×844 and 768px widths, no page-level horizontal scroll or clipped control
  labels occur.
- The implementation uses the color, type, spacing, and motion tokens in
  `docs/DESIGN.md`.

## Epic 2 — Make the model legible

### [ ] 5. Surface annual and cumulative earnings readouts

- The interface shows modeled annual salary at the selected endpoint for both paths.
- The cumulative dollar difference updates whenever either input changes.
- Currency values are formatted consistently with grouping separators and no
  misleading fractional cents.

### [ ] 6. Add an explicit assumptions panel

- The page states the starting salary, horizon, raise cadence, and switch timing
  used by the model.
- The panel explains that the model is illustrative and excludes taxes, equity, and
  job-search risk.
- The panel remains reachable by keyboard and readable on a 390px viewport.

### [ ] 7. Clarify the divergence directly on the chart

- Each path has an adjacent, non-overlapping endpoint label at standard desktop
  width.
- The gap fill or annotation identifies the cumulative difference without relying
  on color alone.
- Chart axes and key labels maintain at least 4.5:1 text contrast against their
  surfaces.

### [ ] 8. Polish explanatory states and number motion

- Changing an input pulses the gap figure once and interpolates paths over the
  design-specified motion duration.
- With `prefers-reduced-motion`, values update correctly without path tweening or
  decorative wordmark movement.
- Empty/error handling shows a readable inline message if the chart cannot mount.

## Epic 3 — Make it ready to share

### [ ] 9. Add a custom Hop Premium identity

- The page includes a non-default favicon rendered from the project fork glyph.
- The visible wordmark uses the selected display type and fork signature detail.
- Brand styling is consistent between the masthead, controls, and chart annotations.

### [ ] 10. Make the static build portable

- `npm run build` produces an `dist/` directory containing an `index.html` entry.
- Generated HTML and asset references work when served below a non-root path.
- The deployed app makes no network request for application data.

### [ ] 11. Cover interactive behavior with automated checks

- Tests verify slider input changes the model data used for rendering.
- Tests verify the displayed gap is positive when switch bump exceeds stay growth
  under the supplied scenario.
- `npm run lint` and `npm test` exit successfully in a clean install.

### [ ] 12. Polish responsive and accessibility delivery

- A manual review at 390px, 768px, and 1440px finds no overlap, clipped content,
  or horizontal page scroll.
- Tab order reaches every control, focus is visible, and live earnings updates use
  an appropriate status announcement.
- The completed page passes its design self-review against `docs/DESIGN.md`.
