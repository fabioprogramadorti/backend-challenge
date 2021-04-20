import { Router } from 'express'
import {
  reportsController
} from '../controllers/reports.controller'

const router = Router()

//1. Percentage of infected survivors.
//2. Percentage of non - infected survivors.
//3. Average amount of each kind of resource by survivor(e.g. 5 waters per survivor)
//4. Points lost because of infected survivor.

// reports endpoits 
router.get('', reportsController)

export default router