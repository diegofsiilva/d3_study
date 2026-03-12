import { useState, useEffect } from "react";

const questions = [
  // JSON Data
  {
    id: 1,
    topic: "D3 JSON Data",
    question: "O que significa a sigla JSON?",
    options: [
      "JavaScript Object Notation",
      "Java Standard Object Naming",
      "JavaScript Online Nodes",
      "JSON Serialized Object Network",
    ],
    answer: 0,
    explanation:
      "JSON significa JavaScript Object Notation — uma estrutura de dados onde os índices são nomeados e compostos por pares nome/valor.",
  },
  {
    id: 2,
    topic: "D3 JSON Data",
    question:
      "Em um array de objetos JSON chamado `jsonCircles`, como você acessa a cor do primeiro elemento?",
    options: [
      "jsonCircles.color[0]",
      "jsonCircles[1].color",
      "jsonCircles[0].color",
      "jsonCircles.get('color')",
    ],
    answer: 2,
    explanation:
      "Arrays em JavaScript são indexados a partir de 0. Portanto, `jsonCircles[0].color` acessa a propriedade 'color' do primeiro objeto.",
  },
  {
    id: 3,
    topic: "D3 JSON Data",
    question:
      "Qual é a vantagem de mover dados de cor de funções `if...else` para o próprio objeto JSON?",
    options: [
      "Torna o código mais lento",
      "Elimina valores hardcoded, facilitando manutenção quando os dados mudam",
      "Impede que o D3 leia os dados",
      "É obrigatório pelo padrão D3",
    ],
    answer: 1,
    explanation:
      "Valores hardcoded no código exigem alterações em múltiplos lugares quando os dados mudam. Mover esses valores para o JSON centraliza os dados e torna o código mais flexível.",
  },
  {
    id: 4,
    topic: "D3 JSON Data",
    question:
      "Qual função anônima D3 é usada para acessar o par nome/valor `x_axis` de um objeto JSON vinculado?",
    options: [
      "function(d) { return d['x_axis']; }",
      "function(d) { return d.x_axis; }",
      "Ambas as opções acima estão corretas",
      "function(x) { return x_axis; }",
    ],
    answer: 2,
    explanation:
      "Tanto a notação de ponto (`d.x_axis`) quanto a de colchetes (`d['x_axis']`) são formas válidas de acessar propriedades de objetos JSON em JavaScript.",
  },
  // Sankey
  {
    id: 5,
    topic: "Diagrama de Sankey",
    question:
      "Qual estrutura de dados é necessária para criar um diagrama de Sankey no D3?",
    options: [
      "Apenas um array de valores numéricos",
      "Um objeto com `nodes` (nós) e `links` (conexões)",
      "Uma matriz bidimensional",
      "Um arquivo CSV com colunas x e y",
    ],
    answer: 1,
    explanation:
      "O diagrama de Sankey requer dados com duas partes: `nodes` (características de cada elemento) e `links` (como os elementos se conectam).",
  },
  {
    id: 6,
    topic: "Diagrama de Sankey",
    question:
      "Por que é necessário adicionar a classe `.link` com `fill: none` no CSS ao construir um Sankey?",
    options: [
      "Para esconder os links do usuário",
      "Para os links aparecerem corretamente como linhas, não como formas preenchidas",
      "Para adicionar animações automáticas",
      "É um requisito do servidor de dados",
    ],
    answer: 1,
    explanation:
      "Sem `fill: none`, os paths SVG seriam renderizados como formas fechadas preenchidas em vez de fluxos curvos. O estilo CSS garante que os links apareçam como esperado.",
  },
  {
    id: 7,
    topic: "Diagrama de Sankey",
    question: "O que o método `sankey.nodeWidth()` controla?",
    options: [
      "A largura total do diagrama SVG",
      "A largura visual de cada retângulo de nó",
      "O espaçamento entre os links",
      "O número máximo de nós permitidos",
    ],
    answer: 1,
    explanation:
      "`nodeWidth()` define a largura em pixels dos retângulos que representam os nós no diagrama de Sankey.",
  },
  // Network
  {
    id: 8,
    topic: "Grafo de Rede",
    question:
      "Nos dados de rede do D3, como as colunas que definem conexões entre nós devem obrigatoriamente ser chamadas?",
    options: [
      "`from` e `to`",
      "`start` e `end`",
      "`source` e `target`",
      "`nodeA` e `nodeB`",
    ],
    answer: 2,
    explanation:
      "O D3 reconhece automaticamente `source` e `target` como os campos de conexão em dados de links para grafos de rede.",
  },
  {
    id: 9,
    topic: "Grafo de Rede",
    question: "Qual força `d3.forceManyBody()` com valor negativo simula?",
    options: [
      "Atração gravitacional entre todos os nós",
      "Repulsão entre os nós, como cargas elétricas do mesmo sinal",
      "Fixação dos nós em posições estáticas",
      "Movimentação aleatória dos nós",
    ],
    answer: 1,
    explanation:
      "Um valor negativo em `d3.forceManyBody().strength(-400)` cria repulsão entre os nós, evitando sobreposição e criando uma visualização mais legível.",
  },
  {
    id: 10,
    topic: "Grafo de Rede",
    question: "O que `d3.forceCenter(width/2, height/2)` faz na simulação?",
    options: [
      "Fixa todos os nós no centro do SVG",
      "Cria uma força que atrai os nós em direção ao centro da área SVG",
      "Define o tamanho máximo do grafo",
      "Impede que os nós saiam da área visível",
    ],
    answer: 1,
    explanation:
      "`forceCenter` cria uma força centrípeta suave que puxa o conjunto de nós em direção a um ponto central, mantendo o grafo visível na tela.",
  },
  // Geographic
  {
    id: 11,
    topic: "Mapas Geográficos",
    question: "O que é GeoJSON?",
    options: [
      "Um formato proprietário da Esri para shapefiles",
      "Um padrão baseado em JSON para representar dados geográficos",
      "Uma biblioteca JavaScript para renderizar tiles de mapa",
      "Um banco de dados geoespacial online",
    ],
    answer: 1,
    explanation:
      "GeoJSON é um padrão aberto baseado em JSON para representar dados geográficos, incluindo pontos, linhas e polígonos, com a especificação disponível em geojson.org.",
  },
  {
    id: 12,
    topic: "Mapas Geográficos",
    question:
      "Qual é a ordem correta dos parâmetros em uma função de projeção D3?",
    options: [
      "[latitude, longitude]",
      "[x, y]",
      "[longitude, latitude]",
      "[row, col]",
    ],
    answer: 2,
    explanation:
      "As funções de projeção D3 recebem `[longitude, latitude]` como entrada — atenção especial, pois é fácil confundir a ordem.",
  },
  {
    id: 13,
    topic: "Mapas Geográficos",
    question: "O que faz um `geoPath` generator no D3?",
    options: [
      "Baixa dados GeoJSON de um servidor",
      "Converte objetos GeoJSON em strings de path SVG ou Canvas",
      "Aplica cores a regiões do mapa automaticamente",
      "Calcula distâncias entre coordenadas geográficas",
    ],
    answer: 1,
    explanation:
      "Um geographic path generator recebe um objeto GeoJSON e retorna uma string de path SVG (atributo `d`), que pode ser usada diretamente em elementos `<path>`.",
  },
  {
    id: 14,
    topic: "Mapas Geográficos",
    question: "Qual projeção D3 é indicada para preservar área dos países?",
    options: [
      "geoMercator",
      "geoOrthographic",
      "geoAzimuthalEqualArea",
      "geoStereographic",
    ],
    answer: 2,
    explanation:
      "`geoAzimuthalEqualArea` é uma projeção que preserva a área, tornando-a adequada quando a representação proporcional do tamanho de regiões é importante.",
  },
  {
    id: 15,
    topic: "Mapas Geográficos",
    question: "Qual a principal diferença entre D3 maps e Leaflet/Google Maps?",
    options: [
      "D3 não suporta interações, Leaflet sim",
      "D3 usa tiles raster pré-renderizados, Leaflet usa vetores",
      "D3 solicita GeoJSON vetorial e renderiza no browser; Leaflet usa tiles de imagem pré-renderizados",
      "Leaflet é mais preciso geograficamente do que D3",
    ],
    answer: 2,
    explanation:
      "D3 trabalha com dados vetoriais GeoJSON renderizados no browser em SVG/Canvas, enquanto Leaflet e Google Maps carregam tiles de imagem de servidores — cada abordagem tem vantagens distintas.",
  },
];

