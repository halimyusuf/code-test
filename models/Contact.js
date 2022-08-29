const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');
const Schema = mongoose.Schema;


const ContactSchema = new Schema({
    FirstName: {
        type: String
    },
    LastName: {
        type: String
    },
    PhoneNumber: {
        type: String
    },
    Email: {
        type: String
    },
    CompanyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

ContactSchema.plugin(mongoosePaginate);
ContactSchema.plugin(mongooseAggregatePaginate);

module.exports = Contact = mongoose.model('Contact', ContactSchema);
