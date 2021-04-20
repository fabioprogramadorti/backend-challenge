import SurvivorModel from '../db/models/survivor.model'
// 1. Percentage of infected survivors.
// 1. Percentage of non - infected survivors.
// 3. Average amount of each kind of resource by survivor(e.g. 5 waters per survivor)
// 4. Points lost because of infected survivor.

const STATUS = {
  success: 'success',
  error: 'error'
}

const itemBySurvivor = (survivors, item) => {
  let totalItem = survivors.reduce((acc, survivor) => {

    return acc + survivor.inventory[item]
  }, 0)

  return totalItem / survivors.length
}

export async function reportsController(req, res) {
  try {
    const allSurvivors = await SurvivorModel.find({})
    const infectedSurvivors = allSurvivors.filter(survivor => 
      survivor.infected
    )
  
    const notInfected = allSurvivors.length - infectedSurvivors.length
  
    const infectedPercentage = infectedSurvivors.length * 100 / allSurvivors.length
    const notInfectedPercentage = notInfected * 100 / allSurvivors.length
  
    const avgWaterBySurvivor = itemBySurvivor(allSurvivors, 'water')
    const avgFoodBySurvivor = itemBySurvivor(allSurvivors, 'food')
    const avgMedicationBySurvivor = itemBySurvivor(allSurvivors, 'medication')
    const avgAmmunitionBySurvivor = itemBySurvivor(allSurvivors, 'ammunition')
  
    res.json({
      status: STATUS.success,
      infectedPercentage,
      notInfectedPercentage,
      avgWaterBySurvivor,
      avgFoodBySurvivor,
      avgMedicationBySurvivor,
      avgAmmunitionBySurvivor
    })
  } catch (err) {
    res.json({
      status: STATUS.error,
      msg: err.message
    })
  }
}