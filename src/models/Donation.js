
// This is now just a model definition for reference
// We're using static data instead of MongoDB

const DonationSchema = {
  _id: String,
  donor: String,
  contact: String,
  date: String,
  time: String,
  items: String,
  location: String,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'rejected'],
    default: 'pending',
  },
  notes: {
    type: String,
    default: '',
  },
  createdAt: Date,
  updatedAt: Date
};

// This is just for reference - we're not actually creating a MongoDB model
const Donation = {
  schema: DonationSchema
};

export default Donation;
