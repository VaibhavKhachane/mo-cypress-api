/// <reference types="Cypress" />

const dataJson = require('../../fixtures/crudproduct')

describe('Delete a product', () => {
    let accesstoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uX3V1aWQiOiI1OWQ1NzUzMy04OTQzLTQ4MDUtYTYyOS00OWYxODRkZGRjZTIiLCJ1c2VyIjp7ImlkIjoiNjJjNDFmNTBlN2Q3MDEwMDE5MmFiY2U2In0sImJ1c2luZXNzIjp7ImlkIjoiNjJjNDFmNGRlMmZmMjg4NmYxZGM2OGZkIn0sInVzZXJfYnVzaW5lc3MiOnsiaWQiOiI2MmM0MWY1MGU3ZDcwMTAwMTkyYWJjZTcifSwicm9sZSI6InVzZXIiLCJpYXQiOjE2NTczMTMzMDh9.P9oMY3EVGG3epkWf_gJfU6KAcKK-ghLV2wm8zpY0OpU'
    it.only('Test update api flow', () => {   
             cy.fixture('crudproduct').then((payload) =>{
            //1. Add new product (POST)
            cy.request({
                method: 'POST',
                url: 'api/v2/product/',
                headers: {
                    'x-session-token': payload.token
                },
                body: {
                    "name": payload.name,
                    "decription": payload.decription,
                    "variants": [
                    {
                    "price": payload.price,
                    "stock": payload.stock,
                    "status": payload.status,
                    "images": [{
                    "src": payload.src
                    }],
                    "option_positions": [
                             0
                            ]
                    }
                    ],
                    "options": [
                    {
                        "name": "color",
                        "values": [
                         {
                            "name": "red"
                            }
                    ]
                 }
                ]}
            }).then((res)=>{
                 const productId = res.body.id 
                 cy.log("product id is: " + productId)
                 expect(res.status).to.eq(200)
                 expect(res.body).has.property("id",productId)
             
             // Verify created product    
              }).then((res) =>{
                 const productId = res.body.id 
                 cy.log("product id is: " + productId)
                     //2. get product by id (GET)
                     cy.request({
                         method: 'GET',
                         url: 'api/v2/product/'+productId,
                         headers: {
                             'x-session-token': payload.token
                         }
                         }).then((res)=>{
                         expect(res.status).to.eq(200)
                         expect(res.body).has.property("id",productId)
                       
                         })

            }).then((res) =>{
                   const productId = res.body.id 
                    cy.log("user id is: " + productId)
                    //2. delete user (DELETE)
                    cy.request({
                        method: 'DELETE',
                        url: 'api/v2/product/'+productId,
                         headers: {
                             'x-session-token': payload.token
                         }
                    }).then((res)=>{
                        expect(res.status).to.eq(200)
                        expect(res.body).has.property("status","OK")
                    })
            })

    })    
            
})
})