# DocsAddOnProject

## Deployment Instructions 
### Server
1. gcloud builds submit --tag gcr.io/docsaddonproject/add-on-image
2. gcloud run deploy docsaddonproject-service --image gcr.io/docsaddonproject/add-on-image