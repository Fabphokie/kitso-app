// src/utils/queryUtils.js
import { fetchPuberty } from './data/fetchPuberty';
import { fetchPregnancy } from './data/fetchPregnancy';
import { fetchFamilyPlanning } from './data/fetchFamilyPlanning';
import { fetchMentalWellness } from './data/fetchMentalWellness';

export async function fetchResponse(question) {
  if (question.toLowerCase().includes('puberty')) {
    return await fetchPuberty();
  } else if (question.toLowerCase().includes('pregnancy')) {
    return await fetchPregnancy();
  } else if (question.toLowerCase().includes('family planning')) {
    return await fetchFamilyPlanning();
  } else if (question.toLowerCase().includes('mental wellness')) {
    return await fetchMentalWellness();
  } else {
    return { title: "No Data", content: "I don't have an answer for that question." };
  }
}
