import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { ProductApi } from '#/api';

import { $t } from '#/locales';
import { parseJson } from '#/util/utils';

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    { component: 'Input', fieldName: 'id', label: $t('prods.manage.id') },
    {
      component: 'Input',
      fieldName: 'prodTitle',
      label: $t('prods.manage.prodTitle'),
    },
    {
      component: 'Input',
      fieldName: 'prodType',
      label: $t('prods.manage.prodType'),
    },
  ];
}

export function useColumns<T = ProductApi.Product>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'id',
      title: $t('prods.manage.id'),
      width: '10%',
    },
    {
      field: 'prodTitle',
      title: $t('prods.manage.prodTitle'),
      width: '15%',
    },
    {
      field: 'prodImgUrl',
      title: $t('prods.manage.prodImgUrl'),
      cellRender: {
        name: 'CellImage',
        props: {
          width: 80,
        },
      },
      width: '10%',
    },
    {
      field: 'prodType',
      title: $t('prods.manage.prodType'),
      width: '10%',
    },
    {
      field: 'prodDetail',
      title: $t('prods.manage.prodDetail'),
      type: 'html',
      formatter: ({ cellValue }) => {
        return parseJson(cellValue).replaceAll('\n', '<br />');
      },
      width: '20%',
    },
    {
      field: 'prodLlmPredNames',
      title: $t('prods.manage.prodLlmPredNames'),
      cellRender: {
        name: 'CellJsonPretty',
        props: {
          deep: 3,
        },
      },
      width: '30%',
    },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'prodTitle',
          nameTitle: $t('prods.manage.prodTitle'),
          onClick: onActionClick,
        },
        options: ['detail'],
        name: 'CellOperation',
      },
      field: 'operation',
      fixed: 'right',
      title: $t('prods.manage.operation'),
      width: '5%',
    },
  ];
}
