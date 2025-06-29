import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seed verisi ekleniyor...');

  // 1. Users (Kullanıcılar)
  console.log('Kullanıcılar ekleniyor...');

  const hashedPassword = await bcrypt.hash('password123', 10);

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'admin@hrbackoffice.com' },
      update: {},
      create: {
        email: 'admin@hrbackoffice.com',
        password: hashedPassword,
        firstName: 'Ahmet',
        lastName: 'Yılmaz',
        role: 'SUPER_ADMIN',
        status: 'ACTIVE',
      },
    }),
    prisma.user.upsert({
      where: { email: 'mehmet.ozkan@hrbackoffice.com' },
      update: {},
      create: {
        email: 'mehmet.ozkan@hrbackoffice.com',
        password: hashedPassword,
        firstName: 'Mehmet',
        lastName: 'Özkan',
        role: 'ADMIN',
        status: 'ACTIVE',
      },
    }),
    prisma.user.upsert({
      where: { email: 'ayse.demir@hrbackoffice.com' },
      update: {},
      create: {
        email: 'ayse.demir@hrbackoffice.com',
        password: hashedPassword,
        firstName: 'Ayşe',
        lastName: 'Demir',
        role: 'USER',
        status: 'ACTIVE',
      },
    }),
  ]);

  // 2. Services (Hizmetler)
  console.log('Hizmetler ekleniyor...');

  const services = await Promise.all([
    prisma.service.upsert({
      where: { name: 'İK Yönetim Sistemi' },
      update: {},
      create: {
        name: 'İK Yönetim Sistemi',
        description:
          'Çalışan bilgilerini yönetmek ve İK süreçlerini takip etmek için temel hizmet',
        unit: 'USER',
        basePrice: 25,
        status: 'ACTIVE',
      },
    }),
    prisma.service.upsert({
      where: { name: 'Bordro Hesaplama' },
      update: {},
      create: {
        name: 'Bordro Hesaplama',
        description: 'Çalışan maaş bordrosu hesaplama ve SGK bildirimleri',
        unit: 'COUNT',
        basePrice: 5,
        status: 'ACTIVE',
      },
    }),
    prisma.service.upsert({
      where: { name: 'Mesai Takip Sistemi' },
      update: {},
      create: {
        name: 'Mesai Takip Sistemi',
        description: 'Çalışan giriş-çıkış ve mesai saatleri takibi',
        unit: 'USER',
        basePrice: 15,
        status: 'ACTIVE',
      },
    }),
    prisma.service.upsert({
      where: { name: 'İzin Yönetimi' },
      update: {},
      create: {
        name: 'İzin Yönetimi',
        description:
          'Yıllık izin, hastalık izni ve diğer izin türlerinin yönetimi',
        unit: 'USER',
        basePrice: 10,
        status: 'ACTIVE',
      },
    }),
    prisma.service.upsert({
      where: { name: 'Performans Değerlendirme' },
      update: {},
      create: {
        name: 'Performans Değerlendirme',
        description:
          'Çalışan performans değerlendirme ve geri bildirim sistemi',
        unit: 'USER',
        basePrice: 20,
        status: 'ACTIVE',
      },
    }),
    prisma.service.upsert({
      where: { name: 'Rapor ve Analiz' },
      update: {},
      create: {
        name: 'Rapor ve Analiz',
        description: 'İK metrikleri, raporlar ve analiz hizmetleri',
        unit: 'COUNT',
        basePrice: 3,
        status: 'ACTIVE',
      },
    }),
    prisma.service.upsert({
      where: { name: 'Veri Depolama' },
      update: {},
      create: {
        name: 'Veri Depolama',
        description: 'Müşteri verilerinin güvenli depolanması',
        unit: 'GB',
        basePrice: 2.5,
        status: 'ACTIVE',
      },
    }),
  ]);

  // 3. Packages (Paketler)
  console.log('Paketler ekleniyor...');

  const packages = await Promise.all([
    prisma.package.upsert({
      where: { name: 'Temel İK Paketi' },
      update: {},
      create: {
        name: 'Temel İK Paketi',
        description:
          'Küçük işletmeler için temel İK hizmetleri paketi (10 çalışana kadar)',
        type: 'FIXED',
        basePrice: 299,
        status: 'ACTIVE',
      },
    }),
    prisma.package.upsert({
      where: { name: 'Profesyonel İK Paketi' },
      update: {},
      create: {
        name: 'Profesyonel İK Paketi',
        description:
          'Orta ölçekli şirketler için gelişmiş İK çözümleri (50 çalışana kadar)',
        type: 'FIXED',
        basePrice: 799,
        status: 'ACTIVE',
      },
    }),
    prisma.package.upsert({
      where: { name: 'Kurumsal İK Paketi' },
      update: {},
      create: {
        name: 'Kurumsal İK Paketi',
        description:
          'Büyük şirketler için kapsamlı İK yönetim sistemi (sınırsız çalışan)',
        type: 'FIXED',
        basePrice: 1999,
        status: 'ACTIVE',
      },
    }),
    prisma.package.upsert({
      where: { name: 'Kullandığın Kadar Öde' },
      update: {},
      create: {
        name: 'Kullandığın Kadar Öde',
        description: 'Kullanıma göre ödeme yapılan esnek paket',
        type: 'PAY_AS_GO',
        basePrice: null,
        status: 'ACTIVE',
      },
    }),
    prisma.package.upsert({
      where: { name: 'Özel Çözüm Paketi' },
      update: {},
      create: {
        name: 'Özel Çözüm Paketi',
        description: 'Büyük kurumlar için özelleştirilmiş İK çözümleri',
        type: 'CUSTOM',
        basePrice: null,
        status: 'ACTIVE',
      },
    }),
  ]);

  // 4. Package Services (Paket-Servis İlişkileri)
  console.log('Paket-Servis ilişkileri ekleniyor...');

  // Temel İK Paketi
  await Promise.all([
    prisma.packageService.upsert({
      where: {
        packageId_serviceId: {
          packageId: packages[0].id,
          serviceId: services[0].id, // İK Yönetim Sistemi
        },
      },
      update: {},
      create: {
        packageId: packages[0].id,
        serviceId: services[0].id,
        limit: 10, // 10 çalışan
        price: 20,
      },
    }),
    prisma.packageService.upsert({
      where: {
        packageId_serviceId: {
          packageId: packages[0].id,
          serviceId: services[1].id, // Bordro Hesaplama
        },
      },
      update: {},
      create: {
        packageId: packages[0].id,
        serviceId: services[1].id,
        limit: 50, // 50 bordro
        price: 4,
      },
    }),
    prisma.packageService.upsert({
      where: {
        packageId_serviceId: {
          packageId: packages[0].id,
          serviceId: services[6].id, // Veri Depolama
        },
      },
      update: {},
      create: {
        packageId: packages[0].id,
        serviceId: services[6].id,
        limit: 5, // 5 GB
        price: 2,
      },
    }),
  ]);

  // Profesyonel İK Paketi
  await Promise.all([
    prisma.packageService.upsert({
      where: {
        packageId_serviceId: {
          packageId: packages[1].id,
          serviceId: services[0].id, // İK Yönetim Sistemi
        },
      },
      update: {},
      create: {
        packageId: packages[1].id,
        serviceId: services[0].id,
        limit: 50, // 50 çalışan
        price: 18,
      },
    }),
    prisma.packageService.upsert({
      where: {
        packageId_serviceId: {
          packageId: packages[1].id,
          serviceId: services[1].id, // Bordro Hesaplama
        },
      },
      update: {},
      create: {
        packageId: packages[1].id,
        serviceId: services[1].id,
        limit: 200, // 200 bordro
        price: 3.5,
      },
    }),
    prisma.packageService.upsert({
      where: {
        packageId_serviceId: {
          packageId: packages[1].id,
          serviceId: services[2].id, // Mesai Takip
        },
      },
      update: {},
      create: {
        packageId: packages[1].id,
        serviceId: services[2].id,
        limit: 50, // 50 çalışan
        price: 12,
      },
    }),
    prisma.packageService.upsert({
      where: {
        packageId_serviceId: {
          packageId: packages[1].id,
          serviceId: services[3].id, // İzin Yönetimi
        },
      },
      update: {},
      create: {
        packageId: packages[1].id,
        serviceId: services[3].id,
        limit: 50, // 50 çalışan
        price: 8,
      },
    }),
    prisma.packageService.upsert({
      where: {
        packageId_serviceId: {
          packageId: packages[1].id,
          serviceId: services[6].id, // Veri Depolama
        },
      },
      update: {},
      create: {
        packageId: packages[1].id,
        serviceId: services[6].id,
        limit: 20, // 20 GB
        price: 2,
      },
    }),
  ]);

  // Kurumsal İK Paketi (Tüm hizmetler dahil)
  await Promise.all(
    services.map((service) =>
      prisma.packageService.upsert({
        where: {
          packageId_serviceId: {
            packageId: packages[2].id,
            serviceId: service.id,
          },
        },
        update: {},
        create: {
          packageId: packages[2].id,
          serviceId: service.id,
          limit: null, // Sınırsız
          price: Number(service.basePrice) * 0.8, // %20 indirim
        },
      }),
    ),
  );

  // 5. Customers (Müşteriler)
  console.log('Müşteriler ekleniyor...');

  const customers = await Promise.all([
    prisma.customer.upsert({
      where: { email: 'info@teknolojias.com' },
      update: {},
      create: {
        name: 'Teknoloji A.Ş.',
        email: 'info@teknolojias.com',
        phone: '+90 212 555 0101',
        address: 'Maslak Mahallesi, Büyükdere Caddesi No:123, Sarıyer/İstanbul',
        connectionString:
          'postgresql://user:pass@db1.example.com:5432/teknoloji_db',
        status: 'ACTIVE',
      },
    }),
    prisma.customer.upsert({
      where: { email: 'contact@yazilimgrup.com' },
      update: {},
      create: {
        name: 'Yazılım Grup Ltd. Şti.',
        email: 'contact@yazilimgrup.com',
        phone: '+90 216 444 0202',
        address: 'Bağdat Caddesi No:456, Kadıköy/İstanbul',
        connectionString:
          'postgresql://user:pass@db2.example.com:5432/yazilim_db',
        status: 'ACTIVE',
      },
    }),
    prisma.customer.upsert({
      where: { email: 'bilgi@danismanlikkurum.com' },
      update: {},
      create: {
        name: 'Danışmanlık Kurumu',
        email: 'bilgi@danismanlikkurum.com',
        phone: '+90 312 333 0303',
        address: 'Çankaya Mahallesi, Atatürk Bulvarı No:789, Çankaya/Ankara',
        connectionString:
          'postgresql://user:pass@db3.example.com:5432/danismanlik_db',
        status: 'ACTIVE',
      },
    }),
    prisma.customer.upsert({
      where: { email: 'info@startupfirma.com' },
      update: {},
      create: {
        name: 'Startup Firma',
        email: 'info@startupfirma.com',
        phone: '+90 232 777 0404',
        address: 'Alsancak Mahallesi, Kordon Caddesi No:321, Konak/İzmir',
        connectionString:
          'postgresql://user:pass@db4.example.com:5432/startup_db',
        status: 'ACTIVE',
      },
    }),
  ]);

  // 6. Customer Packages (Müşteri-Paket İlişkileri)
  console.log('Müşteri-paket ilişkileri ekleniyor...');

  await Promise.all([
    prisma.customerPackage.upsert({
      where: {
        customerId_packageId_status: {
          customerId: customers[0].id,
          packageId: packages[1].id, // Profesyonel İK Paketi
          status: 'ACTIVE',
        },
      },
      update: {},
      create: {
        customerId: customers[0].id,
        packageId: packages[1].id,
        status: 'ACTIVE',
        startDate: new Date('2025-06-29'),
      },
    }),
    prisma.customerPackage.upsert({
      where: {
        customerId_packageId_status: {
          customerId: customers[1].id,
          packageId: packages[0].id, // Temel İK Paketi
          status: 'ACTIVE',
        },
      },
      update: {},
      create: {
        customerId: customers[1].id,
        packageId: packages[0].id,
        status: 'ACTIVE',
        startDate: new Date('2025-06-29'),
      },
    }),
    prisma.customerPackage.upsert({
      where: {
        customerId_packageId_status: {
          customerId: customers[2].id,
          packageId: packages[2].id, // Kurumsal İK Paketi
          status: 'ACTIVE',
        },
      },
      update: {},
      create: {
        customerId: customers[2].id,
        packageId: packages[2].id,
        status: 'ACTIVE',
        startDate: new Date('2025-06-15'),
      },
    }),
    prisma.customerPackage.upsert({
      where: {
        customerId_packageId_status: {
          customerId: customers[3].id,
          packageId: packages[3].id, // Kullandığın Kadar Öde
          status: 'ACTIVE',
        },
      },
      update: {},
      create: {
        customerId: customers[3].id,
        packageId: packages[3].id,
        status: 'ACTIVE',
        startDate: new Date('2025-06-13'),
      },
    }),
  ]);

  // 7. Usage Records (Kullanım Kayıtları)
  console.log('Kullanım kayıtları ekleniyor...');

  const currentMonth = '2025-06';
  const lastMonth = '2025-05';

  await Promise.all([
    // Teknoloji A.Ş. kullanımları
    prisma.usage.upsert({
      where: {
        customerId_serviceId_period: {
          customerId: customers[0].id,
          serviceId: services[0].id, // İK Yönetim
          period: currentMonth,
        },
      },
      update: {},
      create: {
        customerId: customers[0].id,
        serviceId: services[0].id,
        amount: 35, // 35 çalışan
        period: currentMonth,
      },
    }),
    prisma.usage.upsert({
      where: {
        customerId_serviceId_period: {
          customerId: customers[0].id,
          serviceId: services[1].id, // Bordro
          period: currentMonth,
        },
      },
      update: {},
      create: {
        customerId: customers[0].id,
        serviceId: services[1].id,
        amount: 105, // 105 bordro
        period: currentMonth,
      },
    }),

    // Yazılım Grup kullanımları
    prisma.usage.upsert({
      where: {
        customerId_serviceId_period: {
          customerId: customers[1].id,
          serviceId: services[0].id, // İK Yönetim
          period: currentMonth,
        },
      },
      update: {},
      create: {
        customerId: customers[1].id,
        serviceId: services[0].id,
        amount: 8, // 8 çalışan
        period: currentMonth,
      },
    }),
    prisma.usage.upsert({
      where: {
        customerId_serviceId_period: {
          customerId: customers[1].id,
          serviceId: services[6].id, // Veri Depolama
          period: currentMonth,
        },
      },
      update: {},
      create: {
        customerId: customers[1].id,
        serviceId: services[6].id,
        amount: 3, // 3 GB
        period: currentMonth,
      },
    }),

    // Danışmanlık Kurumu kullanımları
    prisma.usage.upsert({
      where: {
        customerId_serviceId_period: {
          customerId: customers[2].id,
          serviceId: services[0].id, // İK Yönetim
          period: currentMonth,
        },
      },
      update: {},
      create: {
        customerId: customers[2].id,
        serviceId: services[0].id,
        amount: 150, // 150 çalışan
        period: currentMonth,
      },
    }),
    prisma.usage.upsert({
      where: {
        customerId_serviceId_period: {
          customerId: customers[2].id,
          serviceId: services[4].id, // Performans Değerlendirme
          period: currentMonth,
        },
      },
      update: {},
      create: {
        customerId: customers[2].id,
        serviceId: services[4].id,
        amount: 120, // 120 değerlendirme
        period: currentMonth,
      },
    }),
  ]);

  // 8. Billing Records (Faturalar)
  console.log('Faturalar ekleniyor...');

  await Promise.all([
    prisma.billing.upsert({
      where: {
        customerId_period: {
          customerId: customers[0].id,
          period: lastMonth,
        },
      },
      update: {},
      create: {
        customerId: customers[0].id,
        amount: 799, // Profesyonel paket fiyatı
        period: lastMonth,
        status: 'PAID',
        dueDate: new Date('2025-04-30'),
        paidDate: new Date('2025-04-25'),
      },
    }),
    prisma.billing.upsert({
      where: {
        customerId_period: {
          customerId: customers[0].id,
          period: currentMonth,
        },
      },
      update: {},
      create: {
        customerId: customers[0].id,
        amount: 845, // Ek kullanım ile birlikte
        period: currentMonth,
        status: 'PENDING',
        dueDate: new Date('2025-06-30'),
      },
    }),
    prisma.billing.upsert({
      where: {
        customerId_period: {
          customerId: customers[1].id,
          period: currentMonth,
        },
      },
      update: {},
      create: {
        customerId: customers[1].id,
        amount: 299, // Temel paket fiyatı
        period: currentMonth,
        status: 'PENDING',
        dueDate: new Date('2025-06-30'),
      },
    }),
    prisma.billing.upsert({
      where: {
        customerId_period: {
          customerId: customers[2].id,
          period: currentMonth,
        },
      },
      update: {},
      create: {
        customerId: customers[2].id,
        amount: 1999, // Kurumsal paket fiyatı
        period: currentMonth,
        status: 'PAID',
        dueDate: new Date('2025-05-30'),
        paidDate: new Date('2025-05-15'),
      },
    }),
  ]);

  // 9. Notifications (Bildirimler)
  console.log('Bildirimler ekleniyor...');

  await Promise.all([
    prisma.notification.create({
      data: {
        customerId: customers[0].id,
        type: 'LIMIT_WARNING',
        title: 'Kullanım Limiti Uyarısı',
        message:
          "İK Yönetim Sistemi kullanımınız aylık limitinizin %80'ine ulaştı. Mevcut kullanım: 35/50 çalışan.",
        status: 'SENT',
        sentAt: new Date('2025-06-20T10:30:00Z'),
      },
    }),
    prisma.notification.create({
      data: {
        customerId: customers[1].id,
        type: 'BILLING_DUE',
        title: 'Fatura Vadesi Yaklaşıyor',
        message:
          'Aralık ayı faturanızın vadesi 31 Aralık 2024. Toplam tutar: ₺299,00',
        status: 'SENT',
        sentAt: new Date('2025-06-25T09:00:00Z'),
      },
    }),
    prisma.notification.create({
      data: {
        customerId: customers[3].id,
        type: 'PACKAGE_UPGRADE',
        title: 'Paket Yükseltme Önerisi',
        message:
          'Kullanım alışkanlıklarınıza göre Temel İK Paketi size daha uygun olabilir. Aylık %25 tasarruf sağlayabilirsiniz.',
        status: 'PENDING',
      },
    }),
    prisma.notification.create({
      data: {
        type: 'SYSTEM_ALERT',
        title: 'Sistem Bakımı Bildirimi',
        message:
          'Sistem bakımı nedeniyle 1 Ocak 2025 saat 02:00-06:00 arası hizmetlerimizde kesinti yaşanabilir.',
        status: 'PENDING',
      },
    }),
  ]);

  console.log('Tüm seed verileri başarıyla eklendi!');
  console.log(`
Eklenen veriler:
- ${users.length} kullanıcı
- ${services.length} hizmet
- ${packages.length} paket
- ${customers.length} müşteri
- Çoklu paket-hizmet ilişkisi
- Çoklu müşteri-paket ilişkisi
- Çoklu kullanım kaydı
- Çoklu fatura
- Çoklu bildirim
  `);
}

main()
  .catch((e) => {
    console.error('Seed hatası:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
