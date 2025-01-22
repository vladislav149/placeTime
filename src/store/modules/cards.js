import characterApi from '@/api/character'
import { getRandomInteger } from '@/helpers/getRandomInteger'

const state = {
  characters: null,
  isLoading: true,
  hasError: false,
}

const getters = {
  characters: ({ characters }) => characters,
  isLoading: ({ isLoading }) => isLoading,
}

const mutations = {
  setCharacters(state, data) {
    state.characters = data
  },
  removeCharacter(state, characterId) {
    const foundIndex = state.characters.findIndex(({ id }) => id === characterId)
    state.characters.splice(foundIndex, 1)
  },
  addRandomCharacter(state) {
    const id = getRandomInteger(0, state.characters.length - 1)
    state.characters.push(state.characters[id])
  },
  sortByType(state, type) {
    state.characters.sort((a, b) => a[type].localeCompare(b[type]))
  },
  setIsLoading(state, flag) {
    state.isLoading = flag
  },
  setHasError(state, flag) {
    state.hasError = flag
  },
}

const actions = {
  async getCharacter({ commit }) {
    try {
      commit('setIsLoading', true)
      commit('setHasError', false)
      const { data } = await characterApi.getCharacter()
      commit('setCharacters', data.results)
    } catch (error) {
      console.error(error)
      commit('setHasError', true)
    } finally {
      commit('setIsLoading', false)
    }
  },
}

export default { state, getters, mutations, actions, namespaced: true }
