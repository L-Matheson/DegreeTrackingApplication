# Degree Tracking - Backend

### Contributors
  * Lucas
  * John
  * Ben

# Description
This backend is constructed through the Django framework and will host the data around which the degree tracking application will be built. 

This capstone project aims to develop a better environment for students to track their degree progression as they progress through their college careers. Currently, the process
is more tedious than it needs to be and often leaves students unsure if they are on the right track to meet their goals. This API looks to fix these issues by presenting a user-friendly 
experience to easily display all of a student's required classes in one location. This API will be fully customizable so it can be modified depending on a student's graduation or education 
goals. 

Some of the expected key features of this API are
  * See what classes to take each semester to reach graduation by a student-selected year
  * Allow for these classes to be changed and have the API adapt to the change to still display a timeline properly
  * Display an overview of all required classes, including core and degree-specific
  * TBD

# Installation
# Step 1 - Baseline

To download and run the Degree Tracking API on your computer, there are baseline steps that first must be addressed before continuing. 

### 1. Download Docker Desktop

The download file for Docker is found here. https://www.docker.com/get-started/.   After installation, it will ask you to restart your computer. Once reloaded a command prompt will display asking you to click any key to install Linux. Press any key in that command prompt to install a sub-system of Linux. Once installed it is best advised to restart your computer again to ensure everything is running properly. Afterwards, Docker will give you an error when it loads. This is because virtualization is disabled. This will be fixed in the next step. If the error doesn't show and the Docker engine begins to run then you may skip the part 2. 

Docker will allow data storage, testing, and building while developing an application. It acts as a local backend, allowing routes to call the data stored inside Docker containers. 
More documentation about installation and other tips on how to use Docker effectively can also be found on their website. 

### 2. Enable virtualization in BIOS

This step can vary based on your computer and its components. Be sure to look up how to enable virtualization in BIOS for your selective CPU, Brand, and OS. I will provide a general guide to enable it.  

Typically, upon computer start-up (after a full shutdown) clicking either f2, f4, or delete will open the BIOS settings
Once the BIOS settings are opened, navigate to the advanced section. Once here, look for virtualization and change disabled to enabled. This will allow for a VM of Linux to run through Docker. 

### 3. Download Node.js

Node.js is a runtime environment that allows for JavaScript to be run through the terminal. This is essential for running automation commands such as npm install. This install and more information can be found here. https://nodejs.org/en/download

You can install it either through the terminal or through the Windows installer. (I prefer the Windows installer, but the choice is yours!)

## Step 2 - Clone the repo

Depending on how you use GitHub, this step's process can vary. In this step, I will explain how to do it using Git inside of VsCode. 
Git can be downloaded and used inside of VsCode. It allows for a great way to easily push and pull changes, along with track push history. 

### 1. Select a destination to host the GitHub Repository

This choice is up to you. Personally, I use my desktop to host my repos but this choice is up to you.

Inside of VsCode, open a new terminal. Once here, `cd` into the folder/location you want the repo to be. Once cloned, it will create a folder titled DegreeTrackingApplication

### 2. Get the http URL from GitHub, run git clone

The URL is found below. It can be found under the code dropdown (green button), found on the code page.
Once copied, back into the terminal that you opened previously. Ensure your copying the repo into the correct path. 

Afterwards, run `git clone https://github.com/L-Matheson/DegreeTrackingApplication.git`

This will copy the repo into the selected location. Once done, a folder titled DegreeTrackingApplication should appear.

# Step 3 - Final Installs

### 1. `npm install`

This command looks inside the package.json file and downloads all packages this file specifies. 
`npm install` needs to be ran twice. Inside the terminal, run `npm install` inside the main folder, (Inside of YourPathHere\DegreeTrackingApplication). Warnings will be printed, but this is normal. (This is to be fixed) Once installed, there will be some vulnerabilities that will be displayed, but this is alright. If there are more than fifty, then run `npm audit fix --force`.

After this install, `cd` into the frontend folder and run `npm install` again. (The path should be YourPathHere\DegreeTrackingApplication\frontend) 
after install if there are more than fifty vulnerabilities, run `npm audit fix --force`

### 2. `pip install -r requirements.txt`

Lastly, backtrack into (YourPathHere\DegreeTrackingApplication). Here, run `pip install -r requirements.txt`. This takes specified library's from requirements.txt and automatically downloads them. 

Now the API should be fully installed. to better understand how to use the API, see usage guide



# Usage
Currently, the API has three routes. Each displaying a simple GET, POST, and DELETE from a simple test table. 

# Roadmap

* Import Django and get the necessary files imported and ready to use
* Create docker containers and images through the Django framework
* Publish the first working version 
* Create table frameworks to outline data structures needed for the application
* Brainstorm UI format, divide tasks
  
# Project status
The API is now functioning through React, Django, and docker. Currently, the API only displays a test format using three routes. These being a GET, POST, and DELETE.

# Questions
  Any questions can be submitted directly to Lucas at 22lucasmatheson@gmail.com

