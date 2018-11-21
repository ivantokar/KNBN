const mongoose = require('mongoose')
    , mongooseStringQuery = require('mongoose-string-query')
    , timestamps = require('mongoose-timestamp')
    , Hash = require('password-hash');

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            set: (newValue) => {
                return Hash.isHashed(newValue) ? newValue : Hash.generate(newValue);
            },
            required: true,
        }
    });

UserSchema.plugin(timestamps);
UserSchema.plugin(mongooseStringQuery);

module.exports  = mongoose.model('User', UserSchema);