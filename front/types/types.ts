export interface ProcessTxtRequest {
  breakByLines: boolean
  numberOfLines?: number
  fileName?: string
  extractionHelpers?: Record<string, string>
}
