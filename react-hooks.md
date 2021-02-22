# 01 Use State

## Resumen

Este ejemplo toma como punto de partida el ejemplo _00-boiler-plate_.

Vamos a crear un componente que por un lado muestre un nombre en
un **h4**, y por otro permita editarlo utilizando un **input**.

## Paso a Paso

- Vamos a crear un fichero que llamaremos _demo.tsx_, vayamos paso a paso
  primero nos importamos **React** ¿Por qué si de primeras no uso nada que
  ponga _React._ porque en el momento que empezamos a poner tsx/jsx
  (es decir es∏Zos _h1_, _input_ o _div_ que después se traducen a
  _React.createElement_ es necesario importarlo).

_demo.tsx_

```tsx
import React from "react";
```

Añadimos al fichero un componente de tipo funcion:

_demo.tsx_

```tsx
export const MyComponent: React.FC = () => {
  return <>Prueba</>;
};
```

- Usando la palabra reservada _export_ podemos exponer este fichero al exterior.
- No es extrictamente necesario tiparlo con _React.FC_ (Function Component), pero
  es buena idea, todo lo que nos atemos a _Typescript_ nos servirá para tener
  menos dolores de cabeza en el futuro.
- El componente no es más que una functiona que devuelve elementos de React.
  Fijate que en este caso no hemos puesto _Props_ ya que no consume ninguna
  del exterior.

- Vamos a por la parte interesante, seguro que nuestra mente Java on Angular
  nos mueve a implementar lo siguiente (**IMPORTANTE: ESTO ESTA MAL**).

```diff
export const MyComponent : React.FC = () => {
+ let myName = 'John Doe';
  return (
    <>
-    Prueba
+    <h4>{myName}</h4>
+    <input
+      value={myName}
+      onChange={(e) => myName = e.target.value}
+     />
    </>
  )
}
```

Si llegáis a un proyecto React y os encontráis código como este, huele a que los
que lo han codificado no se tomaron el tiempo de aprender las bases de esta
librerías, veamos porque:

- Al crear una variable, cada vez que se vuelva a repintar el componente
  _myName_ va a valer siempre _John Doe_, esto no deja de ser una función que se
  ejecuta una y otra vez en cada repintado.,

- Asignando directamente en el _input_ un valor a una variable nos cargamos
  dos de los pilares de React, el flujo unidireccional, y que el seteo del
  estado sea asíncrono.

Si queréis verlo en acción sólo tenéis que añadirlo al fichero _app.tsx_

_./src/app.tsx_

```diff
import React from "react";
+ import {MyComponent} from './demo';

export const App = () => {
-  return <h1>Hello React !!</h1>;
+  return <MyComponent/>
};
```

Vale... ¿Cómo puedo manejar esto? ¡ Con los hooks de React ! Tenemos
_React.useState_

- Se inicializa con un valor por defecto.

- Te devuelve un array que contiene una especie getter y un setter (te permite
  acceder al valor que está en useState y te permite
  hacer una petición y setearlo de forma asíncrona).

- La manera más cómoda de consumir lo que devuevel ese _useState_ es hacer
  destructuring sabiendo que el primer elemento del array siempre será
  nuestro _getter_ y el segundo nuestro \_setter.

¿Por qué narices usa un array? Aquí viene la genialidad, si hubiese devuelto
un objeto, al hacer destructuring del objeto habríamos tenido que cenirños
a un nombre concreto de getter y a uno de setter, esto es un rollo porque
en un componente podemos tener multiples state, y además queremos añadirle
sentido a los nombres, ¿Porque tener un _setState_ genérico cuando podemos
tener un _setName_ o un _setLastname_?

- Vamos a montar este componente con _Hooks_

Primero hacemos uso del _setState_

_./src/demo.tsx_

```diff
export const MyComponent: React.FC = () => {
-  let myName = "John Doe";
+  const [myName, setMyName] = React.useState('John Doe');
```

- Como hemos nombrado a nuestro _getter_ _myName_ nos vale
  tanto para mostrar el nombre en el _h4_, así como en el
  _input_

