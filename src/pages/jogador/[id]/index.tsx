import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import IPlayer from '~/interfaces/IPlayer';

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

    return (
      <div>
          <h1>Dados do Jogador</h1>
          <h2>Informações Gerais:</h2>
          <p>Nome: {player.name}</p>
          <p>Posição: {player.position}</p>
          <p>Data de Nascimento: {player.dateOfBirth}</p>
          <p>Nacionalidade: {player.nationality}</p>
          <p>Camisa Número: {player.shirtNumber}</p>
          <p>Time Atual: {player.currentTeam.name}</p>
          <p>Área do Time: {player.currentTeam.area.name}</p>
          <p>Endereço do Time: {player.currentTeam.address}</p>
          <p>Website do Time: <a href={player.currentTeam.website}>{player.currentTeam.website}</a></p>
          <p>Fundado em: {player.currentTeam.founded}</p>
          <p>Cores do Clube: {player.currentTeam.clubColors}</p>
          <p>Estádio: {player.currentTeam.venue}</p>
          <h2>Competições Atuais do Time:</h2>
          <ul>
              {player.currentTeam.runningCompetitions.map((competition: any) => (
                  <li key={competition.id}>{competition.name}</li>
              ))}
          </ul>
          <p>Contrato: de {player.currentTeam.contract.start} até {player.currentTeam.contract.until}</p>

      </div>
  );
};

export default PlayerPage;
