module.exports = {
    IS_PRODUCTION: process.env.NODE_ENV === 'production',
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/celine-webshop',
    SECRET_JWT_PASSPHRASE: 'TWLom9RDbmGYBtkHHPe4m8pKswyUY',
    CLOUDINARY_NAME: 'doecwsnly',
    CLOUDINARY_KEY: '134122139343155',
    CLOUDINARY_SECRET: 'RiKpKPMqx5jfrjcEmTvussq4Kxs',
}
