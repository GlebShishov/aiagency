@echo off
echo ============================================
echo Запуск Jekyll через чистый Docker
echo ============================================
echo.

echo Сборка Docker-образа из упрощенного Dockerfile...
docker build -t jekyll-clean -f Dockerfile.clean .

echo.
echo Запуск контейнера...
set CURRENT_DIR=%cd%
echo Текущая директория: %CURRENT_DIR%
docker run --rm -p 4000:4000 -p 35729:35729 -v "%CURRENT_DIR%:/srv/jekyll" jekyll-clean

echo.
echo Если сайт запустился, перейдите по адресу: http://localhost:4000
echo Для остановки сервера нажмите Ctrl+C
pause 