import { Schema, model } from 'mongoose'

const survivor = {
  name: {
    type: String, 
    required: true,
    maxLength: 100,
    trim: true
  }, 
  age:{
    type: Number, required: true
  },
  gender:{
    type: String,
    enum: ['male', 'female'],
    required: true
  }, 
  last_location: {
    type: {
      type: String, 
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
}

const SurvivorSchema = new Schema(survivor)

export default SurviroModel = new model('survivor', SurvivorSchema)