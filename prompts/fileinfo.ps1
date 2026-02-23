$files = Get-ChildItem 'C:\MyProject\crmp\jia-pro\src\components\slides\*.tsx'
foreach ($f in $files) {
    $lines = (Get-Content $f.FullName).Count
    $kb = [math]::Round($f.Length / 1024, 1)
    Write-Host ("{0,-22} {1,4} lines  {2,5} KB" -f $f.Name, $lines, $kb)
}
