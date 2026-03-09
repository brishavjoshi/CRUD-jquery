var items = groceryItems;


function editCompleted(itemId) {
  items = $.map(items, function (item) {
    if (item.id === itemId) {
      return $.extend({}, item, { completed: !item.completed });
    }
    return item;
  });
  render();
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


function render() {
  var $app = $("#app");
  $app.empty();
  var $itemsElement = createItems(items);
  $app.append($itemsElement);
}

$(document).ready(function () {
  render();
});