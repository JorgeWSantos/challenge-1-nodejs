const express = require("express");
const cors = require("cors");
const { v4, validate } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {

  try {
    
    const { title, url, techs } = request.body;

    const repository = {
      id : v4(),
      title,
      url,
      techs,
      likes : 0
    }

    repositories.push(repository);

    return response.status(200).json(repository);
  } 
  catch (error) {
    
     return response.status(400).json({ error : "Um erro inesperado aconteceu durante o processo." });
  }

});

app.put("/repositories/:id", (request, response) => {

  try {

    const { title, url, techs} = request.body;
    const { id } = request.params;

    const repositoryIndex = repositories.findIndex(repo => repo.id === id);

    if (repositoryIndex < 0) 
      return response.status(400).json({ error : "Repository not found." })

    const likes = repositories[repositoryIndex].likes;

    const repository = {
      id,
      title,
      url,
      techs,
      likes
    };

    repositories[repositoryIndex] = repository;

    return response.status(200).json(repository)
  } 
  catch (error) {

    return response.status(400).json({ error : "Um erro inesperado aconteceu durante o processo." });
  }
});

app.delete("/repositories/:id", (request, response) => {

  try {

    const { id } = request.params;

    repositoryIndex = repositories.findIndex(repo => repo.id === id);

    if (repositoryIndex < 0) 
      return response.status(400).json({ error : "Repository not found." });

    repositories.splice(repositoryIndex, 1);

    return response.status(204).send();
  } 
  catch (error) {
    
    return response.status(400).json({ error : "Um erro inesperado aconteceu durante o processo." });
  }
});

app.post("/repositories/:id/like", (request, response) => {
  
  try {

    const { id } = request.params;

    const repository = repositories.find(repo => repo.id === id);

    if (!repository) {
      return response.status(400).send()
    }

    repository.likes++;

    return response.status(200).json(repository)
  } 
  catch (error) {

    return response.status(400).json({ error : "Um erro inesperado aconteceu durante o processo." });
  }
});

module.exports = app;
