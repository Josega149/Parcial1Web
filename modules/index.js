"use strict";

var express = require('express');
const path = require('path');
const flickr = require("flickrapi");

var flickrManager = require('./flickrManager.js');

var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.json());

router.use(bodyParser.urlencoded({
    extended: true
}));

/* GET home page. */
router.get('/', function(req, res, next) {
	res.send('Web Dev  Parcial 1 Jose Tamura');
	res.close();
});



//metodo de john
router.get('/flickr/:query', function (req, res) {
	console.log("Flickr call query=" + req.params['query'] );
	flickrManager.getApiKeys((api_key, api_secret) => {
		const Flickr = require("flickrapi"),
	    flickrOptions = {
	      api_key: api_key,
	      secret: api_secret
	    };
	    console.log(api_key);
	    console.log(api_secret);
		flickr.tokenOnly(flickrOptions, function(error, flickr) {
			console.log("tokenOnly");
			if (error) {
				res.send(error);
				return;
			}
		  // we can now use "flickr" as our API object,
		  // but we can only call public methods and access public data
		  flickr.photos.search({
		  	safe:1,
		  	sort:"relevance",
		  	text:req.params["query"]
		  }, (err, data) => {
		  	if (err) res.send(err);
		  	console.log("Got flickr data sending it");
		  	res.send(data);
		  });
		});

	}
	, 
	(err) => {
		console.log(err);
		res.send("Error!");
	})
});



router.get('/flickr/url/:term', function(req,res,next){
	flickrManager.seachImageUrl(req.params['term'], function(results){
		res.json(results);
	});
});


module.exports = router;
