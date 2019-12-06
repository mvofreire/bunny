import app from './app'

const SERVER_PORT = process.env.PORT || 5000
app.listen(SERVER_PORT, function() {
    console.log(`LISTENING ON PORT ${SERVER_PORT}!`)
})
