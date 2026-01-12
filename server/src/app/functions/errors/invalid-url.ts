export class InvalidUrlError extends Error {
  constructor() {
    super('Formato de URL inválido.')
    this.name = 'InvalidUrlError'
  }
}
