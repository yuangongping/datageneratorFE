<template>
  <!-- 修改组件独立的样式时注意修改组件class -->
  <div class="district-config">

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
        <Tooltip max-width="200" theme="light" placement="top">
        <div slot="content" v-if="relationValue.allowTypes === 'ALL'">可以关联所有字段</div>
        <div slot="content" v-else>建议关联 <Tag color="primary" style="color: #fff;" v-for="datatype in relationValue.allowTypes" :key="datatype">{{ DATA_TYPES[datatype].alias }}</Tag> 组件, 请合理设置关联字段</div>
        <Input type="text"
          v-model="relationValue.fieldNames"
          @on-change="chgRelation"
        />
        </Tooltip>
			</label>
		</div>

    <div class="config-item" v-if="relationValue.type === RELATION_ENUM.INDEPEND.EN">
      <div>
          <RadioGroup v-model="optionsValue.Select_district_mode" @on-change="chgRadio" type="button" size="small">
            <Radio label="随机区县"></Radio>
            <Radio label="自选区县"></Radio>
          </RadioGroup>
      </div>
      
      <div class="select" v-if="optionsValue.Select_district_mode == OPTIONS_ENUM.District.DISTRICT_SELECTABLE.CN">
        <label>
          <span class="config-title">省份选择</span>
          <Select
            v-model="provinceChoice" 
            @on-change="chgProvinces"
            multiple
            :max-tag-count="1"
            style="width:200px;"
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

      <div class="select" v-if="optionsValue.Select_district_mode == OPTIONS_ENUM.District.DISTRICT_SELECTABLE.CN" >
        <label>
          <span class="config-title">城市选择</span>
          <Select
            v-model="cityChioce" 
            @on-change="chgcities"
            multiple
            :max-tag-count="1"
            style="width:200px;"
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

      <div class="select" v-if="optionsValue.Select_district_mode == OPTIONS_ENUM.District.DISTRICT_SELECTABLE.CN">
        <label>
          <span class="config-title">区县选择</span>
          <Select
            v-model="optionsValue.districts" 
            @on-change="chgdistricts"
            multiple
            :max-tag-count="1"
            style="width:200px;"
          >
            <Option 
              v-for="district in this.districts"
              :value="district"
              :key="district"
            >
            {{ district }}
            </Option>
          </Select>
        </label>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.select{
  margin-left: 10px;
}

</style>


<script>
import { RELATION_ENUM, ALLOW_RELATIONS, OPTIONS_ENUM } from '@/datatypes/CONST.js';
import { Input, Select, Option, Radio, RadioGroup, Tooltip, Tag } from "iview";
import OriginalData from '@/datatypes/COMMON_DATA/OriginalData_dict.js';
import { DATA_TYPES } from '@/datatypes/index.js';
export default {
  data() {
    return {
      DATA_TYPES: DATA_TYPES,
      optionsValue: JSON.parse(this.options),
      relationValue: JSON.parse(this.relation),
      RELATION_ENUM: RELATION_ENUM,
      OPTIONS_ENUM: OPTIONS_ENUM,
      allowRelations: ALLOW_RELATIONS[this.dataType],
      allProvinces: Object.keys(OriginalData),
      provinceChoice: [],
      cityChioce: [],
      cities: [],
      cities_dict: {},
      districts: []
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
    RadioGroup ,
    Tooltip,
    Tag

  },
  methods: {
    chgProvinces() {
      this.cities  = [];
      this.provinceChoice.forEach(el => {
          this.cities= this.cities.concat(Object.keys(OriginalData[el]));
          let key;
          for(key in OriginalData[el]){
            this.cities_dict[key] = OriginalData[el][key];
          }
      });
      this.$emit('update:options', JSON.stringify(this.optionsValue));
    },
    chgcities() {
      this.districts = [];
      this.cityChioce.forEach(el => {
          this.districts= this.districts.concat(Object.keys(this.cities_dict[el]));
      });
      this.$emit('update:options', JSON.stringify(this.optionsValue));
    },
    chgdistricts(){
      this.optionsValue.districts.forEach(el => {
        for(let key in this.cities_dict){
          if(el in this.cities_dict[key]){
            this.optionsValue.districts_dict[el] = this.cities_dict[key][el];
            break;
          }
        }
      });
      this.$emit('update:options', JSON.stringify(this.optionsValue));
    },
    chgRadio() {
      if(this.optionsValue.Select_district_mode == OPTIONS_ENUM.District.DISTRICT_RANDOM.CN){
        this.optionsValue.districts = [];
        this.cities = [];
        this.provinceChoice = [];
        this.districts = [];
      }
      this.$emit('update:options', JSON.stringify(this.optionsValue));
    },
    chgRelation() {
      if(this.relationValue.type==RELATION_ENUM.COR_RELATION.EN){ 
        this.cities = [];
        this.provinceChoice = [];
        this.optionsValue.Select_district_mode = OPTIONS_ENUM.District.DISTRICT_RANDOM.CN;
      }
      this.$emit('update:relation', JSON.stringify(this.relationValue));
    }
  }
};
</script>
