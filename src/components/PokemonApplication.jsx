import { useState, useEffect } from "react";
import Pokemon from "./Pokemon.jsx";

const URL = `https://pokeapi.co/api/v2/pokemon?limit=2000`

const gens = [
    [1, 151],
    [152, 251],
    [252, 386],
    [387, 493],
    [494, 649],
    [650, 721],
    [722, 809],
    [810, 905],
    [906, 1025]
]

function randRange(min, max) {
    return Math.floor(Math.random()*(max-min+1)) + min
}

function randGen(gen) {
    return randRange(...gens[gen])
}

function PokemonApplication() {
    const [pokemonList, setPokemonList] = useState("loading")
    const [chosenPokemonIndex, setChosenPokemonIndex] = useState(null)
    const [errorMsg, setErrorMsg] = useState("Something went wrong")

    const isFirst = () => chosenPokemonIndex === null || chosenPokemonIndex <= 0;
    const isLast = () => chosenPokemonIndex === null || chosenPokemonIndex >= (pokemonList.length - 1);
    
    async function fetchPokemon() {

        try {            
            const res = await fetch(URL)

            if (!res.ok) {
                setPokemonList("failed")
                setErrorMsg(res.statusText)
                return
            }

            const data = await res.json()
            console.log(data)
            setPokemonList(data.results)

        } catch (error) {
            console.error(error)
            setPokemonList("failed")
            setErrorMsg(error.message)
        }

        
    }


    useEffect(()=> {
        fetchPokemon()
    }, [])

    return pokemonList === "loading" ? <>
        Loading pokémon...
    </> : pokemonList === "failed" ? <>
        {errorMsg}
    </> : <>
        <div id="ui">
            <div id="menu">
                <select value={chosenPokemonIndex} onChange={e => {
                    if (e.target.value === null) return;
                    setChosenPokemonIndex(e.target.value)
                }}>
                    <option value={null}>Select a pokémon</option>
                    {pokemonList.map(p => p.name).map((name, i) => (
                        <option value={i} key={name}>
                            {name}
                        </option>
                    ))}
                </select>
                <div className="prev-next">
                    {!isFirst() && (
                        <button onClick={() => setChosenPokemonIndex(i => i-1)}>
                            Previous
                        </button>
                    )}
                    {!isLast() && (
                        <button onClick={() => setChosenPokemonIndex(i => i+1)}>
                            Next
                        </button>
                    )}
                </div>
                <div className="random-btns">
                    <button onClick={() => setChosenPokemonIndex(Math.floor(Math.random()*pokemonList.length))}>
                        Random (all)
                    </button>
                    {gens.map((_, i) => (
                        <button key={i} onClick={() => setChosenPokemonIndex(randGen(i))}>
                            Random (gen {i+1})
                        </button>
                    ))}
                </div>
            </div>
            <div id="view">
                {chosenPokemonIndex !== null ? (
                    <Pokemon pokemon={pokemonList[chosenPokemonIndex]} />
                ):(
                    <p>Select a pokémon from the list to get information</p>
                )}
            </div>
        </div>
    </>
}


export default PokemonApplication;