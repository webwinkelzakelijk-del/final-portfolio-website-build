# Full-page screenshots with the headless Edge that ships with Windows.
# Usage: powershell -File scripts/screenshot.ps1 -Url http://localhost:4321/ -Out docs/screenshots/x.png -Width 1440 -Height 4200 [-Mobile]
param(
  [Parameter(Mandatory)] [string]$Url,
  [Parameter(Mandatory)] [string]$Out,
  [int]$Width = 1440,
  [int]$Height = 900,
  [switch]$Mobile
)
$edge = @("C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe", "C:\Program Files\Microsoft\Edge\Application\msedge.exe") |
  Where-Object { Test-Path $_ } | Select-Object -First 1
$args = @("--headless=new", "--disable-gpu", "--hide-scrollbars", "--user-data-dir=$env:TEMP\kr-edge-shot",
  "--window-size=$Width,$Height", "--virtual-time-budget=5000", "--screenshot=$Out")
if ($Mobile) { $args += "--user-agent=Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Mobile Safari/537.36" }
$args += $Url
& $edge @args 2>$null | Out-Null
Get-Item $Out | Select-Object Name, Length
