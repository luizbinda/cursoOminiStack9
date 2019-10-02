const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    data: String,
    approved: Boolean,
    user: {
        //pegar id do usuario no banco
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    spot: {
        //pegar id do usuario no banco
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Spot'
    }
})

module.exports = mongoose.model('Booking', BookingSchema)
