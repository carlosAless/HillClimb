const numberItens = document.getElementById("numberItens");
var inputweight = document.getElementsByClassName("inputweight")[0];
const values = document.getElementsByClassName("value");
const weight = document.getElementsByClassName("weight");
const weightMax = +document.getElementsByClassName("weightMax").value;
const content = document.getElementsByClassName("content")[0];

const verifyQuant = () => {
  let cont = +numberItens.value;
  cont++;
  while (--cont) {
    inputweight.innerHTML +=
      '<div class="item"><input placeholder="peso do item" type="number" name="weight" class="weight"><input placeholder="valor do item" type="number" name="value" class="value"><div>';

    if (cont == 1)
      inputweight.innerHTML += '<button onclick="calculate()">enviar</button>';
  }
};

const schoolBag = () => {
  inputweight.innerHTML = "";
  inputweight.innerHTML +=
    '<input placeholder="peso maximo da mochila" type="number" name="weightMax" class="weightMax">';
};

const initialSolution = (arr, weightMax) => {
  items = [];
  items = arr.map(() => Math.round(Math.random()));
  if (totalWeight(arr, items) <= weight) {
    return items;
  }
  return items;
};

const totalValue = (arr, neighbor) => {
  let value = 0;
  for (i = 0; i < neighbor.length; i++) {
    if (neighbor[i] == 1) value += arr[i].value;
  }
  return value;
};

const totalWeight = (arr, neighbor) => {
  let weight = 0;
  for (i = 0; i < neighbor.length; i++) {
    if (neighbor[i] == 1) weight += arr[i].weight;
  }
  return weight;
};

const permutationSolution = (solution) => {
  const neighborhood = [];

  for (let i = 0; i < solution.length; i++) {
    const neighbor = [...solution];
    neighbor[i] = 1 - neighbor[i];
    neighborhood.push(neighbor);
  }

  return neighborhood;
};

const printOnScreen = (solution, arr) => {
  if (content.children[2]) {
    while (content.children.length > 2) {
      content.removeChild(content.children[2]);
    }
  }
  h1 = document.createElement("h1");
  text = document.createTextNode("Items escolhidos");
  h1.appendChild(text);

  content.appendChild(h1);
  console.log(solution, arr);

  cont = 0;
  for (i = 0; i < arr.length; i++) {
    if (solution[i] == 1) {
      cont++;
      contentChosen = document.createElement("div");
      contentChosen.classList.add("contentChosen");

      div = document.createElement("div");
      div.classList.add("itemChosen");

      p1 = document.createElement("p");
      text = document.createTextNode("peso:");
      p1.appendChild(text);

      p2 = document.createElement("p");
      text = document.createTextNode(arr[i].weight);
      p2.appendChild(text);

      p3 = document.createElement("p");
      text = document.createTextNode("valor:");
      p3.appendChild(text);

      p4 = document.createElement("p");
      text = document.createTextNode(arr[i].value);
      p4.appendChild(text);

      div.appendChild(p1);
      div.appendChild(p2);
      div.appendChild(p3);
      div.appendChild(p4);

      contentChosen.appendChild(div);

      content.appendChild(contentChosen);
    }
  }
  
  warn = document.createElement("p")
  text = document.createTextNode("Nenhum item selecionado")
  warn.appendChild(text)

  if(cont == 0)content.appendChild(warn)
};

const calculate = () => {
  var arr = [];

  for (var i = 0; i < values.length; i++) {
    obj = {
      weight: weight[i].value,
      value: values[i].value,
    };
    arr.push(obj);
  }

  let bestSolution = initialSolution(arr, weightMax);

  i = 1000;

  while (--i) {
    const permutation = permutationSolution(bestSolution);

    for (const neighbor of permutation) {
      if (totalWeight(arr, neighbor) <= weightMax) {
        if (totalValue(arr, neighbor) > totalValue(arr, bestSolution)) {
          bestSolution = neighbor;
        }
      }
    }
  }

  printOnScreen(bestSolution, arr);
};

const calculateTotalValue = (selectedItems) => {
  return selectedItems.reduce((totalValue, item) => totalValue + item[1], 0);
};
