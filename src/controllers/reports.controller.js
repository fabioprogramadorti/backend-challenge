import SurvivorModel from '../db/models/survivor.model'
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
    const avgWaterBySurvivor = countItems(notInfectedSurvivors, 'water') / allSurvivors.length
    const avgFoodBySurvivor = countItems(notInfectedSurvivors, 'food') / allSurvivors.length
    const avgMedicationBySurvivor = countItems(notInfectedSurvivors, 'medication') / allSurvivors.length
    const avgAmmunitionBySurvivor = countItems(notInfectedSurvivors, 'ammunition') / allSurvivors.length

    const infectedWater = countItems(infectedSurvivors, 'water')
    const infectedFood = countItems(infectedSurvivors, 'food')
    const infectedMedication = countItems(infectedSurvivors, 'medication')
    const infectedAmmunition = countItems(infectedSurvivors, 'ammunition')

    const pointsLost = infectedWater * 4 + infectedFood * 3 + infectedMedication * 2 + infectedAmmunition * 1

    res.json({
      status: STATUS.success,
      infectedPercentage,
      notInfectedPercentage,
      avgWaterBySurvivor,
      avgFoodBySurvivor,
      avgMedicationBySurvivor,
      avgAmmunitionBySurvivor,
      pointsLost
    })
  } catch (err) {
    res.json({
      status: STATUS.error,
      msg: err.message
    })
  }
}