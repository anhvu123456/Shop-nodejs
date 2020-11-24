const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: [String],
        required: true
    },
    productType: {
        type: String,
        required:true
    }
    ,
    color: {
        type: String,
        required: false
    },
    pattern: {
        type: String,
        required: false
    },
    tags: {
        type: [String],
        required: false
    },
    images: {
        type: [String],
        required: true
    },
    dateAdded: {
        type: Date,
        required: false,
        default: Date.now
    },
    isSale: {
        status: {
            type: Boolean,
            default: false
        },
        percent: {
            type: Number,
            default: 0
        },
        end: {
            type: Date
        }
    },
    ofSellers: {
        userId: {
            type: Schema.Types.ObjectId,            
            ref:'User'
        },
        name: String
    },
    labels: {
        type: String,
        required: false
    },
    materials: {
        type: [String],
        required: true
    },
    buyCounts: {
        type: Number,
        required: false,
        default: 0
    },
    viewCounts: {
        type: Number,
        required: false,
        default: 0
    },
    rating: {
        byUser: String,
        content: String,
        star: Number
    },
    index: {
        type: Number,
        required: false,
        default: 0
    },
    comment: {
        total: {
            type: Number, 
            required: false,
            default: 0
        },
        items: [
            {
                title: {type: String},
                content: {type: String},
                name: {type: String},
                date: {type: Date,  default: Date.now},
                star: {type: Number}
            }
        ]
    }


});

module.exports = mongoose.model('Product', productSchema);