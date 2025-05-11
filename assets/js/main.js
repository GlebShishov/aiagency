document.addEventListener('DOMContentLoaded', function() {
  // Инициализация плавного скроллинга
  if (window.initSmoothScroll) {
    window.initSmoothScroll();
  }
  
  // Header visibility on scroll
  const header = document.querySelector('.header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navWrapper = document.querySelector('.nav-wrapper');
  const navLinks = document.querySelectorAll('.nav-link');
  const rootElement = document.documentElement;
  const optionButtons = document.querySelectorAll('.option-button');
  const serviceInput = document.getElementById('serviceInput');
  
  let lastScrollY = window.scrollY;
  
  // Вызываем handleScroll при загрузке страницы
  handleScroll();
  
  // Функция для обработки скролла
  function handleScroll() {
    const currentScrollY = window.scrollY;
    const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
    const orderDesignBtn = document.querySelector('.order-design-btn');
    const contactSection = document.querySelector('.contact-section');
    
    // Если на главной странице
    if (isHomePage) {
      // Делаем хедер статичным и прозрачным на главной странице
      header.classList.add('static');
      header.classList.add('transparent');
      header.classList.remove('scrolled');
      
      // Всегда показываем хедер на главной странице
      header.classList.remove('hidden');
      header.classList.add('visible');
    } else {
      // На других страницах всегда показываем фон и делаем хедер фиксированным
      header.classList.remove('static');
      header.classList.add('scrolled');
      header.classList.remove('transparent');
      
      // Плавный выезд хедера при скролле на внутренних страницах
      // Если скролл вниз и не в самом верху
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        header.classList.add('hidden');
        header.classList.remove('visible');
        
        // Показываем кнопку заказа дизайна при скролле вниз
        if (orderDesignBtn) {
          // Проверяем, находимся ли мы на секции контактов
          if (contactSection) {
            const contactRect = contactSection.getBoundingClientRect();
            // Если контактная секция видима на экране, скрываем кнопку
            if (contactRect.top < window.innerHeight && contactRect.bottom > 0) {
              orderDesignBtn.classList.remove('visible');
            } else {
              orderDesignBtn.classList.add('visible');
            }
          } else {
            orderDesignBtn.classList.add('visible');
          }
        }
      } else {
        // Если скролл вверх или в самом верху
        header.classList.remove('hidden');
        header.classList.add('visible');
        
        // Скрываем кнопку заказа дизайна при скролле вверх или в самом верху
        if (orderDesignBtn && currentScrollY <= 100) {
          orderDesignBtn.classList.remove('visible');
        }
      }
    }
    
    lastScrollY = currentScrollY;
  }
  
  // Добавляем обработчик события скролла
  window.addEventListener('scroll', function() {
    handleScroll();
    
    // Закрываем выпадающие меню при скролле
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove('active');
      const dropdownMenu = dropdown.querySelector('.dropdown-menu');
      if (dropdownMenu) {
        dropdownMenu.classList.remove('active');
      }
    });
  });
  
  // Начальная настройка видимости хедера
  setTimeout(() => {
    header.classList.add('visible');
    
    // Если на главной странице и в самом верху, делаем хедер прозрачным при загрузке
    const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
    if (isHomePage && window.scrollY <= 10) {
      header.classList.add('transparent');
    }
  }, 100);
  
  // Mobile menu toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      mobileToggle.classList.toggle('active');
      navWrapper.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
  }
  
  // Закрытие мобильного меню при клике на ссылку
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Если это не ссылка в выпадающем меню
      if (!link.closest('.dropdown') || window.innerWidth <= 991.98) {
        if (window.innerWidth <= 991.98) {
          mobileToggle.classList.remove('active');
          navWrapper.classList.remove('active');
          document.body.classList.remove('no-scroll');
        }
      }
    });
  });
  
  // Обработка выпадающего меню
  const dropdowns = document.querySelectorAll('.dropdown');
  
  // Закрываем все выпадающие меню при клике вне их области
  document.addEventListener('click', function(e) {
    // Не закрываем меню, если клик был на элементе внутри выпадающего меню или в хедере
    if (!e.target.closest('.dropdown') && !e.target.closest('.dropdown-menu') && !e.target.closest('.header')) {
      // Закрываем все выпадающие меню при клике вне их области
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        if (dropdownMenu) {
          dropdownMenu.classList.remove('active');
        }
      });
    }
  });
  
  // Добавляем обработчик наведения на другие пункты меню
  const navItems = document.querySelectorAll('.nav-menu > li:not(.dropdown)');
  navItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      // Закрываем все открытые выпадающие меню
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        if (dropdownMenu) {
          dropdownMenu.classList.remove('active');
        }
      });
    });
  });
  
  // Обработка выпадающих меню
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('.button');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    // Добавляем обработчики для наведения мыши
    dropdown.addEventListener('mouseenter', function() {
      if (window.innerWidth > 991.98) {
        dropdown.classList.add('active');
        if (menu) {
          menu.classList.add('active');
        }
      }
    });
    
    // Добавляем обработчик для выпадающего меню
    if (menu) {
      menu.addEventListener('mouseenter', function() {
        if (window.innerWidth > 991.98) {
          dropdown.classList.add('active');
          menu.classList.add('active');
        }
      });
      
      menu.addEventListener('mouseleave', function() {
        if (window.innerWidth > 991.98 && !dropdown.matches(':hover')) {
          dropdown.classList.remove('active');
          menu.classList.remove('active');
        }
      });
      
      // Обработка категорий в новом dropdown меню
      const categories = menu.querySelectorAll('.dropdown-category');
      const serviceGroups = menu.querySelectorAll('.dropdown-service-group');
      
      if (categories.length > 0) {
        categories.forEach(category => {
          // Обработчик наведения мыши
          category.addEventListener('mouseenter', function() {
            // Удаляем активный класс со всех категорий
            categories.forEach(cat => cat.classList.remove('active'));
            // Добавляем активный класс к текущей категории
            category.classList.add('active');
            
            // Получаем значение data-category
            const categoryValue = category.getAttribute('data-category');
            
            // Скрываем все группы услуг
            serviceGroups.forEach(group => group.classList.remove('active'));
            
            // Показываем соответствующую группу услуг
            const targetGroup = menu.querySelector(`.dropdown-service-group[data-category="${categoryValue}"]`);
            if (targetGroup) {
              targetGroup.classList.add('active');
            }
          });
          
          // Обработчик клика - не предотвращаем стандартное поведение ссылки
          category.addEventListener('click', function(e) {
            // Переход по ссылке происходит автоматически
          });
        });
      }
    }
    
    dropdown.addEventListener('mouseleave', function() {
      // Добавляем задержку перед закрытием меню
      if (window.innerWidth > 991.98) {
        // Не закрываем меню при уходе с кнопки
        // Меню будет закрыто только при клике вне меню или при наведении на другой пункт меню
      }
    });
    
    // Обработка клика для десктопной и мобильной версии
    link.addEventListener('click', function(e) {
      // Предотвращаем переход по ссылке
      e.preventDefault();
      e.stopPropagation();
      
      if (window.innerWidth <= 991.98) {
        // Мобильная версия - просто переключаем видимость
        menu.classList.toggle('active');
        dropdown.classList.toggle('active');
      } else {
        // Десктопная версия - переключаем активное состояние
        const isActive = dropdown.classList.contains('active');
        
        // Закрываем все другие активные выпадающие меню
        dropdowns.forEach(otherDropdown => {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove('active');
            const otherMenu = otherDropdown.querySelector('.dropdown-menu');
            if (otherMenu) {
              otherMenu.classList.remove('active');
            }
          }
        });
        
        // Переключаем текущее меню
        dropdown.classList.toggle('active');
        menu.classList.toggle('active');
      }
    });
  });
  
  // Функция ленивой загрузки изображений
  function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('[data-src]');
    const lazyBackgrounds = document.querySelectorAll('[data-background]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });
      
      const backgroundObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            element.style.backgroundImage = `url(${element.dataset.background})`;
            element.removeAttribute('data-background');
            backgroundObserver.unobserve(element);
          }
        });
      });
      
      lazyImages.forEach(img => {
        imageObserver.observe(img);
      });
      
      lazyBackgrounds.forEach(bg => {
        backgroundObserver.observe(bg);
      });
    } else {
      // Fallback для браузеров без поддержки IntersectionObserver
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
      
      lazyBackgrounds.forEach(bg => {
        bg.style.backgroundImage = `url(${bg.dataset.background})`;
        bg.removeAttribute('data-background');
      });
    }
  }
  
  // Инициализация ленивой загрузки
  lazyLoadImages();
  
  // Обработчик для кнопок скролла до контактной секции
  const scrollToContactButtons = document.querySelectorAll('.scroll-to-contact');
  
  if (scrollToContactButtons.length > 0) {
    scrollToContactButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const contactSection = document.querySelector('.contact-section');
        if (contactSection) {
          // Закрываем мобильное меню, если оно открыто
          if (navWrapper.classList.contains('active')) {
            navWrapper.classList.remove('active');
            mobileToggle.classList.remove('active');
          }
          
          // Плавный скролл к контактной секции
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
  
  // Убедимся, что все кнопки "начать проект" перенаправляют на страницу контактов
  const allStartProjectButtons = document.querySelectorAll('.start-project-btn, [data-action="start-project"]');
  
  // Добавляем обработчик для кнопок start-project
  allStartProjectButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      // Учитываем возможный baseurl для GitHub Pages
      const baseUrl = document.querySelector('meta[name="baseurl"]') ? document.querySelector('meta[name="baseurl"]').getAttribute('content') : '';
      window.location.href = baseUrl + '/contacts';
    });
  });
  
  // Функция для проверки содержимого кнопок
  function setupProjectButtons() {
    const allButtons = document.querySelectorAll('.button');
    allButtons.forEach(button => {
      if (button.textContent.trim() === 'Обсудить проект') {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          // Учитываем возможный baseurl для GitHub Pages
      const baseUrl = document.querySelector('meta[name="baseurl"]') ? document.querySelector('meta[name="baseurl"]').getAttribute('content') : '';
      window.location.href = baseUrl + '/contacts';
        });
      }
    });
  }
  
  // Вызываем функцию для настройки кнопок
  setupProjectButtons();
  
  allStartProjectButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      if (contactModal) {
        contactModal.classList.add('open');
        document.body.style.overflow = 'hidden'; // Запрет скролла основной страницы
      }
    });
  });
  
  // Initialize smooth scroll behavior for all links
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerOffset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Применяем плавный переход на все внутренние ссылки
  document.querySelectorAll('a[href^="/"]:not([href^="//"])').forEach(link => {
    link.addEventListener('click', function(e) {
      // Исключаем ссылки, которые должны обрабатываться иначе
      if (this.getAttribute('target') === '_blank' || this.getAttribute('download') || this.getAttribute('rel') === 'external') {
        return;
      }
      
      const href = this.getAttribute('href');
      const isInternalLink = href.indexOf(window.location.hostname) > -1 || href.startsWith('/');
      
      if (isInternalLink) {
        e.preventDefault();
        
        const transitionDuration = 300; // ms, уменьшено для более быстрого отклика
        
        // Плавное затухание
        document.body.style.opacity = '0';
        document.body.style.transition = `opacity ${transitionDuration}ms ease`;
        
        setTimeout(() => {
          // Используем history.pushState вместо window.location.href
          // для корректной работы кнопки "назад"
          window.location.href = href;
        }, transitionDuration);
      }
    });
  });
  
  // Обработчик события popstate (кнопка "назад")
  window.addEventListener('pageshow', function(event) {
    // Если страница загружена из кэша (кнопка "назад")
    if (event.persisted) {
      // Восстанавливаем видимость страницы
      document.body.style.opacity = '1';
    }
  });
  
  // Projects slider infinite scroll
  const slider = document.querySelector('.projects-slider');
  if (slider) {
    let isDown = false;
    let startX;
    let scrollLeft;
    
    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3;
      slider.scrollLeft = scrollLeft - walk;
    });
  }
  
  // Модальное окно
  const modalClose = document.getElementById('modal-close');
  const modalOverlay = document.querySelector('.modal-overlay');
  const contactModalClose = document.getElementById('contact-modal-close');
  
  // Открытие модальных окон
  const modalTriggers = document.querySelectorAll('.js-modal-trigger');
  if (modalTriggers) {
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const modalId = this.getAttribute('data-modal');
        const targetModal = document.getElementById(modalId);
        
        // Проверяем, есть ли у кнопки атрибут data-service
        const serviceType = this.getAttribute('data-service');
        if (serviceType && targetModal) {
          // Находим все кнопки выбора услуг в модальном окне
          const serviceButtons = targetModal.querySelectorAll('.option-button');
          // Сначала сбрасываем все активные кнопки
          serviceButtons.forEach(btn => btn.classList.remove('active'));
          
          // Активируем кнопку, соответствующую выбранной услуге
          const matchingButton = targetModal.querySelector(`.option-button[data-service="${serviceType}"]`);
          if (matchingButton) {
            matchingButton.classList.add('active');
            
            // Устанавливаем значение в скрытое поле, если оно есть
            const serviceInput = targetModal.querySelector('#serviceInput');
            if (serviceInput) {
              serviceInput.value = serviceType;
            }
          }
        }
        
        if (targetModal) {
          targetModal.classList.add('open');
          document.body.style.overflow = 'hidden'; // Блокируем скролл основной страницы
        }
      });
    });
  }
  
  // Закрытие модального окна
  if (modalClose) {
    modalClose.addEventListener('click', function() {
      modal.classList.remove('open');
      document.body.style.overflow = ''; // Возвращаем скролл основной страницы
    });
  }
  
  if (contactModalClose) {
    contactModalClose.addEventListener('click', function() {
      contactModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
  
  // Обработка клика по оверлею
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
      const parentModal = e.target.closest('.modal');
      if (parentModal) {
        parentModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });
  
  // Открытие модального окна проекта по клику на кнопку
  const projectButtons = document.querySelectorAll('.button:not(.js-modal-trigger):not(.start-project-btn):not([data-action="start-project"])');
  
  projectButtons.forEach(button => {
    if (button.textContent.trim() === 'Обсудить проект' && !button.hasAttribute('data-modal')) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        if (contactModal) {
          contactModal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    }
  });
  
  // Подсветка активного пункта меню
  const currentPath = window.location.pathname;
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath && currentPath.includes(linkPath) && linkPath !== '/') {
      link.classList.add('active');
      
      // Если это подменю, добавляем класс активности родителю
      const parentDropdown = link.closest('.dropdown');
      if (parentDropdown) {
        const parentLink = parentDropdown.querySelector('.nav-link');
        parentLink.classList.add('active');
      }
    }
  });
  
  // Фильтрация проектов
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');
  
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const filterValue = this.getAttribute('data-filter');
        
        // Удаляем активный класс со всех кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Добавляем активный класс нажатой кнопке
        this.classList.add('active');
        
        // Фильтруем проекты
        projectItems.forEach(item => {
          if (filterValue === 'all') {
            item.style.display = 'block';
          } else {
            const itemCategories = item.getAttribute('data-category');
            if (itemCategories && itemCategories.includes(filterValue)) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          }
        });
      });
    });
  }
  
  // Установка выбранной услуги в форме
  const serviceButtons = document.querySelectorAll('.option-button[data-service]');
  
  if (serviceButtons.length > 0 && serviceInput) {
    // Проверка URL параметров
    const urlParams = new URLSearchParams(window.location.search);
    const serviceFromURL = urlParams.get('service');
    
    if (serviceFromURL) {
      serviceInput.value = serviceFromURL;
      
      // Активируем соответствующую кнопку
      serviceButtons.forEach(btn => {
        if (btn.getAttribute('data-service') === serviceFromURL) {
          btn.classList.add('active');
        }
      });
    }
    
    serviceButtons.forEach(button => {
      button.addEventListener('click', function() {
        const serviceValue = this.getAttribute('data-service');
        
        // Удаляем активный класс со всех кнопок
        serviceButtons.forEach(btn => btn.classList.remove('active'));
        
        // Добавляем активный класс нажатой кнопке
        this.classList.add('active');
        
        // Устанавливаем значение в скрытое поле
        serviceInput.value = serviceValue;
      });
    });
  }
  
  // Функция setBackgroundImages удалена, так как теперь используются теги img вместо background-image
  
  // Обработка скрытых элементов
  function setupHiddenElements() {
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(element => {
      element.style.display = 'none';
    });
  }
  
  // Вызов setBackgroundImages удален
  setupHiddenElements();
  
  // Функция инициализации слайдера проектов
  function initProjectsSlider() {
    const slider = document.querySelector('.projects-slider');
    
    if (!slider) return;
    
    const container = slider.querySelector('.projects-slider-container');
    const slides = slider.querySelectorAll('.project-slide');
    const progressBar = slider.querySelector('.slider-progress-bar');
    
    if (slides.length === 0 || !container) return;
    
    let currentSlide = 0;
    const slideDuration = 5000; // 5 секунд на слайд
    let progressInterval;
    let progress = 0;
    
    // Запретить пользователю скроллить слайдер
    container.addEventListener('wheel', (e) => {
      e.preventDefault();
    }, { passive: false });
    
    container.addEventListener('touchmove', (e) => {
      e.preventDefault();
    }, { passive: false });
    
    // Функция переключения слайда с помощью скролла
    function goToSlide(index) {
      // Сброс прогресс-бара
      clearInterval(progressInterval);
      progress = 0;
      progressBar.style.width = '0%';
      
      // Определить новый индекс слайда
      currentSlide = (index + slides.length) % slides.length;
      
      // Плавно прокрутить к нужному слайду
      const slideWidth = slides[0].offsetWidth;
      container.scrollTo({
        left: slideWidth * currentSlide,
        behavior: 'smooth'
      });
      
      // Запуск прогресс-бара
      startProgressBar();
    }
    
    // Функция запуска прогресс-бара
    function startProgressBar() {
      const updateInterval = 50; // Обновление каждые 50мс
      const increment = (updateInterval / slideDuration) * 100;
      
      progressInterval = setInterval(() => {
        progress += increment;
        progressBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
          clearInterval(progressInterval);
          goToSlide(currentSlide + 1);
        }
      }, updateInterval);
    }
    
    // Пауза слайдера при наведении
    slider.addEventListener('mouseenter', () => {
      clearInterval(progressInterval);
    });
    
    // Возобновление слайдера при уходе курсора
    slider.addEventListener('mouseleave', () => {
      startProgressBar();
    });
    
    // Запуск слайдера
    startProgressBar();
  }
  
  // Инициализация слайдера проектов
  initProjectsSlider();
  
  // Функция для определения квадратных изображений в галерее
  function detectSquareImages() {
    const galleryImages = document.querySelectorAll('.gallery-item-adaptive img');
    
    galleryImages.forEach(img => {
      // При загрузке изображения
      img.onload = function() {
        const width = this.naturalWidth;
        const height = this.naturalHeight;
        const ratio = width / height;
        
        // Если соотношение сторон близко к 1 (квадратное изображение)
        if (ratio >= 0.9 && ratio <= 1.1) {
          this.classList.add('square-image');
        }
      };
      
      // Если изображение уже загружено
      if (img.complete) {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        const ratio = width / height;
        
        if (ratio >= 0.9 && ratio <= 1.1) {
          img.classList.add('square-image');
        }
      }
    });
  }
  
  // Вызываем функцию после загрузки страницы
  detectSquareImages();
  
  // Инициализация слайдшоу в секции услуг
  initServiceSlideshow();
});

