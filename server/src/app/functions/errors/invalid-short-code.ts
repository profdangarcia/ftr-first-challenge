export class InvalidShortCodeError extends Error {
  constructor() {
    super('Link encurtado inválido.')
  }
}
