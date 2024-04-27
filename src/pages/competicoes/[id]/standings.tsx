// pages/competicoes/[id]/standings.tsx

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const StandingsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [standingsData, setStandingsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await fetch(`/api/competicao/${id}/standings`);
        const data = await response.json();
        setStandingsData(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados de classificação:', error);
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

  if (!standingsData) {
    return <div>Dados de classificação não encontrados para o ID {id}</div>;
  }

  return (
    <div>
      <h1>Dados de Classificação para a Competição {id}</h1>
      <table>
        <thead>
          <tr>
            <th>Posição</th>
            <th>Time</th>
            <th>Jogos</th>
            <th>Vitórias</th>
            <th>Empates</th>
            <th>Derrotas</th>
            <th>Pontos</th>
            <th>Gols Feitos</th>
            <th>Gols Sofridos</th>
            <th>Saldo de Gols</th>
          </tr>
        </thead>
        <tbody>
          {standingsData.table.map((team: any) => (
            <tr key={team.position}>
              <td style={{ textAlign: 'center' }}>{team.position}</td>
              <td style={{ verticalAlign: 'middle' }}>
                <img
                  src={team.team.crest}
                  alt={team.team.shortName}
                  style={{ maxWidth: '50px', marginRight: '5px', verticalAlign: 'middle' }}
                />
                <span style={{ verticalAlign: 'middle' }}>{team.team.shortName}</span>
              </td>
              <td style={{ textAlign: 'center' }}>{team.playedGames}</td>
              <td style={{ textAlign: 'center' }}>{team.won}</td>
              <td style={{ textAlign: 'center' }}>{team.draw}</td>
              <td style={{ textAlign: 'center' }}>{team.lost}</td>
              <td style={{ textAlign: 'center' }}>{team.points}</td>
              <td style={{ textAlign: 'center' }}>{team.goalsFor}</td>
              <td style={{ textAlign: 'center' }}>{team.goalsAgainst}</td>
              <td style={{ textAlign: 'center' }}>{team.goalDifference}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsPage;
