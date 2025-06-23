<script lang="ts" setup>
import type {
  OnActionClickParams,
  VxeTableGridOptions
} from "#/adapter/vxe-table";
import type { ProductApi } from "#/api";

import { ref } from "vue";

import { Page, useVbenDrawer } from "@vben/common-ui";

import { useVbenVxeGrid } from "#/adapter/vxe-table";
import { getProductList } from "#/api";
import { $t } from "#/locales";

import { useColumns, useGridFormSchema } from "./data";
import Detail from "./modules/detail.vue";
import Form from "./modules/form.vue";

const [FormDrawer] = useVbenDrawer({
  connectedComponent: Form,
  destroyOnClose: true
});

const [Grid] = useVbenVxeGrid({
  formOptions: {
    schema: useGridFormSchema(),
    submitOnChange: true
  },
  gridOptions: {
    columns: useColumns(onActionClick),
    height: "auto",
    keepSource: true,
    showOverflow: false,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getProductList({
            pageNum: page.currentPage,
            pageSize: page.pageSize,
            ...formValues
          });
        }
      }
    },
    pagerConfig: {
      pageSize: 10,
      layouts: ["Total", "Home", "JumpNumber", "End", "FullJump"],
      autoHidden: true
    },
    rowConfig: {
      keyField: "id",
      isHover: true
    },
    columnConfig: {
      isHover: true
    },
    cellConfig: {
      padding: true
    },
    toolbarConfig: {
      custom: true,
      export: false,
      refresh: { code: "query" },
      search: true,
      zoom: true
    }
  } as VxeTableGridOptions<ProductApi.Product>,
  showSearchForm: false
});

function onActionClick(e: OnActionClickParams<ProductApi.Product>) {
  switch (e.code) {
    case "detail": {
      showDetail(e.row);
      break;
    }
  }
}

// 详情弹窗状态
const detailVisible = ref(false);
const currentRecord = ref<any>(null);

// 打开详情弹窗
const showDetail = (record: any) => {
  currentRecord.value = record;
  detailVisible.value = true;
};

// 关闭详情弹窗
const closeDetail = () => {
  detailVisible.value = false;
  currentRecord.value = null;
};
</script>
<template>
  <Page auto-content-height>
    <FormDrawer />
    <Grid :table-title="$t('prods.manage.list')">
      <template #toolbar-tools></template>
    </Grid>
  </Page>

  <!-- 详情弹窗组件 -->
  <Detail
    v-model:visible="detailVisible"
    :record="currentRecord"
    @close="closeDetail"
  />
</template>
