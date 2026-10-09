// Importa las unidades y les asigna nombres distintos para cada nivel HSK.
import { unidad1 as hsk1Unidad1 } from './hsk1/unidad1.js?v=4';
import { unidad2 as hsk1Unidad2 } from './hsk1/unidad2.js?v=3';
import { unidad3 as hsk1Unidad3 } from './hsk1/unidad3.js?v=4';
import { unidad4 as hsk1Unidad4 } from './hsk1/unidad4.js?v=4';
import { unidad5 as hsk1Unidad5 } from './hsk1/unidad5.js?v=4';
import { unidad6 as hsk1Unidad6 } from './hsk1/unidad6.js?v=4';
import { unidad1 as hsk2Unidad1 } from './hsk2/unidad1.js?v=5';
import { unidad2 as hsk2Unidad2 } from './hsk2/unidad2.js?v=4';
import { unidad3 as hsk2Unidad3 } from './hsk2/unidad3.js?v=4';
import { unidad4 as hsk2Unidad4 } from './hsk2/unidad4.js?v=4';
import { unidad5 as hsk2Unidad5 } from './hsk2/unidad5.js?v=4';
import { unidad6 as hsk2Unidad6 } from './hsk2/unidad6.js?v=4';
import { unidad7 as hsk2Unidad7 } from './hsk2/unidad7.js?v=4';
import { unidad8 as hsk2Unidad8 } from './hsk2/unidad8.js?v=4';
import { unidad9 as hsk2Unidad9 } from './hsk2/unidad9.js?v=4';
import { unidad10 as hsk2Unidad10 } from './hsk2/unidad10.js?v=4';
import { unidad1 as hsk3Unidad1 } from './hsk3/unidad1.js?v=5';
import { unidad2 as hsk3Unidad2 } from './hsk3/unidad2.js?v=6';
import { unidad3 as hsk3Unidad3 } from './hsk3/unidad3.js?v=6';
import { unidad4 as hsk3Unidad4 } from './hsk3/unidad4.js?v=4';
import { unidad5 as hsk3Unidad5 } from './hsk3/unidad5.js?v=6';
import { unidad6 as hsk3Unidad6 } from './hsk3/unidad6.js?v=4';
import { unidad7 as hsk3Unidad7 } from './hsk3/unidad7.js?v=5';
import { unidad8 as hsk3Unidad8 } from './hsk3/unidad8.js?v=4';
import { unidad1 as hsk4Unidad1 } from './hsk4/unidad1.js?v=5';
import { unidad2 as hsk4Unidad2 } from './hsk4/unidad2.js?v=3';
import { unidad3 as hsk4Unidad3 } from './hsk4/unidad3.js?v=3';
import { unidad4 as hsk4Unidad4 } from './hsk4/unidad4.js?v=3';
import { unidad5 as hsk4Unidad5 } from './hsk4/unidad5.js?v=3';
import { unidad6 as hsk4Unidad6 } from './hsk4/unidad6.js?v=3';
import { unidad7 as hsk4Unidad7 } from './hsk4/unidad7.js?v=3';
import { unidad1 as hsk5Unidad1 } from './hsk5/unidad1.js?v=5';
import { unidad2 as hsk5Unidad2 } from './hsk5/unidad2.js?v=4';
import { unidad3 as hsk5Unidad3 } from './hsk5/unidad3.js?v=5';
import { unidad4 as hsk5Unidad4 } from './hsk5/unidad4.js?v=4';
import { unidad5 as hsk5Unidad5 } from './hsk5/unidad5.js?v=4';
import { unidad6 as hsk5Unidad6 } from './hsk5/unidad6.js?v=4';
import { unidad1 as hsk6Unidad1 } from './hsk6/unidad1.js?v=4';
import { unidad2 as hsk6Unidad2 } from './hsk6/unidad2.js?v=4';
import { unidad3 as hsk6Unidad3 } from './hsk6/unidad3.js?v=3';
import { unidad4 as hsk6Unidad4 } from './hsk6/unidad4.js?v=3';
import { unidad5 as hsk6Unidad5 } from './hsk6/unidad5.js?v=3';
import { unidad1 as hsk79Unidad1 } from './hsk7-9/unidad1.js?v=3';
import { unidad2 as hsk79Unidad2 } from './hsk7-9/unidad2.js?v=3';

// Agrupa los niveles y ordena sus unidades para la navegación y los desbloqueos.
export const catalogoHSK = [
  {
    id: 1,
    nombre: 'HSK 1',
    unidades: [hsk1Unidad1, hsk1Unidad2, hsk1Unidad3, hsk1Unidad4, hsk1Unidad5, hsk1Unidad6]
  },
  {
    id: 2,
    nombre: 'HSK 2',
    unidades: [
      hsk2Unidad1,
      hsk2Unidad2,
      hsk2Unidad3,
      hsk2Unidad4,
      hsk2Unidad5,
      hsk2Unidad6,
      hsk2Unidad7,
      hsk2Unidad8,
      hsk2Unidad9,
      hsk2Unidad10
    ]
  },
  {
    id: 3,
    nombre: 'HSK 3',
    unidades: [
      hsk3Unidad1,
      hsk3Unidad2,
      hsk3Unidad3,
      hsk3Unidad4,
      hsk3Unidad5,
      hsk3Unidad6,
      hsk3Unidad7,
      hsk3Unidad8
    ]
  },
  {
    id: 4,
    nombre: 'HSK 4',
    unidades: [
      hsk4Unidad1,
      hsk4Unidad2,
      hsk4Unidad3,
      hsk4Unidad4,
      hsk4Unidad5,
      hsk4Unidad6,
      hsk4Unidad7
    ]
  },
  {
    id: 5,
    nombre: 'HSK 5',
    unidades: [
      hsk5Unidad1,
      hsk5Unidad2,
      hsk5Unidad3,
      hsk5Unidad4,
      hsk5Unidad5,
      hsk5Unidad6
    ]
  },
  {
    id: 6,
    nombre: 'HSK 6',
    unidades: [hsk6Unidad1, hsk6Unidad2, hsk6Unidad3, hsk6Unidad4, hsk6Unidad5]
  },
  {
    id: 7,
    nombre: 'HSK 7–9',
    unidades: [hsk79Unidad1, hsk79Unidad2]
  }
];

// Busca una unidad por nivel e identificador; devuelve undefined si no existe.
export function obtenerUnidad(numeroHSK, numeroUnidad) {
  const nivel = catalogoHSK.find((hsk) => hsk.id === numeroHSK);
  return nivel?.unidades.find((unidad) => unidad.id === numeroUnidad);
}
