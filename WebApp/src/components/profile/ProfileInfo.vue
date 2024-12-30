<template>
  <v-card>
    <v-card-title class="text-h6">Personal Information</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item>
          <template v-slot:prepend>
            <v-icon color="primary">mdi-account</v-icon>
          </template>
          <v-list-item-title>{{ user?.name }}</v-list-item-title>
          <v-list-item-subtitle>Name</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <template v-slot:prepend>
            <v-icon color="primary">mdi-email</v-icon>
          </template>
          <v-list-item-title>{{ user?.email }}</v-list-item-title>
          <v-list-item-subtitle>Email</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <template v-slot:prepend>
            <v-icon color="primary">mdi-calendar</v-icon>
          </template>
          <v-list-item-title>Member since {{ memberSince }}</v-list-item-title>
          <v-list-item-subtitle>Join Date</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuth } from '../../stores/auth'

const { user } = useAuth()
const memberSince = computed(() => new Date().toLocaleDateString())
</script>