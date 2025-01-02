<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="text-h6 pa-4">
        Add Player
      </v-card-title>

      <v-card-text>
        <v-list density="comfortable" class="overflow-y-auto" max-height="300">
          <v-list-item
            v-for="player in availablePlayers"
            :key="player.id"
            :value="player"
            @click="selectPlayer(player)"
          >
            <template v-slot:prepend>
              <v-checkbox-btn
                :model-value="selectedPlayers.includes(player)"
                @update:model-value="selectPlayer(player)"
              ></v-checkbox-btn>
            </template>
            <v-list-item-title>{{ player.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
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
          :disabled="selectedPlayers.length === 0"
        >
          Add Players
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import type { Player } from '../../types/game'

export default defineComponent({
  name: 'AddPlayerModal',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    currentPlayers: {
      type: Array as () => Player[],
      required: true
    }
  },
  emits: ['update:show', 'add'],
  data() {
    return {
      dialog: this.show,
      selectedPlayers: [] as Player[],
      loading: false
    }
  },
  computed: {
    ...mapGetters('players', ['allPlayers']),
    availablePlayers(): Player[] {
      const currentPlayerIds = this.currentPlayers.map((p: Player) => p.id)
      return this.allPlayers.filter((p: Player) => !currentPlayerIds.includes(p.id))
    }
  },
  watch: {
    show(newVal) {
      this.dialog = newVal
    },
    dialog(newVal) {
      if (!newVal) {
        this.$emit('update:show', false)
        this.selectedPlayers = []
      }
    }
  },
  methods: {
    ...mapActions('players', ['fetchPlayers']),
    selectPlayer(player: Player) {
      const index = this.selectedPlayers.findIndex((p: Player) => p.id === player.id)
      if (index === -1) {
        this.selectedPlayers.push(player)
      } else {
        this.selectedPlayers.splice(index, 1)
      }
    },
    closeDialog() {
      this.dialog = false
    },
    async handleSubmit() {
      if (this.selectedPlayers.length === 0) return

      try {
        this.loading = true
        await this.$emit('add', this.selectedPlayers)
        this.closeDialog()
      } finally {
        this.loading = false
      }
    }
  },
  async created() {
    await this.fetchPlayers()
  }
})
</script>