var form = document.getElementById('generate')



form.addEventListener('submit', function (e) {
     e.preventDefault();

     document.getElementById('movieResults').innerHTML = "";
     document.getElementById('foodResults').innerHTML = "";
    

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


    function getRandom(random){
        console.log(random.length)
        min = Math.ceil(0);
        max = Math.floor(random.length);
        num = Math.floor(Math.random() * max);
        return (random[num])
    }





    function makeMovie(random){
        console.log(random)
        var d = document.getElementById('movieResults')
        var p = document.createElement('p')
        var r = document.createElement('p')
        var o = document.createElement('p')
        p.innerHTML = random.original_title
        r.innerHTML = "Score: " + random.vote_average
        o.innerHTML = "Overview: " + random.overview
        d.append(p)
        d.append(r)
        d.append(o)
    }


    function makeFood(random) {
        console.log(random)
        var d = document.getElementById('foodResults')
        var p = document.createElement('p')
        var r = document.createElement('p')
        var o = document.createElement('p')
        var t = document.createElement('p')
        p.innerHTML = random.name
        r.innerHTML = "Score: " + random.rating
        o.innerHTML = "Type: " + random.categories[0].title
        t.innerHTML = "Phone: " + random.display_phone
        d.append(p)
        d.append(r)
        d.append(o)
        d.append(t)
    }



})



