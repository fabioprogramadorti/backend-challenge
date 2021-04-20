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

export async function updateSurvivor(req, res) {
  delete body.inventory
  const id = req.params.id
  let data = req.body
  delete data.inventory
  try {
    const updatedSurvivor = await SurvivorModel.findOneAndUpdate({_id:id}, data)
    res.json(updatedSurvivor)
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