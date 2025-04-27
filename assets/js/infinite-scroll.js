/**
 * Скрипт для управления бесконечным горизонтальным скроллом
 */
document.addEventListener('DOMContentLoaded', function() {
  // Проверяем наличие элемента с бесконечной прокруткой
  const infiniteScrollContainers = document.querySelectorAll('.infinite-scroll-content');
  
  if (infiniteScrollContainers.length === 0) return;

  // Для каждого контейнера с бесконечной прокруткой
  infiniteScrollContainers.forEach(container => {
    // Клонируем содержимое для создания эффекта бесконечности
    const items = container.querySelectorAll('.project-card');
    
    if (items.length === 0) return;
    
    // Клонируем все элементы и добавляем их в конец контейнера
    items.forEach(item => {
      const clone = item.cloneNode(true);
      container.appendChild(clone);
    });
    
    // Останавливаем анимацию при наведении
    container.addEventListener('mouseenter', function() {
      container.style.animationPlayState = 'paused';
    });
    
    // Возобновляем анимацию при уходе мыши
    container.addEventListener('mouseleave', function() {
      container.style.animationPlayState = 'running';
    });
  });
  
  // Обрабатываем клик по проекту в бесконечном скролле
  document.addEventListener('click', function(event) {
    // Проверяем, был ли клик по элементу внутри бесконечного скролла
    let target = event.target;
    while (target && !target.classList.contains('project-card')) {
      if (target.classList.contains('infinite-scroll-content')) {
        // Если мы достигли контейнера скролла, значит клик был внутри него
        return;
      }
      target = target.parentElement;
    }
    
    // Если клик был по project-card внутри скролла, обрабатываем его
    if (target && target.classList.contains('project-card')) {
      const link = target.querySelector('a');
      if (link) {
        event.preventDefault();
        window.location.href = link.getAttribute('href');
      }
    }
  });
}); 