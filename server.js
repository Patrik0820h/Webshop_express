import express from 'express'
import rendelesRoute from './routes/rendelesek.js'
import vasarloRoute from './routes/vasarlok.js'
import termekRoute from './routes/termekek.js'
import statisztikaRoute from './routes/statisztika.js'

const app = express();
const port = 3000;
app.use(express.json())

app.use('/rendelesek', rendelesRoute)
app.use('/vasarlok', vasarloRoute)
app.use('/termekek', termekRoute)
app.use('/statisztika', statisztikaRoute)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})