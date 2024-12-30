<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-4">
          <v-card-title class="text-center text-h5 mb-4">
            Login
          </v-card-title>
          <v-form @submit.prevent="handleLogin">
            <v-text-field v-model="email" label="Email" type="email" required variant="outlined"
              prepend-inner-icon="mdi-email"></v-text-field>

            <v-text-field v-model="password" label="Password" :type="showPassword ? 'text' : 'password'" required
              variant="outlined" prepend-inner-icon="mdi-lock"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword"></v-text-field>

            <v-btn block color="primary" size="large" type="submit" class="mt-4" :loading="loading" :disabled="loading">
              Login
            </v-btn>

            <v-btn block variant="tonal" size="large" class="mt-2" :loading="loading" :disabled="loading"
              @click="showGuestPrompt = true">
              Continue as Guest
            </v-btn>

            <div v-if="error" class="text-error text-center mt-2">
              {{ error }}
            </div>

            <div class="text-center mt-4">
              Don't have an account?
              <router-link to="/register">Register</router-link>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <guest-name-prompt v-model:show="showGuestPrompt" @submit="handleGuestLogin" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../services/auth'
import GuestNamePrompt from '../components/auth/GuestNamePrompt.vue'

export default defineComponent({
  name: 'LoginView',
  components: {
    GuestNamePrompt
  },
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      loading: false,
      error: '',
      showGuestPrompt: false
    }
  },
  methods: {
    async handleLogin() {
      const router = useRouter()
      const route = useRoute()
      const { login } = useAuth()

      try {
        this.loading = true
        this.error = ''

        await login(this.email, this.password)

        const redirect = (route.query.redirect as string) || '/games'
        router.push(redirect)
      } catch (e) {
        this.error = 'Invalid email or password. Please try again.'
      } finally {
        this.loading = false
      }
    },

    async handleGuestLogin(guestName: string) {
      const router = useRouter()
      const route = useRoute()
      const { loginAsGuest } = useAuth()

      try {
        this.loading = true
        this.error = ''

        await loginAsGuest(guestName)
        this.showGuestPrompt = false

        const redirect = (route.query.redirect as string) || '/games'
        router.push(redirect)
      } catch (e) {
        this.error = 'Guest login failed. Please try again.'
      } finally {
        this.loading = false
      }
    }
  }
})
</script>
