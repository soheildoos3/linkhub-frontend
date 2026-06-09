<div dir="rtl" align="center">

# 🔗 LinkHub

### پلتفرم حرفه‌ای اشتراک‌گذاری لینک (مشابه Linktree)

[![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi)](https://github.com/yourusername/linkhub-backend)
[![Frontend](https://img.shields.io/badge/Frontend-Next.js-000000?logo=next.js)](https://github.com/yourusername/linkhub-frontend)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

## 📸 پیش‌نمایش

<div align="center">
  <img src="screenshots/dashboard.png" alt="Dashboard" width="400"/>
  <img src="screenshots/public-page.png" alt="Public Page" width="400"/>
</div>

## ✨ قابلیت‌های کلیدی

- ✅ **صفحه عمومی شخصی** - هر کاربر یک صفحه اختصاصی برای لینک‌های خود دارد
- ✅ **مدیریت کامل لینک‌ها** - افزودن، ویرایش، حذف و مرتب‌سازی با drag & drop
- ✅ **پشتیبانی از ۲۱ پلتفرم** - اینستاگرام، تلگرام، سروش، ایتا، بله، روبیکا، آپارات و ...
- ✅ **QR کد اختصاصی** - برای هر لینک و صفحه عمومی
- ✅ **آمار بازدید** - نمودار و شمارنده کلیک برای هر لینک
- ✅ **جستجو و صفحه‌بندی** - در صفحه اصلی کاربران
- ✅ **دارک/لایت مود** - با قابلیت ذخیره تنظیمات
- ✅ **کاملاً ریسپانسیو** - تجربه کاربری عالی در تمام دستگاه‌ها

## 🛠 تکنولوژی‌ها

<div dir="ltr">

| بخش | تکنولوژی |
|------|-----------|
| **بک‌اند** | FastAPI, SQLAlchemy, PostgreSQL, Alembic, JWT |
| **فرانت‌اند** | Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, Zustand |

</div>

## 📂 ریپازیتوری‌ها

| پروژه | لینک | توضیحات |
|--------|------|----------|
| **بک‌اند** | [linkhub-backend](https://github.com/yourusername/linkhub-backend) | API سرویس + مستندات نصب |
| **فرانت‌اند** | [linkhub-frontend](https://github.com/yourusername/linkhub-frontend) | رابط کاربری + مستندات نصب |

## 🚀 اجرای سریع با Docker

```bash
# کلون کردن پروژه
git clone https://github.com/yourusername/linkhub.git
cd linkhub

# اجرا با docker-compose
docker-compose up -d