/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Newsletter Schema
 */
var NewsletterSchema = new Schema({
  edition: {
    type: String,
    default: '',
    trim: true
  },
  pubdate: {
    type: Date
  },
  edito: {
    type: String,
    default: '',
    trim: true
  },
  topics: {
    type: Schema.Types.Mixed
  }
});

mongoose.model('Newsletter', NewsletterSchema);