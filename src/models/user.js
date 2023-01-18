const{Schema, model} = require('mongoose')
const studentSchema = Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: String,
    userType : {
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

exports.User = model('User', studentSchema)