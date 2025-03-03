const db = require('../services/db');

class UserController{
    async auth(req, res) {
        try {
            const user = await db.getUserByAccountName(req.body.userName);
            console.log('auth', user);
            res.json({user});
        } catch (error) {
            res.status(500).json({error: 'Ошибка сервера'});
        }
      }

}

module.exports = new UserController();