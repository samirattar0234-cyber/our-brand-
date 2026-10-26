(() => {
  const catalog = [
    {
      department: 'women',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      prices: [2200, 125],
      products: [
        ['Soft Cotton Blouse', 'tops'], ['Floral Midi Dress', 'dresses'], ['City Light Jacket', 'outerwear'],
        ['Pleated Midi Skirt', 'skirts'], ['Everyday Cotton Tee', 'tops'], ['Relaxed Linen Shirt', 'shirts'],
        ['Classic Wrap Dress', 'dresses'], ['Weekend Denim Jacket', 'outerwear'], ['Straight-Leg Trousers', 'trousers'],
        ['Ribbed Knit Top', 'tops'], ['Tiered Summer Dress', 'dresses'], ['Tailored Wide-Leg Pants', 'trousers'],
        ['Button-Front Cardigan', 'knitwear'], ['Casual Denim Skirt', 'skirts'], ['Lightweight Tunic', 'tunics'],
        ['Longline Open Jacket', 'outerwear'], ['Everyday Leggings', 'leggings'], ['Printed Peplum Top', 'tops'],
        ['Satin Evening Blouse', 'tops'], ['Classic Shirt Dress', 'dresses'],
      ],
    },
    {
      department: 'men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      prices: [2500, 150],
      products: [
        ['Everyday Oxford Shirt', 'shirts'], ['Classic Straight Jeans', 'denim'], ['Relaxed Fleece Hoodie', 'sweatshirts'],
        ['Essential Cotton Tee', 't-shirts'], ['Smart Casual Chinos', 'trousers'], ['Lightweight Bomber Jacket', 'outerwear'],
        ['Formal Button-Down Shirt', 'shirts'], ['Weekend Jogger Pants', 'joggers'], ['Textured Knit Sweater', 'knitwear'],
        ['Classic Denim Jacket', 'outerwear'], ['Long-Sleeve Henley Tee', 't-shirts'], ['Tailored Office Trousers', 'trousers'],
        ['Zip-Up Track Jacket', 'activewear'], ['Relaxed Cargo Pants', 'trousers'], ['Polo Collar Shirt', 'shirts'],
        ['Everyday Crewneck Sweatshirt', 'sweatshirts'], ['Slim Fit Dark Jeans', 'denim'], ['Lightweight Linen Shirt', 'shirts'],
        ['Quilted Winter Jacket', 'outerwear'], ['Modern Two-Piece Suit', 'formalwear'],
      ],
    },
    {
      department: 'kids',
      sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
      prices: [1100, 90],
      products: [
        ['Mini Explorer Set', 'two-piece sets'], ['Weekend Play Tee', 't-shirts'], ['Little Star Cotton Dress', 'dresses'],
        ['Comfy Pull-On Joggers', 'joggers'], ['Rainbow Graphic Tee', 't-shirts'], ['Everyday Denim Dungarees', 'denim'],
        ['Cozy Zip Hoodie', 'sweatshirts'], ['Sunny Day Shorts Set', 'two-piece sets'], ['Classic School Shirt', 'shirts'],
        ['Soft Knit Cardigan', 'knitwear'], ['Playground Leggings', 'leggings'], ['Button-Up Casual Shirt', 'shirts'],
        ['Party Time Dress', 'dresses'], ['Easy-Wear Cotton Pants', 'trousers'], ['Colorblock Sweatshirt', 'sweatshirts'],
        ['Lightweight Rain Jacket', 'outerwear'], ['Printed Summer Romper', 'rompers'], ['Comfy Pajama Set', 'sleepwear'],
        ['Everyday Polo Tee', 't-shirts'], ['Denim Jacket for Kids', 'outerwear'],
      ],
    },
    {
      department: 'traditional',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      prices: [3300, 175],
      products: [
        ['Embroidered Saree', 'sarees'], ['Festive Saree', 'sarees'], ['Classic Straight Kurta', 'kurtas'],
        ['Everyday Shalwar Kameez', 'shalwar kameez'], ['Printed Lawn Suit', 'three-piece suits'], ['Embroidered Chiffon Suit', 'three-piece suits'],
        ['Men’s Cotton Kurta', 'men’s kurtas'], ['Traditional Waistcoat', 'waistcoats'], ['Festive Anarkali Dress', 'formal dresses'],
        ['Classic Kurta Pajama', 'kurta pajama'], ['Lightweight Dupatta Set', 'three-piece suits'], ['Formal Embroidered Kurta', 'kurtas'],
        ['Daily Wear Lawn Kameez', 'shalwar kameez'], ['Occasion Wear Lehenga', 'lehenga'], ['Men’s Eid Kurta', 'men’s kurtas'],
        ['Printed Khaddar Suit', 'three-piece suits'], ['Elegant Long Frock', 'formal dresses'], ['Classic Waistcoat Set', 'waistcoats'],
        ['Soft Cotton Kurti', 'kurtis'], ['Festive Embroidered Suit', 'three-piece suits'],
      ],
    },
    {
      department: 'activewear',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      prices: [1950, 110],
      products: [
        ['Men’s Track Suit Set', 'tracksuits'], ['Men’s Training T-Shirt', 't-shirts'], ['Men’s Gym Training Shorts', 'shorts'],
        ['Men’s Performance Running Pants', 'running pants'], ['Men’s Quick-Dry Running Tee', 't-shirts'], ['Men’s Core Track Pants', 'track pants'],
        ['Men’s Strength Training Tee', 't-shirts'], ['Men’s Outdoor Running Jacket', 'running jackets'], ['Men’s Sprint Running Set', 'running sets'],
        ['Men’s Workout Tee and Shorts', 'training sets'], ['Men’s Warm-Up Zip Hoodie', 'hoodies'], ['Men’s Endurance Running Outfit', 'running sets'],
        ['Men’s Training Tee and Shorts', 'training sets'], ['Men’s Training Track Pants', 'track pants'], ['Men’s Cross-Training Tee', 't-shirts'],
        ['Men’s Outdoor Training Set', 'training sets'], ['Men’s Red Track Suit', 'tracksuits'], ['Men’s Lightweight Running Shorts', 'shorts'],
        ['Men’s Race-Day Sportswear Set', 'sportswear sets'], ['Men’s Everyday Track Pants', 'track pants'],
      ],
    },
  ];

  const badges = ['NEW ARRIVAL', 'EVERYDAY FAVORITE', 'JUST IN', 'OUR BRAND PICK', 'POPULAR'];
  const sizeOptions = (sizes) => [
    '<option value="">Choose size</option>',
    ...sizes.map((size) => `<option>${size}</option>`),
  ].join('');

  const cards = catalog.flatMap((group) => group.products.map(([name, type], index) => {
    const imageName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const image = `images/catalog/${group.department}-${imageName}.jpg`;
    const price = group.prices[0] + (index * group.prices[1]);
    const oldPrice = price + Math.round(price * 0.2 / 50) * 50;
    const safeName = name.replace(/[&<>'"]/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
    })[character]);
    const safeType = type.replace(/[&<>'"]/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
    })[character]);

    return `
      <article class="product-card" data-department="${group.department}" data-type="${safeType}">
        <img src="${image}" alt="${safeName}" loading="lazy" decoding="async" />
        <div class="product-info">
          <span class="badge">${badges[index % badges.length]}</span>
          <h3>${safeName}</h3>
          <p class="product-type">${safeType}</p>
          <p class="price">Rs. ${price.toLocaleString('en-PK')}</p>
          <p class="old-price">Rs. ${oldPrice.toLocaleString('en-PK')}</p>
          <p class="rating">★★★★★ <span>(${24 + (index * 7) % 90})</span></p>
          <label class="size-label">Size<select class="product-size" aria-label="Choose size for ${safeName}">${sizeOptions(group.sizes)}</select></label>
          <button type="button" class="add-cart">Add to bag</button>
        </div>
      </article>`;
  }));

  document.querySelector('#all-products').innerHTML = cards.join('');
  window.OUR_BRAND_CATALOG = catalog;
})();
