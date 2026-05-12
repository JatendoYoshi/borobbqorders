import {
  db,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  query,
  orderBy,
} from './firebase.js';

const ordersDiv = document.getElementById('orders');

const q = query(
  collection(db, 'orders'),
  orderBy('createdAt', 'desc')
);

onSnapshot(q, snapshot => {
  ordersDiv.innerHTML = '';

  snapshot.docs.forEach(documentItem => {
    const order = {
      id: documentItem.id,
      ...documentItem.data(),
    };

    if (order.completed) return;

    const card = document.createElement('div');
    card.className = 'card order-card';

    card.innerHTML = `
      <h2>Order #${order.orderNumber}</h2>
      <p>${order.time || ''}</p>
      <strong>£${order.total?.toFixed(2)}</strong>
      <h4>Items</h4>
      <ul>
        ${order.items.map(i => `<li>${i.name}</li>`).join('')}
      </ul>
      <button class="action-btn green">
        Complete Order
      </button>
    `;

    card.querySelector('button').onclick = async () => {
      await updateDoc(doc(db, 'orders', order.id), {
        completed: true,
      });
    };

    ordersDiv.appendChild(card);
  });
});
