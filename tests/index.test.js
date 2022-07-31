import supertest from "supertest";
import { expect } from "chai";

const request = supertest("http://localhost:8080");

const testProduct = {
  nombre: "Chai Moka Supertest",
  precio: 999,
  foto: "pruebas.com",
};

describe("test api rest", () => {
  describe("GET", () => {
    it("debería retornar status 200 y un array vacio o de productos", async () => {
      const response = await request.get("/products_api");
      expect(response.status).to.eql(200);
      expect(Array.isArray(response.body)).to.be.true;
    });
  });
  describe("POST", () => {
    it("debería crear un nuevo producto y devolver un objeto con las propiedades del producto", async () => {
      const response = await request.post("/products_api").send(testProduct);
      expect(response.status).to.eql(200);
      expect(response.body).to.have.property("id");
      expect(response.body.nombre).to.eql(testProduct.nombre);
      expect(response.body.precio).to.eql(testProduct.precio);
      expect(response.body.foto).to.eql(testProduct.foto);
      testProduct.id = response.body.id;
    });
  });
  describe("PUT", () => {
    it("debería editar el elemento previamente creado y devolver un objeto con las propiedades del producto", async () => {
      const response = await request.put(`/products_api/${testProduct.id}`).send({ precio: 0 });
      expect(response.status).to.eql(200);
      expect(response.body).to.have.property("id");
      expect(response.body.id).to.eql(testProduct.id);
    });
  });
  describe("DELETE", () => {
    it('debería eliminar el producto previamente creado y devolver una lista de todos los productos"', async () => {
      const response = await request.delete(`/products_api/${testProduct.id}`);
      expect(response.status).to.eql(200);
      expect(Array.isArray(response.body)).to.be.true;
    });
  });
});

// GRAPHQL TESTS

describe("test api with GraphQL", () => {
  describe("Query", () => {
    it("debería retornar status 200 y un array vacio o de productos", async () => {
      const graphql = "getAllProducts {id, precio, nombre, foto }"
      const response = await request.get(`/graphql?query={${graphql}}`);
      expect(response.status).to.eql(200);
      expect(Array.isArray(response.body.data.getAllProducts)).to.be.true;
    });
  });
  describe("Mutation (crear)", () => {
    it("debería crear un nuevo producto y devolver un objeto con las propiedades del producto", async () => {
      const graphql = `mutation { addProduct(productData: {nombre:"${testProduct.nombre}", precio: ${testProduct.precio}, foto:"${testProduct.foto}"}) {id, nombre, foto, precio} }`
      const response = await request.post('/graphql').send({
        "query": graphql
      });
      expect(response.status).to.eql(200);
      const data = response.body.data.addProduct
      expect(data).to.have.property("id");
      expect(data.nombre).to.eql(testProduct.nombre);
      expect(data.precio).to.eql(testProduct.precio);
      expect(data.foto).to.eql(testProduct.foto);
      testProduct.id = data.id;
    });
  });
  describe("Mutation (editar)", () => {
    it("debería editar el elemento previamente creado y devolver un objeto con las propiedades del producto", async () => {
      const graphql = `mutation { updateProduct(id: "${testProduct.id}", productData: {precio: 1, foto: "http://foto.net", nombre: "Producto editado"}) {id, nombre, precio, foto} }`
      const response = await request.post('/graphql').send({
        "query": graphql
      });
      expect(response.status).to.eql(200);
      const data = response.body.data.updateProduct
      expect(data).to.have.property("id");
      expect(data.id).to.eql(testProduct.id);
    });
  });
  describe("Mutation (eliminar)", () => {
    it('debería eliminar el producto previamente creado y devolver una lista de todos los productos"', async () => {
      const graphql = `mutation { removeProduct(id: "${testProduct.id}") {id, nombre, precio, foto} }`
      const response = await request.post('/graphql').send({
        "query": graphql
      });
      expect(response.status).to.eql(200);
      const data = response.body.data.removeProduct
      expect(Array.isArray(data)).to.be.true;
    });
  });
});
