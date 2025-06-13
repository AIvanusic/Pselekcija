<template>
  <div :style="backgroundStyle" class="fullscreen bg-image"></div>
  <div class="overlay"></div>
  <q-card
    class="q-pa-md"
    style="background-color: rgba(255, 255, 255, 0.1); max-width: auto; color: purple"
  >
    <q-card-section>
      <p>Testiramo stranicu</p>
    </q-card-section>
  </q-card>

  <!-- HOME BUTTON -->
  <q-btn
    label="Povratak na glavnu stranicu"
    size="15px"
    round
    color="teal"
    icon="map"
    class="home-btn"
    @click="$router.push('/')"
  />
</template>

<style>
.bg-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  z-index: -1;
}

.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.1);
  z-index: 1;
  pointer-events: none;
}

.home-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}
</style>

<script setup>
//import { computed } from 'vue'
import { ref, onMounted } from 'vue'

// Lista slika
const slikePozadine = [
  'image1.jpg',
  'image2.jpg',
  'image3.jpeg',
  'image4.jpeg',
  'image5.jpeg',
  'image6.jpg',
  'image7.jpg',
  'image8.jpg',
  'image9.jpg',
  'image10.jpg',
  'image11.jpeg',
  'image12.jpg',
]

// ref koji obuhvaća stil pozadine
const backgroundStyle = ref({})

// nasumični odabir slika pozadine iz mape public/backgrounds
onMounted(() => {
  const index = Math.floor(Math.random() * slikePozadine.length)
  const slika = slikePozadine[index] || 'image1.jpg'
  backgroundStyle.value = {
    backgroundImage: `url(/backgrounds/${slika})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
})

// Povećavam index za sljedeći put kako bi mi se slike prikazivale kružno
//const nextIndex = (currentIndex + 1) % slikePozadine.length
//localStorage.setItem('backgroundIndex', nextIndex)

// Definiram pozadinu
//const slika = slikePozadine[currentIndex] || 'image1.jpg'
//backgroundStyle.value = {
//backgroundImage: `url(/backgrounds/${slika})`,
//backgroundSize: 'cover',
//backgroundPosition: 'center',
//}
//})
</script>
