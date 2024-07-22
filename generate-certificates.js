import fs from 'fs';
import { createCA, createCert } from 'mkcert'
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import config from './config.js'

// Определение пути к директории сертификатов
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CERT_DIR = path.join(__dirname, 'ssl');
const CERT_KEY = path.join(CERT_DIR, 'key.key');
const CERT_CERT = path.join(CERT_DIR, 'cert.crt');

// Получение внешнего IP
const interfaces = os.networkInterfaces();
let externalIp = '';

for (let iface in interfaces) {
	for (let alias of interfaces[iface]) {
		if (alias.family === 'IPv4' && !alias.internal) {
			externalIp = alias.address;
			break;
		}
	}
}

// Создание директории для сертификатов, если она не существует
if (!fs.existsSync(CERT_DIR)) {
	fs.mkdirSync(CERT_DIR, { recursive: true });
}

const ca = await createCA({
	organization: config.COMPANY_NAME,
	countryCode: config.LANG,
	state: "Dev",
	locality: "Dev",
	validity: 365
});

const cert = await createCert({
	ca: { key: ca.key, cert: ca.cert },
	domains: ["127.0.0.1", "localhost", externalIp],
	validity: 365
});


if (!fs.existsSync(CERT_KEY) || !fs.existsSync(CERT_CERT)) {
	fs.writeFileSync(CERT_CERT, cert.cert);
	fs.writeFileSync(CERT_KEY, cert.key);
}

console.log(`Certificates generated at ${CERT_DIR}`);
console.log(`External IP used: ${externalIp}`);
