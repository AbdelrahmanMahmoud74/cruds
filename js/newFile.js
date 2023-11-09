submit.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    cateogry: cateogry.value,
  };

  dataPro.push(newPro);

  localStorage.setItem('product', JSON.stringify(dataPro));
  clearData();
  showData();



};
