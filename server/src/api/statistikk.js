import express from 'express';
const router = express.Router();
import mysql from 'mysql';
import bodyParser from 'body-parser';
import {pool} from '../../test/poolsetup.js';
import StatistikkDao from '../dao/statistikkdao.js';

const statistikkDao = new StatistikkDao(pool);

router.get('/api/feilperkommune', (req, res) => {
  statistikkDao.feilPerKommune((status, data) => {
    res.status(status);
    res.json(data);
  });
});

module.exports = router;
