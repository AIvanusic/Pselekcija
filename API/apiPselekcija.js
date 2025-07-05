require('dotenv').config()
const express = require('express')
const axios = require('axios')
const fs = require('fs')
const csv = require('csv-parser')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

app.use(
  cors({
    origin: 'http://localhost:9000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }),
)
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
      console.log('Ključevi retka:', Object.keys(data))

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
          postojiUnos = false
        }
      }
      if (vrijednostiNjega.length) {
        const vrijednostiNjegaCSV = (data.NjegaDlake || '').replace(/\s+/g, ' ').trim()
        if (!vrijednostiNjega.includes(vrijednostiNjegaCSV)) {
          postojiUnos = false
        }
      }
      if (vrijednostiEnergija.length) {
        const vrijednostiEnergijaCSV = (data.RazEnergije || '').replace(/\s+/g, ' ').trim()
        if (!vrijednostiEnergija.includes(vrijednostiEnergijaCSV)) {
          postojiUnos = false
        }
      }
      if (vrijednostiTrening.length) {
        const vrijednostiTreningCSV = (data.Trening || '').replace(/\s+/g, ' ').trim()
        if (!vrijednostiTrening.includes(vrijednostiTreningCSV)) {
          postojiUnos = false
        }
      }

      if (!postojiUnos) {
        console.log(`Preskačem: ${data.Vrsta} - ne zadovoljava uvjete.`)
        console.log(`Provjera za pasminu: ${data.Vrsta}`)
        console.log({ minVisina, maxVisina, minTezina, maxTezina })
      }

      if (postojiUnos) {
        rezultati.push({
          id: parseInt((data['id'] || data['\ufeffid'] || '').trim()),
          nazivHR: data.Vrsta,
          nazivEN: data.Breed,
          minVisina: data.MinVisCM,
          maxVisina: data.MaxVisCM,
          minTezina: data.MinKG,
          maxTezina: data.MaxKG,
          opis: data.Opis,
          skupina: data.Skupina,
          linjanje: data.Linjanje,
          njega: data.NjegaDlake,
          energija: data.RazEnergije,
          trening: data.Trening,
          vladanje: data.Vladanje,
          MinAge: data.MinAge,
          MaxAge: data.MaxAge,
          Temperament: data.Temperament,
        })
      }
    })

    response.on('end', () => {
      console.log('CSV parsiranje gotovo, pronađeno pasmina:', rezultati.length)
      console.log('Primjeri rezultata sa ID-om:', rezultati.slice(0, 3))
      res.json(rezultati)
    })
  } catch (error) {
    console.error('Greška:', error)
    res.status(500).json({ error: 'Greška prilikom obrade CSV datoteke.' })
  }
})

// Pretraga uzgajivačnica za prikazane pasmine na PsodabraniPage:
app.get('/psodabraniUzgajivacnice', async (req, res) => {
  const pasmina = req.query.pasmina
  if (!pasmina) {
    return res.status(400).json({ error: 'Pasmina nije definirana.' })
  }

  try {
    const apiKey = process.env.AZURE_MAPS_KEY_Primary // Zagreb kao početna točka
    const lat = 45.815
    const lon = 15.981

    const search = await axios.get(`https://atlas.microsoft.com/search/poi/json`, {
      params: {
        'api-version': '1.0',
        'subscription-key': apiKey,
        query: `${pasmina} kennel`,
        lat,
        lon,
        radius: 3000000, // do 3000 km
        limit: 50,
      },
    })

    const sviRezultati = search.data.results

    // Prvo Hrvatske uzgajivačnice, zatim ostale
    const hrvatske = sviRezultati.filter((r) => r.address?.countryCodeISO3 === 'HRV')
    const ostale = sviRezultati.filter((r) => r.address?.countryCodeISO3 !== 'HRV')

    const rezultati = [...hrvatske, ...ostale].map((item) => {
      const naziv = item.poi?.name || 'Nepoznat naziv'
      const adresa = item.address?.freeformAddress || 'Nepoznata adresa'
      const drzava = item.address?.country || ''
      return {
        naziv,
        adresa: drzava ? `${adresa}, ${drzava}` : adresa,
      }
    })

    res.json(rezultati)
  } catch (e) {
    console.error('Greška pri dohvaćanju uzgajivačnica:', e.message)
    res.status(500).json({ error: 'Neuspješan dohvat uzgajivačnica.' })
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
    console.log('AZURE_MAPS_KEY:', apiKey)
  } catch (error) {
    console.error('Došlo je do greške:', error.message)
    if (error.response) {
      console.error('Status:', error.response.status)
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
    console.error('Došlo je do greške:', error.message)
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
    console.log('AZURE_MAPS_KEY:', apiKey)
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
    console.error('Greška:', error.message)
    res.status(500).json({ error: 'Neuspješan dohvat podataka' })
  }
})

// Pokretanje servera
app.listen(port, () => {
  console.log(`Server je pokrenut na portu ${port}.`)
})
