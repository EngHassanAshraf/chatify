import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true,
            minlength: 7,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        username: {
            type: String,
            unique: true,
            trim: true,
            sparse: true,
        },
        phoneNumber: {
            type: String,
            unique: true,
            trim: true,
            sparse: true,
        },
        picture: {
            type: String,
            default: 'https://i.ibb.co/qFJYD3rP/person.png'
        },
        hashedPassword: {
            type: String,
            required: true,
            select: false,
            minlength: 8
        },
        isActive: {
            type: Boolean,
            default: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        emailVerified: {
            type: Boolean,
            default: false
        },
        phoneVerified: {
            type: Boolean,
            default: false
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        last_login: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        toJSON:
        {
            transform: function (doc, ret) {
                delete ret.hashedPassword;
                delete ret.__v;
                ret.id = ret._id;
                delete ret._id;
                return ret
            }
        },
        toObject:
        {
            transform: function (doc, ret) {
                delete ret.hashedPassword;
                delete ret.__v;
                ret.id = ret._id;
                delete ret._id;
                return ret
            }
        }
    }
);

userSchema.methods.matchPassword = async function (reqPassword) {
    const userWithPassword = await this.model('User').findById(this._id).select("+hashedPassword");
    const hash = userWithPassword ? userWithPassword.hashedPassword : "dummy_hash_to_prevent_timing_attacks";
    return await bcrypt.compare(reqPassword, hash);
}

const User = mongoose.model('User', userSchema);
export default User;
