import { randomChoice } from '@/utils/functions';
import { FIELD_PRE, RELATION_ENUM } from '@/datatypes/CONST.js';
import GeographCoordinatesData from '@/datatypes/COMMON_DATA/GeographCoordinatesData.js';

export default (options, relation) => {

  const type = relation.type;
  let longitude = '';  // 经度
  let latitude = '';  // 维度
  let geographcoordinates = new Array(2);
  const district_no = type == RELATION_ENUM.INDEPEND.EN 
  ? randomChoice(Object.keys(GeographCoordinatesData))
  : options.district_no;
  if (GeographCoordinatesData[district_no]) {
    longitude = GeographCoordinatesData[district_no]["lon"];
    latitude = GeographCoordinatesData[district_no]["lat"];
    geographcoordinates[0]= longitude;  
    geographcoordinates[1]= latitude;  
  } else {
    geographcoordinates[0]= null;  
    geographcoordinates[1]= null;  
  }

  // 将生成结果传递下去
  const deliver_options = {};
  deliver_options[FIELD_PRE + options.__fieldName] = geographcoordinates;
  return  {
    options: deliver_options,
    data: geographcoordinates
  };
};