import { Router } from 'express';
import authRoute from './authRoute';
import docsRoute from './docsRoute';
import commentRoute from './commentRoute';

const router = Router();

router.use('/auth', authRoute);
router.use('/docs', docsRoute);
router.use('/comments', commentRoute)

export default router;
