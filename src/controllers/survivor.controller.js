import SurvivorModel from '../db/models/survivor.model'


export async function listSurvivors(req, res) {
  try{
    const allSurvivors = await SurvivorModel.find({})

    res.json(allSurvivors)
  } catch(err) {
    res.json({
      status: 'error',
      msg: err.message
    })
  }
}

export async function createSurvivor(req, res) {
  try {
    const newSurvivor = await SurvivorModel.create(req.body)
    res.json(newSurvivor)
  } catch(err) {
    res.json({
      status: 'error',
      msg: err.message
    })
  }
}

export async function getSurvivorById(req, res) {
  const id = req.params.id
  try {
    const survivor = await SurvivorModel.findById(id)
    res.json(survivor)
  } catch (err) {
    res.json({
      status: 'error',
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
    res.json(updatedSurvivor)
  } catch (err) {
    res.json({
      status: 'error',
      msg: err.message
    })
  }
}

function calculatePoints(items) {

  const points = {
    water: 4,
    food: 3,
    medication: 2,
    ammunition: 1
  }

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
    // validations of the inventories
    const pointsS1 = calculatePoints(s1Data.items)
    const pointsS2 = calculatePoints(s2Data.items)
    
    const survivor1DB = await SurvivorModel.findById(s1Data.id)
    const survivor2DB = await SurvivorModel.findById(s2Data.id)

    const s1HasEnoughItems = hasEnoughItems(survivor1DB, s1Data.items)
    const s2HasEnoughItems = hasEnoughItems(survivor2DB, s2Data.items)
    
    if (pointsS1 == pointsS2 && s1HasEnoughItems && s2HasEnoughItems) {
      // updateItems
      s1Data.items.forEach(item => {
        survivor1DB.inventory[item.name] -= item.qtd
        survivor2DB.inventory[item.name] += item.qtd
      })
      s2Data.items.forEach(item => {
        survivor2DB.inventory[item.name] -= item.qtd
        survivor1DB.inventory[item.name] += item.qtd
      })
      survivor1DB.save()
      survivor2DB.save()

      res.json({
        status: 'success',
        survivor1DB,
        survivor2DB
      })
    } else {
      throw new Error('Someone has not enough items or the points are not equivalent')
    }
    
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
    const survivorExcluida = await SurvivorModel.findOneAndDelete({ _id: id })
    res.json({
      status: 'success',
      msg: `survivor deleted`,
      dados: survivorExcluida
    })
  } catch (err) {
    res.json({
      status: 'error',
      msg: err.message
    })
  }
}