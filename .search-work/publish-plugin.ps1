$ErrorActionPreference = 'Stop'
function Invoke-GitChecked {
  & git @args
  if ($LASTEXITCODE -ne 0) { throw ('Git operation failed: ' + ($args -join ' ')) }
}
$plugin = 'D:/qingshuige/qingshuige-hugo/plugins/qingshuige-search'
$standalone = 'D:/qingshuige/qingshuige-search'
$remote = 'https://github.com/nanmuweyyyyyy/qingshuige-search.git'
$trackedChanges = & git -C $standalone status --porcelain --untracked-files=no
if ($LASTEXITCODE -ne 0 -or $trackedChanges) { throw 'The standalone plugin has unexpected tracked changes; refusing to replace them.' }
Invoke-GitChecked -C $plugin add --all
Invoke-GitChecked -C $plugin -c user.name=Codex -c user.email=codex@local commit -m 'feat: separate search core strategies and ship Hugo adapters'
Invoke-GitChecked -C $standalone fetch $plugin main
Invoke-GitChecked -C $standalone merge --ff-only FETCH_HEAD
Invoke-GitChecked -C $standalone remote add origin $remote
Invoke-GitChecked -C $standalone push -u origin main
Invoke-GitChecked -C 'D:/qingshuige/qingshuige-hugo' submodule set-url plugins/qingshuige-search $remote
Invoke-GitChecked -C $plugin fetch origin
Invoke-GitChecked -C $plugin branch --set-upstream-to=origin/main main
Invoke-GitChecked -C 'D:/qingshuige/qingshuige-hugo' add .gitmodules plugins/qingshuige-search
Invoke-GitChecked -C $standalone log -1 --oneline
Invoke-GitChecked -C $plugin status --short
Invoke-GitChecked -C $plugin ls-remote origin refs/heads/main
