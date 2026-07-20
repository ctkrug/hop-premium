# Vision — Hop Premium

## The problem

Career compensation advice treats a job switch as a negotiation anecdote: receive
a larger offer once, then compare it to the raise at hand. The important mechanism
is compounding. A higher starting salary changes every later raise, but that effect
is difficult to feel from a table or a one-time calculator result.

## Who it is for

Hop Premium is for salaried knowledge workers weighing whether to stay or change
jobs, and for anyone who wants a fast, honest way to reason about the long-term
impact of a compensation pattern. It is an educational model, not financial or
career advice and not a prediction of a specific employer's practices.

## Core idea

Two inputs drive the experience: the annual raise expected when staying and the
typical compensation bump received by switching. As either slider moves, a D3 chart
continuously recomputes annual salary paths, animates their divergence, and exposes
the cumulative earnings gap. The key interaction is lowering an 8% stay raise toward
3% and seeing the switch path visibly peel away without a submit button.

## Key design decisions

- Keep the first screen focused on one decision and two inputs; assumptions remain
  visible but never compete with the chart.
- Use a deterministic compounding model with clearly labelled defaults and a short
  explanation of what the model does not include.
- Make the chart, not a form or a table, the primary artifact. Values update during
  drag, with legible endpoint labels and a gap fill.
- Ship as a client-only static site. It has no accounts, analytics requirement, or
  server dependency, and its Vite build uses relative assets for subpath hosting.
- Follow the Swiss-grid design system in `docs/DESIGN.md`: clear hierarchy, styled
  controls, a custom fork wordmark, and responsive chart-first composition.

## v1 done

V1 is complete when a visitor can open the static site, use both sliders with mouse,
touch, and keyboard, and immediately understand the modeled annual and cumulative
difference between staying and switching over the selected time horizon. The chart
is animated but respects reduced-motion preferences; the assumptions are explicit;
the model has unit tests; and the page is composed and usable at 390px, 768px, and
1440px widths.
