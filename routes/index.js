const router = require('express').Router();

const noteRoutes = require('./note-routes.js');

router.use('/api/notes', noteRoutes);

module.exports = router;