import {
  db,
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
} from './firebase.js';

let cart = [];
let menu = [];

const menuDiv = document.getElementById('menu');
const cartList = document.getElementById('cart');
const totalSpan = document.getElementById('total');

onSnapshot(collection(db, 'menu'), (snapshot) => {
  menu = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  renderMenu();
});

function renderMenu() {
  menuDiv.innerHTML = '';

  menu.forEach(item => {
    const btn = document.createElement('button');

    btn.className = 'menu-item';
    btn.innerHTML = `
      <strong>${item.name}</strong>
      <span>£${item.price.toFixed(2)}</span>
    `;

    btn.onclick = () => {
      cart.push(item);
      renderCart();
    };

    menuDiv.appendChild(btn);
  });
}

function renderCart() {
  cartList.innerHTML = '';

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `• ${item.name} (£${item.price.toFixed(2)})`;
    cartList.appendChild(li);
  });

  const total = cart.reduce((a, b) => a + b.price, 0);
  totalSpan.textContent = total.toFixed(2);
}

document.getElementById('placeOrderBtn').onclick = async () => {
  if (!cart.length) return;

  const total = cart.reduce((a, b) => a + b.price, 0);

  await addDoc(collection(db, 'orders'), {
    orderNumber: Math.floor(1000 + Math.random() * 9000),
    items: cart,
    total,
    completed: false,
    createdAt: serverTimestamp(),
    time: new Date().toLocaleTimeString(),
  });

  cart = [];
  renderCart();
};
