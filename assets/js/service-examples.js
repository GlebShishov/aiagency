// JavaScript для обработки примеров работ на странице услуг

document.addEventListener('DOMContentLoaded', function() {
  // Функция для определения пропорций изображений и установки соответствующих классов
  function setupExampleItems() {
    const imageItems = document.querySelectorAll('.example-item.image-item');
    const videoItems = document.querySelectorAll('.example-item.video-item');
    
    // Обработка изображений
    imageItems.forEach(item => {
      const img = item.querySelector('img');
      
      if (img.complete) {
        processImageSize(img);
      } else {
        img.onload = function() {
          processImageSize(img);
        };
      }
    });
    
    // Обработка видео
    videoItems.forEach(item => {
      const video = item.querySelector('video');
      
      // Для видео устанавливаем широкий формат по умолчанию
      item.classList.add('wide');
      item.style.gridColumn = 'span 2';
      
      // Когда метаданные видео загружены, можем определить его пропорции
      video.addEventListener('loadedmetadata', function() {
        if (video.videoWidth > video.videoHeight * 1.2) {
          // Широкое видео
          item.classList.add('wide');
          item.style.gridColumn = 'span 2';
        } else if (video.videoWidth * 1.2 < video.videoHeight) {
          // Вертикальное видео
          item.classList.add('tall');
          item.style.gridRow = 'span 2';
          item.style.gridColumn = 'span 1';
        } else {
          // Квадратное видео
          item.classList.add('square');
          item.style.gridColumn = 'span 1';
        }
      });
    });
  }
  
  // Функция для обработки размеров изображения
  function processImageSize(img) {
    const item = img.closest('.example-item');
    
    if (img.naturalWidth > img.naturalHeight * 1.2) {
      // Широкое изображение
      item.classList.add('wide');
      item.style.gridColumn = 'span 2';
    } else if (img.naturalWidth * 1.2 < img.naturalHeight) {
      // Вертикальное изображение
      item.classList.add('tall');
      item.style.gridRow = 'span 2';
      item.style.gridColumn = 'span 1';
    } else {
      // Квадратное изображение
      item.classList.add('square');
      item.style.gridColumn = 'span 1';
    }
    
    item.classList.add('loaded');
  }
  
  // Запускаем настройку элементов
  setupExampleItems();
  
  // Обрабатываем изменения в DOM (например, при динамической загрузке контента)
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length) {
        setupExampleItems();
      }
    });
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
});
