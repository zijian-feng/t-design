export const num_to_px = (value?: number | string) => {
  if (typeof value === 'number') {
    return `${value}px`
  }
  return value
}
