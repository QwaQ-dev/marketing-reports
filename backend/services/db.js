const Pool = require('pg').Pool
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const DB_SCHEMA = process.env.DB_SCHEMA;

const pool = new Pool({    
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME
})

async function getUserByAccountName(accountName) {
    try {
        const result = await pool.query(
            `SELECT * FROM ${DB_SCHEMA}.USERS u WHERE u.account_name = $1`,
            [accountName]
        );
        return result.rows[0];
    } catch (error) {

    }
}

async function insertFileData(originalName, extension, now) {
    try {
        const result = await pool.query(
            `INSERT INTO ${DB_SCHEMA}.files (name, extension, path, is_removed, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
            [originalName, extension, '', 1, now]
        );
        return result.rows[0].id; 
    } catch (error) {
        return error.message
    }
}

async function updateFilePath(fileId, newFilePath) {
    await pool.query(
        `UPDATE ${DB_SCHEMA}.files SET path = $1 WHERE id = $2`,
        [newFilePath, fileId]
    );
}

async function insertMarketingReport(month, year, fileId, userId, tenantId, partnerId, now) {
    await pool.query(
        `INSERT INTO ${DB_SCHEMA}.marketing_reports (month, year, fid, user_id, tenant_id, partner_id, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [month, year, fileId, userId, tenantId, partnerId, 2, now, now]
    );
}


async function getReportsByTenantId(tenant_id) {
    try {
        const result = await pool.query(
            `SELECT r.id, r.month, r.year, f.name, r.status 
               FROM ${DB_SCHEMA}.MARKETING_REPORTS r
               JOIN ${DB_SCHEMA}.FILES f ON r.fid = f.id               
              WHERE r.tenant_id  = $1`,
            [tenant_id]
        );
        console.log('db.getReportsByTenantId result', result);
        return result.rows;
    } catch (error) {
        return error.message
    }
}


async function getTenantsByCode(code) {
    try {
        const result = await pool.query(
            `SELECT id FROM ${DB_SCHEMA}.tenants WHERE code = $1`, 
            [code]
        );
        console.log(result.rows[0])
        return result.rows[0];
    } catch (error) {
        return error.message
    }
}


async function getUserTenants(username) {
    try {
        const result = await pool.query(
            `SELECT * FROM ${DB_SCHEMA}.users WHERE name = $1`, 
            [username]
        );
        return result.rows;
    } catch (error) {
        return error.message
    }
}

async function getMatchingPartnersByTenantCode(tenantCode) {
    try {
        const query = `
        SELECT id, name 
        FROM ${DB_SCHEMA}.partners
        WHERE tenants::jsonb @> $1::jsonb
    `;
    const result = await pool.query(query, [JSON.stringify([tenantCode])]);
    return result.rows;
    } catch (error) {
        return error.message
    }
}

module.exports = {
    insertFileData,
    updateFilePath,
    insertMarketingReport,
    getUserByAccountName,
    getReportsByTenantId,
    getTenantsByCode,
    getMatchingPartnersByTenantCode,
    getUserTenants
}
