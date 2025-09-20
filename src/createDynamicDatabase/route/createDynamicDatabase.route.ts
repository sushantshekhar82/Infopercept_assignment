import express from 'express';
import dynamicDatabaseConroller from '../controller/createdynamicDatabase.controller'
const router = express.Router();
console.log("here1")
router.post('/init-database', dynamicDatabaseConroller.createDynamicDatabase);

export default router;