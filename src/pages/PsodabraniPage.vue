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

      <q-card class="q-pa-md odabrani-card">
        <q-card-section class="text-left">
          <p class="tekstPopisa">Pasmine koje ispunjavaju Vaše kriterije:</p>
          <q-card-section>
            <div class="tekstPopisa" v-if="rezultatiPasmina.length">
              <ul>
                <li v-for="(pas, index) in rezultatiPasmina" :key="index" class="q-my-sm">
                  <div
                    @click="promjeneKliknutihPasmina(pas)"
                    style="cursor: pointer; font-weight: bold"
                  >
                    {{ index + 1 }}. {{ pas.nazivHR }} (engl.: {{ pas.nazivEN }})
                  </div>

                  <q-slide-transition>
                    <div
                      v-if="kliknutaPasmina === pas"
                      class="q-pa-md bg-white text-teal-10"
                      style="border-radius: 8px; margin-top: 4px"
                    >
                      <!-- Slike -->
                      <div class="q-gutter-sm row wrap justify-center">
                        <!--<q-img
                          v-for="n in 3"
                          :key="n"
                          :src="`/Slike_Pasmine_Optimizirane/${pas.id}/${pas.id}_${n}.jpg`"
                          style="
                            width: 350px;
                            object-fit: contain;
                            background-color: #eee;
                          "
                          :alt="`Slika pasmine ${pas.nazivHR}`"
                        />-->
                        <img
                          v-for="n in 3"
                          :key="n"
                          :src="`/Slike_Pasmine_Optimizirane/${pas.id}/${pas.id}_${n}.jpg`"
                          :alt="`Slika pasmine ${pas.nazivHR}`"
                          @error="
                            (event) =>
                              (event.target.src = '/Slike_Pasmine_Optimizirane/NedostajeSlika.jpg')
                          "
                          style="width: 330px; object-fit: contain"
                        />
                      </div>
                      <!-- više informacija o pasmini -->
                      <p><strong>Opis:</strong> {{ pas.opis }}</p>
                      <p><strong>Skupina:</strong> {{ pas.skupina }}</p>
                      <p><strong>Visina:</strong> {{ pas.minVisina }}–{{ pas.maxVisina }} cm</p>
                      <p><strong>Težina:</strong> {{ pas.minTezina }}–{{ pas.maxTezina }} kg</p>
                      <p><strong>Linjanje:</strong> {{ pas.linjanje }}</p>
                      <p><strong>Njega:</strong> {{ pas.njega }}</p>
                      <p><strong>Energija:</strong> {{ pas.energija }}</p>
                      <p><strong>Trening:</strong> {{ pas.trening }}</p>
                      <p><strong>Vladanje:</strong> {{ pas.vladanje }}</p>
                      <p><strong>Temperament:</strong> {{ pas.Temperament }}</p>
                      <p><strong>Životni vijek:</strong> {{ pas.MinAge }}–{{ pas.MaxAge }} god</p>
                      <q-btn
                        label="Pronađi uzgajivačnice"
                        color="teal"
                        class="q-mt-md"
                        @click="pronadiUzgajivacnice(pas)"
                      />

                      <div v-if="uzgajivacnicePasmina[pas.nazivEN]" class="q-mt-md">
                        <div v-if="uzgajivacnicePasmina[pas.nazivEN].length">
                          <p><strong>Uzgajivačnice:</strong></p>
                          <ul>
                            <li v-for="(uzg, idx) in uzgajivacnicePasmina[pas.nazivEN]" :key="idx">
                              {{ uzg.naziv }} — {{ uzg.adresa }}
                            </li>
                          </ul>
                        </div>
                        <div v-else>
                          <p><em>Nema pronađenih uzgajivačnica u Europi za ovu pasminu.</em></p>
                        </div>
                      </div>
                      <!-- treba obraditi slike koje će se prikazivati odmah s podacima -->
                    </div>
                  </q-slide-transition>
                </li>
              </ul>
            </div>
            <div v-else>
              <p>Nažalost, nema pasmina koje odgovaraju Vašim kriterijima.</p>
            </div>
          </q-card-section>
          <!--<q-btn
            label="Pogledajte više - privremeno ovdje - ide svakom izboru svoj"
            color="teal-6"
            text-color="yellow-1"
            unelevated
            class="q-mt-md"
            style="
              width: 250px;
              background-color: rgba(0, 128, 128, 0.5);
              border-radius: 20px;
              border: 2px solid rgba(255, 255, 255, 0.4);
              box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
              color: #fffde7;
              text-transform: none;
            "
          />-->
          <!--svaka pasmina će dobiti svoj q-btn za pregled više informacija-->
        </q-card-section>
      </q-card>
      <q-card-section>
        <p class="tekstSectiona">Želite li promijeniti parametre pretrage?</p>
        <q-btn
          icon="pets"
          label="Pokušat ću ponovo."
          color="teal-6"
          unelevated
          text-color="yellow-1"
          size="lg"
          class="q-mb-md"
          @click="$router.push('/psizbornik')"
          style="text-transform: none"
        />
      </q-card-section>
    </q-card>
  </div>

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
  position: fixed;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.2);
  z-index: 0; /* treba ostati UVIJEK ispod sadržaja */
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

