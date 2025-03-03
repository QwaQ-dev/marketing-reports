const Router = require("express");
const router = new Router();
const db = require('../services/db');
const userController = require('../controllers/userController');
const reportController = require('../controllers/reportController');

router.post("/auth", userController.auth);

router.get('/tenant', async (req, res) => {
    const { tenantCode } = req.query;
    if (!tenantCode) {
        return res.status(400).json({ error: "tenantCode is required" });
    }

    try {
        const tenantId = await db.getTenantsByCode(tenantCode);
        res.json(tenantId);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.post("/tenants", async (req, res) => {
    const username = req.body;
    try {
        const result = await db.getUserTenants(username);
        console.log(result)
        
        return res.status(200).json({
            tenants: result
        });
    } catch (error) {
        return res.status(500).json({message: "Error with tentna id", error: error.message})
    }
});

router.post("/reports", reportController.getList);

module.exports = router;