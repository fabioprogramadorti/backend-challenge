import { Router } from 'express'
import { 
  createSurvivor, 
  listSurvivors, 
  updateLocation,
  deleteSurvivor,
  getSurvivorById,
  updateInventory,
  updateInfected
} from '../controllers/survivor.controller'

const router = Router()

// survivors endpoits 
router.get('/', listSurvivors)
router.post('/', createSurvivor)
router.put('/infection-alert/', updateInfected)
router.put('/trade/', updateInventory)
router.put('/:id', updateLocation)
router.delete('/:id', deleteSurvivor)
router.get('/:id', getSurvivorById)

export default router