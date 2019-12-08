
const METRIC_UNASSIGNED = '0'

export const METRICS = {
  breakpoint_mobile_max: '799px',
  breakpoint_desktop: '800px',
  row_spacing: `4rem`,
  column_padding: `4rem`
}

type Metric = {
  value: number
  units: string
}

const UNDEFINED_METRIC: Metric = {
  value: 0,
  units: ''
}

export function parseMetric(v: string | number): Metric {
  if(v === undefined) return UNDEFINED_METRIC
  const _v = String(v).trim().match(/^(-)?\s*(\d+\.?\d*)\s*(.*)$/)
  if (!_v) return UNDEFINED_METRIC
  let floatV = parseFloat(_v[2])
  if(_v[1]) floatV *= -1
  return {
    value: floatV,
    units: _v[3]
  }
}

export function assembleMetric(m: Metric): string {
  return `${m.value}${m.units}`
}

export function multiplyMetric(v: string | number, n: number | string = 1): string {
  const m = parseMetric(v)
  m.value *= parseMetric(n).value
  return assembleMetric(m)
}

export function divideMetric(v: string | number, n: number | string = 1): string {
  const m = parseMetric(v)
  m.value /= parseMetric(n).value
  return assembleMetric(m)
}

export function addToMetric(v: string | number, n: number | string = 0): string {
  const m = parseMetric(v)
  m.value += parseMetric(n).value
  return assembleMetric(m)
}

export function subtractFromMetric(v: string | number, n: number | string = 0): string {
  const m = parseMetric(v)
  m.value -= parseMetric(n).value
  return assembleMetric(m)
}

export function metric(name: string): string | number {
  return METRICS[name] || METRIC_UNASSIGNED
}