export const deletePaymentItem = (form: { pages: { elements: { name: string }[] }[] }) => {
  const page = form.pages.findIndex(page => page.elements.findIndex(
    elem => elem.name === 'payment'
  ) !== -1)
  if (page === -1) return form
  const element = form.pages[page].elements.findIndex(
    elem => elem.name === 'payment'
  )
  if (element === -1) return form
  form.pages[page].elements.splice(element, 1)
  return form
}