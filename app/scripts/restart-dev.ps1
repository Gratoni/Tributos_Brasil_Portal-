$port = 5173
$projectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")

$connections = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
$processIds = @($connections | Select-Object -ExpandProperty OwningProcess -Unique)

foreach ($processId in $processIds) {
  try {
    Stop-Process -Id $processId -Force -ErrorAction Stop
  } catch {
    Write-Host "Nao foi possivel encerrar o processo $processId da porta $port."
  }
}

Start-Sleep -Seconds 1

Start-Process -FilePath "npm.cmd" -ArgumentList "run", "dev" -WorkingDirectory $projectRoot

Write-Host "Servidor reiniciado. Acesse: http://localhost:$port/"
