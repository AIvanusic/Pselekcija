<template>
  <div :style="backgroundStyle" class="fullscreen bg-image"></div>
  <div class="overlay">
    <div class="title-container" style="max-width: 800px; margin: auto">
      <q-card class="q-pa-lg bg-transparent text-yellow-1">
        <h1 class="naslov">Pselekcija</h1>
        <p class="podnaslov">Rješavanjem (ps)izbornika do idealne pasmine:</p>

        <!-- Veličina psa -->

        <q-card-section
          class="q-pa-md text-yellow-1"
          style="background-color: rgba(0, 128, 128, 0.3); max-width: 800px; margin: auto"
        >
          <p class="tekstSectiona">
            Jedna od osnovnih karakteristika koja se gleda kod izbora je veličina. Želite li većeg
            psa, unesite njegovu minimalnu veličinu:
          </p>

          <q-card-section>
            <div class="text-h10">Unesite podatke:</div>

            <q-card-actions align="center">
              <q-input
                v-model="minVisina"
                label="Minimalna visina (cm)"
                type="number"
                filled
                input-class="text-yellow-2 text-center"
                label-color="yellow-2"
                style="width: 250px; background-color: rgba(0, 128, 128, 0.5); border-radius: 20px"
              />
              <div class="q-px-md text-h8">ili</div>
              <q-input
                rounded
                outlined
                v-model="minTezina"
                label="Minimalna težina (kg)"
                type="number"
                filled
                input-class="text-yellow-2 text-center"
                label-color="yellow-2"
                style="width: 250px; background-color: rgba(0, 128, 128, 0.5); border-radius: 20px"
              />
            </q-card-actions>
          </q-card-section>
          <p class="tekstSectiona">
            Preferirate li sitnijeg dlakavog druga, unesite maksimalnu veličinu:
          </p>

          <q-card-section>
            <div class="text-h10">Unesite podatke:</div>

            <q-card-actions align="center">
              <q-input
                rounded
                outlined
                v-model="maxVisina"
                label="Maksimalna visina (cm)"
                type="number"
                filled
                input-class="text-yellow-2 text-center"
                label-color="yellow-2"
                style="width: 250px; background-color: rgba(0, 128, 128, 0.5); border-radius: 20px"
              />
              <div class="q-px-md text-h8">ili</div>
              <q-input
                v-model="maxTezina"
                label="   Maksimalna težina (kg)"
                type="number"
                filled
                input-class="text-yellow-1 text-center"
                label-color="yellow-2"
                style="width: 250px; background-color: rgba(0, 128, 128, 0.5); border-radius: 20px"
              />
            </q-card-actions>
          </q-card-section>
        </q-card-section>

        <!-- Linjanje -->
        <q-card-section>
          <q-card
            class="text-yellow-1 q-pa-md"
            style="background-color: rgba(0, 128, 128, 0.3); margin: auto; max-width: 800 px"
          >
            <q-card-section>
              <p class="tekstSectiona">
                Razmislite nadalje, koliko linjanja smatrate prihvatljivim? Uzmite u obzir svoj dom
                i okruženje, svoj životni stil. Opcije za odabir su:
              </p>

              <q-option-group
                v-model="odabranoLinjanje"
                :options="opcijeLinjanja"
                type="checkbox"
                color="yellow-2"
                text-color="yellow-1"
                class="q-ml-md"
              />
              <q-btn
                label="Potvrdi odabir"
                color="teal-6"
                text-color="yellow-1"
                unelevated
                class="q-mt-md"
                style="
                  width: 250px;
                  background-color: rgba(0, 128, 128, 0.5);
                  border-radius: 20px;
                  text-transform: none;
                "
              />
            </q-card-section>
          </q-card>
        </q-card-section>

        <!-- Njega dlake -->
        <q-card-section>
          <q-card class="bg-teal-6 text-yellow-1">
            <q-card-section>
              <p class="podnaslov">Njega dlake</p>
              <q-btn label="Odaberi" color="yellow-1" text-color="teal-6" unelevated />
            </q-card-section>
          </q-card>
        </q-card-section>

        <!-- Vladanje -->
        <q-card-section>
          <q-card class="bg-teal-6 text-yellow-1">
            <q-card-section>
              <p class="podnaslov">Vladanje</p>
              <q-btn label="Odaberi" color="yellow-1" text-color="teal-6" unelevated />
            </q-card-section>
          </q-card>
        </q-card-section>

        <!-- Energija -->
        <q-card-section>
          <q-card class="bg-teal-6 text-yellow-1">
            <q-card-section>
              <p class="podnaslov">Energija</p>
              <q-btn label="Odaberi" color="yellow-1" text-color="teal-6" unelevated />
            </q-card-section>
          </q-card>
        </q-card-section>

        <!-- Treniranje -->
        <q-card-section>
          <q-card class="bg-teal-6 text-yellow-1">
            <q-card-section>
              <p class="podnaslov">Treniranje</p>
              <q-btn label="Odaberi" color="yellow-1" text-color="teal-6" unelevated />
            </q-card-section>
          </q-card>
        </q-card-section>
      </q-card>
    </div>
  </div>

  <!-- HOME BUTTON -->

  <!--<q-page class="q-pa-md flex column items-center">
      <div class="absolute-right flex flex-center" style="top: 90%; transform: translateY(-50%)">-->
  <q-btn
    label="Povratak na glavnu stranicu"
    size="15px"
    round
    color="teal"
    icon="map"
    class="home-btn"
    @click="$router.push('/')"
  />
  <!--</div>
    </q-page>-->
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
  height: 100%;
  min-height: 100vh;
  background-attachment: fixed;
  z-index: -1;
}

