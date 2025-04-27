/**
 * Плавный скроллинг для сайта AI Agency
 * Обеспечивает медленный и плавный скроллинг страницы
 */

// Функция для инициализации плавного скроллинга
function initSmoothScroll() {
  // Настраиваемые параметры скроллинга
  const scrollParams = {
    // Скорость скроллинга при вращении колесика мыши (в пикселях)
    wheelSensitivity: 100, // Увеличьте это значение для более быстрого скроллинга
    
    // Скорость интерполяции (больше = быстрее)
    ease: 0.3,
    
    // Минимальное значение дельты для остановки анимации
    stopThreshold: 0.5
  };
  
  // Сохраняем оригинальную позицию скролла
  let targetY = window.scrollY;
  let currentY = window.scrollY;
  let animating = false;
  let lastTime = null;
  let isScrolling = false;
  
  // Переопределяем стандартный скролл
  window.addEventListener('scroll', function() {
    if (!animating) {
      targetY = window.scrollY;
    }
  }, { passive: true });
  
  // Обработчик для якорных ссылок
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return; // Пропускаем ссылки с href="#"
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const rect = targetElement.getBoundingClientRect();
        targetY = rect.top + window.scrollY;
        animating = true;
        if (!isScrolling) {
          requestAnimationFrame(smoothScrollAnimation);
          isScrolling = true;
        }
      }
    });
  });
  
  // Функция для более плавной интерполяции (easeOutCubic)
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
  
  // Функция анимации скролла
  function smoothScrollAnimation(time) {
    if (lastTime === null) {
      lastTime = time;
    }
    
    // Вычисляем дельту времени для более стабильной анимации
    const deltaTime = Math.min(50, time - lastTime) / 1000;
    lastTime = time;
    
    // Вычисляем разницу между текущей и целевой позицией
    const delta = targetY - currentY;
    
    // Применяем плавную интерполяцию с учетом времени
    currentY += delta * scrollParams.ease * (60 * deltaTime);
    
    // Устанавливаем новую позицию скролла
    window.scrollTo(0, currentY);
    
    // Проверяем, нужно ли продолжать анимацию
    if (Math.abs(delta) > scrollParams.stopThreshold) {
      lastTime = time;
      requestAnimationFrame(smoothScrollAnimation);
    } else {
      // Завершаем анимацию
      window.scrollTo(0, targetY);
      isScrolling = false;
      animating = false;
      lastTime = null;
    }
  }
  
  // Запускаем анимацию при скролле колесиком мыши
  window.addEventListener('wheel', function(e) {
    e.preventDefault();
    
    // Фиксируем текущую позицию скролла перед изменением
    currentY = window.scrollY;
    
    // Используем нормализованное значение deltaY
    // В разных браузерах и устройствах оно может быть разным
    const normalizedDelta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 100);
    
    // Используем настраиваемый параметр чувствительности
    const delta = normalizedDelta * (scrollParams.wheelSensitivity / 100);
    
    // Обновляем целевую позицию относительно текущей
    targetY = currentY + delta;
    
    // Ограничиваем скролл пределами страницы
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    targetY = Math.max(0, Math.min(targetY, maxScroll));
    
    animating = true;
    
    if (!isScrolling) {
      requestAnimationFrame(smoothScrollAnimation);
      isScrolling = true;
    }
  }, { passive: false });
}

// Экспортируем функцию для использования в main.js
window.initSmoothScroll = initSmoothScroll;