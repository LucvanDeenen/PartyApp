<template>
  <div class="player-grid pa-4">
    <v-row>
      <v-col
        v-for="playerDetails in sortedPlayers"
        :key="playerDetails.player.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <player-tile
          :player-details="playerDetails"
          :is-leader="playerDetails.score === highestScore"
          :game-id="gameId"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PlayerScore } from '../../types/game'
import PlayerTile from './PlayerTile.vue'
import { useScoreboard } from '../../composables/useScoreboard'

export default defineComponent({
  name: 'PlayerGrid',
  components: {
    PlayerTile
  },
  props: {
    players: {
      type: Array as () => PlayerScore[],
      required: true
    },
    gameId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { sortedPlayers, highestScore } = useScoreboard(props.players)
    return { sortedPlayers, highestScore }
  }
})
</script>