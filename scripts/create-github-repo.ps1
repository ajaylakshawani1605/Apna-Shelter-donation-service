param(
  [Parameter(Mandatory=$true)]
  [string]$RepoName,

  [Parameter(Mandatory=$false)]
  [string]$Visibility = 'private', # or 'public'

  [Parameter(Mandatory=$false)]
  [string]$Description = ''
)

# Requires environment variable GITHUB_TOKEN to be set locally
if (-not $env:GITHUB_TOKEN) {
  Write-Error "Please set the environment variable GITHUB_TOKEN with a PAT that has 'repo' scope."
  exit 1
}

$body = @{
  name = $RepoName
  description = $Description
  private = ($Visibility -eq 'private')
} | ConvertTo-Json

$headers = @{ Authorization = "token $($env:GITHUB_TOKEN)"; "User-Agent" = "create-github-repo-script" }

Write-Host "Creating GitHub repo $RepoName..."
$response = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method Post -Headers $headers -Body $body -ContentType 'application/json'
if ($null -eq $response) {
  Write-Error "Failed to create repository"
  exit 1
}

$cloneUrl = $response.clone_url
Write-Host "Repository created: $cloneUrl"

# Add remote and push
Write-Host "Adding remote origin and pushing to GitHub..."
git remote remove origin 2>$null | Out-Null
git remote add origin $cloneUrl
git branch -M main
git push -u origin main

Write-Host "Done. Repo: $cloneUrl"
Write-Host "Visit: $response.html_url"