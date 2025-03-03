CREATE TABLE users(
    id BIGINT PRIMARY KEY,
    account_name CHARACTER VARYING,
    name CHARACTER VARYING, 
    tenants JSONB
)

CREATE TABLE dev.tenants(
    id BIGINT PRIMARY KEY,
    code CHARACTER VARYING, 
    name CHARACTER VARYING
)

CREATE TABLE dev.files(
    id BIGINT PRIMARY KEY,
    name CHARACTER VARYING,
    extension CHARACTER VARYING,
    path CHARACTER VARYING,
    is_removed INT, 
    created_at TIMESTAMP WITH TIME ZONE

)

CREATE TABLE dev.partners(
    id BIGINT PRIMARY KEY,
    name CHARACTER VARYING,
    tenants JSONB,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
)

CREATE TABLE dev.marketing_reports(
    id BIGINT PRIMARY KEY,
    month INT,
    year INT,
    fid BIGINT,
    user_id BIGINT,
    tenant_id BIGINT,
    partner_id BIGINT,
    status TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
)



INSERT INTO dev.tenants (code, name) VALUES ("AL", "Almaty")
INSERT INTO dev.tenants (code, name) VALUES ("AKT", "Aktobe")
INSERT INTO dev.tenants (code, name) VALUES ("SEI", "Semei")

INSERT INTO dev.users (account_name, name, tenants) VALUES ("admin", "admin", '{"AL": "Alamty", "AKT":"Aktobe", "SEI":"Semei"}')
INSERT INTO dev.users (account_name, name, tenants) VALUES ("test2", "test2", '{"AL": "Alamty", "AKT":"Aktobe"}')
INSERT INTO dev.users (account_name, name, tenants) VALUES ("test3", "test3", '{"AL": "Alamty"}')

INSERT INTO dev.partners (name, tenants, created_at, updated_at) VALUES ("Dina", '{"AL": "Alamty", "AKT":"Aktobe", "SEI":"Semei"}')
INSERT INTO dev.partners (name, tenants, created_at, updated_at) VALUES ("Diksi", '{"AL": "Alamty", "AKT":"Aktobe"}')
INSERT INTO dev.partners (name, tenants, created_at, updated_at) VALUES ("Anvar", '{"AL": "Alamty"}')