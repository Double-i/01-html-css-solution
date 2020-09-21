echo "Repository name: $GITHUB_REPOSITORY"
echo "Netlify token: $NETLIFY_AUTH_TOKEN"

SITE_NAME=$(echo $GITHUB_REPOSITORY | sed 's|\/|-|g')
echo "Deploying site $SITE_NAME to netlify"

netlify help
