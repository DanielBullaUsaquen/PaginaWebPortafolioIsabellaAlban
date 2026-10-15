import type { ImageMetadata } from 'astro';
import isalban from '../assets/imagenes/isalban.png';
import manual from '../assets/imagenes/manual.jpg';
import vinilos from '../assets/imagenes/vinilos.jpg';
import infografia from '../assets/imagenes/infografia.jpg';

export interface Proyecto {
  id: string;
  titulo: string;
  descripcion: string;
  etiquetas: string[];
  imagen: ImageMetadata;
  alt: string;
  /** 'contain' muestra la pieza completa (p. ej. un logotipo sobre blanco). */
  encuadre?: 'cover' | 'contain';
}

export const proyectos: Proyecto[] = [
  {
    id: 'isalban',
    titulo: 'ISALBÁN',
    descripcion: 'Identidad visual propia que permite la correcta proyección en el medio profesional.',
    etiquetas: ['Diseño de identidad visual', 'Identidad personal'],
    imagen: isalban,
    alt: 'Logotipo de ISALBÁN: un ojo de pestañas negras con anillos azules y pupila roja, sobre la palabra ISALBÁN y el texto «Diseñadora editorial».',
    encuadre: 'contain',
  },
  {
    id: 'manual',
    titulo: 'No - Manual de urbanidad de bolsillo para mujeres',
    descripcion:
      'Libro que analiza el Manual de urbanidad y buenas maneras de Manuel Antonio Carreño como una infraestructura moral que ha generado a través de los años jerarquías de género, sobre todo en la identidad femenina.',
    etiquetas: ['Diseño editorial'],
    imagen: manual,
    alt: 'Libro de tapas rojas abierto en forma de abanico sobre una pizarra negra, con páginas en tonos crema y fotografías en blanco y negro.',
  },
  {
    id: 'vinilos',
    titulo: 'Those who remain silent',
    descripcion:
      'Tres discos de vinilo inspirados en la estrecha colaboración entre el director Darren Aronofsky y su compositor de cabecera, Clint Mansell.',
    etiquetas: ['Diseño editorial', 'Creación de imagen'],
    imagen: vinilos,
    alt: 'Tres discos de vinilo con sus portadas ilustradas —Reflections of Obsession, Internal Colapse y Fragments in Flames— sobre un fondo en movimiento.',
  },
  {
    id: 'infografia',
    titulo: '¿Como, cocino cáncer?',
    descripcion:
      'Cómo alimentos aparentemente “saludables”, debido a malas prácticas culinarias, liberan acrilamida, un procarcinógeno al cual está expuesto el 80 % de la población mundial.',
    etiquetas: ['Diseño de información', 'Diseño de infografía'],
    imagen: infografia,
    alt: 'Infografía en naranja y azul titulada «¿Como cocino cáncer?» enmarcada en la pared de una sala de espera.',
  },
];
