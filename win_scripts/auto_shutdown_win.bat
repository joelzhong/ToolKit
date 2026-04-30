@echo off
chcp 65001 >nul
title 定时关机脚本

:: 默认时间（分钟）
set DEFAULT_TIME=60

:: 显示帮助
if "%1"=="-h" goto :showhelp
if "%1"=="--help" goto :showhelp
if "%1"=="/?" goto :showhelp

:: 检查是否传入参数
if "%1"=="" (
    set minutes=%DEFAULT_TIME%
    echo [*] 未指定时间，使用默认值：%DEFAULT_TIME% 分钟
) else (
    set minutes=%1
    echo [*] 设定关机时间：%minutes% 分钟
)

:: 验证是否为有效数字
echo %minutes%|findstr /r "^[1-9][0-9]*$" >nul
if errorlevel 1 (
    echo [错误] 请输入有效的正整数！
    echo 示例: %~nx0 60
    pause
    exit /b 1
)

:: 限制最大时间（防止误操作，可选）
if %minutes% gtr 1440 (
    echo [警告] 时间超过24小时（1440分钟），请确认是否正确
    choice /c YN /n /m "是否继续? (Y/N): "
    if errorlevel 2 exit /b 1
)

:: 计算秒数
set /a seconds=%minutes% * 60

:: 显示信息
echo.
echo ========================================
echo          Windows 定时关机
echo ========================================
echo.
echo   关机时间：%minutes% 分钟后
echo   剩余秒数：%seconds% 秒
echo   关机时间：%date% %time:~0,5%
echo.
echo ========================================
echo   取消关机：shutdown /a
echo ========================================
echo.

:: 执行定时关机
shutdown /s /t %seconds% /c "系统将在 %minutes% 分钟后自动关机，请保存好工作！"

exit /b 0

:showhelp
echo.
echo ========================================
echo 定时关机脚本 - 使用帮助
echo ========================================
echo.
echo 用法：
echo   %~nx0 [分钟数]
echo.
echo 参数：
echo   分钟数    - 设置多少分钟后自动关机（正整数）
echo.
echo 示例：
echo   %~nx0          - 默认30分钟后关机
echo   %~nx0 10       - 10分钟后关机
echo   %~nx0 60       - 1小时后关机
echo   %~nx0 480      - 8小时后关机
echo.
echo 其他命令：
echo   shutdown /a    - 取消定时关机
echo   %~nx0 -h       - 显示此帮助信息
echo.
pause
exit /b 0