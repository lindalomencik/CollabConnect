# DocsAddOnProject

## Deployment Instructions 
### Server
1. gcloud builds submit --tag gcr.io/collabconnect/collab-connect-image
2. gcloud run deploy collab-connect-service --image gcr.io/collabconnect/collab-connect-image
