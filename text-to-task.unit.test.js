const test = require(`ava`);
const sinon = require(`sinon`);

const parseText = require(`.`).parseText;
const consoleLog = sinon.stub(console, 'log');

const content = "Instruções: Apresentem - nos o solicitado ; Entrega: lote 02 ; Local: na Aldeia ; Valor da tarefa: lote 02: 400 pontos e lote 03 : 300 pontos . TAREFA 0 6 5 - Noite de estrelas A Avon é uma empresa norte - americana, sendo uma das mais conhecidas marcas de cosméticos do mundo. Algo que virou tradição da marca alguns anos atrás foi a criação de frascos com formas de itens diversificados e é um desses frascos que queremos nesta tarefa. Equipes, apresentem um frasco do perfume Avon Lampião Chinês - Noite de Estrelas, em bom estado de conservação, conforme demonstrado na imagem. O objeto solicitado e stará exposto na Aldeia entre 22h40min e 22 h55min."

test(`parseText: should print the message received`, async t => {
  // Initialize mocks
  const event = {
    data: Buffer.from(content).toString(`base64`)
  };

  // Call tested function and verify its behavior
  await parseText(event);
  t.true(consoleLog.calledWith(`Message received: ${content}`));
});