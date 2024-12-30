<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-4">
          <v-card-title class="text-center text-h5 mb-4">
            Register
          </v-card-title>
          <v-form @submit.prevent="handleRegister">
            <v-text-field v-model="name" label="Full Name" required variant="outlined"
              prepend-inner-icon="mdi-account"></v-text-field>

            <v-text-field v-model="email" label="Email" type="email" required variant="outlined"
              prepend-inner-icon="mdi-email"></v-text-field>

            <v-text-field v-model="password" label="Password" :type="showPassword ? 'text' : 'password'" required
              variant="outlined" prepend-inner-icon="mdi-lock"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword"></v-text-field>

            <v-btn block color="primary" size="large" type="submit" class="mt-4" :loading="loading" :disabled="loading">
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

<script lang="ts">
import { getAuth, createUserWithEmailAndPassword, updateProfile, UserCredential } from 'firebase/auth'
import { useAuth } from '../services/auth'

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      showPassword: false,
      loading: false,
      error: '',
    }
  },
  methods: {
    async handleRegister() {
      const auth = getAuth()
      const { checkAuthState } = useAuth()

      try {
        this.loading = true
        this.error = ''

        const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, this.email, this.password)
        await updateProfile(userCredential.user, { displayName: this.name })

        checkAuthState()
        this.$router.push('/games')
      } catch (e: any) {
        this.error = e.message || 'Registration failed. Please try again.'
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
