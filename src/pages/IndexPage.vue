<template>
  <div :style="backgroundStyle" class="fullscreen bg-image"></div>
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
  position: fixed;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.2);
  z-index: 0; /* ispod sadržaja */
  pointer-events: none;
}

/* Sve u .absolute-center ostaje iznad overlay-a */
.absolute-center {
  position: relative;
  z-index: 2;
}

.title-container {
  position: relative;
  top: 3%;
  left: 4%;
  z-index: 1;
  color: rgb(250, 250, 225);
  pointer-events: auto;
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
</script>
