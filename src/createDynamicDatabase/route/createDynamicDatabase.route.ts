import express from 'express';
import dynamicDatabaseConroller from '../controller/createdynamicDatabase.controller'
const router = express.Router();

router.post('/init-database', dynamicDatabaseConroller.createDynamicDatabase);

export default router;