//Express app
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcrypt');
const Movies = require('./model/movie');
const Users = require('./model/user');
const Reports = require('./model/report');
const multer = require('multer');
const fs = require('fs-extra');
const notifier = require('node-notifier');
const { MongoClient } = require('mongodb');

const cookieParser = require('cookie-parser');
const { render } = require('ejs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = "./Movie/" + req.body.name_vn + "/"
        fs.mkdirsSync(path);
        cb(null, path)
    },
    filename: (req, file, cb) => {
        console.log(file)
        if(file.fieldname === "pic_ngang") 
            cb(null, "ngang.jpg")
        if(file.fieldname === "pic_doc") 
            cb(null, "doc.jpg")
        if(file.fieldname === "vid") 
            cb(null, "vid.mp4")
        if(file.fieldname === "trailer") 
            cb(null, "trailer.mp4")
        if(file.fieldname === "actor_pic") 
            cb(null, file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8'))
    }
})
const upload = multer({storage: storage})

const file_field = [ 
    {name: "pic_ngang", maxCount: 1},
    {name: "pic_doc", maxCount: 1},
    {name: "trailer", maxCount: 1},
    {name: "vid", maxCount: 1},
    {name: "actor_pic", maxCount: 3},
]

// Connect to mongodb
// Only after connected to db, the server listen to requests
const dbUrl = "mongodb://localhost:27017/Website";
mongoose.connect(dbUrl)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));


