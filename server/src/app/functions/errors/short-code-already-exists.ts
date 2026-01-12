export class ShortCodeAlreadyExistsError extends Error {
  constructor() {
    super('Link encurtado já existe.')
    this.name = 'ShortCodeAlreadyExistsError'
  }
}
