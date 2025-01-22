import { defaultApiInstance } from '@/api'
import URLS from '@/api/URLS'

const characterApi = {
  getCharacter() {
    return defaultApiInstance.get(URLS.CHARACTER)
  },
}

export default characterApi
