export default class PokemonService {
	getAllPokemonTypes() {
		const tipos = [];
		fetch('https://pokeapi.co/api/v2/type/')
			.then(async response => {
				const data = await response.json();
				let ti = data.results;
				for (let i = 0; i < ti.length; i++) {
					tipos.push(ti[i].name);
				}
			})
			.catch(error => {
				this.errorMessage = error;
				console.error(error);
			});
		return tipos;
	}

	getAllPokemonByType(name) {
		const pokemons = [];
		let listo = 0;
		return new Promise(resolve => {
			fetch('https://pokeapi.co/api/v2/type/' + name)
				.then(async response => {
					const data = await response.json();
					let pk = data.pokemon;
					for (let i = 0; i < pk.length; i++) {
						fetch(pk[i].pokemon.url)
							.then(async response => {
								const data = await response.json();
								let pm = data;
								let pokeID = pm.id;
								let pokeName = pm.name;
								let base_experience = pm.base_experience;
								let height = pm.height;
								let weight = pm.weight;
								let moves = pm.moves;
								let type1 = pm.types[0]['type'].name;
								let type2 = null;
								let colorType1 = '';
								if (type1 == 'normal') {
									colorType1 = 'brown lighten-2';
								} else if (type1 == 'fighting') {
									colorType1 = 'red darken-3';
								} else if (type1 == 'flying') {
									colorType1 = 'purple lighten-3';
								} else if (type1 == 'poison') {
									colorType1 = 'purple darken-1';
								} else if (type1 == 'ground') {
									colorType1 = 'brown darken-1';
								} else if (type1 == 'rock') {
									colorType1 = 'brown darken-3';
								} else if (type1 == 'bug') {
									colorType1 = 'light-green lighten-1';
								} else if (type1 == 'ghost') {
									colorType1 = 'deep-purple darken-4';
								} else if (type1 == 'steel') {
									colorType1 = 'grey lighten-1';
								} else if (type1 == 'fire') {
									colorType1 = 'deep-orange';
								} else if (type1 == 'water') {
									colorType1 = 'light-blue';
								} else if (type1 == 'grass') {
									colorType1 = 'green';
								} else if (type1 == 'electric') {
									colorType1 = 'yellow darken-1';
								} else if (type1 == 'psychic') {
									colorType1 = 'pink darken-1';
								} else if (type1 == 'ice') {
									colorType1 = 'blue lighten-4';
								} else if (type1 == 'dragon') {
									colorType1 = 'deep-purple accent-3';
								} else if (type1 == 'dark') {
									colorType1 = 'brown darken-4';
								} else if (type1 == 'fairy') {
									colorType1 = 'pink lighten-4';
								}
								let colorType2 = '';
								if (pm.types[1]) {
									type2 = pm.types[1]['type'].name;
									if (type2 == 'normal') {
										colorType2 = 'brown lighten-2';
									} else if (type2 == 'fighting') {
										colorType2 = 'red darken-3';
									} else if (type2 == 'flying') {
										colorType2 = 'purple lighten-3';
									} else if (type2 == 'poison') {
										colorType2 = 'purple darken-1';
									} else if (type2 == 'ground') {
										colorType2 = 'brown darken-1';
									} else if (type2 == 'rock') {
										colorType2 = 'brown darken-3';
									} else if (type2 == 'bug') {
										colorType2 = 'light-green lighten-1';
									} else if (type2 == 'ghost') {
										colorType2 = 'deep-purple darken-4';
									} else if (type2 == 'steel') {
										colorType2 = 'grey lighten-1';
									} else if (type2 == 'fire') {
										colorType2 = 'deep-orange';
									} else if (type2 == 'water') {
										colorType2 = 'light-blue';
									} else if (type2 == 'grass') {
										colorType2 = 'green';
									} else if (type2 == 'electric') {
										colorType2 = 'yellow darken-1';
									} else if (type2 == 'psychic') {
										colorType2 = 'pink darken-1';
									} else if (type2 == 'ice') {
										colorType2 = 'blue lighten-4';
									} else if (type2 == 'dragon') {
										colorType2 = 'deep-purple accent-3';
									} else if (type2 == 'dark') {
										colorType2 = 'brown darken-4';
									} else if (type2 == 'fairy') {
										colorType2 = 'pink lighten-4';
									}
								}
								let ability = pm.abilities[0]['ability'].name;
								let abilityURL = pm.abilities[0]['ability'].url;
								fetch(abilityURL)
									.then(async response => {
										const data = await response.json();
										let ad = data;
										let description = '';
										if (ad.effect_entries[1]) {
											description = ad.effect_entries[1].effect;
										}
										var pokemon = new Object();
										pokemon.id = pokeID;
										pokemon.name = pokeName;
										pokemon.type1 = type1;
										pokemon.type2 = type2;
										pokemon.colorType1 = colorType1;
										pokemon.colorType2 = colorType2;
										pokemon.ability = ability;
										pokemon.description = description;
										pokemon.base_experience = base_experience;
										pokemon.height = height;
										pokemon.weight = weight;
										pokemon.moves = moves;
										pokemon.image = 'https://pokeres.bastionbot.org/images/pokemon/' + pokeID + '.png';
										pokemons.push(pokemon);
										listo += 1;
										if (listo == pk.length) {
											resolve(pokemons);
										}
									})
									.catch(error => {
										this.errorMessage = error;
										console.error(error);
									})
							})
							.catch(error => {
								this.errorMessage = error;
								console.error(error);
							});
					}
				})
				.catch(error => {
					this.errorMessage = error;
					console.error(error);
				});
		});
	}
}