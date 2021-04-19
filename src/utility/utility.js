const createProduct = (productDetail, authToken) => {
  if (!productDetail) {
    return "Cannot create product. Missing details of product";
  }
  console.log(JSON.stringify(authToken));
  console.log(JSON.stringify(productDetail));

  fetch("http://localhost/wordpress_prc/wp-json/wp/v2/customproducts/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
    body: JSON.stringify(productDetail),
  })
    .then((res) => res.json())
    .then((data) => console.log(JSON.parse(data)));
};

export { createProduct };
