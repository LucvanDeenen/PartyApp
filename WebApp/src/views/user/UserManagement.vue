<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-data-table :headers="headers" :items="players" :search="search" item-key="id" class="pa-2 pt-6"
                    :loading="isLoading">
                    <template v-slot:top>
                        <h2 class="pb-4 px-4"><v-icon class="mr-2 mb-1">mdi-account</v-icon>User Management</h2>
                        <div class="d-flex">
                            <v-text-field variant="outlined" density="compact" v-model="search" label="Search"
                                class="search-bar mx-4">
                                <template v-slot:append>
                                    <v-icon :disabled="refreshed" @click="fetchPlayers">mdi-refresh</v-icon>
                                </template>
                            </v-text-field>
                        </div>
                    </template>
                    <template v-slot:item.role="{ item }">
                        <v-chip :color="getRoleColor(item.role)" dark>{{ item.role }}</v-chip>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon @click="deletePlayer(item.id)">mdi-delete</v-icon>
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
            refreshed: false,
            headers: [
                { title: 'Role', value: 'role', align: 'start', sortable: true, width: '100px' },
                { title: 'Name', value: 'name', align: 'start', sortable: true },
                { title: 'Actions', value: 'actions', align: 'center', sortable: false, width: '50px' }
            ]
        };
    },
    computed: {
        ...mapGetters('players', ['allPlayers', 'isLoading']),
        players(): Player[] {
            return this.allPlayers as Player[];
        },
    },
    methods: {
        ...mapActions('players', ['subscibeToPlayers', 'deletePlayer']),
        fetchPlayers() {
            this.subscibeToPlayers();
            this.refreshed = true;
        },
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