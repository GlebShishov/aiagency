@echo off
echo Запуск Jekyll через Docker...
echo.

set CURRENT_DIR=%CD%
echo Текущая директория: %CURRENT_DIR%

echo Запуск Docker с монтированием текущей директории...
docker run --rm -it -p 4000:4000 -v "%CURRENT_DIR%:/srv/jekyll" -w /srv/jekyll bretfisher/jekyll-serve

IF %ERRORLEVEL% NEQ 0 (
  echo.
  echo Возникла ошибка при запуске Docker.
  echo Попробуйте альтернативный вариант монтирования:
  docker run --rm -it -p 4000:4000 -v "%CURRENT_DIR%:/site" bretfisher/jekyll-serve
)

echo.
pause 