const Campground = require("./models/campground");
const Comment = require("./models/comment");

const seeds = [
    {
        name: "Captain's Arm",
        image: "http://aeroteardrops.com/wp-content/uploads/2017/06/crater-lake-camping-.jpg",
        description: "Granite Hill is located just outside of historic Gettysburg and offers full amenities in the bright sunshine and forested seclusion in the tall trees, which are equally accessible within our scenic 150-acre Civil War era farm."
    },
    {
        name: "The Chief's Beach",
        image: "http://media.dreamplango.com/resources/dpg/Feature/98bf2b45-8af1-43e3-bc75-e465a240e52c.jpg",
        description: "Granite Hill is located just outside of historic Gettysburg and offers full amenities in the bright sunshine and forested seclusion in the tall trees, which are equally accessible within our scenic 150-acre Civil War era farm."
    },
    {
        name: "Bell Island",
        image: "https://i.imgur.com/v4BwkNH.jpg",
        description: "Granite Hill is located just outside of historic Gettysburg and offers full amenities in the bright sunshine and forested seclusion in the tall trees, which are equally accessible within our scenic 150-acre Civil War era farm."
    },
    {
        name:"Granite Hill",
        image: "https://www.popsci.com/resizer/mtvL9pPl-mE4_Pp4ApNIFaqF0TM=/937x625/filters:focal(469x313:470x314)/arc-anglerfish-arc2-prod-bonnier.s3.amazonaws.com/public/75WG4XHE6EZXASGFOSF7UM2BHA.gif",
        description: "Granite Hill is located just outside of historic Gettysburg and offers full amenities in the bright sunshine and forested seclusion in the tall trees, which are equally accessible within our scenic 150-acre Civil War era farm."
    }
];

function seedBD() {
    Campground.remove({}, (err) => {
        if (err) {
            console.log(err);
        } else {
			console.log("all campgrounds removed!");
            // seeds.forEach((seed) => {
            //     Campground.create(seed, (err, campground) => {
            //         if (err) {
            //             console.log(err);
            //         } else {
            //             console.log("campground created");
            //             Comment.create({
            //                 text: "I wish there was internet",
            //                 author: "Jenny"
            //             }, (err, comment) => {
            //                 if (err) {
            //                     console.log(err);
            //                 } else {
            //                     console.log("comment created");
            //                     campground.comments.push(comment);
            //                     campground.save();
            //                 }
            //             });
            //         }
            //     });
            // });
        }
    });
}

module.exports = seedBD;