# reservamos-challenge
Challenge preparado para Reservamos, una aplicación dedicada a facilitar tus viajes en bus y en avión.

La aplicación consiste en una simple funcionalidad de seleccionar varios destinos (ciudades) y verificar mediante OpenWeather cual es el tiempo actual y los siguientes siete días.
De esta forma, se pueden seleccionar varios destinos y verificar cual será el tiempo pronosticado para los siguientes días en el que vas a viajar.

## ESPECIFICACIÓN
- React Native: 0.67.2
- Hermes: Activado

## INSTALACIÓN
En el repositorio deje un archivo .env, en un proyecto esto no debería ser así, ahi se encuentra la API KEY y la URL de los servicios.

### Clonar el repositorio
```bash
git clone https://github.com/diegobugs/reservamos-challenge.git
```
### Instalar dependencias
```bash
yarn install
```

### Conectar un dispositivo Android o iOS

### Ejecutar la aplicación en release
Android
```bash
yarn android --variant=release
```
iOS
```bash
yarn ios --variant=release
```

## DEMO APK
En caso de que no funcione instalar mediante la clonación del repo.
Dejo una APK para android en este enlace:
```url
https://drive.google.com/drive/folders/1c-iHpxucNylIhoH3k9WpXcFDOgugDGT2?usp=sharing
```

## FEATURES

- React Navigation Native
- Redux con ReduxToolkit
- Moment JS para control de fechas y horas
- Collapsible para tarjetas con información del clima.
- Reanimated para animaciones y desplazamiento de objetos.
- Lotties para animaciones
- Redux persist para manejar los datos persistentes aunque se cierre la aplicación
- Typescript para tipado

## SCREENSHOTS

### iOS
![ios](https://user-images.githubusercontent.com/18753861/161083298-67fcf663-8fe1-423c-ba6f-b3f90c03264c.gif)

### Android
![android](https://user-images.githubusercontent.com/18753861/161086220-a81dfbb2-cbdc-421e-a2dc-e543ad4d680c.gif)
