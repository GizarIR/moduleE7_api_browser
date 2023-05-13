const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.beginPath(); // Создает новый контур
ctx.moveTo(75,50); // Перемещает перо в точку с координатами x и y.
ctx.lineTo(100,75); // Рисует линию с текущей позиции до позиции, определенной x и y.
ctx.lineTo(100,25);
ctx.fillStyle = "green"; // Заливаем выбранным цветом фигуру
ctx.fill(); // Рисует фигуру с заливкой внутренней области.