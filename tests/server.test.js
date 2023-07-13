const {server, serverlisten} = require('../app')
const request = require('supertest')
const conexion = require('../database/db')
const crud = require('../controller/crud')

//before
beforeAll(async () => {
    /*
    await crud.api_borrar_todo()
    let persona1 = [{
        query:{
            nombre:"Maria",
            edad:24,
            genero:1,
            email:"maria@correo.com"
        }}
    ]
    let persona2 = [{
        query:{
            nombre:"Jose",
            edad:26,
            genero:0,
            email:"jose@correo.com"
        }}
    ]
    await crud.api_agregar(persona1)
    //await crud.api_agregar(persona2)*/
})

//test de Rutas
describe("Test de Rutas", () => {
    test('ruta index', async () => {
        const response = await request(server).get('/').send()
        expect(response.statusCode).toBe(200);
        expect(response.status).toBe(200);
    })
    test('ruta no valida', async () => {
        const response = await request(server).get('/pruebita').send()
        expect(response.status).toBe(404);
    })
    test('ruta /api/personas', async () => {
        const response = await request(server).get('/api/personas').send()
        expect(response.statusCode).toBe(200);
        expect(response.status).toBe(200);
        expect(response.header['content-type']).toMatch("json")
        //expect(response.body).toHaveLength(2) //retorne 2 elementos
        expect(response.body).toBeInstanceOf(Array)
        //expect(response.body).toBeInstanceOf(String)
        //expect(response.body).toBeInstanceOf(Boolean)
        //expect(response.body).toBeInstanceOf(Number)
        expect(response.body[0].nombre).toBe("Maria")
    })
    test('ruta /api/personas aseguar registro Jose', async () => {
        const response = await request(server).get('/api/personas').send()
        expect(response.statusCode).toBe(200);
        expect(response.status).toBe(200);
        expect(response.header['content-type']).toMatch("json")
        const tuplas = response.body.map(personas => personas.nombre)
        console.log("mi mapeo " + tuplas)
        expect(tuplas).toContain("Jose")
    })
    test('test de post agregar persona', async () => {
        const persona = {
            nombre:"Javier",
            edad:32,
            genero:0,
            email:"algo@ccom.com"
        }
        const response = await request(server).post('/api/agregar/')
        .send(persona)
        expect(response.status).toBe(200);
    })
})

afterAll(() => {
    serverlisten.close()
    conexion.end()
})