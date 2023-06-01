import data from '../pagesData.js';

//===========================================================
// Get data for the home page title
//===========================================================
export const getHomePageTitleData = async (req, res, next) => {
  try {
    return res.send(data.homePageTitle);
  } catch (error) {
    console.log(error);
  }
};

//===========================================================
// Get data for the home page investment techniques
//===========================================================
export const getHomePageInvestmentSystems = async (req, res, next) => {
  try {
    res.status(200).send(data.investmentSystems);
  } catch (error) {
    console.log(error);
  }
};

//===========================================================
// Get data for the procedures page
//===========================================================
export const getProcedures = async (req, res, next) => {
  try {
    res.status(200).send(data.procedureData);
  } catch (error) {
    console.log(error);
  }
};

//===========================================================
// Get data for the home page investment techniques
//===========================================================
export const getServicePageInfo = async (req, res, next) => {
  try {
    res.status(200).send(data.serviceData);
  } catch (error) {
    console.log(error);
  }
};

//===========================================================
// Get data for the home page investment techniques
//===========================================================
export const getResearchData = async (req, res, next) => {
  try {
    res.status(200).send(data.ResearchData);
  } catch (error) {
    console.log(error);
  }
};

//===========================================================
// Get data for the footer component
//===========================================================

export const getFooterData = async (req, res, next) => {
  try {
    res.status(200).send(data.footerData)
  } catch (error) {
    console.log(error)
  }
}
