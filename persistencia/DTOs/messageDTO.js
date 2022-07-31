class Message {
    constructor(id, data) {
        this.id = id
        this.author = data.author
        this.text = data.text
    }
}

export default Message