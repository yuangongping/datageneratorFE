import { addCase, addSuggestion, listSuggestion, listCase, 
         updateCase, totalCase, totalSuggestion, delCase,
         adoptCase, recommendCase, listCaseAdmin, totalCaseAdmin,
         totalSuggestionAdmin, listSuggestionAdmin, adoptSuggestion,
         delSuggestion, replySuggestion
        } from './community.js';
import { getFastConfigs } from './home.js';
import { addUserRecord } from '../api/userRecord.js'

export default {
  // 案例api
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

  // 意见appi
  totalSuggestion,
  totalSuggestionAdmin,
  listSuggestion,
  listSuggestionAdmin,
  addSuggestion,
  adoptSuggestion,
  delSuggestion,

  // 回复意见api
  replySuggestion,

  addUserRecord
  
}