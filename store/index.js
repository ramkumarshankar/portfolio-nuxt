export const state = () => ({
  baseTitle: 'Ramkumar Shankar',
  nav: {
    fixed: false,
    theme: 'light',
  },
})

export const mutations = {
  setNavFixed(state, navFixed) {
    state.nav.fixed = navFixed
  },
  setNavTheme(state, theme) {
    state.nav.theme = theme
  },
}
