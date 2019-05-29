var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    station_name: String,
  day: String,
  price: String,
  time: String,
  bus_number: String,
  mark: String,
  col_seat: String
});

var Post = mongoose.model("Ticket", PostSchema);
module.exports = Post;