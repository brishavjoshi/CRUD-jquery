// Create SingleItem Element
function createSingleItem(item) {
  var $div = $('<div class="single-item"></div>');

  // 1. Template with dynamic classes/styles
  $div.html(`
    <input type="checkbox" ${item.completed ? "checked" : ""} />
    <p style="text-decoration: ${item.completed ? "line-through" : "none"}">
      ${item.name}
    </p>
    <div class="btn-container">
      <button class="btn icon-btn edit-btn" type="button">
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
      <button class="btn icon-btn remove-btn" type="button">
        <i class="fa-regular fa-trash-can"></i>
      </button>
    </div>
  `);

  // 2. Event: Checkbox Toggle (Completed)
  $div.find('input[type="checkbox"]').on("change", function () {
    editCompleted(item.id);
  });

  // 3. Event: Edit Button (Switch to Edit Mode)
  $div.find(".edit-btn").on("click", function () {
    setEditId(item.id);
  });

  // 4. Event: Remove Button (Delete)
  $div.find(".remove-btn").on("click", function () {
    removeItem(item.id);
  });

  return $div;
}