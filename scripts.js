function mostrarFormulario() {
  const tema = document.getElementById("tema").value;
  const f = document.getElementById("formulario");

  if (!tema) {
    f.innerHTML = "";
    return;
  }

  let equacoes = {
    "calorimetria": {
      "Q = m * c * ΔT": ["m", "c", "ΔT"],
      "Q = m * L": ["m", "L"],
      "ΔU = Q - W": ["Q", "W"]
    },
    "oscilacoes": {
      "T = 2π √(L / g)": ["L", "g"],
      "T = 2π √(m / k)": ["m", "k"],
      "f = 1 / T": ["T"]
    },
    "fluidos": {
      "P = ρ * g * h": ["ρ", "g", "h"],
      "Q = ΔV / Δt": ["ΔV", "Δt"]
    }
  };

  let html = `<h2>Escolha a equação:</h2>`;
  html += `<select id="equacao" onchange="mostrarCampos('${tema}')">`;
  html += `<option value="">-- Selecione --</option>`;
  for (let eq in equacoes[tema]) {
    html += `<option value="${eq}">${eq}</option>`;
  }
  html += `</select><div id="campos"></div><div id="resultado"></div>`;
  f.innerHTML = html;
}

function mostrarCampos(tema) {
  const equacao = document.getElementById("equacao").value;
  const camposDiv = document.getElementById("campos");

  const equacoes = {
    "calorimetria": {
      "Q = m * c * ΔT": ["m", "c", "ΔT"],
      "Q = m * L": ["m", "L"],
      "ΔU = Q - W": ["Q", "W"]
    },
    "oscilacoes": {
      "T = 2π √(L / g)": ["L", "g"],
      "T = 2π √(m / k)": ["m", "k"],
      "f = 1 / T": ["T"]
    },
    "fluidos": {
      "P = ρ * g * h": ["ρ", "g", "h"],
      "Q = ΔV / Δt": ["ΔV", "Δt"]
    }
  };

  const unidades = {
    m: "kg", c: "J/(kg·°C)", ΔT: "°C",
    L: "J/kg", Q: "J", W: "J", ΔU: "J",
    L: "m", g: "m/s²", k: "N/m", T: "s", f: "Hz",
    ρ: "kg/m³", h: "m", ΔV: "m³", Δt: "s", P: "Pa"
  };

  if (!equacao) {
    camposDiv.innerHTML = "";
    return;
  }

  let html = `<h3>Insira os valores:</h3>`;
  const variaveis = equacoes[tema][equacao];
  variaveis.forEach(v => {
    const id = v.trim();
    html += `${id} (${unidades[id] || "?"}): <input type="number" id="${id}" step="any"><br>`;
  });
  html += `<button onclick="resolver('${tema}', \`${equacao}\`)">Resolver</button>`;
  camposDiv.innerHTML = html;
}

function resolver(tema, equacao) {
  function v(id) {
    return parseFloat(document.getElementById(id.trim()).value);
  }

  const unidadesResultado = {
    "Q = m * c * ΔT": "J",
    "Q = m * L": "J",
    "ΔU = Q - W": "J",
    "T = 2π √(L / g)": "s",
    "T = 2π √(m / k)": "s",
    "f = 1 / T": "Hz",
    "P = ρ * g * h": "Pa",
    "Q = ΔV / Δt": "m³/s"
  };

  let res = "";

  try {
    switch (equacao) {
      case "Q = m * c * ΔT":
        res = "Q = " + (v("m") * v("c") * v("ΔT")).toFixed(2) + " J";
        break;
      case "Q = m * L":
        res = "Q = " + (v("m") * v("L")).toFixed(2) + " J";
        break;
      case "ΔU = Q - W":
        res = "ΔU = " + (v("Q") - v("W")).toFixed(2) + " J";
        break;
      case "T = 2π √(L / g)":
        res = "T = " + (2 * Math.PI * Math.sqrt(v("L") / v("g"))).toFixed(2) + " s";
        break;
      case "T = 2π √(m / k)":
        res = "T = " + (2 * Math.PI * Math.sqrt(v("m") / v("k"))).toFixed(2) + " s";
        break;
      case "f = 1 / T":
        res = "f = " + (1 / v("T")).toFixed(2) + " Hz";
        break;
      case "P = ρ * g * h":
        res = "P = " + (v("ρ") * v("g") * v("h")).toFixed(2) + " Pa";
        break;
      case "Q = ΔV / Δt":
        res = "Q = " + (v("ΔV") / v("Δt")).toFixed(6) + " m³/s";
        break;
      default:
        res = "Equação não implementada.";
    }
  } catch (e) {
    res = "Erro nos dados. Verifique os valores.";
  }

  document.getElementById("resultado").innerHTML = "<h3>Resultado:</h3><p>" + res + "</p>";
}
