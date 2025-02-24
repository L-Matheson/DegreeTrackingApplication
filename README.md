# Degree Tracking - Backend

### Contributors
  * Lucas
  * John
  * Ben

# Description
This backend is constructed through the Django framework and will host the data around which the degree tracking application will be built.

For help installing the API, see https://github.com/L-Matheson/DegreeTrackingApplication/wiki/Installation

This capstone project aims to develop a better environment for students to track their degree progression as they progress through their college careers. Currently, the process
is more tedious than it needs to be and often leaves students unsure if they are on the right track to meet their goals. This API looks to fix these issues by presenting a user-friendly 
experience to easily display all of a student's required classes in one location. This API will be fully customizable so it can be modified depending on a student's graduation or education 
goals. 

Some of the expected key features of this API are
  * See what classes to take each semester to reach graduation by a student-selected year
  * Allow for these classes to be changed and have the API adapt to the change to still display a timeline properly
  * Display an overview of all required classes, including core and degree-specific
  * TBD


# Use
As mentioned, this API runs on a Django framework. This utilizes the REST framework which allows the API to use routes such as GET, POST, PATCH, and DELETE. The directory is set up so the backend is all 
stored inside the api folder, with the frontend stored inside of frontend. There are some files outside of these folders. Their purpose is to build the docker containers and volumes, along with other 
nessacery Django settings. 

To better understand how to use the API after installation, please refer to the wiki at https://github.com/L-Matheson/DegreeTrackingApplication/wiki/Degree-Tracking-Usage

# Roadmap

* Import Django and get the necessary files imported and ready to use
* Create docker containers and images through the Django framework
* Publish the first working version 
* Create table frameworks to outline data structures needed for the application
* Create Dashboard, coures, and other related pages
* Get neccessary data from USM about courses

# Questions
  Any questions can be submitted directly to Lucas at 22lucasmatheson@gmail.com

