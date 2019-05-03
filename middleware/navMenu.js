export default ({ store, route }) => {
  if (Array.of('index').includes(route.name)) {
    store.commit('setNavTheme', 'light')
    store.commit('setNavFixed', true)
  } else {
    store.commit('setNavTheme', 'dark')
    store.commit('setNavFixed', false)
  }
}
