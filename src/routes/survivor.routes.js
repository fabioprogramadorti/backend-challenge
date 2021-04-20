import { Router } from 'express'
import { 
  createSurvivor, 
  listSurvivors, 
  updateLocation,
  deleteSurvivor,
  getSurvivorById 
} from '../controllers/survivor.controller'

const router = Router()

// survivors endpoits 
router.get('/', listSurvivors)
router.post('/', createSurvivor)
router.put('/:id', updateLocation)
router.delete('/:id', deleteSurvivor)
router.get('/:id', getSurvivorById)

export default router