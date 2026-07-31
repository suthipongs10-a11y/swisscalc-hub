# โปรเน็ตเสริม.com — Deploy บน Cloudflare Pages

เว็บนี้เป็น **static HTML ที่ generate ไว้ล่วงหน้าและ commit ลง repo แล้ว** — ไม่ต้อง build บน Cloudflare ก็ได้
ไฟล์ทุกหน้า generate จาก `data/*.json` ด้วย `node build.cjs` (รันในโฟลเดอร์นี้) แล้ว commit ผลลัพธ์

## ตั้งค่า Cloudflare Pages (โปรเจกต์ใหม่ แยกจาก calcswiss)

1. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git**
2. เลือก repo `suthipongs10-a11y/swisscalc-hub` และ branch ที่ deploy
3. ตั้งค่า build:

   | ช่อง | ค่า |
   |---|---|
   | Project name | `pronetserm` (หรือชื่อที่ต้องการ) |
   | Production branch | `main` (หรือ branch ที่ใช้จริง) |
   | **Root directory** | `pronetserm` ← สำคัญที่สุด |
   | Build command | *(เว้นว่าง)* |
   | Build output directory | `/` |

   > ถ้าอยากให้ Cloudflare regenerate เองทุก deploy: Build command = `node build.cjs`, output = `/` (ผลเท่ากัน เพราะ generator เขียนทับในโฟลเดอร์เดียวกัน)

4. **Custom domain:** ผูก `โปรเน็ตเสริม.com` → กรอกเป็น punycode `xn--m3chf0ahc2cze1ecq8d.com` และ `www.xn--m3chf0ahc2cze1ecq8d.com`
   - canonical ในโค้ดชี้ที่ `https://www.xn--m3chf0ahc2cze1ecq8d.com` (มี www) — ตั้ง redirect apex → www ใน Cloudflare (Bulk Redirect หรือ Page Rule)
5. หลัง deploy ตรวจ: `/sitemap.xml` เปิดได้, `/robots.txt` เปิดได้, หน้าใดหน้าหนึ่งใน `/pro/` เปิดได้

## แก้เนื้อหา / เพิ่มหน้า

- ข้อมูลแพ็กเกจทั้งหมดอยู่ใน `data/packages.json` — **ราคา/รหัสสมัครเป็นข้อมูล verbatim ห้ามแก้ในโค้ด**
- หมายเหตุรายแพ็กเกจ (หน้า `/pro/`) อยู่ใน `data/pro-notes.json`
- บทความอยู่ใน `data/articles/*.json`
- แก้เสร็จรัน `node build.cjs` ในโฟลเดอร์นี้ → commit ทั้งไฟล์ data และ HTML ที่เปลี่ยน

## หมายเหตุ

- `verify.cjs` เป็นสคริปต์ตรวจเทียบกับเว็บเก่าตอน migrate (พาธ Windows) — เก็บไว้เป็นประวัติ ใช้รันที่นี่ไม่ได้
- AdSense: เว็บนี้ผ่านการอนุมัติแล้ว หากใส่โค้ดโฆษณา ให้เพิ่ม `ads.txt` ในโฟลเดอร์นี้ด้วย
