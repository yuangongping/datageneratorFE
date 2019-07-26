import { addCase, addSuggestion, listSuggestion, listCase, 
         updateCase, totalCase, totalSuggestion, delCase,
         adoptCase, recommendCase, listCaseAdmin, totalCaseAdmin,
         totalSuggestionAdmin, listSuggestionAdmin, adoptSuggestion,
         delSuggestion
        } from './community.js';
import { getFastConfigs } from './home.js';

export default {
  addCase,
  listCase,
  updateCase,
  totalCase,
  getFastConfigs,
  delCase,
  adoptCase,
  recommendCase,
  listCaseAdmin,
  totalCaseAdmin,

  totalSuggestion,
  totalSuggestionAdmin,
  listSuggestion,
  listSuggestionAdmin,
  addSuggestion,
  adoptSuggestion,
  delSuggestion
  
}