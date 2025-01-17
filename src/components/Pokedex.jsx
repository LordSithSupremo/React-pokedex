import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/pokedex.css';


const Pokedex = () => {
        // Váriaveis para armazenar os dados do Pokémon e o valor do input
        const [pokemonName, setPokemonName] = useState('Carregando busca...');
        const [pokemonNumber, setPokemonNumber] = useState('');
        const [pokemonImage, setPokemonImage] = useState('');
        const [searchPokemon, setSearchPokemon] = useState(1);
        const [inputValue, setInputValue] = useState('');

        // Função para fazer a buscar do Pokémon atráves do Axios
        const fetchPokemon = async (pokemon) => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
                return response.data;
            } catch (error) {
                console.error('Erro ao buscar o Pokémon', error);
                return setPokemonName('Erro ao buscar o Pokémon', error);
            }
        };

        // Função para renderização do Pokémon na tela
        const renderPokemon = async (pokemon) => {
            setPokemonName('Carregando busca...');
            setPokemonNumber('');
            setPokemonImage('');

            const data = await fetchPokemon(pokemon);

            if (data) {
                setPokemonImage(data.sprites.versions['generation-v']['black-white'].animated.front_default);
                setPokemonName(data.name);
                setPokemonNumber(data.id);
                setInputValue('');
                setSearchPokemon(data.id);
            } else {
                setPokemonImage('');
                setPokemonName('Pokémon não encontrado');
                setPokemonNumber('');
            }
        };

        // Efeito de renderização do Pokémon para quando searchPokemon mudar
        useEffect(() => {
            renderPokemon(searchPokemon);
        }, [searchPokemon]);

        // Função para o envio do formulário
        const handleSubmit = (event) => {
            event.preventDefault();
            renderPokemon(inputValue.toLowerCase());
        };

        // Funções dos botões para avançar e retroceder entre os Pokémons
        const handlePrev = () => {
            if (searchPokemon > 1) {
                setSearchPokemon(searchPokemon - 1);
            }
        };
        
        const handleNext = () => {
            setSearchPokemon(searchPokemon + 1);
        };

        return (
        <>
            <div className='pokedex'>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                    className="input_search"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Digite o nome ou número do Pokémon"
                    />
                    <button type="submit">Buscar</button>
                </form>

                <div className="pokedex-visor">
                    <div className="pokemon-info">
                        <h2 className="pokemon_name">{pokemonName}</h2>
                        <p className="pokemon_number">{pokemonNumber}</p>
                        {pokemonImage && <img className="pokemon_img" src={pokemonImage} alt={pokemonName} />}
                    </div>
                </div>

                <div className="buttons">
                    <button className="btn-before" onClick={handlePrev}>Anterior</button>
                    <button className="btn-after" onClick={handleNext}>Próximo</button>
                </div>
            </div>
        </>
        )
};

export default Pokedex;