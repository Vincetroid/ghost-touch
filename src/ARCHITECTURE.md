# Clean Architecture

Capas y regla de dependencia: **las flechas de import solo apuntan hacia adentro**
(`app` → `presentation` → `application` → `domain`). Ninguna capa interna conoce
a las externas.

```
app/            expo-router: solo define rutas y monta pantallas de presentation/
presentation/   componentes, hooks y screens de React. Habla con application/ (use cases)
                a través de props/inyección, nunca importa infrastructure/ directamente.
application/    use-cases: orquestan reglas de negocio. Dependen de interfaces de domain/,
                nunca de una implementación concreta (fetch, AsyncStorage, etc).
domain/         entidades y contratos (repositories como interfaces). Cero dependencias
                de React, Expo o cualquier librería externa. Es TypeScript puro.
infrastructure/ implementaciones concretas de las interfaces de domain/repositories
                (llamadas HTTP, almacenamiento local, sensores del device, etc).
```

## Regla de oro

- `domain/` no importa nada de las otras capas.
- `application/` importa solo `domain/`.
- `infrastructure/` importa `domain/` (implementa sus interfaces).
- `presentation/` importa `application/` y tipos de `domain/`.
- El "wiring" (decidir qué implementación concreta de `infrastructure/` usa
  cada use case) se hace en un composition root — normalmente en `app/_layout.tsx`
  o un `src/di.ts` — no dentro de `presentation/`.

## Por qué

Así el negocio (`domain/` + `application/`) se puede testear sin React Native,
sin mockear Expo, y se puede cambiar de infraestructura (por ejemplo pasar de
REST a otro backend, o cambiar de storage) sin tocar pantallas ni reglas de negocio.
