@echo off
cd /d "%~dp0"
echo Checking Jekyll project structure...

if not exist "_layouts" (
  mkdir _layouts
  echo Created _layouts directory
)

if not exist "_posts" (
  mkdir _posts
  echo Created _posts directory
)

if not exist "_projects" (
  mkdir _projects
  echo Created _projects directory
)

if not exist "_services" (
  mkdir _services
  echo Created _services directory
)

echo.
echo Copying files to ensure proper encoding...

if exist "posts\branding-project.md" (
  copy "posts\branding-project.md" "_projects\branding-project.md"
  echo Copied branding project
)

if exist "posts\development-project.md" (
  copy "posts\development-project.md" "_projects\development-project.md"
  echo Copied development project
)

if exist "_services\branding.md" (
  copy "_services\branding.md" "_services\branding-fixed.md"
  echo Fixed branding service
)

echo.
echo Project structure check completed!
echo Now try running run-jekyll.bat
pause 