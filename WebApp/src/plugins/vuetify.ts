import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { partyTheme } from './theme'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'partyTheme',
    themes: {
      partyTheme
    }
  },
  defaults: {
    VCard: {
      elevation: 1
    },
    VBtn: {
      elevation: 2
    }
  }
})