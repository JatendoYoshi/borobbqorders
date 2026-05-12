import { db, collection, onSnapshot, updateDoc, doc, query, orderBy } from "./firebase.js";

const ordersDiv = document.getElementById("orders");

const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));

onSnapshot(q, snap => {
  ordersDiv.innerHTML = "";

  snap.docs.forEach(d => {
    const o = { id: d.id, ...d.data() };

    if (o.completed) return;

    const div = document.createElement("div");
    div.className = "order-card";

    div.innerHTML = `
      <h2>Order #${o.orderNumber}</h2>
      <span class="badge">£${o.total}</span>
      <ul>${o.items.map(i=>`<li>${i.name}</li>`).join("")}</ul>
      <button class="btn-success">Complete</button>
    `;

    div.querySelector("button").onclick = () => {
      updateDoc(doc(db,"orders",o.id), { completed:true });
    };

    ordersDiv.appendChild(div);
  });
});