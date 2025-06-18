require('dotenv').config()
const express = require('express')
const axios = require('axios')
const fs = require('fs')
const csv = require('csv-parser')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.post('/pregledajPsePoParametrima', async (req, res) => {
  const { minVisina, maxVisina, minTezina, maxTezina, linjanje, njega, energija, trening } =
    req.body
  const mapEnergija = {
    Energija_5: 'Redovito vježbanje',
    Energija_4: 'Treba puno aktivnosti',
    Energija_3: 'Energetičan',
    Energija_2: 'Miran',
    Energija_1: 'Couch potato',
    Energija_0: 'Nema podataka',
  }

  //const mapLinjanje = {
  //Učestalo: 'Frequent',
  //Redovito: 'Regularly',
  //Sezonski: 'Seasonal',
  //Povremeno: 'Occasional',
  //Rijetko: 'Infrequent',
  //'Nema podataka': '0',
  //}

  const mapNjega = {
    Njega_0: 'Nema podataka',
    Njega_1: 'Zaštita od sunca',
    Njega_2: 'Povremeno kupanje i četkanje',
    Njega_3: 'Tjedno četkanje',
    Njega_4: 'Četkanje 2-3 puta tjedno',
    Njega_5: 'Dnevno četkanje',
  }

  const mapTrening = {
    Trening_0: 'Nema podataka',
    Trening_1: 'Lak za treniranje',
    Trening_2: 'Željan udovoljiti',
    Trening_3: 'Jednostavan za treniranje',
    Trening_4: 'Ugodan/Agreeable',
    Trening_5: 'Nezavisan',
    Trening_6: 'Može biti tvrdoglav',
  }
  console.log('Primljeni parametri:', {
    minVisina,
    maxVisina,
    minTezina,
    maxTezina,
    linjanje,
    njega,
    energija,
    trening,
  })
  const rezultati = []

  try {
    const response = await fs
      .createReadStream('C:/Users/HP/Pselekcija/API/data/PodaciPsizbornik.csv')
      .pipe(csv({ separator: ';' }))

    const vrijednostiLinjanje = linjanje || []
    const vrijednostiNjega = njega?.map((n) => mapNjega[n]) || []
    const vrijednostiEnergija = energija?.map((e) => mapEnergija[e]) || []
    const vrijednostiTrening = trening?.map((t) => mapTrening[t]) || []

    response.on('data', (data) => {
      if (!data.Vrsta || !data.MinVisCM) return
      console.log('Redak iz CSV-a:', data)

      const visinaMin = parseFloat((data.MinVisCM || '').trim())
      const visinaMax = parseFloat((data.MaxVisCM || '').trim())
      const tezinaMin = parseFloat((data.MinKG || '').trim())
      const tezinaMax = parseFloat((data.MaxKG || '').trim())

      const minVis = parseFloat(minVisina)
      const maxVis = parseFloat(maxVisina)
      const minTez = parseFloat(minTezina)
      const maxTez = parseFloat(maxTezina)

      let postojiUnos = true

      if (!isNaN(minVis)) postojiUnos &&= visinaMax >= minVis
      if (!isNaN(maxVis)) postojiUnos &&= visinaMin <= maxVis
      if (!isNaN(minTez)) postojiUnos &&= tezinaMax >= minTez
      if (!isNaN(maxTez)) postojiUnos &&= tezinaMin <= maxTez
      if (vrijednostiLinjanje.length) {
        const linjanjeCSV = (data.Linjanje || '').replace(/\s+/g, ' ').trim()
        if (!vrijednostiLinjanje.includes(linjanjeCSV)) {
          console.log(`⛔ Linjanje ne odgovara: "${data.Vrsta}" ima "${linjanjeCSV}"`)
          postojiUnos = false
        }
      }
      if (vrijednostiNjega.length)
        postojiUnos &&= vrijednostiNjega.includes(
          (data.NjegaDlake || '').replace(/\s+/g, ' ').trim(),
        )
      if (
        vrijednostiEnergija.length &&
        !vrijednostiEnergija.includes((data.RazEnergije || '').replace(/\s+/g, ' ').trim())
      )
        if (vrijednostiTrening.length)
          postojiUnos &&= vrijednostiTrening.includes(
            (data.Trening || '').replace(/\s+/g, ' ').trim(),
          )

      if (!postojiUnos) {
        console.log(`Preskačem: ${data.Vrsta} - ne zadovoljava uvjete.`)
        console.log(`Provjera za pasminu: ${data.Vrsta}`)
        console.log({ minVisina, maxVisina, minTezina, maxTezina })
      }

      if (postojiUnos) {
        rezultati.push({
          nazivHR: data.Vrsta,
          nazivEN: data.Breed,
          minVisina: data.MinVisCM,
          maxVisina: data.MaxVisCM,
          minTezina: data.MinKG,
          maxTezina: data.MaxKG,
        })
      }
    })

    response.on('end', () => {
      console.log('CSV parsiranje gotovo, pronađeno pasmina:', rezultati.length)
      res.json(rezultati)
    })
  } catch (error) {
    console.error('Greška:', error)
    res.status(500).json({ error: 'Greška prilikom obrade CSV datoteke.' })
  }
})

