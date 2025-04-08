import { Currencies } from "./currencies"

export default function DateToUTCDate(date: Date) {
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
      date.getUTCMilliseconds()
  ))
}


export function GetFormatterForCurrency(currency: string) {
  const locale = Currencies.find((c) => c.value === currency)?.locale
  if (!locale) {
    throw new Error(`No locale found for currency ${currency}`)
  }
  return new Intl.NumberFormat(locale,{
    style:"currency",
    currency,
  })
}