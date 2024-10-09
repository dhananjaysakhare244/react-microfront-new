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
