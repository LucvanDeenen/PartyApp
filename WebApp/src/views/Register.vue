<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-4">
          <v-card-title class="text-center text-h5 mb-4">
            Register
          </v-card-title>
          <v-form @submit.prevent="handleRegister">
            <v-text-field
              v-model="name"
              label="Full Name"
              required
              variant="outlined"
              prepend-inner-icon="mdi-account"
            ></v-text-field>

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
              Register
            </v-btn>

            <div v-if="error" class="text-danger text-center mt-2">
              {{ error }}
            </div>

            <div class="text-center mt-4">
              Already have an account?
              <router-link to="/login">Login</router-link>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../stores/auth'
import { getAuth, createUserWithEmailAndPassword, updateProfile, UserCredential } from 'firebase/auth'

const router = useRouter()
const auth = getAuth()
const { checkAuthState } = useAuth()

const name = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const handleRegister = async () => {
  try {
    loading.value = true
    error.value = ''
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    await updateProfile(userCredential.user, { displayName: name.value })
    checkAuthState()
    router.push('/games')
  } catch (e: any) {
    error.value = e.message || 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
