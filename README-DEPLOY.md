# โปรเน็ตเสริม.com — Deploy บน Cloudflare Pages

เว็บนี้อยู่บน **branch `pronetserm`** ของ repo `suthipongs10-a11y/swisscalc-hub` โดย **root ของ branch คือ root ของเว็บ** (index.html, sitemap.xml, robots.txt อยู่บนสุด) — แยกขาดจาก branch หลักซึ่งเป็นเว็บ calcswiss (Astro)

เว็บเป็น **static HTML ที่ generate ไว้ล่วงหน้าและ commit แล้ว** — ไม่ต้อง build บน Cloudflare
ทุกหน้า generate จาก `data/*.json` ด้วย `node build.cjs` แล้ว commit ผลลัพธ์

## ตั้งค่า Cloudflare Pages (โปรเจกต์ `pronetserm`)

ใช้โปรเจกต์เดิมที่มีอยู่ (จะได้เก็บ URL `pronetserm.pages.dev` ไว้) → **Settings → Builds & deployments**:

| ช่อง | ค่า |
|---|---|
| Production branch | `pronetserm` ← เปลี่ยนมาชี้ branch นี้ |
| Framework preset | None |
| Build command | *(เว้นว่าง — ห้ามใส่คำสั่งรัน server ใดๆ)* |
| Build output directory | `/` |
| Root directory | *(เว้นว่าง / ค่า default)* |

จากนั้น **Deployments → Retry deployment** (หรือ Create deployment เลือก branch `pronetserm`)

> แนะนำเพิ่ม: Settings → Builds & deployments → **Preview deployments = None**
> เพื่อไม่ให้ push ของ branch ฝั่ง calcswiss มา trigger preview build ในโปรเจกต์นี้

1. **Custom domain:** ผูก `โปรเน็ตเสริม.com` → กรอกเป็น punycode `xn--m3chf0ahc2cze1ecq8d.com` และ `www.xn--m3chf0ahc2cze1ecq8d.com`
   - canonical ในโค้ดชี้ที่ `https://www.xn--m3chf0ahc2cze1ecq8d.com` (มี www) — ตั้ง redirect apex → www ใน Cloudflare (Bulk Redirect หรือ Page Rule)
2. หลัง deploy ตรวจ: `/sitemap.xml` เปิดได้, `/robots.txt` เปิดได้, หน้าใดหน้าหนึ่งใน `/pro/` เปิดได้

## แก้เนื้อหา / เพิ่มหน้า

งานทั้งหมดของเว็บนี้ทำบน branch `pronetserm` (จาก clone ของ branch หลัก ใช้ worktree ได้:
`git fetch origin pronetserm && git worktree add ../pronetserm-site pronetserm`)

- ข้อมูลแพ็กเกจทั้งหมดอยู่ใน `data/packages.json` — **ราคา/รหัสสมัครเป็นข้อมูล verbatim ห้ามแก้ในโค้ด**
- หมายเหตุรายแพ็กเกจ (หน้า `/pro/`) อยู่ใน `data/pro-notes.json`
- บทความอยู่ใน `data/articles/*.json`
- แก้เสร็จรัน `node build.cjs` ที่ root ของ branch → commit ทั้งไฟล์ data และ HTML ที่เปลี่ยน → push ไป `origin pronetserm` (Cloudflare deploy อัตโนมัติ)

## หมายเหตุ

- `verify.cjs` เป็นสคริปต์ตรวจเทียบกับเว็บเก่าตอน migrate (พาธ Windows) — เก็บไว้เป็นประวัติ ใช้รันที่นี่ไม่ได้
- AdSense: เว็บนี้ผ่านการอนุมัติแล้ว หากใส่โค้ดโฆษณา ให้เพิ่ม `ads.txt` ในโฟลเดอร์นี้ด้วย
