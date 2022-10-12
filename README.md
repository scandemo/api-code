Create Project folder on your local filesystem for the Download API

Inside of this project folder name, create another folder called dev

While inside your root project folder, create a Dockerfile

Copy and past the below contents into your Dockerfile:


    FROM node:15.11.0-alpine3.10

    #Install GIT
    RUN apk update
    RUN apk add git


    #Creates a folder in the container
    RUN mkdir -p /usr/msdev

    #Sets working directory
    WORKDIR /usr/msdev/


-Assuming you are using VSCode:

Open terminal into project root folder (where your Dockerfile is located)

Run the below command:

    docker build -t ms:dev .

Once that finishes, run **one** of the following commands (the second uses longer cronjob intervals):

`docker run --name=cronJob -v ${PWD}/dev:/usr/msdev -p 8095:8095 -e SECONDARYSCHEDINT="* * * * *" -e UPDATEPRIMARYINT="*/2 * * * *" -e CHECKPRIMARYINT="*/3 * * * *" -e MS_PORT=8095 -e DL_API_URL=http://host.docker.internal:8082 -d ms:dev tail -f /dev/null`

`docker run --name=cronJob -v ${PWD}/dev:/usr/msdev -p 8095:8095 -e SECONDARYSCHEDINT="*/10 * * * *" -e UPDATEPRIMARYINT="*/30 * * * *" -e CHECKPRIMARYINT="5 * * * *" -e MS_PORT=8095 -e DL_API_URL=http://host.docker.internal:8082 -d ms:dev tail -f /dev/null`  

&nbsp;  
Inside the container, you will need to run the below commands:

    cd..
    git clone https://<user name>:<access token>@gitlab.sif.saicdevops.com/afms3-appecosystem/API.git msdev

After the application has cloned to the appropriate directory, while still inside the contianer run the following commands:

    cd msdev
    npm install

Once installations have complete, inside the container run the following command to start the API:

    npx nodemon -L  msdev

MicroService/cron-job should now be running at the specified port in the docker run command.  

Ideally you would finish setting up the MicroService after importing your dummy data into the Primary MongoDB, but before setting up the UI. When the cron-job initially runs it will automatically import ALL data from the Primary into the Secondary.  

Refer to the [UI's README](https://gitlab.sif.saicdevops.com/afms3-appecosystem/dashboard-ui/-/blob/aws-demo/README.md) to import data into MongoDB.  # api-code
