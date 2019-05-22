var form = document.getElementById('generate')
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
             random = getRandom(food.businesses)
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
             random = getRandom(movie.results)
             makeMovie(random)

         })
         .catch(err => {
             console.log(err)
         })


     function getRandom(random) {
         console.log(random.length)
         min = Math.ceil(0);
         max = Math.floor(random.length);
         num = Math.floor(Math.random() * max);
         return (random[num])
     }


     function makeFood(random) {
         console.log(random)
         var d = document.getElementById('foodResults')
         var p = document.createElement('h5')
         var r = document.createElement('p')
         var o = document.createElement('p')
         var t = document.createElement('p')
         var b = document.createElement('button')
         d.className += " card p-2 m-5 animated fadeInUp bg-light shadow delay-1s"
         b.className = "mt-auto bg-primary p-2 text-center"
         b.setAttribute("id", "redoFood");
         b.innerHTML = "Try Again"

         p.innerHTML = random.name
         p.setAttribute("id", "foodName");
         r.innerHTML = "Score: " + random.rating
         r.setAttribute("id", "foodRating");
         o.innerHTML = "Type: " + random.categories[0].title
         o.setAttribute("id", "foodCategory");
         t.innerHTML = "Phone: " + random.display_phone
         t.setAttribute("id", "foodNumber");
         d.append(p)
         d.append(r)
         d.append(o)
         d.append(t)
         d.append(b)

         
        document.getElementById("redoFood").addEventListener('click', function () {
            getFood(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/transactions/delivery/search?location=${location}`)
                .then(food => {
                    random = getRandom(food.businesses)
                    
                })
                .catch(err => {
                    console.log(err)
                })

            document.getElementById('foodName').innerHTML = random.name
            document.getElementById('foodRating').innerHTML = "Score: " + random.rating
            document.getElementById('foodCategory').innerHTML = "Type: " + random.categories[0].title
            document.getElementById('foodNumber').innerHTML = "Phone: " + random.display_phone
                 
        }

    )}

     function makeMovie(random) {
         console.log(random)
         var d = document.getElementById('movieResults')
         var p = document.createElement('h5')
         var r = document.createElement('p')
         var o = document.createElement('p')
         var b = document.createElement('button')
         d.className += " card p-2 m-5 animated fadeInUp bg-light shadow delay-2s"
         b.className = "mt-auto bg-primary p-2 text-center"
         b.setAttribute("id", "redoMovie");
         b.innerHTML = "Try Again"
         
         p.innerHTML = random.original_title
         p.setAttribute("id", "movieTitle");
         r.innerHTML = "Score: " + random.vote_average
         r.setAttribute("id", "movieScore");
         o.innerHTML = "Overview: " + random.overview
         o.setAttribute("id", "movieOver");
         d.append(p)
         d.append(r)
         d.append(o)
         d.append(b)


         document.getElementById("redoMovie").addEventListener('click', function () {
                getMovie('https://api.themoviedb.org/3/discover/movie?api_key=01e8b98193258bbbb0787d70c5100f4a&language=en-US&region=US&sort_by=popularity.desc&page=1&with_genres=' + genre)
                    .then(movie => {
                        random = getRandom(movie.results)
                    })
                    .catch(err => {
                        console.log(err)
                    })

                 document.getElementById('movieTitle').innerHTML = random.original_title
                 document.getElementById('movieScore').innerHTML = "Score: " + random.vote_average
                 document.getElementById('movieOver').innerHTML = "Overview: " + random.overview
                 
        }

    )}
})






