import type { EarningsProjection } from './model'

export type ChartPoint = {
  year: number
  staySalary: number
  switchSalary: number
}

export function toChartPoints(projection: EarningsProjection): ChartPoint[] {
  return projection.years.map(({ year, staySalary, switchSalary }) => ({
    year,
    staySalary,
    switchSalary,
  }))
}

export function chartCeiling(points: ChartPoint[]): number {
  const largest = Math.max(...points.flatMap((point) => [point.staySalary, point.switchSalary]))
  return Math.ceil(largest / 10_000) * 10_000
}
