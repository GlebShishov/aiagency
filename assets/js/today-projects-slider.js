/**
 * Скрипт для автоматического перелистывания проектов в секции "Опубликовано сегодня"
 */
document.addEventListener('DOMContentLoaded', function() {
  const scrollContainer = document.querySelector('.today-projects-scroll');
  const scrollContent = document.querySelector('.infinite-scroll-content');
  const projectCards = document.querySelectorAll('.today-projects-scroll .project-card');
  
  if (!scrollContainer || !scrollContent || projectCards.length === 0) return;
  
  let currentIndex = 0;
  let isHovered = false;
  let cardWidth = projectCards[0].offsetWidth;
  
  // Обновление ширины карточки при изменении размера окна
  window.addEventListener('resize', function() {
    cardWidth = projectCards[0].offsetWidth;
  });
  
  // Остановка перелистывания при наведении мыши
  scrollContainer.addEventListener('mouseenter', function() {
    isHovered = true;
  });
  
  scrollContainer.addEventListener('mouseleave', function() {
    isHovered = false;
  });
  
  // Функция для перелистывания на следующую карточку
  function slideToNext() {
    if (isHovered) return;
    
    currentIndex = (currentIndex + 1) % projectCards.length;
    scrollContent.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }
  
  // Запуск автоматического перелистывания каждые 3 секунды
  setInterval(slideToNext, 3000);
});
