# CollabConnect
A Google Docs compatible extension that uses information provided by the sighted collaborators in a mixed-ability group.

## Deployment Instructions 
- img architecture
### 1. CollabConnect Side A - Google Docs Add-on
Server
1. gcloud builds submit --tag gcr.io/docsaddonproject/add-on-image
2. gcloud run deploy docsaddonproject-service --image gcr.io/docsaddonproject/add-on-image

### 2. CollabConnect Side B - Google Chrome Extension
The. 
