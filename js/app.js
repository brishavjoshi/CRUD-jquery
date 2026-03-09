
var items = groceryItems;


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
  
  
  setTimeout(function () {
    alert("Item Added Successfully!");
  }, 0);
}


function removeItem(itemId) {
  
  items = $.grep(items, function (item) {
    return item.id !== itemId;
  });
  
  render();
  
  setTimeout(function () {
    alert("Item Deleted Successfully!");
  }, 0);
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


function render() {
  var $app = $("#app");
  $app.empty(); 

  
  var $formElement = createForm();
  var $itemsElement = createItems(items);

  
  $app.append($formElement);
  $app.append($itemsElement);
}


$(document).ready(function () {
  render();
});