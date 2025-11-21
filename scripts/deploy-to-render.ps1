param(
  [Parameter(Mandatory=$true)]
  [string]$ServiceName,

  [Parameter(Mandatory=$true)]
  [string]$RepoFullName, # owner/repo

  [Parameter(Mandatory=$false)]
  [string]$Branch = 'main'
)

# Requires environment variable RENDER_API_KEY to be set locally
if (-not $env:RENDER_API_KEY) {
  Write-Error "Please set the environment variable RENDER_API_KEY with a Render API key."
  exit 1
}

$headers = @{ "Authorization" = "Bearer $($env:RENDER_API_KEY)"; "Content-Type" = "application/json" }

# Prepare payload (this is a minimal example; adjust region/plan as needed)
$payload = @{
  service = @{
    name = $ServiceName
    env = "node"
    plan = "starter" # change if needed
    repo = $RepoFullName
    branch = $Branch
    buildCommand = "npm ci && npm run build"
    startCommand = "NODE_ENV=production node server.cjs"
  }
} | ConvertTo-Json -Depth 10

Write-Host "Creating Render service (note: Render API sometimes requires more fields depending on account)."

$createUrl = "https://api.render.com/v1/services"
try {
  $resp = Invoke-RestMethod -Uri $createUrl -Method Post -Headers $headers -Body $payload
  Write-Host "Render service created: $($resp.serviceDetails.url)"
  Write-Host $resp | ConvertTo-Json -Depth 5
} catch {
  Write-Error "Render service creation failed: $($_.Exception.Message)"
  Write-Host $_.Exception.Response.Content.ReadAsStringAsync().Result
}

Write-Host "If Render API fails due to missing fields, use the Render UI to connect GitHub and create a Web Service with the repo and start/build commands."