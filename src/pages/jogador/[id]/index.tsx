import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import IPlayer from '~/interfaces/IPlayer';
import PlayerDetails from '~/components/Player';

const PlayerPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [player, setPlayer] = useState<IPlayer | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStandings = async () => {
            try {
                const response = await fetch(`/api/jogador/${id}`);
                const data = await response.json();
                setPlayer(data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar dados do jogador:', error);
                setLoading(false);
            }
        };

        if (id) {
            fetchStandings();
        }
    }, [id]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!player) {
        return <div>Dados de classificação não encontrados para o ID {id}</div>;
    }

    return <PlayerDetails player={player} />;
};

export default PlayerPage;
