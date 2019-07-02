<template>
  <div class="switch-config">
    <Tooltip max-width="200" content="设置该字段是否为不重复的值，请合理设置唯一性" theme="light" placement="top">
      <i-switch
        size="large"
        v-model="dataTypeConfig.__unique"
      >
        <span slot="open">唯一</span>
        <span slot="close">唯一</span>
      </i-switch>
    </Tooltip>
  </div>
</template>
