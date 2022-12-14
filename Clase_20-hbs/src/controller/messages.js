const {normalize, schema} = require("normalizr")
const {chatModel} = require("./schema")
const util = require("util")

const addMessage = async (msge) => {
    let savedMessage = await chatModel.create(msge);
    return savedMessage;
};

const author = new schema.Entity('author', {}, { idAttribute: 'email' });

const msge = new schema.Entity(
    'message',
    {
    author: author,
    },
    { idAttribute: '_id' }
);

const msgesSchema = new schema.Array(msge);


const getAllMessages = async () => {
    try {
		const messagesOriginalData = await chatModel.find().lean();

    let normalizedMessages = normalize(messagesOriginalData, msgesSchema);

    // console.log(util.inspect(normalizedMessages, true, 3, true));
    return normalizedMessages;
    } catch (err) {
    console.log('ERROR');
    console.log(err);
    }
};

module.exports = getAllMessages