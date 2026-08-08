# Defeat Landing Page — Plan & UI/UX Specification (Shadcn UI Version)

Tài liệu định hướng và kế hoạch thiết kế UI/UX cho Landing Page dự án **defeat** dựa trên hệ sinh thái **Shadcn UI & Tailwind CSS**.

---

## 🎯 Định hướng & Triết lý thiết kế (Design Philosophy)

Landing page của **defeat** được thiết kế theo phong cách **Ultra-Minimalist Aesthetic**, tận dụng bộ component gọn gàng của **Shadcn UI**, tập trung vào typography và trải nghiệm thị giác cao cấp.

### Các nguyên tắc cốt lõi:
- ❌ **Không CTA** (Không nút *Buy Now*, *Sign Up*, *Try Free*...)
- ❌ **Không Pricing** (Không bảng giá, gói dịch vụ)
- ❌ **Không Status/Badge rườm rà** (Loại bỏ các v1.0 status, tag không cần thiết)
- ❌ **Không Bloatware** (Không pop-up, form liên hệ, chatbox)
- ✅ **Sử dụng Shadcn UI & Tailwind CSS**: Giao diện chuẩn mực, sạch sẽ, chuẩn Tailwind & Lucide Icons.

---

## 🎨 UI/UX Specifications

### 1. Style & Palette (Shadcn Slate Dark Mode)
- **Background**: Dark Zinc / Slate (`bg-zinc-950`)
- **Card Background**: `bg-zinc-900/50 backdrop-blur-md border-zinc-800`
- **Text**:
  - Primary Header: `text-zinc-100`
  - Muted Body: `text-zinc-400`
  - Glow Highlights: `text-violet-400` / `text-cyan-400`
- **Icons**: `lucide-react` (tối giản, sắc nét)

### 2. Cấu trúc Landing Page (Layout Structure)

```
+-------------------------------------------------------+
|  [LOGO] DEFEAT                                        |  <-- Minimal Header (Rút gọn, KHÔNG status)
+-------------------------------------------------------+
|                                                       |
|             EMBRACE THE SILENCE.                      |  <-- Hero Section
|             DEFEAT THE NOISE.                         |      (Big Typography & Subtle Ambient Glow)
|                                                       |
|      A sleek visual presentation of raw power.        |
|                                                       |
+-------------------------------------------------------+
|  [ Card 1 ]       |  [ Card 2 ]       |  [ Card 3 ]   |  <-- Shadcn UI Cards Grid
|  Pure Minimal     |  Zero Overhead    |  Uncompromising|      (Shadcn Card Component + Hover Glow)
+-------------------------------------------------------+
|                                                       |
|          [ Interactive Visual Node Canvas ]           |  <-- Minimal Aesthetic Graphic Node
|                                                       |
+-------------------------------------------------------+
|  © 2026 DEFEAT • Designed with purity                 |  <-- Minimal Footer
+-------------------------------------------------------+
```

---

## 🛠️ Triển khai Kỹ thuật (Technical Implementation Plan)

### 1. Cài đặt Tailwind CSS & Dependencies
- Cài đặt `tailwindcss`, `@tailwindcss/vite` (hoặc postcss setup), `clsx`, `tailwind-merge`, `lucide-react`.

### 2. Component System (Shadcn UI Pattern)
- `src/lib/utils.ts`: Helper `cn()` ghép class Tailwind.
- `src/components/ui/card.tsx`: Shadcn Card component.
- `src/components/ui/separator.tsx`: Shadcn Separator component.
- `src/App.tsx`: Landing page tổng thể sử dụng Shadcn UI components.

---

## 🚀 Các bước thực hiện tiếp theo

1. **Cài đặt Tailwind CSS & Shadcn primitives** (`lucide-react`, `clsx`, `tailwind-merge`).
2. **Cấu hình CSS Tailwind Dark Mode**.
3. **Triển khai `App.tsx`** với Shadcn Card, Typography tối giản và loại bỏ status tag.
4. **Chạy dev server & Linting check**.