.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.1);
  z-index: 1;
}

.title-container {
  position: absolute;
  top: 3%;
  left: 4%;
  z-index: 2;
  color: rgb(250, 250, 225);
}

.naslov {
  font-size: 5rem;
  font-weight: bolder;
  font-family: 'Georgia', sans-serif;
  margin: 0;
}

.podnaslov {
  font-size: 1.5rem;
  font-weight: normal;
  margin: 1rem 0 1rem 0;
  font-family: 'Georgia', sans-serif;
  color: rgb(250, 250, 225);
}

.tekstSectiona {
  font-size: 1.1rem;
  font-weight: normal;
  margin: 1rem 0 1rem 0;
  font-family: 'Georgia', sans-serif;
  color: rgb(250, 250, 225);
}

.q-input {
  font-size: 1.1rem;
  font-weight: normal;
  margin: 1rem 0 1rem 0;
  font-family: 'Georgia', sans-serif;
  color: rgb(250, 250, 225);
}

.q-btn {
  font-size: 1.1rem;
  font-weight: normal;
  margin: 1rem 0 1rem 0;
  font-family: 'Georgia', sans-serif;
  color: rgb(250, 250, 225);
}

.home-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}

.input-class {
  color: #fffde7 !important;
}
</style>

<script setup>
import { computed } from 'vue'
import { ref } from 'vue'

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

let currentIndex = localStorage.getItem('backgroundIndex')
currentIndex = currentIndex ? parseInt(currentIndex) : 0

const nextIndex = (currentIndex + 1) % slikePozadine.length
localStorage.setItem('backgroundIndex', nextIndex)

const backgroundStyle = computed(() => {
  return {
    backgroundImage: `url(src/assets/${slikePozadine[currentIndex]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
})

const odabranoLinjanje = ref([])

const opcijeLinjanja = [
  { label: 'Sezonski', value: 'Seasonal' },
  { label: 'Rijetko', value: 'Infrequent' },
  { label: 'Povremeno', value: 'Occasional' },
  { label: 'Redovito', value: 'Regularly' },
  { label: 'Učestalo', value: 'Frequent' },
  { label: 'Nema podataka', value: '0' },
]
</script>
