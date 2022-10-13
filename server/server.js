const fs = require('fs');
const fastify = require('fastify')({ logger: true });

fastify.register(require('fastify-cors'), {});

fastify.get('/', async(request, reply) => {
    fs.readFile('./users.json', 'utf8', (err, data) => {
        if (err) {
            console.log('File read failed:', err);
            return;
        }

        if (request.query.id) {

            const result = JSON.parse(data).find((elem) => elem.id == request.query.id);
            reply.send(JSON.stringify(result));
        }

        if (request.query.term) {
            const result = JSON.parse(data).filter((elem) => elem.name.toLowerCase().search(request.query.term.toLowerCase()) !== -1);
            reply.send(JSON.stringify(result));
        } else {
            reply.send(data);
        }

    })
});

const start = async() => {
    try {
        await fastify.listen(3002)
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();