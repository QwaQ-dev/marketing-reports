const { getMatchingPartnersByTenantCode } = require('../services/db');

class PartnersController {
    async getMatchingPartners(req, res) {
        try {
            const { selectedTenant } = req.body;  // Изменим на selectedTenantCode
            console.log("Полученные tenantCodes: ", selectedTenant);
            let partners = [];
            const partnerData = await getMatchingPartnersByTenantCode(selectedTenant);

            partnerData.forEach((el) => {
                partners.push({ id: el.id, name: el.name });  
            });
            return res.status(200).json({ partners:  partners});
        } catch (error) {
            console.error("Ошибка при получении партнеров:", error);
            res.status(500).json({ message: "Ошибка сервера", error: error.message });
        }
    }
}

module.exports = new PartnersController();
