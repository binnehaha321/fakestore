export const capitalizeFirstLetter = (texts) => {
  if (!texts.length) return
  return texts?.map((text) => text?.charAt(0).toUpperCase() + text.slice(1))
}