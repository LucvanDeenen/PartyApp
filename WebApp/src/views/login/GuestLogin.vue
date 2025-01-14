<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-4">
          <v-card-title class="text-h6 pa-4">
            Choose Your Guest Name
          </v-card-title>
          <v-form @submit.prevent="handleSignIn">
            <v-card-text>
              <v-text-field v-model="guestName" label="Display Name" :rules="nameRules" variant="outlined"
                density="comfortable" :error-messages="error" @update:model-value="error = ''"
                append-inner-icon="mdi-dice-multiple" @click:append-inner="generateRandomName" autofocus></v-text-field>

              <div class="text-caption text-medium-emphasis mt-2">
                Name requirements:
                <ul class="mt-1 pl-4">
                  <li>3-20 characters long</li>
                  <li>Letters, numbers, and spaces only</li>
                </ul>
              </div>
            </v-card-text>

            <div v-if="error" class="text-danger text-center mt-2">
              {{ error }}
            </div>

            <v-btn block color="primary" size="large" class="mt-4" :disabled="loading && !isValidName"
              @click="handleSignIn" :loading="loading">
              Continue
            </v-btn>
            <v-btn block variant="tonal" size="large" type="submit" class="mt-2" :disabled="loading" @click="$router.push('/login')">
              Cancel
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'GuestNameDialog',
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      guestName: this.generateRandomName(),
      loading: false,
      error: '',
      nameRules: [
        (v: string) => !!v || 'Name is required',
        (v: string) => v.length >= 3 || 'Name must be at least 3 characters',
        (v: string) => v.length <= 20 || 'Name must be less than 20 characters',
        (v: string) =>
          /^[a-zA-Z0-9 ]*$/.test(v) || 'Only letters, numbers, and spaces allowed'
      ]
    }
  },
  computed: {
    isValidName(): boolean {
      return (
        this.guestName.length >= 3 &&
        this.guestName.length <= 20 &&
        /^[a-zA-Z0-9 ]*$/.test(this.guestName)
      )
    }
  },
  methods: {
    ...mapActions('auth', ['getRandomGuestName', 'signInAsGuest']),
    async generateRandomName() {
      this.guestName = await this.getRandomGuestName();
    },
    async handleSignIn() {
      if (!this.isValidName) return
      try {
        this.loading = true
        this.error = ''

        await this.signInAsGuest({ name: this.guestName.trim() })
        this.$router.push('/games')
      } catch (e) {
        this.error = 'Guest login failed. Please try again.'
      } finally {
        this.loading = false
        this.$emit('submit')
      }
    }
  },
})
</script>