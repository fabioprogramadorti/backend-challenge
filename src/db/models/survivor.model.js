import { Schema, model } from 'mongoose'

const survivor = {
  name: {
    type: String, 
    required: true,
    maxLength: 100,
    trim: true
  }, 
  age:{
    type: Number, required: true, min: 0
  },
  gender:{
    type: String,
    enum: ['MALE', 'FEMALE'],
    required: true
  },
  last_location: {
    coordinates: {
      type: [Number],
      required: true
    }
  },
  infected: {
    type: Boolean,
    default: false
  },
  reports: {
    type: Number,
    max: 3,
    min: 0,
    default: 0
  }

}

const SurvivorSchema = new Schema(survivor)
const SurvivorModel = new model('survivor', SurvivorSchema)
export default SurvivorModel