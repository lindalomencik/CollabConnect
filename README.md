# CollabConnect
A Google Docs compatible extension that uses information provided by the sighted collaborators in a mixed-ability group.
![alt text](https://github.com/lindalomencik/CollabConnect/blob/main/images/Extension_Logo.svg "Project Logo")
## Deployment Instructions 
From a technical perspective, CollabConnect has four main parts; the google docs add-on, the chrome
extension, the backend that makes API calls to the database, and the database itself. Figure below shows
how all four components are connected.
![alt text](https://github.com/lindalomencik/CollabConnect/blob/main/images/architecture1.png "Architecture Diagram")

### 1. CollabConnect Side A - Google Docs Add-on
Following are the instruction to make the database and the cloudrun that is connected to a docker image uploaded to the repository. 

First commnad upload that image to the GCP reposotory. The second commnad deploys a google run service that runs the code from the image.
1. gcloud builds submit --tag gcr.io/docsaddonproject/add-on-image
2. gcloud run deploy docsaddonproject-service --image gcr.io/docsaddonproject/add-on-image

The cloud run has to be connected to a SQL Instance. First, create a MySQL Cloud SQL instance on GCP. Once done, you have to create the database and the tables. All necessary command are in "db.txt". To connect the database instance to the cloud run service, create a new deployment of the cloud run and choose to "connect to a Cloud SQL Instance". You also have to add the appropriate environment variables.

![alt text](https://github.com/lindalomencik/CollabConnect/blob/main/images/env_variables.png "Environment Variables")

Change the URL address in the dbConnection scripts. It will be the URL address of the Cloud Run you deployed.


### 2. CollabConnect Side B - Google Chrome Extension
Install the following chrome extension:
https://chrome.google.com/webstore/detail/collabconnect/hahbhgbihpedbknldpiombgemcgfojko
