<!-- detail.vue -->
<!--suppress ALL -->
<script lang="ts" setup>
import { computed } from 'vue';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

import { parseJson } from '#/util/utils';
import { columns } from '#/views/prods/manage/data';

const props = defineProps({
  visible: Boolean,
  record: Object,
});

const emit = defineEmits(['update:visible', 'close']);

// 计算属性获取当前记录
const record = computed(() => props.record || {});

// 关闭弹窗
const close = () => {
  emit('update:visible', false);
  emit('close');
};
</script>

<template>
  <!-- 详情弹窗 -->
  <a-modal
    v-model:visible="props.visible"
    field="商品详情"
    width="800px"
    :footer="null"
    @cancel="close"
    centered
  >
    <div v-if="record" class="detail-container">
      <a-row class="detail-row" v-for="column in columns">
        <a-col :span="6" class="detail-label">{{ column.title }}</a-col>
        <a-col :span="18" v-if="column.type === 'img'" class="detail-value">
          <a-image :width="100" :src="record[column.field]?.split(',')[0]" />
        </a-col>
        <a-col
          :span="18"
          v-else-if="column.type === 'prop'"
          class="detail-value"
        >
          <div v-html="parseJson(record[column.field])"></div>
        </a-col>
        <a-col
          :span="18"
          v-else-if="column.type === 'json'"
          class="detail-value"
        >
          <VueJsonPretty
            v-if="typeof parseJson(record[column.field], true) === 'object'"
            :data="parseJson(record[column.field], true)"
            :deep="3"
          />
          <span v-else>{{ parseJson(record[column.field], true) }}</span>
        </a-col>
        <a-col
          :span="18"
          v-else-if="column.type === 'price'"
          class="detail-value"
        >
          {{ record[column.field] / 100 }}元
        </a-col>
        <a-col :span="18" v-else class="detail-value">
          {{ record[column.field] }}
        </a-col>
      </a-row>
    </div>

    <template #footer>
      <a-button type="primary" @click="close">关闭</a-button>
    </template>
  </a-modal>
</template>

<style scoped>
.detail-container {
  padding: 10px;
}

.detail-row {
  margin-bottom: 16px;
  border-bottom: 1px dashed #f0f0f0;
  padding-bottom: 12px;
}

.detail-label {
  font-weight: bold;
  color: #666;
}

.detail-value {
  word-break: break-word;
}

/* 为JSON格式化添加滚动条 */
:deep(.vjs-tree) {
  max-height: 300px;
  overflow: auto;
  border: 1px solid #e8e8e8;
  padding: 10px;
  border-radius: 4px;
  background-color: #fafafa;
}
</style>
