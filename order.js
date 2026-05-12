import { db, collection, addDoc, onSnapshot, serverTimestamp } from "./firebase.js";

let cart = [];
let menu = [];

const menuDiv = document.getElementById("menu");
const cartList = document.getElementById("cart");
const totalEl = document.getElementById("total");

onSnapshot(collection(db, "menu"), snap => {
  menu = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  renderMenu();
});

function renderMenu() {
  menuDiv.innerHTML = "";
  menu.forEach(item => {
    const btn = document.createElement("button");
    btn.className = "btn-primary";
    btn.innerHTML = `${item.name}<br>£${item.price}`;
    btn.onclick = () => {
      cart.push(item);
      renderCart();
    };
    menuDiv.appendChild(btn);
  });
}

function renderCart() {
  cartList.innerHTML = "";
  cart.forEach(i => {
    const li = document.createElement("li");
    li.textContent = `• ${i.name}`;
    cartList.appendChild(li);
  });

  const total = cart.reduce((a,b)=>a+b.price,0);
  totalEl.textContent = total.toFixed(2);
}

document.getElementById("placeOrderBtn").onclick = async () => {
  if (!cart.length) return;

  await addDoc(collection(db, "orders"), {
    orderNumber: Math.floor(1000 + Math.random()*9000),
    items: cart,
    total: cart.reduce((a,b)=>a+b.price,0),
    completed: false,
    createdAt: serverTimestamp()
  });

  cart = [];
  renderCart();
};