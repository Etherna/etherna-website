export const aiModel = {
  name: "gpt-4.1-mini",
  inputTokensPrice: 0.4 / 1_000_000,
  outputTokensPrice: 1.6 / 1_000_000,
  calcPrice(inputTokens: number, outputTokens: number) {
    return (inputTokens * this.inputTokensPrice + outputTokens * this.outputTokensPrice).toFixed(4)
  },
} as const
