# Simple Pokédex

Una Pokédex digital construida con [Vue 3](https://vuejs.org/), [TypeScript](https://www.typescriptlang.org/) y [Vite](https://vitejs.dev/). Permite explorar, buscar y marcar como favoritos a tus Pokémon preferidos, mostrando información detallada de cada uno.

## Características

- Listado de Pokémon con scroll infinito
- Búsqueda por nombre con resultados en pantalla dedicada
- Favoritos persistentes en almacenamiento local
- Vista de detalles de cada Pokémon
- Interfaz moderna y responsiva

## Tecnologías

- [Vue 3](https://vuejs.org/) + Composition API
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/) (manejo de estado)
- [Vue Router](https://router.vuejs.org/) (ruteo)
- [Axios](https://axios-http.com/) (peticiones HTTP)
- [Sass](https://sass-lang.com/) (estilos)
- [PokeAPI](https://pokeapi.co/) (fuente de datos)

## Estructura del proyecto

```
src/
  components/
  composables/
  router/
  service/
  stores/
  styles/
  types/
  views/
```

## Comandos

```sh
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview
```

## Uso

1. Ejecuta `npm install` para instalar las dependencias.
2. Usa `npm run dev` para iniciar el servidor de desarrollo.
3. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Créditos

- [PokeAPI](https://pokeapi.co/) por la API de Pokémon.
- Inspirado por la Pokédex clásica de los juegos de Pokémon.

---

¡Disfruta explorando el mundo Pokémon!
