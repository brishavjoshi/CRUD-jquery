
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


function render() {
  var $app = $("#app");
  $app.empty();

  var $itemsElement = createItems(items);

  $itemsElement.find('.single-item').each(function(index) {
    var itemId = items[index].id;
    $(this).find('input[type="checkbox"]').on('change', function() {
      editCompleted(itemId);
    });
  });

  $app.append($itemsElement);
}

$(document).ready(function () {
  render();
});