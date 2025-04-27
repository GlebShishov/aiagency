@echo off
echo Jekyll Troubleshooter - Решение проблем с запуском Jekyll
echo ====================================================
echo.

:menu
echo Выберите действие:
echo 1. Проверить наличие Ruby
echo 2. Проверить наличие Docker
echo 3. Настроить Ruby+MSYS2 для Windows (рекомендуется)
echo 4. ИСПРАВИТЬ ОШИБКУ FFI НА WINDOWS (проблема с bundle install)
echo 5. Запустить Jekyll локально (улучшенная версия)
echo 6. Запустить Jekyll локально (обычная версия)
echo 7. Запустить через Docker (стандартный)
echo 8. Запустить через Docker (упрощенный)
echo 9. Запустить через ЧИСТЫЙ Docker (без Bundler - РЕКОМЕНДУЕТСЯ)
echo C. Очистить кеш Docker
echo 0. Выход
echo.

set /p choice=Ваш выбор (0-9, C): 

if "%choice%"=="1" goto check_ruby
if "%choice%"=="2" goto check_docker
if "%choice%"=="3" goto setup_windows
if "%choice%"=="4" goto fix_ffi
if "%choice%"=="5" goto run_local_fixed
if "%choice%"=="6" goto run_local
if "%choice%"=="7" goto run_docker
if "%choice%"=="8" goto run_simple_docker
if "%choice%"=="9" goto run_clean_docker
if /i "%choice%"=="C" goto clean_docker
if "%choice%"=="0" goto end
goto menu

:check_ruby
echo.
echo Проверка установки Ruby...
where ruby
if %ERRORLEVEL% NEQ 0 (
    echo Ruby не установлен. Установите Ruby с сайта https://rubyinstaller.org/
) else (
    ruby -v
    echo Ruby установлен.
    echo Проверка Bundler...
    where bundle
    if %ERRORLEVEL% NEQ 0 (
        echo Bundler не установлен. Установка...
        gem install bundler
    ) else (
        echo Bundler установлен.
    )
)
echo.
pause
goto menu

:check_docker
echo.
echo Проверка установки Docker...
where docker
if %ERRORLEVEL% NEQ 0 (
    echo Docker не установлен. Установите Docker с сайта https://www.docker.com/products/docker-desktop
) else (
    docker --version
    echo Docker установлен.
)
echo.
pause
goto menu

:setup_windows
echo.
echo Запуск настройки среды на Windows...
call scripts\windows-setup.bat
goto menu

:fix_ffi
echo.
echo Исправление проблемы с ffi на Windows...
call scripts\fix-ffi-windows.bat
goto menu

:run_local_fixed
echo.
echo Запуск Jekyll локально (улучшенная версия)...
call scripts\run-local-fixed.bat
goto menu

:run_local
echo.
echo Запуск Jekyll локально...
call scripts\run-local.bat
goto menu

:run_docker
echo.
echo Запуск Jekyll через Docker...
call scripts\start-with-docker-cached.bat
goto menu

:run_simple_docker
echo.
echo Запуск Jekyll через упрощенный Docker...
call scripts\start-simple-docker.bat
goto menu

:run_clean_docker
echo.
echo Запуск Jekyll через чистый Docker (без Bundler)...
call scripts\start-clean-docker.bat
goto menu

:clean_docker
echo.
echo Очистка кеша Docker...
docker system prune -a -f
echo.
pause
goto menu

:end
echo.
echo Выход из Jekyll Troubleshooter
exit /b 0 