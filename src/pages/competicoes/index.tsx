import React, { useEffect, useState } from 'react';
import { ICompetition } from '~/interfaces/ICompetition';

const Competicoes: React.FC = () => {
    const [competitionName, setCompetitionName] = useState<string>('');
    const [competition, setCompetition] = useState<ICompetition | null>(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [allSuggestions, setAllSuggestions] = useState<string[]>([]); 

    useEffect(() => {
        const fetchCompetitionNames = async () => {
            try {
                const response = await fetch('/api/competicao/names');
                const data = await response.json();
                setAllSuggestions(data); 
                setSuggestions(data);
            } catch (error) {
                console.error('Erro ao buscar sugestões: ', error);
            }
        };

        fetchCompetitionNames();
    }, []);

    const handleSearch = async () => {
        try {
            const response = await fetch(`/api/competicao/codes?name=${competitionName}`);
            const data = await response.json();
            setCompetition(data);
        } catch (error) {
            console.error('Erro ao buscar competição: ', error);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setCompetitionName(suggestion);
        setSuggestions([]);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setCompetitionName(value);

        const filteredSuggestions = allSuggestions.filter(suggestion =>
            suggestion.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);

        if (value === '') {
            setCompetition(null);
        }
    };

    return (
        <div>
            <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Buscar Liga</h1>

            <input
                type="text"
                value={competitionName}
                onChange={handleInputChange}
                placeholder="Digite o nome da liga"
                style={{
                    padding: '10px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    marginRight: '10px',
                }}
            />
            <button
                onClick={handleSearch}
                style={{
                    padding: '10px',
                    backgroundColor: 'blue',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                Buscar
            </button>

            {suggestions.length > 0 && (
                <ul>
                    {suggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}

            {competition && competition.currentSeason != undefined ? (
                <div>
                    <h2>Informações da Liga:</h2>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {competition.emblem && (
                            <img
                                src={competition.emblem}
                                alt="Emblema da Liga"
                                style={{ width: '3em', height: '3em', marginRight: '10px' }}
                            />
                        )}
                        <div>
                            <p style={{ fontSize: '20px' }}>Nome: {competition.name}</p>
                            <p>Código: {competition.code}</p>
                        </div>
                    </div>
                    <p>
                        Temporada Atual: {competition.currentSeason.startDate} até{' '}
                        {competition.currentSeason.endDate}
                    </p>
                </div>
            ) : (
                <p>{competition && `Não conseguimos encontrar ${competitionName}, você digitou o nome corretamente?`}</p>
            )}
        </div>
    );
};

export default Competicoes;
