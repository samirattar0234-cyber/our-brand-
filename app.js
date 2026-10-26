(() => {
  const STORAGE_KEY = 'our-brand-clothing-cart';
  const cart = loadCart();
  const cartLink = document.querySelector('.cart');
  const drawer = document.querySelector('#cart-drawer');
  const overlay = document.querySelector('#drawer-overlay');
  const cartItems = document.querySelector('#cart-items');
  const cartEmpty = document.querySelector('#cart-empty');
  const cartSummary = document.querySelector('#cart-summary');
  const cartTotal = document.querySelector('#cart-total');
  const toast = document.querySelector('#toast');
  const searchForm = document.querySelector('.search-box');
  const searchInput = document.querySelector('.search-box input');
  const products = [...document.querySelectorAll('.product-card')];
  const filters = [...document.querySelectorAll('.filter-chip')];
  const installButton = document.querySelector('#install-app');
  const saveAppButton = document.querySelector('#top-app-link');
  let activeFilter = 'all';
  let installPrompt;

  function loadCart() {
    try {
      const savedCart = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(savedCart) ? savedCart : [];
    } catch (error) {
      console.warn('Unable to read the saved shopping bag.', error);
      return [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      return true;
    } catch (error) {
      console.error('Unable to save the shopping bag.', error);
      showToast('Your bag could not be saved on this device.');
      return false;
    }
  }

  function money(value) {
    return `Rs. ${value.toLocaleString('en-PK')}`;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    })[character]);
  }

  function renderCart() {
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartItems.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" />
        <div class="cart-item-details">
          <h3>${escapeHtml(item.name)}</h3>
          <p class="cart-size">Size: ${escapeHtml(item.size)}</p>
          <strong>${money(item.price)}</strong>
          <div class="quantity-controls">
            <button type="button" data-action="decrease" data-index="${index}" aria-label="Decrease ${escapeHtml(item.name)} quantity">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-action="increase" data-index="${index}" aria-label="Increase ${escapeHtml(item.name)} quantity">+</button>
            <button type="button" class="remove-item" data-action="remove" data-index="${index}">Remove</button>
          </div>
        </div>
      </div>
    `).join('');

    cartEmpty.hidden = cart.length > 0;
    cartSummary.hidden = cart.length === 0;
    cartTotal.textContent = money(total);
    cartLink.textContent = `🛍 Bag${itemCount ? ` (${itemCount})` : ''}`;
    cartLink.setAttribute('aria-label', `Open shopping bag, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`);
  }

  function openCart() {
    drawer.classList.add('open');
    overlay.classList.add('visible');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-open');
    drawer.querySelector('.close-cart').focus();
  }

  function closeCart() {
    drawer.classList.remove('open');
    overlay.classList.remove('visible');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawer-open');
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('visible');
    window.clearTimeout(showToast.timeout);
    showToast.timeout = window.setTimeout(() => toast.classList.remove('visible'), 2800);
  }

  const welcomeScreen = document.querySelector('#welcome-screen');
  const welcomeSkip = document.querySelector('#welcome-skip');
  let welcomeRemovalTimer;

  function dismissWelcome() {
    if (!welcomeScreen || welcomeScreen.classList.contains('is-leaving')) return;

    window.clearTimeout(welcomeRemovalTimer);
    welcomeScreen.classList.add('is-leaving');
    welcomeScreen.addEventListener('animationend', (event) => {
      if (event.target === welcomeScreen) welcomeScreen.remove();
    }, { once: true });
    welcomeRemovalTimer = window.setTimeout(() => welcomeScreen.remove(), 500);
  }

  if (welcomeScreen) {
    welcomeSkip.addEventListener('click', dismissWelcome);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.setTimeout(dismissWelcome, reducedMotion ? 350 : 1700);
  }

  function updateProducts() {
    const query = searchInput.value.trim().toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    let visibleCount = 0;

    products.forEach((product) => {
      const matchesDepartment = activeFilter === 'all' || product.dataset.department === activeFilter;
      const searchableText = `${product.textContent} ${product.dataset.type} ${product.querySelector('img').alt}`
        .toLocaleLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      const matchesSearch = !query || searchableText.includes(query);
      product.hidden = !(matchesDepartment && matchesSearch);
      if (!product.hidden) visibleCount += 1;
    });

    document.querySelector('#product-count').textContent = `${visibleCount} ${visibleCount === 1 ? 'style' : 'styles'}`;
    document.querySelector('#no-results').hidden = visibleCount > 0;
    const groupCounts = new Map();
    products.forEach((product) => {
      if (!product.hidden) groupCounts.set(product.dataset.department, (groupCounts.get(product.dataset.department) || 0) + 1);
    });
    const summary = document.querySelector('#catalog-summary');
    if (summary) {
      summary.textContent = activeFilter === 'all' && !query
        ? `${groupCounts.get('women') || 0} women’s · ${groupCounts.get('men') || 0} men’s · ${groupCounts.get('kids') || 0} kids’ · ${groupCounts.get('activewear') || 0} men’s activewear · ${groupCounts.get('traditional') || 0} traditional styles`
        : '';
    }
  }

  function setFilter(filter) {
    activeFilter = filter;
    filters.forEach((button) => {
      const isActive = button.dataset.filter === filter;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
    updateProducts();
  }

  if (saveAppButton) {
    saveAppButton.addEventListener('click', () => {
      if (installPrompt) {
        installPrompt.prompt();
        return;
      }
      showToast('Use your browser menu to install OUR BRAND on your device.');
    });
  }

  document.addEventListener('click', (event) => {
    const addButton = event.target.closest('.add-cart');
    if (addButton) {
      const card = addButton.closest('.product-card');
      const size = card.querySelector('.product-size').value;
      if (!size) {
        card.querySelector('.product-size').focus();
        showToast('Choose a size before adding this style to your bag.');
        return;
      }

      const product = {
        name: card.querySelector('h3').textContent.trim(),
        price: Number(card.querySelector('.price').textContent.replace(/[^0-9]/g, '')),
        image: card.querySelector('img').src,
        size,
      };
      const existing = cart.find((item) => item.name === product.name && item.size === product.size);
      if (existing) existing.quantity += 1;
      else cart.push({ ...product, quantity: 1 });
      if (saveCart()) {
        renderCart();
        showToast(`${product.name} (size ${size}) added to your bag.`);
      }
      return;
    }

    const departmentButton = event.target.closest('.department-card');
    if (departmentButton) {
      setFilter(departmentButton.dataset.filter);
      document.querySelector('#products').scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const filterButton = event.target.closest('.filter-chip');
    if (filterButton) {
      setFilter(filterButton.dataset.filter);
      return;
    }

    const control = event.target.closest('[data-action]');
    if (control) {
      const index = Number(control.dataset.index);
      const item = cart[index];
      if (!item) return;
      if (control.dataset.action === 'increase') item.quantity += 1;
      if (control.dataset.action === 'decrease') item.quantity -= 1;
      if (control.dataset.action === 'remove' || item.quantity < 1) cart.splice(index, 1);
      if (saveCart()) renderCart();
      return;
    }

    if (event.target.closest('.close-cart') || event.target === overlay || event.target.closest('.continue-shopping')) {
      closeCart();
    }
  });

  cartLink.addEventListener('click', (event) => {
    event.preventDefault();
    openCart();
  });

  document.querySelector('#checkout-btn').addEventListener('click', () => {
    showToast('Online checkout is not connected yet. Contact us to place an order.');
  });

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    setFilter('all');
    updateProducts();
    document.querySelector('#products').scrollIntoView({ behavior: 'smooth', block: 'start' });
    const count = products.filter((product) => !product.hidden).length;
    showToast(count ? `${count} ${count === 1 ? 'style' : 'styles'} found.` : 'No matching clothes found. Try another search.');
  });

  searchInput.addEventListener('input', () => {
    if (searchInput.value.trim() && activeFilter !== 'all') setFilter('all');
    else updateProducts();
  });

  document.querySelectorAll('a[href="sell-on-our-brand.html"]').forEach((link) => {
    link.addEventListener('click', () => {
      document.documentElement.classList.add('seller-navigation');
    });
  });

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installPrompt = event;
    installButton.hidden = false;
  });

  installButton.addEventListener('click', async () => {
    if (!installPrompt) {
      showToast('To install, open your browser menu and choose “Install app” or “Add to Home Screen”.');
      return;
    }
    installPrompt.prompt();
    const result = await installPrompt.userChoice;
    if (result.outcome === 'accepted') showToast('OUR BRAND is being installed.');
    installPrompt = null;
    installButton.hidden = true;
  });

  window.addEventListener('appinstalled', () => {
    installButton.hidden = true;
    showToast('OUR BRAND has been installed on your device.');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeCart();
  });

  document.querySelectorAll('.product-card img').forEach((image) => {
    image.loading = 'lazy';
    image.decoding = 'async';
    image.addEventListener('error', () => {
      image.classList.add('image-unavailable');
      image.alt = `${image.alt} image unavailable`;
    });
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js')
        .catch((error) => console.error('OUR BRAND offline support could not be started.', error));
    });
  }

  updateProducts();
  renderCart();
})();
