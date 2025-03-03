const BASE_URL = 'http://localhost:8080/api/v1';
const API_KEY = 'd983d923d73262wcaf4136c204b0cac7';

const handleResponse = async (responseRaw) => {
    let response = {
        ok: responseRaw.ok,
        status: responseRaw.status,
        statusText: responseRaw.statusText
    };
    if (responseRaw.ok) {
        response.result = await responseRaw.json();
    }
    return response;
};

export async function auth({ userName }) {
    const url = `${BASE_URL}/auth`;
    const reqBody = {
        userName
    };
    const responseRaw = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody)
    });
    return await handleResponse(responseRaw);
}

export async function getTenantsByCode({ tenantCode }) {
    const url = `${BASE_URL}/tenant?tenantCode=${tenantCode}`;
    const responseRaw = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    return await handleResponse(responseRaw);
}

export async function getTenantId({ tenantCode }) {
    const url = `${BASE_URL}/tenant`;
    const reqBody = {
        tenantCode
    };
    const responseRaw = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody)
    });
    return await handleResponse(responseRaw);
}

export async function getTenantsByUsername({ username }) {
    const url = `${BASE_URL}/tenants`;
    const reqBody = {
        username
    };
    const responseRaw = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody)
    });
    return await handleResponse(responseRaw);
}

export async function getReports({ tenant_id }) {
    const url = `${BASE_URL}/reports`;
    const reqBody = {
        tenant_id
    };
    const responseRaw = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody)
    });
    return await handleResponse(responseRaw);
}

export async function getPartners(selectedTenant) {
    const url = `http://localhost:8080/partners-tenants`;
    const reqBody ={
        selectedTenant
    };
    console.log(reqBody)
    const responseRaw = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody)
    });

    console.log(responseRaw);
    return await handleResponse(responseRaw);
}
