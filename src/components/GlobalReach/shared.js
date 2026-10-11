const flags = import.meta.glob('../../images/flags/*.webp', { eager: true, import: 'default' })

export const flagFor = (code) => flags[`../../images/flags/${code}.webp`]

export const countLabel = (country) =>
  country.clients ? `${country.clients} client${country.clients === 1 ? '' : 's'}` : null