app.set('view engine', 'ejs');
// Web assets
app.use("/css", express.static(__dirname + '/assets/css'));
app.use("/img", express.static(__dirname + '/assets/img'));
app.use("/fonts", express.static(__dirname + '/assets/fonts'));
app.use("/script", express.static(__dirname + '/script'));
app.use("/Video", express.static(__dirname + '/Video'));
app.use("/Movie", express.static(__dirname + '/Movie'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.post('/register', async (req, res) => {
    // Extract data from the request body
    const { account, email, password } = req.body;

    try {
        // Check if the email already exists in the database
        const existingEmail = await Users.findOne({ email: email });

        if (existingEmail) {
            // If email is already taken, send an error response
            return res.status(400).send('Email already exists');
        }

        // Hash the password before saving the user
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object with hashed password
        const newUser = new Users({
            username: account,
            email: email,
            password: hashedPassword,
            role: 'USER',
            name: 'LazyFilm User',
            gender: 'Ai bik',
            phone_num: 'Chưa cập nhật',
            birthdate: new Date(),
            // Add additional fields as needed (e.g., profilePicture, birthdate, gender)
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        // Set the 'loggedIn' cookie after successful registration

        res.cookie('userId', newUser._id.toString(), { secure: true });

        // Redirect the user to the home page upon successful registration
        
        res.redirect('/');
        // res.render('./WatchVideo/Watch', { loggedIn: true });
    } catch (error) {
        // Handle errors
        console.error('Error saving user:', error);
        // Optionally, redirect the user to an error page or send an error response
        res.status(500).send('Internal Server Error');
    }
});


// Login route handler
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await Users.findOne({ email: email });

        // If user doesn't exist, return an error
        if (!user) {
            return res.status(400).send('Email not found');
        }

        // Compare the plaintext password with the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If passwords don't match, return an error
        if (!passwordMatch) {
            return res.status(400).send('Incorrect password');
        }

        // Set the 'loggedIn' cookie after successful login

        res.cookie('userId', user._id.toString(), { secure: true });

        // Redirect the user to the home page upon successful login
        
        res.redirect('/');
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Routes
app.get('/', async (req, res) => {
    const loggedIn = !!req.cookies.userId; // Default to false if loggedIn cookie is not set

    const movie_list = ["6645bc9d30ee1fb3747c5ab4", "6646f4b92dc5cae6278d44ed", "6646f92021e951272e4b78b5", "6647c46992e9cf01d41cda4b", "6647c51392e9cf01d41cda4d", "6648647ffdee03fa7d475465", "66486649fdee03fa7d475469", "66486796fdee03fa7d47546b"]
    const new_movie = await Movies.find().sort({createdAt: -1}).limit(10)
    const chieurap = await Movies.find({ category: { $in: ["Chiếu rạp"] } }).sort({createdAt: -1}).limit(10)
    const anime = await Movies.find({ category: { $in: ["Anime"] } }).sort({createdAt: -1}).limit(10)
    const hight_rating = await Movies.find().sort({rating: -1}).limit(10)
    const vip = await Movies.find({vip: true})
    const movie_slider = await Movies.find({ _id: { $in: movie_list }})
    const phimViet = await Movies.find({ nation: { $in: "Việt Nam" }})
    const user = await Users.findById(req.cookies.userId)


    // console.log(movie_slider)
    res.render('index', { loggedIn: loggedIn, new_movie, chieurap, anime, hight_rating, vip, movie_slider, user, phimViet });
});

app.get('/Movie/Watch/:id', async (req, res) => {
    const loggedIn = !!req.cookies.userId;
    const movie_id = req.params.id
    const movie = await Movies.findById(movie_id)
    const user = await Users.findById(req.cookies.userId)

    if(user !== null) {
        var isFavorite = user.favorites.includes(movie_id)
        user.history.push(movie_id)
        user.save()
    }

    const related = await Movies.find({ category: { $in: movie.category } }).limit(7);
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    res.render('./WatchVideo/Watch', { loggedIn: loggedIn, isFavorite, movie, fullUrl, related, user });
});


app.post('/logout', (req, res) => {
    res.clearCookie('loggedIn');
    res.clearCookie('userId');
    res.redirect('/');
});



// Route for submitting comments
app.post('/submit-comment', async (req, res) => {

    const userId = req.cookies.userId;
    const user = await Users.findById(userId)
    const cmt = req.body.comment
    const movieId = req.body.movieId

    if (!userId || !cmt) {
        return res.status(401).send('Please log in to submit a comment.'); 
    }

    try {
        const movie = await Movies.findById(movieId);
        if (!movie) {
            return res.status(404).send('Movie not found');
        }

        movie.comments.push({ name: user.name, commentText: cmt });
        await movie.save();

        // Redirect to the movie watch page or any other desired page
       // or wherever you want to redirect after submission
    } catch (error) {
        console.error('Error submitting comment:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/get',(req, res) => {
    console.log(!req.cookies.userId)
})

app.post('/get',(req, res) => {
    console.log(req.body)
    // console.log(history)
})

app.get('/Movie/Search', async (req, res) => {
    let Url = req.originalUrl;
    const loggedIn = !!req.cookies.userId
    let temp = Url.split("=").slice(1).toString()
    var movie_name = temp.split("+").join(" ")

    if(Url.split("=").length > 1) var find = true

    if(movie_name == "") {
        Movies.find().sort({rating: -1}).limit(8)
            .then(result => {
                res.render("./Search/search", {movie: result, find, loggedIn})
            })
    }
    else {
        if (Url.split("+").length == 1) {
            Movies.find({ 'name_vn': { '$regex': movie_name}}).sort({year: -1})
                .then(result => {
                    // console.log(result)
                    res.render("./Search/search", {movie: result,find, loggedIn})
                })
        } else {
            Movies.find( { $text: { $search: movie_name } } ).sort({year: -1})
                .then(result => {
                    // console.log(result)
                    res.render("./Search/search", {movie: result, find, loggedIn})
                })
        }
    }
})

app.post('/search', async (req, res) => {
    var payload = req.body.payload

    if(payload.split(" ").length == 1) {
        var search = await Movies.find( { 'name_vn': { '$regex': payload}}).exec()
    } else {
        var search = await Movies.find( { $text: { $search: payload } } ).exec()
    }
    res.send({payload: search})
})

app.post('/update', async (req, res) => {
    const update_data = req.body.update_data
    // console.log(typeof(req.body.movieId))

    if(update_data == "DELETE" || update_data == "ADMIN" || update_data == "VIP") {
        const id = req.body.userID
        if(update_data == "VIP") {
            user_data = await Users.findById(id)
            user_data.role = 'VIP';
            await user_data.save();
        }
        if(update_data == "ADMIN") {
            user_data = await Users.findById(id)
            user_data.role = 'ADMIN';
            await user_data.save();
        }
        if(update_data == "DELETE") {
            user_data = await Users.findById(id)
            await user_data.deleteOne({"_id": {"$oid": id}})
        }
        res.redirect('/Admin/Users')
    }
        
    if(req.body.sex === '1' || req.body.sex === '2'){
        var id = req.cookies.userId
        var gender = req.body.sex
        switch (gender) {
            case '1':
                gender = "Nam"
                break;
        
            case '2':
                gender = "Nữ"
                break;
        }
        user_data = await Users.findById(id)
        user_data.gender = gender;
        user_data.name = req.body.name;
        user_data.birthdate = new Date(req.body.birthdate);
        await user_data.save();
        res.redirect("/Account/Profile")
    }

    if(typeof(req.body.phone_num) == "string") {
        if(req.body.phone_num.length === 10) {
            var id = req.cookies.userId
            user_data = await Users.findById(id)
            user_data.phone_num = req.body.phone_num.toString()
            await user_data.save()
            res.redirect("/Account/Profile")
        }
    }

    if(typeof(req.body.movieId) == "string") {
        movie_data = await Movies.findById(req.body.movieId)
        await movie_data.deleteOne({"_id": {"$oid": req.body.movieId}})
        res.redirect("/Admin/Films")
    }

    if(typeof(req.body.reportId) == "string") {
        report_data = await Reports.findById(req.body.reportId)
        await report_data.deleteOne({"_id": {"$oid": req.body.reportId}})
        res.redirect("/Admin/Report")
    }
})

app.post('/report', async (req, res) => {
    const id = req.cookies.userId
    if(!req.cookies.userId) {
        notifier.notify({
            title: 'Chưa đăng nhập',
            message: 'Vui lòng đăng nhập để báo lỗi'
        })
    } else {
        const report_array = Object.keys(req.body).filter(key => key!== '');
        const movie_id = report_array.pop()

        user_data = await Users.findById(id)
        const report_data = {
            username: user_data.username,
            reports: report_array,
            movieId: movie_id
        } 
        const saveReport = new Reports(report_data)
        saveReport.save()
    }
})

app.get('/Admin/*', async (req, res, next) => {
    const loggedIn = !!req.cookies.userId;
    const id = req.cookies.userId;
    user_data = await Users.findById(id)
    if (loggedIn == false || user_data.role !== "ADMIN")
        res.render("403")
    next();
})

app.get('/Account/*', async (req, res, next) => {
    const loggedIn = !!req.cookies.userId;
    const id = req.cookies.userId;
    user_data = await Users.findById(id)
    if (loggedIn == false)
        res.render("403")
    next();
})

app.get('/Account/Profile', (req, res) => {
    const userid = req.cookies.userId
    const loggedIn = !!req.cookies.userId;
    Users.findById(userid)
        .then(result => {
            res.render("./Account/profile", {user: result, userid, loggedIn}) 
        })
})

app.get('/Account/Favorite', async (req, res) => {
    const userid = req.cookies.userId
    const loggedIn = !!req.cookies.userId;
    const user = await Users.findById(userid)
    const movie_list = await Movies.find({ _id: { $in: user.favorites }})
    const num = movie_list.length
    const isHistory = false

    res.render("./Account/History", {movie_list, num, isHistory, loggedIn})
})

// POST /favorite route
app.post('/favorite', async (req, res) => {
    const movieId = req.body.movieId;
    const userId = req.cookies.userId;
    const user = await Users.findById(userId);
    const isFavorite = user.favorites.includes(movieId)
    
    if(!isFavorite) {
        user.favorites.push(movieId)
        user.save()
    } else {
        const deleted = user.favorites.filter(item => item!== movieId);
        user.favorites = deleted
        user.save()
    }
    
});

app.get('/Account/History', async (req, res) => {
    const userid = req.cookies.userId
    const loggedIn = !!req.cookies.userId;
    const user = await Users.findById(userid)
    const movie_list = await Movies.find({ _id: { $in: user.history }})
    const num = movie_list.length
    const isHistory = true

    res.render("./Account/History", {movie_list, num, isHistory, loggedIn})
})

app.post('/history', async (req,res) => {
    const userid = req.cookies.userId
    const user = await Users.findById(userid)
    const isHistory = req.body.isHistory
    const movieId = req.body.movieId

    if(isHistory == "true") {
        const delete_item = user.history.filter(item => item!== movieId);
        user.history = delete_item
        user.save()
    } 

    if(isHistory == "false") {
        const delete_item = user.favorites.filter(item => item!== movieId);
        user.favorites = delete_item
        user.save()
    }
})

app.get('/Admin/Home', async (req, res) => {
    const movies_num = await Movies.countDocuments({});
    const users_num = await Users.countDocuments({});
    const report_num = await Reports.countDocuments({});

    res.render("./AdminPage/dashboard", {movies_num, users_num, report_num}) 
})

app.get('/Admin/Films', (req, res) => {
    let Url = req.originalUrl;
    const temp = Url.split('=')
    if(temp[1] == undefined) {
        res.render("./AdminPage/Films", {movie: ""}) 
    } else {
        if (Url.split("+").length == 1) {
            Movies.find({ 'name_vn': { '$regex': temp[1]}}).sort({year: -1})
                .then(result => {
                    res.render("./AdminPage/Films", {movie: result})
                })
        } else {
            Movies.find( { $text: { $search: temp[1] } } ).sort({year: -1})
                .then(result => {
                    res.render("./AdminPage/Films", {movie: result})
                })
        }
    }
    
})

// TODO
app.post('/Admin/Films', upload.fields(file_field) , function(req,res) {
    const data = {
        name_vn : req.body.name_vn,
        name_en : req.body.name_en,
        category: req.body.Category,
        nation: req.body.nation,
        year: req.body.year,
        rating: req.body.rating,
        duration: req.body.duration,
        actor_name: req.body.actor_name.split(", "),
        director_name: req.body.director_name,
        discription: req.body.discription,
        path: "/Movie/" + req.body.name_vn + "/",
        vip : req.body.vip
    }
    const saveMovie = new Movies(data)
    saveMovie.save()
    console.log(req.body)
    res.redirect('/Admin/Films')
})

app.get('/Admin/Report', (req, res) => {
    Reports.find()
        .then(result => {
            res.render("./AdminPage/Report", {report: result})
    })
})

app.get('/Admin/Request', (req, res) => {
    res.render("./AdminPage/Request") 
})

app.get('/Admin/Users', (req, res) => {
    Users.find().limit(10)
        .then(result => {
            res.render("./AdminPage/Users", {user: result}) 
        })
})

app.get('/Category/*', async (req, res) => {
    const loggedIn = !!req.cookies.userId;
    var Url = req.protocol + '://' + req.get('host') + req.originalUrl;
    var temp = req.originalUrl.split("/")
    var gerne = temp[2].split("%20").join(" ")
    if(gerne == "Tinh cam") gerne = "Tình cảm"
    if(gerne == "Kinh di") gerne = "Kinh dị"
    if(gerne == "Hanh dong") gerne = "Hành động"
    if(gerne == "Gia dinh") gerne = "Gia đình"
    if(gerne == "Khoa hoc") gerne = "Khoa học viễn tưởng"
    if(gerne == "Bi an") gerne = "Bí ẩn"
    if(gerne == "Tam ly") gerne = "Tâm lý"
    if(gerne == "Tinh cam") gerne = "Tình cảm"


    var movie = await Movies.find({ category: { $in: [gerne] } });  
    // console.log(movie.length)
    res.render("./TheLoaiPhim/Category", {movie, gerne, loggedIn})
})

app.get('/TopPhim', async (req, res) => {
    const loggedIn = !!req.cookies.userId;
    var movie = await Movies.find().sort({rating: -1});  
    const gerne = "Top Phim"
    
    res.render("./TheLoaiPhim/Category", {movie, gerne, loggedIn})
})

app.get('/ChieuRap', async (req, res) => {
    const loggedIn = !!req.cookies.userId;
    var movie = await Movies.find({ category: { $in: "Chiếu rạp" } });  
    const gerne = "Chiếu rạp"
    
    res.render("./TheLoaiPhim/Category", {movie, gerne, loggedIn})
})

app.get('/Nation/*', async (req, res) => {
    const loggedIn = !!req.cookies.userId;
    var Url = req.protocol + '://' + req.get('host') + req.originalUrl;
    var temp = req.originalUrl.split("/")
    var gerne = temp[2].split("%20").join(" ")
    if(gerne == "Viet Nam") gerne = "Việt Nam"
    if(gerne == "Han Quoc") gerne = "Hàn Quốc"
    if(gerne == "Nhat Ban") gerne = "Nhật Bản"
    if(gerne == "Au My") gerne = "Âu Mỹ"

    var movie = await Movies.find({ nation: { $in: [gerne] } });  
    // console.log(movie.length)
    res.render("./TheLoaiPhim/Category", {movie, gerne, loggedIn})
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// TODO: Fix ../../

// Bottom 404 page 
app.use((req, res) => {
    res.status(404).render("404")  
})
