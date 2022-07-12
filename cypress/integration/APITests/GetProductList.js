/// <reference types="Cypress" />

const dataJson = require('../../fixtures/crudproduct') // used for retrieve test data from json file

describe('Get list of products',() => {
    it('get product list', () => {   
        cy.fixture('crudproduct').then((payload) =>{     
        cy.request({
            method : 'GET',
            url : 'api/v2/product', // base url saved into cypress.json file
            headers: {
                'x-session-token': payload.token,
              }
        }).then((res)=>{
            expect(res.status).to.eq(200)
        })
     }) 
    })
})