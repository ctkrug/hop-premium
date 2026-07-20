# Design direction — Hop Premium

## Aesthetic direction

**Swiss-grid modernist with a pay-stub edge.** Hop Premium will feel like a
well-composed public-interest data poster: pale mint paper, ink-black type, a
high-visibility vermilion switching line, and dense, precise number labels. This
deliberately avoids the nearby warm-library, risograph, blueprint, and editorial
newsprint directions; it should be bright, crisp, and financially legible without
becoming a conventional fintech dashboard.

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#dce8df` | pale mint page ground |
| `--surface-1` | `#f7f4ec` | chart field and primary panels |
| `--surface-2` | `#c8d7cb` | slider wells and secondary panels |
| `--ink` | `#17211e` | primary text, axes, stay line |
| `--ink-muted` | `#5e6c64` | captions and secondary labels |
| `--accent` | `#d64a32` | switch line, primary actions, high-gap emphasis |
| `--accent-support` | `#176b61` | stay controls, positive annotations |
| `--success` | `#28734d` | confirmed/copy success states |
| `--danger` | `#b6302e` | invalid input and warning states |

- **Display font:** Space Grotesk (500–700), with `Arial, sans-serif` fallback.
- **UI font:** DM Mono (400–500), with `ui-monospace, monospace` fallback.
- **Spacing:** 8px scale: 8, 16, 24, 32, 48, 64, 96.
- **Corners:** 2px for panels and inputs; 999px only for small data badges.
- **Depth:** a thin `--ink` keyline plus a 6px offset hard shadow in muted mint;
  chart panels use a subtle paper lift, never glass.
- **Motion:** 160–200ms ease-out for UI; 100ms handle response; 220ms for chart
  interpolation. Reduced-motion users receive immediate redraws and no decorative
  movement.

## Layout intent

The hero is the **live fork chart**: its two lines and growing fill gap occupy at
least 65% of the desktop viewport. At 1440×900, a compact top masthead anchors the
wordmark, the left 30% is a vertical control rail with two large sliders and the
gap readout, and the right 70% is the chart field with labels attached directly to
the line ends. Supporting model notes sit below the fold in a two-column grid.

At 390×844, the wordmark and one-sentence premise sit first, followed by two
full-width slider panels, the gap figure, then a chart that remains at least 46vh
tall. The chart scales to the viewport, labels avoid collisions, and no page-level
horizontal scroll is permitted. At 768px, the controls become a two-up row above
the chart.

## Signature detail

The wordmark makes a small animated **fork**: on first view and whenever a slider
settles, the two strokes in the “H” separate by a few pixels and return. The same
visual language appears in the chart’s gap fill, making the brand and interaction
feel like one system rather than a logo pasted above a graph.

## Interaction feedback

This is an explanatory data tool, not a game. Its required feedback is still
immediate: slider thumbs respond within 100ms, percentage digits roll to their new
value, line paths interpolate continuously while dragging, and the cumulative-gap
number briefly pulses when it changes. The app will have a persistent reduced-motion
mode via `prefers-reduced-motion`; no synthesized game audio is planned because it
would distract from the financial comparison.

## Accessibility and brand details

The final page loads both fonts, includes a custom SVG favicon using the vermilion
fork glyph, and gives every interactive element visible hover, active, disabled, and
focus-visible states. Range inputs will be fully styled, labelled, keyboard usable,
and paired with live text values.
