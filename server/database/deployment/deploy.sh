GOOGLE_PROJECT_ID=docsaddonproject
CLOUD_RUN_SERVICE=docsaddonproject
GOOGLE_APPLICATION_CREDENTIALS=C:\\Users\\linda\\Documents\\University\\GitHub\\DocsAddOnProject\\server\\database\\key.json
INSTANCE_CONNECTION_NAME=docsaddonproject:us-central1:doc-add-on
DB_USER=root
DB_PASS=test1234
DB_NAME=sighted-side-db
REGION=us-central1

gcloud builds submit --tag gcr.io/$GOOGLE_PROJECT_ID/poll --project $GOOGLE_PROJECT_ID

gcloud run deploy poll --image gcr.io/$GOOGLE_PROJECT_ID/poll \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --add-cloudsql-instances $INSTANCE_CONNECTION_NAME \
    --project $GOOGLE_PROJECT_ID

