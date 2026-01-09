# Design System - Dra. Andressa Mezzomo
**Versão:** 1.0 | **Data:** 9 de janeiro de 2026  
**Gerado por:** Senior UI/UX Engineer - ROI POSITIVO

---

## 1. 🎨 Configuração de Tema (Tailwind Config)

### 1.1 Objeto `theme.extend` para `tailwind.config.js`

```javascript
export default {
  theme: {
    extend: {
      colors: {
        // Paleta Dra. Andressa Mezzomo - Ouro Refinado & Sofisticação
        primary: {
          DEFAULT: "hsl(34 64% 53%)", // #AB8D5F - Ouro Arenado
          foreground: "hsl(210 40% 98%)",
          50: "hsl(34 80% 97%)",
          100: "hsl(34 75% 92%)",
          200: "hsl(34 72% 85%)",
          300: "hsl(34 68% 75%)",
          400: "hsl(34 66% 60%)",
          500: "hsl(34 64% 53%)", // Brand
          600: "hsl(34 60% 45%)",
          700: "hsl(34 58% 38%)",
          800: "hsl(34 55% 30%)",
          900: "hsl(34 50% 22%)",
        },
        secondary: {
          DEFAULT: "hsl(240 7% 67%)", // #AAACAD - Light Accent
          foreground: "hsl(222 84% 5%)",
          50: "hsl(240 6% 96%)",
          100: "hsl(240 6% 92%)",
          200: "hsl(240 6% 85%)",
          300: "hsl(240 6% 78%)",
          400: "hsl(240 6% 72%)",
          500: "hsl(240 7% 67%)",
          600: "hsl(240 5% 60%)",
          700: "hsl(240 5% 50%)",
          800: "hsl(240 4% 40%)",
          900: "hsl(240 4% 30%)",
        },
        accent: {
          DEFAULT: "hsl(34 64% 53%)", // Mesmo que Primary para coesão
          foreground: "hsl(210 40% 98%)",
        },
        dark: {
          base: "hsl(222 60% 8%)", // #050D32
          foreground: "hsl(210 40% 98%)",
        },
        light: {
          base: "hsl(0 0% 97.3%)", // #f7f7f7
          foreground: "hsl(222 84% 5%)",
        },
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
      },
      fontFamily: {
        sans: ["InterDisplay", "system-ui", "sans-serif"],
        serif: ["GeistMono", "serif"],
      },
      boxShadow: {
        none: "none",
        sm: "0 1px 2px 0 rgba(5, 13, 50, 0.05)",
        base: "0 1px 3px 0 rgba(5, 13, 50, 0.1), 0 1px 2px 0 rgba(5, 13, 50, 0.06)",
        md: "0 4px 6px -1px rgba(5, 13, 50, 0.1), 0 2px 4px -1px rgba(5, 13, 50, 0.06)",
        lg: "0 10px 15px -3px rgba(5, 13, 50, 0.1), 0 4px 6px -2px rgba(5, 13, 50, 0.05)",
        xl: "0 20px 25px -5px rgba(5, 13, 50, 0.1), 0 10px 10px -5px rgba(5, 13, 50, 0.04)",
        "2xl": "0 25px 50px -12px rgba(5, 13, 50, 0.15)",
        "premium": "0 20px 40px -15px rgba(171, 141, 95, 0.3)",
      },
      spacing: {
        0: "0",
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        6: "1.5rem",
        8: "2rem",
        12: "3rem",
        16: "4rem",
        24: "6rem",
        32: "8rem",
        40: "10rem",
      },
    },
  },
}
```

---

## 2. 📝 Guia de Tipografia

### 2.1 Hierarquia Visual

H1 - Headline Principal: 3rem / 3.75rem - Bold - #050D32  
H2 - Subtítulo de Seção: 2.25rem / 2.5rem - SemiBold - #050D32  
H3 - Subtítulo Secundário: 1.875rem - SemiBold - #050D32  
P - Corpo de Texto: 1rem - Regular - #050D32 (80%)  
Small - Texto de Suporte: 0.875rem - Regular - #AAACAD  
Caption - Texto Mínimo: 0.75rem - Regular - #AAACAD  

### 2.2 Exemplos Tailwind CSS

H1 Principal: `<h1 className="text-5xl font-bold text-dark-base tracking-tight">Transforme seu Sorriso com Precisão Digital</h1>`

H2 Subtítulo: `<h2 className="text-4xl font-semibold text-dark-base mt-8 mb-4">A Jornada Começa Aqui</h2>`

