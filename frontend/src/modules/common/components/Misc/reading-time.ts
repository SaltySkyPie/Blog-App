export function estimateReadingTime(text: string) {
  // Assuming an average of 200 words per minute
  const wordsPerMinute = 184

  // Calculate total words
  const totalWords = text.split(' ').length

  // Calculate reading time in minutes
  const readingTimeMinutes = totalWords / wordsPerMinute

  return readingTimeMinutes
}
