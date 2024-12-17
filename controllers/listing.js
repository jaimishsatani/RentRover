const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const Map_Token = process.env.MAPBOX_API_KEY;
const geocodingClient = mbxGeocoding({ accessToken: Map_Token });

module.exports.index = async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings})
}

module.exports.newListing = (req,res)=>{
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req,res)=>{
    let { id } = req.params;
    const listing =  await Listing.findById(id).populate({path : "reviews",populate :{
      path : "author"
    }}).populate("owner");
    res.render("listings/show.ejs",{listing});
}

module.exports.createListing = async (req,res,next)=>{ 
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
        .send();

    let url =  req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; 
    newListing.image = { url, filename };
    newListing.geometry = response.body.features[0].geometry;
    newListing.save();
    req.flash("success","New Listing Created successfully");
    res.redirect("/listings");      
}

module.exports.EditLisitng = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    OriginalImageurl = listing.image.url;
    OriginalImageurl = OriginalImageurl.replace("/upload","/upload/w_250");
    res.render('listings/edit.ejs',{listing}); 
}

module.exports.updateListing = async(req,res)=>{    
    let {id} = req.params;
   let listing  =  await  Listing.findByIdAndUpdate(id,{...req.body.listing});

   if(typeof req.file != "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };

   await listing.save();
   }
   req.flash("success","Listing updated!");
   res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");
    res.redirect('/listings');
}

