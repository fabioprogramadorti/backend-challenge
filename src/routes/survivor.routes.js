import { Router } from 'express'
import { 
  createSurvivor, 
  listSurvivors, 
  updateSurvivor,
  deleteSurvivor,
  getSurvivorById 
} from '../controllers/survivor.controller'

const router = Router()

// survivors endpoits 
router.get('/', listSurvivors)
router.post('/', createSurvivor)
router.put('/:id', updateSurvivor)
router.delete('/:id', deleteSurvivor)
router.get('/:id', getSurvivorById)

export default router