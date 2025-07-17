export interface FxRatesResponse {
  [date: string]: {
    [currency: string]: number;
  };
}
