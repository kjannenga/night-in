var form = document.getElementById('generate')
var baseMovie = "https://image.tmdb.org/t/p/w500"


function fadeIn() {
    var str = document.getElementById('results').className;
    var n = str.search(" animated fadeIn");

    if (n = -1) {
        document.getElementById('results').className += " animated fadeIn"
    }
}


form.addEventListener('submit', function (e) {
    e.preventDefault();

    fadeIn()
    document.getElementById('movieResults').innerHTML = "";
    document.getElementById('movieResults').className = "col-4"
    document.getElementById('foodResults').innerHTML = "";
    document.getElementById('foodResults').className = "col-4"

    var location = document.getElementById("locationInput").value
    var genre = document.getElementById("mySelect").value

    var movies 
    var foods 




    function getFood(url) {
        return new Promise((resolve, reject) => {
            var token = 'Bearer VYWcRTxE1J38j3r60_bUqYDsWkNhB975SyQqp2d66dtFjLDDQoDz9kMwIl1T3pbCs41p1rvWg78iiGC05p-za9Y99SebaLpI-cdqWaEngkcVa0n08thB6jPp3UHkXHYx';
            fetch(url, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        Authorization: token
                    }
                })
                .then(res => {
                    if (!res.ok) {
                        if (res.status == 404) {
                            throw new Error("food not found")
                        }
                    }
                    return res.json()
                })
                .then(json => {
                    resolve(json)
                })
                .catch(err => {
                    reject(err)
                    console.log(err)
                })
        })
    }


    getFood(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/transactions/delivery/search?location=${location}`)
        .then(food => {
            foods = food.businesses
            random = getRandom(foods)
            makeFood(random)
        })
        .catch(err => {
            console.log(err)
        })

    function getMovie(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(res => {
                    if (!res.ok) {
                        if (res.status == 404) {
                            throw new Error("movie not found")
                        }
                    }
                    return res.json()
                })
                .then(json => {
                    resolve(json)
                })
                .catch(err => {
                    reject(err)
                    console.log(err)
                })
        })
    }


    getMovie('https://api.themoviedb.org/3/discover/movie?api_key=01e8b98193258bbbb0787d70c5100f4a&language=en-US&region=US&sort_by=popularity.desc&page=1&with_genres=' + genre)
        .then(movie => {
             movies = movie.results
             random = getRandom(movies)
             makeMovie(random)
        })
        .catch(err => {
            console.log(err)
        })


    function getRandom(random) {
        console.log(random.length)
       var item = random[Math.floor(Math.random() * random.length)]
       return item
    }


    function makeFood(random) {
        console.log(random)
        var d = document.getElementById('foodResults')
        var img = document.createElement('img')
        var p = document.createElement('h5')
        var r = document.createElement('p')
        var o = document.createElement('p')
        var t = document.createElement('p')
        var b = document.createElement('button')
        d.className += " card p-2 m-5 animated fadeInUp bg-light shadow delay-1s"
        b.className = "btn mt-auto bg-primary p-2 text-center text-light "
        b.setAttribute("id", "redoFood");
        b.innerHTML = "Try Again"

        img.setAttribute("src", random.image_url)
        img.setAttribute("id", "foodImg")
        img.className = "card-img-top pb-2"
        p.innerHTML = random.name
        p.setAttribute("id", "foodName");
        r.innerHTML = "Score: " + random.rating + " /5"
        r.setAttribute("id", "foodRating");
        o.innerHTML = "Type: " + random.categories[0].title
        o.setAttribute("id", "foodCategory");
        t.innerHTML = "Phone: " + random.display_phone
        t.setAttribute("id", "foodNumber");
        d.append(img)
        d.append(p)
        d.append(r)
        d.append(o)
        d.append(t)
        d.append(b)

        document.getElementById("redoFood").addEventListener('click', function () {
                something = getRandom(foods)

                document.getElementById('foodImg').setAttribute("src", something.image_url)
                document.getElementById('foodName').innerHTML = something.name
                document.getElementById('foodRating').innerHTML = "Score: " + something.rating + " /5"
                document.getElementById('foodCategory').innerHTML = "Type: " + something.categories[0].title
                document.getElementById('foodNumber').innerHTML = "Phone: " + something.display_phone
            })
    }

    function makeMovie(random) {
        console.log(random)
        var d = document.getElementById('movieResults')
        var img = document.createElement('img')
        var p = document.createElement('h5')
        var r = document.createElement('p')
        var o = document.createElement('p')
        var b = document.createElement('button')
        d.className += " card p-2 m-5 animated fadeInUp bg-light shadow delay-2s"
        b.className = "btn mt-auto bg-primary p-2 text-center text-light"
        b.setAttribute("id", "redoMovie");
        b.innerHTML = "Try Again"

        img.setAttribute("src", baseMovie + random.backdrop_path)
        img.setAttribute("id", "movieImg")
        img.className = "card-img-top pb-2"
        p.innerHTML = random.original_title
        p.setAttribute("id", "movieTitle");
        r.innerHTML = "Score: " + random.vote_average + " /10"
        r.setAttribute("id", "movieScore");
        o.innerHTML = "Overview: " + random.overview
        o.setAttribute("id", "movieOver");
        d.append(img)
        d.append(p)
        d.append(r)
        d.append(o)
        d.append(b)


        document.getElementById("redoMovie").addEventListener('click', function () {
                something = getRandom(movies)
            
                document.getElementById('movieImg').setAttribute("src", baseMovie + something.backdrop_path)
                p.innerHTML = something.original_title
                r.innerHTML = "Score: " + something.vote_average + " /10"
                o.innerHTML = "Overview: " + something.overview
            })
    }
})