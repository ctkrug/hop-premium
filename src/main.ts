import * as d3 from 'd3'
import { chartCeiling, toChartPoints } from './lib/chart-data'
import { formatCurrency, formatPercent } from './lib/format'
import { projectEarnings, type CompensationInputs } from './lib/model'
import { scenarioForSliders } from './lib/scenario'
import './styles.css'

const app = document.querySelector<HTMLElement>('#app')

if (!app) {
  throw new Error('Hop Premium could not find its application root.')
}

const defaults: CompensationInputs = {
  startingSalary: 100_000,
  stayRaisePercent: 8,
  switchBumpPercent: 15,
  horizonYears: 10,
}

app.innerHTML = `
  <header class="masthead">
    <a class="wordmark" href="./" aria-label="Hop Premium home"><span>H</span>OP <i></i> PREMIUM</a>
    <p class="masthead-note">A compounding pay-stub for your next move</p>
  </header>
  <main class="page-shell">
    <section class="intro" aria-labelledby="page-title">
      <p class="kicker">LOYALTY, PRICED</p>
      <h1 id="page-title">What does staying<br>really cost?</h1>
      <p>Move the dials. See the fork. This is the earnings effect of one decision, compounded over time.</p>
    </section>
    <section class="control-rail" aria-label="Compensation assumptions">
      <div class="control-card stay-control">
        <label for="stay-raise">Annual raise if I stay</label>
        <output id="stay-value" for="stay-raise">8%</output>
        <input id="stay-raise" type="range" min="0" max="20" step="0.5" value="8" aria-describedby="stay-hint">
        <p id="stay-hint">Typical internal raise</p>
      </div>
      <div class="control-card switch-control">
        <label for="switch-bump">Typical bump if I switch</label>
        <output id="switch-value" for="switch-bump">15%</output>
        <input id="switch-bump" type="range" min="0" max="50" step="1" value="15" aria-describedby="switch-hint">
        <p id="switch-hint">New role, higher base</p>
      </div>
      <div class="gap-card" aria-labelledby="gap-label">
        <p id="gap-label">10-YEAR EARNINGS GAP</p>
        <strong id="gap-value">$0</strong>
        <span id="gap-copy">in favor of switching</span>
      </div>
      <p id="error-message" class="error-message" role="alert" hidden></p>
    </section>
    <section class="chart-panel" aria-labelledby="chart-heading">
      <div class="chart-heading"><p id="chart-heading">ANNUAL BASE SALARY</p><span>YEAR 0 — 10</span></div>
      <div id="chart" class="chart" role="img" aria-label="A line chart comparing annual salary when staying versus switching jobs"></div>
      <div class="chart-legend" aria-label="Chart legend"><span class="stay-key">STAY</span><span class="switch-key">SWITCH</span></div>
    </section>
    <aside class="model-note">
      <b>THE MODEL</b><span>Starting salary: $100,000 · horizon: 10 years · annual raise compounds each year.</span>
      <span>Illustrative only. Excludes taxes, equity, promotion, and job-search risk.</span>
    </aside>
  </main>
  <p id="live-update" class="sr-only" aria-live="polite"></p>
`

const stayInput = document.querySelector<HTMLInputElement>('#stay-raise')
const switchInput = document.querySelector<HTMLInputElement>('#switch-bump')
const stayValue = document.querySelector<HTMLOutputElement>('#stay-value')
const switchValue = document.querySelector<HTMLOutputElement>('#switch-value')
const gapValue = document.querySelector<HTMLElement>('#gap-value')
const gapCopy = document.querySelector<HTMLElement>('#gap-copy')
const chartRoot = document.querySelector<HTMLElement>('#chart')
const errorMessage = document.querySelector<HTMLElement>('#error-message')
const liveUpdate = document.querySelector<HTMLElement>('#live-update')

if (!stayInput || !switchInput || !stayValue || !switchValue || !gapValue || !gapCopy || !chartRoot || !errorMessage || !liveUpdate) {
  throw new Error('Hop Premium could not initialize its controls.')
}

let inputs = { ...defaults }
let settledTimer: number | undefined

