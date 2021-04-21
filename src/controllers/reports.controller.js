import SurvivorModel from '../db/models/survivor.model'
import { ITEMS_VALUES } from '../utils/constants'

const STATUS = {
  success: 'success',
  error: 'error'
}

const totalItemOfSurvivor = (survivors, item) => {
  let totalItem = survivors.reduce((total, survivor) => {

    return total + survivor.inventory[item]
  }, 0)

  return totalItem 
}

export async function reportsController(req, res) {
  try {
    
    // get survivors and filter by infection
    const allSurvivors = await SurvivorModel.find({})
    const infectedSurvivors = allSurvivors.filter(survivor => survivor.infected)
    const notInfectedSurvivors = allSurvivors.filter(survivor => !survivor.infected)

    // calculate percentages
    const infectedPercentage = infectedSurvivors.length * 100 / allSurvivors.length
    const notInfectedPercentage = notInfectedSurvivors.length * 100 / allSurvivors.length
    
    // calculate average of items by survivor
    const avgsBySurvivor = ITEMS_VALUES
      .map(item => {
        let avg = totalItemOfSurvivor(notInfectedSurvivors, item.name) / allSurvivors.length
        return {
          item: item.name,
          avg
        }
      })
    
    // Sum points lost by infected survivors
    const pointsLost = ITEMS_VALUES.reduce((total, current) => {
      return total + totalItemOfSurvivor(infectedSurvivors, current.name) * current.value
    }, 0)

    res.json({
      status: STATUS.success,
      infectedPercentage,
      notInfectedPercentage,
      avgsBySurvivor,
      pointsLost
    })
  } catch (err) {
    res.json({
      status: STATUS.error,
      msg: err.message
    })
  }
}