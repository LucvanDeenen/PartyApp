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
      partyTheme,
      light: {
        colors: {
          primary: '#1976D2',
          secondary: '#00BCD4',
          accent: '#FFD700',
          background: '#FFFFFF',
          surface: '#FFFFFF',
          'surface-bright': '#FAFAFA',
          'surface-light': '#F5F5F5',
          'surface-variant': '#F0F0F0',
          'on-surface-variant': '#424242',
        }
      },
      dark: partyTheme
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