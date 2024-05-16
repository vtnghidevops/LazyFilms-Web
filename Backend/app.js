//Express app
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcrypt');
const Movies = require('./model/movie');
const Users = require('./model/user');
const multer = require('multer');
const Cors = require('cors')
let fs = require('fs-extra');
const { MongoClient } = require('mongodb');

const cookieParser = require('cookie-parser');
const { render } = require('ejs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = "./Movies/" + req.body.name_vn + "/"
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
            cb(null, file.originalname)
    }
})
const upload = multer({storage: storage})

const file_field = [ 
    {name: "pic_ngang", maxCount: 1},
    {name: "pic_doc", maxCount: 1},
    {name: "trailer", maxCount: 1},
    {name: "vid", maxCount: 1},
    {name: "actor_pic", maxCount: 1},
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
app.use("/movie", express.static(__dirname + '/Video'));
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
        res.cookie('loggedIn', true, { secure: true });

        res.cookie('userId', savedUser._id);

        // Redirect the user to the home page upon successful registration
        // res.redirect('/');
        res.render('index', { loggedIn: true });
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
        res.cookie('loggedIn', true, { secure: true });

        res.cookie('userId', user._id);

        // Redirect the user to the home page upon successful login
        // res.redirect('/');
        res.render('index', { loggedIn: true });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Routes
app.get('/', (req, res) => {
    const loggedIn = req.cookies.loggedIn || false; // Default to false if loggedIn cookie is not set
    res.render('index', { loggedIn: loggedIn });
});


app.post('/logout', (req, res) => {
    res.clearCookie('loggedIn');
    res.clearCookie('userId');
    res.redirect('/');
});


app.get('/get', async (req, res) => {
    const id = req.cookies.userId
    if (typeof(req.cookies.userId) == "undefined") {
         console.log(":123")
    }

})

// app.get('/', (req, res) => {
//     Movies.find().sort({year: -1})
//         .then(result => {
//             res.render('index', {movie_info: result, titleeeeee: "Test123"})
//             // console.log(result)
//         })
// })

// app.post('/',(req,res) => {
//     console.log(req.body)
// })


app.get('/WatchVideo', (req, res) => {
    Movies.findOne({name: "Minions"})
        .then(result => {
            res.render('watch', {info: result, title: "Test123"})
            Movies.find({category: result.category[0]})
                .then(result2 => {
                    console.log(result2)
                })
    })
})

app.get('/Movie/Search', (req, res) => {
    let Url = req.originalUrl;
    let temp = Url.split("=").slice(1).toString()
    var movie_name = temp.split("+").join(" ")

    if(movie_name == undefined) {
        Movies.find().sort({year: -1}).limit(5)
            .then(result => {
                // console.log(result)
                res.render("./Search/search")
            })
    } 
    else {
        if (Url.split("+").length == 1) {
            Movies.find({ 'name_vn': { '$regex': movie_name}}).sort({year: -1})
                .then(result => {
                    // console.log(result)
                    res.render("./Search/search")
                })
        } else {
            Movies.find( { $text: { $search: movie_name } } ).sort({year: -1})
                .then(result => {
                    // console.log(result)
                    res.render("./Search/search")
                })
        }
    }
})

app.post('/search', async (req, res) => {
    var payload = req.body.payload

    if(payload.split(" ").length == 1) {
        var search = await Movies.find( { 'name': { '$regex': payload}}).exec()
    } else {
        var search = await Movies.find( { $text: { $search: payload } } ).exec()
    }
    res.send({payload: search})
})

app.post('/update', async (req, res) => {
    const update_data = req.body.update_data
    console.log(typeof(req.body.movieId))

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
    }

    if(typeof(req.body.phone_num) == "string") {
        if(req.body.phone_num.length === 10) {
            var id = req.cookies.userId
            user_data = await Users.findById(id)
            user_data.phone_num = req.body.phone_num.toString()
            await user_data.save()
        }
    }

    if(typeof(req.body.movieId) == "string") {
        movie_data = await Movies.findById(req.body.movieId)
        await movie_data.deleteOne({"_id": {"$oid": req.body.movieId}})
    }

})

app.get('/Movie/Watch', (req, res) => {
    res.render("./WatchVideo/Watch") 
})

app.get('/Account/Profile', (req, res) => {
    const userid = req.cookies.userId
    Users.findById(userid)
        .then(result => {
            res.render("./Account/profile", {user: result, userid}) 
        })
})

app.get('/Admin/dashboard', async (req, res) => {
    const movies_num = await Movies.countDocuments({});
    const users_num = await Users.countDocuments({});
    res.render("./AdminPage/dashboard", {movies_num, users_num}) 
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
        actor_name: req.body.actor_name.split(","),
        director_name: req.body.director_name,
        discription: req.body.discription,
        path: "./test123/" + req.body.name_vn + "/",
        vip : req.body.vip
    }
    const saveMovie = new Movies(data)
    saveMovie.save()
    res.redirect('/Admin/Films')
})

app.get('/Admin/Report', (req, res) => {
    res.render("./AdminPage/Report")
})

app.get('/Admin/Require', (req, res) => {
    res.render("./AdminPage/Require") 
})

app.get('/Admin/Users', (req, res) => {
    Users.find().limit(10)
        .then(result => {
            res.render("./AdminPage/Users", {user: result}) 
        })
})

app.get('/Tinhcam', (req, res) => {
    res.sendFile('./views/TheLoaiPhim/TinhCam.html', {root: __dirname})    
})

app.get('/TopPhim', (req, res) => {
    res.sendFile('./Pages/TheLoaiPhim/TopPhim.html', {root: __dirname})    
})

app.get('/PhimChieuRap', (req, res) => {
    res.sendFile('./Pages/TheLoaiPhim/PhimChieuRap.html', {root: __dirname})    
})

// Bottom 404 page 
app.get((req, res) => {
    res.status(404).render("404")  
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// TODO: Fix ../../