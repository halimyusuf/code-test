const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');

const CompanySchema = new Schema({
    LegalName: {
        type: String
    },
    CompanyEmail: {
        type: String
    },
    CompanyPhone: {type: String},

});

CompanySchema.plugin(mongoosePaginate)
CompanySchema.plugin(mongooseAggregatePaginate)

module.exports = Company = mongoose.model('Company', CompanySchema);