const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({summary: 'Milanesa de pollo con tomate y queso al horno'})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', (done) => {
        Recipe.create({
           name: 'Milanesa a la napolitana',
           summary: 'Milanesa de pollo con tomate y queso al horno' 
        })
          .then(()=> done())
          .catch((error) => done(new Error(error.message)))
      });
      it('it should not work when its an invalid data type', (done) => {
        Recipe.create({
           name: [],
           summary: 'Milanesa de pollo con tomate y queso al horno' 
        })
          .then(()=> done(new Error('the recipe is being created with an invalid name')))
          .catch(() => done())
      });
    });
    describe('summary', () => {
      it('should throw an error if summary is null', (done) => {
        Recipe.create({ 
          name: 'Milanesa a la napolitana' ,
        })
          .then(() => done(new Error('It requires a valid summary')))
          .catch(() => done());
      });
      it('should work when its a valid summary', () => {
        Recipe.create({ 
          name: 'Milanesa a la napolitana' ,
          summary: 'Milanesa de pollo con tomate y queso al horno'
        });
      });
      it('it should not work when its an invalid data type', (done) => {
        Recipe.create({
           name: 'Milanesa a la napolitana',
           summary: [] 
        })
          .then(()=> done(new Error('the recipe is being created with an invalid summary')))
          .catch(() => done())
      });
    });
  });
});
