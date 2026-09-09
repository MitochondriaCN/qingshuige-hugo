$ErrorActionPreference = 'Stop'
$env:GIT_TERMINAL_PROMPT = '0'
$env:GCM_INTERACTIVE = 'never'
$credentialLines = @('protocol=https', 'host=github.com', '') | git -c credential.interactive=never credential fill 2>$null
if ($LASTEXITCODE -ne 0) { throw 'Git credential manager has no usable GitHub login.' }
$credential = @{}
foreach ($line in $credentialLines) {
  $parts = $line -split '=', 2
  if ($parts.Count -eq 2) { $credential[$parts[0]] = $parts[1] }
}
if (-not $credential.password) { throw 'No GitHub credential is available.' }
$headers = @{ Authorization = 'Bearer ' + $credential.password; Accept = 'application/vnd.github+json'; 'X-GitHub-Api-Version' = '2022-11-28' }
$account = Invoke-RestMethod -Uri 'https://api.github.com/user' -Headers $headers
if ($account.login -ne 'nanmuweyyyyyy') { throw ('GitHub login differs from the connected account: ' + $account.login) }
$repoUrl = 'https://api.github.com/repos/' + $account.login + '/qingshuige-search'
$repo = $null
try { $repo = Invoke-RestMethod -Uri $repoUrl -Headers $headers }
catch { if ([int]$_.Exception.Response.StatusCode -ne 404) { throw } }
if (-not $repo) {
  $body = @{ name = 'qingshuige-search'; description = 'Lightweight framework-independent search for static sites, with browser, Vue and Hugo adapters.'; private = $true; auto_init = $false } | ConvertTo-Json
  $repo = Invoke-RestMethod -Uri 'https://api.github.com/user/repos' -Method Post -Headers $headers -ContentType 'application/json' -Body $body
}
$headers.Clear()
$credential.Clear()
$credentialLines = $null
$repo | Select-Object html_url, clone_url, private, default_branch | ConvertTo-Json
