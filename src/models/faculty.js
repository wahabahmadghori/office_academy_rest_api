const{Schema, model} = require('mongoose')
const studentSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    gender : {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    }
})

studentSchema.virtual('id', ()=>{
    return this._id.toHexString()
})
studentSchema.set('toJSON', {
    virtuals: true
});

exports.Faculty = model('Faculty', studentSchema)