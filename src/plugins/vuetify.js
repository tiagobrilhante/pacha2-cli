import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

// Translation provided by Vuetify (typescript)
import pt from 'vuetify/src/locale/pt.ts'

Vue.use(Vuetify)

export default new Vuetify({
  theme: { dark: false },
  lang: {
    locales: { pt },
    current: 'pt'
  }
})
