# Architecture — Hop Premium

## Application map

- `src/main.ts` owns the browser entrypoint: it mounts the accessible controls,
  turns slider events into scenarios, updates readouts, and renders the D3 SVG.
- `src/lib/model.ts` is the deterministic compensation model and input validator.
- `src/lib/scenario.ts` is the input boundary between string range values and a
  validated model projection.
- `src/lib/chart-data.ts` prepares annual points and a readable y-axis ceiling.
- `src/lib/format.ts` centralizes percentage and whole-dollar presentation.
- `src/styles.css` implements the responsive Swiss-grid visual system.

## Data flow

Range input → `scenarioForSliders` → `validateInputs` → `projectEarnings` →
readouts and D3 lines. Invalid values return an inline error and do not render a
non-finite chart. The browser redraws the SVG on slider input and resize.

## Development

Run `npm run dev` for Vite development. Run `npm test` for unit tests, `npm run
lint` for static checks, and `npm run build` to create the deployable `dist/`
directory. Vite uses relative asset paths, so the output can be hosted at a
subpath such as `/hop-premium/`.
