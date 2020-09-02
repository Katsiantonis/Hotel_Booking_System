$(document).ready(function () {







    var hotels = [];
    var filteredHotels = [];

    class Hotel {
        constructor(hotelName, rating, city, thumbnail, guestrating, ratingsNo, ratingText, mapurl, filters, price) {
            this.hotelName = hotelName;
            this.rating = rating;
            this.city = city;
            this.thumbnail = thumbnail;
            this.guestrating = guestrating;
            this.ratingsNo = ratingsNo;
            this.ratingsText = ratingText;
            this.mapurl = mapurl;
            this.filters = filters;
            this.price = price;

        }
    }




    LoadData();


    function LoadData() {
        $.ajax({
            type: "GET",
            url: "data/data.json",
            dataType: "json",
            success: function (response) {

                Application(response);
            }
        });
    }



    function Application(data) {

        db = data;

        var showprice = $("#showprice");
        $("#price").change(function (e) {
            e.preventDefault();
            showprice.text($("#price").val());
        });

        $("#searchBtn").click(function (e) {
            e.preventDefault();
            Manager();
        });

        $("#hotelName").keyup(function (e) {
            Manager();
        });

        function Manager() {
            var name = $("#hotelName").val();
            var price = $("#price").val();
            filterHotels(name, price);
            AppendHotels();
        }

        function AppendHotels() {
            ClearMonitor();
            filteredHotels.forEach(DisplayHotel);
        }




        function filterHotels(name, price) {
            filteredHotels = hotels;

            if (name) {
                filteredHotels = filteredHotels.filter(x => x.hotelName.includes(name));
            }
            if (price) {
                filteredHotels = filteredHotels.filter(x => x.price < price);
            }
        }


        ClearMonitor();
        function ClearMonitor() {
            var monitor = document.getElementById("monitor");
            monitor.innerHTML = "";
        }

        for (var i of db[1].entries) {
            console.log(i);
            var hotel = new Hotel(i.hotelName, i.rating, i.city, i.thumbnail, i.guestrating, i.ratings.no, i.ratings.text, i.mapurl, i.filters, i.price);
            hotels.push(hotel);

        }

        hotels.forEach(DisplayHotel);


        function DisplayHotel(hotel) {
            var monitor = document.getElementById("monitor");

            var text = `<div class="hotel-card">
                <div class="photo" style="background:url(${hotel.thumbnail}); background-position:center" ; >

                    <i class="fa fa-heart"></i>
                <span>1/30</span>
            </div>
                <div class="details">
                    <div class="rating">
                        <h3>${hotel.hotelName}</h3>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                        <span class="fa fa-star"></span>
                    </div>



                    <div class="location">
                        ${hotel.city}, 0.2 miles to ....
                    </div>

                    <div class="reviews">
                        <span class="total">${hotel.ratingsNo}</span>
                        <b>${hotel.ratingsText}</b>
                        <small>(1736 reviews)</small>
                    </div>

                    <div class="location-reviews">
                        Excellent location <small>(9.2/10)</small>
                    </div>
                </div>
                <div class="third-party-prices">
                    <div class="sites-and-prices">
                        <div class="highligted">
                            Hotel website
                            <strong>$706</strong>
                        </div>
                        <div>
                            Agoda
                            <strong>$575</strong>
                        </div>
                        <div>
                            Travelocity
                            <strong>$708</strong>
                        </div>

                    </div>
                    <div class="more-deals">

                        <strong>More deals from</strong>
                        <strong>$575</strong>
                    </div>
                </div>

                <div class="call-to-action">
                    <div class="price">
                        <div class="before-discount">
                            HotelPower.com
                            <strong><s>$1,568</s></strong>
                        </div>
                        <div class="after-discount">
                            Travelocity
                            <strong>$ ${hotel.price}</strong>
                            <div class="total">
                                3 nights for <strong>$3,638</strong>
                            </div>
                            <div class="usp">
                                <span>Free Breakfast</span>
                            </div>
                            <div class="button">
                                <a href="#">View Deal</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >`
            monitor.innerHTML += text;

        }




    };





});


