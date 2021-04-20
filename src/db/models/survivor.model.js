import { Schema, model, Types } from 'mongoose'

const inventory = {
  water: { type: Number, default: 0 },
  food: { type: Number, default: 0 },
  medication: { type: Number, default: 0 },
  ammunition: { type: Number, default: 0 }
}

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
    required: true,
    uppercase: true,    
  },
  last_location: {
    lat:{type: Number},
    long:{type: Number}
  },
  inventory:{
    type: inventory, 
    required: true
  },
  infected: {
    type: Boolean,
    default: false
  },
  reports: { 
    type: [Types.ObjectId],
    validate: [arrayLimit, '{PATH} exceeds the limit of 3']
  }

}

function arrayLimit(val) {
  return val.length <= 3;
}

const SurvivorSchema = new Schema(survivor)
const SurvivorModel = new model('survivor', SurvivorSchema)
export default SurvivorModel