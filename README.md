
# 📅 Projeto Calendário Interativo

Este projeto é um **calendário interativo em JavaScript puro**, com destaque para:
- Exibição dinâmica dos dias do mês
- Navegação entre meses
- Destaque para o **dia atual**
- Marcação de **feriados nacionais do Brasil** com tooltip (`title`)
- Integração opcional com **API pública de feriados**

---

## 🔧 Funcionalidades

- 🗓️ Geração automática do calendário do mês atual
- 🔄 Botões para **mês anterior** e **próximo mês**
- 🎉 Feriados fixos e móveis destacados no calendário
- 📌 Tooltip com o nome do feriado ao passar o mouse
- 🌐 Possibilidade de consumir uma **API pública de feriados** para manter os dados sempre atualizados

---

## 🚀 Como usar

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/calendario-interativo.git
```

2. Abra o arquivo `index.html` diretamente no navegador:

```bash
cd calendario-interativo
start index.html
```

3. Pronto! O calendário será exibido.

---

## 🛠️ Estrutura do Projeto

```bash
📁 calendario-interativo/
├── index.html # Estrutura da página
├── css/
│ └── index.css # Estilização visual
├── js/
│ └── index.js # Lógica do calendário
└── README.md # Instruções e documentação       
```

---

## 🌍 API de Feriados (opcional)

Para usar feriados atualizados automaticamente, você pode consumir a [API Pública de Feriados Nacionais](https://brasilapi.com.br/docs#tag/Feriados) da BrasilAPI:

**Exemplo de uso:**
```javascript
fetch(`https://brasilapi.com.br/api/feriados/v1/${ano}`)
  .then(res => res.json())
  .then(feriados => {
    // marcar os feriados no calendário
  });
```

---

## 📌 Requisitos

- Navegador moderno (Chrome, Firefox, Edge, etc.)
- Não é necessário backend ou instalação de dependências

