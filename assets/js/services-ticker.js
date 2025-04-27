/**
 * Скрипт для создания бегущей строки с названиями услуг
 */
document.addEventListener('DOMContentLoaded', function() {
  const tickerContent = document.querySelector('.ticker-content');
  
  if (!tickerContent) return;
  
  // Функция для анимации бегущей строки
  function animateTicker() {
    // Получаем ширину контента
    const contentWidth = tickerContent.offsetWidth;
    const viewportWidth = window.innerWidth;
    
    // Начальная позиция (за пределами видимой области справа)
    let position = viewportWidth;
    
    // Скорость движения (пикселей в секунду)
    const speed = 100;
    
    // Функция для обновления позиции
    function updatePosition() {
      position -= speed / 60; // 60 fps
      
      // Если контент полностью ушел за левую границу, возвращаем его в начальную позицию
      if (position < -contentWidth) {
        position = viewportWidth;
      }
      
      // Обновляем позицию с помощью transform для лучшей производительности
      tickerContent.style.transform = `translateX(${position}px)`;
      
      // Запрашиваем следующий кадр анимации
      requestAnimationFrame(updatePosition);
    }
    
    // Запускаем анимацию
    updatePosition();
  }
  
  // Запускаем анимацию
  animateTicker();
  
  // Обновляем анимацию при изменении размера окна
  window.addEventListener('resize', function() {
    // Сбрасываем текущую трансформацию
    tickerContent.style.transform = 'translateX(0)';
    
    // Перезапускаем анимацию с небольшой задержкой
    setTimeout(animateTicker, 100);
  });
  
  // Останавливаем анимацию при наведении курсора
  const tickerContainer = document.querySelector('.ticker-container');
  
  if (tickerContainer) {
    tickerContainer.addEventListener('mouseenter', function() {
      tickerContent.style.animationPlayState = 'paused';
    });
    
    tickerContainer.addEventListener('mouseleave', function() {
      tickerContent.style.animationPlayState = 'running';
    });
  }
});
