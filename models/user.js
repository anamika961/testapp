const mongoose = require("mongoose");
//const bycrpt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        trim: true,
        required: [true, "UserName name is required"],
        minlength: [2, "First name minimum contains 2 letters"],
    },
    email:{
        type:String,
        required: [true, "Email is required"]
    },
    phone_no:{
        type: String,
      //  required: [true, "phone no. is required"],
        type: String,
        validate(value) {
            if(value.length !== 10) {
                throw new Error("phone no should be a 10 digit number")
            }
        }
    },
    password:{
		type: String,
        trim: true,
        minlength: [6, "Password minimum contains 6 characters"],
		//required: true,
       // select:false
	},
    emailOtp:{
        type: Number,
        default: 1234
    },
    mobileOtp:{
        type: Number,
        default: 1234
    },
    date_of_birth:{
        type:Date,
    },
    gender:{
        type:String,
        enum:{
            values:["male","female","other"],
            message:"{VALUE} is not a correct value.Expect male,female,other"
        }
    },
    religion:{
        type:String,
        //minlength: [2, "Religion minimum contains 2 letters"],
    },
    user_religion:{
        type:String,
        enum:{
            values:["hinduism","islam","christianity","buddhism","other"],
            message:"{VALUE} is not a correct value.Expect hinduism,islam,christianity,buddhism,other"
        }
    },
    address:{
        type:String,
       // minlength: [2, "Address minimum contains 2 letters"],
    },
    location:{
        type:String,
        //minlength: [2, "Location minimum contains 2 letters"],
    },
    city:{
        type:String,
       // minlength: [2, "city minimum contains 2 letters"],
    },
    state:{
        type:String,
       // minlength: [2, "State minimum contains 2 letters"],
    },
    ward_no:{
        type:String,
       // minlength: [2, "Word_no minimum contains 2 letters"],
    },
    pin_code:{
        type:String,
       // minlength: [6, "Pin minimum contains 6 characters"],
    },
    constituency:{
        type:String,
       // minlength: [2, "constituency minimum contains 2 characters"],
    },
    political_view:{
        type:String
    },
    voter_card_no:{
        type:String
    },
    user_state:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "states",
    },
    user_city:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "cities",
    },
    user_area:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "areas",
    },
    user_constituency:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "constituency",
    },
    login_via_google:{
        type:Boolean,
        default:false
    },
    user_image:{
        type:String
    },
    connect_request:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "friendRequests"
        }
    ],
    connect_count:{
        type:Number,
        default:0,
        min:0
    },
    status: {
        type: Boolean,
        default: true
    },
    user_seggestion:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ],
    name:{
        type:String
    }
}, {timestamps: true});

userSchema.pre("save", async function(next) {
	if(this.isModified("password")) {
		this.password = await bycrpt.hash(this.password, 10);
		this.confirmPassword = undefined;
	}
	next();
})


userSchema.pre("updateOne", async function(next) {
	try {
		if(this._update.password) {
			this._update.password = await bycrpt.hash(this._update.password, 10);
		}
		next();
	} catch (err) {
		return next(err);
	}
});

userSchema.pre("findOneAndUpdate", async function(next) {
	try {
		if(this._update.password) {
			this._update.password = await bycrpt.hash(this._update.password, 10);
		}
		next();
	} catch (err) {
		return next(err);
	}
})


const User = new mongoose.model("users", userSchema);

module.exports = User;