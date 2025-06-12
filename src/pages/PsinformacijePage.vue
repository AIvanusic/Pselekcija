<template>
  <q-page class="q-pa-md">
    <q-card
      class="q-pa-md bg-teal-6 text-yellow-1"
      style="max-width: 800px; margin: auto; align-content: first baseline"
    >
      <q-card-section>
        <div class="text-h6">Unesi podatke:</div>
      </q-card-section>
      <q-card-actions>
        <q-input v-model="minVisina" label="Minimalna visina (cm)" type="number" filled dense />
        <div class="text-h8">ili</div>
        <q-input v-model="minTezina" label="Minimalna težina (kg)" type="number" filled dense />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const minVisina = ref('')
const minTezina = ref('')
</script>
