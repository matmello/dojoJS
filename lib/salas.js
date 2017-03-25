Salas = new Mongo.Collection('salas');

Salas.attachSchema(new SimpleSchema({
  name: {
    type: String,
  },
  lat: {
    decimal: true,
    type: Number,
  },
  lng: {
    decimal: true,
    type: Number,
  }
}));
