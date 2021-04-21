import SurvivorModel from '../db/models/survivor.model'
import { ITEMS_VALUES } from '../utils/constants'
const STATUS = {
  success: 'success',
  error: 'error'
}
export async function listSurvivors(req, res) {
  try{
    const allSurvivors = await SurvivorModel.find({})
    
    res.json({
      status: STATUS.success,
      qtd:allSurvivors.length,
      survivors: allSurvivors
    })
  } catch(err) {
    res.json({
      status: STATUS.error,      
      msg: err.message
    })
  }
}

export async function createSurvivor(req, res) {
  try {
    const newSurvivor = await SurvivorModel.create(req.body)
    res.json({
      status: STATUS.success,
      newSurvivor
    })
  } catch(err) {
    res.json({
      status: STATUS.error,
      msg: err.message
    })
  }
}

export async function getSurvivorById(req, res) {
  const id = req.params.id
  try {
    const survivor = await SurvivorModel.findById(id)
    res.json({
      status: STATUS.success,
      survivor
    })
  } catch (err) {
    res.json({
      status: STATUS.error,
      msg: err.message
    })
  }
}

export async function updateLocation(req, res) {
  const id = req.params.id
  let data = req.body

  try {
    const updatedSurvivor = await SurvivorModel
    .findOneAndUpdate(
      { _id:id }, 
      { last_location: data.new_location }, 
      { new: true } // returns the modified object
    )
    res.json({
      status: STATUS.success,
      updatedSurvivor
    })
  } catch (err) {
    res.json({
      status: STATUS.error,
      msg: err.message
    })
  }
}

function calculatePoints(items) {

  let points = {}
  ITEMS_VALUES.forEach(item => {
    points[item.name] = item.value
  })

  const totalPoints = items.reduce((acc, item) => {
    return points[item.name] * item.qtd + acc
  }, 0)

  return totalPoints
}

function hasEnoughItems(survivor, items){
  let hasEnough = true
  items.forEach(item => {
    if (survivor.inventory[item.name] < item.qtd) {
      hasEnough = false
      return
    }
  })
  return hasEnough
}

export async function updateInventory(req, res) {
  let s1Data = req.body.s1 
  let s2Data = req.body.s2
  try {
    const survivor1DB = await SurvivorModel.findById(s1Data.id)
    const survivor2DB = await SurvivorModel.findById(s2Data.id)
    if (survivor1DB.infected || survivor2DB.infected){
      throw new Error('Survivor infected. Cannot make the transaction')
    }

    // validations of the inventories

    // Calculate total points of each survivor
    const pointsS1 = calculatePoints(s1Data.items)
    const pointsS2 = calculatePoints(s2Data.items)

    // check if the survivors have enough items to trade
    const s1HasEnoughItems = hasEnoughItems(survivor1DB, s1Data.items)
    const s2HasEnoughItems = hasEnoughItems(survivor2DB, s2Data.items)
    
    // if the points are equal and both have enough items to trade the inventories are updated
    if (pointsS1 == pointsS2 && s1HasEnoughItems && s2HasEnoughItems) {
      let inventory1 = survivor1DB.inventory
      let inventory2 = survivor2DB.inventory
      // updateItems
      s1Data.items.forEach(item => {
        inventory1[item.name] -= item.qtd
        inventory2[item.name] += item.qtd
      })
      s2Data.items.forEach(item => {
        inventory1[item.name] += item.qtd
        inventory2[item.name] -= item.qtd
      })
  
      const survivor1Updated = await SurvivorModel
        .findOneAndUpdate(
          {_id: s1Data.id}, 
          {inventory: inventory1}, 
          {new:true}
        )

      const survivor2Updated = await SurvivorModel
        .findOneAndUpdate(
          {_id: s2Data.id}, 
          {inventory: inventory2}, 
          {new:true}
        )

      res.json({
        status: STATUS.success,
        s1: survivor1Updated.inventory,
        s2: survivor2Updated.inventory
      })
    } else {
      throw new Error('Someone has not enough items or the points are not equivalent')
    }
    
  } catch (err) {
    res.json({
      status: STATUS.error,
      msg: err.message
    })
  }

}

export async function updateInfected(req, res) {
  const informantId = req.body.informant
  const infectedDenounced = req.body.infected
  
  try {
    const informant = await SurvivorModel.findById(informantId)
    const denounced = await SurvivorModel.findById(infectedDenounced)
    if (denounced.reports.indexOf(informant._id) >= 0){
      throw new Error('You already have reported this survivor')
    }
    if (denounced.infected){
      throw new Error('This survivor has already been reported 3 times')
    }
    
    denounced.reports.push(informant._id)
    
    if(denounced.reports.length >= 3){
      denounced.infected = true
    }
    denounced.save()

    res.json({
      status: STATUS.success,
      denounced: {
        name: denounced.name,
        reports: denounced.reports.length,
        infected: denounced.infected
      }
    })
  } catch (err) {
    res.json({
      status: 'error',
      msg: err.message
    })
  }

}

export async function deleteSurvivor(req, res) {
  const id = req.params.id
  try {
    const deletedSurvivor = await SurvivorModel.findOneAndDelete({ _id: id })
    res.json({
      status: STATUS.success,
      msg: `survivor deleted`,
      dados: deletedSurvivor
    })
  } catch (err) {
    res.json({
      status: 'error',
      msg: err.message
    })
  }
}