// 1. Local Storage Helpers
function getLocalStorage() {
  var list = localStorage.getItem("grocery-list");
  return list ? JSON.parse(list) : [];
}

function setLocalStorage(itemsArray) {
  localStorage.setItem("grocery-list", JSON.stringify(itemsArray));
}

// 2. Initial State
var items = getLocalStorage(); // Load from storage on start
var editId = null;

// 3. Helper: Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// 4. Logic: Add Item
function addItem(itemName) {
  var newItem = { name: itemName, completed: false, id: generateId() };
  items.push(newItem);
  setLocalStorage(items); // Save
  render();
  setTimeout(() => alert("Item Added Successfully!"), 0);
}

// 5. Logic: Remove Item
function removeItem(itemId) {
  items = $.grep(items, function (item) {
    return item.id !== itemId;
  });
  if (editId === itemId) editId = null;
  setLocalStorage(items); // Save
  render();
  setTimeout(() => alert("Item Deleted Successfully!"), 0);
}

// 6. Logic: Toggle Completed
function editCompleted(itemId) {
  items = $.map(items, function (item) {
    if (item.id === itemId) {
      return $.extend({}, item, { completed: !item.completed });
    }
    return item;
  });
  setLocalStorage(items); // Save
  render();
}

// 7. Logic: Set/Update Name
function setEditId(itemId) {
  editId = itemId;
  render();
}

function updateItemName(newName) {
  items = $.map(items, function (item) {
    if (item.id === editId) {
      return $.extend({}, item, { name: newName });
    }
    return item;
  });
  editId = null;
  setLocalStorage(items); // Save
  render();
  setTimeout(() => alert("Item Updated Successfully!"), 0);
}

// 8. Render App
function render() {
  var $app = $("#app");
  $app.empty();

  var itemToEdit = editId ? items.find(i => i.id === editId) : null;
  var $formElement = createForm(editId, itemToEdit);
  var $itemsElement = createItems(items);

  $app.append($formElement);
  $app.append($itemsElement);
}

$(document).ready(function () {
  render();
});