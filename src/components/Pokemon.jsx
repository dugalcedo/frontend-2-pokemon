import { useState, useEffect } from "react";
import PokemonImage from "./PokemonImage.jsx";

const pokeMemo = {}

function Pokemon({ pokemon }) {

    const [data, setData] = useState("loading")
    const [errorMsg, setErrorMsg] = useState("Something went wrong")

    async function fetchPokemonData() {
        const existing = pokeMemo[pokemon.url]

        if (existing) {
            setData(existing)
            return
        }

        setData("loading")

        try {
            const res = await fetch(pokemon.url)
            if (!res.ok) {
                setErrorMsg(res.statusText)
                setData("failed")
            }
            const p = await res.json()
            pokeMemo[pokemon.url] = p
            setData(p)
        } catch (error) {
            console.error(error)
            setErrorMsg(error.message)
            setData("failed")
        }
    }

    useEffect(()=>{
        fetchPokemonData()
    }, [pokemon])

    return (
        <div className="pokemon">
            {data === "loading" ? <>
                Loading pokémon...
            </> : data === "failed" ? <>
                {errorMsg}
            </> : <>
                <div id="pokemon-images">
                    <PokemonImage pokemon={data} imgKey="front_default" caption="Front"/>
                    <PokemonImage pokemon={data} imgKey="back_default" caption="Back"/>
                    <PokemonImage pokemon={data} imgKey="front_shiny" caption="Front (shiny)"/>
                    <PokemonImage pokemon={data} imgKey="back_shiny" caption="Back (shiny)"/>
                </div>
                <table id="pokemon-info">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>{data.name}</td>
                        </tr>
                        <tr>
                            <th>Type{data.types.length > 1 && "s"}</th>
                            <td className="types">
                                {data.types.map(t => t.type.name).map(name => (
                                    <div key={name} className={`type-badge_${name}`}>{name}</div>
                                ))}
                            </td>
                        </tr>
                        <tr>
                            <th>Height</th>
                            <td>{(data.height/10).toFixed(1)}m</td>
                        </tr>
                        <tr>
                            <th>Weight</th>
                            <td>{(data.weight/10).toFixed(1)}kg</td>
                        </tr>
                        <tr>
                            <th>Cries</th>
                            <td>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Latest</th>
                                            <td>
                                                <audio controls>
                                                    <source src={data.cries.latest} />
                                                </audio>
                                            </td>
                                        </tr>
                                        {data.cries.legacy && (
                                            <tr>
                                                <th>Legacy</th>
                                                <td>
                                                    <audio controls>
                                                        <source src={data.cries.legacy} />
                                                    </audio>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <th>Starting abilities</th>
                            <td>{data.abilities.map(a => a.ability.name).join(', ')}</td>
                        </tr>
                        <tr>
                            <th>Base stats</th>
                            <td>
                                <table>
                                    <tbody>
                                        {data.stats.map(s => (
                                            <tr key={s.stat.name}>
                                                <th>{s.stat.name}</th>
                                                <td>{s.base_stat}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>}
        </div>
    )
}

export default Pokemon;