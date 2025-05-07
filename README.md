# Smart Greenhouse System API

Bu proje, daha önce geliştirdiğim Greenhouse_API uygulamasının geliştirilmiş ve profesyonelleştirilmiş halidir. Gelişmiş kullanıcı kimlik doğrulama, bölgelendirme, otomasyon kuralları ve detaylı ürün geçmişi raporlaması gibi birçok yeni özellik içermektedir.

## Proje Tanımı

Çiftçilerin seralarına ait verileri anlık olarak takip edebilmelerini, otomatik kurallar tanımlayarak cihaz kontrolü yapabilmelerini ve ürün geçmişi raporlarını PDF/Excel olarak alabilmelerini sağlayan RESTful bir API'dir.

###  Kullanılan Teknolojiler

- Node.js

- Express.js

- TypeScript

- Sequelize

- PostgreSQL

- Redis

- Socket.IO

- JSON Web Tokens (JWT)

- bcryptjs

- Postman


### Kurulum Adımları

1. Repoyu Klonla
```
git clone https://github.com/senanurtuncbilek/Smart-GreenhouseSystem.git
```

2. Paketleri Yükle
```
npm install
```

3. .env Dosyasını Oluştur
```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=*****
DB_PASS=*****
DB_NAME=greenhouse
JWT_SECRET=supersecurejwtsecret
REFRESH_TOKEN_SECRET=refresh_secret_key
REDIS_URL=redis://localhost:6379
```

4. Veritabanını Oluştur

PostgreSQL üzerinde greenhouse adında bir veritabanı oluşturun.

5. Uygulamayı Başlat
```
npm run dev
```

## API Testi

Tüm endpointler Postman koleksiyonunda mevcuttur. Proje dizinine SmartGreenhouseAPI.postman_collection.json dosyası eklenmiştir.



## API Özellikleri

# Authentication
```
POST /api/auth/register – Kullanıcı kaydı
```
```
POST /api/auth/login – Giriş yap
```
```
POST /api/auth/refresh – Token yenileme
```
# Greenhouse
```
POST /api/greenhouse/create
```
```
GET /api/greenhouse/:userId
```
# Sensor
```
POST /api/sensor
```
```
GET /api/sensor/:greenhouseId
```
```
GET /api/sensor/redis/:greenhouseId
```
# Automation
```
POST /api/automation/create
```
```
GET /api/automation/:greenhouseId
```
# Crop History
```
POST /api/crophistory/create
```
```
GET /api/crophistory/:greenhouseId
```
```
GET /api/crophistory/report/:greenhouseId?start=YYYY-MM-DD&end=YYYY-MM-DD
```
```
GET /api/crophistory/export/pdf/:greenhouseId?start=...&end=...
```
```
GET /api/crophistory/export/excel/:greenhouseId?start=...&end=...
```

# Zone (Bölgelendirme)
```
POST /api/zone/create
```
```
GET /api/zone/:greenhouseId
```