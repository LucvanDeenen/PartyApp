<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-data-table :headers="headers" :items="players" :search="search" item-key="id" class="pa-2 pt-6">
                    <template v-slot:top>
                        <div class="d-flex">
                            <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
                            <v-btn @click="fetchPlayers" color="primary" dark>
                                <v-icon>mdi-refresh</v-icon>
                            </v-btn>
                        </div>
                    </template>
                    <template v-slot:item.role="{ item }">
                        <v-chip :color="getRoleColor(item.role)" dark>{{ item.role }}</v-chip>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Player } from '@/types/game';
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
    name: 'UserManagement',
    data() {
        return {
            search: '',
            headers: [
                { text: 'Name', value: 'name' },
                { text: 'Role', value: 'role' }
            ]
        };
    },
    computed: {
        ...mapGetters('players', ['allPlayers']),
        players(): Player[] {
            return this.allPlayers as Player[];
        },
    },
    methods: {
        ...mapActions('players', ['fetchPlayers']),
        getRoleColor(role: string): string {
            switch (role) {
                case 'admin':
                    return 'red';
                case 'user':
                    return 'blue';
                case 'guest':
                    return 'green';
                default:
                    return 'grey';
            }
        }
    }
});
</script>
