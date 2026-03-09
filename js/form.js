
var items = groceryItems; 
var editId = null; 


function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}


function addItem(itemName) {
  var newItem = {
    name: itemName,
    completed: false,
    id: generateId(),
  };
  items.push(newItem);
  render();
  setTimeout(() => alert("Item Added Successfully!"), 0);
}


function removeItem(itemId) {
  items = $.grep(items, function (item) {
    return item.id !== itemId;
  });

  if (editId === itemId) editId = null; 
  render();
  setTimeout(() => alert("Item Deleted Successfully!"), 0);
}


function editCompleted(itemId) {
  items = $.map(items, function (item) {
    if (item.id === itemId) {
      return $.extend({}, item, { completed: !item.completed });
    }
    return item;
  });
  render();
}


function setEditItem(itemId) {
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
  render();
  setTimeout(() => alert("Item Updated Successfully!"), 0);
}


function render() {
  var $app = $("#app");
  $app.empty();


  var itemToEdit = editId 
    ? items.find(function(i) { return i.id === editId; }) 
    : null;

 
  var $formElement = createForm(editId, itemToEdit);
  var $itemsElement = createItems(items);

  $app.append($formElement);
  $app.append($itemsElement);
}

$(document).ready(function () {
  render();
});