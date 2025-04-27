// Скрипт для конвертации SCSS в CSS
const fs = require('fs');
const path = require('path');
const sass = require('sass');

// Функция для рекурсивного обхода директории
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

// Функция для конвертации SCSS в CSS
function convertScssToCss(scssPath) {
  try {
    const scssContent = fs.readFileSync(scssPath, 'utf8');
    const cssPath = scssPath.replace('_sass', 'assets/css').replace('.scss', '.css');
    
    // Создаем директорию, если она не существует
    const dir = path.dirname(cssPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Конвертируем SCSS в CSS
    const result = sass.compileString(scssContent, {
      style: 'expanded',
      loadPaths: ['_sass']
    });
    
    // Записываем CSS в файл
    fs.writeFileSync(cssPath, result.css);
    console.log(`Конвертирован файл: ${scssPath} -> ${cssPath}`);
  } catch (error) {
    console.error(`Ошибка при конвертации ${scssPath}:`, error);
  }
}

// Конвертируем все SCSS файлы
walkDir('_sass', (filePath) => {
  if (filePath.endsWith('.scss')) {
    convertScssToCss(filePath);
  }
});

console.log('Конвертация завершена!'); 