<template>
  <v-container fluid class="game-details pa-4">
    <v-row>
      <v-col cols="12">
        <v-btn
          prepend-icon="mdi-arrow-left"
          variant="text"
          @click="router.push('/games')"
        >
          Back to Games
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="game">
      <v-col cols="12" md="8" class="mx-auto">
        <game-scoreboard
          :title="game.title"
          :players="game.players.list"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGames } from '../stores/games'
import GameScoreboard from '../components/game/GameScoreboard.vue'

const router = useRouter()
const props = defineProps<{
  id: string
}>()

const { getGameById } = useGames()
const game = computed(() => 
  getGameById(parseInt(props.id))
)
</script>

<style scoped>
.game-details {
  max-width: 1200px;
  margin: 0 auto;
}
</style>