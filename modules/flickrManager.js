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



function searchImageByTerm(term , callback)
{
	Flickr.tokenOnly(flickrOptions, function(error, flickr) {
		console.log("tokenOnly");
		if (error) {
			console.log(error);
			callback("ERROR");
			return;
		}
		flickr.photos.search({
			api_key:flickrConfig.api_key,
			text:term,
			page:1,
			per_page:10

		}, callback);
	});
}


function seachImageUrl(term , callback)
{
	getApiKeys((api_key, api_secret) => {
		const Flickr = require("flickrapi"),
	    flickrOptions = {
	      api_key: api_key,
	      secret: api_secret
	    };
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
			  	text:term,
			  	per_page:20

			}, function(err,results){
			if(err)
			{
				console.log(error);
				callback("ERROR");
				return;
			}
			var url=[];
			for(var i=0; i< results.photos.photo.length;i++)
			{
				var fotoActual = results.photos.photo[i];
				var urlActual = "https://farm"+fotoActual.farm
				+".staticflickr.com/"+fotoActual.server
				+"/"+fotoActual.id+"_"+fotoActual.secret+".jpg";
				url.push(urlActual);
			}
			callback(url);
			});
		});
	}, 
	(err) => {
		console.log(err);
		res.send("Error!");
	});
}




module.exports = {
  getApiKeys : getApiKeys,
  searchImageByTerm:searchImageByTerm,
  seachImageUrl:seachImageUrl
};