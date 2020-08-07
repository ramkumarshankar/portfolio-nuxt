export default doc => {
  // Return the path depending on Prismic Document's type
  // If it is a Single Custom Type with the API ID of "homepage"
  if (doc.type === 'homepage') {
    return '/'
  }

  // If it is a Single Custom Type with the API ID of "aboutpage"
  if (doc.type === 'aboutpage') {
    return '/about'
  }

  // If it is a Single Custom Type with the API ID of "contactpage"
  if (doc.type === 'contactpage') {
    return '/contact'
  }

  // If it is a Repeatable Custom Type with the API ID of "project" (must contain a UID field)
  if (doc.type === 'project') {
    return '/work/' + doc.uid
  }

  // If it is a Repeatable Custom Type with the API ID of "article" (must contain a UID field)
  if (doc.type === 'article') {
    return '/writing/' + doc.uid
  }

  // Default to the root
  return '/'
}
