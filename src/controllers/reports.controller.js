import SurvivorModel from '../db/models/survivor.model'
import { ITEMS_VALUES } from '../utils/constants'
// 1. Percentage of infected survivors.
// 1. Percentage of non - infected survivors.
// 3. Average amount of each kind of resource by survivor(e.g. 5 waters per survivor)
// 4. Points lost because of infected survivor.

const STATUS = {
  success: 'success',
  error: 'error'
}

const countItems = (survivors, item) => {
  let totalItem = survivors.reduce((acc, survivor) => {

    return acc + survivor.inventory[item]
  }, 0)

  return totalItem 
}

export async function reportsController(req, res) {
  try {
    const allSurvivors = await SurvivorModel.find({})
    const infectedSurvivors = allSurvivors.filter(survivor => survivor.infected)
    const notInfectedSurvivors = allSurvivors.filter(survivor => !survivor.infected)

    // percentages
    const infectedPercentage = infectedSurvivors.length * 100 / allSurvivors.length
    const notInfectedPercentage = notInfectedSurvivors.length * 100 / allSurvivors.length
    
    // average of items by survivor
    const avgsBySurvivor = ITEMS_VALUES
      .map(item => {
        let avg = countItems(notInfectedSurvivors, item.name) / allSurvivors.length
        return {
          item: item.name,
          avg
        }
      })
    
    // Sum points lost by infected survivors
    const pointsLost = ITEMS_VALUES.reduce((acc, current) => {
      return acc + countItems(infectedSurvivors, current.name) * current.value
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