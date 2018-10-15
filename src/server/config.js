module.exports = {
    IS_PRODUCTION: process.env.NODE_ENV === 'production',
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/celine-webshop',
    SECRET_JWT_PASSPHRASE: 'TWLom9RDbmGYBtkHHPe4m8pKswyUY',
    CLOUDINARY_NAME: 'delw8osvu',
    CLOUDINARY_KEY: '358815856395683',
    CLOUDINARY_SECRET: '3Z6EzRb8bCEwoIkoOWxoAvNUGIo',
}
