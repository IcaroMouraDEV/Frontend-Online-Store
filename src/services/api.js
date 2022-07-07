export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  return data;
}

export async function getProductsFromCategoryAndQuery(/* categoryId, query */) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
}
