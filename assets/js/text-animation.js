document.addEventListener('DOMContentLoaded', function() {
  // Анимация логотипа при движении курсора в любом месте окна
  const logoElement = document.querySelector('.header .logo.agency-name');
  
  if (logoElement) {
    const originalText = "AI Agency";
    
    // Карта символов для замены
    const symbolMap = {
      'a': ['@', '4', 'α', 'а'],
      'i': ['1', '|', 'ɪ', 'и'],
      'g': ['9', '6', 'ɡ', 'г'],
      'e': ['3', '€', 'э', 'е'],
      'n': ['и', 'η', 'ň', 'н'],
      'c': ['¢', '©', 'с', 'ç'],
      'y': ['ч', 'ʏ', 'у', 'ý']
    };
    
    const randomSymbols = ['?', '*', '$', '%', '&', '#', '^', '+', '=', '!'];
    
    // Преобразуем логотип в отдельные span для каждого символа
    function setupGlitchText() {
      // Очищаем логотип
      logoElement.textContent = '';
      
      // Добавляем span для каждого символа
      for (let i = 0; i < originalText.length; i++) {
        const charSpan = document.createElement('span');
        charSpan.className = 'glitch-char';
        charSpan.dataset.original = originalText[i];
        charSpan.textContent = originalText[i]; // Изначально показываем нормальный текст
        logoElement.appendChild(charSpan);
      }
      
      return logoElement.querySelectorAll('.glitch-char');
    }
    
    const charElements = setupGlitchText();
    
    // Переменные для отслеживания состояния анимации
    let isActive = false;
    let lastMoveTime = 0;
    const throttleDelay = 50; // Задержка для сглаживания анимации
    let animationFrameId = null;
    
    // Анимация при движении мыши в любом месте окна
    document.addEventListener('mousemove', function(e) {
      const currentTime = Date.now();
      
      // Применяем throttling для сглаживания анимации
      if (currentTime - lastMoveTime < throttleDelay) return;
      
      lastMoveTime = currentTime;
      
      // Отменяем предыдущую анимацию
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      animationFrameId = requestAnimationFrame(() => {
        // Получаем позицию курсора в окне
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Нормализуем координаты (0-1)
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const normalizedX = mouseX / windowWidth;
        const normalizedY = mouseY / windowHeight;
        
        // Определяем стили шрифта в зависимости от положения курсора
        const isRightTop = normalizedX > 0.5 && normalizedY < 0.5;
        const isLeftBottom = normalizedX < 0.5 && normalizedY > 0.5;
        
        // Обрабатываем каждую букву отдельно
        charElements.forEach((charSpan, index) => {
          const char = originalText[index].toLowerCase();
          const originalChar = charSpan.dataset.original;
          
          // Эффекты шрифта
          charSpan.classList.remove('italic', 'bold');
          
          if (isRightTop) {
            charSpan.classList.add('italic');
          } else if (isLeftBottom) {
            charSpan.classList.add('bold');
          }
          
          // Вероятность глитча зависит от положения и индекса символа
          const distanceFromCenter = Math.sqrt(
            Math.pow(normalizedX - 0.5, 2) + 
            Math.pow(normalizedY - 0.5, 2)
          ) * 2; // 0-1 от центра до угла
          
          const distortionLevel = Math.min(distanceFromCenter * 0.8, 0.7);
          const charSpecificDistortion = distortionLevel * (index % 2 === 0 ? 1.2 : 0.8);
          
          // Применяем глитч-эффект с разной вероятностью
          if (Math.random() < charSpecificDistortion && symbolMap[char]) {
            const alternatives = symbolMap[char];
            const randomIndex = Math.floor(Math.random() * alternatives.length);
            charSpan.textContent = alternatives[randomIndex];
          } else if (Math.random() < charSpecificDistortion * 0.3) {
            // С меньшей вероятностью используем полностью случайный символ
            const randomIndex = Math.floor(Math.random() * randomSymbols.length);
            charSpan.textContent = randomSymbols[randomIndex];
          } else {
            // Иначе возвращаем оригинальный символ
            charSpan.textContent = originalChar;
          }
        });
        
        // Активируем состояние для автоматической анимации
        isActive = true;
        
        // Запускаем таймер сброса
        startResetTimer();
      });
    });
    
    // Инициализируем случайную анимацию логотипа при бездействии
    function startRandomAnimation() {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      // Случайная анимация символов
      function randomGlitch() {
        if (!document.hasFocus()) return; // Останавливаем анимацию, если вкладка не активна
        
        charElements.forEach((charSpan, index) => {
          const char = originalText[index].toLowerCase();
          const originalChar = charSpan.dataset.original;
          
          // Низкая вероятность случайного глитча
          if (Math.random() < 0.03 && symbolMap[char]) {
            const alternatives = symbolMap[char];
            const randomIndex = Math.floor(Math.random() * alternatives.length);
            charSpan.textContent = alternatives[randomIndex];
            
            // Быстрый сброс к оригиналу
            setTimeout(() => {
              if (!isActive) charSpan.textContent = originalChar;
            }, 100 + Math.random() * 200);
          }
        });
        
        // Продолжаем анимацию только если нет активного пользовательского взаимодействия
        if (!isActive) {
          animationFrameId = requestAnimationFrame(() => {
            setTimeout(randomGlitch, 300);
          });
        }
      }
      
      // Запускаем случайные глитчи
      randomGlitch();
    }
    
    // Запускаем случайную анимацию при загрузке страницы
    startRandomAnimation();
    
    // Сбрасываем текст при отсутствии движения мыши некоторое время
    let resetTimerId = null;
    
    function startResetTimer() {
      if (resetTimerId) clearTimeout(resetTimerId);
      
      resetTimerId = setTimeout(() => {
        if (isActive) {
          resetText();
          isActive = false;
          
          // Перезапускаем случайную анимацию после сброса
          startRandomAnimation();
        }
      }, 2000); // Время до сброса текста при отсутствии движения
    }
    
    // Функция сброса текста к оригиналу
    function resetText() {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      
      charElements.forEach((charSpan, index) => {
        charSpan.textContent = originalText[index];
        charSpan.classList.remove('italic', 'bold');
      });
    }
    
    // Сбрасываем текст, когда курсор покидает окно
    document.addEventListener('mouseleave', function() {
      resetText();
      isActive = false;
      
      // Перезапускаем случайную анимацию после ухода курсора
      startRandomAnimation();
    });
  }
}); 