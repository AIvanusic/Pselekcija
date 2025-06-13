<template>
  <div :style="backgroundStyle" class="fullscreen bg-image"></div>
  <div class="overlay"></div>
  <p>test</p>
  <div class="row">
    <div class="col-12 col-md-8">
      <div class="title-container" style="max-width: 800px; margin: auto">
        <q-card class="q-pa-md bg-transparent text-yellow-1">
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
                  style="
                    width: 250px;
                    background-color: rgba(0, 128, 128, 0.5);
                    border-radius: 20px;
                  "
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
                  style="
                    width: 250px;
                    background-color: rgba(0, 128, 128, 0.5);
                    border-radius: 20px;
                  "
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
                  style="
                    width: 250px;
                    background-color: rgba(0, 128, 128, 0.5);
                    border-radius: 20px;
                  "
                />
                <div class="q-px-md text-h8">ili</div>
                <q-input
                  v-model="maxTezina"
                  label="   Maksimalna težina (kg)"
                  type="number"
                  filled
                  input-class="text-yellow-1 text-center"
                  label-color="yellow-2"
                  style="
                    width: 250px;
                    background-color: rgba(0, 128, 128, 0.5);
                    border-radius: 20px;
                  "
                />
                <!--<q-btn
                  label="Potvrdite odabir"
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
                />-->
              </q-card-actions>
            </q-card-section>
          </q-card-section>

          <!-- Linjanje -->
          <q-card-section>
            <q-card
              class="text-yellow-1 q-pa-md"
              style="background-color: rgba(0, 128, 128, 0.3); margin: auto; max-width: 800px"
            >
              <q-card-section>
                <p class="tekstSectiona">
                  Ne nosimo se svi s psećim dlakama jednako pa razmislite nadalje, koliko linjanja
                  smatrate prihvatljivim? <br />Uzmite u obzir svoj dom i okruženje, svoj životni
                  stil. Opcije za odabir su:
                </p>

                <q-option-group
                  v-model="odabranoLinjanje"
                  :options="opcijeLinjanja"
                  type="checkbox"
                  color="yellow-2"
                  text-color="yellow-1"
                  class="q-ml-md"
                />
                <!--<q-btn
                  label="Potvrdite odabir"
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
                />-->
              </q-card-section>
            </q-card>
          </q-card-section>

          <!-- Njega dlake -->
          <q-card-section>
            <q-card
              class="text-yellow-1 q-pa-md"
              style="background-color: rgba(0, 128, 128, 0.3); margin: auto; max-width: 800px"
            >
              <q-card-section>
                <p class="tekstSectiona">
                  S obzirom na tip i dužinu dlake i kože, različitim je psima potrebna različita
                  razina njege. <br />
                  Koliko ste u mogućnosti odvojiti vremena za njegovanje Vašeg novog ljubimca?
                </p>

                <q-option-group
                  v-model="odabranaNjega"
                  :options="opcijeNjege"
                  type="checkbox"
                  color="yellow-2"
                  text-color="yellow-1"
                  class="q-ml-md"
                />
                <!--<q-btn
                  label="Potvrdite odabir"
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
                />-->
              </q-card-section>
            </q-card>
          </q-card-section>

          <!-- Energija -->
          <q-card-section>
            <q-card
              class="text-yellow-1 q-pa-md"
              style="background-color: rgba(0, 128, 128, 0.3); margin: auto; max-width: 800px"
            >
              <q-card-section>
                <p class="tekstSectiona">
                  Psi su živa bića. Imaju svoj temperament i sa sobom donose određenu energiju.
                  Prednost odabira pasminskog psa je poznavanje njihovih karakteristika. Znamo koju
                  razine energije možemo očekivati od psa čiji su preci generacijama birani da bi
                  stvorili potomka kakvog upravo izabirete. <br />
                  Tu prednost pametno je iskoristiti, a ne psa odabrati samo temeljem izgleda.
                  <br />
                  U nastavku, molim Vas, prepoznajte s kakvim biste ljubimcem voljeli dijeliti svoju
                  svakodnevicu:
                </p>

                <q-option-group
                  v-model="odabranaEnergija"
                  :options="opcijeEnergije"
                  type="checkbox"
                  color="yellow-2"
                  text-color="yellow-1"
                  class="q-ml-md"
                />
                <!--<q-btn
                  label="Potvrdite odabir"
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
                />-->
              </q-card-section>
            </q-card>
          </q-card-section>
        </q-card>

        <!-- Treniranje -->
        <q-card-section>
          <q-card
            class="text-yellow-1 q-pa-md"
            style="background-color: rgba(0, 128, 128, 0.3); margin: auto; max-width: 800px"
          >
            <q-card-section>
              <p class="tekstSectiona">
                Vjerujemo da će Vaš pas u vama naći odličnog partnera za ležanje na plaži i gledanje
                zvježđa, kao i za duge šetnje, puno igre... <br />
                No, vjerujemo da svojega psa želite i odgojiti, a možda i naučiti nešto više od
                osnova lijepog ponašanja. <br />
                Stoga, molimo Vas, odaberite s kakvim psom želite raditi i učiti:
              </p>

              <q-option-group
                v-model="odabraniTrening"
                :options="opcijeTreninga"
                type="checkbox"
                color="yellow-2"
                text-color="yellow-1"
                class="q-ml-md"
              />
              <!--<q-btn
                label="Potvrdite odabir"
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
              />-->
            </q-card-section>
          </q-card>
        </q-card-section>
      </div>
    </div>

    <div class="col-12 col-md-4">
      <q-card class="q-pa-md pregled-card">
        <q-card-section>
          <p class="text-h5">Provjerite ovdje svoj izbor</p>
          <p class="tekstPregleda">
            Hvala što koristite ovu uslugu.<br />
            Na temelju Vaših odgovora, preporučujemo psa
            <strong>{{ opisVelicine }}</strong
            >,<br />
            koji se linja: <strong>{{ LinjanjeTekst || 'nije odabrano' }}</strong
            >,<br />
            kojem možete posvetiti njegu: <strong>{{ njegaDlakeTekst || 'nije odabrano' }}</strong
            >,<br />
            s razinom energije: <strong>{{ energijaTekst || 'nije odabrano' }}</strong
            ><br />
            i karakteristikama za treniranje:
            <strong>{{ treniranjeTekst || 'nije odabrano' }}</strong
            >.
          </p>
          <q-btn
            label="Ako ste odabrali - idemo vidjeti koja su pasmine pasa idealne za Vas"
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
            @click="posaljiIzbore"
          />
        </q-card-section>
      </q-card>
    </div>
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

