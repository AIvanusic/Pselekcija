<template>
  <div :style="backgroundStyle" class="fullscreen bg-image">
    <div class="overlay"></div>
    <div class="title-container">
      <q-card class="q-pa-lg bg-transparent text-yellow-1">
        <h1 class="naslov">Pselekcija</h1>
        <p class="podnaslov">
          Kad srce želi najbolje za psa, <br />
          srce treba partnera u odabiru.
        </p>

        <q-card-section>
          <p class="podnaslov">Tražiš idealnog psa?</p>
          <q-btn
            icon="pets"
            label="Pomoć za odabir idealnih šapica"
            color="teal-6"
            unelevated
            text-color="yellow-1"
            size="lg"
            class="q-mb-md"
            @click="$router.push('/psizbornik')"
          />
        </q-card-section>

        <q-card-section>
          <p class="podnaslov">
            Već imaš psa? <br />
            Ovdje možeš pronaći korisne informacije.
          </p>
          <q-btn
            icon="info_outline"
            label="Psinformacije"
            color="teal-6"
            unelevated
            text-color="yellow-1"
            size="lg"
            @click="$router.push('/psinformacije')"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<style>
.bg-image {
  position: relative;
  background-size: cover;
  background-position: center;
  height: 100vh;
}

.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.2); /* bijela s 40% prozirnosti */
  z-index: 1;
}

/* Sve u .absolute-center ostaje iznad overlay-a */
.absolute-center {
  position: relative;
  z-index: 2;
}

.title-container {
  position: absolute;
  top: 3%;
  left: 4%;
  z-index: 2;
  color: rgb(250, 250, 225);
}

.naslov {
  font-size: 8rem;
  font-weight: bolder;
  font-family: 'Georgia', sans-serif;
  margin: 0;
}

.podnaslov {
  font-size: 2rem;
  font-weight: normal;
  margin: 1rem 0 2rem 0;
  font-family: 'Georgia', sans-serif;
  color: rgb(250, 250, 225);
}
</style>

<script setup>
//import { ref, computed } from 'vue'
import { computed } from 'vue'

// Lista slika
const slikePozadine = [
  'backgrounds/image1.jpg',
  'backgrounds/image2.jpg',
  'backgrounds/image3.jpeg',
  'backgrounds/image4.jpeg',
  'backgrounds/image5.jpeg',
  'backgrounds/image6.jpg',
  'backgrounds/image7.jpg',
  'backgrounds/image8.jpg',
  'backgrounds/image9.jpg',
  'backgrounds/image10.jpg',
  'backgrounds/image11.jpeg',
  'backgrounds/image12.jpg',
]

// Dohvaćam index iz localStorage za kružno pokretanje jedne po jedne slike za background ili stavi na 0
let currentIndex = localStorage.getItem('backgroundIndex')
currentIndex = currentIndex ? parseInt(currentIndex) : 0

// Povećavam index za sljedeći put kako bi mi se slike prikazivale kružno
const nextIndex = (currentIndex + 1) % slikePozadine.length
localStorage.setItem('backgroundIndex', nextIndex)

// Definiram pozadinu
const backgroundStyle = computed(() => {
  return {
    backgroundImage: `url(src/assets/${slikePozadine[currentIndex]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
})
</script>