H3 Card Title: `<h3 className="text-3xl font-semibold text-dark-base mb-2">Facetas de Porcelana</h3>`

P Corpo Padrão: `<p className="text-base text-dark-base/80 leading-relaxed">Com tecnologia digital de ponta, criamos facetas personalizadas...</p>`

---

## 3. 🔧 Showcase de Componentes Fundamentais

### 3.1 Primary CTA Button

```jsx
<button className="
  relative inline-flex items-center justify-center 
  overflow-hidden rounded-lg 
  bg-primary hover:bg-primary-600 
  px-8 py-4 
  text-lg font-bold 
  text-white 
  shadow-lg hover:shadow-premium 
  transition-all duration-300 
  hover:scale-[1.02] 
  active:scale-95 
  disabled:opacity-50
">
  Agendar Consulta
</button>
```

### 3.2 Secondary Button

```jsx
<button className="
  inline-flex items-center justify-center 
  rounded-lg 
  border-2 border-primary 
  bg-light-base 
  px-6 py-3 
  text-base font-semibold 
  text-primary 
  hover:bg-primary/5 
  transition-colors duration-200
">
  Saiba Mais
</button>
```

### 3.3 Service Card

```jsx
<div className="
  group relative rounded-xl 
  bg-light-base 
  p-8 
  border border-secondary-200 
  shadow-base 
  hover:shadow-lg 
  hover:border-primary/30 
  transition-all duration-300
">
  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/0 rounded-t-xl" />
  <h3 className="text-2xl font-semibold text-dark-base mb-3">Facetas de Porcelana</h3>
  <p className="text-base text-dark-base/70 leading-relaxed mb-6">
    Com tecnologia digital de ponta, criamos facetas personalizadas que respeitam 
    a harmonia natural do seu rosto, durando até 15 anos.
  </p>
  <button className="text-primary font-semibold hover:underline">Saiba Mais →</button>
</div>
```

### 3.4 Input Field

```jsx
<div className="w-full">
  <label className="block text-sm font-semibold text-dark-base mb-2">
    Seu Nome *
  </label>
  <input
    type="text"
    placeholder="Ex: João Silva"
    className="
      w-full 
      rounded-lg 
      border-2 border-secondary-300 
      bg-light-base 
      px-4 py-3 
      text-base text-dark-base 
      placeholder:text-secondary-500
      focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
      transition-all duration-200
    "
  />
</div>
```

### 3.5 Badge Success

```jsx
<span className="
  inline-flex items-center gap-2 
  rounded-full 
  bg-success/10 
  px-4 py-1.5 
  text-sm font-semibold 
  text-success
">
  ✓ Aprovado
</span>
```

---

## 4. 📐 Composição Típica de Landing Page

```
Hero (60vh - Image + Overlay)
    ↓
Features (3 Cards Horizontais)
    ↓
Testimonials (Grid 2x2)
    ↓
How It Works (Timeline)
    ↓
Final CTA (Dark section com button)
    ↓
Footer
```

---

## 5. 🎯 Tokens Críticos

| Token | Valor | Uso |
|-------|-------|-----|
| Primary | #AB8D5F | CTAs, destaques, hover states |
| Dark Base | #050D32 | Textos principais, backgrounds estruturais |
| Light Base | #f7f7f7 | Backgrounds neutros, espaço respirável |
| Secondary | #AAACAD | Suporte, labels, elementos secondários |
| Border Radius | 0.5rem | Arredondamento consistente |

---

## 6. 📋 Checklist de Implementação

- [ ] Configurar `tailwind.config.js` com theme.extend
- [ ] Importar componentes Shadcn/UI (Button, Card, Input, Badge)
- [ ] Aplicar CSS customizado para `.glass-effect`, `.btn-cta`, `.animate-reveal`
- [ ] Criar biblioteca de componentes React
- [ ] Testar responsividade em mobile, tablet, desktop
- [ ] Validar contraste de cores (WCAG AA)
- [ ] Documentar variações de estado (hover, active, disabled)

---

## 7. 📚 Status

✅ Design System **PRONTO PARA USAR** nas gerações de Landing Pages.

Quando gerar uma nova LP:
1. Use APENAS componentes definidos aqui
2. Valide se cores e tipografia estão corretas
3. Teste a responsividade em múltiplos breakpoints
4. Versione em Git

---

**Design System criado com rigor técnico para máxima consistência e escalabilidade.**
ROI POSITIVO | Principal Conversion Engineer Team
