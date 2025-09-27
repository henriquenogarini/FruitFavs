**Projeto 01 - Disciplina: Programação Web Full Stack**  
**Foco: Desenvolvimento Front-end com biblioteca React.js e consumo de uma API aberta**

---

## 📋 Sobre o Projeto

FruitFavs é uma aplicação web desenvolvida em React que permite aos usuários explorar informações nutricionais sobre diversas frutas, podendo favoritar suas preferidas e visualizar detalhes completos de cada uma.

### 🎯 Objetivos
- Consumir API REST externa de forma eficiente
- Implementar sistema de favoritos com persistência local
- Criar interface responsiva e acessível
- Demonstrar boas práticas em React e JavaScript
- Utilização de uma biblioteca externa como conjunto **Formik**


---

## 👨‍🏫 Informações Acadêmicas

**Universidade:** Universidade Tecnológica Federal do Paraná - Campus Cornélio Procópio (UTFPR-CP)

**Disciplina:** ES47B - Programação Web Full Stack  

**Professor:** Prof. Dr. Willian Massami Watanabe

**Aluno:** Henrique Cesar Nogarini de Carvalho

**RA:** 2102374

**Semestre:** 2025/2

---

## 🌐 API Consumida

### **Fruityvice API**
- **URL Base:** `https://www.fruityvice.com/`
- **Documentação:** https://www.fruityvice.com/doc/index.html
- **Endpoints utilizados:**
  - `GET /api/fruit/all` - Lista todas as frutas
  - `GET /api/fruit/{name}` - Busca por nome
  - `GET /api/fruit/family/{family}` - Busca por família
  - `GET /api/fruit/genus/{genus}` - Busca por gênero
  - `GET /api/fruit/order/{order}` - Busca por ordem

### **Configuração de Proxy**
Como a API não possui CORS habilitado, foi configurado um proxy no Vite para resolver este problema:

```javascript
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/fv-api': {
        target: 'https://www.fruityvice.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fv-api/, '')
      }
    }
  }
})
```

---

## 🛠️ Tecnologias Utilizadas

### **Tecnologias Principais**
- **React.js** - Biblioteca principal para interface
- **Vite** - Build tool e dev server
- **JavaScript ES6+** - Linguagem de programação

### **Bibliotecas e Dependências**
- **Formik** - Gerenciamento de formulários e validação
- **CSS3** - Estilização responsiva sem frameworks externos

### **Ferramentas de Desenvolvimento**
- **Vite Dev Server** - Servidor de desenvolvimento

---

## 🏗️ Arquitetura e Decisões Técnicas

### **Estrutura de Pastas**
```
src/
├── components/          # Componentes React reutilizáveis
├── contexts/           # Context API para gerenciamento de estado global
├── apiAdapter.js       # Camada de abstração para API
├── styles.css          # Estilos globais da aplicação
└── main.jsx           # Ponto de entrada da aplicação
```

### **Principais Decisões Técnicas**

#### **1. Gerenciamento de Estado**
- **Context API + useReducer** para gerenciar favoritos globalmente
- **useState local** para estado específico de componentes
- **LocalStorage** para persistência de favoritos entre sessões

```javascript
// Exemplo: Reducer para favoritos
function favoriteReducer(state, action) {
  switch (action.type) {
    case "toggle":
      const exists = state.some(f => f.id === action.payload.id);
      return exists 
        ? state.filter(f => f.id !== action.payload.id) 
        : [...state, action.payload];
    // ...
  }
}
```

#### **2. Tratamento de Imagens**
**Problema:** A API Fruityvice retorna apenas dados textuais em JSON, sem imagens das frutas.

**Solução:** Implementação de mapeamento manual de emojis para representação visual:

```javascript
// Mapeamento manual baseado na documentação da API Fruityvice
// Emojis escolhidos para melhor representação visual de cada fruta
const fruits = {
  'Apple': '🍎',
  'Banana': '🍌',
  'Orange': '🍊',
  // ... 50+ frutas mapeadas manualmente
};
```

**Justificativa:** Esta abordagem garante consistência visual, carregamento instantâneo e funciona offline, sendo mais eficiente que buscar imagens externas.

**OBS:** Algumas frutas não possuem emoji, fazendo com que alguns ícones fossem reutilizados para mostrar as cores das frutas, porém o nome e dados delas estão corretos.


#### **3. Tratamento de Erros Robusto**
- Try-catch em todas as operações assíncronas
- Fallbacks visuais para estados de erro
- Mensagens de erro centralizadas no componente de busca

#### **4. Acessibilidade**
- Atributos ARIA para leitores de tela
- Navegação por teclado suportada
- Semântica HTML apropriada

---

## ⚡ Funcionalidades

### **🔍 Sistema de Busca**
- Busca por nome, família, gênero ou ordem taxonômica
- Validação de formulários com Formik
- Estados de loading e error bem definidos
- Limpeza automática de erros durante nova digitação

### **⭐ Sistema de Favoritos**
- Adicionar/remover frutas dos favoritos
- Persistência no localStorage
- Modal dedicado para visualizar favoritos
- Contador visual no header

### **📱 Interface Responsiva**
- Layout adaptável para desktop, tablet e mobile
- Grid responsivo com auto-fit
- Logo animada com efeitos de hover
- Modais centrados e acessíveis

### **🎨 Design System**
- Paleta de cores consistente com tema de frutas
- Animações CSS suaves (frutas flutuantes na logo)
- Feedback visual para interações do usuário

---

## 🚀 Como Executar

### **Pré-requisitos**
- Node.js 18+ instalado
- npm ou yarn como gerenciador de pacotes

### **Instalação**
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre no diretório
cd fruitfavs

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

### **Build para Produção**
```bash
npm run build
```

---

## 🔧 Configurações de Desenvolvimento

### **Proxy Configuration**
O projeto utiliza proxy para contornar limitações de CORS:
- Requests para `/fv-api/*` são redirecionados para `https://www.fruityvice.com/`
- Configuração no `vite.config.js`

---

## 📈 Possíveis Melhorias Futuras

- [ ] Implementar cache de requests para melhor performance
- [ ] Implementar paginação para grandes resultados
- [ ] Adicionar testes unitários com Jest.
- [ ] Adicionar animações de transição entre estados

---

### **⭐ Conceitos Aplicados:**
- Consumo de APIs REST
- Gerenciamento de estado em React
- Tratamento de erros assíncronos
- Persistência de dados no frontend
- Design responsivo e acessível
- Boas práticas de desenvolvimento React

---
