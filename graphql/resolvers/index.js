const bcrypt = require("bcryptjs");

const Event = require("../../models/event");
const User = require("../../models/users");
const Booking = require("../../models/bookings");

const events = async eventIds => {
  const events = await Event.find({ _id: { $in: eventIds } });
  try {
    return events.map(event => {
      return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, event.creator)
      };
    });
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents)
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  events: async () => {
    const events = await Event.find();
    try {
      return events.map(event => {
        return {
          ...event._doc,
          _id: event.id,
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event._doc.creator)
        };
      });
    } catch (err) {
      throw err;
    }
  },
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => {
        return {
          ...bookings._doc,
          _id: booking.id,
          createdAt: new Date(booking._doc.createdAt).toISOString(),
          updatedAt: new Date(booking._doc.createdAt).toISOString()
        };
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

      createdEvent = {
        ...result._doc,
        _id: event._doc._id.toString(),
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, result._doc.creator)
      };
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
  },
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      });
      const result = await user.save();
      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  bookEvent: async args => {
    const fetchedEvent = await Event.findOne({ _id: args.eventId });
    const booking = new Booking({
      user: "5e04a89e1910843c5a852c38",
      event: fetchedEvent
    });
    const result = await booking.save();
    return {
      ...result._doc,
      _id: result.id,
      createdAt: new Date(booking._doc.createdAt).toISOString(),
      updatedAt: new Date(booking._doc.createdAt).toISOString()
    };
  }
};
