# Hop Premium

An interactive, client-only view of how a job-switch compensation bump compounds
against an annual raise. Drag the two sliders to redraw the annual salary paths
and their cumulative earnings difference in real time.

## Run it

```sh
npm install
npm run dev
```

Use `npm test`, `npm run lint`, and `npm run build` to verify the project. The
production build is emitted to `dist/` with relative asset links for subpath
hosting.

Hop Premium is a live earnings-compounding explainer for the career decision many
people make on instinct: stay put or switch jobs. Drag the annual raise you expect
if you stay and the typical compensation bump from changing jobs. The chart responds
immediately, showing two salary paths pull apart year after year and turning that
distance into a concrete dollar figure.

## Why it exists

Salary advice is often reduced to a one-time percentage comparison. That misses the
compounding effect of a higher base salary. Hop Premium makes that effect visible:
lower the stay-raise slider from an optimistic 8% to a plausible 3%, and see the
long-term difference open up in real time.

## Planned v1

- Two accessible, continuously updating compensation sliders.
- An animated D3 earnings chart with stay and switch paths.
- A clear cumulative-gap readout and year-by-year comparison.
- Sensible default assumptions and concise explanation of the model.
- Responsive, keyboard-friendly controls and reduced-motion support.

## Stack

- TypeScript
- D3
- Vite
- Vitest

## Development

```bash
npm install
npm run dev
```

Build the self-contained static site with `npm run build`. Output is written to
`dist/` and uses relative asset paths so it can be hosted beneath a subpath.

## Status

This repository currently contains the project foundation and implementation plan.
