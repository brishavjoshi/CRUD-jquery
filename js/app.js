// 1. Local Storage Helpers
function getLocalStorage() {
  var list = localStorage.getItem("grocery-list");
  return list ? JSON.parse(list) : [];
}

function setLocalStorage(itemsArray) {
  localStorage.setItem("grocery-list", JSON.stringify(itemsArray));
}

// 2. Initial State
var items = getLocalStorage(); // Initialize from LocalStorage
var editId = null;             // Tracks the ID of the item being edited

// 3. Helper: Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// 4. Logic: Add Item
function addItem(itemName) {
  var newItem = {
    name: itemName,
    completed: false,
    id: generateId(),
  };
  
  items.push(newItem);
  setLocalStorage(items); // Sync with LocalStorage
  render();
  
  setTimeout(function () {
    alert("Item Added Successfully!");
  }, 0);
}

// 5. Logic: Remove Item
function removeItem(itemId) {
  items = $.grep(items, function (item) {
    return item.id !== itemId;
  });
  
  // If we delete the item currently being edited, reset editId
  if (editId === itemId) editId = null;
  
  setLocalStorage(items); // Sync with LocalStorage
  render();
  
  setTimeout(function () {
    alert("Item Deleted Successfully!");
  }, 0);
}

// 6. Logic: Toggle Completed Status
function editCompleted(itemId) {
  items = $.map(items, function (item) {
    if (item.id === itemId) {
      return $.extend({}, item, { completed: !item.completed });
    }
    return item;
  });
  
  setLocalStorage(items); // Sync with LocalStorage
  render();
}

// 7. Logic: Set/Update Name (Edit Mode)
function setEditId(itemId) {
  editId = itemId;
  render(); // Re-render to populate the form with item data
}

function updateItemName(newName) {
  items = $.map(items, function (item) {
    if (item.id === editId) {
      return $.extend({}, item, { name: newName });
    }
    return item;
  });
  
  editId = null; // Exit edit mode
  setLocalStorage(items); // Sync with LocalStorage
  render();
  
  setTimeout(function () {
    alert("Item Updated Successfully!");
  }, 0);
}

// 8. UI: Render App
function render() {
  var $app = $("#app");
  $app.empty(); // Clear existing DOM

  // Find the item object if we are in edit mode
  var itemToEdit = editId 
    ? items.find(function(i) { return i.id === editId; }) 
    : null;

  // Generate components
  var $formElement = createForm(editId, itemToEdit);
  var $itemsElement = createItems(items);

  // Inject into the DOM
  $app.append($formElement);
  $app.append($itemsElement);
}

// 9. Initialize: Wait for Document Ready
$(document).ready(function () {
  render();
});