const topicColors = {
  "D3 JSON Data": { bg: "#1a2744", accent: "#4fd1c5", tag: "#0d9488" },
  "Diagrama de Sankey": { bg: "#2d1b4e", accent: "#c084fc", tag: "#7c3aed" },
  "Grafo de Rede": { bg: "#1e3a2f", accent: "#86efac", tag: "#16a34a" },
  "Mapas Geográficos": { bg: "#2d1f14", accent: "#fb923c", tag: "#ea580c" },
};

export default function App() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showReview, setShowReview] = useState(false);

  const q = questions[current];
  const colors = topicColors[q?.topic] || topicColors["D3 JSON Data"];
  const progress = ((current) / questions.length) * 100;

  function handleSelect(idx) {
    if (!confirmed) setSelected(idx);
  }

  function handleConfirm() {
    if (selected === null) return;
    setConfirmed(true);
    const correct = selected === q.answer;
    if (correct) setScore((s) => s + 1);
    setAnswers((a) => [...a, { question: q.question, selected, correct, answer: q.answer, explanation: q.explanation, options: q.options }]);
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setConfirmed(false);
    }
  }

  function handleRestart() {
    setCurrent(0);
    setSelected(null);
    setConfirmed(false);
    setScore(0);
    setFinished(false);
    setAnswers([]);
    setShowReview(false);
  }

  const pct = Math.round((score / questions.length) * 100);
  const grade = pct >= 80 ? "Excelente" : pct >= 60 ? "Bom" : pct >= 40 ? "Regular" : "Precisa revisar";
  const gradeColor = pct >= 80 ? "#4fd1c5" : pct >= 60 ? "#86efac" : pct >= 40 ? "#fb923c" : "#f87171";

  if (finished) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f0f1a", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Georgia', serif", padding: "20px" }}>
        <div style={{ maxWidth: 600, width: "100%", textAlign: "center" }}>
          <div style={{ background: "#16162a", border: "1px solid #2a2a4a", borderRadius: 16, padding: "48px 36px" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>{pct >= 80 ? "🎓" : pct >= 60 ? "📊" : "📚"}</div>
            <h1 style={{ color: "#e2e8f0", fontSize: 28, marginBottom: 8, fontWeight: 700, letterSpacing: "-0.5px" }}>Prova Concluída</h1>
            <p style={{ color: "#94a3b8", marginBottom: 32, fontSize: 15 }}>D3.js — JSON, Sankey, Redes e Mapas</p>
            <div style={{ background: "#0f0f1a", borderRadius: 12, padding: "32px 24px", marginBottom: 32 }}>
              <div style={{ fontSize: 72, fontWeight: 900, color: gradeColor, lineHeight: 1 }}>{score}<span style={{ fontSize: 36, color: "#475569" }}>/{questions.length}</span></div>
              <div style={{ color: gradeColor, fontSize: 22, fontWeight: 600, marginTop: 8 }}>{grade}</div>
              <div style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>{pct}% de acertos</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 32 }}>
              {Object.keys(topicColors).map((topic) => {
                const topicQs = questions.filter((q) => q.topic === topic);
                const topicCorrect = answers.filter((a, i) => questions[i]?.topic === topic && a.correct).length;
                const tc = topicColors[topic];
                return (
                  <div key={topic} style={{ background: tc.bg, border: `1px solid ${tc.accent}33`, borderRadius: 10, padding: "12px 8px" }}>
                    <div style={{ color: tc.accent, fontSize: 18, fontWeight: 700 }}>{topicCorrect}/{topicQs.length}</div>
                    <div style={{ color: "#94a3b8", fontSize: 10, marginTop: 4, lineHeight: 1.3 }}>{topic}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => setShowReview(!showReview)} style={{ background: "#1e293b", color: "#94a3b8", border: "1px solid #334155", borderRadius: 8, padding: "10px 20px", cursor: "pointer", fontSize: 14 }}>
                {showReview ? "Ocultar" : "Ver"} respostas
              </button>
              <button onClick={handleRestart} style={{ background: "#4fd1c5", color: "#0f0f1a", border: "none", borderRadius: 8, padding: "10px 24px", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
                Refazer prova
              </button>
            </div>
          </div>
          {showReview && (
            <div style={{ marginTop: 24, textAlign: "left" }}>
              {answers.map((a, i) => (
                <div key={i} style={{ background: "#16162a", border: `1px solid ${a.correct ? "#166534" : "#7f1d1d"}`, borderRadius: 12, padding: 20, marginBottom: 12 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 10 }}>
                    <span style={{ fontSize: 18 }}>{a.correct ? "✅" : "❌"}</span>
                    <p style={{ color: "#e2e8f0", margin: 0, fontSize: 14, lineHeight: 1.5 }}><strong>Q{i + 1}.</strong> {a.question}</p>
                  </div>
                  {!a.correct && (
                    <p style={{ color: "#f87171", fontSize: 13, margin: "4px 0", paddingLeft: 26 }}>Sua resposta: {a.options[a.selected]}</p>
                  )}
                  <p style={{ color: "#4fd1c5", fontSize: 13, margin: "4px 0", paddingLeft: 26 }}>✓ {a.options[a.answer]}</p>
                  <p style={{ color: "#94a3b8", fontSize: 12, margin: "8px 0 0", paddingLeft: 26, borderTop: "1px solid #1e293b", paddingTop: 8 }}>{a.explanation}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f1a", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Georgia', serif", padding: "20px" }}>
      <div style={{ maxWidth: 640, width: "100%" }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ color: "#475569", fontSize: 13 }}>Questão {current + 1} de {questions.length}</span>
            <span style={{ color: "#4fd1c5", fontSize: 13, fontWeight: 600 }}>{score} acerto{score !== 1 ? "s" : ""}</span>
          </div>
          <div style={{ height: 4, background: "#1e293b", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${colors.tag}, ${colors.accent})`, borderRadius: 4, transition: "width 0.4s ease" }} />
          </div>
        </div>

        {/* Card */}
        <div style={{ background: colors.bg, border: `1px solid ${colors.accent}33`, borderRadius: 16, padding: "36px 32px", transition: "all 0.3s ease" }}>
          {/* Topic tag */}
          <div style={{ display: "inline-block", background: `${colors.tag}22`, border: `1px solid ${colors.tag}66`, color: colors.accent, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 20, marginBottom: 20 }}>
            {q.topic}
          </div>

          {/* Question */}
          <h2 style={{ color: "#e2e8f0", fontSize: 18, lineHeight: 1.6, marginBottom: 28, fontWeight: 600, fontFamily: "'Georgia', serif" }}>
            {q.question}
          </h2>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
            {q.options.map((opt, idx) => {
              let bg = "#0f0f1a";
              let border = "#2a2a4a";
              let color = "#94a3b8";
              if (selected === idx && !confirmed) { bg = `${colors.accent}15`; border = colors.accent; color = colors.accent; }
              if (confirmed && idx === q.answer) { bg = "#14532d"; border = "#4ade80"; color = "#4ade80"; }
              if (confirmed && selected === idx && idx !== q.answer) { bg = "#450a0a"; border = "#f87171"; color = "#f87171"; }
              return (
                <button key={idx} onClick={() => handleSelect(idx)} style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 10, padding: "14px 18px", textAlign: "left", cursor: confirmed ? "default" : "pointer", color, fontSize: 14, lineHeight: 1.5, transition: "all 0.2s ease", display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span style={{ minWidth: 22, height: 22, borderRadius: "50%", border: `1.5px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>
                    {confirmed && idx === q.answer ? "✓" : confirmed && selected === idx ? "✗" : String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {confirmed && (
            <div style={{ background: "#0f0f1a", border: `1px solid ${colors.accent}44`, borderRadius: 10, padding: "14px 16px", marginBottom: 20 }}>
              <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                <span style={{ color: colors.accent, fontWeight: 700 }}>💡 Explicação: </span>{q.explanation}
              </p>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {!confirmed ? (
              <button onClick={handleConfirm} disabled={selected === null} style={{ background: selected === null ? "#1e293b" : colors.accent, color: selected === null ? "#475569" : "#0f0f1a", border: "none", borderRadius: 10, padding: "12px 28px", fontWeight: 700, fontSize: 14, cursor: selected === null ? "not-allowed" : "pointer", transition: "all 0.2s ease" }}>
                Confirmar resposta
              </button>
            ) : (
              <button onClick={handleNext} style={{ background: colors.accent, color: "#0f0f1a", border: "none", borderRadius: 10, padding: "12px 28px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                {current + 1 >= questions.length ? "Ver resultado →" : "Próxima questão →"}
              </button>
            )}
          </div>
        </div>

        {/* Topic legend */}
        <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap", justifyContent: "center" }}>
          {Object.entries(topicColors).map(([topic, tc]) => (
            <span key={topic} style={{ fontSize: 10, color: tc.accent, background: `${tc.bg}cc`, border: `1px solid ${tc.accent}44`, borderRadius: 20, padding: "3px 10px" }}>{topic}</span>
          ))}
        </div>
      </div>
    </div>
  );
}