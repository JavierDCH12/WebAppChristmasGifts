import rawgpy

# Crea una instancia del cliente RAWG
rawg = rawgpy.RAWG("WebApp")  # Sustituye con un identificador para tu aplicación

# Realiza la búsqueda de videojuegos
query = "action"  # Término de búsqueda
results = rawg.search(query)  # Devuelve los primeros 5 resultados por defecto

# Itera sobre los resultados
for game in results:
    game.populate()  # Obtén información adicional del videojuego
    print(f"Name: {game.name}")
    print(f"Description: {game.description}")
    print("Stores:")
    for store in game.stores:
        print(f" - {store.url}")
