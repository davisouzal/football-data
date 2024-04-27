import React, { useEffect, useState, useRef } from 'react';
import { ICompetition } from '~/interfaces/ICompetition';


const Competicoes: React.FC = () => {
    const [competitionName, setCompetitionName] = useState<string>('');
    const [competition, setCompetition] = useState<ICompetition | null>(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [allSuggestions, setAllSuggestions] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchCompetitionNames = async () => {
            try {
                const response = await fetch('/api/competicao/names');
                const data = await response.json();
                setAllSuggestions(data);
            } catch (error) {
                console.error('Erro ao buscar sugestões: ', error);
            }
        };

        fetchCompetitionNames();

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
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
        setShowSuggestions(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setCompetitionName(value);

        const filteredSuggestions = allSuggestions.filter(suggestion =>
            suggestion.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions.slice(0, 5));
        setShowSuggestions(true);

        if (value === '') {
            setCompetition(null);
        }
    };

    const handleButtonClick = () => {
        handleSearch();
        setShowSuggestions(false);
    };

    return (
        <div style={{ position: 'relative' }}>
            <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Buscar Liga</h1>

            <div style={{ display: 'flex' }}>
                <input
                    ref={inputRef}
                    type="text"
                    value={competitionName}
                    onChange={handleInputChange}
                    placeholder='Digite o nome da liga'
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        marginRight: '10px',
                        flex: 1
                    }}
                />
                <button
                    onClick={handleButtonClick}
                    style={{
                        padding: '10px',
                        backgroundColor: 'blue',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Buscar
                </button>
            </div>

            {showSuggestions && suggestions.length > 0 && (
                <ul
                    style={{
                        position: 'absolute',
                        top: 'calc(100% + 5px)',
                        left: 0,
                        width: 'calc(100% - 2px)',
                        backgroundColor: '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        padding: '5px 0',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        zIndex: 1,
                        maxHeight: '150px',
                        overflowY: 'auto'
                    }}
                >
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            style={{
                                padding: '5px 10px',
                                cursor: 'pointer',
                                borderBottom: index !== suggestions.length - 1 ? '1px solid #ccc' : 'none'
                            }}
                        >
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
