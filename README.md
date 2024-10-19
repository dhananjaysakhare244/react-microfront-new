# react-microfront-new

name: is name for yaml
on: is when changes are pushed to particular branch the job will be triggered
path is a relative path on which changes will be watched in our case we need to run on cintainer
defaults run will decide in which path all the commands like npm install etc should run

jobs is actual work that will happen
runs-on a specific os ubuntu or windows
steps are different steps that happen during build deploy such as checout code install dependency and build
uses will checkout code from repo
run will run commands
aws s3 sync will sync the dist directory created by npm run build

We need to add publicPath to tell webpack from where to load the scripts in s3
Cloud front cache invalidation is required. We need to create an invalidation

- run: aws cloudfront create-invalidation --distribution-id ${{ secrets.AWS_DISTRIBUTION_ID }} --paths "/container/latest/index.html"
  env:
  AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
  AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
  AWS_DEFAULT_REGION: us-east-2
