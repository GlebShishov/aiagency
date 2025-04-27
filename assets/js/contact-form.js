// Скрипт для секции контактов

document.addEventListener('DOMContentLoaded', function() {
  // Обработка стилизованных чекбоксов
  const serviceCheckboxes = document.querySelectorAll('.service-checkbox input[type="checkbox"]');
  
  serviceCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const label = this.closest('.service-checkbox');
      
      if (this.checked) {
        label.style.backgroundColor = '#000';
        label.style.color = '#fff';
      } else {
        label.style.backgroundColor = 'transparent';
        label.style.color = '#000';
      }
    });
  });
  
  // Маска для телефона в формате +7 (XXX) XXX XX-XX
  const phoneInput = document.getElementById('phone');
  
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      
      if (value.length > 0 && value[0] !== '7') {
        value = '7' + value;
      }
      
      let formattedValue = '';
      
      if (value.length > 0) {
        formattedValue = '+' + value[0];
      }
      
      if (value.length > 1) {
        formattedValue += ' (' + value.substring(1, Math.min(4, value.length));
      }
      
      if (value.length > 4) {
        formattedValue += ') ' + value.substring(4, Math.min(7, value.length));
      }
      
      if (value.length > 7) {
        formattedValue += ' ' + value.substring(7, Math.min(9, value.length));
      }
      
      if (value.length > 9) {
        formattedValue += '-' + value.substring(9, Math.min(11, value.length));
      }
      
      e.target.value = formattedValue;
    });
    
    // Установка начального значения +7
    if (!phoneInput.value) {
      phoneInput.value = '+7 ';
    }
  }
  
  // Счетчик символов для поля описания
  const descriptionField = document.getElementById('description');
  const charCount = document.getElementById('charCount');
  
  if (descriptionField && charCount) {
    descriptionField.addEventListener('input', function() {
      const currentLength = this.value.length;
      charCount.textContent = currentLength;
      
      if (currentLength >= 500) {
        charCount.style.color = '#ff3b30';
      } else {
        charCount.style.color = '';
      }
    });
  }
  
  // Валидация полей и защита от кода
  const nameField = document.getElementById('name');
  const emailField = document.getElementById('email');
  
  // Функция для защиты от вредоносного кода
  function sanitizeInput(input) {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/`/g, '&#96;')
      .replace(/\//g, '&#47;');
  }
  
  // Валидация имени (только буквы и пробелы)
  if (nameField) {
    nameField.addEventListener('input', function() {
      const value = this.value;
      // Удаляем все, кроме букв и пробелов
      this.value = value.replace(/[^А-Яа-яЁёA-Za-z\s]/g, '');
    });
  }
  
  // Валидация email
  if (emailField) {
    emailField.addEventListener('blur', function() {
      const value = this.value;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      
      if (!emailRegex.test(value) && value !== '') {
        this.setCustomValidity('Пожалуйста, введите корректный email');
      } else {
        this.setCustomValidity('');
      }
    });
  }
  
  // Обработка отправки формы
  const contactForm = document.getElementById('contactForm');
  const submitButton = document.querySelector('.submit-button');
  const formStatusMessage = document.createElement('div');
  formStatusMessage.className = 'form-status-message';
  
  // Стили для сообщений о статусе отправки
  const statusStyles = document.createElement('style');
  statusStyles.textContent = `
    .form-status-message {
      margin-top: 15px;
      padding: 10px;
      border-radius: 4px;
      font-size: 14px;
      transition: all 0.3s ease;
    }
    .form-status-message.success {
      background-color: rgba(76, 175, 80, 0.1);
      color: #4CAF50;
      border: 1px solid #4CAF50;
    }
    .form-status-message.error {
      background-color: rgba(244, 67, 54, 0.1);
      color: #F44336;
      border: 1px solid #F44336;
    }
    .form-status-message.loading {
      background-color: rgba(33, 150, 243, 0.1);
      color: #2196F3;
      border: 1px solid #2196F3;
    }
  `;
  document.head.appendChild(statusStyles);
  
  if (contactForm) {
    // Добавляем элемент для отображения статуса отправки
    contactForm.appendChild(formStatusMessage);
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Показываем сообщение о загрузке
      formStatusMessage.className = 'form-status-message loading';
      formStatusMessage.textContent = 'Отправка заявки...';
      formStatusMessage.style.display = 'block';
      
      // Блокируем кнопку отправки
      if (submitButton) {
        submitButton.disabled = true;
      }
      
      // Санитизация всех полей формы перед отправкой
      const formElements = this.elements;
      for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        if (element.type === 'text' || element.type === 'email' || element.type === 'textarea') {
          element.value = sanitizeInput(element.value);
        }
      }
      
      // Собираем данные из формы для отправки через URL параметры
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const email = document.getElementById('email').value;
      const description = document.getElementById('description').value;
      
      // Получаем выбранные услуги
      const serviceCheckboxes = document.querySelectorAll('input[name="service[]"]:checked');
      const services = Array.from(serviceCheckboxes).map(cb => cb.value).join(', ');
      
      // Получаем источник
      const source = document.getElementById('source').value || 'Не указано';
      
      // Формируем URL для отправки
      const formAction = this.getAttribute('action');
      const url = new URL(formAction, window.location.origin);
      
      // Добавляем параметры
      url.searchParams.append('name', name);
      url.searchParams.append('phone', phone);
      url.searchParams.append('email', email);
      url.searchParams.append('services', services);
      url.searchParams.append('description', description);
      url.searchParams.append('source', source);
      
      // Перенаправляем на страницу обработчика
      window.location.href = url.toString();
    });
  }
});
