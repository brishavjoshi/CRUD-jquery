function createSingleItem(item) {
  var $div = $('<div class="single_item"></div>');

  $div.html(`
        <input type="checkbox" ${item.completed ? "checked" : ""}/>
        <p style="text-decoration: ${item.completed ? "line-through" : "none"}">${item.name}
        </p>
        <button class = "btn icon-btn edit-btn" type = "button">
            <i class = "fa-regular fa-pen-to-square"></i>
        </button>
        <button class="btn icon-btn remove-btn" type = "button">
        <i class = "fa-regular fa-trash-can"></i>
        </button>        
        `);

  // Add event listener for checkbox
  $div.find('input[type="checkbox"]').on("change", function () {
    editCompleted(item.id);
  });

  // Add event listener for remove button
  $div.find(".remove-btn").on("click", function () {
    removeItem(item.id);
  });

  $div.find(".edit-btn").on("click", function () {
    setEditId(item.id);
  });

  return $div;
}
