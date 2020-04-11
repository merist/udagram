## Udagram Image Filtering Microservice

[The Image Filtering Microservice](https://github.com/merist/udagram) is a Node-Express application which runs a simple script to process images.

### Setup Node Environment

You'll need to create a new node server. Open a new terminal within the project directory and run:

1. Initialize a new project: `npm i`
2. run the development server with `npm run dev`

### Call the endpoint to download an image from a public URL

You need to add the path **/filteredimage?image_url=url** in order to process the image in the specific **url**

### Deploying your system

To deploy the application using ElasticBeanstalk, first you need to initialize `eb init` a new application and `eb create` a new environment to deploy your image-filter service! Finally you can use `eb deploy` to push the changes in AWS Elastic Beanstalk service.
The current application is deployed in **http://udagram-meri.us-east-2.elasticbeanstalk.com/**.