// Функция для работы слайдшоу в секции услуг
function initServiceSlideshow() {
  const slideshowMain = document.querySelector('.slideshow-main');
  
  if (!slideshowMain) return; // Если нет слайдшоу, выходим
  
  const slideshowImages = document.querySelectorAll('.slideshow-image');
  const slideshowThumbnails = document.querySelectorAll('.slideshow-thumbnail');
  const slideDuration = 2000; // Длительность показа одного слайда (в мс) - теперь 2 секунды
  
  let currentSlide = 0;
  let slideInterval;
  
  // Устанавливаем начальные позиции для слайдов
  function setupSlides() {
    slideshowImages.forEach((slide, index) => {
      if (index === 0) {
        // Первый слайд видимый в главном окне
        slide.style.transform = 'translateX(0)';
        slide.classList.add('active');
      } else {
        // Остальные слайды спрятаны за пределами видимой области
        slide.style.transform = 'translateX(100%)';
      }
    });
  }
  
  // Функция для перемещения слайдов
  function moveSlides() {
    // Текущий слайд уходит влево
    slideshowImages[currentSlide].style.transform = 'translateX(-100%)';
    slideshowImages[currentSlide].classList.remove('active');
    
    // Увеличиваем индекс или сбрасываем его в начало
    const nextSlideIndex = (currentSlide + 1) % slideshowImages.length;
    
    // Следующий слайд приходит справа
    slideshowImages[nextSlideIndex].style.transform = 'translateX(0)';
    slideshowImages[nextSlideIndex].classList.add('active');
    
    // Обновляем текущий индекс
    currentSlide = nextSlideIndex;
    
    // Подготавливаем следующий слайд за кадром
    const nextNextSlideIndex = (currentSlide + 1) % slideshowImages.length;
    slideshowImages[nextNextSlideIndex].style.transform = 'translateX(100%)';
    
    // Сбрасываем и запускаем заново анимацию прогресс-бара
    resetProgressBar();
  }
  
  // Функция для переключения на конкретный слайд
  function goToSlide(index) {
    if (index === currentSlide) return; // Если кликнули на текущий слайд, ничего не делаем
    
    // Скрываем текущий слайд
    slideshowImages[currentSlide].style.transform = 'translateX(-100%)';
    slideshowImages[currentSlide].classList.remove('active');
    
    // Показываем выбранный слайд
    slideshowImages[index].style.transform = 'translateX(0)';
    slideshowImages[index].classList.add('active');
    
    // Обновляем текущий индекс
    currentSlide = index;
    
    // Подготавливаем следующий слайд за кадром
    const nextSlideIndex = (currentSlide + 1) % slideshowImages.length;
    slideshowImages[nextSlideIndex].style.transform = 'translateX(100%)';
    
    // Сбрасываем и запускаем заново анимацию прогресс-бара
    resetProgressBar();
    
    // Перезапускаем интервал
    clearInterval(slideInterval);
    slideInterval = setInterval(moveSlides, slideDuration);
  }
  
  // Функция для сброса и запуска анимации прогресс-бара
  function resetProgressBar() {
    // Получаем прогресс-бар текущего слайда
    const progressBar = slideshowImages[currentSlide].querySelector('.progress');
    
    // Сбрасываем анимацию
    progressBar.style.transition = 'none';
    progressBar.style.width = '0';
    
    // Запускаем анимацию заново
    setTimeout(() => {
      progressBar.style.transition = 'width 2s linear';
      progressBar.style.width = '100%';
    }, 10);
  }
  
  // Добавляем обработчики кликов на миниатюры
  slideshowThumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
      const index = parseInt(this.getAttribute('data-index'));
      goToSlide(index);
    });
  });
  
  // Инициализируем слайды
  setupSlides();
  resetProgressBar();
  
  // Добавляем эффект магнитного притяжения к курсору
  const slideshowContainer = document.querySelector('.service-hero-slideshow');
  const magneticElements = document.querySelectorAll('.slideshow-main, .slideshow-thumbnail');
  
  if (slideshowContainer && magneticElements.length > 0) {
    slideshowContainer.addEventListener('mousemove', (e) => {
      const containerRect = slideshowContainer.getBoundingClientRect();
      const mouseX = e.clientX - containerRect.left;
      const mouseY = e.clientY - containerRect.top;
      
      magneticElements.forEach(element => {
        const elementRect = element.getBoundingClientRect();
        const elementX = elementRect.left - containerRect.left + elementRect.width / 2;
        const elementY = elementRect.top - containerRect.top + elementRect.height / 2;
        
        // Расстояние от курсора до центра элемента
        const distanceX = mouseX - elementX;
        const distanceY = mouseY - elementY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        // Максимальное расстояние для эффекта притяжения
        const maxDistance = 150;
        
        if (distance < maxDistance) {
          // Сила притяжения (чем ближе, тем сильнее)
          const power = 1 - distance / maxDistance;
          
          // Максимальное смещение
          const maxMove = 15;
          
          // Рассчитываем смещение
          const moveX = (distanceX / distance) * power * maxMove;
          const moveY = (distanceY / distance) * power * maxMove;
          
          // Применяем смещение
          element.style.transform = `translateZ(${element.classList.contains('slideshow-main') ? '20px' : '10px'}) translate(${moveX}px, ${moveY}px)`;
        } else {
          // Возвращаем в исходное положение
          element.style.transform = `translateZ(${element.classList.contains('slideshow-main') ? '20px' : '10px'})`;
        }
      });
    });
    
    // Возвращаем элементы в исходное положение при уходе курсора
    slideshowContainer.addEventListener('mouseleave', () => {
      magneticElements.forEach(element => {
        element.style.transform = `translateZ(${element.classList.contains('slideshow-main') ? '20px' : '10px'})`;
      });
    });
    
    // Добавляем эффект парения
    magneticElements.forEach(element => {
      setInterval(() => {
        if (!element.style.transform.includes('translate(')) {
          const randomX = (Math.random() - 0.5) * 5;
          const randomY = (Math.random() - 0.5) * 5;
          element.style.transform = `translateZ(${element.classList.contains('slideshow-main') ? '20px' : '10px'}) translate(${randomX}px, ${randomY}px)`;
        }
      }, 2000 + Math.random() * 1000);
    });
  }
  
  // Запускаем автоматическое переключение слайдов
  slideInterval = setInterval(moveSlides, slideDuration);
}