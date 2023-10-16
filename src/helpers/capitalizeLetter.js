export const capitalizeFirstLetter = (texts) => {
  return texts.map((text) => text?.charAt(0).toUpperCase() + text.slice(1))
}