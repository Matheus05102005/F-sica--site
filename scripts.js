function mostrarFormulario() {
  const tema = document.getElementById("tema").value;
  const f = document.getElementById("formulario");

  if (tema === "calorimetria") {
    f.innerHTML = `
      <h2>Calorimetria / Termodinâmica</h2>
      <p>\\( Q = m \\times c \\times \\Delta T \\)</p>
      <p>\\( Q = m \\times L \\)</p>
      <p>\\( \\Delta U = Q - W \\)</p>
      <h3>Preencha as variáveis abaixo e visualize os cálculos no código!</h3>`;
  }
  else if (tema === "oscilacoes") {
    f.innerHTML = `
      <h2>Oscilações</h2>
      <p>\\( T = 2\\pi \\sqrt{\\frac{L}{g}} \\)</p>
      <p>\\( T = 2\\pi \\sqrt{\\frac{m}{k}} \\)</p>
      <p>\\( f = \\frac{1}{T} \\)</p>
      <h3>Preencha as variáveis abaixo e visualize os cálculos no código!</h3>`;
  }
  else if (tema === "fluidos") {
    f.innerHTML = `
      <h2>Mecânica dos Fluidos</h2>
      <p>\\( P = \\rho \\times g \\times h \\)</p>
      <p>\\( Q = A \\times v \\)</p>
      <p>\\( E = P + \\frac{1}{2}\\rho v^2 + \\rho g h \\)</p>
      <h3>Preencha as variáveis abaixo e visualize os cálculos no código!</h3>`;
  }
  else {
    f.innerHTML = "";
  }
  MathJax.typeset();
}
