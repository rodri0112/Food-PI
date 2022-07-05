/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
	"name": "Los ñoquis de la Abuela Concha",
	"summary": "Altos ñoquis calentitos con cantidades industriales de queso",
	"healthScore": 1000,
	"dishTypes": ["main dish"],
	"steps":  [
		{
			"number": 1,
			"step": "llama a la abuela"
		},
		{
			"number": 2,
			"step": "que haga los ñoquis"
		},
		{
			"number": 3,
			"step": "comelos con queso y coquita"
		}
	],
	"diets": [
			"paleolithic",
			"lacto ovo vegetarian"
		]
};

describe('Recipe and diet routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));

  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
    it('should get 404 and an error message if no recipes found', async () =>{
      const res = await agent.get('/recipes?name=notavalidnamexdxd').expect(404);
      expect(res.body).to.not.equal('')}
    );
  });

  describe('GET /recipes/id', () => {
    it('should get 404 and an error message if no recipes found with that ID', async () =>{
      const res = await agent.get('/recipes/99999999999999999999999').expect(404);
      expect(res.body).to.equal('Recipe not found')}
    );
    it('should get 200 and a json with the recipe',async () =>{
      const res = await agent.get('/recipes/1241241').expect(200);
      expect(res.body.name).to.equal("Apple and Brown Sugar Corned Beef")
    });
  });

  describe('GET /diets', () => {
    it('it should return 200 and all diet types', async () =>{
      const res = await agent.get('/diets').expect(200);
      expect(res.body).to.be.an('array')}
    );
  });

  describe('POST /recipes', () => {
    it('it should return 400 if something went wrong', async () =>
      agent.post('/recipes').expect(400)
    );
    it('it should return 200 if recipe was created succesully and return the recipe', async () =>{
      const res = await agent.post('/recipes').send(recipe);
      expect(res.statusCode).to.equal(200);
      expect(res.body.name).to.equal('Los ñoquis de la Abuela Concha')
    });
  });
});
