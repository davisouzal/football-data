import React from 'react';
import IPlayer from '~/interfaces/IPlayer';

interface PlayerDetailsProps {
    player: IPlayer;
}

const PlayerDetails: React.FC<PlayerDetailsProps> = ({ player }) => {
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
            <p>
                Website do Time:{' '}
                <a href={player.currentTeam.website}>
                    {player.currentTeam.website}
                </a>
            </p>
            <p>Fundado em: {player.currentTeam.founded}</p>
            <p>Cores do Clube: {player.currentTeam.clubColors}</p>
            <p>Estádio: {player.currentTeam.venue}</p>
            <h2>Competições Atuais do Time:</h2>
            <ul>
                {player.currentTeam.runningCompetitions.map(
                    (competition: any) => (
                        <li key={competition.id}>{competition.name}</li>
                    )
                )}
            </ul>
            <p>
                Contrato: de {player.currentTeam.contract.start} até{' '}
                {player.currentTeam.contract.until}
            </p>
        </div>
    );
};

export default PlayerDetails;
