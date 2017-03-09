"use strict";

const path = require('path');
const fs = require("fs");


	    
function getApiKeys(callback, errorcallback) {
	fs.readFile(path.resolve(__dirname,"./APIFlikr/api_key.txt"), "utf-8", (err, api_key) => {
		if (err) {
			errorcallback(err);
			return;
		}
		fs.readFile(path.resolve(__dirname,"./APIFlikr/api_secret.txt"), "utf-8",(err, api_secret) => {
			if (err) {
				errorcallback(err);
				return;
			}
			callback(api_key, api_secret);
		});
	});
}
getApiKeys(//lo llama para verificar que funciona
	(api_key, api_secret)=>{
		console.log(api_key +"    "+ api_secret);

	} 
	, 
	(err) => {
		console.log(err);
	}
);


function seachImageUrl(term ,color, callback)
{
	getApiKeys((api_key, api_secret) => {
		const Flickr = require("flickrapi"),
	    flickrOptions = {
	      api_key: api_key,
	      secret: api_secret
	    };
	    console.log("LLega aquiiiiiii");
		Flickr.tokenOnly(flickrOptions, function(error, flickr) {
			console.log("tokenOnly");
			if (error) {
				console.log(error);
				callback("ERROR");
				return;
			}
			flickr.photos.search({
			  	safe:1,
			  	sort:"relevance",
			  	text:(term+" "+color),
			  	per_page:10

			}
			, 
			function(err,results){
			if(err)
			{
				console.log(error);
				callback("ERROR");
				return;
			}
			//mando las url de una vez para no mandar alto trafico por la red
			var url=[];
			for(var i=0; i< results.photos.photo.length;i++)
			{
				var fotoActual = results.photos.photo[i];
				var urlActual = "https://farm"+fotoActual.farm+".staticflickr.com/"+fotoActual.server
				+"/"+fotoActual.id+"_"+fotoActual.secret+"_s.jpg";

				//va guardando cada url en esta lista
				url.push(urlActual);
			}
			callback(url);
			});
		});
	}, 
	(err) => {
		console.log(err);
		console.log(" ERROOOOOOOOOOOOOR  PORQUEEE ");
		res.send("Error!");
	});
}




module.exports = {
  getApiKeys : getApiKeys,
  seachImageUrl:seachImageUrl
};