//pretraga veterinara sa stranice PsinformacijePage:
app.get('/veterinari', async (req, res) => {
  const grad = req.query.grad

  if (!grad) {
    return res.status(400).json({ error: 'Grad je obavezan parametar.' })
  }

  try {
    const apiKey = process.env.AZURE_MAPS_KEY_Primary

    const geoResponse = await axios.get(`https://atlas.microsoft.com/search/address/json`, {
      params: {
        'api-version': '1.0',
        'subscription-key': apiKey,
        query: grad,
        limit: 1,
      },
    })
    const position = geoResponse.data.results[0]?.position
    if (!position) {
      return res.status(404).json({ error: 'Grad nije pronađen.' })
    }

    const { lat, lon } = position

    const searchQuery = `veterinar`
    const responseVeterinar = await axios.get(`https://atlas.microsoft.com/search/poi/json`, {
      params: {
        'api-version': '1.0',
        'subscription-key': apiKey,
        query: searchQuery,
        lat,
        lon,
        radius: 30000,
        limit: 30,
      },
    })

    const rezultati = responseVeterinar.data.results.map((item) => ({
      naziv: item.poi?.name || item.address.freeformAddress,
      adresa: item.address.freeformAddress,
      pozicija: item.position,
      udaljenost: item.dist,
    }))

    res.json(rezultati)
    console.log('🔑 AZURE_MAPS_KEY:', apiKey)
  } catch (error) {
    console.error('❌ Došlo je do greške:', error.message)
    if (error.response) {
      console.error('🔁 Odgovor servera:', error.response.data)
      console.error('🔁 Status:', error.response.status)
    } else if (error.request) {
      console.error('📡 Nema odgovora:', error.request)
    } else {
      console.error('⚙️ Postavka greške:', error.config)
    }
    res.status(500).json({ error: 'Neuspješan dohvat podataka' })
  }
})

//pretraga trgovina sa stranice PsinformacijePage:
app.get('/petShops', async (req, res) => {
  const grad = req.query.grad

  if (!grad) {
    return res.status(400).json({ error: 'Grad je obavezan parametar.' })
  }

  try {
    const apiKey = process.env.AZURE_MAPS_KEY_Primary

    const geoResponse = await axios.get(`https://atlas.microsoft.com/search/address/json`, {
      params: {
        'api-version': '1.0',
        'subscription-key': apiKey,
        query: grad,
        limit: 1,
      },
    })

    const position = geoResponse.data.results[0]?.position
    if (!position) {
      return res.status(404).json({ error: 'Grad nije pronađen.' })
    }

    const { lat, lon } = position

    const responsePetShop = await axios.get(`https://atlas.microsoft.com/search/poi/json`, {
      params: {
        'api-version': '1.0',
        'subscription-key': apiKey,
        query: 'pet shop',
        lat,
        lon,
        radius: 30000, // npr. 30 km
        limit: 30,
      },
    })

    const rezultati = responsePetShop.data.results.map((item) => ({
      naziv: item.poi?.name || item.address.freeformAddress,
      adresa: item.address.freeformAddress,
      pozicija: item.position,
      udaljenost: item.dist,
    }))

    res.json(rezultati)
  } catch (error) {
    console.error('❌ Došlo je do greške:', error.message)
    res.status(500).json({ error: 'Neuspješan dohvat podataka' })
  }
})

