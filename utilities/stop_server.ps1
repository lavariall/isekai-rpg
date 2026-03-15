$port = 5173
Write-Host "Searching for active process on port $port..."

# Filter for Listen or Established states to find the active server process
$processIds = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | 
              Where-Object { $_.State -eq 'Listen' -or $_.State -eq 'Established' } |
              Select-Object -ExpandProperty OwningProcess -Unique

if ($processIds) {
    foreach ($itemPid in $processIds) {
        if ($itemPid -eq 0) { continue }
        $process = Get-Process -Id $itemPid -ErrorAction SilentlyContinue
        if ($process) {
            Write-Host "Stopping process $($process.Name) (PID: $itemPid)..."
            Stop-Process -Id $itemPid -Force
            Write-Host "Process stopped."
        }
    }
} else {
    Write-Host "No active process found on port $port."
}
