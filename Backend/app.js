//Express app
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const bcryptjs = require('bcryptjs');
const Movies = require('./model/movie');
const Users = require('./model/user');
const Reports = require('./model/report');
const multer = require('multer');
const fs = require('fs-extra');
const notifier = require('node-notifier');
// const { MongoClient } = require('mongodb');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const path = require('path');

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
    {name: "actor_pic", maxCount: 10},
]

// Connect to mongodb
// Only after connected to db, the server listen to requests
const dbUrl = "mongodb+srv://22520820:Taomatkhau4!@cluster0.skgxy9y.mongodb.net/Website?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(dbUrl)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://22520820:Taomatkhau4!@cluster0.skgxy9y.mongodb.net/Website?retryWrites=true&w=majority&appName=Cluster0";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

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

//Register
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
        
        res.redirect('back');
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

        console.log(user);

        // Compare the plaintext password with the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        console.log("Password match result:", passwordMatch);
        console.log("password: ", password);
        console.log("User Pass: ", user.password);

        // If passwords don't match, return an error
        if (!passwordMatch) {
            return res.status(400).send('Incorrect password');
        }

        // Set the 'loggedIn' cookie after successful login

        res.cookie('userId', user._id.toString(), { secure: true });

        // Redirect the user to the home page upon successful login
        
        res.redirect('back');
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Logout
app.post('/logout', (req, res) => {
    res.clearCookie('loggedIn');
    res.clearCookie('userId');
    res.redirect('/');
});

// Routes
app.get('/', async (req, res) => {
    const loggedIn = !!req.cookies.userId; // Default to false if loggedIn cookie is not set

    const movie_list = ["6645bc9d30ee1fb3747c5ab4", "6646f92021e951272e4b78b5", "6647c46992e9cf01d41cda4b", "6647c51392e9cf01d41cda4d", "6648647ffdee03fa7d475465", "66486649fdee03fa7d475469", "66486796fdee03fa7d47546b"]
    const new_movie = await Movies.find().sort({createdAt: -1}).limit(10)
    const chieurap = await Movies.find({ category: { $in: ["Chiếu rạp"] } }).sort({createdAt: -1}).limit(10)
    const anime = await Movies.find({ category: { $in: ["Anime"] } }).sort({createdAt: -1}).limit(10)
    const high_rating = await Movies.find().sort({rating: -1}).limit(10)
    const most_view = await Movies.find().sort({views: -1}).limit(10)
    const vip = await Movies.find({vip: true})
    const movie_slider = await Movies.find({ _id: { $in: movie_list }})
    const phimViet = await Movies.find({ nation: { $in: "Việt Nam" }})
    const user = await Users.findById(req.cookies.userId)


    // console.log(movie_slider)
    res.render('index', { loggedIn: loggedIn, new_movie, chieurap, anime, high_rating, vip, movie_slider, user, phimViet, most_view});
});

app.get('/Movie/Watch/:id', async (req, res) => {
    const loggedIn = !!req.cookies.userId;
    const movie_id = req.params.id.split(" ").slice(-1)
    const movie = await Movies.findById(movie_id)

    const user = await Users.findById(req.cookies.userId)

    if(user !== null) {
        var isFavorite = user.favorites.includes(movie_id)
        user.history.push(movie_id[0])
        user.save()
    }

    if(typeof(movie.views) == "undefined") {
        movie.views = 0
        movie.save()
    } else {
        movie.views += 1
        movie.save()
    }

    const related = await Movies.find({ category: { $in: movie.category } }).limit(10);
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    res.render('./WatchVideo/Watch', { loggedIn: loggedIn, isFavorite, movie, fullUrl, related, user });
});

// Cấu hình Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tranthienmanh09@gmail.com',
      pass: 'mzsf jwyd odlg mzuv'
    }
});

// ************* Forgot password *************
// Hàm xử lý route đúng cho reset-password
app.get('/Reset-password', (req, res) => {
    const token = req.query.token;  // Lấy token từ các tham số truy vấn
    if (token) {
        res.render(' ResetPassword/reset', { token: token });
    } else {
        res.status(400).send('Không được phép truy cập !');
    }
});

// Điểm cuối để yêu cầu đặt lại mật khẩu
app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await Users.findOne({ email: email });
    if (!user) {
      return res.status(404).send('Không tìm thấy người dùng.');
    }
  
    const token = crypto.randomBytes(20).toString('hex');
    await Users.updateOne({ _id: user._id }, {
      $set: {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 108000000 // Token hết hạn 30 phut
      }
    });
  
    const mailOptions = {
      from: 'yourgmail@gmail.com',
      to: user.email,
      subject: 'Đặt lại mật khẩu',
      text: `Bạn nhận được điều này vì bạn (hoặc ai đó) đã yêu cầu đặt lại mật khẩu cho tài khoản của bạn.\n\n` +
            `Vui lòng nhấp vào liên kết sau, hoặc dán nó vào trình duyệt của bạn để hoàn thành quá trình trong vòng 30 phút kể từ khi nhận được nó:\n\n` +
            `http://localhost:3000/Reset-password/${token}\n\n` +
            `Nếu bạn không yêu cầu điều này, vui lòng bỏ qua email này và mật khẩu của bạn sẽ không thay đổi.\n`
    };
  
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        res.status(500).send('Lỗi gửi email');
      } else {
        console.log('Email đã được gửi: ' + info.response);
        res.status(200).send('Email khôi phục đã được gửi.');
      }
    });
  });

// Trang đặt lại mật khẩu
app.get('/Reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const user = await Users.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
  
    if (!user) {
      return res.status(400).send('Token đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.');
    }
  
    res.render('ResetPassword/reset', { token: token });
  });

