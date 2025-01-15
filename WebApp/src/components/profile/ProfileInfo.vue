<template>
  <v-card v-if="user">
    <v-card-title class="text-h6 d-flex">
      Personal Information
      <v-spacer></v-spacer>
      <v-btn v-if="!user.email" disabled variant="tonal" append-icon="mdi-account-plus">
        Create Account
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item>
          <template v-slot:prepend>
            <v-icon color="primary">mdi-account</v-icon>
          </template>
          <v-list-item-subtitle>Name</v-list-item-subtitle>
          <v-list-item-title class="d-flex align-center">
            {{ user.displayName }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item class="mt-3">
          <v-list-item-subtitle>Email</v-list-item-subtitle>
          <template v-slot:prepend>
            <v-icon color="primary">{{ user.email ? 'mdi-email' : 'mdi-incognito' }}</v-icon>
          </template>
          <v-list-item-title>{{ user.email || 'Signed in as guest' }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { UserInfo } from 'firebase/auth';
import { mapGetters } from 'vuex';
import ProfileNameEdit from './ProfileNameEdit.vue';

export default defineComponent({
  name: 'PersonalInformation',
  components: {
    ProfileNameEdit,
  },
  computed: {
    ...mapGetters('auth', ['currentUser']),
    user(): UserInfo {
      return this.currentUser as UserInfo;
    },
  },
  methods: {
    ...mapGetters('auth', ['currentUser'])
  }
});
</script>
