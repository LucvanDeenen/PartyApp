<template>
  <v-list class="scoreboard-list">
    <v-list-item v-for="playerDetails in sortedPlayers" :key="playerDetails.player.id"
      :class="getPlayerClass(playerDetails)">
      <player-score-row :player-details="playerDetails" :is-leader="playerDetails.score === highestScore"
        :game-id="gameId" />
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PlayerScore } from '../../types/game'
import PlayerScoreRow from './PlayerScoreRow.vue'
import { useScoreboard } from '../../composables/useScoreboard'

export default defineComponent({
  name: 'GameScoreboard',
  components: {
    PlayerScoreRow
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
    const { sortedPlayers, highestScore, getPlayerClass } = useScoreboard(props.players)
    return { sortedPlayers, highestScore, getPlayerClass }
  }
})
</script>

<style scoped>
.scoreboard-list {
  height: 100%;
  background: transparent;
}

.leader {
  background-color: rgba(255, 193, 7, 0.1);
}
</style>