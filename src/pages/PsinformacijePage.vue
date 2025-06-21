<template>
  <div :style="backgroundStyle" class="fullscreen bg-image"></div>
  <div class="overlay"></div>
  <div class="title-container">
    <q-card class="q-pa-lg bg-transparent text-yellow-1">
      <h1 class="naslov">Pselekcija</h1>
      <p class="podnaslov">
        Odabrali ste doći na stranicu koja zna da ste svojega najboljeg prijatelja već sreli. <br />
        Sada zajedno možete pogledati kakve smo informacije prepoznali kao važne i korisne.
      </p>

      <q-card-section>
        <p class="podnaslov">Veterinarske stanice</p>
        <div class="row items-center q-gutter-sm">
          <q-input
            class="q-mt-sm"
            v-model="grad"
            label="Unesite grad"
            filled
            input-class="text-yellow-2 text-center"
            label-color="yellow-2"
            style="
              height: 56px;
              background-color: rgba(0, 128, 128, 0.5);
              border-radius: 20px;
              border: 1px solid rgba(255, 255, 255, 0.4);
            "
          />

          <q-btn
            icon="search"
            label="Pretraži veterinarske stanice"
            unelevated
            text-color="yellow-2"
            size="lg"
            @click="pretraziVeterinare"
            style="
              height: 56px;
              background-color: rgba(0, 128, 128, 0.5);
              border-radius: 20px;
              border: 1px solid rgba(255, 255, 255, 0.4);
            "
          />
          <q-list v-if="veterinarskeStanice.length">
            <q-item v-for="(vet, index) in veterinarskeStanice" :key="index">
              <q-item-section>
                <q-item-label
                  ><strong>{{ vet.naziv }}</strong></q-item-label
                >
                <q-item-label caption>
                  {{ vet.adresa }}<br />
                  <span v-if="vet.udaljenost">Udaljenost: {{ Math.round(vet.udaljenost) }} m</span>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>

      <q-card-section class="text-center q-my-md">
        <div class="row justify-center no-wrap" style="flex-wrap: wrap; overflow: hidden">
          <q-icon v-for="i in 50" :key="i" name="pets" color="teal-6" size="14px" class="q-mx-xs" />
        </div>
      </q-card-section>

      <q-card-section>
        <p class="podnaslov">Trgovine s hranom i opremom za kućne ljubimce</p>

        <div class="row items-center q-gutter-sm">
          <q-input
            class="q-mt-sm"
            v-model="grad"
            label="Unesite grad"
            filled
            input-class="text-yellow-2 text-center"
            label-color="yellow-2"
            style="
              height: 56px;
              background-color: rgba(0, 128, 128, 0.5);
              border-radius: 20px;
              border: 1px solid rgba(255, 255, 255, 0.4);
            "
          />

          <q-btn
            icon="search"
            label="Pretraži trgovine s opremom i hranom za pse"
            unelevated
            text-color="yellow-2"
            size="lg"
            @click="pretraziPetShops"
            style="
              height: 56px;
              background-color: rgba(0, 128, 128, 0.5);
              border-radius: 20px;
              border: 1px solid rgba(255, 255, 255, 0.4);
            "
          />
          <q-list v-if="petShops.length">
            <q-item v-for="(shop, index) in petShops" :key="index">
              <q-item-section>
                <q-item-label
                  ><strong>{{ shop.naziv }}</strong></q-item-label
                >
                <q-item-label caption>
                  {{ shop.adresa }}<br />
                  <span v-if="shop.udaljenost"
                    >Udaljenost: {{ Math.round(shop.udaljenost) }} m</span
                  >
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>

      <q-card-section class="text-center q-my-md">
        <div class="row justify-center no-wrap" style="flex-wrap: wrap; overflow: hidden">
          <q-icon v-for="i in 50" :key="i" name="pets" color="teal-6" size="14px" class="q-mx-xs" />
        </div>
      </q-card-section>

      <q-card-section>
        <p class="podnaslov">Plaže za pse</p>
        <div class="row items-center q-gutter-sm">
          <q-input
            class="q-mt-sm"
            v-model="grad"
            label="Unesite grad"
            filled
            input-class="text-yellow-2 text-center"
            label-color="yellow-2"
            style="
              height: 56px;
              background-color: rgba(0, 128, 128, 0.5);
              border-radius: 20px;
              border: 1px solid rgba(255, 255, 255, 0.4);
            "
          />

          <q-btn
            icon="search"
            label="Pretraži plaže za pse"
            unelevated
            text-color="yellow-2"
            size="lg"
            @click="pretraziPlaze"
            style="
              height: 56px;
              background-color: rgba(0, 128, 128, 0.5);
              border-radius: 20px;
              border: 1px solid rgba(255, 255, 255, 0.4);
            "
          />
          <q-list v-if="dogBeach.length">
            <q-item v-for="(beach, index) in dogBeach" :key="index">
              <q-item-section>
                <q-item-label
                  ><strong>{{ beach.naziv }}</strong></q-item-label
                >

                <q-item-label caption>
                  {{ beach.adresa }}<br />
                  <span v-if="beach.udaljenost"
                    >Udaljenost: {{ Math.round(beach.udaljenost) }} m</span
                  >
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>

      <q-card-section class="text-center q-my-md">
        <div class="row justify-center no-wrap" style="flex-wrap: wrap; overflow: hidden">
          <q-icon v-for="i in 50" :key="i" name="pets" color="teal-6" size="14px" class="q-mx-xs" />
        </div>
      </q-card-section>

      <q-card-section>
        <p class="podnaslov">Parkovi za pse</p>
        <div class="row items-center q-gutter-sm">
          <q-input
            class="q-mt-sm"
            v-model="grad"
            label="Unesite grad"
            filled
            input-class="text-yellow-2 text-center"
            label-color="yellow-2"
            style="
              height: 56px;
              background-color: rgba(0, 128, 128, 0.5);
              border-radius: 20px;
              border: 1px solid rgba(255, 255, 255, 0.4);
            "
          />

          <q-btn
            icon="search"
            label="Pretraži parkove za pse"
            unelevated
            text-color="yellow-2"
            size="lg"
            @click="pretraziParkove"
            style="
              height: 56px;
              background-color: rgba(0, 128, 128, 0.5);
              border-radius: 20px;
              border: 1px solid rgba(255, 255, 255, 0.4);
            "
          />
          <q-list v-if="dogPark.length">
            <q-item v-for="(shop, index) in dogPark" :key="index">
              <q-item-section>
                <q-item-label
                  ><strong>{{ shop.naziv }}</strong></q-item-label
                >
                <q-item-label caption>
                  {{ shop.pozicija.lat }}, {{ shop.pozicija.lon }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>

      <q-card-section class="text-center q-my-md">
        <div class="row justify-center no-wrap" style="flex-wrap: wrap; overflow: hidden">
          <q-icon v-for="i in 50" :key="i" name="pets" color="teal-6" size="14px" class="q-mx-xs" />
        </div>
      </q-card-section>

      <q-card-section>
        <p class="podnaslov">Saloni za uređenje ljubimaca</p>
        <div class="row items-center q-gutter-sm">
          <q-input
            class="q-mt-sm"
            v-model="grad"
            label="Unesite grad"
            filled
            input-class="text-yellow-2 text-center"
            label-color="yellow-2"
            style="
              height: 56px;
              background-color: rgba(0, 128, 128, 0.5);
              border-radius: 20px;
              border: 1px solid rgba(255, 255, 255, 0.4);
            "
          />

          <q-btn
            icon="search"
            label="Pretraži salone za uređenje"
            unelevated
            text-color="yellow-2"
            size="lg"
            @click="pretraziSalone"
            style="
              height: 56px;
              background-color: rgba(0, 128, 128, 0.5);
              border-radius: 20px;
              border: 1px solid rgba(255, 255, 255, 0.4);
            "
          />
          <q-list v-if="dogSalon.length">
            <q-item v-for="(salon, index) in dogSalon" :key="index">
              <q-item-section>
                <q-item-label
                  ><strong>{{ salon.naziv }}</strong></q-item-label
                >
                <q-item-label caption>
                  {{ salon.adresa }}<br />
                  <span v-if="salon.udaljenost">
                    Udaljenost: {{ (salon.udaljenost / 1000).toFixed(1) }} km
                  </span>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>

      <q-card-section class="text-center q-my-md">
        <div class="row justify-center no-wrap" style="flex-wrap: wrap; overflow: hidden">
          <q-icon v-for="i in 50" :key="i" name="pets" color="teal-6" size="14px" class="q-mx-xs" />
        </div>
      </q-card-section>

      <!--<q-card-section>
        <p class="podnaslov">Razno</p>
        <div class="row items-center q-gutter-sm">
          <q-input
            class="q-mt-sm"
            v-model="grad"
            label="Unesite grad"
            filled
            input-class="text-yellow-2 text-center"
            label-color="yellow-2"
            style="
              height: 56px;
              background-color: rgba(0, 128, 128, 0.5);
              border-radius: 20px;
              border: 1px solid rgba(255, 255, 255, 0.4);
            "
          />

          <q-btn
            icon="search"
            label="Pretraži"
            unelevated
            text-color="yellow-2"
            size="lg"
            @click="pretraziUsluge"
            style="
              height: 56px;
              background-color: rgba(0, 128, 128, 0.5);
              border-radius: 20px;
              border: 1px solid rgba(255, 255, 255, 0.4);
            "
          />
        </div>
      </q-card-section>-->
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

.q-input {
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
</style>

<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import axios from 'axios'

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

const grad = ref('')
const veterinarskeStanice = ref([])

async function pretraziVeterinare() {
  if (!grad.value) {
    alert('Molimo unesite grad.')
    return
  }

  try {
    const response = await axios.get('http://localhost:3000/veterinari', {
      params: { grad: grad.value },
    })

    veterinarskeStanice.value = response.data
    console.log('Dobiveni rezultati:', response.data)
  } catch (error) {
    console.error('Greška pri dohvaćanju veterinarskih stanica:', error)
    alert(
      'Neuspješan dohvat podataka. Provjerite je li uneseno ime grada i imate li internetsku vezu.',
    )
  }
}

const petShops = ref([])

async function pretraziPetShops() {
  if (!grad.value) {
    alert('Molimo unesite grad.')
    return
  }

  try {
    const response = await axios.get('http://localhost:3000/petShops', {
      params: { grad: grad.value },
    })

    petShops.value = response.data
    console.log('Dobiveni rezultati:', response.data)
  } catch (error) {
    console.error('Greška:', error.response?.data || error.message)
    alert(error.response?.data?.error || 'Neuspješan dohvat podataka.')
  }
}

//Plaže za pse
const dogBeach = ref([])

async function pretraziPlaze() {
  if (!grad.value) {
    alert('Molimo unesite grad.')
    return
  }

  try {
    const response = await axios.get('http://localhost:3000/dogBeach', {
      params: { grad: grad.value },
    })

    dogBeach.value = response.data
    console.log('Dobiveni rezultati:', response.data)
  } catch (error) {
    console.error('Greška:', error.response?.data || error.message)
    alert(error.response?.data?.error || 'Neuspješan dohvat podataka.')
  }
}

//Parkovi za pse
const dogPark = ref([])

async function pretraziParkove() {
  if (!grad.value) {
    alert('Molimo unesite grad.')
    return
  }

  try {
    const response = await axios.get('http://localhost:3000/dogPark', {
      params: { grad: grad.value },
    })

    dogPark.value = response.data
    console.log('Dobiveni rezultati:', response.data)
  } catch (error) {
    console.error('Greška:', error.response?.data || error.message)
    alert(error.response?.data?.error || 'Neuspješan dohvat podataka.')
  }
}

//Saloni za pse
const dogSalon = ref([])

async function pretraziSalone() {
  if (!grad.value) {
    alert('Molimo unesite grad.')
    return
  }

  try {
    const response = await axios.get('http://localhost:3000/dogSalon', {
      params: { grad: grad.value },
    })

    dogSalon.value = response.data
    console.log('Dobiveni rezultati:', response.data)
  } catch (error) {
    console.error('Greška:', error.response?.data || error.message)
    alert(error.response?.data?.error || 'Neuspješan dohvat podataka.')
  }
}
</script>
