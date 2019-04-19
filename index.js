const rp = require("request-promise");
const $ = require("cheerio");
const baseUrl = "https://www.chileautos.cl";
const url = baseUrl + "/veh%C3%ADculos/autos";

rp(url)
  .then(function(html) {
    listItem = "div.listing-item";
    listTitle = "div.listing-item__header--mobile h2.listing-item__title";
    listingPrice = "div.listing-item__price > p";
    listingUrl = "div.listing-item__header > a";
    listingMileage = "ul.key-features__list li";

    let listing = $(listItem, html);
    listing.each((index, element) => {
      rp(baseUrl + $(listingUrl, element).attr("href")).then(htmlDetail => {
        let carData = {
          name: $("h1.page-header", htmlDetail).text(),
          price: $(listingPrice, element).text(),
          url: $(listingUrl, element).attr("href"),
          mileage: $(listingMileage, htmlDetail)
            .first()
            .text(),
          transmission: "",
          location: "RM"
        };
        console.log(carData);
      });
    });
  })
  .catch(function(err) {
    //handle error
  });
