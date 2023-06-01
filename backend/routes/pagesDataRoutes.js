import express from 'express';
import {
  getFooterData,
  getHomePageInvestmentSystems,
  getHomePageTitleData,
  getProcedures,
  getResearchData,
  getServicePageInfo,
} from '../controllers/pagesDataController.js';

// Router for the frontend pages data
const pagesDataRouter = express.Router();

// Routes
pagesDataRouter.get('/homePageTitle', getHomePageTitleData);
pagesDataRouter.get('/investments', getHomePageInvestmentSystems);
pagesDataRouter.get("/procedures", getProcedures)
pagesDataRouter.get('/services', getServicePageInfo);
pagesDataRouter.get('/researches', getResearchData);
pagesDataRouter.get("/footer", getFooterData)

// Export Router
export default pagesDataRouter;
