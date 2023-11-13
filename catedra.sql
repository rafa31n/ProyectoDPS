-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 12-11-2023 a las 19:17:58
-- Versión del servidor: 8.0.31
-- Versión de PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `catedra`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `biblioteca_usuario`
--

DROP TABLE IF EXISTS `biblioteca_usuario`;
CREATE TABLE IF NOT EXISTS `biblioteca_usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_receta_biblio` int NOT NULL,
  `id_foraneo` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_receta_biblio` (`id_receta_biblio`),
  KEY `id_usuario` (`id_foraneo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `elementos_lista_personal`
--

DROP TABLE IF EXISTS `elementos_lista_personal`;
CREATE TABLE IF NOT EXISTS `elementos_lista_personal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_foraneo` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `tipo` varchar(30) NOT NULL,
  `cantidad` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_foraneo` (`id_foraneo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `elementos_lista_recetas`
--

DROP TABLE IF EXISTS `elementos_lista_recetas`;
CREATE TABLE IF NOT EXISTS `elementos_lista_recetas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_foraneo` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `tipo` varchar(30) NOT NULL,
  `cantidad` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_foraneo` (`id_foraneo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enlace_receta_lista`
--

DROP TABLE IF EXISTS `enlace_receta_lista`;
CREATE TABLE IF NOT EXISTS `enlace_receta_lista` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_receta` int NOT NULL,
  `id_foranea` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_foranea` (`id_foranea`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingredientes_biblioteca`
--

DROP TABLE IF EXISTS `ingredientes_biblioteca`;
CREATE TABLE IF NOT EXISTS `ingredientes_biblioteca` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_foraneo` int NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `cantidad` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_foraneo` (`id_foraneo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `ingredientes_biblioteca`
--

INSERT INTO `ingredientes_biblioteca` (`id`, `id_foraneo`, `nombre`, `tipo`, `cantidad`) VALUES
(1, 1, 'test', 'test', '2 lb'),
(2, 1, 'pureba', 'prueba', '2 onz');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingrediente_personal`
--

DROP TABLE IF EXISTS `ingrediente_personal`;
CREATE TABLE IF NOT EXISTS `ingrediente_personal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_foraneo` int NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `tipo` varchar(40) NOT NULL,
  `cantidad` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_receta` (`id_foraneo`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listas_receta`
--

DROP TABLE IF EXISTS `listas_receta`;
CREATE TABLE IF NOT EXISTS `listas_receta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `fecha` date NOT NULL,
  `id_foraneo` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_foraneo` (`id_foraneo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `listas_receta`
--

INSERT INTO `listas_receta` (`id`, `titulo`, `descripcion`, `fecha`, `id_foraneo`) VALUES
(1, 'Actu titulo', 'Lista para recetas de 15', '2023-11-12', 10),
(3, 'Recetas listado', 'Lista para recetas del año', '2023-11-12', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lista_personal`
--

DROP TABLE IF EXISTS `lista_personal`;
CREATE TABLE IF NOT EXISTS `lista_personal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(50) NOT NULL,
  `descripcion` varchar(40) NOT NULL,
  `fecha` date NOT NULL,
  `id_foraneo` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_foraneo` (`id_foraneo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `lista_personal`
--

INSERT INTO `lista_personal` (`id`, `titulo`, `descripcion`, `fecha`, `id_foraneo`) VALUES
(1, 'Compras super', 'Importante articulos de limpieza', '2023-11-12', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `receta_biblioteca`
--

DROP TABLE IF EXISTS `receta_biblioteca`;
CREATE TABLE IF NOT EXISTS `receta_biblioteca` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(40) NOT NULL,
  `tipo_comida` varchar(40) NOT NULL,
  `duracion` time NOT NULL,
  `preparacion` varchar(3000) NOT NULL,
  `imagen` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `receta_biblioteca`
--

INSERT INTO `receta_biblioteca` (`id`, `titulo`, `tipo_comida`, `duracion`, `preparacion`, `imagen`) VALUES
(1, 'sadasdas', 'asdasdsa', '03:08:07', 'dassssssssssssssssasdasdasdsad', 'asdasdas'),
(2, 'test', 'desayuno', '01:02:19', 'asd asdfñlklkasdjflknasdjknfjkadsn nwoiedfoian', 'img.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `receta_personal`
--

DROP TABLE IF EXISTS `receta_personal`;
CREATE TABLE IF NOT EXISTS `receta_personal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(40) NOT NULL,
  `tiempo_comida` varchar(40) NOT NULL,
  `duracion` time NOT NULL,
  `preparacion` varchar(3000) NOT NULL,
  `imagen` varchar(200) NOT NULL,
  `id_foraneo` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_foraneo`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `receta_personal`
--

INSERT INTO `receta_personal` (`id`, `titulo`, `tiempo_comida`, `duracion`, `preparacion`, `imagen`, `id_foraneo`) VALUES
(12, 'carne a la plancha', 'cena', '01:00:00', 'sadksadjasldlkasjdlkhasjkldhaslkjdlkasjd', 'pic.img', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `primer_nombre` varchar(40) NOT NULL,
  `segundo_nombre` varchar(40) NOT NULL,
  `primer_apellido` varchar(40) NOT NULL,
  `segundo_apellido` varchar(40) NOT NULL,
  `username` varchar(100) NOT NULL,
  `contrasena` varchar(1000) NOT NULL,
  `correo` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `primer_nombre`, `segundo_nombre`, `primer_apellido`, `segundo_apellido`, `username`, `contrasena`, `correo`) VALUES
(10, 'Yahir', 'Alexander', 'Sibrian', 'Arriola', 'yahirsib', '2265b86f946faad0d16929c5d916fec19af2eddf473c5887dbc19d26dbd2e4e6', 'yahir@gmail.com');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `biblioteca_usuario`
--
ALTER TABLE `biblioteca_usuario`
  ADD CONSTRAINT `biblioteca_usuario_ibfk_1` FOREIGN KEY (`id_foraneo`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `biblioteca_usuario_ibfk_2` FOREIGN KEY (`id_receta_biblio`) REFERENCES `receta_biblioteca` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `elementos_lista_personal`
--
ALTER TABLE `elementos_lista_personal`
  ADD CONSTRAINT `elementos_lista_personal_ibfk_1` FOREIGN KEY (`id_foraneo`) REFERENCES `lista_personal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `elementos_lista_recetas`
--
ALTER TABLE `elementos_lista_recetas`
  ADD CONSTRAINT `elementos_lista_recetas_ibfk_1` FOREIGN KEY (`id_foraneo`) REFERENCES `listas_receta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ingredientes_biblioteca`
--
ALTER TABLE `ingredientes_biblioteca`
  ADD CONSTRAINT `ingredientes_biblioteca_ibfk_1` FOREIGN KEY (`id_foraneo`) REFERENCES `receta_biblioteca` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ingrediente_personal`
--
ALTER TABLE `ingrediente_personal`
  ADD CONSTRAINT `ingrediente_personal_ibfk_1` FOREIGN KEY (`id_foraneo`) REFERENCES `receta_personal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `listas_receta`
--
ALTER TABLE `listas_receta`
  ADD CONSTRAINT `listas_receta_ibfk_1` FOREIGN KEY (`id_foraneo`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `lista_personal`
--
ALTER TABLE `lista_personal`
  ADD CONSTRAINT `lista_personal_ibfk_1` FOREIGN KEY (`id_foraneo`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `receta_personal`
--
ALTER TABLE `receta_personal`
  ADD CONSTRAINT `receta_personal_ibfk_1` FOREIGN KEY (`id_foraneo`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;