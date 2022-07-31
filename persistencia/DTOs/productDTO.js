class Product {
    constructor(id, data) {
        this.id = `${id}`
        this.nombre = data.nombre
        this.precio = data.precio
        this.foto = data.foto
    }
}

export default Product