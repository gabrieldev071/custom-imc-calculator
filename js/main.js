// Seleção de elementos

const imcTable = document.querySelector("#imc-table");

const nameinput = document.querySelector("#name");
const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");

const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");

const nameSpan = document.querySelector("#name_class");
const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");

const clearSituacion = document.querySelector("#back--btn");


// Array de objetos
const data = [
    {
      name: '',
      min: 0,
      max: 18.4,
      classification: "Menor que 18,5",
      info: "Magreza",
      obesity: "0",
    },
    {
      name: '',
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal",
      obesity: "0",
    },
    {
      name: '',
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesity: "I",
    },
    {
      name: '',
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesity: "II",
    },
    {
      name: '',
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesity: "III",
    },
  ];

  // Funções 

  function createTable(data) {
    data.forEach((item) => {
        
        // Criando os elementos

        const div = document.createElement("div")
        div.classList.add("table-data");

      /*   const name = document.createElement("p");
        name.innerHTML = nameinput.value */
        
        const classification = document.createElement("p");
        classification.innerHTML = item.classification;

        const info = document.createElement("p");
        info.innerHTML = item.info;

        const obesity = document.createElement("p");
        obesity.innerHTML = item.obesity;

        //Subindo um nó, ou seja, adicionando ao PAI (div)
        div.appendChild(classification);
        div.appendChild(info);
        div.appendChild(obesity);

        //adicionando a tabela no html

        imcTable.appendChild(div);
    })
  }

  function calcImc(height, weight) {
    //fixed serve para fixar em um número após a virgula // 27.2228888 para 23.2
    const imc = (weight / (height * height)).toFixed(2);
    return imc;
  }

  function validDigits(text) {

    //expressão regular utilizando o método replace (substituição)
    return text.replace(/[^0-9,]/g, "");
  }

  function cleanInputs() {

    //Limpando INputs
    nameinput.value = "";
    heightInput.value = "";
    weightInput.value = "";
    imcNumber.className = "";
    imcInfo.className = "";
  }

  function cleanHtml() {
    
    imcNumber.innerText = "";
    imcInfo.innerText = "";
    nameSpan.innerText = `Confira as classificações:`
    imcNumber.className = "";
    imcInfo.className = "";
  }

  // Inicialização do projeto

  createTable(data);

  // Eventos 


  [heightInput, weightInput].forEach((el) => {
    // pra cada elemento ao ser digitado ele atualiza o valor do campo

    el.addEventListener("input", (e) => {
      const updatedValue = validDigits(e.target.value);
  
      e.target.value = updatedValue;
    });
  });

  /* Limpeza dos values dos inputs */

  clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
  
    cleanInputs();
  });

  /* Cálculo */

  calcBtn.addEventListener("click", (e) => {
    e.preventDefault();
  
    /* convertendo as virgulas por ponto e atribuindo em novas variáveis */

    const weight = +weightInput.value.replace(",", ".");
    const height = +heightInput.value.replace(",", ".");
  
    console.log(weight, height);
  
    //se forem false...

    if (!weight || !height) return;
  
    const imc = calcImc(height, weight);

    console.log(imc);

    /* receber resultado dos IMCS */

    let info;
    let nameValue = nameinput.value
  
    // percorrendo cada item do array min e max
    data.forEach((item) => {
      if (imc >= item.min && imc <= item.max) {
        info = item.info;
      }
    });
  
    console.log(info);
    if (!info) return; // caso não retorne nenhum valor no array
  
    /* Editando HTML de acordo com IMC e classificação do IMC*/
    
    imcNumber.innerText = imc;
    nameSpan.innerText = `${nameValue}, confira as classificações:`
    imcInfo.innerText = info;
  
    switch (info) {
      case "Magreza":
        imcNumber.classList.add("low");
        imcInfo.classList.add("low");
        break;
      case "Normal":
        imcNumber.classList.add("good");
        imcInfo.classList.add("good");
        break;
      case "Sobrepeso":
        imcNumber.classList.add("low");
        imcInfo.classList.add("low");
        break;
      case "Obesidade":
        imcNumber.classList.add("medium");
        imcInfo.classList.add("medium");
        break;
      case "Obesidade grave":
        imcNumber.classList.add("high");
        imcInfo.classList.add("high");
        break;
    }
  
  });
  
  clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
  
    cleanInputs();
  });
  
clearSituacion.addEventListener("click", (e) => {
    e.preventDefault();
    cleanHtml();
  }); 