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

            <v-btn block color="primary" size="large" type="submit" class="mt-4" :disabled="loading">
              Login
            </v-btn>

            <v-btn block variant="tonal" size="large" class="mt-2" :disabled="loading" @click="$router.push('/login/guest')">
              Continue as Guest
            </v-btn>

            <div v-if="error" class="text-error text-center mt-2">
              <v-snackbar v-model="popup" :timeout="timeout">{{ error }}</v-snackbar>
            </div>

            <div class="text-center mt-4">
              Don't have an account?
              <router-link to="/register">Register</router-link>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      loading: false,
      popup: false,
      timeout: 4000,
      error: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  },
  // TODO: Move this into store handler
  watch: {
    isAuthenticated: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          const redirect = this.$route.query.redirect as string || '/games'
          this.$router.push(redirect)
        }
      }
    }
  },
  methods: {
    ...mapActions('auth', ['signIn']),
    async handleLogin() {
      try {
        this.loading = true
        this.error = ''
        await this.signIn({ email: this.email, password: this.password })
      } catch (e) {
        this.popup = true;
        this.error = 'Invalid email or password. Please try again.'
      } finally {
        this.loading = false
      }
    }
  }
})
</script>