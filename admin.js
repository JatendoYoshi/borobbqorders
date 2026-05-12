import {
  db,
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from './firebase.js';

const nameInput = document.getElementById('itemName');
const priceInput = document.getElementById('itemPrice');
const menuDiv = document.getElementById('menuItems');

onSnapshot(collection(db, 'menu'), snapshot => {
  menuDiv.innerHTML = '<h2>Menu Items</h2>';

  snapshot.docs.forEach(docItem => {
    const item = docItem.data();

    const row = document.createElement('div');
    row.className = 'menu-row';

    row.innerHTML = `
      <span>${item.name} - £${item.price}</span>
      <button class="action-btn red">Delete</button>
    `;

    row.querySelector('button').onclick = async () => {
      await deleteDoc(doc(db, 'menu', docItem.id));
    };

    menuDiv.appendChild(row);
  });
});

document.getElementById('addItemBtn').onclick = async () => {
  const name = nameInput.value.trim();
  const price = Number(priceInput.value);

  if (!name || !price) return;

  await addDoc(collection(db, 'menu'), {
    name,
    price,
  });

  nameInput.value = '';
  priceInput.value = '';
};
