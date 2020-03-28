const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        // Paginação dos incidentes
        const { page = 1 } = request.query;

        // Total de incidentes registrados na base de dados
        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]);
        
        // Total de incidentes registrados para o fron-end calcular o número de páginas
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        // Armazenando o valor do ID como primeiro valor do array na variável ID
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        // Verificando se o ID do incidente é realmente o mesmo da ONG que vai deletá-lo
        const indicent = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if(indicent.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operation not permitted' });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    },
};