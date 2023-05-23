import express from 'express';
import {
  getHomePageInvestmentSystems,
  getHomePageTitleData,
  getResearchData,
  getServicePageInfo,
} from '../controllers/pagesDataController.js';

// Router for the frontend pages data
const pagesDataRouter = express.Router();

// Routes
pagesDataRouter.get('/homePageTitle', getHomePageTitleData);
pagesDataRouter.get('/investments', getHomePageInvestmentSystems);
pagesDataRouter.get('/services', getServicePageInfo);
pagesDataRouter.get('/researches', getResearchData);

// Export Router
export default pagesDataRouter;
