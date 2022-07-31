class BaseMemoriaDAO {
    getNext_id(elements) {
        let lg = elements.length
        return lg ? parseInt(lg[lg-1]._id) + 1 : 1
    }
    getIndex(_id, elements) {
        return elements.findIndex(element => element ? (element._id === parseInt(_id)) : false)
    }
}

export default BaseMemoriaDAO