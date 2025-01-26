<template>
    <page-container>
        <v-container class="d-flex flex-wrap" fluid>
            <v-card class="games ma-2 d-flex justify-center align-center" :href="'/games/' + game.name.toLowerCase()"
                link :image="game.img" v-for="(game, key) in games" :key="key">
                <v-card-title>{{ game.name }}</v-card-title>
            </v-card>
        </v-container>
    </page-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sjoelen from '@/assets/sjoelen.jpeg'
import music from '@/assets/music.jpeg'

export default defineComponent({
    name: 'Games-Home',
    data() {
        return {
            games: [
                { name: 'Sjoelen', img: sjoelen },
                { name: 'Music', img: music }
            ],
        }
    }
})
</script>

<style scoped>
.games {
    min-width: 200px;
    min-height: 200px;
    filter: grayscale(100%);
    transition: filter 0.3s;
}

.games:hover {
    filter: grayscale(0%);
}
</style>