const express = require('express');

const server = express();

server.use(express.json());


const projects = [];


server.use((request, response, next) => {
  console.time('Request')//faz o controle de tempo do método chamado
  console.log(`Método: ${request.method}; URL: ${request.url}`)

  next()

  console.timeEnd('Request')
})

server.get('/projects', (_, response) => {
  return response.json(projects)
});


server.post('/projects', (request, response) => {
  const { id } = request.body
  const title = request.body.title
  const { task } = request.body
  const obj = {
    "id": id,
    "title": title,
    "task": task
  }
  console.log(obj)
  projects.push(obj)

  return response.json(projects)

});

server.put('/projects/:id', checkId, (request, response) => {
  const { id } = request.params;
  const { title } = request.body;

  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id == id) {
      projects[i].title = title
    }
  }
  return response.json(projects)
});

server.delete('/projects/:id', checkId, (request, response) => {
  const { id } = request.params
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id = id) {
      projects.splice(id, 1);
    }
  }
  return response.json(projects)

})

server.post('/projects/:id/task', checkId, (request, response) => {
  const id = request.params
  const { task } = request.body

  for (let index = 0; index < projects.length; index++) {
    if (request.params.id == projects[index].id) {
      const { task } = request.body
      projects[index].task = [task]
      console.log(projects)
    }

  }
  return response.json(projects)

});

function checkId(request, response, next) {
  for (let index = 0; index < projects.length; index++) {
    if (request.params.id == projects[index].id) {
      return next();

      console.log(projects)
    }else
    return response.status(400).json({ error: 'Project id not found on request body' });
  }
}
  // function chechkProjectExist(request,response,next){
  //   const project = projects[request.params.index]
  //   if(!project){
  //     return res.status(400).json({error: 'user does not exist'});
  //   }
  //   return next();
  // }



server.listen(3000)
server.listen(3590)