.odabrani-card {
  position: relative;
  width: 1400px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
  color: #fffde7;
  text-align: center;
  font-size: 1.2rem;
  font-weight: normal;
  z-index: 10;
}

.tekstSectiona {
  font-size: 1.1rem;
  font-weight: normal;
  margin: 1rem 0 1rem 0;
  font-family: 'Georgia', sans-serif;
  color: #fffde7;
}

.tekstPopisa {
  font-size: 1.1rem;
  font-weight: normal;
  margin: 1rem 0 1rem 0;
  font-family: 'Georgia', sans-serif;
  color: #17564c;
}
</style>

<script setup>
import { computed } from 'vue'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { watch } from 'vue'

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
  'image13.jpg',
  'image14.jpg',
  'image15.jpg',
  'image16.jpg',
  'image17.jpg',
]

// Dohvaćam index iz localStorage za kružno pokretanje jedne po jedne slike za background ili stavi na 0
let currentIndex = localStorage.getItem('backgroundIndex')
currentIndex = currentIndex ? parseInt(currentIndex) : 0

// Povećavam index za sljedeći put kako bi mi se slike prikazivale kružno
const nextIndex = (currentIndex + 1) % slikePozadine.length
localStorage.setItem('backgroundIndex', nextIndex)

// Definiram pozadinu
const backgroundStyle = computed(() => {
  const slika = slikePozadine[currentIndex] || 'image1.jpg'
  return {
    backgroundImage: `url(/backgrounds/${slika})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
})

//radim s prikazom pasmina odabranih po parametrima
const rezultatiPasmina = ref([])
const kliknutaPasmina = ref(null)

onMounted(() => {
  const spremljeni = localStorage.getItem('rezultatiPasmina')
  if (spremljeni) {
    rezultatiPasmina.value = JSON.parse(spremljeni)
  }
})

//uređujem mogućnosti prelaska između prikaza kliknutih pasmina
function promjeneKliknutihPasmina(pas) {
  kliknutaPasmina.value = kliknutaPasmina.value === pas ? null : pas
}

// prikaz uzgajivačnica u q-slideu odabrane pasmine
const uzgajivacnicePasmina = ref({})

async function pronadiUzgajivacnice(pas) {
  try {
    const response = await fetch(
      `http://localhost:3000/psodabraniUzgajivacnice?pasmina=${encodeURIComponent(pas.nazivEN)}`,
    )
    const data = await response.json()
    uzgajivacnicePasmina.value[pas.nazivEN] = data
  } catch (error) {
    console.error('Greška pri dohvaćanju uzgajivačnica:', error)
    uzgajivacnicePasmina.value[pas.nazivEN] = [] // da barem prikaže "nema rezultata"
  }
}

watch(rezultatiPasmina, (novi) => {
  console.log('Rezultati u frontendu:', novi.slice(0, 3))
})
</script>
