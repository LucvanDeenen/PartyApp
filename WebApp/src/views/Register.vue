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
            >
              Register
            </v-btn>

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

const name = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)

const handleRegister = () => {
  // Implement registration logic here
  console.log('Register attempt:', {
    name: name.value,
    email: email.value,
    password: password.value
  })
}
</script>