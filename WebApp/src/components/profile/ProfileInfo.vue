<template>
  <v-card>
    <v-card-title class="text-h6">Personal Information</v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item>
          <template v-slot:prepend>
            <v-icon color="primary">mdi-account</v-icon>
          </template>
          <v-list-item-title class="d-flex align-center">
            {{ user?.name }}
            <profile-name-edit v-if="!user?.isGuest" />
          </v-list-item-title>
          <v-list-item-subtitle>Name</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <template v-slot:prepend>
            <v-icon color="primary">mdi-email</v-icon>
          </template>
          <v-list-item-title>{{ user?.email || 'Not available' }}</v-list-item-title>
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

<script lang="ts">
import { useAuth } from '../../services/auth'
import ProfileNameEdit from './ProfileNameEdit.vue'

export default {
  name: 'PersonalInformation',
  components: {
    ProfileNameEdit,
  },
  data() {
    const { user } = useAuth()
    return {
      user,
    }
  },
  computed: {
    memberSince() {
      return new Date().toLocaleDateString()
    },
  },
}
</script>
