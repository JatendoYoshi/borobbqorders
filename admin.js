import { db, collection, addDoc, deleteDoc, doc, onSnapshot } from "./firebase.js";

const name = document.getElementById("name");
const price = document.getElementById("price");
const list = document.getElementById("menuList");

onSnapshot(collection(db,"menu"), snap => {
  list.innerHTML = "";

  snap.docs.forEach(d => {
    const item = d.data();

    const row = document.createElement("div");
    row.innerHTML = `${item.name} £${item.price} <button>Delete</button>`;

    row.querySelector("button").onclick = () => {
      deleteDoc(doc(db,"menu",d.id));
    };

    list.appendChild(row);
  });
});

document.getElementById("add").onclick = async () => {
  await addDoc(collection(db,"menu"), {
    name: name.value,
    price: Number(price.value)
  });
};