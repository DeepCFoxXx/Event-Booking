const Event = require("../../models/event");
const { transformEvent } = require("./merge");

module.exports = {
  events: async () => {
    const events = await Event.find();
    try {
      return events.map(event => {
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async args => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: "5e04a89e1910843c5a852c38"
    });
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = transformEvent(result);

      const creator = await User.findById("5e04a89e1910843c5a852c38");
      if (!creator) {
        throw new Error("User not found.");
      }
      creator.createdEvents.push(event);
      await creator.save();

      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
