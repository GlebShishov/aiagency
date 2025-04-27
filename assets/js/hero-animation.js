// JavaScript для анимации hero секции
document.addEventListener('DOMContentLoaded', function() {
  // Добавляем класс loaded к секции hero для запуска анимации
  setTimeout(function() {
    const heroSection = document.querySelector('.hero-animation');
    if (heroSection) {
      // Запускаем первый шаг анимации
      heroSection.classList.add('loaded');
      
      // Запускаем второй шаг анимации через 650ms
      setTimeout(function() {
        heroSection.classList.add('rectangle');
        
        // Запускаем третий шаг анимации через 650ms после второго
        setTimeout(function() {
          heroSection.classList.add('expanded');
        }, 650);
      }, 650);
    }
  }, 100); // Минимальная задержка перед началом анимации
});
