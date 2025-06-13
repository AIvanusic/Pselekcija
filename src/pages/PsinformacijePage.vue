<template>
  <div class="q-pa-md example-row-stacked-to-horizontal">
    <div class="row">
      <div class="col-12 col-md-8">
        <q-card
          class="q-pa-md"
          style="background-color: rgba(255, 255, 255, 0.1); max-width: auto; color: yellow"
        >
          <q-card-section>
            <p>
              Hvala što koristite ovu uslugu.<br />
              Za vas biramo psa koji je lakši od
            </p>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-4">
        <q-card
          class="q-pa-md"
          style="background-color: rgba(255, 255, 255, 0.1); max-width: auto; color: yellow"
        >
          <q-card-section>
            <p class="text-h6">Vaš izbor</p>
            <p>
              Hvala što koristite ovu uslugu.<br />
              Za vas biramo psa koji je lakši od
              <!--strong>{{ maxTezina || '...' }}</strong> kg,
                  rijetko se linja te ste tome voljni posvetiti
                  <strong>{{ odabranaNjega.join(', ') || '...' }}</strong>.<br />
                  Vaš pas imat će razinu energije:
                  <strong>{{ odabranaEnergija.join(', ') || '...' }}</strong><br />
                  a za trening će biti:
                  <strong>{{ odabraniTrening.join(', ') || '...' }}</strong>.-->
            </p>
            <q-btn label="Potvrdi odabir" color="teal-6" text-color="yellow-1" unelevated />
          </q-card-section>
        </q-card>
      </div>
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
</template>

<style>
.home-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}
</style>
