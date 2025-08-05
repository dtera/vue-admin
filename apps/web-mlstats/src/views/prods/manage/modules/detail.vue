<script lang="ts" setup>
import { computed } from "vue";
//import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

//import { parseJson } from "#/util/utils";

const props = defineProps({
  visible: Boolean,
  record: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(["update:visible", "close"]);

// 计算属性获取当前记录
const record = computed(() => props.record || {});

// 关闭弹窗
const close = () => {
  emit("update:visible", false);
  emit("close");
};
</script>

<template>
  <!-- 详情弹窗 -->
  <a-modal
    :visible="props.visible"
    title="商品详情"
    width="800px"
    :footer="null"
    @cancel="close"
    @update:visible="close"
    centered
  >
    <div v-if="record" class="detail-container">
      <a-row class="detail-row">
        <a-col :span="6" class="detail-label">商品ID：</a-col>
        <a-col :span="18" class="detail-value">{{ record.id }}</a-col>
      </a-row>

      <a-row class="detail-row">
        <a-col :span="6" class="detail-label">商品title：</a-col>
        <a-col :span="18" class="detail-value">{{ record.prodTitle }}</a-col>
      </a-row>

      <a-row class="detail-row">
        <a-col :span="6" class="detail-label">商品图片：</a-col>
        <a-col :span="18" class="detail-value">
          <a-image :width="100" :src="record.prodImgUrl?.split(',')[0]" />
        </a-col>
      </a-row>

      <a-row class="detail-row">
        <a-col :span="6" class="detail-label">品类：</a-col>
        <a-col :span="18" class="detail-value">{{ record.prodType }}</a-col>
      </a-row>

      <a-row class="detail-row">
        <a-col :span="6" class="detail-label">小店标准商品名：</a-col>
        <a-col :span="18" class="detail-value">{{ record.l2Name }}</a-col>
      </a-row>

      <a-row class="detail-row">
        <a-col :span="6" class="detail-label">商品最低价：</a-col>
        <a-col :span="18" class="detail-value">{{ record.skuMinPrice / 100 }}元</a-col>
      </a-row>

      <!--      <a-row class="detail-row">
              <a-col :span="6" class="detail-label">商详：</a-col>
              <a-col :span="18" class="detail-value">
                <div>{{ parseJson(record.prodDetail) }}</div>
              </a-col>
            </a-row>

            <a-row class="detail-row">
              <a-col :span="6" class="detail-label">大模型推理商品名：</a-col>
              <a-col :span="18" class="detail-value">
                <VueJsonPretty
                  v-if="typeof parseJson(record.prodLlmPredNames, true) === 'object'"
                  :data="parseJson(record.prodLlmPredNames, true)"
                  :deep="3"
                />
                <span v-else>{{ parseJson(record.prodLlmPredNames, true) }}</span>
              </a-col>
            </a-row>-->
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
  padding-bottom: 12px;
  margin-bottom: 16px;
  border-bottom: 1px dashed #f0f0f0;
}

.detail-label {
  font-weight: bold;
  color: #666;
}

.detail-value {
  overflow-wrap: break-word;
}

/* 为JSON格式化添加滚动条 */
</style>
