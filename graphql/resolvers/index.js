const authResolver = require("./auth");
const eventsResolver = require("./events");
const bookingResolver = require("./booking");

const rootresolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver
};

module.exports = rootresolver;
