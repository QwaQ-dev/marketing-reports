const db = require('../services/db');

class ReportController{
    async getList(req, res) {
        try {
            console.log('req.body.tenant_id', req.body);
            const reports = await db.getReportsByTenantId(req.body.tenant_id);
            console.log('getList', reports);
            res.json({reports});
        } catch (error) {
            console.log('getList error', error);
            res.status(500).json({error: 'Ошибка сервера'});
        }
      }

}

module.exports = new ReportController();