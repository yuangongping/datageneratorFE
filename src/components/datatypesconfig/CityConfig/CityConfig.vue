<template>
  <!-- 修改组件独立的样式时注意修改组件class -->
  <div class="city-config">
		<div class="config-item relation-config">
      <Select
        v-model="relationValue.type" 
        style="width:200px"
        @on-change="chgRelation"
      >
        <Option 
          v-for="relation in allowRelations"
          :value="relation"
          :key="relation"
        >
        {{ RELATION_ENUM[relation].CN }}
        </Option>
      </Select>
		</div>

		<div class="config-item" v-if="relationValue.type === RELATION_ENUM.COR_RELATION.EN">
			<label>
        <span class="config-title">关联字段</span>
        <Input type="text"
          v-model="relationValue.fieldNames"
          @on-change="chgRelation"
        />
			</label>
		</div>

    <div class="config-item" v-if="relationValue.type === RELATION_ENUM.INDEPEND.EN ">
        <div class="config-item">
          <RadioGroup v-model="optionsValue.Select_city_mode" @on-change="chgRadio" type="button" size="small">
            <Radio label="随机城市" ></Radio>
            <Radio label="自选城市"></Radio>
          </RadioGroup>
        </div>
      
        <div v-if="optionsValue.Select_city_mode == SELECT_MODE_ENUM.City.CITY_SELECTABLE.CN" >
          <label>
            <span class="config-title">省份选择</span>
            <Select
              v-model="optionsValue.provinceChoice" 
              @on-change="chgProvinces"
              multiple
              :max-tag-count="1"
              collapse-tags
              style="width:200px"
            >
              <Option 
                v-for="province in allProvinces"
                :value="province"
                :key="province"
              >
              {{ province }}
              </Option>
            </Select>
          </label>
        </div>

        <div v-if="optionsValue.Select_city_mode == SELECT_MODE_ENUM.City.CITY_SELECTABLE.CN" style="margin-left:10px;">
          <label>
            <span class="config-title">城市选择</span>
            <Select
              v-model="optionsValue.cities" 
              @on-change="chgcities"
              :max-tag-count="1"
              multiple
              style="width:200px"
            >
              <Option 
                v-for="city in this.cities"
                :value="city"
                :key="city"
              >
              {{ city }}
              </Option>
            </Select>
          </label>
        </div>
      </div>
  </div>
</template>

<script>
import { RELATION_ENUM, ALLOW_RELATIONS, OPTIONS_ENUM } from '@/datatypes/CONST.js';
import { Input, Select, Option, Radio, RadioGroup } from "iview";
import OriginalData from '@/datatypes/COMMON_DATA/OriginalData_dict.js';
export default {
  data() {
    return {
      optionsValue: JSON.parse(this.options),
      relationValue: JSON.parse(this.relation),
      RELATION_ENUM: RELATION_ENUM,
      OPTIONS_ENUM: OPTIONS_ENUM,
      allowRelations: ALLOW_RELATIONS[this.dataType],
      allProvinces: Object.keys(OriginalData),
      cities: []
    };
  },
  props: {
    dataType: String,
    options: String,
    relation: String,
  },
  components: {
    Select,
    Option,
    Input,
    Radio, 
    RadioGroup
  },
  methods: {
    chgProvinces() {  // 选择省份时，将所选省份下属所有城市加入城市选择下拉框options里面
      this.cities  = [];
      this.optionsValue.provinceChoice.forEach(el => {
        if(el in {'北京市':"", '上海市':"", '重庆市':"", '天津市':""}){
          this.cities= this.cities.concat(el);
        }else{
          this.cities= this.cities.concat(Object.keys(OriginalData[el]));
          let index =  this.cities.indexOf("省直辖县级行政单位")
          if(index > -1){
            this.cities.splice(index, 1);
          }
        }
      });
      this.$emit('update:options', JSON.stringify(this.optionsValue));
    },
    chgcities() {
      this.$emit('update:options', JSON.stringify(this.optionsValue));
    },
    chgRadio() {
      if(this.optionsValue.Select_city_mode == OPTIONS_ENUM.City.CITY_RANDOM.CN){
        this.optionsValue.cities = [];
        this.cities = [];
        this.optionsValue.provinceChoice = [];
      }
      this.$emit('update:options', JSON.stringify(this.optionsValue));
    },
    chgRelation() {
      if(this.relationValue.type == RELATION_ENUM.COR_RELATION.EN){ 
        this.cities = [];
        this.optionsValue.provinceChoice = [];
        this.optionsValue.Select_city_mode = OPTIONS_ENUM.City.CITY_RANDOM.CN;
      }
      this.$emit('update:relation', JSON.stringify(this.relationValue));
    }
  }
};
</script>
