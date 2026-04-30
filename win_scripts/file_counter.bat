@echo off
setlocal enabledelayedexpansion

:main
cls
echo === File Counter Tool ===
echo.

:get_directory
set target_dir=
set /p target_dir=Enter directory path (press Enter for current directory): 
if "%target_dir%"=="" set target_dir=.

if not exist "%target_dir%" (
    echo Error: Directory does not exist, please try again
    echo.
    goto get_directory
)

if exist "%target_dir%\*" (
    echo Directory is valid
) else (
    echo Error: Not a valid directory, please try again
    echo.
    goto get_directory
)

:get_recursive
set recursive_input=
set /p recursive_input=Recursive scan subdirectories? (y/n, default=n): 
set recursive=0
if /i "%recursive_input%"=="y" set recursive=1
if /i "%recursive_input%"=="yes" set recursive=1

echo.
echo Scanning directory: %target_dir%
echo.

set file_count=0
set dir_count=0

if "%recursive%"=="1" (
    echo Mode: Recursive
    for /f %%a in ('dir /s /a-d "%target_dir%" 2^>nul ^| find /c /v ""') do set file_count=%%a
    for /f %%a in ('dir /s /ad "%target_dir%" 2^>nul ^| find /c /v ""') do set dir_count=%%a
) else (
    echo Mode: Non-recursive
    for /f %%a in ('dir /a-d "%target_dir%" 2^>nul ^| find /c /v ""') do set file_count=%%a
    for /f %%a in ('dir /ad "%target_dir%" 2^>nul ^| find /c /v ""') do set dir_count=%%a
)

echo.
echo Total files: %file_count%
echo Total directories: %dir_count%

if "%recursive%"=="1" (
    echo.
    echo File type statistics:
    
    set temp_file=%temp%\fc_%random%.tmp
    dir /s /a-d /b "%target_dir%" 2>nul > "%temp_file%"
    
    if exist "%temp_file%" (
        for /f "delims=" %%f in ('type "%temp_file%"') do (
            set "fname=%%~nxf"
            set "ext=%%~xf"
            if "!ext!"=="" set "ext=NO_EXT"
            set "cnt_!ext!=0"
        )
        
        for /f "delims=" %%f in ('type "%temp_file%"') do (
            set "ext=%%~xf"
            if "!ext!"=="" set "ext=NO_EXT"
            set /a cnt_!ext!+=1
        )
        
        for /f "tokens=2 delims==" %%a in ('set cnt_ 2^>nul') do (
            echo   %%a: !cnt_%%a!
        )
        
        del "%temp_file%" >nul 2>&1
    ) else (
        echo   No files found
    )
)

echo.
pause