//pretraga plaža za pse za PsinformacijePage:
app.get('/dogBeach', async (req, res) => {
  const grad = req.query.grad

  if (!grad) {
    return res.status(400).json({ error: 'Grad je obavezan parametar.' })
  }

  try {
    const apiKey = process.env.AZURE_MAPS_KEY_Primary

    const geoResponse = await axios.get(`https://atlas.microsoft.com/search/address/json`, {
      params: {
        'api-version': '1.0',
        'subscription-key': apiKey,
        query: grad,
        limit: 1,
      },
    })

    const position = geoResponse.data.results[0]?.position
    if (!position) {
      return res.status(404).json({ error: 'Grad nije pronađen.' })
    }

    const { lat, lon } = position

    const response = await axios.get(`https://atlas.microsoft.com/search/poi/json`, {
      params: {
        'api-version': '1.0',
        'subscription-key': apiKey,
        query: 'dog beach',
        lat,
        lon,
        radius: 30000, // 30 km
        limit: 30,
        // categorySet: '9352006', kaže chatGPT!!! - probati ako ne radi", // optional filter (beaches)
      },
    })

    const rezultati = response.data.results.map((item) => ({
      naziv: item.poi?.name || 'Nepoznato ime',
      adresa: item.address?.freeformAddress || 'Adresa nije dostupna',
      pozicija: item.position,
      udaljenost: item.dist || null, // možeš prikazati udaljenost ako želiš
    }))

    res.json(rezultati)
  } catch (error) {
    console.error('❌ Došlo je do greške:', error.message)
    res.status(500).json({ error: 'Neuspješan dohvat podataka' })
  }
})

//pretraga parkova za pse PsinformacijePage:
app.get('/dogPark', async (req, res) => {
  const grad = req.query.grad

  if (!grad) {
    return res.status(400).json({ error: 'Grad je obavezan parametar.' })
  }

  try {
    const apiKey = process.env.AZURE_MAPS_KEY_Primary

    const geoResponse = await axios.get(`https://atlas.microsoft.com/search/address/json`, {
      params: {
        'api-version': '1.0',
        'subscription-key': apiKey,
        query: grad,
        limit: 1,
      },
    })

    const position = geoResponse.data.results[0]?.position
    if (!position) {
      return res.status(404).json({ error: 'Grad nije pronađen.' })
    }

    const { lat, lon } = position

    const response = await axios.get(`https://atlas.microsoft.com/search/poi/json`, {
      params: {
        'api-version': '1.0',
        'subscription-key': apiKey,
        query: 'dog park',
        lat,
        lon,
        radius: 30000,
        limit: 30,
      },
    })

    const rezultati = response.data.results.map((item) => ({
      naziv: item.poi?.name || item.address.freeformAddress,
      adresa: item.address.freeformAddress,
      pozicija: item.position,
      udaljenost: item.dist || null,
    }))

    res.json(rezultati)
    console.log('🔑 AZURE_MAPS_KEY:', apiKey)
  } catch (error) {
    console.error(' Došlo je do greške:', error.message)
    res.status(500).json({ error: 'Neuspješan dohvat podataka' })
  }
})

//pretraga salona za pse PsinformacijePage:
app.get('/dogSalon', async (req, res) => {
  const grad = req.query.grad

  if (!grad) {
    return res.status(400).json({ error: 'Grad je obavezan parametar.' })
  }

  try {
    const apiKey = process.env.AZURE_MAPS_KEY_Primary

    const geoResponse = await axios.get(`https://atlas.microsoft.com/search/address/json`, {
      params: {
        'api-version': '1.0',
        'subscription-key': apiKey,
        query: grad,
        limit: 1,
      },
    })

    const position = geoResponse.data.results[0]?.position
    if (!position) {
      return res.status(404).json({ error: 'Grad nije pronađen.' })
    }

    const { lat, lon } = position

    const searchQuery = 'dog salon'
    const salonResponse = await axios.get(`https://atlas.microsoft.com/search/poi/json`, {
      params: {
        'api-version': '1.0',
        'subscription-key': apiKey,
        query: searchQuery,
        lat,
        lon,
        radius: 30000, // 50 km domet
        limit: 30,
      },
    })

    const rezultati = salonResponse.data.results.map((item) => ({
      naziv: item.poi?.name || item.address.freeformAddress,
      adresa: item.address.freeformAddress,
      pozicija: item.position,
      udaljenost: item.dist,
    }))

    res.json(rezultati)
  } catch (error) {
    console.error('❌ Greška:', error.message)
    res.status(500).json({ error: 'Neuspješan dohvat podataka' })
  }
})

// Pokretanje servera
app.listen(port, () => {
  console.log(`Server je pokrenut na portu ${port}.`)
})
