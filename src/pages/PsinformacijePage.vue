<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-pa-md flex column items-center">
        <div class="absolute-right flex flex-center" style="top: 90%; transform: translateY(-50%)">
          <q-btn
            label="Povratak na glavnu stranicu"
            size="15px"
            round
            color="teal"
            icon="map"
            @click="$router.push('/')"
          />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
//
</script>
