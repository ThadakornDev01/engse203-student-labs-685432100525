import './style.css';

const form = document.querySelector('#request-form');

// TODO 1: query preview/status/list elements
const previewName = document.querySelector('#preview-name');
const previewType = document.querySelector('#preview-type');
const previewDetails = document.querySelector('#preview-details');
const formStatus = document.querySelector('#form-status');
const requestList = document.querySelector('#request-list');

// TODO 2: readForm()
function readForm() {
  return {
    name: document.querySelector('#name').value,
    category: document.querySelector('#category').value,
    details: document.querySelector('#details').value
  };
}

// TODO 3: renderPreview(data)
function renderPreview(data) {
  previewName.textContent = data.name.trim() || 'ยังไม่ระบุชื่อ';

  const categoryElement = document.querySelector('#category');
  const selectedOption = categoryElement.options[categoryElement.selectedIndex];
  previewType.textContent = selectedOption.value ? selectedOption.text : 'ยังไม่เลือกประเภท';

  previewDetails.textContent = data.details.trim() || 'ยังไม่มีรายละเอียด';
}

// TODO 4: validate(data)
function validate(data) {
  const errors = {};
  const trimmedName = data.name.trim();

  if (!trimmedName) {
    errors.name = 'Name is required';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }
  if (!data.category) {
    errors.category = 'Please select a category';
  }
  if (!data.details.trim()) {
    errors.details = 'Request details are required';
  } else if (data.details.length < 10) {
    errors.details = 'Details must be at least 10 characters long';
  }
  return errors;
}

// TODO 5: renderErrors(errors)
function renderErrors(errors) {
  // Clear previous errors
  document.querySelectorAll('.error').forEach(el => el.textContent = '');

  // Display new errors
  Object.entries(errors).forEach(([field, message]) => {
    const errorElement = document.querySelector(`#${field}-error`);
    if (errorElement) {
      errorElement.textContent = message;
    }
  });
}

// TODO 6: input and submit listeners

form.addEventListener('input', () => {
  const data = readForm();
  renderPreview(data);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = readForm();
  const errors = validate(data);
  renderErrors(errors);

  if (Object.keys(errors).length === 0) {
    // Submit the form (simulated)
    formStatus.textContent = 'Request submitted successfully!';
    formStatus.classList.add('success');
    formStatus.classList.remove('error');

    // Add to request list
    const listItem = document.createElement('li');
    listItem.textContent = `${data.name} - ${data.category}`;
    requestList.appendChild(listItem);

    // Reset form
    form.reset();
    renderPreview({ name: '', category: '', details: '' });
  } else {
    formStatus.textContent = 'Please fix the errors above.';
    formStatus.classList.add('error');
    formStatus.classList.remove('success');
  }
});

console.log('LAB 3 starter ready', form);