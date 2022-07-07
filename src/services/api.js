export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
}
