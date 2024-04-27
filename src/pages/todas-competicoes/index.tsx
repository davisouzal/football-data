import React, { useEffect, useState } from 'react';
import { ICompetition, ICompetitionResponse } from '~/interfaces/ICompetition';

const Competicoes: React.FC = () => {
    const [competitionResponse, setCompetitionResponse] = useState<ICompetitionResponse | null>(null);
    const [competitions, setCompetitions] = useState<ICompetition[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch('/api/competicao/all');
                const data = await response.json();
                setCompetitionResponse(data);
                setCompetitions(data.competitions);
            } catch (error) {
                console.error('Erro ao buscar competições: ', error);
            }
        }

    fetchData();
    }, []);

    return (
        <div>
        <h1>Competições de Futebol</h1>
        {competitionResponse && (
            <>
                <h2>Possuímos os dados de: {competitionResponse.count}</h2>
                <ul>
                    {competitions.map((competition, index) => (
                        <li key={index}>
                            <p>Nome: {competition.name}</p>
                            <p>Id: {competition.id}</p>
                        </li>
                    ))}
                </ul>
            </>
        )}
    </div>
    );
}

export default Competicoes;
