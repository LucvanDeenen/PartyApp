<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-4">
          <v-card-title class="text-center text-h5 mb-4">
            Login
          </v-card-title>
          <v-form @submit.prevent="handleLogin">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              required
              variant="outlined"
              prepend-inner-icon="mdi-email"
            ></v-text-field>

            <v-text-field
              v-model="password"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              required
              variant="outlined"
              prepend-inner-icon="mdi-lock"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword"
            ></v-text-field>

            <v-btn
              block
              color="primary"
              size="large"
              type="submit"
              class="mt-4"
              :loading="loading"
              :disabled="loading"
            >
              Login
            </v-btn>

            <v-btn
              block
              variant="tonal"
              size="large"
              class="mt-2"
              :loading="loading"
              :disabled="loading"
              @click="showGuestPrompt = true"
            >
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

    <guest-name-prompt
      v-model:show="showGuestPrompt"
      @submit="handleGuestLogin"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../stores/auth'
import GuestNamePrompt from '../components/auth/GuestNamePrompt.vue'

const router = useRouter()
const route = useRoute()
const { login, loginAsGuest } = useAuth()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')
const showGuestPrompt = ref(false)

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = ''
    await login(email.value, password.value)
    
    // Redirect to the intended destination or default to /games
    const redirect = route.query.redirect as string || '/games'
    router.push(redirect)
  } catch (e) {
    error.value = 'Invalid email or password. Please try again.'
  } finally {
    loading.value = false
  }
}

const handleGuestLogin = async (guestName: string) => {
  try {
    loading.value = true
    error.value = ''
    await loginAsGuest(guestName)
    showGuestPrompt.value = false
    
    // Redirect to the intended destination or default to /games
    const redirect = route.query.redirect as string || '/games'
    router.push(redirect)
  } catch (e) {
    error.value = 'Guest login failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>