const express = require('express');


const app = express();

//route w/o auth
app.get('/cards', (req, resp) => resp.send('wefrewa'));
//app.post('/cards', createCard);


const { PORT = 3001 } = process.env;
app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
