const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },

    author : {
        type : String,
        required : true,
    },
    genre : {
        type : String,
        required : true,
        enum: ['fiction' , 'science', 'comic']
    },
    description : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
})

const BookModel = mongoose.model("books", BookSchema);

// exporting
module.exports={
    BookModel
}