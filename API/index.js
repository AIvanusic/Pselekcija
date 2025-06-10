const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Da da da da da da da.')
})

app.listen(port, () => {
  console.log(`Server je pokrenut na portu ${port}`)
})