.title-container {
  position: absolute;
  top: 10%;
  left: 4%;
  z-index: 10;
  color: rgb(250, 250, 225);
  pointer-events: auto;
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

.pregled-card {
  position: fixed;
  top: 10%;
  right: 120px;
  margin-left: 10px;
  width: 600px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
  color: #17564c;
  text-align: center;
  font-size: 1.2rem;
  font-weight: normal;
  z-index: 10;
}

.tekstPregleda {
  font-size: 1.1rem;
  font-weight: normal;
  margin: 1rem 0 1rem 0;
  font-family: 'Georgia', sans-serif;
  color: #17564c;
}
</style>

<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

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

// Veličina psa

const minVisina = ref('')
const maxVisina = ref('')
const minTezina = ref('')
const maxTezina = ref('')

const opisVelicine = computed(() => {
  const elementiVelicine = []

  if (minVisina.value) elementiVelicine.push(`viši od ${minVisina.value} cm`)
  if (minTezina.value) elementiVelicine.push(`teži od ${minTezina.value} kg`)
  if (maxVisina.value) elementiVelicine.push(`niži od ${maxVisina.value} cm`)
  if (maxTezina.value) elementiVelicine.push(`lakši od ${maxTezina.value} kg`)

  return elementiVelicine.length ? `koji je ${elementiVelicine.join(', ')}` : '...'
})

// Linjanje
const odabranoLinjanje = ref([])

const opcijeLinjanja = [
  { label: 'Učestalo', value: 'Frequent' },
  { label: 'Redovito', value: 'Regularly' },
  { label: 'Sezonski', value: 'Seasonal' },
  { label: 'Povremeno', value: 'Occasional' },
  { label: 'Rijetko', value: 'Infrequent' },
  { label: 'Nema podataka', value: '0' },
]

const LinjanjeTekst = computed(() =>
  opcijeLinjanja
    .filter((opcija) => odabranoLinjanje.value.includes(opcija.value))
    .map((opcija) => opcija.label)
    .join(', '),
)

// Njega dlake
const odabranaNjega = ref([])

const opcijeNjege = [
  { label: 'Nema podataka', value: 'Njega_0' },
  { label: 'Zaštita od sunca', value: 'Njega_1' },
  { label: 'Povremeno kupanje i četkanje', value: 'Njega_2' },
  { label: 'Tjedno četkanje', value: 'Njega_3' },
  { label: 'Četkanje 2-3 puta tjedno', value: 'Njega_4' },
  { label: 'Dnevno četkanje', value: 'Njega_5' },
]

const njegaDlakeTekst = computed(() =>
  opcijeNjege
    .filter((opcija) => odabranaNjega.value.includes(opcija.value))
    .map((opcija) => opcija.label)
    .join(', '),
)

// Energija
const odabranaEnergija = ref([])

const opcijeEnergije = [
  { label: 'Ima potrebu za redovitim vježbanjem', value: 'Energija_5' },
  { label: 'Treba puno aktivnosti', value: 'Energija_4' },
  { label: 'Energetičan', value: 'Energija_3' },
  { label: 'Miran', value: 'Energija_2' },
  { label: 'Couch potato', value: 'Energija_1' },
  { label: 'Nema podataka', value: 'Energija_0' },
]

const energijaTekst = computed(() =>
  opcijeEnergije
    .filter((opcija) => odabranaEnergija.value.includes(opcija.value))
    .map((opcija) => opcija.label)
    .join(', '),
)

// Treniranje
const odabraniTrening = ref([])

const opcijeTreninga = [
  { label: 'Može biti tvrdoglav', value: 'Trening_6' },
  { label: 'Nezavisan', value: 'Trening_5' },
  { label: 'Ugodan/Agreeable', value: 'Trening_4' },
  { label: 'Jednostavan za treniranje', value: 'Trening_3' },
  { label: 'Željan udovoljiti', value: 'Trening_2' },
  { label: 'Lak za treniranje', value: 'Trening_1' },
  { label: 'Nema podataka', value: 'Trening_0' },
]

const treniranjeTekst = computed(() =>
  opcijeTreninga
    .filter((opcija) => odabraniTrening.value.includes(opcija.value))
    .map((opcija) => opcija.label)
    .join(', '),
)

// metoda koja jednim gumbom šalje sve parametre serveru na filtriranje:
async function posaljiIzbore() {
  console.log('Funkcija posaljiIzbore je pozvana')

  const podatci = {
    minVisina: minVisina.value,
    maxVisina: maxVisina.value,
    minTezina: minTezina.value,
    maxTezina: maxTezina.value,
    linjanje: odabranoLinjanje.value,
    njega: odabranaNjega.value,
    energija: odabranaEnergija.value,
    trening: odabraniTrening.value,
  }

  try {
    const response = await axios.post('http://localhost:3000/pregledajPsePoParametrima', podatci)

    console.log('Dobiveni podaci:', response.data)
    console.log('Šaljem podatke serveru:', podatci)

    localStorage.setItem('rezultatiPasmina', JSON.stringify(response.data))
    router.push('/psodabrani')
  } catch (error) {
    console.error('Greška pri dohvaćanju pasmina:', error)
    alert('Došlo je do greške pri dohvaćanju podataka.')
  }
}
</script>
