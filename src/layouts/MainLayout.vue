<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="prilagodeniHeader">
      <q-toolbar>
        <q-toolbar-title> Pselekcija (Quasar App) </q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style>
.prilagodeniHeader {
  background-color: #004d40; /*teal-10*/
  color: 250, 250, 225; /* boja teksta yellow-1*/
}
</style>

<script setup>
//import { ref } from 'vue'
//import EssentialLink from 'components/EssentialLink.vue'
</script>
