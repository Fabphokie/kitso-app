// utils/queryUtils.js
import { getPubertyInfo } from './data/fetchPuberty';
import { getPregnancyInfo } from './data/fetchPregnancy'; // Adjust the import paths as necessary
import { getFamilyPlanningInfo } from './data/fetchFamilyPlanning';
import { getMentalWellnessInfo } from './data/fetchMentalWellness';

export async function fetchResponse(question) {
  if (question.toLowerCase().includes('puberty')) {
    return getPubertyInfo();
  } else if (question.toLowerCase().includes('pregnancy')) {
    return getPregnancyInfo();
  } else if (question.toLowerCase().includes('family planning')) {
    return getFamilyPlanningInfo();
  } else if (question.toLowerCase().includes('mental wellness')) {
    return getMentalWellnessInfo();
  } else {
    return "I don't have an answer for that question.";
  }
}
