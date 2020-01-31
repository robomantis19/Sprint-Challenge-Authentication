const request = require('supertest'); 
const server = require('./server'); 


describe('server', function()  { 
    it('runs the tests', function() {
        expect(true).toBe(true);
    })
    describe('GET /', function() { 
        it('should return 200 OK', function() { 
            return request(server).get('/')
            .then(res => { 
                expect(res.status).toBe(200); 
            })
        })
        it('should return JSON', function() { 
            return request(server).get('/')
                .then(res => { 
                    console.log('test body', res.body.api)
                    expect(res.type).toMatch(/json/i); 
                })

        })
        
    })

})