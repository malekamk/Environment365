const apiBaseUrl = 'https://environment365-qhpp.onrender.com/api'; // API base URL

// Fetch all waste categories
async function fetchCategories() {
  try {
    const response = await fetch(`${apiBaseUrl}/waste/categories`);
    if (!response.ok) {
      throw new Error(`Error fetching categories: ${response.statusText}`);
    }
    const categories = await response.json();
    renderCategories(categories);
  } catch (error) {
    alert(error.message);
  }
}

// Add a new waste category
async function addCategory() {
  const categoryName = document.getElementById('categoryName').value;

  if (!categoryName) {
    alert("Please enter a category name.");
    return;
  }

  const newCategory = {
    name: categoryName,
  };

  try {
    const response = await fetch(`${apiBaseUrl}/waste/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCategory),
    });
    if (response.status === 201) {
      alert("Category added successfully!");
      fetchCategories(); // Refresh categories
    } else {
      throw new Error(`Error adding category: ${response.statusText}`);
    }
  } catch (error) {
    alert(error.message);
  }
}

// Delete a waste category
async function deleteCategory(id) {
  if (!confirm("Are you sure you want to delete this category?")) {
    return;
  }

  try {
    const response = await fetch(`${apiBaseUrl}/waste/categories/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      alert("Category deleted successfully!");
      fetchCategories(); // Refresh categories
    } else {
      throw new Error(`Error deleting category: ${response.statusText}`);
    }
  } catch (error) {
    alert(error.message);
  }
}

// Render waste categories
function renderCategories(categories) {
  const container = document.getElementById('categories-container');
  container.innerHTML = ""; // Clear the container

  if (categories.length === 0) {
    container.innerHTML = "<p>No categories found.</p>";
    return;
  }

  categories.forEach((category) => {
    const categoryItem = document.createElement("div");
    categoryItem.className = "item";
    categoryItem.innerHTML = `
      <strong>Category ID:</strong> ${category.id}<br>
      <strong>Category Name:</strong> ${category.name}
      <button class="delete-button" onclick="deleteCategory(${category.id})">Delete</button>
    `;
    container.appendChild(categoryItem);
  });
}

// Fetch all recycling tips
async function fetchAllTips() {
  try {
    const response = await fetch(`${apiBaseUrl}/tips`);
    if (!response.ok) {
      throw new Error(`Error fetching tips: ${response.statusText}`);
    }
    const tips = await response.json();
    renderTips(tips, "tips-container");
  } catch (error) {
    alert(error.message);
  }
}
// Render recycling tips
function renderTips(tips, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear the container

  if (tips.length === 0) {
    container.innerHTML = "<p>No tips found.</p>";
    return;
  }

  tips.forEach((recyclingTip) => {
    const tipItem = document.createElement("div");
    tipItem.className = "item";
    tipItem.innerHTML = `
      <strong>Recycling Tip:</strong> ${recyclingTip.recyclingTip}<br>
      <strong>Category:</strong> ${recyclingTip.category || "Unknown"}
    `;
    container.appendChild(tipItem);
  });
}


// Add a new recycling tip
async function addTip() {
  const tipText = document.getElementById('tip').value;
  const categoryId = document.getElementById('categoryId').value;

  if (!tipText || !categoryId) {
    alert("Please fill in all fields.");
    return;
  }

  const newTip = {
    recyclingTip: tipText,
    category: {
      id: parseInt(categoryId),
    },
  };

  try {
    const response = await fetch(`${apiBaseUrl}/tips`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTip),
    });
    if (response.status === 201) {
      alert("Recycling tip added successfully!");
      fetchCategories(); // Refresh categories to include the new tip
      fetchAllTips();
    } else {
      throw new Error(`Error adding tip: ${response.statusText}`);
    }
  } catch (error) {
    alert(error.message);
  }
}


// Render recycling tips
// Render waste categories with all details
function renderCategories(categories) {
  const container = document.getElementById('categories-container');
  container.innerHTML = ""; // Clear the container

  if (categories.length === 0) {
    container.innerHTML = "<p>No categories found.</p>";
    return;
  }

  categories.forEach((category) => {
    const categoryItem = document.createElement("div");
    categoryItem.className = "item";
    categoryItem.innerHTML = `
      <strong>Category ID:</strong> ${category.id}<br>
      <strong>Category Name:</strong> ${category.name}<br>
      <strong>Description:</strong> ${category.description || "Not available"}<br>
      <strong>Creation Time:</strong> ${new Date(category.creationTime).toLocaleString()}<br>
      <strong>Recycling Tips:</strong>
      <ul>
        ${category.recyclingTips.length > 0
          ? category.recyclingTips.map(tip => `<li>${tip}</li>`).join("")
          : "<li>Not available</li>"
        }
      </ul>
      <button class="delete-button" onclick="deleteCategory(${category.id})">Delete</button>
    `;
    container.appendChild(categoryItem);
  });
}

// Update category description
async function updateCategoryDescription() {
    const categoryId = document.getElementById('categoryIdDesc').value;
    const description = document.getElementById('descriptionName').value;

    if (!categoryId || !description) {
        alert("Please fill in all fields.");
        return;
    }

    const updatedData = {
        description: description
    };

    try {
        const response = await fetch(`${apiBaseUrl}/waste/categories/${categoryId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });

        if (response.ok) {
            alert("Description updated successfully!");
            fetchCategories(); // Refresh categories to reflect the updated description
        } else if (response.status === 404) {
            alert("Category not found. Please check the Category ID.");
        } else {
            throw new Error(`Error updating description: ${response.statusText}`);
        }
    } catch (error) {
        alert(error.message);
    }
}
// Update category description
async function updateCategoryDescription() {
    const categoryId = document.getElementById('categoryIdDesc').value;
    const description = document.getElementById('descriptionName').value;

    if (!categoryId || !description) {
        alert("Please fill in all fields.");
        return;
    }

    const updatedData = {
        description: description
    };

    try {
        const response = await fetch(`${apiBaseUrl}/waste/categories/${categoryId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });

        if (response.ok) {
            alert("Description updated successfully!");
            fetchCategories(); // Refresh categories to reflect the updated description
        } else if (response.status === 404) {
            alert("Category not found. Please check the Category ID.");
        } else {
            throw new Error(`Error updating description: ${response.statusText}`);
        }
    } catch (error) {
        alert(error.message);
    }
}



// Initial fetch
fetchCategories();
fetchAllTips();
