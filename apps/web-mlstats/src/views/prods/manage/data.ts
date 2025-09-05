import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';

import { $t } from '#/locales';

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'productId',
      label: $t('prods.manage.productId'),
    },
    {
      component: 'Input',
      fieldName: 'productName',
      label: $t('prods.manage.productName'),
    },
    {
      component: 'Input',
      fieldName: 'lastCateName',
      label: $t('prods.manage.lastCateName'),
    },
  ];
}

export const columns = [
  {
    field: 'productId',
    title: $t('prods.manage.productId'),
    width: '15%',
  },
  {
    field: 'productName',
    title: $t('prods.manage.productName'),
    width: '25%',
  },
  {
    field: 'headImgInfo',
    title: $t('prods.manage.headImgInfo'),
    cellRender: {
      name: 'CellImage',
      props: {
        width: 80,
      },
    },
    width: '10%',
    type: 'img',
  },
  {
    field: 'lastCateName',
    title: $t('prods.manage.lastCateName'),
    width: '15%',
  },
  /* {
    field: 'prodDetail',
    title: $t('prods.manage.prodDetail'),
    type: 'html',
    formatter: ({ cellValue }) => {
      return parseJson(cellValue).replaceAll('\n', '<br />');
    },
    width: '20%',
  },*/
  /* {
    field: 'prodLlmPredNames',
    title: $t('prods.manage.prodLlmPredNames'),
    cellRender: {
      name: 'CellJsonPretty',
      props: {
        deep: 3,
      },
    },
    width: '30%',
  },*/
  {
    title: $t('prods.manage.l2Name'),
    field: 'l2Name',
    width: '20%',
  },
  {
    title: $t('prods.manage.skuMaxPrice'),
    field: 'skuMaxPrice',
    width: '10%',
    type: 'price',
    formatter({ cellValue }: { cellValue: any }): string {
      return `${cellValue / 100}元`;
    },
  },
];

export function useColumns<T>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  const cols: any = [...columns];
  cols.push({
    align: 'center',
    cellRender: {
      attrs: {
        nameField: 'prodTitle',
        nameTitle: $t('prods.manage.prodTitle'),
        onClick: onActionClick,
      },
      name: 'CellOperation',
      options: ['detail'],
    },
    field: 'operation',
    fixed: 'right',
    title: $t('prods.manage.operation'),
    width: '5%',
  });

  return cols;
}
