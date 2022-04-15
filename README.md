# Phase 1 Project - Ecommerce Makeup Store

## Overview
Design a single page application using HTML/CSS/JS. 

Communicate with a public API. The following link is the source of the API used: https://makeup-api.herokuapp.com/

Incorporate at least 3 separate event listeners. This project includes DOMContentLoaded, clicks and submit.

Interactivity in this application includes clicking on buttons, navigating through different tabs and clicking on one product to retrieve more information.  

## Installation
JSON Server was used in this application. The data from the public API was filtered by makeup brand and stored in the db.json file. If you do not already have json server installed, run 

```console
$ npm install -g json-server
```

Then run the server:

```console
$ json-server --watch db.json
```

The data will be setup on the server at http://localhost:3000/products. 

To view the each product by category it can be accessed like so: 

 http://localhost:3000/faces

 http://localhost:3000/eyes
 
 http://localhost:3000/lips 

## Contributing
Pull requests are welcome. For any major changes, please feel free to reach out to discuss the changes. 