- Ahora viene la parte interesante, para poder capturar cuando
  el usuario teclea en el input nos suscribimos al evento
  _onChange_ (este es un evento estándar de HTML, más info [MDN](https://developer.mozilla.org/es/docs/Web/API/HTMLElement/change_event)).

¿ Qué tenemos aquí?

- \*_e_: argumento del _eventHandler_, nos da información del evento, expone una serie de propiedades..
- **e.target**: que DOM elemento genero el evento.
- **e.target.value**: que valor tiene ese elemento (la propiedad valor
  del DOM Element que genero el evento).

En este event handler aprovecha os para recojer el valor del input y pedir
setear el estado de _myName_.

```diff
  <h4>{myName}</h4>
  <input
    value={myName}
-    onChange={(e) => (myName = e.target.value)}
+    onChange={(e) => (setMyName(e.target.value))}
  />
```

¿Qué va a provocar esto?

- Que la petición _setMyName_ actualize el estado.
- Esto va a lanzar un repintado del componente.
- Cuando se ejecute el código del componente y llegue a la línea
  de código que hace el _useState_ en vez de _John Doe_ se le
  facilitará el nombre que se almaceno con _setState_
- Al repintar el componente se usara ese nuevo valor mostrandolo
  por pantalla.

Es un cambio de mentalidad grande,... intenta repetir este ejemplo
sin ayuda y entenderlo bien, es tu primer gran paso para entender
como funciona esta tecnología.

# 02 Use State Object

## Resumen

Este ejemplo toma como punto de partida el ejemplo _01-use-state_.

En el ejemplo anterior almacenabamos un string en el estado, pero
no todo son tipos básicso, ¿Podemos almacenar un objeto utilizando
useState? Claro que si, lo único que cuando queremos introducir
cambios en el estado tenemos que seguir principio de inmutabilidad
y no modificar el objeto original.

## Paso a Paso


- Vamos a almacenar en el estado un objeto que tenga el nombre
  y apellido de un usuario, de primeras podemos escribir algo así como:

_./src/demo.tsx_

```diff
export const MyComponent: React.FC = () => {
-  const [myName, setMyName] = React.useState("John Doe");
+  const [userInfo, setUserInfo] = React.useState({
+    name: 'John',
+    lastname: 'Doe',
+  });
```

así creamos un estado al que le almacenamos el objeto, pero nos vendría
bien tener algo de strong typing, que nos ayude a encontrar fallos tontos
del tipo me olvide poner la "t" en lastname.

```diff
+ interface UserInfo {
+  name : string;
+  lastname: string;
+ }

export const MyComponent: React.FC = () => {
-  const [userInfo, setUserInfo] = React.useState({
+  const [userInfo, setUserInfo] = React.useState<UserInfo>({
    name: "John",
    lastname: "Doe",
  });
```

- Ya tenemos tipado el _useState_ en el que tenemos userInfo,
  vamos a mostrar los datos por defecto.

```diff
  return (
    <>
-      <h4>{myName}</h4>
+      <h4>{userInfo.name} {userInfo.lastname}</h4>
-      <input value={myName} onChange={(e) => setMyName(e.target.value)} />
    </>
  );
```

- Si arrancamos la aplicación podemos ver como se muesra el nombre y apellido.

- Ahora vamos al turrón, podríamos esta tentados de modificar directamente userInfo y
  ver que pasa, hacer algo así como (**SPOILER ALERT: ESTO ESTA MAL**):

```diff
  return (
    <>
      <h4>
        {userInfo.name} {userInfo.lastname}
      </h4>
+     <input
+       value={userInfo.name}
+       onChange={e => userInfo.name = e.target.value}
+     />
    </>
  );
```

Esto no va a funcionar, hemos vuelto a pensar en mentalidad Java,
estamos intentando modificar algo que está vivo en el momento
que se ejecuta esta función, tenemos que pedirle al estado
que vamos a introducir una modificación.

- La forma de hacer esto es pasandole al estado un nuevo objeto, en el que
  los valores que no cambian se mantienen y los que cambian se crean como
  nuevo objeto / entrada, aquí viene el spread operator (los tres puntitos)
  al rescate.

```diff
  return (
    <>
      <h4>
        {userInfo.name} {userInfo.lastname}
      </h4>
      <input
        value={userInfo.name}
-        onChange={(e) => (userInfo.name = e.target.value)}
+        onChange={(e) => setUserInfo({
+                 ...userInfo,
+                 name: e.target.value
+                 })}
      />
    </>
  );
```

Ahora si que funciona, cuando queremos actualizar _userInfo_ hacemos
la petición para actualizar el estado y le creamos un objeto nuevo
copiando todas las propiedades del antiguo y como último pasa machacamos
el valor de la propiedad que ha cambiado.

- Vamos a hacer lo mismo para lastname, si quieres dale a la pausa en este
  video e intentalo tu por tu cuenta.

```diff
  return (
    <>
      <h4>
        {userInfo.name} {userInfo.lastname}
      </h4>
      <input
        value={userInfo.name}
        onChange={(e) =>
          setUserInfo({
            ...userInfo,
            name: e.target.value,
          })
        }
      />
+      <input
+        value={userInfo.lastname}
+        onChange={(e) =>
+          setUserInfo({
+            ...userInfo,
+            lastname: e.target.value,
+          })
+        }
+      />
    </>
  );
```

Ahora podemos probar y ver que podemos actualizar tanto el nombre como
el apellido.

# 03 Component DOM on load

## Resumen

Este ejemplo toma como punto de partida el ejemplo _02-use-state-object_.

Vamos a empezar a jugar con otro de los hooks core de React: _useEffect_

Este Hook nos permite engancharnos a ciertos eventos en el tiempo y poder
ejecutar código.

Vamos a empezar por el más básico, ejecutar un código justo cuando un
componente se monta en el DOM.

Hay muchas operaciones que quieres ejecutar justo cuando se carga en
el DOM del navegador tu componente (cuando se empieza a ver), por
ejemplo cargar una ficha de un cliente de una API REST de servidor.

También hay operaciones que queremos poder ejecutar cuando cambie un
valor, o en después de cada render.

¿Qué pasa si esas operaciones no son síncronas? Por ejemplo quiero
tirar de un setTimeout o hacer un llamada a un servidor, esto devolvera una promesa, no es nada seguro ejecutar esto directamente en un componente funcional
ya que este se ejecuta y destruye, para esto (gestionar side effects) tenemos
_React.useEffect_

En este ejemplo vamos a ver como cambiar un nombre, justo cuando se
monta el componente, después simularemos una llamada asíncrona
utilizando _setTimeout_.

## Paso a Paso

- Vamos a sobreescribir el fichero _demo.tsx_ con el siguiente código:

```tsx
import React from "react";

export const MyComponent = () => {
  const [username, setUsername] = React.useState("");

  return (
    <>
      <h4>{username}</h4>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
    </>
  );
};
```

Volvemos a uno de nuestros ejemplos iniciales.

- Si lo ejecutamos:

```bash
npm start
```

- Vemos que el campo nombre está en blanco, esto es normal ya que
  le hemos asignado el valor inicialización a cade en blanco.

- ¿Y si quisieramos asignar un valor justo cuando se monta el componente
  en el dom? Podemos hacer uso de _React.useEffect_

```diff
export const MyComponent = () => {
  const [username, setUsername] = React.useState("");

+  React.useEffect(() => {
+    setUsername("John");
+  }, []);

  return (
```

Al ejecutar esto podemos ver como aparece el nombre de John por pantalla.

Si depuramos podemos y ponemos un breakpoint justo donde se invoca
a _react.useState_, otro en el render y otro dentro del código de _useEffect_ podemos ver que se llaman en el siguiente orden:

- Primero el _useState_
- Después el render.
- Después nuestro código de \_useEffect (sólo una vez).

Y si modificamos el _input_ asociado al campo _username_ no se vuelve
a ejecutar el código…

¿Porque pasa esto?

**React.useEffect**

En su primer parametro un código que puede contener sideffects
(una llamada a servidor, un setTimeout...).

Si no le informamos más parametros, esta función se ejecutara siempre
despues de cada render.

Esto no está mal, pero mucha veces nos hace falta acotar la ejecución
de cierto código (ejecutate sólo después del primer render del componente,
ejecutate sólo antes ciertas condiciones), por ejemplo podríamos decirle
al código que se ejecutará sólo cuando cambiará la propiedad _username_

```tsx
React.useEffect(() => {
  setUsername("John");
}, [name]);
```

Este ejemplo sería un poco tonto porque estamos modificando _username_ dentro
del porpio _useEffect_ se metería en un bucle infinito.

Un tema interesante:

- Hemos visto que si no informamos el segundo parametro no para de ejecutarse
  despues de cada render.

- También que si informamos una lista de valores como segundo parametro
  se ejecuta cuando estos valores cambian.

Peeero ¿Y si informamos esa lista como vacía? Si hacemos esto, el código
dentro del useEffect se ejecutará la primera vez (después del primer renderizado)
y no volvera a ejecutarse más ya que le estamos diciendo que no depende de ningún
valor de las propiedades o del estado, de esta manera no volverás a ejecutarse
(Para los que ya hayáis trabajado antes con React esto se parece al
componentDidMount de los componentes de clase de React).

Para cerrar este ejemplo vamos a simular una llamada asíncrono utilizando
_setTimeout_

```diff
React.useEffect(() => {
-  setUsername("John");
+    // Simulating async call
+    setTimeout(() => {
+      setUsername("John");
+    }, 1500);
}, []);
```

Si ejecutamos este código podemos ver como lanzamos nuestra aplicación
y después un segundo y medio se cambia el nombre de usuario a _John_.

# 04 Component DOM unmount

## Resumen

Este ejemplo toma como punto de partida el ejemplo _03-component-dom-onload_.

En este ejemplo vamos a ver como liberar recursos cuando desmontamos un
componente del DOM.

## Paso a Paso

- Vamos a crear un componente que muestra o oculta un texto dependiendo
  de un flag booleano.

_./src/demo.tsx_

```tsx
import React from "react";

export const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);

  return <>{visible && <h4>Hello</h4>}</>;
};
```

De primeras no se muestra el texto porque _visible_ está a falso.

Vamos a añadir un botón para cambiar el estado de _visible_

_./src/demo.tsx_

```diff
  return (
    <>
      {visible && <h4>Hello</h4>}
+      <button onClick={() => setVisible(!visible)}>
+        Toggle Child component visibility
+      </button>
    </>
  );
```

- Y si en vez de un \_h4\_\_, instanciamos un componente:

```diff
+ export const MyChildComponent = () => {
+   return <h4>Hello form child component</h4>
+ }

export const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
-      {visible && <h4>Hello</h4>}
+      {visible && <MyChildComponent/>}
      <button onClick={() => setVisible(!visible)}>
        Toggle Child component visibility
      </button>
    </>
  );
};
```

- Ahora tenemos un componente hijo que pinchando en un botón
  se monta o desmonta del dom.

¿Cómo podríamos hacer para mostrar un mensaje por la consola
del navegador cuando se montara el componente hijo?
Si recordamos el ejemplo anterior,sería con _React.useEffect_
¿Te animas a intentarlo? Dale a la pausa al video y ponte :).

Podríamos hacer algo así como:

_./src/demo.tsx_

```diff
export const MyChildComponent = () => {
+ React.useEffect(() => {
+  console.log('El componente se acaba de montar en el DOM')
+ }, [])
+
  return <h4>Hello form child component</h4>;
};
```

- Ahora viene la parte interesante, y si queremos mostrar un mensaje
  por la console del navegador cuando el componente se desmonta del DOM?
  En la misma función que ponemos como primer parametro devolvemos
  la función de "limpieza"... _useEffect_ se va a guardar esa función
  hasta que desmonte el DOM para invocarla:

```diff
export const MyChildComponent = () => {
  React.useEffect(() => {
    console.log("El componente se acaba de montar en el DOM");
+   return () => console.log("El componente se acaba de desmontar del DOM");
  }, []);
```

# 05 Component update render

## Resumen

Este ejemplo toma como punto de partida el ejemplo \_04-component-dom-unmount.

En este ejemplo vamos a ver como usar Reat.useEffect para ejecutar
un código justo después de cada renderizado.

## Paso a Paso

- Primero copiamos el ejemplo anterior, y hacemos un _npm install_

```bash
npm install
```

- Vamos abrir el fichero _demo.js_ y crear el ejemplo de un componente
  padre y un hijo que se muetra dependiendo de una condición booleana.

```tsx
import React from "react";

export const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      {visible && <MyChildComponent />}
      <button onClick={() => setVisible(!visible)}>
        Toggle Child component visibility
      </button>
    </>
  );
};

const MyChildComponent = () => {
  const [userInfo, setUserInfo] = React.useState({
    name: "John",
    lastname: "Doe",
  });

  return (
    <div>
      <h3>
        {userInfo.name} {userInfo.lastname}
      </h3>
      <input
        value={userInfo.name}
        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
      />
      <input
        value={userInfo.lastname}
        onChange={(e) => setUserInfo({ ...userInfo, lastname: e.target.value })}
      />
    </div>
  );
};
```

- Ahora viene la parte intresante, vamos a llamar a React.useEffect sólo
  informando el primer parametro.

```diff
const MyChildComponent = () => {
  const [userInfo, setUserInfo] = React.useState({
    name: "John",
    lastname: "Doe"
  });

+ React.useEffect(() => {
+    console.log("A. Called right after every render");
+
+  });

  return (
```

- Si ejecutamos podemos ver que este código se ejecuta después de cada renderizado del componente.

- También podemos añadir una función para liberar recursos justo antes de que se ejecute el siguiente render.

```diff
React.useEffect(() => {
    console.log("A. Called when the component is mounted and after every render");

+    return () =>
+      console.log(
+        "B. Cleanup function called after every render"
+      );
+  });
```

- Si ejecutamos podemos ver como se invocan las dos funciones.

# 06 AJAX Field Change

## Resumen

Este ejemplo toma como punto de partida el ejemplo \_05-component-update-render.

Pasamos a ver un ejemplo práctico, tenemos un listado de resultado de busqueda
(esto viene de un servidor), y queremos que cada vez que introduzcamos un
cambio en un input de filtrado, envíe una petición a servidor para obtener
la nueva lista filtrada y mostrarla.

Como postre veremos como utilizar Debounce (es decir esperar un poquito a
que el usuario termine de teclear para enviar la petición, ahorrando
así llamadas innecesarias)

## Paso a Paso

- Primero copiamos el ejemplo anterior, y hacemos un _npm install_

```bash
npm install
```

- Vamos abrir el fichero _demo.js_ y vamos añadir una entrada en el
  estado que almacene el filtro actual de busqueda, y otra en la que almacene
  una lista de usuarios.

```tsx
import React from "react";

export const MyComponent = () => {
  const [filter, setFilter] = React.useState("");
  const [userCollection, setUserCollection] = React.useState([]);

  return (
    <div>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <ul>
        {userCollection.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

- Ahora vamos a acceder a un rest api json, _typicode_ nos da alguna gratuita,
  esta por ejemplo: _https://jsonplaceholder.typicode.com/users_ además permite
  aplicar filtrados, la ponemos en el useEffecy y le añadimos como filtro que
  se ejecute cada vez que se cambie el filtro de busqueda:

```diff
export const MyComponent = () => {
  const [filter, setFilter] = React.useState('');
  const [userCollection, setUserCollection] = React.useState([]);

+  // Load full list when the component gets mounted and filter gets updated
+  React.useEffect(() => {
+    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
+        .then(response => response.json())
+        .then(json => setUserCollection(json));
+  }, [filter]);

  return (
```

**OJO !!! Typicode** corre en un heroku gratuito que se duerme cada X tiempo :)
Vamos a probar con otra API

https://swapi.dev/documentation#auth

```jsx
React.useEffect(() => {
  fetch(`https://swapi.dev/api/people?search=${filter}`)
    .then((response) => response.json())
    .then((json) => setUserCollection(json.results));
}, [filter]);
```

- Si ejecutamos este código podemos ver que la opcíon de filtrado funciona.

```bash
npm start
```

## BONUS

Esto está bien, pero no es optimo, normalmente queremos disparar la busqueda
justo cuando el usuario ha dejado de teclear para evitar hacer llamadas
innecesarias.

Nos podemos bajar una librería que implement un custom hook que hace
justo eso: https://github.com/xnimorz/use-debounce

Lo único que tendríamos que hacer:

```bash
npm install use-debounce --save
```

```diff
+ import { useDebounce } from 'use-debounce';

export const MyComponent = () => {
  const [filter, setFilter] = React.useState("");
+ const [debouncedFilter] =   useDebounce(filter, 500);
  const [userCollection, setUserCollection] = React.useState([]);

  // Load full list when the component gets mounted and filter gets updated
  React.useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
      .then((response) => response.json())
      .then((json) => setUserCollection(json));
-  }, [filter]);
+  }, [debouncedFilter]);
```

# 07 Custom Hooks

## Resumen

Este ejemplo toma como punto de partida el ejemplo \_06-ajax-field-change.

Esto de los hooks esta muy bien, pero si empezamos a usarlo en proyectos
reales, nos podemos encontrar que nuestros componente funcionales pueden
acabar manchados de un montón de código, y lo que es peor ¿ Cómo puedo
reusar funcionalidad? ... Para todo esto tenemos los customs hooks, si...
hacernos nuestros propios hooks, ya veréis que fácile son de crear.

## Paso a Paso

- Primero copiamos el ejemplo anterior, y hacemos un _npm install_


- Vamos a partir del código en el que teníamos un _input_ de filtrado
  y una lista de usuarios que venía de servidor. Si no lo tienes a mano
  aquí va el código:

_./src/demo.tsx_

```tsx
import React from "react";

