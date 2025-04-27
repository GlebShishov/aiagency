// Кастомный курсор с эффектом следования и инверсии цвета

document.addEventListener('DOMContentLoaded', function() {
  // Создаем элемент курсора
  const cursor = document.createElement('div');
  cursor.classList.add('cursor');
  
  // Добавляем элемент в DOM
  document.body.appendChild(cursor);
  
  // Переменные для хранения позиций
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  // Инициализация начальной позиции
  cursorX = window.innerWidth / 2;
  cursorY = window.innerHeight / 2;
  
  // Обновляем позицию мыши
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Обработка наведения на кликабельные элементы
  const clickables = document.querySelectorAll('a, button, input, textarea, select, .clickable');
  clickables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
  
  // Обработка клика
  document.addEventListener('mousedown', () => cursor.classList.add('click'));
  document.addEventListener('mouseup', () => cursor.classList.remove('click'));
  
  // Анимация курсора с задержкой
  function animateCursor() {
    // Плавное следование с увеличенной задержкой (0.7 секунды)
    const delay = 0.7;
    cursorX += (mouseX - cursorX) * (1 - delay);
    cursorY += (mouseY - cursorY) * (1 - delay);
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  // Запускаем анимацию
  animateCursor();
  
  // Скрываем курсор, когда мышь покидает окно
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
  
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });
});
