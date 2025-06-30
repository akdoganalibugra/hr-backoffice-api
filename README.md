# HR SaaS Backoffice API

Kurumsal SaaS/HR hizmetleri için NestJS + Prisma + PostgreSQL altyapısı ile geliştirilmiş modüler backend API sistemi.

## Proje Hakkında

Bu proje, kurumsal müşterilere HR hizmetleri sunan SaaS platformunun backoffice API'sini içermektedir. Sistem, temiz kod prensiplerine uygun olarak, gereksiz soyutlamalardan arındırılmış, doğrudan Prisma input tipleriyle çalışan modüler bir yapıda geliştirilmiştir.

## Teknoloji Stack

- **Backend Framework:** NestJS
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT
- **Password Hashing:** bcrypt
- **Validation:** class-validator
- **Environment Config:** @nestjs/config

## Geliştirme Durumu ve Roadmap

### ✅ Tamamlanan Modüller (AŞAMA 1 - MVP)

#### 1. ✅ Proje Altyapısı (`feat/project-init`)

- NestJS + Prisma + PostgreSQL kurulumu
- Global database service, config servisi
- Environment configuration (.env)
- Merkezi hata yönetimi ve validation

#### 2. ✅ Authentication & Users (`feat/auth-users`)

- JWT tabanlı authentication sistemi
- Kullanıcı kaydı, giriş ve profil yönetimi
- bcrypt ile şifreleme
- **API Endpoints:**
  - `POST /auth/register` - Kullanıcı kaydı
  - `POST /auth/login` - Kullanıcı girişi
  - `GET /users/profile` - Kullanıcı profil bilgisi
  - `PUT /users/profile` - Profil güncelleme

#### 3. ✅ Customers Management (`feat/customers`)

- Müşteri (şirket) CRUD işlemleri
- Müşteri veritabanı bağlantı testi
- JWT korumalı endpoints
- **API Endpoints:**
  - `GET /customers` - Müşteri listesi
  - `GET /customers/:id` - Müşteri detayı
  - `POST /customers` - Yeni müşteri ekleme
  - `PUT /customers/:id` - Müşteri güncelleme
  - `DELETE /customers/:id` - Müşteri silme
  - `POST /customers/:id/test-connection` - DB bağlantı testi

---

### 🔄 Geliştirilmekte Olan Modüller

#### 4. ⏳ Services Management (`services`)

#### 5. ⏳ Package Management (`packages`)

---

### 📋 Planlanan Modüller (AŞAMA 1 - MVP Tamamlama)

#### 6. 📌 Customer Package Assignment (`customer-packages`)

#### 7. 📌 Usage Tracking (`usages`)

#### 8. 📌 Basic Billing (`billings`)

### 🚀 Gelişmiş Özellikler (AŞAMA 2)

#### 9. 📋 Automated Usage Collection (`cron-usage-collector`)

### ⚡ Performans ve İleri Düzey (AŞAMA 3)

#### 10. 📋 Performance & Caching (`performance-caching`)

- Redis cache entegrasyonu
- Rate limiting

#### 11. 📋 Background Jobs (`background-jobs`)

- RabbitMQ/asenkron job işleme
- Toplu işlemler ve bildirimler

---

### 🏗️ Teknik Altyapı Özellikleri

- **Database**: PostgreSQL + Prisma ORM
- **Architecture**: Modüler NestJS yapısı
- **Security**: JWT authentication, bcrypt password hashing
- **Validation**: Global validation pipeline
- **Environment**: Secure .env configuration
- **Data**: Türkçe seed data

## Kurulum ve Çalıştırma

### Gereksinimler

- Node.js (v18+ önerilen)
- PostgreSQL (v12+)
- npm veya yarn

### 1. Proje Kurulumu

```bash
# Projeyi klonla
git clone <repository-url>
cd hr-backoffice-api

# Bağımlılıkları yükle
npm install
```

### 2. Veritabanı Kurulumu

```bash
# .env dosyasını oluştur
cp .env.example .env

# .env dosyasını düzenle ve DATABASE_URL'i ayarla
# DATABASE_URL="postgresql://username:password@localhost:5432/hr_backoffice_db"

# Prisma migration'larını çalıştır
npx prisma migrate dev

# Seed verilerini yükle (opsiyonel)
npm run db:seed
```

### 3. Uygulamayı Çalıştır

```bash
# Development modda çalıştır
npm run start:dev

# Production modda çalıştır
npm run start:prod

# Build et
npm run build
```

### 4. Veritabanı Yönetimi

```bash
# Prisma Studio'yu aç (veritabanını görselleştir)
npx prisma studio

# Yeni migration oluştur
npx prisma migrate dev --name <migration-name>

# Prisma client'ı yeniden oluştur
npx prisma generate
```

## API Dokümantasyonu

### Postman Collection

API'yi test etmek için hazır Postman collection dosyası:

- **Dosya**: `docs/postman-collection.json`
- **İçerik**: Tüm mevcut endpoint'ler, örnek seed data ile test senaryoları
- **Kullanım**: Postman'a import edin ve test etmeye başlayın

#### Postman Collection Özellikleri:

- ✅ JWT token otomatik yönetimi (login sonrası otomatik set)
- ✅ Environment variables (base_url, jwt_token)
- ✅ Seed data ile test örnekleri
- ✅ Tüm Auth, Users ve Customers endpoint'leri

#### Hızlı Test Adımları:

1. Postman'da `docs/postman-collection.json` dosyasını import edin
2. `Test Data Examples` > `Login with Seed User (Admin)` ile giriş yapın
3. Otomatik JWT token set edilecek
4. Diğer endpoint'leri test edin

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