export const MyComponent = () => {
  const [filter, setFilter] = React.useState("");
  const [userCollection, setUserCollection] = React.useState([]);

  // Load full list when the component gets mounted and filter gets updated
  React.useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
      .then((response) => response.json())
      .then((json) => setUserCollection(json));
  }, [filter]);

  return (
    <div>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <ul>
        {userCollection.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

- Vamos ahora a extraer la funcionalidad de carga y filtrado a un custom hooks
  lo haremos de dos formas.

La primera, encapsulandolo todo incluido el _useEffect_

_./src/demo.tsx_

```diff
import React from "react";

+ const useUserCollection = () => {
+  const [filter, setFilter] = React.useState("");
+  const [userCollection, setUserCollection] = React.useState([]);
+
+  // Load full list when the component gets mounted and filter gets updated
+  React.useEffect(() => {
+    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
+      .then(response => response.json())
+      .then(json => setUserCollection(json));
+  }, [filter]);
+
+  return {userCollection, filter, setFilter}
+ }

export const MyComponent = () => {
-  const [filter, setFilter] = React.useState("");
-  const [userCollection, setUserCollection] = React.useState([]);
+  const {userCollection, filter, setFilter} = useUserCollection();

-  // Load full list when the component gets mounted and filter gets updated
-  React.useEffect(() => {
-    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
-      .then(response => response.json())
-      .then(json => setUserCollection(json));
-  }, [filter]);

  return (
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      <ul>
        {userCollection.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

La ventaja de esta aproximación es que dejamos el código del componente muy simple.

La principal desventaja es que este hook es muy específico para este component,
¿ Y si sólo quisieramos cargar la lista la primera vez o bajo otras condiciones?

Vamos a ver una segunda opción:

```diff
import React from "react";

+ const useUserCollection = () => {
+  const [filter, setFilter] = React.useState("");
+  const [userCollection, setUserCollection] = React.useState([]);
+
+  const loadUsers = () => {
+    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
+      .then(response => response.json())
+      .then(json => setUserCollection(json));
+  }
+
+  return {userCollection, loadUsers, filter, setFilter}
+ }


export const MyComponent = () => {
+  const {userCollection, loadUsers, filter, setFilter} = useUserCollection();
+
+  React.useEffect(() => {
+    loadUsers();
+  }, [filter]);

-  const [filter, setFilter] = React.useState("");
-  const [userCollection, setUserCollection] = React.useState([]);

-  // Load full list when the component gets mounted and filter gets updated
-  React.useEffect(() => {
-    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${filter}`)
-      .then(response => response.json())
-      .then(json => setUserCollection(json));
-  }, [filter]);

  return (
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      <ul>
        {userCollection.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

La ventaja de esta opción es que hemos hecho un hook más flexible.

La principal desventaja es que estamos dejando el código del _useEffect_ dentro
del componente.

¿ Cual de las dos opciones es mejor? Aquí depende del escenario que te encuentres
en cada caso.

# 08 Pure component

## Resumen

Este ejemplo toma como punto de partida el ejemplo _07-custom-hook_.

Hay veces en las que nos hace falta hilar fino y sólo voler a repintar un componente si sus propiedades
han cambiado, si trabajamos con estructuras inmutables sólo tenemos que hacer un shallow compare.

Esto lo podíamos hacer facilmente con componentes de clase ¿ Cómo podemos hacerlo en componente de tipo función?
Vamos a ello.

## Paso a Paso

- Primero copiamos el ejemplo anterior, y hacemos un _npm install_

```bash
npm install
```

- Vamos a pegar un ejemplo en _demo.js_, este código va tener dos
  valores editables: _name_ y _lastname_ y vamos a tener un control
  hijo que sólo va a mostrar el _name_ (de hecho este componente
  sólo pedirá el campo nombre en las propiedades).

_./src_/demo.tsx\_

```tsx
import React from "react";

export const MyComponent = () => {
  const [userInfo, setUserInfo] = React.useState({
    name: " John ",
    lastname: "Doe",
  });

  return (
    <>
      <DisplayUsername name={userInfo.name} />
      <input
        value={userInfo.name}
        onChange={(e) =>
          setUserInfo({
            ...userInfo,
            name: e.target.value,
          })
        }
      />
      <input
        value={userInfo.lastname}
        onChange={(e) =>
          setUserInfo({
            ...userInfo,
            lastname: e.target.value,
          })
        }
      />
    </>
  );
};

interface Props {
  name: string;
}

export const DisplayUsername = (props: Props) => {
  console.log(
    "Hey I'm only rerendered when name gets updated, check React.memo"
  );

  return <h3>{props.name}</h3>;
};
```

- Para ver cuando se repinta hemos metido un _console.log_ en el componente hijo (DisplayUsername).

- Si lanzamos el ejemplo y probamos, veremos que da igual si cambio nombre o apellido el componente
  se repinta, y sólo queremos que se repinte cuando cambie el campo nombre, ¿Qué podemos hacer?
  **React.memo** al rescate, vamos a envolver el componente:

_./src/demo.tsx_

```diff
- export const DisplayUsername = (props: Props) => {
+ export const DisplayUsername = React.memo((props: Props) => {

  console.log(
    "Hey I'm only rerendered when name gets updated, check React.memo"
  );

  return <h3>{props.name}</h3>;
- };
+ });
```

- Si ejecutamos el ejemplo, podemos ver que ahora sólo se repinta el componente cuando
  cambia la propiedad nombre:

```bash
npm start
```

¿ Qué es lo que está haciendo _React.memo_? Esta aplicando el patrón memoize, recuerda
para la propiedad name el puntero del último render, cuando llega el siguiente los compara
y si son iguales devuelve el render del componente cacheado.

# 09 Pure component callback

## Resumen

Este ejemplo toma como punto de partida el ejemplo _08-pure-component_.

## Paso a Paso

- Primero copiamos el ejemplo anterior, y hacemos un _npm install_

```bash
npm install
```

- Vamos a añadir como punto de partida un componente padre
  que nos permite editar un nombre y apellido y un componente
  hijo que sirve para poner los valores de nombre y apellido a blanco.

_./src/demo.js_

```jsx
import React from "react";

interface Props {
  onReset: () => void;
}

const ResetValue: React.FC<Props> = React.memo((props) => {
  console.log(
    "Hey I'm only rendered the first time, check React.memo + callback"
  );

  return <button onClick={props.onReset}>Reset value</button>;
});

export const MyComponent = () => {
  const [username, setUsername] = React.useState("John");
  const [lastname, setLastname] = React.useState("Doe");

  const resetNameCallback = () => {
    setUsername("");
  };

  return (
    <>
      <h3>
        {username} {lastname}
      </h3>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <input value={lastname} onChange={(e) => setLastname(e.target.value)} />
      <ResetValue onReset={resetNameCallback}>Reset name</ResetValue>
    </>
  );
};
```

- Si ejecutamos el ejemplo, podemos ver que el render del componente
  _ResetValue_ se lanza cuando modificamos el campo nombre o el de apellido
  ¿ Cómo puede ser esto posible si sólo le pasamos como propiedad _resetNameCallback_
  y tenemos el componente envuelto en un _React.memo_.

Si pusiermoas el modo detective y utilizaramos el hook de ayuda _whyDidYouUpdate_
nos daríamos cuenta que el culpable es la funcióna: _resetNameCallback_
¿Por que? porque se crea una nueva en cada render... así _React.memo_ dispara el
render porque el puntero a la propiedad cambia.

¿ Qué podemos hacer para solucionar esto? Utilizar el hook _React.useCallback_
y tal como en _React.useEffect_ pasarle como segundo parametro un array vacio.

```diff
import React from "react";

export const MyComponent = () => {
  const [username, setUsername] = React.useState("John");
  const [lastname, setLastname] = React.useState("Doe");


-  const resetNameCallback = () => {setUsername('');}
+  const resetNameCallback = React.useCallback(() => setUsername(''), []);

  return (
    <>
      <h3>
        {username} {lastname}
      </h3>
      <input value={username} onChange={e => setUsername(e.target.value)} />
      <input value={lastname} onChange={e => setLastname(e.target.value)} />
      <ResetValue onReset={resetNameCallback}>Reset name</ResetValue>
    </>
  );
};

const ResetValue = React.memo(props => {
  console.log(
    "Hey I'm only rendered the first time, check React.memo + callback"
  );

  return (
    <button onClick={props.onReset}>Reset value</button>
  );
});
```

- Si ejecutamos el ejemplo, podemos ver que ya no se lanza el rerender en el componente _ResetValue_

¿ Cómo funciona esto? _useCallback_ guarda la función que se creo originalmente,
y devuelve esta en vez de crear una nueva en cada render, esto lo conseguimos
pasandole un array vacio como segundo parametro (como hacíamos con _React.useEffect_)
si queremos que se reevalue dependiendo del valor de una propiedad o estado, podemos
añadirlas al segundo aprametro de este callbakc (al igual que con useEffect), y si
omitimos el segundo parametro, esta función se reevaluara después de cada render.


# 10 useReducer

## Resumen

Este ejemplo toma como punto de partida el ejemplo _09-pure-component-callback_.

Ya hemos visto la potencia de los hooks, pero en ciertos escenarios en los
que puedes tener mucha lógica y muchos niveles de subcomponentes, pueden que
te lleve a tener problemas de mantenibilidad, para ciertos escenarios podemos
hacer uso del hook _useReducer_, inspirado en el patrón _Redux_.

## Paso a Paso

- Primero copiamos el ejemplo anterior, y hacemos un _npm install_

```bash
npm install
```

- Vamos a abrir el fichero _demo.js_ y crear un componente padre
  que va a tener información del nombre y apellido de una persona,
  y vamos a crear un componente hijo que nos va a servir para editar
  el campo nombre.

```tsx
import React from "react";

interface Props {
  name: string;
  onChange: (value: string) => void;
}

const EditUsername: React.FC<Props> = React.memo((props) => {
  console.log(
    "Hey I'm only rerendered when name gets updated, check React.memo"
  );

  return (
    <input
      value={props.name}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
});

export const MyComponent = () => {
  const [userInfo, setInfo] = React.useState({ name: "John", lastname: "Doe" });

  return (
    <>
      <h3>
        {userInfo.name} {userInfo.lastname}
      </h3>
      <EditUsername
        name={userInfo.name}
        onChange={(name) =>
          setInfo({
            ...userInfo,
            name,
          })
        }
      />
      <input
        value={userInfo.lastname}
        onChange={(e) =>
          setInfo({
            ...userInfo,
            lastname: e.target.value,
          })
        }
      />
    </>
  );
};
```

- En el componente hijo hemos metido un _console.log_ para que nos avise
  si el control se repinta o no, este control se repinta siempre porque
  en la propiedad _onChange_ estamos creando una función nueva en cada render.

Aquí podríams estar tentados a usar _react.useCallback_, ¿ Existe otra manera
de tratar esto? Vamos a ver la propuesta que ofrece _useReducer_

En use reducer agrupamos un conjunto de funcionalidad

- Por un lado tenemos el estado (los datos).
- Por otro lado tenemos acciones (que contiene un identificador y uno parametro
  con información) que se lanzan utilizando un dispatcher.
- Y esas acciones actualizan el estado en un reducer (un reducer es una función
  que acepta dos parametros el estado anterior y la acción, y te devuelve un nuevo
  estado)
- ¿En que consiste esto? En pensar que el estado actual es como el fotograma
  de una película, lo fijamos, nos llega una petición de cambio (con la acción)
  y se genera un nuevo fotograma en base al anterior y al cambio que se quiere hacer,
  si no hay cambio se devuelve el mismo que había antes.

Vamos primero a definir nuestro _reducer_

- Aprovechando que estamos trabajando con **TypeScript** vamos a tipar
  nuestro reducer y acciones:

_./src/demo.tsx_

```typescript
interface UserState {
  name: string;
  lastname: string;
}

interface Action {
  type: string;
  payload: any;
}

const actionIds = {
  setName: "setname",
  setLastname: "setlastname",
};
```

- Y ahora vamos a crear nuestro reducer

_./src/demo.tsx_

```tsx
const userInfoReducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case actionIds.setName:
      return {
        ...state,
        name: action.payload,
      };
    case actionIds.setLastname:
      return {
        ...state,
        lastname: action.payload,
      };
    default:
      return state;
  }
};
```

- Vamos ahora sustituir el _useState_ de nuestro componente por un _useReducer_
  veamos como queda.

Primero añadimos el _useReducer_

```diff
export const MyComponent = () => {
-  const [userInfo, setInfo] = React.useState({ name: "John", lastname: "Doe" });
+  const [userInfo, dispatch] = React.useReducer(userInfoReducer, {name: 'John', lastname: 'Doe'});
```

**¿Cómo funciona esto?**

Por un lado _useReducer_ recibe dos parametros el primero es la funcion de
reducer que hemo creado anteriormente, y el segundo es el estado inicial.

Por otro devuelve un array (como en _useState), sobre este array podemos
hacer destructuring, por un lado nos traemos la foto del estado actual
en el primer elemento del array, y por otro nos da un \_dispatcher_,
este dispatcher actua como un autobus, carga la acción que le demos
y la lleva la función reducer que actualiza el estado.

Vamos a ir cambiando el markup del render y adaptandolo a que use el estado

Al haber llamado _userInfo_ al state que ya tenemos nos hemos ahorrado trabajo
de refactorizacion.

Por otro lado vamos a cambiar el input que esta directamente en el componente
padre:

```diff
<input
  value={userInfo.lastname}
-        onChange={e => setInfo({
-          ...userInfo,
-          lastname: e.target.value,
-        })}
+        onChange={(e) => dispatch({type: actionIds.setLastname
+                                  ,payload: e.target.value})}
/>
```

Fijaros en este cambio, yo ya no cambio directamente el _state_,
mediante la función _dispatch_, yo le paso el tipo de acción
que quiero ejecutar, incluyendo los datos que cambian, para que
ese dispatch ejecuta la función de _useReducer_.

Ahora viene el cambio más fuerte, actualizar el componente hijo,
en este caso tenemos que cambiar la firma de las propiedades, delegamos en
el dispatch el envío de la información que cambia.

Esto en este ejemplo puede parece un cambio sin sentido, pero en un caso
complejo en el que podemos tener multitud de callbacks, nos ahorramos
pasarlos por propiedad, teniendolo todo agrupado en un sólo dispatch.

_./src/demo.tsx_

```diff
interface Props {
  name: string;
-  onChange: (value: string) => void;
+  dispatch: React.Dispatch<Action>;
}

const EditUsername: React.FC<Props> = React.memo((props) => {
  console.log(
    "Hey I'm only rerendered when name gets updated, check React.memo"
  );

  return (
    <input
      value={props.name}
-      onChange={(e) => props.onChange(e.target.value)}
+      onChange={(e) =>
+        props.dispatch({ type: actionIds.setName, payload: e.target.value })
+      }
    />
  );
});
```

- Vamos ahora actualizar el componente padre:

_./src/demo.tsx_

```diff
      <EditUsername
        name={userInfo.name}
-        onChange={(name) =>
-          setInfo({
-            ...userInfo,
-            name,
-          })
+        dispatch={dispatch}
        }
      />
```

Si ejecutamos el ejempo podemos ver que ya no se nos da el problema de
rerender, ¿ Por qué? Porque la funcion _dispatch_ no se regenera en cada render.

Utilizar _useReducer_ en este ejemplo ha sido como matar moscas a cañonazos, 
hemos elegido un ejemplo sencillo para poder aprender como funciona, lo
normal es que uses esto en casos complejos en los que tengas un estado rico,
y un monton de niveles de subcomponentes.

_useReducer_ no es una solución universal, y tiene sus desventajas, estás
atando la firma de las propiedas de tus componente a un _dispatch_ concreto
y también lanzando acciones esto hace que tus componentes sean menos
promocionables, va a ser más duro hacerlos reusables. Tienes que elegir
bien donde parar de usar dispatch y usar una firma convencional en componentes
que veas que pueden ser reusables.


# 11 useContext

## Resumen

Este ejemplo toma como punto de partida el ejemplo _10-use-reducer_.

Uno de los puntos fuertes de React es que conviertes tu componentes en cajas
negras, se conectan al exterior mediante un contrato que son las Props, esto
hace que React se muy robusto y que facilmente se puedan promocionar componentes específicos a reusables.

Hasta aquí todo genial, pero... ¿Qué pasa si tengo datos tranversales? Es decir
que pasa con los típicos datos comunes como el nombre y los roles que tiene el usuario que se ha logado en la aplicacíon, o que pasa cuando quiero navegar de una
ventana a otra, si seguimos los principios de React tendríamos esa información en el
componente padre de la aplicación e iríamos pasando de padre a hijo la propiedad, esto es malo por varios motivos;:

- Sufrimos el prop drill hell, es decir si un componente nieto necesita una propiedad tenemos que pasarle desde abuelo, padre, hijo, nieto... y a cada nivel
  que vaya bajando voy engordando la lista de propiedades de cada control.

- Acabo arrastrando propiedades que en ciertos componentes no tiene ni sentido
  que las tenga, pero un componento hijo.

¿ No habría una forma de compartir datos globales?

Lo primero que se nos puede venir a la cabeza es tenerlo en un objeto estático,
podría algo tan fácil como

_./src/bad-approach.tsx_

```typescript
export let userGlobalData = {
  login: "",
  roles: [],
};
```

Y donde me haga falta sólo tendría que hacer algo así como:

```typescript
userGlobalData.login;

userGlobalDAta.login = "john";
```

Esta aproximación que de primeras podríamos intentar defender (es ES6 plano, a fin
de cuentas React sólo se encarga del UI...), nos trae varios problemas:

- ¿Qué pasa si cambia el valor de _userGlobalData.login_ y tengo varias partes de
  la aplicación que lo están usando? ¿Cómo le notifico el cambio? Tendría que jugar
  tirando y recogiendo eventos globales para ir repintando.

- ¿Y si sólo quiero que este dato sea visible a un nivel de aplicación? Por
  ejemplo tengo datos de nuevo pedido en un wizard y quiero que sólo esten visible
  al nivel del wizard que estoy editando, es más cuando cierre el wizard quiero
  liberar el espacio de memoria. Esto que nos hemos creado es global.

- Y ya para terminar, si quiero usar Server Side Rendering (es decir pregenerar
  las páginas en el servidor para servir HTML, esto es bueno por ejemplo para
  tener un buen SEO), tendríamos un problema gordo... vasos comunicantes, todas
  las peticiones compartirían las mismas variables estáticas.

React incorpora un mecanismo muy potente, se llama **Context**

- El **Context** me permite compartir datos entre componentes sin pasar por las props.

- El Contexto vive dentro de un componente React, con lo que se integra en el
  flujo undireccional de React, es decir cualquier cambio que haga en él hace
  que se disparen actualizaciones de manera automática.

- El Contexto lo puedo colocar al nivel que quiera del arbol de componentes,
  es decir puedo poner disponibles esos datos a nivel de aplicacion completa
  o de por ejemplo una ventana que contenga varios tabs.

Y a todo esto tenemos que añadirle que React incorpora un hook que se llama
_useContext_ que hace que usarlo sea muy facil.

Vamos a ver como funciona esto.

## Paso a Paso

- Primero copiamos el ejemplo anterior, y hacemos un _npm install_

```bash
npm install
```

- Vamos a crear un context que me permita almacenar el nombre del usuario
  que se ha logado, nos hará falta un entrada para poder leer el dato
  y otra para escribirlo.

Borramos todos lo que hay en _demo.tsx_ y nos ponemos manos a la obra

_./src/demo.tsx_

```tsx
import React from "react";

interface UserContext {
  username: string;
  setUsername: (value: string) => void;
}

const MyContext = React.createContext({
  username: "",
  setUsername: (value) => {},
});
```

- El contexto necesita vivir dentro de un componente especial que llamamos
  provider, este el que le alimenta y le da cobijo, podemos pensar de esta combinación
  como en la pelicula de Alien, el contexto es el Alien y el provider es el pobre
  humano, vamos a crear un habitat a nuestro Alien que almacena el nombre del usuario:

_./src/demo.tsx_

```diff
import React from "react";

const MyContext = React.createContext({
  username: "",
  setUsername: () => {}
});

+ export const MyContextProvider = props => {
+  const [username, setUsername] = React.useState("John Doe");
+
+  return (
+    <MyContext.Provider value={{ username, setUsername }}>
+      {props.children}
+    </MyContext.Provider>
+  );
+ };
```

Fijate lo que tenemos aqui:

- Tenemos un componente que provee de estado a nuestro contexto.
- Alimentamos al contexto con esos datos.
- Metemos la propiedad children para pintar lo que tuviera por debajo
  ese componente (es decir como en la película de Alien, nadie se cuenta
  de que el humano lleva "un bichito" dentro).

- Vamos a crear un componente (añadimos esto al final del fichero _demo.tsx_)

_./src/demo.tsx_

```tsx
export const MyComponent = () => {
  return (
    <>
      <h3>Hello</h3>
    </>
  );
};
```

Vamos ahora a colocar a el provider a nivel global de la aplicación.

_./src/app.tsx_

```diff
import React from "react";
import ReactDOM from "react-dom";
- import { MyComponent } from "./demo";
+ import { MyComponent, MyContextProvider } from "./demo";
import "./styles.css";

function App() {
  return (
+    <MyContextProvider>
        <MyComponent />
+   </MyContextProvider>
  );
}
```

De esta manera dejo la puerta abierta que cualquier componente que este debajo
de ese provider (en este caso la aplicación entera pueda acceder al context).

Si te fijas, aquí aplica lo que comentamos de la propiedad _children_ todo lo que
hay debajo del contextprovider lo pinta tal cual ese componente.

- Y ahora vamos a acceder a los datos del contexto sin tener que pasar por las props:

```diff
export const MyComponent = () => {
+  const myContext = React.useContext(MyContext);

  return (
    <>
-      <h3>Hello</h3>
+     <h3>{myContext.username}</h3>

    </>
  )
}
```