// Xử lý đặt lại mật khẩu
app.post('/ResetPassword/reset/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword, repassword } = req.body; // Giả định mật khẩu mới được gửi trong body

    try {
        // const user = await Users.findOne({
        //     resetPasswordToken: token,
        //     resetPasswordExpires: { $gt: Date.now() } // Kiểm tra token vẫn còn hợp lệ
        // });

        const user = await Users.findOne({ resetPasswordToken: token });
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        console.log("Pass 1:", hashedPassword);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined; // Xóa token sau khi đã dùng
        user.resetPasswordExpires = undefined; // Xóa thời gian hết hạn của token
        await user.save(); // cập nhật lại mật khẩu ở account db

        console.log(user);


        // if (!user) {
        //     return res.status(400).send('Mã token không hợp lệ hoặc đã hết hạn.');
        // }

        // if (password !== repassword) {
        //     return res.status(400).json({ success: false, message: "Mật khẩu mới và mật khẩu xác nhận không khớp" });
        // }

        // // Kiểm tra điều kiện mật khẩu mới (ví dụ: độ dài tối thiểu)
        // if (password.length < 6) {
        //     return res.status(400).json({ success: false, message: "Mật khẩu mới phải có ít nhất 6 ký tự" });
        // }

        // Mã hóa mật khẩu mới và cập nhật vào cơ sở dữ liệu

    } catch (error) {
        console.error('Lỗi trong quá trình đặt lại mật khẩu: ', error);
        res.status(500).send('Lỗi trong quá trình đặt lại mật khẩu.');
    }
});








//**********OTP***********//

//******Button "Thay đổi" => gửi otp đến mail ****** */
app.post("/Account/Profile/change-password", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await Users.findOne({ email: email });
        if (!user) {
            return res.status(404).send("User email not found");
        }
        
        const otp = Math.floor(1000 + Math.random() * 9000); // Generate 4 digits OTP
        const otpExpiry = new Date(Date.now() + 18000000); // OTP expiry time (30 minutes)
  
        console.log("OTP", otp);

        // Update user document with OTP
        const updateDoc = {
          $set: {
            otp: otp,
            otpExpiry: otpExpiry,
          }
        };
        const options = { upsert: true };
        await Users.updateOne({ email: email }, updateDoc, options);
        
        // Send OTP via email
        const mailOptions = {
          from: 'tranthienmanh09@gmail.com',  // Your Gmail address
          to: email,
          subject: 'Your OTP',
          text: `Your OTP is ${otp} and it expires in 30 minutes.`
        };
  
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

//****** Verify-OTP******/
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/Account/Profile/verify-OTP", async (req, res) => {
    const userId = req.cookies.userId;
    const user = await Users.findById(userId)

    const { input1, input2, input3, input4 } = req.body;
    const otp = `${input1}${input2}${input3}${input4}`;
    const currentDateTime = new Date().getTime(); // Chuyển đổi thời gian hiện tại thành timestamp

    console.log("input", input1);
    console.log("input",input2);
    console.log("input",input3);
    console.log("input",input4);

    try {

        console.log("Received body:", req.body);
        console.log("OTP from user:", user.otp, typeof(user.otp));
        console.log("Generated OTP:", otp, typeof(otp));
        console.log("OTP expiry from user:", user.otpExpiry);
        console.log("Current DateTime:", currentDateTime);

        // Kiểm tra OTP và thời hạn
        if (user.otp == otp && user.otpExpiry > currentDateTime) {
            console.log("OTP verified successfully. You can now change your password.")
            res.json({success: true})

        } else {
            console.log("OTP verification failed. Please check again.")
            res.json({success: false})
           
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Xử lý đặt lại mật khẩu
app.post('/Account/Profile/resetLogined', async (req, res) => {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const userId = req.cookies.userId;
    const user = await Users.findById(userId)

    console.log(req.body);

    try {
        if (!user) {
            return res.status(404).json({ success: false, message: "Người dùng không tồn tại" });
        }

        // Kiểm tra mật khẩu cũ có chính xác không
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Mật khẩu cũ không chính xác" });
        }

        // Kiểm tra mật khẩu mới có khớp với mật khẩu xác nhận không
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ success: false, message: "Mật khẩu mới và mật khẩu xác nhận không khớp" });
        }

        // Kiểm tra điều kiện mật khẩu mới (ví dụ: độ dài tối thiểu)
        if (newPassword.length < 6) {
            return res.status(400).json({ success: false, message: "Mật khẩu mới phải có ít nhất 6 ký tự" });
        }

        // Mã hóa mật khẩu mới và cập nhật vào cơ sở dữ liệu
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save(); // cập nhật lại mật khẩu ở account db

        res.json({ success: true, message: "Mật khẩu đã được đặt lại thành công" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
    }
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
    if (loggedIn == false || user_data.role !== "ADMIN") res.render("403")
    else next();
})

app.get('/Account/*', async (req, res, next) => {
    const loggedIn = !!req.cookies.userId;
    const id = req.cookies.userId;
    user_data = await Users.findById(id)
    if (loggedIn == false) res.render("403")
    else next();
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
        user.favorites.push(movieId[0])
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
    console.log(movieId)

    if(isHistory == "true") {
        const toRemove = new Set(movieId)
        const difference = user.history.filter( x => !toRemove.has(x) );
        // const delete_item = user.history.filter(item => !movieId.includes(item));
        console.log(user.history)
        // user.history = delete_item
        // user.save()
    } 

    if(isHistory == "false") {
        const delete_item = user.favorites.filter(item => !movieId.includes(item));
        user.favorites = delete_item
        await user.save()
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
