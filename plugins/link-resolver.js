export default doc => {
  // Return the path depending on Prismic Document's type
  // If it is a Single Custom Type with the API ID of "home"
  if (doc.type === 'homepage') {
    return '/'
  }
  // If it is a Repeatable Custom Type with the API ID of "project" (must contain a UID field)
  if (doc.type === 'project') {
    return '/work/' + doc.uid
  }

  // Default to the root
  return '/'
}
