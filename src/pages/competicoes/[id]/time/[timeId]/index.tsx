import Link from 'next/link';

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { ISquad, ITeamComplete } from '~/interfaces/ITeam';

const timePage = () => {
  const router = useRouter();
  const { id, timeId } = router.query;
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState<ITeamComplete | null>(null);
  useEffect(() => {
    const fetchReponse = async () => {
      try {
        const response = await fetch(`/api/competicao/${id}/time/${timeId}`);
        const data = await response.json();
        setTeam(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados de classificação:', error);
        setLoading(false);
      }
    };

    if (id) {
        fetchReponse();
    }
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }
  if (!team) {
    return <div>Não foi encontrado um time com esse ID... Você digitou ele corretamente?</div>;
  }

  return (
    <>
      { team ? (
        <div>
            <h1>Dados do Time</h1>
            <h2>Informações Gerais:</h2>
            <p>Nome: {team.name}</p>
            <p>Abreviação: {team.tla}</p>
            <p>Endereço: {team.address}</p>
            <p>Website: <a href={team.website}>{team.website}</a></p>
            <p>Fundado em: {team.founded}</p>
            <p>Cores do Clube: {team.clubColors}</p>
            <p>Estádio: {team.venue}</p>
            <h2>Competições Atuais:</h2>
            <ul>
                {team.runningCompetitions.map((competition: any) => (
                    <li key={competition.id}>{competition.name}</li>
                ))}
            </ul>
            <h2>Staff:</h2>
            <p>Técnico: {team.coach ? `${team.coach.firstName} ${team.coach.lastName}` : 'Não disponível'}</p>
            <h2>Jogadores:</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Posição</th>
                        <th>Data de Nascimento</th>
                        <th>Nacionalidade</th>
                    </tr>
                </thead>
                <tbody>
                {team.squad
                .map((player: ISquad) => (
                  <tr key={player.id}>
                    <td>{player.name}</td>
                    <td>{player.position}</td>
                    <td>{player.dateOfBirth}</td>
                    <td>{player.nationality}</td>
                    <td>
                      <Link href={`/jogador/${player.id}/`}>
                        Ver mais
                      </Link>
                    </td>
                  </tr>
              ))}
                </tbody>
            </table>
        </div>
      ) : (
        <div>
          <h1>Time não encontrado</h1>
          <p>Verifique se o ID do time está correto e tente novamente.</p>
        </div>
      )}
    </>
);
};

export default timePage;
