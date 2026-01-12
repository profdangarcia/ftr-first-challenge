export class InvalidUrlError extends Error {
  constructor(url: string) {
    super(`Invalid URL format: "${url}".`)
    this.name = 'InvalidUrlError'
  }
}
