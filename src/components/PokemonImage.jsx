function PokemonImage({ pokemon, imgKey, caption }) {
    const src = pokemon.sprites[imgKey]
    return src ? (
        <div>
            <img src={src} alt={`Picture of the pokémon "${pokemon.name}", ${caption}`} />
            <p>{caption}</p>
        </div>
    ) : <></>
}

export default PokemonImage;