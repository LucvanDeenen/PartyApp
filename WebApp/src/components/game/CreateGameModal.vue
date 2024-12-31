<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title class="text-h6 pa-4">
        Create New Game
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="handleSubmit">
          <!-- Game Name -->
          <v-text-field
            v-model="gameName"
            label="Game Name"
            variant="outlined"
            density="comfortable"
            :rules="[(v: string) => !!v || 'Game name is required']"
            class="mb-4"
          ></v-text-field>

          <!-- Player Selection -->
          <div class="mb-4">
            <div class="d-flex align-center mb-2">
              <span class="text-subtitle-1">Players</span>
              <v-spacer></v-spacer>
              <span class="text-caption">{{ selectedPlayers.length }} selected</span>
            </div>
            
            <v-card variant="outlined" max-height="300" class="overflow-y-auto">
              <v-list density="comfortable">
                <v-list-item
                  v-for="player in allPlayers"
                  :key="player.id"
                  :value="player"
                  @click="togglePlayer(player)"
                >
                  <template v-slot:prepend>
                    <v-checkbox-btn
                      :model-value="isPlayerSelected(player)"
                      @update:model-value="togglePlayer(player)"
                    ></v-checkbox-btn>
                  </template>
                  <v-list-item-title>{{ player.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </div>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="grey-darken-1"
          variant="text"
          @click="closeDialog"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          @click="handleSubmit"
          :loading="loading"
          :disabled="!isValid"
        >
          Create Game
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import type { Player } from '../../types/game'

export default defineComponent({
  name: 'CreateGameModal',
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:show', 'create'],
  data() {
    return {
      dialog: this.show,
      gameName: '',
      selectedPlayers: [] as Player[],
      loading: false
    }
  },
  computed: {
    ...mapGetters('players', ['allPlayers']),
    isValid(): boolean {
      return this.gameName.trim() !== '' && this.selectedPlayers.length > 0
    }
  },
  watch: {
    show(newVal) {
      this.dialog = newVal
    },
    dialog(newVal) {
      if (!newVal) {
        this.$emit('update:show', false)
      }
    }
  },
  methods: {
    closeDialog() {
      this.dialog = false
      this.resetForm()
    },
    resetForm() {
      this.gameName = ''
      this.selectedPlayers = []
    },
    isPlayerSelected(player: Player): boolean {
      return this.selectedPlayers.some(p => p.id === player.id)
    },
    togglePlayer(player: Player) {
      const index = this.selectedPlayers.findIndex(p => p.id === player.id)
      if (index === -1) {
        this.selectedPlayers.push(player)
      } else {
        this.selectedPlayers.splice(index, 1)
      }
    },
    async handleSubmit() {
      if (!this.isValid) return

      try {
        this.loading = true
        await this.$emit('create', {
          name: this.gameName,
          players: this.selectedPlayers.map(player => ({
            player,
            score: 0
          }))
        })
        this.closeDialog()
      } finally {
        this.loading = false
      }
    }
  },
  async created() {
    await this.$store.dispatch('players/fetchPlayers')
  }
})
</script>