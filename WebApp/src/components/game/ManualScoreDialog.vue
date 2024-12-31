<template>
  <v-dialog v-model="dialog" max-width="300">
    <v-card>
      <v-card-title class="text-h6 pa-4">
        Adjust Score
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            v-model="newScore"
            label="Score"
            type="number"
            variant="outlined"
            density="comfortable"
            :rules="[v => !isNaN(Number(v)) || 'Must be a number']"
            autofocus
            hide-details="auto"
          ></v-text-field>
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
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ManualScoreDialog',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    currentScore: {
      type: Number,
      required: true
    }
  },
  emits: ['update:show', 'save'],
  data() {
    return {
      dialog: this.show,
      newScore: this.currentScore.toString(),
      loading: false
    }
  },
  computed: {
    isValid(): boolean {
      const num = Number(this.newScore)
      return !isNaN(num) && num >= 0
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
    },
    async handleSubmit() {
      if (!this.isValid) return

      try {
        this.loading = true
        const newScore = Number(this.newScore)
        await this.$emit('save', newScore)
        this.closeDialog()
      } finally {
        this.loading = false
      }
    }
  }
})
</script>