function renderChart(projection: ReturnType<typeof projectEarnings>) {
  const points = toChartPoints(projection)
  const rect = chartRoot!.getBoundingClientRect()
  const width = Math.max(280, rect.width)
  const height = Math.max(360, rect.height)
  const margin = { top: 38, right: 116, bottom: 48, left: 68 }
  const x = d3.scaleLinear().domain([0, inputs.horizonYears]).range([margin.left, width - margin.right])
  const y = d3.scaleLinear().domain([0, chartCeiling(points)]).nice().range([height - margin.bottom, margin.top])
  const svg = d3.select(chartRoot!).selectAll<SVGSVGElement, null>('svg').data([null]).join('svg')
    .attr('viewBox', `0 0 ${width} ${height}`).attr('preserveAspectRatio', 'none')
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const duration = reducedMotion ? 0 : 220
  const line = (key: 'staySalary' | 'switchSalary') => d3.line<typeof points[number]>()
    .x((point) => x(point.year)).y((point) => y(point[key])).curve(d3.curveMonotoneX)
  const area = d3.area<typeof points[number]>().x((point) => x(point.year))
    .y0((point) => y(point.staySalary)).y1((point) => y(point.switchSalary)).curve(d3.curveMonotoneX)

  svg.selectAll<SVGGElement, null>('.axis-y').data([null]).join('g').attr('class', 'axis axis-y')
    .attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y).ticks(5).tickFormat((value) => formatCurrency(Number(value))))
  svg.selectAll<SVGGElement, null>('.axis-x').data([null]).join('g').attr('class', 'axis axis-x')
    .attr('transform', `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x).ticks(inputs.horizonYears).tickFormat((value) => `${value}`))
  svg.selectAll<SVGPathElement, typeof points>('.gap-area').data([points]).join('path').attr('class', 'gap-area')
    .interrupt().transition().duration(duration).attr('d', area)
  svg.selectAll<SVGPathElement, typeof points>('.stay-line').data([points]).join('path').attr('class', 'line stay-line')
    .interrupt().transition().duration(duration).attr('d', line('staySalary'))
  svg.selectAll<SVGPathElement, typeof points>('.switch-line').data([points]).join('path').attr('class', 'line switch-line')
    .interrupt().transition().duration(duration).attr('d', line('switchSalary'))

  const last = points.at(-1)
  if (last) {
    const labels = [
      { text: `STAY ${formatCurrency(last.staySalary)}`, y: y(last.staySalary), className: 'end-label stay-label' },
      { text: `SWITCH ${formatCurrency(last.switchSalary)}`, y: y(last.switchSalary), className: 'end-label switch-label' },
    ]
    svg.selectAll<SVGTextElement, typeof labels[number]>('.end-label').data(labels).join('text')
      .attr('class', (label) => label.className).attr('x', width - margin.right + 12)
      .text((label) => label.text).interrupt().transition().duration(duration).attr('y', (label) => label.y + 4)
  }
}

function update() {
  const scenario = scenarioForSliders(defaults, stayInput!.value, switchInput!.value)
  errorMessage!.hidden = !scenario.error
  errorMessage!.textContent = scenario.error ?? ''
  if (!scenario.projection) return
  inputs = { ...defaults, stayRaisePercent: Number(stayInput!.value), switchBumpPercent: Number(switchInput!.value) }
  const projection = scenario.projection
  stayValue!.value = `${formatPercent(inputs.stayRaisePercent)}%`
  switchValue!.value = `${formatPercent(inputs.switchBumpPercent)}%`
  gapValue!.textContent = formatCurrency(Math.abs(projection.cumulativeGap))
  gapCopy!.textContent = projection.cumulativeGap >= 0 ? 'in favor of switching' : 'in favor of staying'
  gapValue!.classList.remove('pulse')
  void gapValue!.offsetWidth
  gapValue!.classList.add('pulse')
  renderChart(projection)
  liveUpdate!.textContent = `Over ${inputs.horizonYears} years, the cumulative earnings gap is ${formatCurrency(Math.abs(projection.cumulativeGap))} ${gapCopy!.textContent}.`
  window.clearTimeout(settledTimer)
  settledTimer = window.setTimeout(() => document.querySelector('.wordmark')?.classList.add('forking'), 160)
}

stayInput.addEventListener('input', update)
switchInput.addEventListener('input', update)
window.addEventListener('resize', update)
update()
