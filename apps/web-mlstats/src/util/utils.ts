interface CategoryItem {
  name?: string;
}

interface DataItem {
  categorys?: CategoryItem[];
}

export const parseJson = (value: any, ret_json: boolean = false) => {
  if (typeof value !== 'string') return value;

  try {
    const jsonData: DataItem[] = JSON.parse(value);
    if (ret_json) {
      return jsonData;
    }
    let result = '';

    for (const item of jsonData) {
      const categories = item.categorys || [];
      if (categories.length >= 2) {
        const key = categories[0]?.name ?? '';
        const value = categories[1]?.name ?? '';
        result += `${key}:${value}\n`;
      }
    }

    return result;
  } catch {
    return value;
  }
};

export const ellipsis = (value: string) => {
  if (!value) return '';
  if (value.length > 20) {
    return `${value.slice(0, 20)}...`;
  }
  return value;
};
